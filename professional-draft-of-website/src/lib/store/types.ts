// ---------------------------------------------------------------------------
// Domain model for the GTRE portal + admin system.
//
// This is the single source of truth for every entity the member portal and
// admin portal read and write. The client-side store (mock adapter) and the
// future Supabase adapter both conform to these types, so swapping the backend
// never touches the UI. Table/collection names in Supabase should match the
// plural, snake_case of these type names (accounts, announcements, ...).
// ---------------------------------------------------------------------------

/** Who a person is in the system. Drives every access decision. */
export type Role = "student" | "industry" | "admin";

/** Account lifecycle. New accounts start `pending` and an admin approves. */
export type AccountStatus = "pending" | "approved" | "rejected";

/**
 * A person with a login. Students must use a Georgia Tech email; industry
 * professionals must supply a LinkedIn URL. `passwordHash` is a stand-in in the
 * mock adapter (plain text, never do this in production), Supabase Auth owns
 * real credentials, so this field disappears once the backend is wired.
 */
export type Account = {
  id: string;
  role: Role;
  status: AccountStatus;
  name: string;
  email: string;
  passwordHash: string; // mock-only; Supabase Auth replaces this
  // Industry professional fields
  company?: string;
  linkedin?: string;
  title?: string;
  // Student fields
  gradYear?: number;
  major?: string;
  // Alumni flag (a student account can be marked alumni by an admin)
  isAlumni?: boolean;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
};

/** Club-wide announcement / update posted by admins. */
export type Announcement = {
  id: string;
  title: string;
  body: string;
  category: "General" | "Event" | "Meeting" | "Deadline" | "Mentorship Program";
  pinned: boolean;
  authorName: string;
  createdAt: string;
};

/** A calendar entry: meeting, event, or deadline. Feeds the calendar + check-in. */
export type EventTrack = "Mentorship Program" | "Industry Events" | "General";

export type ClubEvent = {
  id: string;
  title: string;
  type: "Meeting" | "Event" | "Workshop" | "Deadline" | "Social" | "Case Study";
  // Which schedule track this belongs to (mirrors the club's two-column schedule).
  track: EventTrack;
  date: string; // ISO yyyy-mm-dd
  time?: string;
  location?: string;
  description?: string;
  // Manual display order within a track (lower = earlier). Admins reorder with
  // up/down controls; new events append to the end. The calendar grid still
  // sorts by date, order only drives the schedule list view.
  order: number;
  // Check-in: members enter this code during the event to record attendance.
  checkInCode?: string;
  checkInOpen?: boolean;
};

/** A single member's attendance record for an event. */
export type CheckIn = {
  id: string;
  eventId: string;
  eventTitle: string;
  accountId: string;
  memberName: string;
  memberEmail: string;
  checkedInAt: string;
};

/** An assignment definition created by an admin. */
export type Assignment = {
  id: string;
  title: string;
  description: string;
  week?: number;
  dueDate: string; // ISO yyyy-mm-dd
  points: number;
  category: "Assignment" | "Quiz" | "Case Study";
  published: boolean;
  createdAt: string;
};

/** A member's submission against an assignment, plus optional grade. */
export type Submission = {
  id: string;
  assignmentId: string;
  accountId: string;
  memberName: string;
  memberEmail: string;
  type: "link" | "text" | "file";
  content: string; // URL, text, or file name
  comments?: string;
  submittedAt: string;
  // Grading (set by admin)
  grade?: number; // out of assignment.points
  feedback?: string;
  gradedAt?: string;
  gradedBy?: string;
};

/** A question submitted by a member; admins answer them (the "Forum"). */
export type Question = {
  id: string;
  accountId: string;
  memberName: string;
  subject: string;
  body: string;
  status: "open" | "answered";
  answer?: string;
  answeredBy?: string;
  createdAt: string;
  answeredAt?: string;
};

/** Private meeting notes stored by exec/admins. */
export type MeetingNote = {
  id: string;
  title: string;
  date: string;
  body: string;
  authorName: string;
  createdAt: string;
};

/** A document or link surfaced in the portal (slides, tools, resources). */
export type Resource = {
  id: string;
  title: string;
  description?: string;
  url: string;
  category: "Slides" | "Tool" | "Document" | "Case Study" | "Link";
  createdAt: string;
};

/**
 * Editable site information so future exec teams change copy without code.
 * Extend this object with any field a page reads; the admin "Site Info" editor
 * exposes each key.
 */
export type SiteInfo = {
  meetingTime: string;
  meetingLocation: string;
  contactEmail: string;
  analystProgramIntro: string;
  // A view-only embed URL (Google Docs/Drive preview) for the syllabus. Empty
  // until the club uploads one; the Syllabus tab shows a placeholder meanwhile.
  syllabusEmbedUrl: string;
  // Optional embedded Google Calendar (iframe src). Empty -> use the in-app
  // admin-managed calendar built from ClubEvent records.
  googleCalendarEmbedUrl: string;
};

/** The complete persisted state shape. */
export type GtreState = {
  accounts: Account[];
  announcements: Announcement[];
  events: ClubEvent[];
  checkIns: CheckIn[];
  assignments: Assignment[];
  submissions: Submission[];
  questions: Question[];
  meetingNotes: MeetingNote[];
  resources: Resource[];
  siteInfo: SiteInfo;
  // Admin-swappable images by slot key (see src/lib/images.ts). A slot maps to an
  // uploaded image URL (Supabase Storage) or a data URL (mock); missing slots
  // fall back to the bundled default.
  siteImages: Record<string, string>;
  // id of the currently signed-in account, or null
  currentAccountId: string | null;
};
