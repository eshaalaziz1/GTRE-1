"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Field, Notice, Select, Tabs, TextArea } from "@/components/ui";
import type { ClubEvent, EventTrack } from "@/lib/store/types";

const TYPES: ClubEvent["type"][] = ["Meeting", "Event", "Workshop", "Deadline", "Social", "Case Study"];
const TRACKS: EventTrack[] = ["Mentorship Program", "Industry Events", "General"];

export default function AdminEvents() {
  const { state, addEvent } = useGtre();
  const [track, setTrack] = useState<EventTrack>("Mentorship Program");
  const [form, setForm] = useState({
    title: "",
    type: "Meeting" as ClubEvent["type"],
    date: "",
    time: "",
    location: "",
    description: "",
    checkInCode: "",
  });
  const [added, setAdded] = useState(false);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    addEvent({
      title: form.title,
      track,
      type: form.type,
      date: form.date,
      time: form.time || undefined,
      location: form.location || undefined,
      description: form.description || undefined,
      checkInCode: form.checkInCode.trim().toUpperCase() || undefined,
      checkInOpen: false,
    });
    setForm({ title: "", type: "Meeting", date: "", time: "", location: "", description: "", checkInCode: "" });
    setAdded(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Events &amp; Check-Ins</h2>
        <p className="text-secondary mt-1">
          Add meetings and events (they feed the calendar and portal schedule), set check-in codes, reorder within a
          track, edit, delete, and view attendance.
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">New event</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {added && <Notice tone="success">Event added to the schedule.</Notice>}
          <div className="grid sm:grid-cols-2 gap-3">
            <Select label="Track" value={track} onChange={(v) => setTrack(v as EventTrack)} options={TRACKS.map((t) => ({ value: t, label: t }))} />
            <Select label="Type" value={form.type} onChange={(v) => set("type", v)} options={TYPES.map((t) => ({ value: t, label: t }))} />
          </div>
          <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Date" type="date" value={form.date} onChange={(v) => set("date", v)} required />
            <Field label="Time" value={form.time} onChange={(v) => set("time", v)} placeholder="6:00 PM" />
            <Field label="Location" value={form.location} onChange={(v) => set("location", v)} placeholder="Caddell" />
          </div>
          <TextArea label="Description" value={form.description} onChange={(v) => set("description", v)} rows={2} />
          <Field label="Check-in code (optional)" value={form.checkInCode} onChange={(v) => set("checkInCode", v.toUpperCase())} placeholder="e.g. INTRO" />
          <Button type="submit">Add event</Button>
        </form>
      </Card>

      <TrackedEventList />
    </div>
  );
}

function TrackedEventList() {
  const { state } = useGtre();
  const [track, setTrack] = useState<EventTrack>("Mentorship Program");

  const counts = Object.fromEntries(TRACKS.map((t) => [t, state.events.filter((e) => e.track === t).length])) as Record<EventTrack, number>;
  const events = state.events.filter((e) => e.track === track).sort((a, b) => a.order - b.order || a.date.localeCompare(b.date));

  return (
    <section className="space-y-4">
      <Tabs active={track} onChange={(k) => setTrack(k as EventTrack)} tabs={TRACKS.map((t) => ({ key: t, label: `${t} (${counts[t]})` }))} />
      {events.length === 0 ? (
        <EmptyState title="No events in this track yet." />
      ) : (
        <div className="space-y-3">
          {events.map((e, i) => (
            <EventRow key={e.id} event={e} isFirst={i === 0} isLast={i === events.length - 1} />
          ))}
        </div>
      )}
    </section>
  );
}

function EventRow({ event: e, isFirst, isLast }: { event: ClubEvent; isFirst: boolean; isLast: boolean }) {
  const { state, updateEvent, deleteEvent, moveEvent } = useGtre();
  const [showAttendees, setShowAttendees] = useState(false);
  const [editing, setEditing] = useState(false);
  const attendees = state.checkIns.filter((c) => c.eventId === e.id);

  if (editing) return <EventEditForm event={e} onDone={() => setEditing(false)} />;

  return (
    <Card>
      <div className="flex flex-wrap items-start gap-4">
        {/* Reorder controls */}
        <div className="flex flex-col gap-1 shrink-0">
          <button
            onClick={() => moveEvent(e.id, "up")}
            disabled={isFirst}
            className="w-7 h-7 rounded border border-border text-navy hover:bg-surface disabled:opacity-30"
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            onClick={() => moveEvent(e.id, "down")}
            disabled={isLast}
            className="w-7 h-7 rounded border border-border text-navy hover:bg-surface disabled:opacity-30"
            aria-label="Move down"
          >
            ↓
          </button>
        </div>

        <div className="text-center w-14 shrink-0">
          <div className="text-[11px] uppercase text-gold-hover font-semibold">
            {new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
          </div>
          <div className="text-2xl text-navy display leading-none">{new Date(e.date + "T12:00:00").getDate()}</div>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <Badge tone="navy">{e.type}</Badge>
            {e.checkInCode && (
              <Badge tone={e.checkInOpen ? "green" : "gray"}>
                Code {e.checkInCode} · {e.checkInOpen ? "open" : "closed"}
              </Badge>
            )}
          </div>
          <div className="font-semibold text-navy">{e.title}</div>
          <div className="text-[13px] text-secondary">{[e.time, e.location].filter(Boolean).join(" · ")}</div>
          {e.description && <p className="text-[13px] text-secondary mt-1">{e.description}</p>}

          <div className="flex flex-wrap items-center gap-4 mt-3 text-[13px]">
            <button onClick={() => setEditing(true)} className="font-semibold text-gold-hover hover:text-navy">
              Edit
            </button>
            {e.checkInCode && (
              <button onClick={() => updateEvent(e.id, { checkInOpen: !e.checkInOpen })} className="font-semibold text-gold-hover hover:text-navy">
                {e.checkInOpen ? "Close check-in" : "Open check-in"}
              </button>
            )}
            <button onClick={() => setShowAttendees((v) => !v)} className="font-semibold text-secondary hover:text-navy">
              {attendees.length} checked in {showAttendees ? "▲" : "▼"}
            </button>
            <ConfirmDelete onConfirm={() => deleteEvent(e.id)} />
          </div>

          {showAttendees && (
            <div className="mt-3 pt-3 border-t border-border">
              {attendees.length === 0 ? (
                <p className="text-[13px] text-secondary">No check-ins yet.</p>
              ) : (
                <ul className="text-[13px] text-secondary space-y-1">
                  {attendees.map((c) => (
                    <li key={c.id}>
                      {c.memberName} · {c.memberEmail} · {new Date(c.checkedInAt).toLocaleString()}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

function EventEditForm({ event: e, onDone }: { event: ClubEvent; onDone: () => void }) {
  const { updateEvent } = useGtre();
  const [form, setForm] = useState({
    title: e.title,
    track: e.track,
    type: e.type,
    date: e.date,
    time: e.time ?? "",
    location: e.location ?? "",
    description: e.description ?? "",
    checkInCode: e.checkInCode ?? "",
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function save(ev: React.FormEvent) {
    ev.preventDefault();
    updateEvent(e.id, {
      title: form.title,
      track: form.track,
      type: form.type,
      date: form.date,
      time: form.time || undefined,
      location: form.location || undefined,
      description: form.description || undefined,
      checkInCode: form.checkInCode.trim().toUpperCase() || undefined,
    });
    onDone();
  }

  return (
    <Card>
      <form onSubmit={save} className="space-y-4">
        <h3 className="font-semibold text-navy">Edit event</h3>
        <div className="grid sm:grid-cols-2 gap-3">
          <Select label="Track" value={form.track} onChange={(v) => set("track", v)} options={TRACKS.map((t) => ({ value: t, label: t }))} />
          <Select label="Type" value={form.type} onChange={(v) => set("type", v)} options={TYPES.map((t) => ({ value: t, label: t }))} />
        </div>
        <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Date" type="date" value={form.date} onChange={(v) => set("date", v)} required />
          <Field label="Time" value={form.time} onChange={(v) => set("time", v)} />
          <Field label="Location" value={form.location} onChange={(v) => set("location", v)} />
        </div>
        <TextArea label="Description" value={form.description} onChange={(v) => set("description", v)} rows={2} />
        <Field label="Check-in code" value={form.checkInCode} onChange={(v) => set("checkInCode", v.toUpperCase())} />
        <div className="flex gap-2">
          <Button type="submit" variant="gold">
            Save changes
          </Button>
          <Button type="button" variant="outline" onClick={onDone}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
