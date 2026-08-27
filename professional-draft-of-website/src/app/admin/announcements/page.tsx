"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Field, Notice, Select, TextArea } from "@/components/ui";
import type { Announcement } from "@/lib/store/types";

const CATEGORIES: Announcement["category"][] = ["General", "Event", "Meeting", "Deadline", "Mentorship Program"];

export default function AdminAnnouncements() {
  const { state, addAnnouncement, deleteAnnouncement, updateAnnouncement } = useGtre();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState<Announcement["category"]>("General");
  const [pinned, setPinned] = useState(false);
  const [posted, setPosted] = useState(false);

  const list = [...state.announcements].sort((a, b) => {
    if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
    return b.createdAt.localeCompare(a.createdAt);
  });

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    addAnnouncement({ title, body, category, pinned });
    setTitle("");
    setBody("");
    setPinned(false);
    setCategory("General");
    setPosted(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Announcements</h2>
        <p className="text-secondary mt-1">Post updates about events, meetings, and deadlines. They appear on member dashboards.</p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">New announcement</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {posted && <Notice tone="success">Posted.</Notice>}
          <Field label="Title" value={title} onChange={setTitle} required />
          <TextArea label="Body" value={body} onChange={setBody} rows={4} required />
          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              label="Category"
              value={category}
              onChange={(v) => setCategory(v as Announcement["category"])}
              options={CATEGORIES.map((c) => ({ value: c, label: c }))}
            />
            <label className="flex items-end gap-2 pb-2.5">
              <input type="checkbox" checked={pinned} onChange={(e) => setPinned(e.target.checked)} className="w-4 h-4" />
              <span className="text-sm text-navy font-semibold">Pin to top</span>
            </label>
          </div>
          <Button type="submit">Post announcement</Button>
        </form>
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Posted ({list.length})</h3>
        {list.length === 0 ? (
          <EmptyState title="No announcements yet." />
        ) : (
          <div className="space-y-3">
            {list.map((a) => (
              <Card key={a.id}>
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {a.pinned && <Badge tone="gold">Pinned</Badge>}
                      <Badge tone="navy">{a.category}</Badge>
                      <span className="text-[12px] text-secondary">{new Date(a.createdAt).toLocaleDateString()}</span>
                    </div>
                    <h4 className="font-semibold text-navy">{a.title}</h4>
                    <p className="text-[14px] text-secondary mt-1">{a.body}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2 text-[13px]">
                    <button
                      onClick={() => updateAnnouncement(a.id, { pinned: !a.pinned })}
                      className="font-semibold text-secondary hover:text-navy"
                    >
                      {a.pinned ? "Unpin" : "Pin"}
                    </button>
                    <ConfirmDelete onConfirm={() => deleteAnnouncement(a.id)} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
