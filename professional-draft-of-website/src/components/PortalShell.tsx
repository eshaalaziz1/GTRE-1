"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGtre } from "@/lib/store/GtreStore";
import Avatar from "@/components/Avatar";

/**
 * Shared chrome for the member portal: a left rail of tabs on desktop, a
 * horizontally scrolling strip on mobile, plus a header that greets the member.
 * The tab set mirrors the original Vercel portal (Home, Assignments, Grades,
 * Check-In, Resources, Analyst Program, Q&A, Profile), re-skinned to the site.
 */

const TABS = [
  { href: "/portal", label: "Home", exact: true },
  { href: "/portal/calendar", label: "Schedule" },
  { href: "/portal/assignments", label: "Assignments" },
  { href: "/portal/grades", label: "Grades" },
  { href: "/portal/check-in", label: "Check-In" },
  { href: "/portal/resources", label: "Materials" },
  { href: "/opportunities", label: "Opportunities" },
  { href: "/portal/forum", label: "Q&A" },
  { href: "/portal/profile", label: "Profile" },
];

export default function PortalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { currentAccount } = useGtre();

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + "/");

  return (
    <div className="bg-surface min-h-[calc(100vh-143px)]">
      {/* Portal header band */}
      <div className="bg-navy text-white">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8 flex items-center gap-4">
          {currentAccount && <Avatar name={currentAccount.name} photo={null} size={56} />}
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em]">
              Member Portal
            </div>
            <h1 className="text-2xl font-semibold text-white">
              Welcome, {currentAccount?.name.split(" ")[0] ?? "member"}
            </h1>
          </div>
          {currentAccount?.role === "admin" && (
            <Link
              href="/admin"
              className="ml-auto text-[13px] font-semibold text-white/80 hover:text-white underline underline-offset-4"
            >
              Go to Admin →
            </Link>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1200px] px-6 lg:px-10 py-8 grid lg:grid-cols-[210px_1fr] gap-8">
        {/* Tab rail */}
        <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
          {TABS.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`px-4 py-2.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                isActive(t.href, t.exact)
                  ? "bg-navy text-white"
                  : "text-secondary hover:bg-white hover:text-navy"
              }`}
            >
              {t.label}
            </Link>
          ))}
        </nav>

        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
