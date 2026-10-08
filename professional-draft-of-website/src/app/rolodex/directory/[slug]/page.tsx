"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useGtre } from "@/lib/store/GtreStore";
import type { RolodexProfile } from "@/lib/store/types";

const STATUS_META: Record<RolodexProfile["status"], { label: string; color: string }> = {
  Available: { label: "Available", color: "#2E7D32" },
  "Looking for opportunities": { label: "Looking for opportunities", color: "#9A7B1F" },
  Interning: { label: "Currently interning", color: "#003057" },
};

export default function AnalystProfile() {
  const params = useParams<{ slug: string }>();
  const { state } = useGtre();
  const a = state.rolodexProfiles.find((r) => r.slug === params.slug && r.published);
  if (!a) return notFound();

  const account = state.accounts.find((acc) => acc.id === a.accountId);
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
              {[a.concentration, a.major].filter(Boolean).join(" · ")}
            </div>
            <div className="text-[13px] text-secondary">
              {[a.gradYear ? `Class of ${a.gradYear}` : "", a.hometown].filter(Boolean).join(" · ")}
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {a.linkedin && (
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
            )}
            {a.resumeUrl && (
              <a
                href={a.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-surface transition-colors"
              >
                ⬇ Resume
              </a>
            )}
            {account?.email && (
              <a
                href={`mailto:${account.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-border text-secondary text-sm font-semibold hover:bg-surface transition-colors"
              >
                Contact
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-10 grid md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-9">
          {a.bio && <p className="text-[15px] leading-relaxed text-text">{a.bio}</p>}

          {a.coursework.length > 0 && (
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
          )}

          {a.experiences.length > 0 && (
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
          )}
        </div>

        <aside className="space-y-9">
          {a.skills.length > 0 && (
            <Block title="Skills">
              <div className="flex flex-wrap gap-2">
                {a.skills.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-gold-soft text-navy">{s}</span>
                ))}
              </div>
            </Block>
          )}

          {a.disciplines.length > 0 && (
            <Block title="Focus Areas">
              <div className="flex flex-wrap gap-2">
                {a.disciplines.map((s) => (
                  <span key={s} className="text-xs px-2.5 py-1 rounded-md border border-navy/25 text-navy">{s}</span>
                ))}
              </div>
            </Block>
          )}
        </aside>
      </section>
    </>
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
