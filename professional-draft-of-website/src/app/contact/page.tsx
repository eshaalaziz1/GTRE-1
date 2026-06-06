import Breadcrumb from "@/components/Breadcrumb";
import Avatar from "@/components/Avatar";
import { LEADERSHIP } from "@/lib/content";

export const metadata = { title: "Contact Us | GT Real Estate Club" };

export default function ContactPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Contact Us" }]} />

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-16">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-4">Contact Us</h1>
        <p className="text-[16px] text-secondary leading-relaxed max-w-3xl mb-10">
          Reach the right person directly. For general questions, email{" "}
          <a href="mailto:realestate@gatech.edu" className="text-gold-hover hover:text-navy font-medium">
            realestate@gatech.edu
          </a>
          . We meet Thursdays at 6:00 PM in the Scheller College of Business.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {LEADERSHIP.map((p) => (
            <div
              key={p.email}
              className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center"
            >
              <Avatar name={p.name} photo={null} size={104} />
              <h2 className="mt-4 text-[17px] font-bold text-navy">{p.name}</h2>
              <div className="text-[14px] italic text-secondary mt-1">{p.role}</div>
              <div className="text-[13px] text-secondary">{p.affiliation}</div>
              <a
                href={`mailto:${p.email}`}
                className="mt-3 text-[13px] font-semibold text-gold-hover hover:text-navy break-all"
              >
                {p.email}
              </a>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
