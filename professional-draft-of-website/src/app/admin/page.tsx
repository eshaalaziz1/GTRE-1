"use client";

import Link from "next/link";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Card } from "@/components/ui";

export default function AdminDashboard() {
  const { state } = useGtre();

  const pending = state.accounts.filter((a) => a.status === "pending");
  const members = state.accounts.filter((a) => a.role === "student" && a.status === "approved");
  const industry = state.accounts.filter((a) => a.role === "industry" && a.status === "approved");
  const ungraded = state.submissions.filter((s) => s.grade == null);
  const openQuestions = state.questions.filter((q) => q.status === "open");

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Dashboard</h2>
        <p className="text-secondary mt-1">Everything the exec team needs to run the club, in one place.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Stat label="Pending approvals" value={pending.length} href="/admin/members" tone={pending.length ? "red" : "navy"} />
        <Stat label="Active members" value={members.length} href="/admin/members" />
        <Stat label="Industry accounts" value={industry.length} href="/admin/members" />
        <Stat label="Ungraded submissions" value={ungraded.length} href="/admin/assignments" tone={ungraded.length ? "amber" : "navy"} />
      </div>

      {/* Approval queue preview */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="display text-2xl text-navy">Approval queue</h3>
          <Link href="/admin/members" className="text-[13px] font-semibold text-gold-hover hover:text-navy">
            Manage all →
          </Link>
        </div>
        {pending.length === 0 ? (
          <Card>
            <p className="text-secondary text-sm">No accounts awaiting approval. 🎉</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {pending.slice(0, 4).map((a) => (
              <Card key={a.id}>
                <div className="flex items-center gap-3">
                  <Badge tone={a.role === "industry" ? "gold" : "navy"}>
                    {a.role === "industry" ? "Industry" : "Student"}
                  </Badge>
                  <div className="min-w-0">
                    <div className="font-semibold text-navy truncate">{a.name}</div>
                    <div className="text-[13px] text-secondary truncate">{a.email}</div>
                  </div>
                  <Link
                    href="/admin/members"
                    className="ml-auto text-[13px] font-semibold text-gold-hover hover:text-navy"
                  >
                    Review →
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </section>

      <div className="grid lg:grid-cols-2 gap-6">
        <QuickLink
          title="Grade submissions"
          body={`${ungraded.length} submission${ungraded.length === 1 ? "" : "s"} waiting on a grade.`}
          href="/admin/assignments"
        />
        <QuickLink
          title="Answer questions"
          body={`${openQuestions.length} open question${openQuestions.length === 1 ? "" : "s"} from members.`}
          href="/admin/questions"
        />
        <QuickLink title="Post an announcement" body="Share an update about an event, meeting, or deadline." href="/admin/announcements" />
        <QuickLink title="Add a calendar event" body="Meetings, workshops, socials, and deadlines." href="/admin/events" />
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  href,
  tone = "navy",
}: {
  label: string;
  value: number;
  href: string;
  tone?: "navy" | "red" | "amber";
}) {
  const color = tone === "red" ? "text-red-700" : tone === "amber" ? "text-amber-700" : "text-navy";
  return (
    <Link href={href} className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow block">
      <div className={`text-3xl display ${color}`}>{value}</div>
      <div className="text-[13px] text-secondary mt-1">{label}</div>
    </Link>
  );
}

function QuickLink({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <Link href={href} className="bg-white border border-border rounded-xl p-5 hover:shadow-md transition-shadow block">
      <div className="font-semibold text-navy">{title}</div>
      <p className="text-[14px] text-secondary mt-1">{body}</p>
      <div className="text-[13px] font-semibold text-gold-hover mt-3">Open →</div>
    </Link>
  );
}
