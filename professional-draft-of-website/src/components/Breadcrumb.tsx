import Link from "next/link";

export default function Breadcrumb({
  trail,
}: {
  trail: { label: string; href?: string }[];
}) {
  return (
    <nav className="mx-auto max-w-[1320px] px-6 lg:px-8 py-4 text-[13px] text-secondary flex items-center gap-2 flex-wrap">
      <Link href="/" className="text-gold-hover hover:text-navy">Home</Link>
      {trail.map((t) => (
        <span key={t.label} className="flex items-center gap-2">
          <span className="text-border">›</span>
          {t.href ? (
            <Link href={t.href} className="text-gold-hover hover:text-navy">{t.label}</Link>
          ) : (
            <span className="text-secondary">{t.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
