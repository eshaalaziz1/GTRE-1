"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, EmptyState, Field, Notice } from "@/components/ui";

export default function CheckInPage() {
  const { state, currentAccount, checkIn } = useGtre();
  const me = currentAccount!;
  const [code, setCode] = useState("");
  const [result, setResult] = useState<{ ok: boolean; message: string } | null>(null);

  const myCheckIns = state.checkIns
    .filter((c) => c.accountId === me.id)
    .sort((a, b) => b.checkedInAt.localeCompare(a.checkedInAt));

  const openEvents = state.events.filter((e) => e.checkInOpen);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const res = await checkIn(code);
    setResult(res);
    if (res.ok) setCode("");
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Check-In</h2>
        <p className="text-secondary mt-1">
          Enter the code an officer shares at a meeting or event to record your attendance.
        </p>
      </div>

      <Card className="max-w-md">
        <form onSubmit={onSubmit} className="space-y-4">
          {result && <Notice tone={result.ok ? "success" : "error"}>{result.message}</Notice>}
          <Field
            label="Event code"
            value={code}
            onChange={(v) => setCode(v.toUpperCase())}
            placeholder="e.g. GTRE27"
            required
          />
          <Button type="submit" className="w-full">
            Check in
          </Button>
        </form>
        {openEvents.length > 0 && (
          <p className="text-[12px] text-secondary mt-4">
            {openEvents.length} event{openEvents.length > 1 ? "s" : ""} currently open for check-in.
          </p>
        )}
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">
          Your attendance ({myCheckIns.length})
        </h3>
        {myCheckIns.length === 0 ? (
          <EmptyState title="No check-ins yet." body="Your attendance history will appear here." />
        ) : (
          <div className="space-y-3">
            {myCheckIns.map((c) => (
              <div key={c.id} className="flex items-center gap-3 bg-white border border-border rounded-xl p-4">
                <Badge tone="green">Attended</Badge>
                <div className="min-w-0">
                  <div className="font-semibold text-navy truncate">{c.eventTitle}</div>
                  <div className="text-[13px] text-secondary">
                    {new Date(c.checkedInAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
