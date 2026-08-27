import Link from "next/link";
import SiteImage from "@/components/SiteImage";
import SiteText from "@/components/SiteText";
import Reveal from "@/components/Reveal";
import { VALUES, ENGAGEMENT, EVENTS } from "@/lib/content";
import { LINKEDIN_URL } from "@/lib/linkedin";

export const metadata = { title: "Georgia Tech Real Estate Club" };

export default function AboutPage() {
  return (
    <>
      {/* Home hero: the mission over the skyline loop, in one above-the-fold
          screen so "Join the Club" is visible without scrolling. */}
      <section className="relative w-full overflow-hidden bg-navy flex items-center min-h-[520px] h-[calc(100svh-160px)] max-h-[680px]">
        {/* Background skyline loop */}
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/about-hero-poster.jpg"
          className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
        >
          <source src="/about-hero.mp4" type="video/mp4" />
        </video>
        {/* Navy wash for legible text over the video */}
        <div className="absolute inset-0 bg-gradient-to-b from-navy/85 via-navy/70 to-navy/90" />

        {/* Mission, front and center */}
        <div className="relative mx-auto max-w-[920px] px-6 lg:px-10 text-center">
          <div className="text-gold uppercase tracking-[0.26em] text-[11px] sm:text-[12px] font-semibold mb-5">
            <SiteText slotKey="home-hero-eyebrow">Georgia Tech Real Estate Club</SiteText>
          </div>
          <h1 className="display text-white text-4xl sm:text-5xl lg:text-[3.5rem] leading-[1.08]">
            <SiteText slotKey="home-headline" />
          </h1>
          <p className="mt-6 text-white/85 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            <SiteText slotKey="home-mission" />
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors"
            >
              <SiteText slotKey="home-hero-cta1">Join the Club</SiteText>
            </Link>
            <Link
              href="/analyst-program"
              className="px-8 py-3.5 rounded-md border border-white/50 text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              <SiteText slotKey="home-hero-cta2">Explore the Mentorship Program</SiteText>
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 inset-x-0 h-1 bg-gold" />
      </section>

      {/* Mission */}
      <Reveal>
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[12px] font-semibold uppercase tracking-[0.22em] text-gold-hover mb-3">
              <SiteText slotKey="home-whatwedo-eyebrow" />
            </div>
            <h2 className="display text-3xl lg:text-4xl text-navy"><SiteText slotKey="home-goals-title" /></h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-navy"><SiteText slotKey="home-goal1-title" /></h3>
                <p className="mt-2 text-[15px] text-secondary leading-relaxed">
                  <SiteText slotKey="home-goal1-body" />
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy"><SiteText slotKey="home-goal2-title" /></h3>
                <p className="mt-2 text-[15px] text-secondary leading-relaxed">
                  <SiteText slotKey="home-goal2-body" />
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-navy"><SiteText slotKey="home-goal3-title" /></h3>
                <p className="mt-2 text-[15px] text-secondary leading-relaxed">
                  <SiteText slotKey="home-goal3-body" />
                </p>
              </div>
            </div>
            <Link href="/rolodex" className="inline-block mt-6 text-sm font-semibold text-gold-hover hover:text-navy">
              <SiteText slotKey="home-rolodex-link">Hiring? View the Analyst Rolodex →</SiteText>
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
          {VALUES.map((v, vi) => (
            <div key={v.title} className="bg-white border-t-4 border-gold border-x border-b border-border rounded-b-lg p-5">
              <h2 className="text-lg font-semibold text-navy mb-2">
                <SiteText slotKey={`home-value-${vi}-title`}>{v.title}</SiteText>
              </h2>
              <ul className="space-y-1.5">
                {v.lines.map((line, i) => (
                  <li key={i} className="text-[13px] text-secondary leading-snug">
                    <SiteText slotKey={`home-value-${vi}-line-${i}`}>{line}</SiteText>
                  </li>
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
            <SiteText slotKey="home-getinvolved-eyebrow" />
          </div>
          <h2 className="display text-4xl text-navy max-w-2xl"><SiteText slotKey="home-getinvolved-title" /></h2>
          <div className="grid md:grid-cols-3 gap-7 mt-10">
            {ENGAGEMENT.map((e, ei) => (
              <Link key={e.title} href={e.href} className="group bg-white border border-border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
                <SiteImage slotKey={`home-engage-${ei}-image`} defaultSrc={e.image ?? ""} alt={e.title} ratio="aspect-[16/9]" rounded="rounded-none" imgClassName={e.imgClassName} />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-navy group-hover:text-gold-hover transition-colors">
                    <SiteText slotKey={`home-engage-${ei}-title`}>{e.title}</SiteText>
                  </h3>
                  <p className="text-[14px] text-secondary mt-2 leading-relaxed">
                    <SiteText slotKey={`home-engage-${ei}-body`}>{e.body}</SiteText>
                  </p>
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
            <h2 className="display text-3xl text-navy"><SiteText slotKey="home-events-title">Upcoming Events</SiteText></h2>
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
            <h2 className="display text-3xl text-navy"><SiteText slotKey="home-news-title">Latest News</SiteText></h2>
            <Link href="/news" className="text-sm font-semibold text-gold-hover hover:text-navy">All news →</Link>
          </div>
          <div className="bg-navy rounded-xl p-7 text-white h-full flex flex-col justify-center">
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.2em] mb-2">
              <SiteText slotKey="home-linkedin-eyebrow">On LinkedIn</SiteText>
            </div>
            <div className="display text-2xl text-white"><SiteText slotKey="home-linkedin-title">Follow the club for the latest.</SiteText></div>
            <p className="text-white/70 text-sm mt-3 leading-relaxed">
              <SiteText slotKey="home-linkedin-body">Event recaps, recruiting updates, member wins, and market takes, posted to our LinkedIn and featured on the News page.</SiteText>
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
