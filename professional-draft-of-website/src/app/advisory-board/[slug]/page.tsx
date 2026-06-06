import Link from "next/link";
import { notFound } from "next/navigation";
import Avatar from "@/components/Avatar";
import { BOARD, getBoardMember } from "@/lib/board";

export function generateStaticParams() {
  return BOARD.map((m) => ({ slug: m.slug }));
}

export default async function BoardMemberProfile({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const m = getBoardMember(slug);
  if (!m) return notFound();

  return (
    <div className="mx-auto max-w-[1000px] px-6 lg:px-10 py-12">
      <Link
        href="/advisory-board"
        className="inline-flex items-center gap-1.5 text-[13px] text-secondary hover:text-navy transition-colors"
      >
        ← Back to advisory board
      </Link>

      <div className="mt-8 flex flex-col sm:flex-row gap-8 items-start border-b border-border pb-10">
        <Avatar name={m.name} photo={m.photo} size={150} />
        <div>
          <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-hover mb-2">
            {m.group}
          </div>
          <h1 className="display text-4xl text-navy">{m.name}</h1>
          <div className="mt-2 text-lg text-secondary italic">{m.position}</div>
          <div className="text-lg text-navy font-semibold">{m.organization}</div>
          <div className="mt-3 text-sm text-secondary">
            Georgia Tech · {m.gtConnection}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-10 py-10">
        <div className="md:col-span-2">
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary mb-3">
            About
          </h2>
          <p className="text-[15px] leading-relaxed text-text">{m.bio}</p>
        </div>
        <aside>
          <h2 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-secondary mb-3">
            Focus Areas
          </h2>
          <div className="flex flex-wrap gap-2">
            {m.focus.map((f) => (
              <span key={f} className="text-xs px-2.5 py-1 rounded-md bg-gold-soft text-navy">
                {f}
              </span>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
