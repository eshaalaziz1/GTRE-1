"use client";

import Link from "next/link";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, EmptyState } from "@/components/ui";
import type { Resource } from "@/lib/store/types";

const CATEGORY_ORDER: Resource["category"][] = ["Slides", "Tool", "Document", "Case Study", "Link"];

export default function ResourcesPage() {
  const { state } = useGtre();

  const byCat = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: state.resources.filter((r) => r.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Materials &amp; Documents</h2>
        <p className="text-secondary mt-1">
          Slides, tools, templates, case-study packets, and important links. Managed by the exec team.
        </p>
      </div>

      {state.resources.length === 0 ? (
        <EmptyState title="No materials posted yet." body="Check back once the exec team adds resources." />
      ) : (
        byCat.map((group) => (
          <section key={group.cat}>
            <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">{group.cat}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {group.items.map((r) => (
                <a
                  key={r.id}
                  href={r.url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow block"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge tone="gold">{r.category}</Badge>
                  </div>
                  <div className="font-semibold text-navy">{r.title}</div>
                  {r.description && <p className="text-[14px] text-secondary mt-1">{r.description}</p>}
                  <div className="text-[13px] font-semibold text-gold-hover mt-3">Open →</div>
                </a>
              ))}
            </div>
          </section>
        ))
      )}

      <div className="pt-2">
        <Link href="/analyst-program" className="text-[14px] font-semibold text-gold-hover hover:text-navy">
          → Mentorship Program overview, curriculum &amp; syllabus
        </Link>
      </div>
    </div>
  );
}
