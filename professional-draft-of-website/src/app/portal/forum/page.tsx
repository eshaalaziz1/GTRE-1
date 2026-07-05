"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, EmptyState, Field, Notice, TextArea } from "@/components/ui";

// Q&A: members submit questions to the exec team, who answer them from Admin.
export default function ForumPage() {
  const { state, currentAccount, askQuestion } = useGtre();
  const me = currentAccount!;
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  // A member sees their own questions plus every answered question (shared FAQ).
  const visible = state.questions
    .filter((q) => q.accountId === me.id || q.status === "answered")
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!subject.trim() || !body.trim()) return;
    askQuestion(subject, body);
    setSubject("");
    setBody("");
    setSent(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Questions &amp; Answers</h2>
        <p className="text-secondary mt-1">
          Ask the exec team anything about the club or the Analyst Program. Answered questions are shared here.
        </p>
      </div>

      <Card className="max-w-2xl">
        <form onSubmit={onSubmit} className="space-y-4">
          {sent && <Notice tone="success">Sent. An officer will reply and you&apos;ll see the answer here.</Notice>}
          <Field label="Subject" value={subject} onChange={setSubject} placeholder="Short summary" required />
          <TextArea label="Your question" value={body} onChange={setBody} rows={4} required />
          <Button type="submit">Ask question</Button>
        </form>
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Questions</h3>
        {visible.length === 0 ? (
          <EmptyState title="No questions yet." body="Be the first to ask." />
        ) : (
          <div className="space-y-4">
            {visible.map((q) => (
              <Card key={q.id}>
                <div className="flex items-center gap-2 mb-1">
                  <Badge tone={q.status === "answered" ? "green" : "amber"}>{q.status}</Badge>
                  {q.accountId === me.id && <Badge tone="navy">You</Badge>}
                  <span className="text-[12px] text-secondary ml-auto">
                    {new Date(q.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h4 className="font-semibold text-navy">{q.subject}</h4>
                <p className="text-[15px] text-secondary mt-1">{q.body}</p>
                {q.answer && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <div className="text-[12px] font-semibold text-navy uppercase tracking-wide">
                      Answer{q.answeredBy ? ` — ${q.answeredBy}` : ""}
                    </div>
                    <p className="text-[15px] text-text mt-1 leading-relaxed">{q.answer}</p>
                  </div>
                )}
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
