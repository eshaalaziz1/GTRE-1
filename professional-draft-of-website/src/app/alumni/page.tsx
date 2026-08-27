import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SiteText from "@/components/SiteText";

export const metadata = { title: "Alumni | GT Real Estate Club" };

export default function AlumniPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Alumni" }]} />

      {/* Intro */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-10">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-6"><SiteText slotKey="alumni-title" /></h1>
        <p className="text-[16px] text-secondary leading-relaxed max-w-4xl"><SiteText slotKey="alumni-intro" /></p>
      </section>

      {/* Alumni network / association */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <h2 className="display text-3xl text-navy mb-4"><SiteText slotKey="alumni-network-title">The GT Real Estate Alumni Network</SiteText></h2>
            <p className="text-[15px] text-secondary leading-relaxed">
              <SiteText slotKey="alumni-network-body">The alumni network connects graduates back to current students and
              to each other. It funds scholarships and programming, helps keep the
              club running, and stays in touch through events and the alumni
              LinkedIn group.</SiteText>
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
                <SiteText slotKey="alumni-join-network-cta">Join the alumni network</SiteText>
              </Link>
              <Link href="/contact" className="px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-white transition-colors">
                <SiteText slotKey="alumni-make-gift-cta">Make a gift</SiteText>
              </Link>
            </div>
          </div>
          <div className="bg-white border border-border border-t-4 border-t-gold rounded-b-2xl p-7">
            <h3 className="text-lg font-semibold text-navy"><SiteText slotKey="alumni-directory-title">Alumni directory, coming soon</SiteText></h3>
            <p className="text-[14px] text-secondary leading-relaxed mt-2">
              <SiteText slotKey="alumni-directory-body">We&apos;re building a searchable directory of GT Real Estate alumni
              and where they&apos;ve landed across the industry. Add yourself now
              and you&apos;ll be in it when it launches.</SiteText>
            </p>
            <Link href="/signup" className="inline-block mt-4 text-sm font-semibold text-gold-hover hover:text-navy">
              <SiteText slotKey="alumni-directory-add-cta">Add yourself to the network →</SiteText>
            </Link>
          </div>
        </div>
      </section>

      {/* Recruit & Hire, prominent Rolodex banner */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-3">
              <SiteText slotKey="alumni-recruit-eyebrow">Recruit &amp; Hire</SiteText>
            </div>
            <h2 className="display text-3xl lg:text-4xl text-white">
              <SiteText slotKey="alumni-rolodex-title">Hire the club&apos;s best from the Analyst Rolodex.</SiteText>
            </h2>
            <p className="mt-4 text-white/75 text-[15px] leading-relaxed max-w-xl">
              <SiteText slotKey="alumni-rolodex-body">A private, vetted directory of Georgia Tech&apos;s strongest real
              estate students, backed by what the club tracks all semester:
              academics, attendance, and graded case-study work. Find and reach the
              next analyst before anyone else.</SiteText>
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/rolodex"
              className="px-7 py-3.5 rounded-md bg-gold text-navy text-sm font-bold text-center hover:bg-gold-hover transition-colors"
            >
              <SiteText slotKey="alumni-enter-rolodex-cta">Enter the Analyst Rolodex →</SiteText>
            </Link>
            <Link
              href="/opportunities"
              className="px-7 py-3.5 rounded-md border border-white/40 text-white text-sm font-semibold text-center hover:bg-white/10 transition-colors"
            >
              <SiteText slotKey="alumni-post-opportunity-cta">Post an Opportunity</SiteText>
            </Link>
          </div>
        </div>
      </section>

      {/* Other ways to stay involved */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14">
        <h2 className="display text-3xl text-navy mb-8"><SiteText slotKey="alumni-involved-title">Other ways to stay involved</SiteText></h2>
        <div className="grid md:grid-cols-2 gap-7">
          <div className="border border-border rounded-xl p-7">
            <h3 className="text-lg font-semibold text-navy mb-2"><SiteText slotKey="alumni-mentor-title">Mentor a Member</SiteText></h3>
            <p className="text-[15px] text-secondary leading-relaxed mb-5">
              <SiteText slotKey="alumni-mentor-body">Give an hour, a site tour, or a mock interview. The most valuable
              thing you can offer a student is your time and perspective.</SiteText>
            </p>
            <Link href="/contact" className="text-sm font-semibold text-gold-hover hover:text-navy">
              <SiteText slotKey="alumni-mentor-cta">Get in touch →</SiteText>
            </Link>
          </div>
          <div className="border border-border rounded-xl p-7">
            <h3 className="text-lg font-semibold text-navy mb-2"><SiteText slotKey="alumni-gift-title">Make a Gift</SiteText></h3>
            <p className="text-[15px] text-secondary leading-relaxed mb-5">
              <SiteText slotKey="alumni-gift-body">Support student scholarships, the Mentorship Program, and club
              operations. Gifts go straight into what the club does for its
              students.</SiteText>
            </p>
            <Link href="/contact" className="text-sm font-semibold text-gold-hover hover:text-navy">
              <SiteText slotKey="alumni-gift-cta">Get in touch →</SiteText>
            </Link>
          </div>
        </div>
      </section>

      {/* Get in touch CTA */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="display text-3xl text-white max-w-2xl">
            <SiteText slotKey="alumni-cta-title">Get in touch with the club&apos;s brightest.</SiteText>
          </h2>
          <Link href="/contact" className="shrink-0 px-7 py-3.5 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors">
            <SiteText slotKey="alumni-cta-contact">Contact us</SiteText>
          </Link>
        </div>
      </section>
    </>
  );
}
