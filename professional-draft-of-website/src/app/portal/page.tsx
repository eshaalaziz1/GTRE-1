"use client";

import Link from "next/link";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Card } from "@/components/ui";

// Portal home: a dashboard of announcements, quick stats, upcoming dates, and
// club info — the member's at-a-glance view.
export default function PortalHome() {
  const { state, currentAccount } = useGtre();
  const me = currentAccount!;

  const mySubmissions = state.submissions.filter((s) => s.accountId === me.id);
  const graded = mySubmissions.filter((s) => s.grade != null);
  const myCheckIns = state.checkIns.filter((c) => c.accountId === me.id);
  const openAssignments = state.assignments.filter(
    (a) => a.published && !mySubmissions.some((s) => s.assignmentId === a.id),
  );

  const upcoming = [...state.events]
    .filter((e) => e.date >= "2026-07-01")
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 4);

  const pinned = state.announcements.filter((a) => a.pinned);
  const recent = state.announcements.filter((a) => !a.pinned).slice(0, 4);

  return (
    <div className="space-y-8">
      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Assignments due" value={openAssignments.length} href="/portal/assignments" />
        <Stat label="Graded" value={graded.length} href="/portal/grades" />
        <Stat label="Check-ins" value={myCheckIns.length} href="/portal/check-in" />
        <Stat label="Materials" value={state.resources.length} href="/portal/resources" />
      </div>

      {/* Announcements */}
      <section>
        <h2 className="display text-2xl text-navy mb-4">Announcements</h2>
        <div className="space-y-4">
          {[...pinned, ...recent].map((a) => (
            <Card key={a.id}>
              <div className="flex items-center gap-2 mb-1.5">
                {a.pinned && <Badge tone="gold">Pinned</Badge>}
                <Badge tone="navy">{a.category}</Badge>
                <span className="text-[12px] text-secondary ml-auto">
                  {new Date(a.createdAt).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-navy">{a.title}</h3>
              <p className="text-[15px] text-secondary mt-1 leading-relaxed">{a.body}</p>
              <div className="text-[12px] text-secondary mt-2">— {a.authorName}</div>
            </Card>
          ))}
        </div>
      </section>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Upcoming */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="display text-2xl text-navy">Upcoming</h2>
            <Link href="/calendar" className="text-[13px] font-semibold text-gold-hover hover:text-navy">
              Full calendar →
            </Link>
          </div>
          <div className="space-y-3">
            {upcoming.map((e) => (
              <div key={e.id} className="flex items-center gap-4 bg-white border border-border rounded-xl p-4">
                <div className="text-center w-14 shrink-0">
                  <div className="text-[11px] uppercase text-gold-hover font-semibold">
                    {new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
                  </div>
                  <div className="text-2xl text-navy display leading-none">
                    {new Date(e.date + "T12:00:00").getDate()}
                  </div>
                </div>
                <div className="min-w-0">
                  <div className="font-semibold text-navy truncate">{e.title}</div>
                  <div className="text-[13px] text-secondary">
                    {[e.time, e.location].filter(Boolean).join(" · ") || e.type}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Club info */}
        <section>
          <h2 className="display text-2xl text-navy mb-4">Club info</h2>
          <Card>
            <dl className="space-y-3 text-sm">
              <Row term="Meetings" desc={state.siteInfo.meetingTime} />
              <Row term="Location" desc={state.siteInfo.meetingLocation} />
              <Row
                term="Contact"
                desc={
                  <a href={`mailto:${state.siteInfo.contactEmail}`} className="text-gold-hover hover:text-navy">
                    {state.siteInfo.contactEmail}
                  </a>
                }
              />
            </dl>
            <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-2">
              <Link href="/analyst-program" className="text-[13px] font-semibold text-gold-hover hover:text-navy">
                Analyst Program →
              </Link>
              <Link href="/portal/resources" className="text-[13px] font-semibold text-gold-hover hover:text-navy ml-4">
                Documents & links →
              </Link>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value, href }: { label: string; value: number; href: string }) {
  return (
    <Link href={href} className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow block">
      <div className="text-3xl display text-navy">{value}</div>
      <div className="text-[13px] text-secondary mt-1">{label}</div>
    </Link>
  );
}

function Row({ term, desc }: { term: string; desc: React.ReactNode }) {
  return (
    <div className="flex gap-3">
      <dt className="w-24 shrink-0 text-[12px] font-semibold text-navy uppercase tracking-wide pt-0.5">{term}</dt>
      <dd className="text-secondary">{desc}</dd>
    </div>
  );
}
