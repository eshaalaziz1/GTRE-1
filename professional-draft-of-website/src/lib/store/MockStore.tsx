"use client";

// ---------------------------------------------------------------------------
// MockStore, the prototype's localStorage-backed data layer.
//
// This is the ONE place the mock adapter owns state and every read/write the
// portals need. It persists to localStorage so the whole system is fully
// interactive with no backend: sign up, admin approval, assignment submission,
// grading, check-in, Q&A, and site-info edits all work and survive refresh.
//
// It implements the shared GtreContextValue (see context.tsx). The Supabase
// adapter (SupabaseStore.tsx) implements the same contract against a real
// backend; GtreStore.tsx selects between them via NEXT_PUBLIC_DATA_BACKEND.
// ---------------------------------------------------------------------------

import { useEffect, useMemo, useState, type ReactNode } from "react";
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
  Submission,
} from "./types";

const STORAGE_KEY = "gtre-store";
// Bump this whenever the seed's SHAPE or baseline content changes (e.g. the
// real schedule). Persisted data tagged with an older version is discarded on
// load so everyone picks up the new seed instead of being stuck on stale data.
const SEED_VERSION = 7;

function uid(prefix: string): string {
  const rand =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID().slice(0, 8)
      : Math.floor(Math.random() * 1e9).toString(36);
  return `${prefix}-${rand}`;
}

export function MockGtreProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<GtreState>(SEED);
  const [hydrated, setHydrated] = useState(false);

  // Hydrate from localStorage after mount (avoids SSR/client mismatch).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const payload = JSON.parse(raw) as { v?: number; state?: GtreState };
        // Only restore data written by the current seed version. Older data
        // (e.g. before the real schedule was added) is discarded so the new
        // seed loads instead of leaving the user stuck on stale content.
        if (payload && payload.v === SEED_VERSION && payload.state) {
          const parsed = payload.state;
          setState({ ...SEED, ...parsed, siteInfo: { ...SEED.siteInfo, ...parsed.siteInfo } });
        }
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on every change (once hydrated), tagged with the seed version.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ v: SEED_VERSION, state }));
    } catch {
      /* ignore quota errors */
    }
  }, [state, hydrated]);

  const currentAccount = useMemo(
    () => state.accounts.find((a) => a.id === state.currentAccountId) ?? null,
    [state.accounts, state.currentAccountId],
  );

  const value = useMemo<GtreContextValue>(() => {
    const nowIso = () => new Date().toISOString();
    const me = () => state.accounts.find((a) => a.id === state.currentAccountId) ?? null;

    return {
      state,
      currentAccount,
      ready: hydrated,

      // ---- Auth ---------------------------------------------------------
      async signUpStudent(input) {
        if (!isGeorgiaTechEmail(input.email)) {
          return { ok: false, error: "Students must sign up with a Georgia Tech (@gatech.edu) email." };
        }
        if (state.accounts.some((a) => a.email.toLowerCase() === input.email.toLowerCase())) {
          return { ok: false, error: "An account with that email already exists." };
        }
        const account: Account = {
          id: uid("acc"),
          role: "student",
          status: "pending",
          name: input.name.trim(),
          email: input.email.trim(),
          passwordHash: input.password,
          gradYear: input.gradYear,
          major: input.major,
          createdAt: nowIso(),
        };
        setState((s) => ({ ...s, accounts: [...s.accounts, account] }));
        return { ok: true, account };
      },

      async signUpIndustry(input) {
        if (!input.linkedin.trim()) {
          return { ok: false, error: "A LinkedIn URL is required for industry professional accounts." };
        }
        if (state.accounts.some((a) => a.email.toLowerCase() === input.email.toLowerCase())) {
          return { ok: false, error: "An account with that email already exists." };
        }
        const account: Account = {
          id: uid("acc"),
          role: "industry",
          status: "pending",
          name: input.name.trim(),
          email: input.email.trim(),
          passwordHash: input.password,
          linkedin: input.linkedin.trim(),
          company: input.company?.trim(),
          title: input.title?.trim(),
          createdAt: nowIso(),
        };
        setState((s) => ({ ...s, accounts: [...s.accounts, account] }));
        return { ok: true, account };
      },

      async login(email, password) {
        const acct = state.accounts.find(
          (a) => a.email.toLowerCase() === email.trim().toLowerCase(),
        );
        if (!acct || acct.passwordHash !== password) {
          return { ok: false, error: "Incorrect email or password." };
        }
        if (acct.status === "pending") {
          return { ok: false, error: "Your account is awaiting admin approval. You'll get an email once approved." };
        }
        if (acct.status === "rejected") {
          return { ok: false, error: "This account was not approved. Contact the club for details." };
        }
        setState((s) => ({ ...s, currentAccountId: acct.id }));
        return { ok: true, account: acct };
      },

      logout() {
        setState((s) => ({ ...s, currentAccountId: null }));
      },

      // Prototype has no email service, so sign-up completes without a code and
      // these are no-ops that satisfy the shared contract.
      async confirmSignup() {
        return { ok: true };
      },
      async resendCode() {
        return { ok: true };
      },

      // ---- Accounts / admin --------------------------------------------
      approveAccount(id) {
        setState((s) => ({
          ...s,
          accounts: s.accounts.map((a) =>
            a.id === id
              ? { ...a, status: "approved", approvedAt: nowIso(), approvedBy: me()?.name }
              : a,
          ),
        }));
      },
      rejectAccount(id) {
        setState((s) => ({
          ...s,
          accounts: s.accounts.map((a) => (a.id === id ? { ...a, status: "rejected" } : a)),
        }));
      },
      deleteAccount(id) {
        setState((s) => ({ ...s, accounts: s.accounts.filter((a) => a.id !== id) }));
      },
      setRole(id, role) {
        setState((s) => ({
          ...s,
          accounts: s.accounts.map((a) => (a.id === id ? { ...a, role } : a)),
        }));
      },
      toggleAlumni(id) {
        setState((s) => ({
          ...s,
          accounts: s.accounts.map((a) => (a.id === id ? { ...a, isAlumni: !a.isAlumni } : a)),
        }));
      },

      // ---- Announcements -----------------------------------------------
      addAnnouncement(a) {
        const rec: Announcement = {
          ...a,
          id: uid("ann"),
          authorName: me()?.name ?? "Admin",
          createdAt: nowIso(),
        };
        setState((s) => ({ ...s, announcements: [rec, ...s.announcements] }));
      },
      updateAnnouncement(id, patch) {
        setState((s) => ({
          ...s,
          announcements: s.announcements.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        }));
      },
      deleteAnnouncement(id) {
        setState((s) => ({ ...s, announcements: s.announcements.filter((a) => a.id !== id) }));
      },

      // ---- Events -------------------------------------------------------
      addEvent(e) {
        setState((s) => {
          // New events append to the end of their track's manual order.
          const maxOrder = s.events
            .filter((ev) => ev.track === e.track)
            .reduce((m, ev) => Math.max(m, ev.order), -1);
          return { ...s, events: [...s.events, { ...e, id: uid("evt"), order: maxOrder + 1 }] };
        });
      },
      updateEvent(id, patch) {
        setState((s) => ({
          ...s,
          events: s.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
        }));
      },
      deleteEvent(id) {
        setState((s) => ({ ...s, events: s.events.filter((e) => e.id !== id) }));
      },
      moveEvent(id, direction) {
        setState((s) => {
          const target = s.events.find((e) => e.id === id);
          if (!target) return s;
          // Reorder only within the same track, using the manual order value.
          const siblings = s.events
            .filter((e) => e.track === target.track)
            .sort((a, b) => a.order - b.order);
          const idx = siblings.findIndex((e) => e.id === id);
          const swapWith = direction === "up" ? idx - 1 : idx + 1;
          if (swapWith < 0 || swapWith >= siblings.length) return s;
          const a = siblings[idx];
          const b = siblings[swapWith];
          return {
            ...s,
            events: s.events.map((e) => {
              if (e.id === a.id) return { ...e, order: b.order };
              if (e.id === b.id) return { ...e, order: a.order };
              return e;
            }),
          };
        });
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
        if (state.checkIns.some((c) => c.eventId === event.id && c.accountId === acct.id)) {
          return { ok: false, message: `You're already checked in for ${event.title}.` };
        }
        const rec: CheckIn = {
          id: uid("chk"),
          eventId: event.id,
          eventTitle: event.title,
          accountId: acct.id,
          memberName: acct.name,
          memberEmail: acct.email,
          checkedInAt: nowIso(),
        };
        setState((s) => ({ ...s, checkIns: [rec, ...s.checkIns] }));
        return { ok: true, message: `Checked in to ${event.title}. See you there!` };
      },

      // ---- Assignments --------------------------------------------------
      addAssignment(a) {
        setState((s) => ({
          ...s,
          assignments: [...s.assignments, { ...a, id: uid("asg"), createdAt: nowIso() }],
        }));
      },
      updateAssignment(id, patch) {
        setState((s) => ({
          ...s,
          assignments: s.assignments.map((a) => (a.id === id ? { ...a, ...patch } : a)),
        }));
      },
      deleteAssignment(id) {
        setState((s) => ({
          ...s,
          assignments: s.assignments.filter((a) => a.id !== id),
          submissions: s.submissions.filter((sub) => sub.assignmentId !== id),
        }));
      },
      submitAssignment(input) {
        const acct = me();
        if (!acct) return;
        const rec: Submission = {
          id: uid("sub"),
          assignmentId: input.assignmentId,
          accountId: acct.id,
          memberName: acct.name,
          memberEmail: acct.email,
          type: input.type,
          content: input.content,
          comments: input.comments,
          submittedAt: nowIso(),
        };
        setState((s) => ({
          // Replace an existing submission by the same member for the same assignment.
          ...s,
          submissions: [
            rec,
            ...s.submissions.filter(
              (sub) => !(sub.assignmentId === input.assignmentId && sub.accountId === acct.id),
            ),
          ],
        }));
      },
      gradeSubmission(id, grade, feedback) {
        setState((s) => ({
          ...s,
          submissions: s.submissions.map((sub) =>
            sub.id === id
              ? { ...sub, grade, feedback, gradedAt: nowIso(), gradedBy: me()?.name }
              : sub,
          ),
        }));
      },

      // ---- Questions ----------------------------------------------------
      askQuestion(subject, body) {
        const acct = me();
        if (!acct) return;
        const rec: Question = {
          id: uid("q"),
          accountId: acct.id,
          memberName: acct.name,
          subject,
          body,
          status: "open",
          createdAt: nowIso(),
        };
        setState((s) => ({ ...s, questions: [rec, ...s.questions] }));
      },
      answerQuestion(id, answer) {
        setState((s) => ({
          ...s,
          questions: s.questions.map((q) =>
            q.id === id
              ? { ...q, answer, status: "answered", answeredBy: me()?.name, answeredAt: nowIso() }
              : q,
          ),
        }));
      },
      deleteQuestion(id) {
        setState((s) => ({ ...s, questions: s.questions.filter((q) => q.id !== id) }));
      },

      // ---- Meeting notes ------------------------------------------------
      addMeetingNote(n) {
        const rec: MeetingNote = {
          ...n,
          id: uid("note"),
          authorName: me()?.name ?? "Admin",
          createdAt: nowIso(),
        };
        setState((s) => ({ ...s, meetingNotes: [rec, ...s.meetingNotes] }));
      },
      deleteMeetingNote(id) {
        setState((s) => ({ ...s, meetingNotes: s.meetingNotes.filter((n) => n.id !== id) }));
      },

      // ---- Resources ----------------------------------------------------
      addResource(r) {
        setState((s) => ({
          ...s,
          resources: [{ ...r, id: uid("res"), createdAt: nowIso() }, ...s.resources],
        }));
      },
      updateResource(id, patch) {
        setState((s) => ({
          ...s,
          resources: s.resources.map((r) => (r.id === id ? { ...r, ...patch } : r)),
        }));
      },
      deleteResource(id) {
        setState((s) => ({ ...s, resources: s.resources.filter((r) => r.id !== id) }));
      },

      // ---- Site info ----------------------------------------------------
      updateSiteInfo(patch) {
        setState((s) => ({ ...s, siteInfo: { ...s.siteInfo, ...patch } }));
      },

      // ---- Site images --------------------------------------------------
      async setSiteImage(slot, file) {
        // Mock: read the file as a data URL and keep it in local state. (Large
        // images can exceed the localStorage quota; the persist effect ignores
        // quota errors, so the image still shows for the session.)
        try {
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject(new Error("Could not read the file."));
            reader.readAsDataURL(file);
          });
          setState((s) => ({ ...s, siteImages: { ...s.siteImages, [slot]: dataUrl } }));
          return { ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error ? e.message : "Upload failed." };
        }
      },
      resetSiteImage(slot) {
        setState((s) => {
          const next = { ...s.siteImages };
          delete next[slot];
          return { ...s, siteImages: next };
        });
      },

      // ---- Site text ----------------------------------------------------
      setSiteText(slot, value) {
        setState((s) => {
          const next = { ...s.siteText };
          if (value.trim()) next[slot] = value;
          else delete next[slot]; // empty reverts to the default
          return { ...s, siteText: next };
        });
      },

      // ---- Utility ------------------------------------------------------
      resetDemo() {
        setState(SEED);
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
    };
  }, [state, currentAccount, hydrated]);

  return <GtreContext.Provider value={value}>{children}</GtreContext.Provider>;
}
