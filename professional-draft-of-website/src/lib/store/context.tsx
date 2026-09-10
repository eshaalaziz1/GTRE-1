"use client";

// ---------------------------------------------------------------------------
// Shared data-layer contract for the GTRE portal + admin system.
//
// Both adapters, the localStorage mock (MockStore.tsx) and the real Supabase
// backend (SupabaseStore.tsx), implement THIS interface, so pages never care
// which one is active. `GtreStore.tsx` picks the adapter at runtime from
// NEXT_PUBLIC_DATA_BACKEND and re-exports everything a page imports.
//
// Async note: the four methods whose return value a caller consumes
// (signUpStudent, signUpIndustry, login, checkIn) return Promises so the same
// call site works against both a synchronous mock and an async network backend.
// Fire-and-forget mutations stay `=> void` in the type, an async function that
// returns Promise<void> is assignable to a `() => void` slot, so the Supabase
// adapter's async implementations satisfy this contract unchanged.
// ---------------------------------------------------------------------------

import { createContext, useContext } from "react";
import type {
  Account,
  Announcement,
  Assignment,
  ClubEvent,
  GtreState,
  MeetingNote,
  Question,
  Resource,
  Role,
  SiteInfo,
  Submission,
} from "./types";

/** Georgia Tech email guard for student accounts. */
export function isGeorgiaTechEmail(email: string): boolean {
  return /@([a-z0-9-]+\.)*gatech\.edu$/i.test(email.trim());
}

export type SignUpResult =
  | { ok: true; account: Account; needsConfirmation?: boolean }
  | { ok: false; error: string };
export type LoginResult = { ok: true; account: Account } | { ok: false; error: string };

export type GtreContextValue = {
  state: GtreState;
  currentAccount: Account | null;
  /** True once the adapter has finished its initial load (used to gate UI). */
  ready: boolean;

  // Auth
  signUpStudent: (input: {
    name: string;
    email: string;
    password: string;
    gradYear?: number;
    major?: string;
  }) => Promise<SignUpResult>;
  signUpIndustry: (input: {
    name: string;
    email: string;
    password: string;
    linkedin: string;
    company?: string;
    title?: string;
  }) => Promise<SignUpResult>;
  login: (email: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  // Change the signed-in user's own password (verifies the current one first).
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ ok: boolean; error?: string }>;
  // Email verification (OTP code). After a sign-up that needs confirmation, the
  // member enters the 6-digit code emailed to them to prove they own the inbox.
  confirmSignup: (email: string, token: string) => Promise<{ ok: boolean; error?: string }>;
  resendCode: (email: string) => Promise<{ ok: boolean; error?: string }>;

  // Accounts / admin
  approveAccount: (id: string) => void;
  rejectAccount: (id: string) => void;
  deleteAccount: (id: string) => void;
  setRole: (id: string, role: Role) => void;
  toggleAlumni: (id: string) => void;

  // Announcements
  addAnnouncement: (a: Omit<Announcement, "id" | "createdAt" | "authorName">) => void;
  updateAnnouncement: (id: string, patch: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // Events / calendar
  addEvent: (e: Omit<ClubEvent, "id" | "order">) => void;
  updateEvent: (id: string, patch: Partial<ClubEvent>) => void;
  deleteEvent: (id: string) => void;
  moveEvent: (id: string, direction: "up" | "down") => void;

  // Check-in
  checkIn: (code: string) => Promise<{ ok: boolean; message: string }>;

  // Assignments + submissions + grading
  addAssignment: (a: Omit<Assignment, "id" | "createdAt">) => void;
  updateAssignment: (id: string, patch: Partial<Assignment>) => void;
  deleteAssignment: (id: string) => void;
  submitAssignment: (input: {
    assignmentId: string;
    type: Submission["type"];
    content: string;
    comments?: string;
  }) => void;
  gradeSubmission: (id: string, grade: number, feedback: string) => void;

  // Questions (forum)
  askQuestion: (subject: string, body: string) => void;
  answerQuestion: (id: string, answer: string) => void;
  deleteQuestion: (id: string) => void;

  // Meeting notes
  addMeetingNote: (n: Omit<MeetingNote, "id" | "createdAt" | "authorName">) => void;
  deleteMeetingNote: (id: string) => void;

  // Resources / documents
  addResource: (r: Omit<Resource, "id" | "createdAt">) => void;
  updateResource: (id: string, patch: Partial<Omit<Resource, "id" | "createdAt">>) => void;
  deleteResource: (id: string) => void;

  // Site info
  updateSiteInfo: (patch: Partial<SiteInfo>) => void;

  // Site images (admin-swappable photos by slot key)
  setSiteImage: (slot: string, file: File) => Promise<{ ok: boolean; error?: string }>;
  resetSiteImage: (slot: string) => void;

  // Site text (admin-editable page copy by slot key)
  setSiteText: (slot: string, value: string) => void;

  // Utility
  resetDemo: () => void;
};

export const GtreContext = createContext<GtreContextValue | null>(null);

export function useGtre(): GtreContextValue {
  const ctx = useContext(GtreContext);
  if (!ctx) throw new Error("useGtre must be used within <GtreProvider>");
  return ctx;
}
