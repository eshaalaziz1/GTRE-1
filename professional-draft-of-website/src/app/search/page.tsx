"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge, EmptyState } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";
import { STATIC_INDEX, scoreMatch, type SearchItem } from "@/lib/search";

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchInner />
    </Suspense>
  );
}

function SearchInner() {
  const params = useSearchParams();
  const initial = params.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const { state } = useGtre();

  // Merge store-backed content (events, announcements, materials) into the index
  // so members can find their schedule, updates, and documents from search too.
  const dynamic: SearchItem[] = useMemo(
    () => [
      ...state.events.map((e) => ({
        title: e.title,
        description: `${e.track} · ${new Date(e.date + "T12:00:00").toLocaleDateString()}${e.location ? " · " + e.location : ""}`,
        href: "/calendar",
        category: "Event",
        keywords: `${e.type} ${e.track}`,
      })),
      ...state.announcements.map((a) => ({
        title: a.title,
        description: a.body,
        href: "/portal",
        category: "Announcement",
        keywords: a.category,
      })),
      ...state.resources.map((r) => ({
        title: r.title,
        description: r.description ?? "",
        href: "/portal/resources",
        category: "Material",
        keywords: r.category,
      })),
      ...state.opportunities.map((o) => ({
        title: o.title,
        description: `${o.company} · ${o.location}`,
        href: "/portal/opportunities",
        category: "Opportunity",
        keywords: `${o.jobType} ${o.sector} jobs internships careers ${o.company}`,
      })),
    ],
    [state.events, state.announcements, state.resources, state.opportunities],
  );

  const q = query.trim().toLowerCase();
  const results = useMemo(() => {
    if (!q) return [];
    return [...STATIC_INDEX, ...dynamic]
      .map((item) => ({ item, score: scoreMatch(item, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40);
  }, [q, dynamic]);

  return (
    <>
      <Breadcrumb trail={[{ label: "Search" }]} />
      <section className="mx-auto max-w-[880px] px-6 lg:px-10 pt-4 pb-16">
        <h1 className="display text-4xl text-navy mb-5">Search</h1>

        <div className="relative">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, news, events, people…"
            className="w-full pl-11 pr-4 py-3.5 border border-border rounded-xl text-[15px] outline-none focus:border-navy"
          />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-secondary" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </div>

        <div className="mt-8">
          {!q ? (
            <p className="text-secondary text-sm">Start typing to search across the site.</p>
          ) : results.length === 0 ? (
            <EmptyState title={`No results for “${query}”.`} body="Try a different term, a page name, person, event, or topic." />
          ) : (
            <>
              <p className="text-[13px] text-secondary mb-4">
                {results.length} result{results.length === 1 ? "" : "s"} for “{query}”
              </p>
              <div className="space-y-2">
                {results.map((r, i) => (
                  <Link
                    key={`${r.item.href}-${i}`}
                    href={r.item.href}
                    className="block bg-white border border-border rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Badge tone="gray">{r.item.category}</Badge>
                    </div>
                    <div className="font-semibold text-navy">{r.item.title}</div>
                    {r.item.description && <p className="text-[14px] text-secondary mt-0.5 line-clamp-2">{r.item.description}</p>}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}
