import Link from "next/link";
import PhotoSlot from "@/components/PhotoSlot";
import { VALUES, ENGAGEMENT, EVENTS, NEWS } from "@/lib/content";

export const metadata = { title: "Georgia Tech Real Estate Club" };

export default function AboutPage() {
  return (
    <>
      {/* Full-bleed buildings video banner with the club name accentuated */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden bg-navy">
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/about-hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/about-hero.mp4" type="video/mp4" />
        </video>
        {/* Legibility overlays: flat wash + vertical gradient anchoring the type */}
        <div className="absolute inset-0 bg-navy/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/25 to-navy/55" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="text-gold uppercase tracking-[0.3em] text-[11px] sm:text-[13px] font-semibold mb-5">
            Georgia Institute of Technology
          </div>
          <h1 className="text-white font-bold uppercase leading-[0.92] tracking-tight text-5xl sm:text-6xl lg:text-[5.25rem]">
            Georgia Tech
            <span className="block text-gold">Real Estate Club</span>
          </h1>
          <div className="mx-auto mt-7 h-[3px] w-24 bg-gold" />
          <p className="mt-7 text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Bridging the classroom and the industry — preparing Georgia Tech
            students to become the most prepared analysts in the room.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link
              href="/analyst-program"
              className="px-7 py-3 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors"
            >
              Explore the Analyst Program
            </Link>
            <Link
              href="/contact"
              className="px-7 py-3 rounded-md border border-white/50 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Join the Club
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-16">
        <div className="max-w-3xl">
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-hover mb-3">
            Our Mission
          </div>
          <h2 className="display text-4xl lg:text-5xl text-navy">
            Preparing Georgia Tech students to lead in real estate.
          </h2>
          <p className="mt-5 text-[15px] text-secondary leading-relaxed">
            The Georgia Tech Real Estate Club bridges the gap between the
            classroom and the industry, giving members the technical skills,
            relationships, and real-world reps they need to launch careers in
            acquisitions, development, debt, brokerage, and beyond. Everything we
            do is built around one goal: helping Georgia Tech students become the
            most prepared analysts in the room.
          </p>
          <div className="border-t border-gold mt-7" />
          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
            >
              Join the Club
            </Link>
            <Link
              href="/rolodex"
              className="px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-surface transition-colors"
            >
              Hiring? View the Analyst Rolodex
            </Link>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16">
        <div className="grid md:grid-cols-3 gap-5">
          {VALUES.map((v) => (
            <div key={v.title} className="bg-white border-t-4 border-gold border-x border-b border-border rounded-b-lg p-5">
              <h2 className="text-lg font-semibold text-navy mb-2">{v.title}</h2>
              <ul className="space-y-1.5">
                {v.lines.map((line, i) => (
                  <li key={i} className="text-[13px] text-secondary leading-snug">{line}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Get involved */}
      <section id="get-involved" className="bg-surface border-y border-border scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16">
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-hover mb-3">
            Get involved
          </div>
          <h2 className="display text-4xl text-navy max-w-2xl">Industry and alumni engagement.</h2>
          <div className="grid md:grid-cols-3 gap-7 mt-10">
            {ENGAGEMENT.map((e) => (
              <Link key={e.title} href={e.href} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <PhotoSlot src={null} alt={e.title} ratio="aspect-[16/9]" className="rounded-none" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy group-hover:text-gold-hover transition-colors">{e.title}</h3>
                  <p className="text-[14px] text-secondary mt-2 leading-relaxed">{e.body}</p>
                  <span className="inline-block mt-4 text-sm font-semibold text-gold-hover">Learn more →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events + Latest News (last three) */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-14">
        <div>
          <div className="flex items-end justify-between mb-7">
            <h2 className="display text-3xl text-navy">Upcoming Events</h2>
            <Link href="/events" className="text-sm font-semibold text-gold-hover hover:text-navy">All events →</Link>
          </div>
          <div className="space-y-3">
            {EVENTS.slice(0, 4).map((e) => (
              <div key={e.title} className="bg-white border border-border rounded-lg p-4 flex gap-4 items-center">
                <div className="text-center shrink-0 w-14">
                  <div className="text-[11px] uppercase text-gold-hover font-semibold">{e.date.split(" ")[0]}</div>
                  <div className="text-2xl text-navy font-semibold leading-none">{e.date.split(" ")[1].replace(",", "")}</div>
                </div>
                <div className="border-l border-border pl-4">
                  <div className="font-semibold text-navy text-[15px]">{e.title}</div>
                  <div className="text-[13px] text-secondary">{e.time} · {e.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-end justify-between mb-7">
            <h2 className="display text-3xl text-navy">Latest News</h2>
            <Link href="/news" className="text-sm font-semibold text-gold-hover hover:text-navy">All news →</Link>
          </div>
          <div className="space-y-5">
            {NEWS.slice(0, 3).map((n) => (
              <Link key={n.slug} href="/news" className="block bg-white border border-border rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="text-[11px] uppercase tracking-wide text-gold-hover font-semibold">{n.category} · {n.date}</div>
                <div className="font-semibold text-navy mt-1.5">{n.title}</div>
                <p className="text-[14px] text-secondary mt-1.5 leading-relaxed">{n.excerpt}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
