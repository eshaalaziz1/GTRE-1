"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  MEMBERS,
  MEMBER_DISCIPLINES,
  MEMBER_GRAD_YEARS,
  memberInitials,
  type RolodexMember,
} from "@/lib/members";

export default function AnalystDirectory() {
  const [query, setQuery] = useState("");
  const [gradYear, setGradYear] = useState("All");
  const [discipline, setDiscipline] = useState("All");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return MEMBERS.filter((m) => {
      const haystack = [m.name, m.major, m.year, m.interests, m.experience, ...m.disciplines]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesYear = gradYear === "All" || String(m.gradYear) === gradYear;
      const matchesDiscipline = discipline === "All" || m.disciplines.includes(discipline);
      return matchesQuery && matchesYear && matchesDiscipline;
    });
  }, [query, gradYear, discipline]);

  return (
    <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
      {/* Intro */}
      <section className="pt-8 pb-6">
        <Link href="/rolodex" className="text-[13px] text-secondary hover:text-navy">
          ← Back to the Analyst Rolodex
        </Link>
        <div className="text-[11px] font-semibold uppercase tracking-[0.22em] text-gold-hover mt-6 mb-3">
          Analyst Rolodex
        </div>
        <h1 className="display text-4xl sm:text-5xl text-navy">The Analyst Directory</h1>
        <p className="mt-4 text-[15px] leading-relaxed text-secondary max-w-3xl">
          This year&apos;s Mentorship Program members — their focus areas, interests,
          and experience. Search and filter to find the students who fit what
          you&apos;re looking for, then reach them through the club.
        </p>
      </section>

      {MEMBERS.length === 0 ? (
        <ComingSoon />
      ) : (
        <>
          {/* Controls */}
          <section className="bg-white border border-border rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[280px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, major, focus area, or experience…"
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm text-text outline-none focus:border-navy"
              />
              <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </div>
            <Dropdown label="Focus" value={discipline} onChange={setDiscipline}
              options={["All", ...MEMBER_DISCIPLINES]} />
            <Dropdown label="Grad Year" value={gradYear} onChange={setGradYear}
              options={["All", ...MEMBER_GRAD_YEARS.map(String)]} />
          </section>

          {/* Grid */}
          <section className="mt-6 pb-20">
            <div className="text-xs uppercase tracking-[0.14em] text-secondary mb-4">
              {results.length} {results.length === 1 ? "member" : "members"}
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((m) => (
                <MemberCard key={m.id} m={m} />
              ))}
            </div>
            {results.length === 0 && (
              <div className="text-center text-secondary py-20">No members match that search.</div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

function MemberCard({ m }: { m: RolodexMember }) {
  return (
    <div className="flex flex-col bg-white border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Initials avatar — swapped for a photo later */}
        <div className="shrink-0 w-14 h-14 rounded-full bg-gold-soft text-navy flex items-center justify-center font-semibold ring-1 ring-navy/15 shadow-[0_1px_4px_rgba(0,0,0,0.10)]">
          {memberInitials(m.name)}
        </div>
        <div className="min-w-0">
          <div className="text-[17px] font-bold text-navy leading-tight">{m.name}</div>
          <div className="text-[13px] text-secondary mt-0.5">
            {m.year}
            {m.grad ? ` · ${m.grad}` : ""}
          </div>
        </div>
      </div>

      {m.major && <div className="text-[13px] text-secondary mt-3">{m.major}</div>}

      {m.disciplines.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {m.disciplines.slice(0, 4).map((d) => (
            <span key={d} className="text-[11px] px-2 py-0.5 rounded-md bg-gold-soft text-navy">
              {d}
            </span>
          ))}
          {m.disciplines.length > 4 && (
            <span className="text-[11px] px-2 py-0.5 text-secondary">+{m.disciplines.length - 4}</span>
          )}
        </div>
      )}

      {m.interests && (
        <p className="text-[13px] text-secondary leading-relaxed mt-4 line-clamp-5">{m.interests}</p>
      )}

      {m.experience && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-gold-hover mb-1">Experience</div>
          <p className="text-[13px] text-secondary leading-relaxed line-clamp-3">{m.experience}</p>
        </div>
      )}
    </div>
  );
}

function ComingSoon() {
  return (
    <section className="mt-2 mb-24">
      <div className="rounded-2xl border border-dashed border-border bg-surface">
        <div className="max-w-xl mx-auto text-center py-20 px-6">
          <h2 className="display text-2xl text-navy">The directory launches soon</h2>
          <p className="text-secondary mt-3 leading-relaxed">
            Member profiles go live once this year&apos;s cohort is enrolled.
          </p>
          <div className="mt-8">
            <Link href="/contact" className="px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
              Get in touch with the club
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function Dropdown({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-secondary">
      <span className="uppercase tracking-[0.12em] font-semibold whitespace-nowrap">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2.5 border border-border rounded-lg bg-white text-navy text-sm outline-none focus:border-navy max-w-[220px]"
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
