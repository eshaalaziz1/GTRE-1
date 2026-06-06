import Breadcrumb from "@/components/Breadcrumb";
import PhotoSlot from "@/components/PhotoSlot";
import { EVENTS } from "@/lib/content";

export const metadata = { title: "Events | GT Real Estate Club" };

export default function EventsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "Events" }]} />

      {/* Compact split header with a real event photo */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 grid lg:grid-cols-[1fr_360px] gap-10 items-center">
        <div>
          <h1 className="display text-4xl lg:text-5xl text-navy mb-3">Events</h1>
          <p className="text-secondary max-w-xl">
            Panels, workshops, case studies, and networking nights throughout the
            year. All members are welcome; partners and alumni are encouraged to join.
          </p>
          <div className="border-t border-gold mt-7" />
        </div>
        <PhotoSlot src="/gtre-mixer.png" alt="GTRE student and alumni mixer" ratio="aspect-[4/3]" />
      </section>

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-10 pb-16">
        <h2 className="display text-2xl text-navy mb-8">Fall 2026 schedule</h2>
        <div className="space-y-4">
          {EVENTS.map((e) => (
            <div
              key={e.title}
              className="flex flex-col sm:flex-row sm:items-center gap-5 border border-border rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="text-center sm:border-r sm:border-border sm:pr-6 w-full sm:w-28 shrink-0">
                <div className="text-[12px] uppercase text-gold-hover font-semibold">
                  {e.date.split(" ")[0]}
                </div>
                <div className="text-3xl text-navy display leading-none">
                  {e.date.split(" ")[1].replace(",", "")}
                </div>
                <div className="text-[12px] text-secondary">{e.date.split(" ")[2]}</div>
              </div>
              <div className="flex-1">
                <span className="inline-block text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded bg-gold-soft text-navy mb-2">
                  {e.type}
                </span>
                <div className="text-lg font-semibold text-navy">{e.title}</div>
                <div className="text-[14px] text-secondary mt-0.5">
                  {e.time} · {e.location}
                </div>
              </div>
              <button className="shrink-0 px-5 py-2.5 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-surface transition-colors">
                RSVP
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
