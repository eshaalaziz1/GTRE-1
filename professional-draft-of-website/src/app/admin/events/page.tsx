"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Field, Notice, Select, TextArea } from "@/components/ui";
import type { ClubEvent } from "@/lib/store/types";

const TYPES: ClubEvent["type"][] = ["Meeting", "Event", "Workshop", "Deadline", "Social", "Case Study"];

export default function AdminEvents() {
  const { state, addEvent } = useGtre();
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

  const events = [...state.events].sort((a, b) => a.date.localeCompare(b.date));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    addEvent({
      title: form.title,
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
          Add meetings, events, and deadlines (they feed the public calendar), set check-in codes, and view attendance.
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">New event</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {added && <Notice tone="success">Event added to the calendar.</Notice>}
          <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
          <div className="grid sm:grid-cols-3 gap-3">
            <Select label="Type" value={form.type} onChange={(v) => set("type", v)} options={TYPES.map((t) => ({ value: t, label: t }))} />
            <Field label="Date" type="date" value={form.date} onChange={(v) => set("date", v)} required />
            <Field label="Time" value={form.time} onChange={(v) => set("time", v)} placeholder="6:00 PM" />
          </div>
          <Field label="Location" value={form.location} onChange={(v) => set("location", v)} placeholder="Scheller 200" />
          <TextArea label="Description" value={form.description} onChange={(v) => set("description", v)} rows={2} />
          <Field
            label="Check-in code (optional)"
            value={form.checkInCode}
            onChange={(v) => set("checkInCode", v.toUpperCase())}
            placeholder="e.g. GTRE27"
          />
          <Button type="submit">Add event</Button>
        </form>
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Events ({events.length})</h3>
        {events.length === 0 ? (
          <EmptyState title="No events yet." />
        ) : (
          <div className="space-y-3">
            {events.map((e) => (
              <EventRow key={e.id} event={e} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function EventRow({ event: e }: { event: ClubEvent }) {
  const { state, updateEvent, deleteEvent } = useGtre();
  const [showAttendees, setShowAttendees] = useState(false);
  const attendees = state.checkIns.filter((c) => c.eventId === e.id);

  return (
    <Card>
      <div className="flex flex-wrap items-start gap-4">
        <div className="text-center w-14 shrink-0">
          <div className="text-[11px] uppercase text-gold-hover font-semibold">
            {new Date(e.date + "T12:00:00").toLocaleDateString("en-US", { month: "short" })}
          </div>
          <div className="text-2xl text-navy display leading-none">{new Date(e.date + "T12:00:00").getDate()}</div>
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
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
            {e.checkInCode && (
              <button
                onClick={() => updateEvent(e.id, { checkInOpen: !e.checkInOpen })}
                className="font-semibold text-gold-hover hover:text-navy"
              >
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
