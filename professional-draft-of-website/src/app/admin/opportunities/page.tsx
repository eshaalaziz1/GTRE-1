"use client";

import { useMemo, useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Field, Notice, Select, TextArea } from "@/components/ui";
import type { Opportunity } from "@/lib/store/types";

const JOB_TYPES: Opportunity["jobType"][] = ["Internship", "Full-Time", "Co-op"];
const JOB_TYPE_OPTIONS = JOB_TYPES.map((t) => ({ value: t, label: t }));

const EMPTY_FORM = {
  title: "",
  company: "",
  location: "",
  jobType: "Internship" as Opportunity["jobType"],
  sector: "",
  compensation: "",
  deadline: "",
  applicationLink: "",
  postedBy: "",
  isAlumPosted: false,
  description: "",
};

export default function AdminOpportunities() {
  const { state, addOpportunity } = useGtre();
  const [form, setForm] = useState(EMPTY_FORM);
  const [added, setAdded] = useState(false);
  const [filter, setFilter] = useState<"All" | Opportunity["jobType"]>("All");
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  const list = useMemo(
    () =>
      [...state.opportunities]
        .filter((o) => filter === "All" || o.jobType === filter)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [state.opportunities, filter],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { All: state.opportunities.length };
    for (const t of JOB_TYPES) c[t] = state.opportunities.filter((o) => o.jobType === t).length;
    return c;
  }, [state.opportunities]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.applicationLink.trim()) return;
    addOpportunity({
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      jobType: form.jobType,
      sector: form.sector.trim(),
      compensation: form.compensation.trim(),
      deadline: form.deadline,
      applicationLink: form.applicationLink.trim(),
      postedBy: form.postedBy.trim() || "GTRE",
      isAlumPosted: form.isAlumPosted,
      description: form.description.trim(),
    });
    setForm(EMPTY_FORM);
    setAdded(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Opportunities</h2>
        <p className="text-secondary mt-1">
          Post internships, co-ops, and full-time analyst roles for the members-only job board.
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">Post a role</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {added && <Notice tone="success">Posted.</Notice>}
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
            <Field label="Company" value={form.company} onChange={(v) => set("company", v)} required />
          </div>
          <div className="grid sm:grid-cols-[1fr_200px] gap-3">
            <Field label="Location" value={form.location} onChange={(v) => set("location", v)} placeholder="Atlanta, GA" />
            <Select
              label="Job type"
              value={form.jobType}
              onChange={(v) => set("jobType", v as Opportunity["jobType"])}
              options={JOB_TYPE_OPTIONS}
            />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Sector" value={form.sector} onChange={(v) => set("sector", v)} placeholder="Multifamily, Office, ..." />
            <Field label="Compensation" value={form.compensation} onChange={(v) => set("compensation", v)} placeholder="$25/hr, $75K, ..." />
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Application deadline" type="date" value={form.deadline} onChange={(v) => set("deadline", v)} />
            <Field label="Posted by" value={form.postedBy} onChange={(v) => set("postedBy", v)} placeholder="GTRE" />
          </div>
          <Field
            label="Application link"
            type="url"
            value={form.applicationLink}
            onChange={(v) => set("applicationLink", v)}
            placeholder="https://..."
            required
          />
          <TextArea
            label="Description"
            value={form.description}
            onChange={(v) => set("description", v)}
            placeholder="Role details, requirements, how to apply..."
          />
          <label className="flex items-center gap-2 text-[13px] font-semibold text-secondary cursor-pointer">
            <input
              type="checkbox"
              checked={form.isAlumPosted}
              onChange={(e) => set("isAlumPosted", e.target.checked)}
              className="accent-navy w-4 h-4"
            />
            Posted by an alum
          </label>
          <Button type="submit">Post role</Button>
        </form>
      </Card>

      <section>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <h3 className="text-sm font-semibold text-navy uppercase tracking-wide">
            Postings ({state.opportunities.length})
          </h3>
          <div className="flex flex-wrap gap-2">
            {(["All", ...JOB_TYPES] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`px-3.5 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                  filter === t
                    ? "bg-navy text-white border-navy"
                    : "border-border text-secondary hover:border-navy hover:text-navy"
                }`}
              >
                {t} ({counts[t] ?? 0})
              </button>
            ))}
          </div>
        </div>
        {list.length === 0 ? (
          <EmptyState title="No postings yet." body="Roles posted here show up on the members' Opportunities page." />
        ) : (
          <div className="space-y-3">
            {list.map((o) => (
              <OpportunityRow key={o.id} o={o} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function OpportunityRow({ o }: { o: Opportunity }) {
  const { deleteOpportunity } = useGtre();
  const [editing, setEditing] = useState(false);

  if (editing) return <OpportunityEditForm o={o} onDone={() => setEditing(false)} />;

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge tone="gold">{o.jobType}</Badge>
            {o.sector && <Badge tone="gray">{o.sector}</Badge>}
            {o.isAlumPosted && <Badge tone="navy">Alumni posted</Badge>}
          </div>
          <div className="font-semibold text-navy">{o.title}</div>
          <div className="text-[13px] text-secondary mt-0.5">
            {o.company}
            {o.location ? ` · ${o.location}` : ""}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[13px] text-secondary mt-2">
            {o.compensation && <span>{o.compensation}</span>}
            {o.deadline && <span>Apply by {o.deadline}</span>}
            {o.postedBy && <span>Posted by {o.postedBy}</span>}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => setEditing(true)} className="text-[13px] font-semibold text-gold-hover hover:text-navy">
            Edit
          </button>
          <ConfirmDelete onConfirm={() => deleteOpportunity(o.id)} />
        </div>
      </div>
    </Card>
  );
}

function OpportunityEditForm({ o, onDone }: { o: Opportunity; onDone: () => void }) {
  const { updateOpportunity } = useGtre();
  const [form, setForm] = useState({
    title: o.title,
    company: o.company,
    location: o.location,
    jobType: o.jobType,
    sector: o.sector,
    compensation: o.compensation,
    deadline: o.deadline,
    applicationLink: o.applicationLink,
    postedBy: o.postedBy,
    isAlumPosted: o.isAlumPosted,
    description: o.description,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.applicationLink.trim()) return;
    updateOpportunity(o.id, {
      title: form.title.trim(),
      company: form.company.trim(),
      location: form.location.trim(),
      jobType: form.jobType,
      sector: form.sector.trim(),
      compensation: form.compensation.trim(),
      deadline: form.deadline,
      applicationLink: form.applicationLink.trim(),
      postedBy: form.postedBy.trim(),
      isAlumPosted: form.isAlumPosted,
      description: form.description.trim(),
    });
    onDone();
  }

  return (
    <Card>
      <form onSubmit={save} className="space-y-4">
        <div className="text-[13px] font-semibold text-navy">Edit posting</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
          <Field label="Company" value={form.company} onChange={(v) => set("company", v)} required />
        </div>
        <div className="grid sm:grid-cols-[1fr_200px] gap-3">
          <Field label="Location" value={form.location} onChange={(v) => set("location", v)} />
          <Select
            label="Job type"
            value={form.jobType}
            onChange={(v) => set("jobType", v as Opportunity["jobType"])}
            options={JOB_TYPE_OPTIONS}
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Sector" value={form.sector} onChange={(v) => set("sector", v)} />
          <Field label="Compensation" value={form.compensation} onChange={(v) => set("compensation", v)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Application deadline" type="date" value={form.deadline} onChange={(v) => set("deadline", v)} />
          <Field label="Posted by" value={form.postedBy} onChange={(v) => set("postedBy", v)} />
        </div>
        <Field label="Application link" type="url" value={form.applicationLink} onChange={(v) => set("applicationLink", v)} required />
        <TextArea label="Description" value={form.description} onChange={(v) => set("description", v)} />
        <label className="flex items-center gap-2 text-[13px] font-semibold text-secondary cursor-pointer">
          <input
            type="checkbox"
            checked={form.isAlumPosted}
            onChange={(e) => set("isAlumPosted", e.target.checked)}
            className="accent-navy w-4 h-4"
          />
          Posted by an alum
        </label>
        <div className="flex gap-2">
          <Button type="submit">Save changes</Button>
          <button type="button" onClick={onDone} className="px-4 py-2 text-[13px] font-semibold text-secondary hover:text-navy">
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}
