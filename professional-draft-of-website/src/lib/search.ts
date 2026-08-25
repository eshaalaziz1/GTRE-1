// Lightweight client-side search index. Aggregates static site content (pages,
// news, advisory board, analysts) into a flat list the /search page can filter.
// Store-backed content (events, announcements, materials) is merged in at query
// time by the search page since it lives in the client store.

import { BOARD } from "./board";
import { ANALYSTS } from "./analysts";
import { EXEC_TERMS } from "./leadership";
import { OPPORTUNITIES } from "./opportunities";

export type SearchItem = {
  title: string;
  description: string;
  href: string;
  category: string;
  keywords?: string;
};

// Top-level pages, so a search for "syllabus" or "alumni" jumps straight there.
const PAGES: SearchItem[] = [
  { title: "About", description: "Mission, values, and how to get involved.", href: "/about", category: "Page" },
  { title: "Mentorship Program", description: "Overview, curriculum, syllabus, and resources.", href: "/analyst-program", category: "Page", keywords: "syllabus curriculum program analyst" },
  { title: "Syllabus", description: "The Mentorship Program syllabus (view-only).", href: "/analyst-program", category: "Page", keywords: "syllabus document" },
  { title: "Calendar", description: "Meetings, the Mentorship Program, and industry events.", href: "/calendar", category: "Page", keywords: "schedule events dates calendar" },
  { title: "News", description: "The latest from the club, from our LinkedIn.", href: "/news", category: "Page", keywords: "news linkedin posts updates recaps" },
  { title: "Opportunities", description: "Internships, co-ops, and full-time analyst roles.", href: "/opportunities", category: "Page", keywords: "jobs internships careers opportunities hiring recruiting analyst" },
  { title: "Alumni", description: "The alumni network and ways to give back.", href: "/alumni", category: "Page" },
  { title: "Leadership", description: "The student executive board.", href: "/leadership", category: "Page", keywords: "exec board officers president leadership team" },
  { title: "Advisory Board", description: "Industry leaders and active alumni who guide the club.", href: "/alumni", category: "Page", keywords: "advisory board alumni board advisors mentors" },
  { title: "Contact Us", description: "Reach club leadership directly.", href: "/contact", category: "Page" },
  { title: "Analyst Rolodex", description: "Vetted analyst directory for recruiters and alumni.", href: "/rolodex", category: "Page", keywords: "recruiters hire companies rolodex" },
  { title: "Member Portal", description: "Assignments, check-in, materials, and more.", href: "/portal", category: "Page", keywords: "login member portal" },
];

export const STATIC_INDEX: SearchItem[] = [
  ...PAGES,
  ...BOARD.map((m) => ({
    title: m.name,
    description: m.role,
    href: "/advisory-board",
    category: "Advisory Board",
    keywords: `advisory board advisor ${m.role}`,
  })),
  ...ANALYSTS.map((a) => ({
    title: a.name,
    description: `${a.major} · Class of ${a.gradYear}`,
    href: `/rolodex/directory/${a.slug}`,
    category: "Analyst",
    keywords: `${a.skills.join(" ")} ${a.interests.join(" ")}`,
  })),
  ...EXEC_TERMS.flatMap((t) =>
    t.members.map((m) => ({
      title: m.name,
      description: `${m.role} · ${t.term}`,
      href: "/leadership",
      category: "Leadership",
      keywords: `${m.role} exec board ${t.term}`,
    })),
  ),
  ...OPPORTUNITIES.map((o) => ({
    title: o.title,
    description: `${o.company} · ${o.location}`,
    href: "/opportunities",
    category: "Opportunity",
    keywords: `${o.jobType} ${o.sector} jobs internships careers ${o.company}`,
  })),
];

export function scoreMatch(item: SearchItem, q: string): number {
  const hay = `${item.title} ${item.description} ${item.keywords ?? ""}`.toLowerCase();
  const title = item.title.toLowerCase();
  if (!q) return 0;
  if (title === q) return 100;
  if (title.startsWith(q)) return 80;
  if (title.includes(q)) return 60;
  if (hay.includes(q)) return 30;
  // token match: every word in the query appears somewhere
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1 && tokens.every((t) => hay.includes(t))) return 20;
  return 0;
}
