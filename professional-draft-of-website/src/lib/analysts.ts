/**
 * Analyst Rolodex data.
 *
 * The roster is intentionally empty for now, profiles are populated once the
 * Fall 2026 cohort is enrolled and the club has tracked a semester of metrics
 * (attendance, assignment submissions, graded case-study work) and collected
 * resumes. Each profile's shape is defined below so the directory, search, and
 * profile pages are ready the moment real analysts are added.
 */

export type Status = "Available" | "Looking for opportunities" | "Interning";

export type Experience = {
  company: string;
  role: string;
  period: string;
};

export type Analyst = {
  id: string;
  slug: string;
  name: string;
  gradYear: number;
  major: string;
  concentration: string;
  hometown: string;
  status: Status;
  gpa: number;
  attendancePct: number;
  assignmentsDone: number;
  assignmentsTotal: number;
  caseStudyTitle: string;
  caseStudyScore: number;
  caseStudyRank: number;
  caseStudyField: number;
  skills: string[];
  interests: string[];
  coursework: { course: string; grade: string }[];
  experiences: Experience[];
  bio: string;
  linkedin: string;
  hasResume: boolean;
  resumeText: string;
};

// Populated with the vetted Fall 2026 cohort once the semester is underway.
export const ANALYSTS: Analyst[] = [];

export const STATUS_META: Record<Status, { label: string; color: string }> = {
  Available: { label: "Available", color: "#2E7D32" },
  "Looking for opportunities": { label: "Looking for opportunities", color: "#9A7B1F" },
  Interning: { label: "Currently interning", color: "#003057" },
};

export const MAJORS = Array.from(new Set(ANALYSTS.map((a) => a.major))).sort();

export function getAnalyst(slug: string): Analyst | undefined {
  return ANALYSTS.find((a) => a.slug === slug);
}

export function gradeColor(score: number): string {
  if (score >= 90) return "#2E7D32";
  if (score >= 85) return "#9A7B1F";
  return "#555555";
}
