import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Alumni | GT Real Estate Club" };

export default function AlumniPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Alumni" }]} />

      {/* Intro */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-10">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-6">Alumni</h1>
        <p className="text-[16px] text-secondary leading-relaxed max-w-4xl">
          Connect with an active and passionate alumni network of members who
          hold positions around the world across commercial real estate
          development, finance, investment, and beyond. Georgia Tech Real Estate
          alumni are known for supporting one another, the club, and the next
          generation of students, calling on each other to share ideas, business
          opportunities, and career connections.
        </p>
      </section>

      {/* Alumni network / association */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-[1.3fr_1fr] gap-10 items-center">
          <div>
            <h2 className="display text-3xl text-navy mb-4">The GT Real Estate Alumni Network</h2>
            <p className="text-[15px] text-secondary leading-relaxed">
              Our alumni network serves as the link between graduates, current
              students, and the real estate industry. It supports student
              scholarships, programming, and the club&apos;s operations, and keeps
              Yellow Jackets connected long after graduation through events and
              the alumni LinkedIn group.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup" className="px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
                Join the alumni network
              </Link>
              <Link href="/contact" className="px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-white transition-colors">
                Make a gift
              </Link>
            </div>
          </div>
          <div className="bg-white border border-border border-t-4 border-t-gold rounded-b-2xl p-7">
            <h3 className="text-lg font-semibold text-navy">Alumni directory, coming soon</h3>
            <p className="text-[14px] text-secondary leading-relaxed mt-2">
              We&apos;re building a searchable directory of GT Real Estate alumni
              and where they&apos;ve landed across the industry. Add yourself now
              and you&apos;ll be included the moment it goes live.
            </p>
            <Link href="/signup" className="inline-block mt-4 text-sm font-semibold text-gold-hover hover:text-navy">
              Add yourself to the network →
            </Link>
          </div>
        </div>
      </section>

      {/* Recruit & Hire, prominent Rolodex banner */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-16 grid lg:grid-cols-[1.5fr_1fr] gap-10 items-center">
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-3">
              Recruit &amp; Hire
            </div>
            <h2 className="display text-3xl lg:text-4xl text-white">
              Hire the club&apos;s best from the Analyst Rolodex.
            </h2>
            <p className="mt-4 text-white/75 text-[15px] leading-relaxed max-w-xl">
              A private, vetted directory of Georgia Tech&apos;s strongest real
              estate students, backed by what the club tracks all semester:
              academics, attendance, and graded case-study work. Find and reach the
              next analyst before anyone else.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
            <Link
              href="/rolodex"
              className="px-7 py-3.5 rounded-md bg-gold text-navy text-sm font-bold text-center hover:bg-gold-hover transition-colors"
            >
              Enter the Analyst Rolodex →
            </Link>
            <Link
              href="/opportunities"
              className="px-7 py-3.5 rounded-md border border-white/40 text-white text-sm font-semibold text-center hover:bg-white/10 transition-colors"
            >
              Post an Opportunity
            </Link>
          </div>
        </div>
      </section>

      {/* Other ways to invest in tomorrow's leaders */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14">
        <h2 className="display text-3xl text-navy mb-8">Other ways to invest in tomorrow&apos;s leaders</h2>
        <div className="grid md:grid-cols-2 gap-7">
          <div className="border border-border rounded-xl p-7">
            <h3 className="text-lg font-semibold text-navy mb-2">Mentor a Member</h3>
            <p className="text-[15px] text-secondary leading-relaxed mb-5">
              Give an hour, a site tour, or a mock interview. The most valuable
              thing you can offer a student is your time and perspective.
            </p>
            <Link href="/contact" className="text-sm font-semibold text-gold-hover hover:text-navy">
              Get in touch →
            </Link>
          </div>
          <div className="border border-border rounded-xl p-7">
            <h3 className="text-lg font-semibold text-navy mb-2">Make a Gift</h3>
            <p className="text-[15px] text-secondary leading-relaxed mb-5">
              Support student scholarships, the Mentorship Program, and club
              operations. Every gift goes directly toward preparing the next
              generation of members.
            </p>
            <Link href="/contact" className="text-sm font-semibold text-gold-hover hover:text-navy">
              Get in touch →
            </Link>
          </div>
        </div>
      </section>

      {/* Get in touch CTA */}
      <section className="bg-navy">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <h2 className="display text-3xl text-white max-w-2xl">
            Get in touch with the club&apos;s brightest.
          </h2>
          <Link href="/contact" className="shrink-0 px-7 py-3.5 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors">
            Contact us
          </Link>
        </div>
      </section>
    </>
  );
}
