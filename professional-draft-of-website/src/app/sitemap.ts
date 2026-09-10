import type { MetadataRoute } from "next";
import { execFileSync } from "node:child_process";

// Canonical public domain. All sitemap URLs are absolute against this host.
const BASE_URL = "https://www.gtrealestate.org";

// Public, indexable routes only. Each entry pairs a URL path with the source
// file whose last git commit date we surface as `lastModified` — an accurate,
// self-maintaining date that updates whenever the page's code actually changes.
//
// Intentionally EXCLUDED (private, auth, utility, or redirect-only):
//   /admin/*, /portal/*        → authenticated member/admin areas
//   /rolodex, /rolodex/*       → member-only Analyst Rolodex (gated)
//   /login, /forgot-password,
//   /reset-password            → auth mechanics
//   /search                    → query utility, no stable content
//   /events, /opportunities    → redirect-only (to /calendar and /portal)
type Entry = {
  path: string;
  source: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]["changeFrequency"]>;
  priority: number;
};

const ROUTES: Entry[] = [
  { path: "/", source: "src/app/page.tsx", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about", source: "src/app/about/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/analyst-program", source: "src/app/analyst-program/page.tsx", changeFrequency: "monthly", priority: 0.8 },
  { path: "/news", source: "src/app/news/page.tsx", changeFrequency: "weekly", priority: 0.7 },
  { path: "/calendar", source: "src/app/calendar/page.tsx", changeFrequency: "weekly", priority: 0.7 },
  { path: "/leadership", source: "src/app/leadership/page.tsx", changeFrequency: "monthly", priority: 0.6 },
  { path: "/advisory-board", source: "src/app/advisory-board/page.tsx", changeFrequency: "monthly", priority: 0.6 },
  { path: "/alumni", source: "src/app/alumni/page.tsx", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", source: "src/app/contact/page.tsx", changeFrequency: "yearly", priority: 0.6 },
  { path: "/signup", source: "src/app/signup/page.tsx", changeFrequency: "yearly", priority: 0.5 },
];

// Last-commit date for a file. Returns undefined (so we omit `lastModified`
// rather than fabricate one) if git isn't available or the history is too
// shallow to know — e.g. some CI checkouts.
function gitLastModified(source: string): Date | undefined {
  try {
    const iso = execFileSync("git", ["log", "-1", "--format=%cI", "--", source], {
      cwd: process.cwd(),
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    const d = iso ? new Date(iso) : undefined;
    return d && !Number.isNaN(d.getTime()) ? d : undefined;
  } catch {
    return undefined;
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, source, changeFrequency, priority }) => {
    const lastModified = gitLastModified(source);
    return {
      url: `${BASE_URL}${path}`,
      changeFrequency,
      priority,
      ...(lastModified ? { lastModified } : {}),
    };
  });
}
