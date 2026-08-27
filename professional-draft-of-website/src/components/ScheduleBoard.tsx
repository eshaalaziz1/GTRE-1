"use client";

import { useGtre } from "@/lib/store/GtreStore";
import { Badge } from "@/components/ui";
import type { ClubEvent, EventTrack } from "@/lib/store/types";

/**
 * The club's schedule shown as two side-by-side tracks (Mentorship Program +
 * Industry Events), mirroring the exec team's planning spreadsheet. Rows are
 * ordered by each event's manual `order` (admins reorder in Admin → Events).
 * Read-only display; management lives in the admin portal.
 */
const TRACKS: { key: EventTrack; label: string }[] = [
  { key: "Mentorship Program", label: "Mentorship Program" },
  { key: "Industry Events", label: "Industry Events" },
];

function fmtDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(2)}`;
}

export default function ScheduleBoard() {
  const { state } = useGtre();

  const byTrack = (track: EventTrack) =>
    state.events.filter((e) => e.track === track).sort((a, b) => a.order - b.order || a.date.localeCompare(b.date));

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {TRACKS.map((t) => (
        <div key={t.key} className="rounded-2xl overflow-hidden border border-border">
          <div className="bg-navy text-white px-5 py-3 text-center">
            <div className="text-gold text-[11px] font-semibold uppercase tracking-[0.2em]">2026</div>
            <h3 className="font-semibold text-white">{t.label}</h3>
          </div>
          <div className="divide-y divide-border bg-white">
            {byTrack(t.key).length === 0 ? (
              <div className="px-5 py-6 text-sm text-secondary text-center">No events scheduled yet.</div>
            ) : (
              byTrack(t.key).map((e) => <ScheduleRow key={e.id} event={e} />)
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

function ScheduleRow({ event: e }: { event: ClubEvent }) {
  const isBreak = /break/i.test(e.title);
  return (
    <div className={`flex items-center gap-3 px-4 py-3 ${isBreak ? "bg-surface" : ""}`}>
      <div className="w-16 shrink-0 text-[13px] font-semibold text-secondary tabular-nums">{fmtDate(e.date)}</div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-navy text-[15px] leading-snug">{e.title}</div>
        {e.checkInCode && e.checkInOpen && (
          <span className="inline-block mt-1">
            <Badge tone="green">Check-in open</Badge>
          </span>
        )}
      </div>
      <div className="shrink-0 text-[13px] text-secondary">{e.location}</div>
    </div>
  );
}
