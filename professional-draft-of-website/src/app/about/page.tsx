import Link from "next/link";
import PhotoSlot from "@/components/PhotoSlot";
import SiteImage from "@/components/SiteImage";
import Reveal from "@/components/Reveal";
import { VALUES, ENGAGEMENT, EVENTS } from "@/lib/content";
import { LINKEDIN_URL } from "@/lib/linkedin";

export const metadata = { title: "Georgia Tech Real Estate Club" };

export default function AboutPage() {
  return (
    <>
      {/* Home hero: full-color building loop (undimmed, no overlay) above the
          club's mission, front and center. Branding kept light on purpose. */}
      <section className="w-full">
        {/* Building loop — full color */}
        <div className="relative w-full h-[32svh] min-h-[200px] max-h-[400px] overflow-hidden bg-navy">
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/about-hero-poster.jpg"
            className="absolute inset-0 w-full h-full object-cover object-[center_38%]"
          >
            <source src="/about-hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute bottom-0 inset-x-0 h-1 bg-gold" />
        </div>

        {/* Mission, front and center (pared-back branding — no oversized wordmark) */}
        <div className="mx-auto max-w-[900px] px-6 lg:px-10 py-12 sm:py-14 text-center">
          <div className="text-gold-hover uppercase tracking-[0.24em] text-[11px] sm:text-[12px] font-semibold mb-5">
            Georgia Tech Real Estate Club
          </div>
          <h1 className="display text-navy text-3xl sm:text-4xl lg:text-5xl leading-[1.12]">
            Preparing students to lead in real estate — and connecting the
            industry to the talent it&apos;s looking for.
          </h1>
          <p className="mt-6 text-secondary text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We equip Georgia Tech students with the skills, network, and
            real-world reps to launch real estate careers, then connect firms to
            the most prepared analysts in the room.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-7 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
            >
              Join the Club
            </Link>
            <Link
              href="/analyst-program"
              className="px-7 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-surface transition-colors"
            >
              Explore the Analyst Program
            </Link>
          </div>
        </div>
      </section>

      {/* Mission */}
      <Reveal>
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-hover mb-3">
              Our Mission
            </div>
            <h2 className="display text-3xl lg:text-4xl text-navy">Two goals, one club.</h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-navy">1 · Equip our students</h3>
                <p className="mt-2 text-[15px] text-secondary leading-relaxed">
                  Give members the technical skills, relationships, and real-world
                  reps to launch careers in acquisitions, development, debt,
                  brokerage, and beyond — and become the most prepared analysts in
                  the room.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy">2 · Supply the industry with talent</h3>
                <p className="mt-2 text-[15px] text-secondary leading-relaxed">
                  Connect firms and alumni to a vetted pipeline of Georgia Tech&apos;s
                  strongest real estate students through the Analyst Rolodex and the
                  Opportunities board.
                </p>
              </div>
            </div>
            <Link href="/rolodex" className="inline-block mt-6 text-sm font-semibold text-gold-hover hover:text-navy">
              Hiring? View the Analyst Rolodex →
            </Link>
          </div>
          <SiteImage
            slotKey="home-mission"
            defaultSrc="/photos/naiop-win.webp"
            alt="Georgia Tech team wins the NAIOP Georgia School Challenge"
            ratio="aspect-[16/10]"
          />
        </div>
      </section>
      </Reveal>

      {/* Values */}
      <Reveal>
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
      </Reveal>

      {/* Get involved */}
      <Reveal>
      <section id="get-involved" className="bg-surface border-y border-border scroll-mt-24">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16">
          <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-hover mb-3">
            Get involved
          </div>
          <h2 className="display text-4xl text-navy max-w-2xl">Industry and alumni engagement.</h2>
          <div className="grid md:grid-cols-3 gap-7 mt-10">
            {ENGAGEMENT.map((e) => (
              <Link key={e.title} href={e.href} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <PhotoSlot src={e.image ?? null} alt={e.title} ratio="aspect-[16/9]" className="rounded-none" imgClassName={e.imgClassName} />
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
      </Reveal>

      {/* Upcoming Events + Latest News (last three) */}
      <Reveal>
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-14">
        <div>
          <div className="flex items-end justify-between mb-7">
            <h2 className="display text-3xl text-navy">Upcoming Events</h2>
            <Link href="/calendar" className="text-sm font-semibold text-gold-hover hover:text-navy">Full calendar →</Link>
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
                  <div className="text-[13px] text-secondary">{[e.time, e.location].filter(Boolean).join(" · ")}</div>
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
          <div className="bg-navy rounded-xl p-7 text-white h-full flex flex-col justify-center">
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.2em] mb-2">
              On LinkedIn
            </div>
            <div className="display text-2xl text-white">Follow the club for the latest.</div>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              Event recaps, recruiting updates, member wins, and market takes,
              posted to our LinkedIn and featured on the News page.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors"
              >
                Follow on LinkedIn →
              </a>
              <Link
                href="/news"
                className="px-6 py-3 rounded-md border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
              >
                View News
              </Link>
            </div>
          </div>
        </div>
      </section>
      </Reveal>
    </>
  );
}
