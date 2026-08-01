import Link from "next/link";
import PhotoSlot from "./PhotoSlot";

/**
 * Photo-left, text-right hero with a thin gold rule. Title is the light-weight
 * 56px display heading in navy.
 */
export default function HeroFeature({
  eyebrow,
  title,
  intro,
  image,
  ctas,
}: {
  eyebrow?: string;
  title: string;
  intro: string;
  image?: string | null;
  ctas?: { label: string; href: string; variant?: "solid" | "outline" }[];
}) {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1320px] px-6 lg:px-8 py-12 lg:py-16 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
        <PhotoSlot src={image} alt={title} />

        <div>
          {eyebrow && (
            <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-hover mb-4">
              {eyebrow}
            </div>
          )}
          <h1 className="display text-5xl lg:text-6xl text-navy">{title}</h1>
          <p className="mt-6 text-xl lg:text-2xl font-light text-text leading-snug">
            {intro}
          </p>
          {/* thin gold rule */}
          <div className="border-t border-gold mt-8" />
          {ctas && ctas.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-3">
              {ctas.map((c) => (
                <Link
                  key={c.label}
                  href={c.href}
                  className={
                    c.variant === "outline"
                      ? "px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-surface transition-colors"
                      : "px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
                  }
                >
                  {c.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
