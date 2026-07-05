"use client";

import Link from "next/link";
import { useState } from "react";
import MonthCalendar from "@/components/MonthCalendar";
import ScheduleBoard from "@/components/ScheduleBoard";
import { Tabs } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";

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
          <p className="text-secondary mt-1">The Analyst Program and Industry Events calendar for the semester.</p>
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
