"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Field, Notice, Select } from "@/components/ui";
import type { Resource } from "@/lib/store/types";

const CATEGORIES: Resource["category"][] = ["Slides", "Tool", "Document", "Case Study", "Link"];

export default function AdminResources() {
  const { state, addResource, deleteResource } = useGtre();
  const [form, setForm] = useState({ title: "", description: "", url: "", category: "Slides" as Resource["category"] });
  const [added, setAdded] = useState(false);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const list = [...state.resources].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.url.trim()) return;
    addResource({ title: form.title, description: form.description || undefined, url: form.url, category: form.category });
    setForm({ title: "", description: "", url: "", category: "Slides" });
    setAdded(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Materials &amp; Documents</h2>
        <p className="text-secondary mt-1">Post slides, tools, templates, case-study packets, and links for members.</p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">Add material</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {added && <Notice tone="success">Added.</Notice>}
          <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
          <Field label="Description" value={form.description} onChange={(v) => set("description", v)} />
          <div className="grid sm:grid-cols-[1fr_200px] gap-3">
            <Field label="URL" type="url" value={form.url} onChange={(v) => set("url", v)} placeholder="https://..." required />
            <Select label="Category" value={form.category} onChange={(v) => set("category", v)} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
          </div>
          <Button type="submit">Add material</Button>
        </form>
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Materials ({list.length})</h3>
        {list.length === 0 ? (
          <EmptyState title="No materials yet." />
        ) : (
          <div className="space-y-3">
            {list.map((r) => (
              <Card key={r.id}>
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge tone="gold">{r.category}</Badge>
                    </div>
                    <div className="font-semibold text-navy">{r.title}</div>
                    {r.description && <p className="text-[13px] text-secondary mt-0.5">{r.description}</p>}
                    <a href={r.url} target="_blank" rel="noreferrer" className="text-[13px] text-gold-hover hover:text-navy break-all">
                      {r.url}
                    </a>
                  </div>
                  <ConfirmDelete onConfirm={() => deleteResource(r.id)} />
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
