"use client";

import { useMemo, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import RequireAuth from "@/components/RequireAuth";
import { Badge } from "@/components/ui";
import { OPPORTUNITIES, type Opportunity } from "@/lib/opportunities";

// Members-only job & internship board. Signed-in members browse real analyst,
// development, brokerage, and PE roles posted by career services and alumni.
// Sector filter plus a "posted by alumni" toggle; each card expands to details.
export default function OpportunitiesPage() {
  return (
    <RequireAuth>
      <OpportunitiesBoard />
    </RequireAuth>
  );
}

function OpportunitiesBoard() {
  const [sector, setSector] = useState("All");
  const [alumniOnly, setAlumniOnly] = useState(false);

  const sectors = useMemo(
    () => ["All", ...Array.from(new Set(OPPORTUNITIES.map((o) => o.sector))).sort()],
    []
  );

  const roles = useMemo(
    () =>
      OPPORTUNITIES.filter((o) => (sector === "All" || o.sector === sector))
        .filter((o) => (!alumniOnly || o.isAlumPosted))
        .sort((a, b) => a.deadline.localeCompare(b.deadline)),
    [sector, alumniOnly]
  );

  return (
    <>
      <Breadcrumb trail={[{ label: "Opportunities" }]} />

      {/* Intro */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-8">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-4">Opportunities</h1>
        <p className="text-[16px] text-secondary leading-relaxed max-w-3xl">
          Internships, co-ops, and full-time analyst roles in commercial real
          estate, posted by our career services team and by alumni across
          acquisitions, development, capital markets, and beyond. Many of these
          firms recruit our members directly.
        </p>
        <div className="border-t border-gold mt-7" />
      </section>

      {/* Filters */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10">
        <div className="flex flex-wrap items-center gap-3 justify-between">
          <div className="flex flex-wrap gap-2">
            {sectors.map((s) => (
              <button
                key={s}
                onClick={() => setSector(s)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                  sector === s
                    ? "bg-navy text-white border-navy"
                    : "border-border text-secondary hover:border-navy hover:text-navy"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <label className="flex items-center gap-2 text-[13px] font-semibold text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={alumniOnly}
              onChange={(e) => setAlumniOnly(e.target.checked)}
              className="accent-navy w-4 h-4"
            />
            Alumni-posted only
          </label>
        </div>
        <p className="text-[13px] text-secondary mt-4">
          {roles.length} {roles.length === 1 ? "role" : "roles"}
        </p>
      </section>

      {/* Listings */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-16">
        <div className="space-y-4">
          {roles.map((o) => (
            <OpportunityCard key={o.id} o={o} />
          ))}
        </div>
      </section>
    </>
  );
}

function OpportunityCard({ o }: { o: Opportunity }) {
  const [open, setOpen] = useState(false);
  const deadline = new Date(o.deadline + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="border border-border rounded-xl p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <Badge tone="gold">{o.jobType}</Badge>
            <Badge tone="gray">{o.sector}</Badge>
            {o.isAlumPosted && <Badge tone="navy">Alumni posted</Badge>}
          </div>
          <h3 className="text-lg font-semibold text-navy">{o.title}</h3>
          <div className="text-[14px] text-secondary mt-0.5">
            {o.company} · {o.location}
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-1 text-[13px] text-secondary mt-3">
            <span>
              <span className="font-semibold text-navy">Pay:</span> {o.compensation}
            </span>
            <span>
              <span className="font-semibold text-navy">Apply by:</span> {deadline}
            </span>
            <span>
              <span className="font-semibold text-navy">Posted by:</span> {o.postedBy}
            </span>
          </div>
        </div>
        <a
          href={o.applicationLink}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 px-5 py-2.5 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors text-center"
        >
          Apply
        </a>
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className="mt-4 text-[13px] font-semibold text-gold-hover hover:text-navy"
      >
        {open ? "Hide details" : "View details"}
      </button>

      {open && (
        <p className="mt-4 pt-4 border-t border-border text-[15px] text-secondary leading-relaxed whitespace-pre-line">
          {o.description}
        </p>
      )}
    </div>
  );
}
