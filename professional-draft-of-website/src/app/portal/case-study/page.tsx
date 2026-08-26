"use client";

import Link from "next/link";
import { useGtre } from "@/lib/store/GtreStore";
import { EmptyState } from "@/components/ui";
import { groupCaseStudy, fileKind } from "@/lib/caseStudy";

export default function PortalCaseStudy() {
  const { state, currentAccount } = useGtre();
  const items = state.resources.filter((r) => r.category === "Case Study");
  const sections = groupCaseStudy(items);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Case Study</h2>
        <p className="text-secondary mt-1">
          Everything for the capstone case study: worked examples, model
          templates, the prompts, and the grading rubric.
        </p>
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Case study materials coming soon."
          body={
            currentAccount?.role === "admin"
              ? "Add them in Admin → Materials with the category 'Case Study' and they'll show here."
              : "The exec team will post the prompts, model templates, examples, and rubric here."
          }
        />
      ) : (
        <div className="space-y-10">
          {sections.map(({ group, items }) => (
            <section key={group}>
              <div className="flex items-center gap-4 mb-4">
                <h3 className="text-[13px] font-semibold uppercase tracking-[0.16em] text-gold-hover">{group}</h3>
                <div className="flex-1 border-t border-border" />
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {items.map((r) => (
                  <a
                    key={r.id}
                    href={r.url}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex gap-4 bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow"
                  >
                    <span className="shrink-0 mt-0.5 inline-flex items-center justify-center w-11 h-11 rounded-lg bg-navy/[0.04] text-[10px] font-bold tracking-wide text-navy">
                      {fileKind(r.url)}
                    </span>
                    <div className="min-w-0">
                      <div className="font-semibold text-navy group-hover:text-gold-hover transition-colors">{r.title}</div>
                      {r.description && <p className="text-[14px] text-secondary mt-1 leading-relaxed">{r.description}</p>}
                      <div className="text-[13px] font-semibold text-gold-hover mt-3">Open →</div>
                    </div>
                  </a>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {currentAccount?.role === "admin" && (
        <Link href="/admin/resources" className="inline-block text-[14px] font-semibold text-gold-hover hover:text-navy">
          → Add or manage case study materials
        </Link>
      )}
    </div>
  );
}
