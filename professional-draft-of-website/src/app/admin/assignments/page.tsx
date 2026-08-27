"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Field, Notice, Select, TextArea } from "@/components/ui";
import type { Assignment, Submission } from "@/lib/store/types";

const CATEGORIES: Assignment["category"][] = ["Assignment", "Quiz", "Case Study"];

export default function AdminAssignments() {
  const { state, addAssignment } = useGtre();
  const [form, setForm] = useState({
    title: "",
    description: "",
    category: "Assignment" as Assignment["category"],
    week: "",
    dueDate: "",
    points: "50",
  });
  const [added, setAdded] = useState(false);
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const list = [...state.assignments].sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.dueDate) return;
    addAssignment({
      title: form.title,
      description: form.description,
      category: form.category,
      week: form.week ? Number(form.week) : undefined,
      dueDate: form.dueDate,
      points: Number(form.points) || 0,
      published: true,
    });
    setForm({ title: "", description: "", category: "Assignment", week: "", dueDate: "", points: "50" });
    setAdded(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Assignments &amp; Grading</h2>
        <p className="text-secondary mt-1">Create assignments, quizzes, and case studies, then grade what members submit.</p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">New assignment</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          {added && <Notice tone="success">Assignment created and published.</Notice>}
          <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
          <TextArea label="Description" value={form.description} onChange={(v) => set("description", v)} rows={3} />
          <div className="grid sm:grid-cols-4 gap-3">
            <Select label="Type" value={form.category} onChange={(v) => set("category", v)} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
            <Field label="Week" type="number" value={form.week} onChange={(v) => set("week", v)} placeholder="1" />
            <Field label="Due date" type="date" value={form.dueDate} onChange={(v) => set("dueDate", v)} required />
            <Field label="Points" type="number" value={form.points} onChange={(v) => set("points", v)} />
          </div>
          <Button type="submit">Create assignment</Button>
        </form>
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Assignments ({list.length})</h3>
        {list.length === 0 ? (
          <EmptyState title="No assignments yet." />
        ) : (
          <div className="space-y-4">
            {list.map((a) => (
              <AssignmentAdminRow key={a.id} assignment={a} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AssignmentAdminRow({ assignment: a }: { assignment: Assignment }) {
  const { state, updateAssignment, deleteAssignment } = useGtre();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const subs = state.submissions.filter((s) => s.assignmentId === a.id);
  const ungraded = subs.filter((s) => s.grade == null).length;

  if (editing) return <AssignmentEditForm assignment={a} onDone={() => setEditing(false)} />;

  return (
    <Card>
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge tone="navy">{a.category}</Badge>
            {a.week != null && <Badge tone="gray">Week {a.week}</Badge>}
            <Badge tone="amber">Due {a.dueDate}</Badge>
            <span className="text-[12px] text-secondary">{a.points} pts</span>
            {!a.published && <Badge tone="red">Draft</Badge>}
          </div>
          <h4 className="font-semibold text-navy">{a.title}</h4>
          <p className="text-[14px] text-secondary mt-1">{a.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2 text-[13px]">
          <button onClick={() => setEditing(true)} className="font-semibold text-gold-hover hover:text-navy">
            Edit
          </button>
          <button
            onClick={() => updateAssignment(a.id, { published: !a.published })}
            className="font-semibold text-secondary hover:text-navy"
          >
            {a.published ? "Unpublish" : "Publish"}
          </button>
          <ConfirmDelete onConfirm={() => deleteAssignment(a.id)} />
        </div>
      </div>

      <div className="mt-3 pt-3 border-t border-border">
        <button onClick={() => setOpen((v) => !v)} className="text-[13px] font-semibold text-gold-hover hover:text-navy">
          {subs.length} submission{subs.length === 1 ? "" : "s"}
          {ungraded > 0 && ` · ${ungraded} to grade`} {open ? "▲" : "▼"}
        </button>
        {open && (
          <div className="mt-3 space-y-3">
            {subs.length === 0 ? (
              <p className="text-[13px] text-secondary">No submissions yet.</p>
            ) : (
              subs.map((s) => <GradeRow key={s.id} submission={s} maxPoints={a.points} />)
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

function AssignmentEditForm({ assignment: a, onDone }: { assignment: Assignment; onDone: () => void }) {
  const { updateAssignment } = useGtre();
  const [form, setForm] = useState({
    title: a.title,
    description: a.description,
    category: a.category,
    week: a.week != null ? String(a.week) : "",
    dueDate: a.dueDate,
    points: String(a.points),
  });
  const set = (k: keyof typeof form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim() || !form.dueDate) return;
    updateAssignment(a.id, {
      title: form.title,
      description: form.description,
      category: form.category,
      week: form.week ? Number(form.week) : undefined,
      dueDate: form.dueDate,
      points: Number(form.points) || 0,
    });
    onDone();
  }

  return (
    <Card>
      <form onSubmit={save} className="space-y-4">
        <div className="text-[13px] font-semibold text-navy">Edit assignment</div>
        <Field label="Title" value={form.title} onChange={(v) => set("title", v)} required />
        <TextArea label="Description" value={form.description} onChange={(v) => set("description", v)} rows={3} />
        <div className="grid sm:grid-cols-4 gap-3">
          <Select label="Type" value={form.category} onChange={(v) => set("category", v as Assignment["category"])} options={CATEGORIES.map((c) => ({ value: c, label: c }))} />
          <Field label="Week" type="number" value={form.week} onChange={(v) => set("week", v)} placeholder="1" />
          <Field label="Due date" type="date" value={form.dueDate} onChange={(v) => set("dueDate", v)} required />
          <Field label="Points" type="number" value={form.points} onChange={(v) => set("points", v)} />
        </div>
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

function GradeRow({ submission: s, maxPoints }: { submission: Submission; maxPoints: number }) {
  const { gradeSubmission } = useGtre();
  const [grade, setGrade] = useState(s.grade?.toString() ?? "");
  const [feedback, setFeedback] = useState(s.feedback ?? "");
  const [saved, setSaved] = useState(false);

  function save(e: React.FormEvent) {
    e.preventDefault();
    gradeSubmission(s.id, Number(grade), feedback);
    setSaved(true);
  }

  return (
    <div className="bg-surface rounded-lg p-4">
      <div className="flex items-center gap-2 mb-1">
        <span className="font-semibold text-navy text-sm">{s.memberName}</span>
        <span className="text-[12px] text-secondary">{new Date(s.submittedAt).toLocaleDateString()}</span>
        {s.grade != null && <Badge tone="green">Graded {s.grade}/{maxPoints}</Badge>}
      </div>
      <div className="text-[13px] text-text break-words mb-3">
        <span className="font-semibold">{s.type}:</span>{" "}
        {s.type === "link" ? (
          <a href={s.content} target="_blank" rel="noreferrer" className="text-gold-hover hover:text-navy underline">
            {s.content}
          </a>
        ) : (
          s.content
        )}
        {s.comments && <div className="text-secondary mt-1">Member note: {s.comments}</div>}
      </div>
      <form onSubmit={save} className="flex flex-wrap items-end gap-3">
        <label className="block">
          <span className="text-[11px] font-semibold text-navy uppercase tracking-wide">Grade (/{maxPoints})</span>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className="mt-1 w-24 px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-navy"
            required
          />
        </label>
        <label className="block flex-1 min-w-[200px]">
          <span className="text-[11px] font-semibold text-navy uppercase tracking-wide">Feedback</span>
          <input
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="mt-1 w-full px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-navy"
          />
        </label>
        <Button type="submit" variant="gold">
          {s.grade != null ? "Update" : "Save grade"}
        </Button>
        {saved && <span className="text-[13px] text-green-700 font-semibold">Saved</span>}
      </form>
    </div>
  );
}
