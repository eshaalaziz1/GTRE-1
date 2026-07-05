"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";
import type { ClubEvent } from "@/lib/store/types";

// Reusable month-grid calendar that reads events from the store. Used by the
// public /calendar page and the member portal Schedule tab.
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

export default function MonthCalendar() {
  const { state } = useGtre();

  const firstEvent = [...state.events].sort((a, b) => a.date.localeCompare(b.date))[0];
  const initial = firstEvent ? firstEvent.date : "2026-08-01";
  const [year, setYear] = useState(Number(initial.slice(0, 4)));
  const [month, setMonth] = useState(Number(initial.slice(5, 7)) - 1);

  const eventsByDay = useMemo(() => {
    const map: Record<string, ClubEvent[]> = {};
    for (const e of state.events) (map[e.date] ??= []).push(e);
    return map;
  }, [state.events]);

  const grid = useMemo(() => buildMonthGrid(year, month), [year, month]);

  function shift(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  return (
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
                          style={{ backgroundColor: e.type === "Deadline" ? "#b91c1c" : e.track === "Industry Events" ? "#b3a369" : "#003057" }}
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
          <Badge key={t} tone={TYPE_TONE[t]}>
            {t}
          </Badge>
        ))}
      </div>
    </div>
  );
}

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function buildMonthGrid(year: number, month: number): (number | null)[] {
  const firstDow = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDow; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}
