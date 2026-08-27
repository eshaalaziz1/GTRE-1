import Avatar from "@/components/Avatar";
import Breadcrumb from "@/components/Breadcrumb";
import SiteText from "@/components/SiteText";
import { BOARD, ALUMNI_BOARD } from "@/lib/board";

export const metadata = { title: "Advisory Board | GT Real Estate Club" };

const BENEFITS = [
  {
    title: "Stay close to the students",
    body: "Board members meet the club at events, judge the case study, and sit in on small-group discussions in Atlanta through the year.",
  },
  {
    title: "Keep a read on the market",
    body: "The speaker series and the annual market outlook keep board members current on where the industry is headed.",
  },
  {
    title: "Give back",
    body: "Mentor a student, judge a case study, or help fund a scholarship. Board members decide how they want to be involved.",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Advisory Board" }]} />

      {/* Header */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-2">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-3"><SiteText slotKey="advisory-title" /></h1>
        <p className="text-secondary max-w-2xl"><SiteText slotKey="advisory-intro" /></p>
      </section>

      {/* Advisory Board — senior advisors */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-10 pb-6">
        <div className="flex items-center gap-4 mb-3">
          <h2 className="display text-2xl text-navy"><SiteText slotKey="advisory-board-section-title">Advisory Board</SiteText></h2>
          <div className="flex-1 border-t border-gold" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-gold-hover">
            <SiteText slotKey="advisory-board-section-label">Senior advisors</SiteText>
          </span>
        </div>
        <p className="text-[15px] text-secondary leading-relaxed max-w-3xl mb-8">
          <SiteText slotKey="advisory-board-section-desc">Senior real estate leaders who guide the club, advise on direction, and
          contribute as guest lecturers and mentors, drawn from across the
          functional areas of real estate and urban development.</SiteText>
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {BOARD.map((m) => (
            <div
              key={m.slug}
              className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center"
            >
              <Avatar name={m.name} photo={m.photo} size={120} slotKey={`board-${m.slug}`} />
              <h3 className="mt-4 text-[17px] font-bold text-navy">{m.name}</h3>
              <div className="text-[14px] italic text-secondary mt-1">{m.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alumni Board — active alumni, merged into this tab */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-6 pb-12">
        <div className="flex items-center gap-4 mb-3">
          <h2 className="display text-2xl text-navy"><SiteText slotKey="advisory-alumni-section-title">Alumni Board</SiteText></h2>
          <div className="flex-1 border-t border-gold" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-gold-hover">
            <SiteText slotKey="advisory-alumni-section-label">Active alumni</SiteText>
          </span>
        </div>
        <p className="text-[15px] text-secondary leading-relaxed max-w-3xl mb-8">
          <SiteText slotKey="advisory-alumni-section-desc">Alumni who stay close to the club, mentoring members, judging case
          studies, passing along internship and full-time leads, and helping steer
          things year to year.</SiteText>
        </p>
        {ALUMNI_BOARD.length === 0 ? (
          <div className="rounded-2xl border border-border border-t-4 border-t-gold bg-surface p-8 text-center">
            <h3 className="text-lg font-semibold text-navy"><SiteText slotKey="advisory-alumni-empty-title">Roster being finalized</SiteText></h3>
            <p className="text-[14px] text-secondary leading-relaxed mt-2 max-w-xl mx-auto">
              We&apos;re confirming this year&apos;s alumni board and will list them
              here shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {ALUMNI_BOARD.map((m) => (
              <div
                key={m.slug}
                className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center"
              >
                <Avatar name={m.name} photo={m.photo} size={120} slotKey={`board-${m.slug}`} />
                <h3 className="mt-4 text-[17px] font-bold text-navy">{m.name}</h3>
                <div className="text-[14px] italic text-secondary mt-1">{m.role}</div>
                {m.company && <div className="text-[13px] text-secondary mt-0.5">{m.company}</div>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Why serve on the board */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14">
          <h2 className="display text-3xl text-navy mb-3"><SiteText slotKey="advisory-why-title">Why serve on the board</SiteText></h2>
          <p className="text-secondary mb-10 max-w-2xl">
            <SiteText slotKey="advisory-why-desc">What board members get out of it, beyond helping the next class of
            students find their footing.</SiteText>
          </p>
          <div className="grid md:grid-cols-3 gap-7">
            {BENEFITS.map((b, i) => (
              <div key={b.title} className="border-t-4 border-gold pt-6">
                <h3 className="text-xl font-semibold text-navy mb-3"><SiteText slotKey={`advisory-benefit-${i}-title`}>{b.title}</SiteText></h3>
                <p className="text-[15px] text-secondary leading-relaxed"><SiteText slotKey={`advisory-benefit-${i}-body`}>{b.body}</SiteText></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
