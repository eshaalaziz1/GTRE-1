// Lightweight client-side search index. Aggregates static site content (pages,
// news, advisory board, analysts) into a flat list the /search page can filter.
// Store-backed content (events, announcements, materials) is merged in at query
// time by the search page since it lives in the client store.

import { NEWS } from "./content";
import { BOARD } from "./board";
import { ANALYSTS } from "./analysts";

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
  { title: "Analyst Program", description: "Overview, curriculum, syllabus, and resources.", href: "/analyst-program", category: "Page", keywords: "syllabus curriculum program analyst" },
  { title: "Syllabus", description: "The Analyst Program syllabus (view-only).", href: "/analyst-program", category: "Page", keywords: "syllabus document" },
  { title: "Calendar", description: "Meetings, the Analyst Program, and industry events.", href: "/calendar", category: "Page", keywords: "schedule events dates calendar" },
  { title: "News", description: "Club updates, recaps, and announcements.", href: "/news", category: "Page" },
  { title: "Events", description: "Panels, workshops, and networking nights.", href: "/events", category: "Page" },
  { title: "Alumni", description: "The alumni network and ways to give back.", href: "/alumni", category: "Page" },
  { title: "Advisory Board", description: "Industry leaders who guide the club.", href: "/advisory-board", category: "Page" },
  { title: "Contact Us", description: "Reach club leadership directly.", href: "/contact", category: "Page" },
  { title: "Analyst Rolodex", description: "Vetted analyst directory for recruiters and alumni.", href: "/rolodex", category: "Page", keywords: "recruiters hire companies rolodex" },
  { title: "Member Portal", description: "Assignments, check-in, materials, and more.", href: "/portal", category: "Page", keywords: "login member portal" },
];

export const STATIC_INDEX: SearchItem[] = [
  ...PAGES,
  ...NEWS.map((n) => ({
    title: n.title,
    description: n.excerpt,
    href: "/news",
    category: "News",
    keywords: `${n.category} ${n.tags.join(" ")}`,
  })),
  ...BOARD.map((m) => ({
    title: m.name,
    description: `${m.position}, ${m.organization}`,
    href: `/advisory-board/${m.slug}`,
    category: "Advisory Board",
    keywords: `${m.group} ${m.focus.join(" ")}`,
  })),
  ...ANALYSTS.map((a) => ({
    title: a.name,
    description: `${a.major} · Class of ${a.gradYear}`,
    href: `/rolodex/directory/${a.slug}`,
    category: "Analyst",
    keywords: `${a.skills.join(" ")} ${a.interests.join(" ")}`,
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
