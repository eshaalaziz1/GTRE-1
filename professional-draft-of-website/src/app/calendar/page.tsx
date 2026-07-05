"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import MonthCalendar from "@/components/MonthCalendar";
import ScheduleBoard from "@/components/ScheduleBoard";
import { Tabs } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";

// Public calendar. Shows the club's two-track schedule (Analyst Program +
// Industry Events) and a month grid, both driven by the same events the exec
// team manages in Admin → Events. An optional Google Calendar embed can replace
// the built-in views (set in Admin → Site Info).
export default function CalendarPage() {
  const { state } = useGtre();
  const embed = state.siteInfo.googleCalendarEmbedUrl;
  const [view, setView] = useState("schedule");

  return (
    <>
      <Breadcrumb trail={[{ label: "Calendar" }]} />

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-4">
        <h1 className="display text-4xl lg:text-5xl text-navy mb-3">Calendar</h1>
        <p className="text-secondary max-w-2xl">
          Club meetings, the Analyst Program, and industry events. Managed by the exec team — members can check in for
          meetings from the portal.
        </p>
        <div className="border-t border-gold mt-7" />
      </section>

      {embed ? (
        <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-8">
          <div className="rounded-2xl overflow-hidden border border-border shadow-sm bg-white">
            <iframe src={embed} title="GTRE Google Calendar" className="w-full" style={{ height: "75vh" }} loading="lazy" />
          </div>
        </section>
      ) : (
        <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pb-16">
          <Tabs
            active={view}
            onChange={setView}
            tabs={[
              { key: "schedule", label: "Schedule" },
              { key: "month", label: "Month view" },
            ]}
          />
          <div className="pt-8">
            {view === "schedule" ? <ScheduleBoard /> : <MonthCalendar />}
          </div>
          <p className="text-[13px] text-secondary mt-8">
            Members: check in for meetings in the{" "}
            <Link href="/portal/calendar" className="font-semibold text-gold-hover hover:text-navy">
              portal
            </Link>
            .
          </p>
        </section>
      )}
    </>
  );
}
