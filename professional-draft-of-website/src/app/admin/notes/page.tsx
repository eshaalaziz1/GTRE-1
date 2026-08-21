"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Card, ConfirmDelete, EmptyState, Field, Notice, TextArea } from "@/components/ui";

// Private exec meeting notes. Only admins can reach this route (layout guard).
export default function AdminNotes() {
  const { state, addMeetingNote, deleteMeetingNote } = useGtre();
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [body, setBody] = useState("");
  const [saved, setSaved] = useState(false);

  const list = [...state.meetingNotes].sort((a, b) => b.date.localeCompare(a.date));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !date) return;
    addMeetingNote({ title, date, body });
    setTitle("");
    setDate("");
    setBody("");
    setSaved(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Meeting Notes</h2>
        <p className="text-secondary mt-1">Private exec notes. Only admins can see this page.</p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">New note</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {saved && <Notice tone="success">Saved.</Notice>}
          <div className="grid sm:grid-cols-[1fr_200px] gap-3">
            <Field label="Title" value={title} onChange={setTitle} required />
            <Field label="Date" type="date" value={date} onChange={setDate} required />
          </div>
          <TextArea label="Notes" value={body} onChange={setBody} rows={5} />
          <Button type="submit">Save note</Button>
        </form>
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Notes ({list.length})</h3>
        {list.length === 0 ? (
          <EmptyState title="No notes yet." />
        ) : (
          <div className="space-y-3">
            {list.map((n) => (
              <Card key={n.id}>
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="text-[12px] text-secondary">{new Date(n.date + "T12:00:00").toLocaleDateString()}</div>
                    <h4 className="font-semibold text-navy">{n.title}</h4>
                    <p className="text-[14px] text-secondary mt-1 whitespace-pre-wrap">{n.body}</p>
                    <div className="text-[12px] text-secondary mt-2">by {n.authorName}</div>
                  </div>
                  <ConfirmDelete onConfirm={() => deleteMeetingNote(n.id)} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
