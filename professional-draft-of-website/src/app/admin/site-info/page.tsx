"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Card, Field, Notice, TextArea } from "@/components/ui";

// Editable site information so future exec teams change copy, the syllabus
// embed, and the calendar embed without touching code.
export default function AdminSiteInfo() {
  const { state, updateSiteInfo, resetDemo } = useGtre();
  const [form, setForm] = useState(state.siteInfo);
  const [saved, setSaved] = useState(false);
  const set = (k: keyof typeof form, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  };

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateSiteInfo(form);
    setSaved(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Site Info</h2>
        <p className="text-secondary mt-1">
          Edit club details, the Analyst Program intro, and the Syllabus / Calendar embeds. Changes show across the site.
        </p>
      </div>

      <Card>
        <form onSubmit={onSubmit} className="space-y-5">
          {saved && <Notice tone="success">Saved. The site now reflects these values.</Notice>}

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Meeting time" value={form.meetingTime} onChange={(v) => set("meetingTime", v)} />
            <Field label="Meeting location" value={form.meetingLocation} onChange={(v) => set("meetingLocation", v)} />
          </div>
          <Field label="Contact email" type="email" value={form.contactEmail} onChange={(v) => set("contactEmail", v)} />

          <TextArea
            label="Analyst Program intro"
            value={form.analystProgramIntro}
            onChange={(v) => set("analystProgramIntro", v)}
            rows={4}
          />

          <div className="pt-2 border-t border-border">
            <h3 className="font-semibold text-navy mt-4 mb-1">Syllabus embed</h3>
            <p className="text-[13px] text-secondary mb-3">
              Paste a Google Docs/Drive <strong>preview/embed URL</strong> (ending in <code>/preview</code>) to show the
              syllabus view-only in the Analyst Program → Syllabus tab. Leave blank to keep the placeholder.
            </p>
            <Field
              label="Syllabus embed URL"
              type="url"
              value={form.syllabusEmbedUrl}
              onChange={(v) => set("syllabusEmbedUrl", v)}
              placeholder="https://docs.google.com/document/d/…/preview"
            />
          </div>

          <div className="pt-2 border-t border-border">
            <h3 className="font-semibold text-navy mt-4 mb-1">Calendar embed (optional)</h3>
            <p className="text-[13px] text-secondary mb-3">
              Paste a Google Calendar <strong>embed URL</strong> to show it on the Calendar page instead of the built-in
              admin-managed calendar. Leave blank to use the in-app calendar built from your events.
            </p>
            <Field
              label="Google Calendar embed URL"
              type="url"
              value={form.googleCalendarEmbedUrl}
              onChange={(v) => set("googleCalendarEmbedUrl", v)}
              placeholder="https://calendar.google.com/calendar/embed?src=…"
            />
          </div>

          <Button type="submit">Save site info</Button>
        </form>
      </Card>

      <Card>
        <h3 className="font-semibold text-navy mb-1">Reset demo data</h3>
        <p className="text-[13px] text-secondary mb-3">
          This prototype stores everything in your browser. Reset restores the original seed data (accounts, events,
          assignments, etc.). This does nothing to a real backend once Supabase is wired.
        </p>
        <Button variant="danger" onClick={resetDemo}>
          Reset to seed data
        </Button>
      </Card>
    </div>
  );
}
