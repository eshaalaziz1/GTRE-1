"use client";

// ---------------------------------------------------------------------------
// SupabaseStore — the production data layer.
//
// Implements the same GtreContextValue contract as the mock (see context.tsx),
// but every read/write goes to Supabase:
//   * Auth (sign-up with email confirmation, sign-in) → supabase.auth
//   * Everything else → Postgres tables, filtered by Row-Level Security.
//
// Reads: on mount and on every auth change we SELECT from each table. RLS does
// the filtering — anon sees only public rows (site info, events, announcements,
// resources), an approved member sees their own submissions/check-ins/etc., and
// an admin sees everything. So the same loadAll() is correct for every viewer.
//
// Writes: perform the mutation, then refresh the affected data. Data volumes are
// tiny (a single club), so a full refresh after a write is simplest and safe.
//
// See supabase/schema.sql for tables + policies and SETUP.md for going live.
// ---------------------------------------------------------------------------

import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { SupabaseClient } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabase/client";
import { SEED } from "./seed";
import { GtreContext, isGeorgiaTechEmail, type GtreContextValue } from "./context";
import type {
  Account,
  Announcement,
  Assignment,
  CheckIn,
  ClubEvent,
  GtreState,
  MeetingNote,
  Question,
  Resource,
  Role,
  SiteInfo,
  Submission,
} from "./types";

// Pre-load state: empty collections + the seed's site-info defaults so public
// pages render sensibly before the first fetch resolves (or if no site_info row
// exists yet).
const EMPTY_STATE: GtreState = {
  accounts: [],
  announcements: [],
  events: [],
  checkIns: [],
  assignments: [],
  submissions: [],
  questions: [],
  meetingNotes: [],
  resources: [],
  siteInfo: SEED.siteInfo,
  siteImages: {},
  currentAccountId: null,
};

const IMAGE_BUCKET = "site-images";

/* ----------------------------- row mappers ------------------------------- */
/* eslint-disable @typescript-eslint/no-explicit-any */

const mapAccount = (r: any): Account => ({
  id: r.id,
  role: r.role,
  status: r.status,
  name: r.name ?? "",
  email: r.email ?? "",
  passwordHash: "", // Supabase Auth owns credentials; never surfaced here.
  company: r.company ?? undefined,
  linkedin: r.linkedin ?? undefined,
  title: r.title ?? undefined,
  gradYear: r.grad_year ?? undefined,
  major: r.major ?? undefined,
  isAlumni: r.is_alumni ?? false,
  createdAt: r.created_at,
  approvedAt: r.approved_at ?? undefined,
  approvedBy: r.approved_by ?? undefined,
});

const mapAnnouncement = (r: any): Announcement => ({
  id: r.id,
  title: r.title,
  body: r.body,
  category: r.category,
  pinned: r.pinned,
  authorName: r.author_name ?? "Admin",
  createdAt: r.created_at,
});

const mapEvent = (r: any): ClubEvent => ({
  id: r.id,
  title: r.title,
  type: r.type,
  track: r.track,
  date: r.date,
  time: r.time ?? undefined,
  location: r.location ?? undefined,
  description: r.description ?? undefined,
  order: r.order ?? 0,
  checkInCode: r.check_in_code ?? undefined,
  checkInOpen: r.check_in_open ?? false,
});

const mapCheckIn = (r: any): CheckIn => ({
  id: r.id,
  eventId: r.event_id,
  eventTitle: r.event_title ?? "",
  accountId: r.account_id,
  memberName: r.member_name ?? "",
  memberEmail: r.member_email ?? "",
  checkedInAt: r.checked_in_at,
});

const mapAssignment = (r: any): Assignment => ({
  id: r.id,
  title: r.title,
  description: r.description ?? "",
  week: r.week ?? undefined,
  dueDate: r.due_date,
  points: r.points ?? 0,
  category: r.category,
  published: r.published,
  createdAt: r.created_at,
});

const mapSubmission = (r: any): Submission => ({
  id: r.id,
  assignmentId: r.assignment_id,
  accountId: r.account_id,
  memberName: r.member_name ?? "",
  memberEmail: r.member_email ?? "",
  type: r.type,
  content: r.content,
  comments: r.comments ?? undefined,
  submittedAt: r.submitted_at,
  grade: r.grade ?? undefined,
  feedback: r.feedback ?? undefined,
  gradedAt: r.graded_at ?? undefined,
  gradedBy: r.graded_by ?? undefined,
});

const mapQuestion = (r: any): Question => ({
  id: r.id,
  accountId: r.account_id,
  memberName: r.member_name ?? "",
  subject: r.subject,
  body: r.body,
  status: r.status,
  answer: r.answer ?? undefined,
  answeredBy: r.answered_by ?? undefined,
  createdAt: r.created_at,
  answeredAt: r.answered_at ?? undefined,
});

const mapNote = (r: any): MeetingNote => ({
  id: r.id,
  title: r.title,
  date: r.date,
  body: r.body ?? "",
  authorName: r.author_name ?? "Admin",
  createdAt: r.created_at,
});

const mapResource = (r: any): Resource => ({
  id: r.id,
  title: r.title,
  description: r.description ?? undefined,
  url: r.url,
  category: r.category,
  createdAt: r.created_at,
});

const mapSiteInfo = (r: any): SiteInfo => ({
  meetingTime: r.meeting_time ?? "",
  meetingLocation: r.meeting_location ?? "",
  contactEmail: r.contact_email ?? "",
  analystProgramIntro: r.analyst_program_intro ?? "",
  syllabusEmbedUrl: r.syllabus_embed_url ?? "",
  googleCalendarEmbedUrl: r.google_calendar_embed_url ?? "",
});
/* eslint-enable @typescript-eslint/no-explicit-any */

export function SupabaseGtreProvider({ children }: { children: ReactNode }) {
  const supabaseRef = useRef<SupabaseClient | null>(null);
  if (supabaseRef.current === null) supabaseRef.current = getSupabaseClient();
  const supabase = supabaseRef.current;

  const [state, setState] = useState<GtreState>(EMPTY_STATE);
  const [ready, setReady] = useState(false);

  // Fetch everything the current viewer is allowed to see (RLS filters rows).
  const loadAll = useCallback(async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData.session?.user.id ?? null;

    const [
      profiles,
      announcements,
      events,
      checkIns,
      assignments,
      submissions,
      questions,
      notes,
      resources,
      siteInfo,
      siteImages,
    ] = await Promise.all([
      supabase.from("profiles").select("*"),
      supabase.from("announcements").select("*").order("created_at", { ascending: false }),
      supabase.from("events").select("*").order("date", { ascending: true }),
      supabase.from("check_ins").select("*").order("checked_in_at", { ascending: false }),
      supabase.from("assignments").select("*").order("due_date", { ascending: true }),
      supabase.from("submissions").select("*").order("submitted_at", { ascending: false }),
      supabase.from("questions").select("*").order("created_at", { ascending: false }),
      supabase.from("meeting_notes").select("*").order("date", { ascending: false }),
      supabase.from("resources").select("*").order("created_at", { ascending: false }),
      supabase.from("site_info").select("*").eq("id", 1).maybeSingle(),
      supabase.from("site_images").select("*"),
    ]);

    const siteImagesMap: Record<string, string> = {};
    for (const row of siteImages.data ?? []) {
      if (row.key && row.url) siteImagesMap[row.key] = row.url;
    }

    const accounts = (profiles.data ?? []).map(mapAccount);
    // Only treat an APPROVED profile as the signed-in app user. A confirmed but
    // still-pending/rejected auth session is not a usable account here.
    const mine = accounts.find((a) => a.id === userId);
    const currentAccountId = mine && mine.status === "approved" ? mine.id : null;

    setState({
      accounts,
      announcements: (announcements.data ?? []).map(mapAnnouncement),
      events: (events.data ?? []).map(mapEvent),
      checkIns: (checkIns.data ?? []).map(mapCheckIn),
      assignments: (assignments.data ?? []).map(mapAssignment),
      submissions: (submissions.data ?? []).map(mapSubmission),
      questions: (questions.data ?? []).map(mapQuestion),
      meetingNotes: (notes.data ?? []).map(mapNote),
      resources: (resources.data ?? []).map(mapResource),
      siteInfo: siteInfo.data ? mapSiteInfo(siteInfo.data) : SEED.siteInfo,
      siteImages: siteImagesMap,
      currentAccountId,
    });
    setReady(true);
  }, [supabase]);

  useEffect(() => {
    loadAll();
    // Re-load whenever the auth state changes (sign-in, sign-out, token refresh).
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      loadAll();
    });
    return () => sub.subscription.unsubscribe();
  }, [supabase, loadAll]);

  const currentAccount = useMemo(
    () => state.accounts.find((a) => a.id === state.currentAccountId) ?? null,
    [state.accounts, state.currentAccountId],
  );

  const value = useMemo<GtreContextValue>(() => {
    const me = () => state.accounts.find((a) => a.id === state.currentAccountId) ?? null;
    const emailRedirectTo =
      typeof window !== "undefined" ? `${window.location.origin}/login` : undefined;

    return {
      state,
      currentAccount,
      ready,

      // ---- Auth ---------------------------------------------------------
      async signUpStudent(input) {
        if (!isGeorgiaTechEmail(input.email)) {
          return { ok: false, error: "Students must sign up with a Georgia Tech (@gatech.edu) email." };
        }
        const { data, error } = await supabase.auth.signUp({
          email: input.email.trim(),
          password: input.password,
          options: {
            emailRedirectTo,
            data: {
              name: input.name.trim(),
              role: "student",
              grad_year: input.gradYear ?? null,
              major: input.major ?? null,
            },
          },
        });
        if (error) return { ok: false, error: error.message };
        const account: Account = {
          id: data.user?.id ?? "",
          role: "student",
          status: "pending",
          name: input.name.trim(),
          email: input.email.trim(),
          passwordHash: "",
          gradYear: input.gradYear,
          major: input.major,
          createdAt: new Date().toISOString(),
        };
        return { ok: true, account };
      },

      async signUpIndustry(input) {
        if (!input.linkedin.trim()) {
          return { ok: false, error: "A LinkedIn URL is required for industry professional accounts." };
        }
        const { data, error } = await supabase.auth.signUp({
          email: input.email.trim(),
          password: input.password,
          options: {
            emailRedirectTo,
            data: {
              name: input.name.trim(),
              role: "industry",
              linkedin: input.linkedin.trim(),
              company: input.company?.trim() ?? null,
              title: input.title?.trim() ?? null,
            },
          },
        });
        if (error) return { ok: false, error: error.message };
        const account: Account = {
          id: data.user?.id ?? "",
          role: "industry",
          status: "pending",
          name: input.name.trim(),
          email: input.email.trim(),
          passwordHash: "",
          linkedin: input.linkedin.trim(),
          company: input.company?.trim(),
          title: input.title?.trim(),
          createdAt: new Date().toISOString(),
        };
        return { ok: true, account };
      },

      async login(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) {
          if (/email not confirmed/i.test(error.message)) {
            return {
              ok: false,
              error: "Please confirm your email first — check your inbox for the verification link.",
            };
          }
          return { ok: false, error: "Incorrect email or password." };
        }
        // Load the caller's profile to enforce the club's approval gate.
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", data.user.id)
          .maybeSingle();
        if (!prof) {
          await supabase.auth.signOut();
          return { ok: false, error: "No profile found for this account. Contact the club." };
        }
        if (prof.status === "pending") {
          await supabase.auth.signOut();
          return { ok: false, error: "Your account is awaiting admin approval. You'll get an email once approved." };
        }
        if (prof.status === "rejected") {
          await supabase.auth.signOut();
          return { ok: false, error: "This account was not approved. Contact the club for details." };
        }
        await loadAll();
        return { ok: true, account: mapAccount(prof) };
      },

      logout() {
        void (async () => {
          await supabase.auth.signOut();
          await loadAll();
        })();
      },

      // ---- Accounts / admin --------------------------------------------
      approveAccount(id) {
        void (async () => {
          await supabase
            .from("profiles")
            .update({ status: "approved", approved_at: new Date().toISOString(), approved_by: me()?.id ?? null })
            .eq("id", id);
          await loadAll();
        })();
      },
      rejectAccount(id) {
        void (async () => {
          await supabase.from("profiles").update({ status: "rejected" }).eq("id", id);
          await loadAll();
        })();
      },
      deleteAccount(id) {
        void (async () => {
          // Removes the profile row (RLS admin policy). Fully deleting the
          // underlying auth user requires a service-role server action — see SETUP.md.
          await supabase.from("profiles").delete().eq("id", id);
          await loadAll();
        })();
      },
      setRole(id, role: Role) {
        void (async () => {
          await supabase.from("profiles").update({ role }).eq("id", id);
          await loadAll();
        })();
      },
      toggleAlumni(id) {
        void (async () => {
          const current = me() && id === me()?.id ? me() : state.accounts.find((a) => a.id === id);
          await supabase.from("profiles").update({ is_alumni: !current?.isAlumni }).eq("id", id);
          await loadAll();
        })();
      },

      // ---- Announcements -----------------------------------------------
      addAnnouncement(a) {
        void (async () => {
          await supabase.from("announcements").insert({
            title: a.title,
            body: a.body,
            category: a.category,
            pinned: a.pinned,
            author_id: me()?.id ?? null,
            author_name: me()?.name ?? "Admin",
          });
          await loadAll();
        })();
      },
      updateAnnouncement(id, patch) {
        void (async () => {
          const row: Record<string, unknown> = {};
          if (patch.title !== undefined) row.title = patch.title;
          if (patch.body !== undefined) row.body = patch.body;
          if (patch.category !== undefined) row.category = patch.category;
          if (patch.pinned !== undefined) row.pinned = patch.pinned;
          await supabase.from("announcements").update(row).eq("id", id);
          await loadAll();
        })();
      },
      deleteAnnouncement(id) {
        void (async () => {
          await supabase.from("announcements").delete().eq("id", id);
          await loadAll();
        })();
      },

      // ---- Events -------------------------------------------------------
      addEvent(e) {
        void (async () => {
          const maxOrder = state.events
            .filter((ev) => ev.track === e.track)
            .reduce((m, ev) => Math.max(m, ev.order), -1);
          await supabase.from("events").insert({
            title: e.title,
            type: e.type,
            track: e.track,
            date: e.date,
            time: e.time ?? null,
            location: e.location ?? null,
            description: e.description ?? null,
            order: maxOrder + 1,
            check_in_code: e.checkInCode ?? null,
            check_in_open: e.checkInOpen ?? false,
          });
          await loadAll();
        })();
      },
      updateEvent(id, patch) {
        void (async () => {
          const row: Record<string, unknown> = {};
          if (patch.title !== undefined) row.title = patch.title;
          if (patch.type !== undefined) row.type = patch.type;
          if (patch.track !== undefined) row.track = patch.track;
          if (patch.date !== undefined) row.date = patch.date;
          if (patch.time !== undefined) row.time = patch.time;
          if (patch.location !== undefined) row.location = patch.location;
          if (patch.description !== undefined) row.description = patch.description;
          if (patch.order !== undefined) row.order = patch.order;
          if (patch.checkInCode !== undefined) row.check_in_code = patch.checkInCode;
          if (patch.checkInOpen !== undefined) row.check_in_open = patch.checkInOpen;
          await supabase.from("events").update(row).eq("id", id);
          await loadAll();
        })();
      },
      deleteEvent(id) {
        void (async () => {
          await supabase.from("events").delete().eq("id", id);
          await loadAll();
        })();
      },
      moveEvent(id, direction) {
        void (async () => {
          const target = state.events.find((e) => e.id === id);
          if (!target) return;
          const siblings = state.events
            .filter((e) => e.track === target.track)
            .sort((a, b) => a.order - b.order);
          const idx = siblings.findIndex((e) => e.id === id);
          const swapWith = direction === "up" ? idx - 1 : idx + 1;
          if (swapWith < 0 || swapWith >= siblings.length) return;
          const a = siblings[idx];
          const b = siblings[swapWith];
          await Promise.all([
            supabase.from("events").update({ order: b.order }).eq("id", a.id),
            supabase.from("events").update({ order: a.order }).eq("id", b.id),
          ]);
          await loadAll();
        })();
      },

      // ---- Check-in -----------------------------------------------------
      async checkIn(code) {
        const acct = me();
        if (!acct) return { ok: false, message: "Please sign in to check in." };
        const event = state.events.find(
          (e) => e.checkInOpen && e.checkInCode?.toUpperCase() === code.trim().toUpperCase(),
        );
        if (!event) {
          return { ok: false, message: "No open event matches that code. Double-check with an officer." };
        }
        const { error } = await supabase.from("check_ins").insert({
          event_id: event.id,
          event_title: event.title,
          account_id: acct.id,
          member_name: acct.name,
          member_email: acct.email,
        });
        if (error) {
          // Unique (event_id, account_id) violation → already checked in.
          if (error.code === "23505") {
            return { ok: false, message: `You're already checked in for ${event.title}.` };
          }
          return { ok: false, message: "Could not record your check-in. Try again." };
        }
        await loadAll();
        return { ok: true, message: `Checked in to ${event.title}. See you there!` };
      },

      // ---- Assignments --------------------------------------------------
      addAssignment(a) {
        void (async () => {
          await supabase.from("assignments").insert({
            title: a.title,
            description: a.description,
            week: a.week ?? null,
            due_date: a.dueDate,
            points: a.points,
            category: a.category,
            published: a.published,
          });
          await loadAll();
        })();
      },
      updateAssignment(id, patch) {
        void (async () => {
          const row: Record<string, unknown> = {};
          if (patch.title !== undefined) row.title = patch.title;
          if (patch.description !== undefined) row.description = patch.description;
          if (patch.week !== undefined) row.week = patch.week;
          if (patch.dueDate !== undefined) row.due_date = patch.dueDate;
          if (patch.points !== undefined) row.points = patch.points;
          if (patch.category !== undefined) row.category = patch.category;
          if (patch.published !== undefined) row.published = patch.published;
          await supabase.from("assignments").update(row).eq("id", id);
          await loadAll();
        })();
      },
      deleteAssignment(id) {
        void (async () => {
          // submissions cascade via the FK (on delete cascade).
          await supabase.from("assignments").delete().eq("id", id);
          await loadAll();
        })();
      },
      submitAssignment(input) {
        void (async () => {
          const acct = me();
          if (!acct) return;
          await supabase.from("submissions").upsert(
            {
              assignment_id: input.assignmentId,
              account_id: acct.id,
              member_name: acct.name,
              member_email: acct.email,
              type: input.type,
              content: input.content,
              comments: input.comments ?? null,
              submitted_at: new Date().toISOString(),
              // Clear any prior grade on resubmission.
              grade: null,
              feedback: null,
              graded_at: null,
              graded_by: null,
            },
            { onConflict: "assignment_id,account_id" },
          );
          await loadAll();
        })();
      },
      gradeSubmission(id, grade, feedback) {
        void (async () => {
          await supabase
            .from("submissions")
            .update({ grade, feedback, graded_at: new Date().toISOString(), graded_by: me()?.name ?? "Admin" })
            .eq("id", id);
          await loadAll();
        })();
      },

      // ---- Questions ----------------------------------------------------
      askQuestion(subject, body) {
        void (async () => {
          const acct = me();
          if (!acct) return;
          await supabase.from("questions").insert({
            account_id: acct.id,
            member_name: acct.name,
            subject,
            body,
            status: "open",
          });
          await loadAll();
        })();
      },
      answerQuestion(id, answer) {
        void (async () => {
          await supabase
            .from("questions")
            .update({ answer, status: "answered", answered_by: me()?.name ?? "Admin", answered_at: new Date().toISOString() })
            .eq("id", id);
          await loadAll();
        })();
      },
      deleteQuestion(id) {
        void (async () => {
          await supabase.from("questions").delete().eq("id", id);
          await loadAll();
        })();
      },

      // ---- Meeting notes ------------------------------------------------
      addMeetingNote(n) {
        void (async () => {
          await supabase.from("meeting_notes").insert({
            title: n.title,
            date: n.date,
            body: n.body,
            author_name: me()?.name ?? "Admin",
          });
          await loadAll();
        })();
      },
      deleteMeetingNote(id) {
        void (async () => {
          await supabase.from("meeting_notes").delete().eq("id", id);
          await loadAll();
        })();
      },

      // ---- Resources ----------------------------------------------------
      addResource(r) {
        void (async () => {
          await supabase.from("resources").insert({
            title: r.title,
            description: r.description ?? null,
            url: r.url,
            category: r.category,
          });
          await loadAll();
        })();
      },
      deleteResource(id) {
        void (async () => {
          await supabase.from("resources").delete().eq("id", id);
          await loadAll();
        })();
      },

      // ---- Site info ----------------------------------------------------
      updateSiteInfo(patch) {
        void (async () => {
          const row: Record<string, unknown> = { id: 1 };
          if (patch.meetingTime !== undefined) row.meeting_time = patch.meetingTime;
          if (patch.meetingLocation !== undefined) row.meeting_location = patch.meetingLocation;
          if (patch.contactEmail !== undefined) row.contact_email = patch.contactEmail;
          if (patch.analystProgramIntro !== undefined) row.analyst_program_intro = patch.analystProgramIntro;
          if (patch.syllabusEmbedUrl !== undefined) row.syllabus_embed_url = patch.syllabusEmbedUrl;
          if (patch.googleCalendarEmbedUrl !== undefined) row.google_calendar_embed_url = patch.googleCalendarEmbedUrl;
          // Upsert the single row (id = 1) so the first edit creates it if needed.
          await supabase.from("site_info").upsert(row, { onConflict: "id" });
          await loadAll();
        })();
      },

      // ---- Site images --------------------------------------------------
      async setSiteImage(slot, file) {
        const ext = file.name.includes(".") ? file.name.split(".").pop() : "bin";
        // One object per slot, overwritten on re-upload (a stamp busts CDN cache).
        const path = `${slot}-${Date.now()}.${ext}`;
        const up = await supabase.storage
          .from(IMAGE_BUCKET)
          .upload(path, file, { upsert: true, contentType: file.type || undefined });
        if (up.error) return { ok: false, error: up.error.message };
        const { data: pub } = supabase.storage.from(IMAGE_BUCKET).getPublicUrl(path);
        const { error } = await supabase
          .from("site_images")
          .upsert({ key: slot, url: pub.publicUrl, updated_at: new Date().toISOString() }, { onConflict: "key" });
        if (error) return { ok: false, error: error.message };
        await loadAll();
        return { ok: true };
      },
      resetSiteImage(slot) {
        void (async () => {
          await supabase.from("site_images").delete().eq("key", slot);
          await loadAll();
        })();
      },

      // ---- Utility ------------------------------------------------------
      resetDemo() {
        // No destructive reset against a live backend — just re-sync from the DB.
        void loadAll();
      },
    };
  }, [state, currentAccount, ready, supabase, loadAll]);

  return <GtreContext.Provider value={value}>{children}</GtreContext.Provider>;
}
