"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { useEditMode } from "@/lib/editMode";
import { Badge } from "@/components/ui";
import type { ClubEvent, EventTrack } from "@/lib/store/types";

/**
 * The club's schedule shown as two side-by-side tracks (Mentorship Program +
 * Industry Events). Rows are ordered by each event's manual `order`.
 *
 * When an admin turns on Edit mode, each row gets Edit/Delete controls and each
 * track gets "Add event", so the whole schedule is managed right here (no need
 * for a separate admin section). Members and visitors see a read-only board.
 */
const TRACKS: { key: EventTrack; label: string }[] = [
  { key: "Mentorship Program", label: "Mentorship Program" },
  { key: "Industry Events", label: "Industry Events" },
];

const EVENT_TYPES: ClubEvent["type"][] = ["Meeting", "Event", "Workshop", "Deadline", "Social", "Case Study"];
// Only the two tracks the schedule board renders, so a new event is always visible here.
const EVENT_TRACKS: EventTrack[] = ["Mentorship Program", "Industry Events"];

function fmtDate(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear().toString().slice(2)}`;
}

export default function ScheduleBoard() {
  const { state, currentAccount } = useGtre();
  const { editMode } = useEditMode();
  const canEdit = editMode && currentAccount?.role === "admin";
  const [editorFor, setEditorFor] = useState<{ event?: ClubEvent; track: EventTrack } | null>(null);

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
              byTrack(t.key).map((e) => (
                <ScheduleRow key={e.id} event={e} canEdit={canEdit} onEdit={() => setEditorFor({ event: e, track: t.key })} />
              ))
            )}
            {canEdit && (
              <button
                onClick={() => setEditorFor({ track: t.key })}
                className="w-full px-4 py-3 text-[13px] font-semibold text-gold-hover hover:bg-surface transition-colors"
              >
                + Add event
              </button>
            )}
          </div>
        </div>
      ))}

      {editorFor && (
        <EventEditorModal event={editorFor.event} defaultTrack={editorFor.track} onClose={() => setEditorFor(null)} />
      )}
    </div>
  );
}

function ScheduleRow({
  event: e,
  canEdit,
  onEdit,
}: {
  event: ClubEvent;
  canEdit: boolean;
  onEdit: () => void;
}) {
  const { deleteEvent } = useGtre();
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
      {canEdit ? (
        <div className="shrink-0 flex items-center gap-2 text-[12px]">
          <button onClick={onEdit} className="font-semibold text-gold-hover hover:text-navy">Edit</button>
          <button
            onClick={() => { if (confirm(`Delete "${e.title}"?`)) deleteEvent(e.id); }}
            className="font-semibold text-secondary hover:text-red-600"
          >
            Delete
          </button>
        </div>
      ) : (
        <div className="shrink-0 text-[13px] text-secondary">{e.location}</div>
      )}
    </div>
  );
}

function EventEditorModal({
  event,
  defaultTrack,
  onClose,
}: {
  event?: ClubEvent;
  defaultTrack: EventTrack;
  onClose: () => void;
}) {
  const { addEvent, updateEvent } = useGtre();
  const [form, setForm] = useState({
    title: event?.title ?? "",
    type: event?.type ?? ("Meeting" as ClubEvent["type"]),
    track: event?.track ?? defaultTrack,
    date: event?.date ?? "",
    time: event?.time ?? "",
    location: event?.location ?? "",
    description: event?.description ?? "",
    checkInCode: event?.checkInCode ?? "",
    checkInOpen: event?.checkInOpen ?? false,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  function save(ev: React.FormEvent) {
    ev.preventDefault();
    if (!form.title.trim() || !form.date) return;
    const patch = {
      title: form.title,
      type: form.type,
      track: form.track,
      date: form.date,
      time: form.time || undefined,
      location: form.location || undefined,
      description: form.description || undefined,
      checkInCode: form.checkInCode || undefined,
      checkInOpen: form.checkInOpen,
    };
    if (event) updateEvent(event.id, patch);
    else addEvent(patch);
    onClose();
  }

  const field = "w-full border border-border rounded-lg px-3 py-2 text-sm text-text outline-none focus:border-navy";
  const label = "block text-[11px] font-semibold uppercase tracking-wide text-navy mb-1";

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <form
        onSubmit={save}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl space-y-3 text-left max-h-[90vh] overflow-y-auto"
      >
        <div className="text-[13px] font-semibold text-navy">{event ? "Edit event" : "Add event"}</div>
        <div>
          <span className={label}>Title</span>
          <input className={field} value={form.title} onChange={(e) => set("title", e.target.value)} required />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className={label}>Type</span>
            <select className={field} value={form.type} onChange={(e) => set("type", e.target.value as ClubEvent["type"])}>
              {EVENT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div>
            <span className={label}>Track</span>
            <select className={field} value={form.track} onChange={(e) => set("track", e.target.value as EventTrack)}>
              {EVENT_TRACKS.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <span className={label}>Date</span>
            <input type="date" className={field} value={form.date} onChange={(e) => set("date", e.target.value)} required />
          </div>
          <div>
            <span className={label}>Time</span>
            <input className={field} value={form.time} onChange={(e) => set("time", e.target.value)} placeholder="6:30 PM" />
          </div>
        </div>
        <div>
          <span className={label}>Location</span>
          <input className={field} value={form.location} onChange={(e) => set("location", e.target.value)} placeholder="Caddell" />
        </div>
        <div>
          <span className={label}>Description</span>
          <textarea className={field} rows={2} value={form.description} onChange={(e) => set("description", e.target.value)} />
        </div>
        <div className="grid grid-cols-2 gap-3 items-end">
          <div>
            <span className={label}>Check-in code</span>
            <input className={field} value={form.checkInCode} onChange={(e) => set("checkInCode", e.target.value)} placeholder="e.g. INTRO" />
          </div>
          <label className="flex items-center gap-2 text-[13px] font-semibold text-navy pb-2">
            <input type="checkbox" className="accent-navy w-4 h-4" checked={form.checkInOpen} onChange={(e) => set("checkInOpen", e.target.checked)} />
            Check-in open
          </label>
        </div>
        <div className="flex justify-end gap-2 pt-1">
          <button type="button" onClick={onClose} className="px-3 py-1.5 text-[13px] font-semibold text-secondary hover:text-navy">Cancel</button>
          <button type="submit" className="px-4 py-1.5 rounded-md bg-navy text-white text-[13px] font-semibold hover:bg-navy-deep transition-colors">
            {event ? "Save" : "Add"}
          </button>
        </div>
      </form>
    </div>
  );
}
