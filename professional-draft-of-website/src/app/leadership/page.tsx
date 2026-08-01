import Breadcrumb from "@/components/Breadcrumb";
import ExecAvatar from "@/components/ExecAvatar";
import { EXEC_TERMS, type ExecMember } from "@/lib/leadership";

export const metadata = { title: "Leadership | GT Real Estate Club" };

export default function LeadershipPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Leadership" }]} />

      {/* Header */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-2">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-3">Leadership</h1>
        <p className="text-secondary max-w-2xl">
          The student executive board runs the club, the Analyst Program, and every event on the calendar. Meet the
          team leading Georgia Tech Real Estate.
        </p>
      </section>

      {EXEC_TERMS.map((termGroup) => {
        const [president, ...rest] = termGroup.members;
        return (
          <section key={termGroup.term} className="mx-auto max-w-[1280px] px-6 lg:px-10 py-10">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="display text-3xl text-navy">{termGroup.term}</h2>
              <div className="flex-1 border-t border-gold" />
              <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-gold-hover">
                Executive Board
              </span>
            </div>

            {/* President — featured wide card */}
            {president && <PresidentCard member={president} />}

            {/* The rest of the board */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {rest.map((m) => (
                <ExecCard key={m.slug} member={m} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}

function PresidentCard({ member }: { member: ExecMember }) {
  return (
    <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-7 flex flex-col sm:flex-row items-center sm:items-start gap-7">
      <ExecAvatar src={member.photo} name={member.name} size={168} />
      <div className="text-center sm:text-left">
        <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-hover mb-1">
          {member.role}
        </div>
        <h3 className="text-2xl font-bold text-navy">{member.name}</h3>
        <p className="text-[15px] text-secondary leading-relaxed mt-3 max-w-2xl">{member.bio}</p>
      </div>
    </div>
  );
}

function ExecCard({ member }: { member: ExecMember }) {
  return (
    <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center">
      <ExecAvatar src={member.photo} name={member.name} size={132} />
      <h3 className="mt-4 text-[17px] font-bold text-navy">{member.name}</h3>
      <div className="text-[14px] italic text-gold-hover mt-0.5">{member.role}</div>
      <p className="text-[14px] text-secondary leading-relaxed mt-3">{member.bio}</p>
    </div>
  );
}
