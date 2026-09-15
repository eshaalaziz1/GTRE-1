"use client";

import { useMemo, useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, EmptyState, Notice, Select, TextArea } from "@/components/ui";
import {
  ALL_SUBMISSION_FORMATS,
  SUBMISSION_FORMAT_LABELS,
  type Assignment,
  type Submission,
  type SubmissionFormat,
} from "@/lib/store/types";

const ACCEPT_BY_FORMAT: Record<SubmissionFormat, string> = {
  link: "",
  text: "",
  pdf: ".pdf",
  doc: ".doc",
  docx: ".docx",
};

export default function AssignmentsPage() {
  const { state, currentAccount } = useGtre();
  const me = currentAccount!;
  const published = state.assignments
    .filter((a) => a.published)
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate));

  const mySub = (id: string) =>
    state.submissions.find((s) => s.assignmentId === id && s.accountId === me.id);

  const due = published.filter((a) => !mySub(a.id));
  const submitted = published.filter((a) => mySub(a.id));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Assignments</h2>
        <p className="text-secondary mt-1">
          Mentorship Program work. Submit a link, typed response, or file reference before the due date.
        </p>
      </div>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">
          Due ({due.length})
        </h3>
        {due.length === 0 ? (
          <EmptyState title="You're all caught up." body="No outstanding assignments right now." />
        ) : (
          <div className="space-y-4">
            {due.map((a) => (
              <AssignmentRow key={a.id} assignment={a} submission={undefined} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">
          Submitted ({submitted.length})
        </h3>
        {submitted.length === 0 ? (
          <EmptyState title="Nothing submitted yet." />
        ) : (
          <div className="space-y-4">
            {submitted.map((a) => (
              <AssignmentRow key={a.id} assignment={a} submission={mySub(a.id)} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function AssignmentRow({
  assignment,
  submission,
}: {
  assignment: Assignment;
  submission?: Submission;
}) {
  const { submitAssignment } = useGtre();
  const [open, setOpen] = useState(false);
  const allowedFormats = useMemo(
    () => (assignment.allowedFormats?.length ? assignment.allowedFormats : ALL_SUBMISSION_FORMATS),
    [assignment.allowedFormats],
  );
  const [type, setType] = useState<SubmissionFormat>(allowedFormats[0]);
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [comments, setComments] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const isFileType = type === "pdf" || type === "doc" || type === "docx";

  const overdue = !submission && assignment.dueDate < "2026-07-05";

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (isFileType ? !file : !content.trim()) return;
    setBusy(true);
    const res = await submitAssignment({ assignmentId: assignment.id, type, content, file: file ?? undefined, comments });
    setBusy(false);
    if (!res.ok) return setError(res.error || "Couldn't submit. Please try again.");
    setSaved(true);
    setOpen(false);
    setContent("");
    setFile(null);
    setComments("");
  }

  return (
    <Card>
      <div className="flex flex-wrap items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge tone="navy">{assignment.category}</Badge>
            {assignment.week != null && <Badge tone="gray">Week {assignment.week}</Badge>}
            <Badge tone={overdue ? "red" : "amber"}>Due {assignment.dueDate}</Badge>
            <span className="text-[12px] text-secondary">{assignment.points} pts</span>
          </div>
          <h4 className="text-lg font-semibold text-navy">{assignment.title}</h4>
          <p className="text-[15px] text-secondary mt-1 leading-relaxed">{assignment.description}</p>
        </div>
        {!submission && (
          <Button onClick={() => setOpen((v) => !v)} variant={open ? "outline" : "solid"}>
            {open ? "Cancel" : "Submit"}
          </Button>
        )}
      </div>

      {submission && (
        <div className="mt-4 pt-4 border-t border-border">
          {saved && <Notice tone="success">Submission saved.</Notice>}
          <div className="flex items-center gap-2 mt-2">
            <Badge tone="green">Submitted</Badge>
            <span className="text-[13px] text-secondary">
              {new Date(submission.submittedAt).toLocaleString()}
            </span>
          </div>
          <div className="text-[14px] text-text mt-2 break-words">
            <span className="font-semibold text-navy">{SUBMISSION_FORMAT_LABELS[submission.type]}:</span>{" "}
            {submission.fileUrl ? (
              <a href={submission.fileUrl} className="text-gold-hover hover:text-navy underline" target="_blank" rel="noreferrer">
                {submission.content}
              </a>
            ) : submission.type === "link" ? (
              <a href={submission.content} className="text-gold-hover hover:text-navy underline" target="_blank" rel="noreferrer">
                {submission.content}
              </a>
            ) : (
              submission.content
            )}
          </div>
          {submission.grade != null ? (
            <div className="mt-3 rounded-lg bg-green-50 border border-green-200 p-3">
              <div className="font-semibold text-green-800">
                Grade: {submission.grade} / {assignment.points}
              </div>
              {submission.feedback && (
                <p className="text-[14px] text-green-900 mt-1">{submission.feedback}</p>
              )}
              <div className="text-[12px] text-green-700 mt-1">Graded by {submission.gradedBy}</div>
            </div>
          ) : (
            <div className="text-[13px] text-secondary mt-2">Awaiting grade.</div>
          )}
        </div>
      )}

      {open && !submission && (
        <form onSubmit={onSubmit} className="mt-4 pt-4 border-t border-border space-y-4">
          {error && <Notice tone="error">{error}</Notice>}
          <div className="grid sm:grid-cols-2 gap-3">
            <Select
              label="Submission type"
              value={type}
              onChange={(v) => {
                setType(v as SubmissionFormat);
                setContent("");
                setFile(null);
              }}
              options={allowedFormats.map((f) => ({ value: f, label: SUBMISSION_FORMAT_LABELS[f] }))}
            />
          </div>
          {isFileType ? (
            <label className="block">
              <span className="text-[12px] font-semibold text-navy uppercase tracking-wide">
                {SUBMISSION_FORMAT_LABELS[type]}
              </span>
              <input
                type="file"
                accept={ACCEPT_BY_FORMAT[type]}
                onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                required
                className="mt-1.5 w-full text-sm file:mr-3 file:px-3.5 file:py-2 file:rounded-lg file:border-0 file:bg-navy file:text-white file:text-sm file:font-semibold file:cursor-pointer"
              />
            </label>
          ) : (
            <TextArea
              label={type === "link" ? "Paste your link" : "Your response"}
              value={content}
              onChange={setContent}
              placeholder={type === "link" ? "https://..." : ""}
              rows={type === "text" ? 5 : 2}
              required
            />
          )}
          <TextArea label="Comments (optional)" value={comments} onChange={setComments} rows={2} />
          <Button type="submit" variant="gold" disabled={busy}>
            {busy ? "Submitting…" : "Submit assignment"}
          </Button>
        </form>
      )}
    </Card>
  );
}
