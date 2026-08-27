// Helpers for presenting Case Study materials (a subset of resources, category
// "Case Study") grouped into readable sections with a file-type badge. Grouping
// is inferred from each resource's title/description so admins can add new
// materials from Admin → Materials and they land in the right section
// automatically; anything unrecognized falls into "Other Materials".

import type { Resource } from "@/lib/store/types";

export const CASE_STUDY_GROUPS = [
  "Examples",
  "Models & Templates",
  "Prompts & Rubric",
  "Other Materials",
] as const;

export type CaseStudyGroup = (typeof CASE_STUDY_GROUPS)[number];

export function caseStudyGroup(r: Resource): CaseStudyGroup {
  const t = `${r.title} ${r.description ?? ""}`.toLowerCase();
  if (/example|sample|worked/.test(t)) return "Examples";
  if (/model|template|proforma|pro forma|underwrit|development|portfolio/.test(t)) return "Models & Templates";
  if (/prompt|rubric|scenario|brief|syllabus/.test(t)) return "Prompts & Rubric";
  return "Other Materials";
}

// A short badge for the file type, derived from the URL extension.
export function fileKind(url: string): string {
  const ext = url.split("?")[0].split("#")[0].split(".").pop()?.toLowerCase() ?? "";
  if (["xlsx", "xls", "csv"].includes(ext)) return "XLSX";
  if (ext === "pdf") return "PDF";
  if (["docx", "doc"].includes(ext)) return "DOC";
  if (["pptx", "ppt"].includes(ext)) return "PPT";
  return "FILE";
}

export function groupCaseStudy(items: Resource[]) {
  return CASE_STUDY_GROUPS.map((group) => ({
    group,
    items: items.filter((r) => caseStudyGroup(r) === group),
  })).filter((s) => s.items.length > 0);
}
