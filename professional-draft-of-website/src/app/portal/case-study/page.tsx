"use client";

import Link from "next/link";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, EmptyState } from "@/components/ui";

export default function PortalCaseStudy() {
  const { state, currentAccount } = useGtre();
  const items = state.resources.filter((r) => r.category === "Case Study");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Case Study</h2>
        <p className="text-secondary mt-1">
          Everything for the capstone case study: worked examples, model templates,
          the prompt, and the grading rubric.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {["Examples", "Models & templates", "Prompt", "Rubric"].map((t) => (
          <div key={t} className="rounded-xl border border-border bg-white px-4 py-3 text-[14px] font-semibold text-navy">
            {t}
          </div>
        ))}
      </div>

      {items.length === 0 ? (
        <EmptyState
          title="Case study materials coming soon."
          body={
            currentAccount?.role === "admin"
              ? "Add them in Admin → Materials with the category 'Case Study' and they'll show here."
              : "The exec team will post the prompt, model templates, examples, and rubric here."
          }
        />
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {items.map((r) => (
            <a
              key={r.id}
              href={r.url}
              target="_blank"
              rel="noreferrer"
              className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow block"
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge tone="gold">Case Study</Badge>
              </div>
              <div className="font-semibold text-navy">{r.title}</div>
              {r.description && <p className="text-[14px] text-secondary mt-1">{r.description}</p>}
              <div className="text-[13px] font-semibold text-gold-hover mt-3">Open →</div>
            </a>
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
