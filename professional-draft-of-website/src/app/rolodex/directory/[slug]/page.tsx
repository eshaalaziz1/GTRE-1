"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { getAnalyst, gradeColor, STATUS_META } from "@/lib/analysts";

export default function AnalystProfile() {
  const params = useParams<{ slug: string }>();
  const a = getAnalyst(params.slug);
  if (!a) return notFound();

  const sm = STATUS_META[a.status];

  return (
    <>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <Link
          href="/rolodex/directory"
          className="inline-flex items-center gap-1.5 text-[13px] text-secondary hover:text-navy transition-colors mt-8"
        >
          ← Back to directory
        </Link>
      </div>

      {/* Identity header */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 pt-6 pb-8 border-b border-border">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div>
            <div className="text-[11px] font-medium mb-2" style={{ color: sm.color }}>
              {sm.label}
            </div>
            <h1 className="display text-4xl sm:text-5xl text-navy">{a.name}</h1>
            <div className="mt-3 text-[15px] text-secondary">
              {a.concentration} · {a.major}
            </div>
            <div className="text-[13px] text-secondary">
              Class of {a.gradYear} · {a.hometown}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <a
              href={a.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
            </a>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-surface transition-colors">
              ⬇ Resume
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-secondary text-sm font-semibold hover:bg-surface transition-colors">
              Contact
            </button>
          </div>
        </div>
      </section>

      {/* Stat strip */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border border-b border-border">
          <Stat label="GPA" value={a.gpa.toFixed(2)} sub="cumulative" />
          <Stat label="Attendance" value={`${a.attendancePct}%`} sub="club meetings" />
          <Stat label="Assignments" value={`${a.assignmentsDone}/${a.assignmentsTotal}`} sub="completed" />
          <Stat
            label="Case Study"
            value={`${a.caseStudyScore}`}
            sub={`rank ${a.caseStudyRank} of ${a.caseStudyField}`}
            color={gradeColor(a.caseStudyScore)}
          />
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-9">
          <p className="text-[15px] leading-relaxed text-text">{a.bio}</p>

          <Block title="Case Study Presentation">
            <div className="border border-border rounded-lg p-5">
              <div className="text-lg text-navy font-semibold">{a.caseStudyTitle}</div>
              <div className="flex items-center gap-6 mt-4">
                <div>
                  <div className="text-2xl font-bold" style={{ color: gradeColor(a.caseStudyScore) }}>
                    {a.caseStudyScore}
                    <span className="text-base text-secondary font-normal">/100</span>
                  </div>
                  <div className="text-[11px] uppercase tracking-wide text-secondary">Graded score</div>
                </div>
                <div className="h-9 w-px bg-border" />
                <div>
                  <div className="text-2xl font-bold text-navy">#{a.caseStudyRank}</div>
                  <div className="text-[11px] uppercase tracking-wide text-secondary">
                    of {a.caseStudyField} presenters
                  </div>
                </div>
              </div>
            </div>
          </Block>

          <Block title="Relevant Coursework">
            <div className="border border-border rounded-lg divide-y divide-border">
              {a.coursework.map((c) => (
                <div key={c.course} className="flex items-center justify-between px-4 py-3">
                  <span className="text-sm text-text">{c.course}</span>
                  <span className="text-sm font-semibold text-navy">{c.grade}</span>
                </div>
              ))}
            </div>
          </Block>

          <Block title="Experience">
            <div className="border border-border rounded-lg divide-y divide-border">
              {a.experiences.map((e) => (
                <div key={`${e.company}-${e.role}`} className="flex items-baseline justify-between gap-4 px-4 py-3">
                  <div>
                    <div className="text-sm font-semibold text-navy">{e.company}</div>
                    <div className="text-[13px] text-secondary">{e.role}</div>
                  </div>
                  <div className="text-[12px] text-secondary whitespace-nowrap">{e.period}</div>
                </div>
              ))}
            </div>
          </Block>
        </div>

        <aside className="space-y-9">
          <Block title="Skills">
            <div className="flex flex-wrap gap-2">
              {a.skills.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-gold-soft text-navy">{s}</span>
              ))}
            </div>
          </Block>

          <Block title="Focus Areas">
            <div className="flex flex-wrap gap-2">
              {a.interests.map((s) => (
                <span key={s} className="text-xs px-2.5 py-1 rounded-md border border-navy/25 text-navy">{s}</span>
              ))}
            </div>
          </Block>

          <Block title="Resume Search">
            <p className="text-[12px] leading-relaxed text-secondary">
              This analyst&apos;s uploaded resume is indexed. From the directory,
              search any role, industry, or company to surface every analyst whose
              resume matches.
            </p>
          </Block>
        </aside>
      </section>
    </>
  );
}

function Stat({ label, value, sub, color }: { label: string; value: string; sub: string; color?: string }) {
  return (
    <div className="px-4 py-5 first:pl-0">
      <div className="text-2xl font-bold" style={{ color: color || "#003057" }}>{value}</div>
      <div className="text-[12px] font-semibold text-navy mt-0.5">{label}</div>
      <div className="text-[11px] text-secondary">{sub}</div>
    </div>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary mb-3">{title}</h2>
      {children}
    </div>
  );
}
