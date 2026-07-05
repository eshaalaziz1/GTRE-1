"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Tabs, TextArea } from "@/components/ui";
import type { Question } from "@/lib/store/types";

export default function AdminQuestions() {
  const { state } = useGtre();
  const [filter, setFilter] = useState<"open" | "answered" | "all">("open");

  const open = state.questions.filter((q) => q.status === "open");
  const answered = state.questions.filter((q) => q.status === "answered");
  const list = (filter === "open" ? open : filter === "answered" ? answered : state.questions).sort(
    (a, b) => b.createdAt.localeCompare(a.createdAt),
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="display text-3xl text-navy">Questions</h2>
        <p className="text-secondary mt-1">Answer member questions. Answered questions become a shared FAQ in the portal.</p>
      </div>

      <Tabs
        active={filter}
        onChange={(k) => setFilter(k as typeof filter)}
        tabs={[
          { key: "open", label: `Open (${open.length})` },
          { key: "answered", label: `Answered (${answered.length})` },
          { key: "all", label: `All (${state.questions.length})` },
        ]}
      />

      {list.length === 0 ? (
        <EmptyState title="Nothing here." body="No questions match this filter." />
      ) : (
        <div className="space-y-4">
          {list.map((q) => (
            <QuestionRow key={q.id} question={q} />
          ))}
        </div>
      )}
    </div>
  );
}

function QuestionRow({ question: q }: { question: Question }) {
  const { answerQuestion, deleteQuestion } = useGtre();
  const [answer, setAnswer] = useState(q.answer ?? "");
  const [open, setOpen] = useState(q.status === "open");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!answer.trim()) return;
    answerQuestion(q.id, answer);
    setOpen(false);
  }

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 mb-1">
            <Badge tone={q.status === "answered" ? "green" : "amber"}>{q.status}</Badge>
            <span className="text-[13px] text-secondary">from {q.memberName}</span>
            <span className="text-[12px] text-secondary ml-auto">{new Date(q.createdAt).toLocaleDateString()}</span>
          </div>
          <h4 className="font-semibold text-navy">{q.subject}</h4>
          <p className="text-[14px] text-secondary mt-1">{q.body}</p>
        </div>
        <ConfirmDelete onConfirm={() => deleteQuestion(q.id)} />
      </div>

      {q.answer && !open && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="text-[12px] font-semibold text-navy uppercase tracking-wide">Your answer</div>
          <p className="text-[14px] text-text mt-1">{q.answer}</p>
          <button onClick={() => setOpen(true)} className="text-[13px] font-semibold text-gold-hover hover:text-navy mt-2">
            Edit answer
          </button>
        </div>
      )}

      {open && (
        <form onSubmit={submit} className="mt-3 pt-3 border-t border-border space-y-3">
          <TextArea label="Answer" value={answer} onChange={setAnswer} rows={3} required />
          <Button type="submit" variant="gold">
            {q.status === "answered" ? "Update answer" : "Post answer"}
          </Button>
        </form>
      )}
    </Card>
  );
}
