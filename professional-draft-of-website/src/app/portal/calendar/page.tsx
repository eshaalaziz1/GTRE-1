"use client";

import Link from "next/link";
import { useState } from "react";
import MonthCalendar from "@/components/MonthCalendar";
import ScheduleBoard from "@/components/ScheduleBoard";
import { Tabs } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";
import { OUTLOOK_GROUP_JOIN_URL } from "@/lib/content";

// Member portal Schedule tab: the club's full schedule (two tracks) plus a
// month view, driven by the same events admins manage. Admins get a shortcut to
// the management screen where they can add, edit, delete, and reorder events.
export default function PortalCalendar() {
  const { currentAccount } = useGtre();
  const [view, setView] = useState("schedule");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="display text-3xl text-navy">Schedule</h2>
          <p className="text-secondary mt-1">The Mentorship Program and Industry Events calendar for the semester.</p>
        </div>
        {currentAccount?.role === "admin" && (
          <Link
            href="/admin/events"
            className="px-4 py-2 rounded-md bg-navy text-white text-[13px] font-semibold hover:bg-navy-deep transition-colors"
          >
            Manage events →
          </Link>
        )}
      </div>

      <a
        href={OUTLOOK_GROUP_JOIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-between gap-3 rounded-xl border border-navy/15 bg-navy/[0.03] px-5 py-4 hover:bg-navy/[0.06] transition-colors"
      >
        <div>
          <div className="font-semibold text-navy">Get announcements and the calendar in Outlook</div>
          <div className="text-[13px] text-secondary">
            Join the club&apos;s Outlook group to get event emails and add the schedule to your calendar.
          </div>
        </div>
        <span className="shrink-0 px-4 py-2 rounded-md bg-navy text-white text-[13px] font-semibold">Join →</span>
      </a>

      <Tabs
        active={view}
        onChange={setView}
        tabs={[
          { key: "schedule", label: "Schedule" },
          { key: "month", label: "Month view" },
        ]}
      />

      <div className="pt-2">{view === "schedule" ? <ScheduleBoard /> : <MonthCalendar />}</div>

      <p className="text-[13px] text-secondary">
        Attending a meeting? Log it on the{" "}
        <Link href="/portal/check-in" className="font-semibold text-gold-hover hover:text-navy">
          Check-In
        </Link>{" "}
        tab with the code an officer shares.
      </p>
    </div>
  );
}
