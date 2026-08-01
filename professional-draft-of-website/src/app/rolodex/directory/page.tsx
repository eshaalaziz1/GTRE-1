"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ANALYSTS, STATUS_META, type Analyst } from "@/lib/analysts";

type SortKey = "caseStudy" | "gpa" | "attendance" | "name";

const SORTS: [SortKey, string][] = [
  ["caseStudy", "Case Study Score"],
  ["gpa", "GPA"],
  ["attendance", "Attendance"],
  ["name", "Name (A-Z)"],
];

const ALL_SKILLS = Array.from(new Set(ANALYSTS.flatMap((a) => a.skills))).sort();
const GRAD_YEARS = Array.from(new Set(ANALYSTS.map((a) => a.gradYear))).sort();

export default function AnalystDirectory() {
  const [query, setQuery] = useState("");
  const [gradYear, setGradYear] = useState("All");
  const [status, setStatus] = useState("All");
  const [skill, setSkill] = useState("All");
  const [sort, setSort] = useState<SortKey>("caseStudy");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = ANALYSTS.filter((a) => {
      const haystack = [
        a.name,
        a.major,
        a.concentration,
        a.bio,
        a.resumeText,
        ...a.skills,
        ...a.interests,
        ...a.experiences.map((e) => `${e.company} ${e.role}`),
      ]
        .join(" ")
        .toLowerCase();
      const matchesQuery = !q || haystack.includes(q);
      const matchesYear = gradYear === "All" || String(a.gradYear) === gradYear;
      const matchesStatus = status === "All" || a.status === status;
      const matchesSkill = skill === "All" || a.skills.includes(skill);
      return matchesQuery && matchesYear && matchesStatus && matchesSkill;
    });

    list = [...list].sort((a, b) => {
      if (sort === "caseStudy") return b.caseStudyScore - a.caseStudyScore;
      if (sort === "gpa") return b.gpa - a.gpa;
      if (sort === "attendance") return b.attendancePct - a.attendancePct;
      return a.name.localeCompare(b.name);
    });
    return list;
  }, [query, gradYear, status, skill, sort]);

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
          A vetted roster of Georgia Tech&apos;s strongest real estate students.
          Every profile is backed by what the club tracks all semester: academics,
          attendance, graded case-study work, and professional experience.
        </p>
      </section>

      {ANALYSTS.length === 0 ? (
        <ComingSoon />
      ) : (
        <DirectoryBody
          query={query}
          setQuery={setQuery}
          gradYear={gradYear}
          setGradYear={setGradYear}
          status={status}
          setStatus={setStatus}
          skill={skill}
          setSkill={setSkill}
          sort={sort}
          setSort={setSort}
          results={results}
        />
      )}
    </div>
  );
}

function ComingSoon() {
  return (
    <section className="mt-2 mb-24">
      <div className="rounded-2xl border border-dashed border-border bg-surface">
        <div className="max-w-xl mx-auto text-center py-20 px-6">
          <div className="w-16 h-16 rounded-2xl bg-navy/5 flex items-center justify-center mx-auto mb-6">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003057" strokeWidth="1.7">
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <h2 className="display text-2xl text-navy">The directory launches Fall 2026</h2>
          <p className="text-secondary mt-3 leading-relaxed">
            Analyst profiles go live once the Fall 2026 cohort is enrolled and the
            club has tracked a semester of academics, attendance, and graded
            case-study work. Recruiters and alumni with approved access will be
            able to search by role, industry, and skill here.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/contact" className="px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
              Get in touch with the club
            </Link>
            <Link href="/rolodex" className="px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-white transition-colors">
              About the Rolodex
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

type SortSetter = (v: SortKey) => void;

function DirectoryBody({
  query,
  setQuery,
  gradYear,
  setGradYear,
  status,
  setStatus,
  skill,
  setSkill,
  sort,
  setSort,
  results,
}: {
  query: string;
  setQuery: (v: string) => void;
  gradYear: string;
  setGradYear: (v: string) => void;
  status: string;
  setStatus: (v: string) => void;
  skill: string;
  setSkill: (v: string) => void;
  sort: SortKey;
  setSort: SortSetter;
  results: Analyst[];
}) {
  return (
    <>
      {/* Controls */}
      <section className="bg-white border border-border rounded-xl shadow-sm p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[280px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, role, company, industry, or resume keyword…"
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg text-sm text-text outline-none focus:border-navy"
          />
          <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-secondary" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </div>
        <Dropdown label="Grad Year" value={gradYear} onChange={setGradYear}
          options={["All", ...GRAD_YEARS.map(String)]} />
        <Dropdown label="Status" value={status} onChange={setStatus}
          options={["All", "Available", "Looking for opportunities", "Interning"]} />
        <Dropdown label="Skill" value={skill} onChange={setSkill}
          options={["All", ...ALL_SKILLS]} />
        <Dropdown label="Sort" value={sort} onChange={(v) => setSort(v as SortKey)}
          options={SORTS} />
      </section>

      {/* Grid */}
      <section className="mt-6 pb-20">
        <div className="text-xs uppercase tracking-[0.14em] text-secondary mb-4">
          {results.length} {results.length === 1 ? "analyst" : "analysts"}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((a) => {
            const sm = STATUS_META[a.status];
            return (
              <Link
                key={a.id}
                href={`/rolodex/directory/${a.slug}`}
                className="group bg-white border border-border rounded-xl p-6 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <span className="text-[22px] leading-tight text-navy font-semibold group-hover:text-gold-hover transition-colors">
                  {a.name}
                </span>
                <div className="text-[11px] font-medium mt-1.5" style={{ color: sm.color }}>
                  {sm.label}
                </div>
                <div className="text-[13px] text-secondary mt-1">
                  {a.concentration} · {a.major}
                </div>
                <div className="text-[12px] text-secondary">Class of {a.gradYear}</div>

                <div className="grid grid-cols-3 gap-2 mt-5 pt-5 border-t border-border">
                  <Stat label="GPA" value={a.gpa.toFixed(2)} />
                  <Stat label="Attend." value={`${a.attendancePct}%`} />
                  <Stat label="Case" value={`${a.caseStudyScore}`} />
                </div>

                <div className="flex flex-wrap gap-1.5 mt-5">
                  {a.skills.slice(0, 3).map((s) => (
                    <span key={s} className="text-[11px] px-2 py-0.5 rounded-md bg-gold-soft text-navy">
                      {s}
                    </span>
                  ))}
                  {a.skills.length > 3 && (
                    <span className="text-[11px] px-2 py-0.5 text-secondary">
                      +{a.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="mt-5 text-xs font-semibold text-gold-hover group-hover:translate-x-0.5 transition-transform">
                  View full profile →
                </div>
              </Link>
            );
          })}
        </div>

        {results.length === 0 && (
          <div className="text-center text-secondary py-20">No analysts match that search.</div>
        )}
      </section>
    </>
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
  options: (string | [string, string])[];
}) {
  return (
    <label className="flex items-center gap-2 text-xs text-secondary">
      <span className="uppercase tracking-[0.12em] font-semibold whitespace-nowrap">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-3 py-2.5 border border-border rounded-lg bg-white text-navy text-sm outline-none focus:border-navy"
      >
        {options.map((o) => {
          const [val, lbl] = Array.isArray(o) ? o : [o, o];
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[17px] font-bold text-navy leading-none">{value}</div>
      <div className="text-[10px] uppercase tracking-wide text-secondary mt-1">{label}</div>
    </div>
  );
}
