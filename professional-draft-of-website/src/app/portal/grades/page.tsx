"use client";

import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Card, EmptyState } from "@/components/ui";

export default function GradesPage() {
  const { state, currentAccount } = useGtre();
  const me = currentAccount!;

  const rows = state.submissions
    .filter((s) => s.accountId === me.id)
    .map((s) => ({ sub: s, asg: state.assignments.find((a) => a.id === s.assignmentId) }))
    .filter((r) => r.asg)
    .sort((a, b) => b.sub.submittedAt.localeCompare(a.sub.submittedAt));

  const gradedRows = rows.filter((r) => r.sub.grade != null);
  const totalEarned = gradedRows.reduce((sum, r) => sum + (r.sub.grade ?? 0), 0);
  const totalPossible = gradedRows.reduce((sum, r) => sum + (r.asg?.points ?? 0), 0);
  const pct = totalPossible ? Math.round((totalEarned / totalPossible) * 100) : null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Grades</h2>
        <p className="text-secondary mt-1">Your graded assignments, quizzes, and case-study work.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="text-3xl display text-navy">{pct != null ? `${pct}%` : "—"}</div>
          <div className="text-[13px] text-secondary mt-1">Overall average</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl display text-navy">{gradedRows.length}</div>
          <div className="text-[13px] text-secondary mt-1">Graded items</div>
        </Card>
        <Card className="text-center">
          <div className="text-3xl display text-navy">
            {totalEarned}/{totalPossible || 0}
          </div>
          <div className="text-[13px] text-secondary mt-1">Points earned</div>
        </Card>
      </div>

      {rows.length === 0 ? (
        <EmptyState title="No graded work yet." body="Submit assignments and they'll show up here once graded." />
      ) : (
        <div className="space-y-3">
          {rows.map(({ sub, asg }) => (
            <Card key={sub.id}>
              <div className="flex flex-wrap items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge tone="navy">{asg!.category}</Badge>
                    <span className="text-[12px] text-secondary">Due {asg!.dueDate}</span>
                  </div>
                  <h4 className="font-semibold text-navy">{asg!.title}</h4>
                  {sub.feedback && <p className="text-[14px] text-secondary mt-1">{sub.feedback}</p>}
                </div>
                <div className="text-right">
                  {sub.grade != null ? (
                    <>
                      <div className="text-2xl display text-navy">
                        {sub.grade}
                        <span className="text-base text-secondary">/{asg!.points}</span>
                      </div>
                      <div className="text-[11px] text-secondary">graded by {sub.gradedBy}</div>
                    </>
                  ) : (
                    <Badge tone="amber">Pending</Badge>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
