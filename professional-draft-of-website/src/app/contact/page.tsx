import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import SiteText from "@/components/SiteText";

export const metadata = { title: "Contact Us | GT Real Estate Club" };

export default function ContactPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Contact Us" }]} />

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-16">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-4"><SiteText slotKey="contact-title" /></h1>
        <p className="text-[16px] text-secondary leading-relaxed max-w-3xl mb-10">
          For general questions, email{" "}
          <a href="mailto:rjalali6@gatech.edu" className="text-gold-hover hover:text-navy font-medium">
            rjalali6@gatech.edu
          </a>
          . We meet Mondays at 6:30 PM in the Scheller College of Business.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-navy"><SiteText slotKey="contact-email-label">Email</SiteText></h2>
            <a href="mailto:rjalali6@gatech.edu" className="text-[15px] text-gold-hover hover:text-navy break-all">
              rjalali6@gatech.edu
            </a>
          </div>
          <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-navy"><SiteText slotKey="contact-meetings-label">Meetings</SiteText></h2>
            <p className="text-[15px] text-secondary"><SiteText slotKey="contact-meeting-time">Mondays at 6:30 PM</SiteText></p>
            <p className="text-[15px] text-secondary"><SiteText slotKey="contact-meeting-place">Scheller College of Business</SiteText></p>
          </div>
          <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6">
            <h2 className="font-bold text-navy"><SiteText slotKey="contact-leadership-label">Leadership</SiteText></h2>
            <p className="text-[15px] text-secondary mb-2"><SiteText slotKey="contact-leadership-body">Reach a specific officer.</SiteText></p>
            <Link href="/leadership" className="text-[14px] font-semibold text-gold-hover hover:text-navy">
              <SiteText slotKey="contact-leadership-cta">Meet the exec board →</SiteText>
            </Link>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-navy text-white p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="display text-2xl text-white"><SiteText slotKey="contact-cta-title">Want to get involved?</SiteText></h2>
            <p className="text-white/80 mt-1 text-[15px]">
              <SiteText slotKey="contact-cta-body">Join the club and the Mentorship Program, or request access as an industry partner.</SiteText>
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Link href="/signup" className="px-6 py-3 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors">
              <SiteText slotKey="contact-cta-request">Request access</SiteText>
            </Link>
            <Link href="/analyst-program" className="px-6 py-3 rounded-md border border-white/40 text-white text-sm font-semibold hover:bg-white/10 transition-colors">
              <SiteText slotKey="contact-cta-program">Mentorship Program</SiteText>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
