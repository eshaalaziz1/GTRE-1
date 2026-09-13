"use client";

import { useGtre } from "@/lib/store/GtreStore";

// Home-page "Upcoming Events" teaser. Reads the SAME live event data as the
// Calendar page (the admin-managed schedule in the store), so it can never
// drift from the real schedule the way a separate hardcoded list did. Shows the
// next 4 events across both tracks, in date order, starting from today.
const MONTHS = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

function todayISO(): string {
  const d = new Date();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

// ISO "yyyy-mm-dd" -> { month: "SEP", day: "14" } without timezone drift.
function parts(iso: string): { month: string; day: string } {
  const [, mm, dd] = iso.split("-");
  const monthIdx = Number(mm) - 1;
  return { month: MONTHS[monthIdx] ?? "", day: String(Number(dd)) };
}

export default function UpcomingEvents() {
  const { state, ready } = useGtre();

  const today = todayISO();
  const upcoming = [...state.events]
    .filter((e) => e.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date) || a.order - b.order)
    .slice(0, 4);

  if (!ready) {
    return <div className="text-[14px] text-secondary">Loading the schedule…</div>;
  }

  if (upcoming.length === 0) {
    return (
      <div className="bg-white border border-border rounded-lg p-4 text-[14px] text-secondary">
        No upcoming events are on the calendar right now. Check the full calendar for the latest.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {upcoming.map((e) => {
        const { month, day } = parts(e.date);
        return (
          <div key={e.id} className="bg-white border border-border rounded-lg p-4 flex gap-4 items-center">
            <div className="text-center shrink-0 w-14">
              <div className="text-[11px] uppercase text-gold-hover font-semibold">{month}</div>
              <div className="text-2xl text-navy font-semibold leading-none">{day}</div>
            </div>
            <div className="border-l border-border pl-4">
              <div className="font-semibold text-navy text-[15px]">{e.title}</div>
              <div className="text-[13px] text-secondary">
                {[e.time, e.location].filter(Boolean).join(" · ")}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
