import Breadcrumb from "@/components/Breadcrumb";
import LeadershipView from "./LeadershipView";
import { EXEC_TERMS } from "@/lib/leadership";

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

      <LeadershipView terms={EXEC_TERMS} />
    </>
  );
}
