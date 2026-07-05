"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge } from "@/components/ui";

/**
 * Admin/exec chrome. Left rail groups every management area so future exec
 * teams run the club from one place without touching code. A live "pending
 * approvals" badge nudges officers to the approval queue.
 */
const NAV = [
  { href: "/admin", label: "Dashboard", exact: true },
  { href: "/admin/members", label: "Members & Accounts" },
  { href: "/admin/announcements", label: "Announcements" },
  { href: "/admin/events", label: "Events & Check-Ins" },
  { href: "/admin/assignments", label: "Assignments & Grading" },
  { href: "/admin/questions", label: "Questions" },
  { href: "/admin/resources", label: "Materials & Documents" },
  { href: "/admin/notes", label: "Meeting Notes" },
  { href: "/admin/site-info", label: "Site Info" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { state } = useGtre();
  const pending = state.accounts.filter((a) => a.status === "pending").length;
  const openQuestions = state.questions.filter((q) => q.status === "open").length;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="bg-surface min-h-[calc(100vh-143px)]">
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-8 flex items-center justify-between">
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em]">
              Admin &amp; Exec
            </div>
            <h1 className="text-2xl font-semibold text-white">Club Management</h1>
          </div>
          <Link href="/portal" className="text-[13px] font-semibold text-white/80 hover:text-white underline underline-offset-4">
            Member portal →
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors flex items-center gap-2 ${
                isActive(n.href, n.exact)
                  ? "bg-navy text-white"
                  : "text-secondary hover:bg-white hover:text-navy"
              }`}
            >
              {n.label}
              {n.href === "/admin/members" && pending > 0 && <Badge tone="red">{pending}</Badge>}
              {n.href === "/admin/questions" && openQuestions > 0 && <Badge tone="amber">{openQuestions}</Badge>}
            </Link>
          ))}
        </nav>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
