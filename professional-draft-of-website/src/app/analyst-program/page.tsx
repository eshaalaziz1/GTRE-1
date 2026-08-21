"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import SiteImage from "@/components/SiteImage";
import { Badge, Tabs } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";
import { CURRICULUM, PROGRAM_TOOLS } from "@/lib/program";
import type { Resource } from "@/lib/store/types";

// Public Analyst Program section. Tabs: Overview · Curriculum · Syllabus · Resources.
// The Syllabus tab is built to embed a view-only document once the club uploads
// one (admin sets the embed URL in Admin → Site Info); until then it shows a
// clean placeholder.
export default function AnalystProgramPage() {
  const { state } = useGtre();
  const [tab, setTab] = useState("overview");

  return (
    <>
      <Breadcrumb trail={[{ label: "Analyst Program" }]} />

      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
              The Analyst Program
            </div>
            <h1 className="display text-5xl text-white">
              From fundamentals to a full underwriting case study.
            </h1>
            <p className="mt-5 text-lg text-white/80 leading-relaxed">
              {state.siteInfo.analystProgramIntro}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/signup" className="px-6 py-3 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors">
                Apply to join
              </Link>
              <Link href="/portal" className="px-6 py-3 rounded-md border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
                Member resources
              </Link>
            </div>
          </div>
          <SiteImage
            slotKey="analyst-hero"
            defaultSrc="/photos/analyst-session.jpg"
            alt="An Analyst Program session at Georgia Tech"
            ratio="aspect-[4/3]"
          />
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-10">
        <Tabs
          active={tab}
          onChange={setTab}
          tabs={[
            { key: "overview", label: "Overview" },
            { key: "curriculum", label: "Curriculum" },
            { key: "case-study", label: "Case Study" },
            { key: "syllabus", label: "Syllabus" },
            { key: "resources", label: "Resources" },
          ]}
        />

        <div className="pt-10">
          {tab === "overview" && <Overview />}
          {tab === "curriculum" && <Curriculum />}
          {tab === "case-study" && <CaseStudy resources={state.resources} />}
          {tab === "syllabus" && <Syllabus url={state.siteInfo.syllabusEmbedUrl} />}
          {tab === "resources" && <Resources />}
        </div>
      </div>
    </>
  );
}

function Overview() {
  return (
    <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12">
      <div className="space-y-6">
        <h2 className="display text-3xl text-navy">What the program is</h2>
        <p className="text-[16px] text-secondary leading-relaxed">
          The Analyst Program is the club&apos;s flagship curriculum. Over a semester, members build real estate
          financial models, learn the tools professionals use every day, and finish by presenting a full underwriting
          case study to a panel of alumni judges. Strong performers earn a spot in the vetted Analyst Rolodex, where
          recruiters find them first.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { n: "6", l: "program modules" },
            { n: "1", l: "capstone case study" },
            { n: "250+", l: "alumni network" },
          ].map((s) => (
            <div key={s.l} className="border-t-4 border-gold pt-4">
              <div className="text-3xl display text-navy">{s.n}</div>
              <div className="text-[14px] text-secondary">{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <aside className="bg-surface rounded-2xl p-7 h-fit">
        <h3 className="font-semibold text-navy mb-3">Tools you&apos;ll use</h3>
        <ul className="space-y-2">
          {PROGRAM_TOOLS.map((t) => (
            <li key={t} className="flex items-center gap-2 text-[15px] text-text">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {t}
            </li>
          ))}
        </ul>
        <div className="mt-6 pt-6 border-t border-border">
          <Link href="/signup" className="text-[14px] font-semibold text-gold-hover hover:text-navy">
            Apply to the next cohort →
          </Link>
        </div>
      </aside>
    </div>
  );
}

function Curriculum() {
  return (
    <div>
      <h2 className="display text-3xl text-navy mb-8">Program curriculum</h2>
      <div className="space-y-4">
        {CURRICULUM.map((m) => (
          <div key={m.number} className="flex flex-col sm:flex-row gap-5 border border-border rounded-xl p-6">
            <div className="text-center sm:border-r sm:border-border sm:pr-6 w-full sm:w-24 shrink-0">
              <div className="text-[12px] uppercase text-gold-hover font-semibold">Module</div>
              <div className="text-3xl text-navy display leading-none">{m.number}</div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-navy">{m.title}</h3>
              <p className="text-[15px] text-secondary leading-relaxed mt-1.5">{m.description}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {m.topics.map((t) => (
                  <Badge key={t} tone="gray">{t}</Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <p className="text-[13px] text-secondary mt-6">
        The exec team finalizes the schedule and topics each semester.
      </p>
    </div>
  );
}

function CaseStudy({ resources }: { resources: Resource[] }) {
  const items = resources.filter((r) => r.category === "Case Study");
  return (
    <div>
      <div className="grid lg:grid-cols-[1.4fr_1fr] gap-12 mb-12">
        <div className="space-y-5">
          <h2 className="display text-3xl text-navy">The capstone case study</h2>
          <p className="text-[16px] text-secondary leading-relaxed">
            The Analyst Program culminates in a full underwriting case study.
            Members get a real deal prompt, build a proforma from the ground up, and
            present their recommendation to a panel of alumni judges against a shared
            rubric. Everything you need, the prompt, proforma templates, and the
            grading rubric, is posted here.
          </p>
        </div>
        <aside className="bg-surface rounded-2xl p-7 h-fit">
          <h3 className="font-semibold text-navy mb-3">What&apos;s included</h3>
          <ul className="space-y-2 text-[15px] text-text">
            {["Case prompt & scenario", "Proforma / model templates", "Presentation guidelines", "Grading rubric"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" /> {t}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <h3 className="display text-2xl text-navy mb-5">Materials</h3>
      {items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface text-center py-16 px-6">
          <h4 className="display text-xl text-navy">Materials coming soon</h4>
          <p className="text-secondary mt-2 max-w-lg mx-auto leading-relaxed">
            The case prompt, proforma templates, and grading rubric will be posted
            here. Officers add them in <strong>Admin → Materials</strong> (category
            &ldquo;Case Study&rdquo;), no code needed.
          </p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-5">
          {items.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gold-hover mb-1">
                Case Study
              </div>
              <div className="text-lg font-semibold text-navy group-hover:text-gold-hover transition-colors">
                {r.title}
              </div>
              {r.description && (
                <p className="text-[14px] text-secondary mt-2 leading-relaxed">{r.description}</p>
              )}
              <span className="inline-block mt-4 text-sm font-semibold text-gold-hover">Open →</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

function Syllabus({ url }: { url: string }) {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3 mb-6">
        <div>
          <h2 className="display text-3xl text-navy">Syllabus</h2>
          <p className="text-secondary mt-1">The full program syllabus, view-only.</p>
        </div>
        {url && <Badge tone="green">Published</Badge>}
      </div>

      {url ? (
        // View-only embed (no download button surfaced). Use a Google Docs/Drive
        // /preview URL so the document renders read-only inside the iframe.
        <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
          <iframe
            src={url}
            title="Analyst Program Syllabus"
            className="w-full"
            style={{ height: "80vh" }}
            loading="lazy"
          />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-surface">
          <div className="max-w-xl mx-auto text-center py-20 px-6">
            <div className="w-16 h-16 rounded-2xl bg-navy/5 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#003057" strokeWidth="1.8">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M8 13h8M8 17h5" />
              </svg>
            </div>
            <h3 className="display text-2xl text-navy">Syllabus coming soon</h3>
            <p className="text-secondary mt-3 leading-relaxed">
              The Fall 2026 Analyst Program syllabus will be published here as a view-only document. Once it&apos;s
              ready, an officer adds it in <strong>Admin → Site Info</strong> and it renders on this page, no download,
              read in place.
            </p>
            <Link href="/signup" className="mt-8 inline-block px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
              Apply to the program
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

function Resources() {
  return (
    <div className="max-w-2xl">
      <h2 className="display text-3xl text-navy mb-4">Program resources</h2>
      <p className="text-[16px] text-secondary leading-relaxed">
        Slides, model templates, case-study packets, and tool access (CoStar, Argus) live in the member portal and are
        available to enrolled members.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/portal/resources" className="px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
          Open member materials
        </Link>
        <Link href="/login" className="px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-surface transition-colors">
          Sign in
        </Link>
      </div>
    </div>
  );
}
