"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { NEWS } from "@/lib/content";

function countBy(values: string[]): [string, number][] {
  const m = new Map<string, number>();
  values.forEach((v) => m.set(v, (m.get(v) ?? 0) + 1));
  return [...m.entries()].sort((a, b) => a[0].localeCompare(b[0]));
}

const CATEGORIES = countBy(NEWS.map((n) => n.category));
const TAGS = countBy(NEWS.flatMap((n) => n.tags));

export default function NewsPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [tag, setTag] = useState("Any");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return NEWS.filter((n) => {
      const matchesQuery = !q || `${n.title} ${n.excerpt}`.toLowerCase().includes(q);
      const matchesCat = category === "All" || n.category === category;
      const matchesTag = tag === "Any" || n.tags.includes(tag);
      return matchesQuery && matchesCat && matchesTag;
    });
  }, [query, category, tag]);

  return (
    <>
      <Breadcrumb trail={[{ label: "News" }]} />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-16">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-6">News</h1>

        {/* Newsletter banner */}
        <a
          href="#"
          className="group flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-navy rounded-xl px-7 py-6 mb-10"
        >
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.2em] mb-1">
              The GTRE Newsletter
            </div>
            <div className="display text-2xl text-white">Read the latest issue</div>
            <div className="text-white/70 text-sm mt-1">
              Market takes, member wins, and recruiting updates, straight to your inbox.
            </div>
          </div>
          <span className="shrink-0 px-7 py-3.5 rounded-md bg-gold text-navy text-sm font-bold group-hover:bg-gold-hover transition-colors">
            View the newsletter →
          </span>
        </a>

        <div className="grid lg:grid-cols-[260px_1fr] gap-10">
          {/* Filter sidebar */}
          <aside className="lg:border-r lg:border-border lg:pr-8">
            <div className="text-[12px] font-bold uppercase tracking-[0.16em] text-navy mb-4">
              Filters
            </div>

            <div className="relative mb-7">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search news"
                className="w-full pl-9 pr-3 py-2 border border-border rounded-md text-sm outline-none focus:border-navy"
              />
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" /><line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </div>

            <FilterList
              label="Categories"
              all="All"
              active={category}
              onSelect={setCategory}
              items={CATEGORIES}
            />
            <FilterList
              label="Tags"
              all="Any"
              active={tag}
              onSelect={setTag}
              items={TAGS}
            />
          </aside>

          {/* Card grid */}
          <div>
            <div className="text-xs uppercase tracking-[0.14em] text-secondary border-b border-border pb-3 mb-6">
              {results.length} {results.length === 1 ? "article" : "articles"}
            </div>

            {results.length === 0 ? (
              <div className="text-secondary py-16 text-center">No articles match those filters.</div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {results.map((n) => (
                  <Link
                    key={n.slug}
                    href="/news"
                    className="group bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden bg-navy">
                      <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#003057 0%,#00253f 55%,#001f3a 100%)" }} />
                      <div className="absolute inset-0 opacity-25" style={{ background: "radial-gradient(circle at 75% 25%,#b3a369 0%,transparent 55%)" }} />
                      <span className="absolute bottom-2 left-3 text-white/40 text-[10px] uppercase tracking-[0.18em]">{n.category}</span>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <h2 className="text-[16px] font-semibold text-navy leading-snug group-hover:text-gold-hover transition-colors">
                        {n.title}
                      </h2>
                      <div className="text-[12.5px] text-secondary mt-auto pt-3">{n.date}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function FilterList({
  label,
  all,
  active,
  onSelect,
  items,
}: {
  label: string;
  all: string;
  active: string;
  onSelect: (v: string) => void;
  items: [string, number][];
}) {
  return (
    <div className="mb-7">
      <div className="text-[13px] font-semibold text-navy mb-2.5">{label}</div>
      <ul className="space-y-1.5 text-[13.5px]">
        <li>
          <button
            onClick={() => onSelect(all)}
            className={active === all ? "text-navy font-semibold" : "text-secondary hover:text-navy"}
          >
            {all === "All" ? "All Categories" : "Any"}
          </button>
        </li>
        {items.map(([name, count]) => (
          <li key={name}>
            <button
              onClick={() => onSelect(name)}
              className={active === name ? "text-navy font-semibold" : "text-secondary hover:text-navy"}
            >
              {name} <span className="text-secondary/70">({count})</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
