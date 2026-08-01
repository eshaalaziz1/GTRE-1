import Avatar from "@/components/Avatar";
import Breadcrumb from "@/components/Breadcrumb";
import { BOARD } from "@/lib/board";

export const metadata = { title: "Advisory Board | GT Real Estate Club" };

const BENEFITS = [
  {
    title: "High-level networking",
    body: "Expand your professional network and connect with students and faculty at board conferences and small-group, topic-focused discussions in Atlanta and beyond.",
  },
  {
    title: "Lifelong learning",
    body: "From timely presenters to the annual market outlook, board members get a front-row seat to the ideas and data shaping the industry.",
  },
  {
    title: "Opportunities to give back",
    body: "Mentor students, judge case studies, and help fund scholarships and programming that prepare the next generation of analysts.",
  },
];

export default function AdvisoryBoardPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Advisory Board" }]} />

      {/* Header */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-2">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-3">Advisory Board</h1>
        <p className="text-secondary max-w-2xl">
          Senior real estate leaders who guide the club, mentor members, and open
          doors across the industry.
        </p>
      </section>

      {/* Member grid — name and role */}
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-12">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {BOARD.map((m) => (
            <div
              key={m.slug}
              className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center"
            >
              <Avatar name={m.name} photo={m.photo} size={120} />
              <h3 className="mt-4 text-[17px] font-bold text-navy">{m.name}</h3>
              <div className="text-[14px] italic text-secondary mt-1">{m.role}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Intro + why serve */}
      <section className="bg-surface border-t border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14">
          <p className="text-[16px] text-secondary leading-relaxed max-w-4xl mb-12">
            Comprised of senior real estate leaders, our Advisory Board is a core
            support group for the club, advising on direction, participating in
            conferences and lifelong-learning sessions, and contributing as guest
            lecturers and mentors. Representation is drawn from across the
            functional areas of real estate and urban development.
          </p>
          <h2 className="display text-3xl text-navy mb-3">Why serve on the board</h2>
          <p className="text-secondary mb-10 max-w-2xl">
            Board members strengthen the future of the profession and gain real
            benefits in return.
          </p>
          <div className="grid md:grid-cols-3 gap-7">
            {BENEFITS.map((b) => (
              <div key={b.title} className="border-t-4 border-gold pt-6">
                <h3 className="text-xl font-semibold text-navy mb-3">{b.title}</h3>
                <p className="text-[15px] text-secondary leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
