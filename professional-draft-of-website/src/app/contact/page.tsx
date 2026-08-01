import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata = { title: "Contact Us | GT Real Estate Club" };

export default function ContactPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Contact Us" }]} />

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-16">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-4">Contact Us</h1>
        <p className="text-[16px] text-secondary leading-relaxed max-w-3xl mb-10">
          For general questions, email{" "}
          <a href="mailto:realestate@gatech.edu" className="text-gold-hover hover:text-navy font-medium">
            realestate@gatech.edu
          </a>
          . We meet Thursdays at 6:00 PM in the Scheller College of Business.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-navy">Email</h2>
            <a href="mailto:realestate@gatech.edu" className="text-[15px] text-gold-hover hover:text-navy break-all">
              realestate@gatech.edu
            </a>
          </div>
          <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-navy">Meetings</h2>
            <p className="text-[15px] text-secondary">Thursdays at 6:00 PM</p>
            <p className="text-[15px] text-secondary">Scheller College of Business</p>
          </div>
          <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-navy">Leadership</h2>
            <p className="text-[15px] text-secondary mb-2">Reach a specific officer.</p>
            <Link href="/leadership" className="text-[14px] font-semibold text-gold-hover hover:text-navy">
              Meet the exec board →
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-navy text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="display text-2xl text-white">Want to get involved?</h2>
            <p className="text-white/80 mt-1 text-[15px]">
              Join the club and the Analyst Program, or request access as an industry partner.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/signup" className="px-6 py-3 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors">
              Request access
            </Link>
            <Link href="/analyst-program" className="px-6 py-3 rounded-md border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
              Analyst Program
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
