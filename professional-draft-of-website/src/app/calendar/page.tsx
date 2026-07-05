"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { Badge } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";
import type { ClubEvent } from "@/lib/store/types";

// Admin-managed calendar: renders ClubEvent records the exec team posts in
// Admin → Events, so there's one source of truth (calendar + check-in feed off
// the same data). If an admin sets a Google Calendar embed URL in Site Info,
// that iframe is shown instead for teams who'd rather manage dates in Google.
const TYPE_TONE: Record<ClubEvent["type"], "navy" | "gold" | "green" | "amber" | "red" | "gray"> = {
  Meeting: "navy",
  Event: "gold",
  Workshop: "green",
  Deadline: "red",
  Social: "amber",
  "Case Study": "gray",
};

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CalendarPage() {
  const { state } = useGtre();
  const embed = state.siteInfo.googleCalendarEmbedUrl;

  // Start the view on the first month that has an event (falls back to July 2026).
  const firstEvent = [...state.events].sort((a, b) => a.date.localeCompare(b.date))[0];
  const initial = firstEvent ? firstEvent.date : "2026-08-01";
  const [year, setYear] = useState(Number(initial.slice(0, 4)));
  const [month, setMonth] = useState(Number(initial.slice(5, 7)) - 1);

  const eventsByDay = useMemo(() => {
    const map: Record<string, ClubEvent[]> = {};
    for (const e of state.events) {
      (map[e.date] ??= []).push(e);
    }
    return map;
  }, [state.events]);

  const grid = useMemo(() => buildMonthGrid(year, month), [year, month]);

  const upcoming = [...state.events]
    .filter((e) => e.date >= "2026-07-01")
    .sort((a, b) => a.date.localeCompare(b.date));

  function shift(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  return (
    <>
      <Breadcrumb trail={[{ label: "Calendar" }]} />

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-4">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-3">Calendar</h1>
        <p className="text-secondary max-w-2xl">
          Club meetings, events, workshops, socials, and deadlines. Managed by the exec team — members can check in for
          any meeting from the portal.
        </p>
        <div className="border-t border-gold mt-7" />
      </section>

      {embed ? (
        <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-8">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
            <iframe src={embed} title="GTRE Google Calendar" className="w-full" style={{ height: "75vh" }} loading="lazy" />
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-8 grid lg:grid-cols-[1.6fr_1fr] gap-10">
          {/* Month grid */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="display text-2xl text-navy">
                {MONTHS[month]} {year}
              </h2>
              <div className="flex gap-2">
                <button onClick={() => shift(-1)} className="w-9 h-9 rounded-md border border-border text-navy hover:bg-surface" aria-label="Previous month">
                  ‹
                </button>
                <button onClick={() => shift(1)} className="w-9 h-9 rounded-md border border-border text-navy hover:bg-surface" aria-label="Next month">
                  ›
                </button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-px bg-border border border-border rounded-xl overflow-hidden">
              {DOW.map((d) => (
                <div key={d} className="bg-surface text-[11px] font-semibold uppercase tracking-wide text-secondary text-center py-2">
                  {d}
                </div>
              ))}
              {grid.map((cell, i) => {
                const key = cell ? `${year}-${pad(month + 1)}-${pad(cell)}` : `empty-${i}`;
                const dayEvents = cell ? eventsByDay[key] ?? [] : [];
                return (
                  <div key={key} className={`bg-white min-h-[92px] p-1.5 ${!cell ? "bg-surface/40" : ""}`}>
                    {cell && (
                      <>
                        <div className="text-[12px] text-secondary mb-1">{cell}</div>
                        <div className="space-y-1">
                          {dayEvents.map((e) => (
                            <div key={e.id} className="text-[11px] leading-tight rounded px-1.5 py-1 bg-navy/5 text-navy truncate" title={`${e.title}${e.time ? " · " + e.time : ""}`}>
                              <span
                                className="inline-block w-1.5 h-1.5 rounded-full mr-1 align-middle"
                                style={{ backgroundColor: e.type === "Deadline" ? "#b91c1c" : "#b3a369" }}
                              />
                              {e.title}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap gap-3 mt-4">
              {(Object.keys(TYPE_TONE) as ClubEvent["type"][]).map((t) => (
                <span key={t} className="inline-flex items-center gap-1.5 text-[12px] text-secondary">
                  <Badge tone={TYPE_TONE[t]}>{t}</Badge>
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming list */}
          <aside>
            <h2 className="display text-2xl text-navy mb-4">Upcoming</h2>
            <div className="space-y-3">
              {upcoming.length === 0 && <p className="text-secondary text-sm">No upcoming events posted yet.</p>}
              {upcoming.map((e) => (
                <div key={e.id} className="flex items-start gap-4 bg-white border border-border rounded-xl p-4">
                  <div className="text-center w-12 shrink-0">
                    <div className="text-[11px] uppercase text-gold-hover font-semibold">
                      {new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
                    </div>
                    <div className="text-2xl text-navy display leading-none">{new Date(e.date + "T12:00:00").getDate()}</div>
                  </div>
                  <div className="min-w-0">
                    <Badge tone={TYPE_TONE[e.type]}>{e.type}</Badge>
                    <div className="font-semibold text-navy mt-1">{e.title}</div>
                    <div className="text-[13px] text-secondary">{[e.time, e.location].filter(Boolean).join(" · ")}</div>
                    {e.description && <p className="text-[13px] text-secondary mt-1">{e.description}</p>}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-[13px] text-secondary mt-5">
              Members: check in for meetings in the{" "}
              <Link href="/portal/check-in" className="font-semibold text-gold-hover hover:text-navy">
                portal
              </Link>
              .
            </p>
          </aside>
        </section>
      )}
    </>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

// Returns an array of 42 cells (6 weeks): day numbers or null for padding.
function buildMonthGrid(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
