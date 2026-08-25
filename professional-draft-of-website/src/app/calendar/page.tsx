"use client";

import Link from "next/link";
import { useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import MonthCalendar from "@/components/MonthCalendar";
import ScheduleBoard from "@/components/ScheduleBoard";
import { Tabs } from "@/components/ui";
import { useGtre } from "@/lib/store/GtreStore";
import { OUTLOOK_GROUP_JOIN_URL } from "@/lib/content";

// Public calendar. Shows the club's two-track schedule (Mentorship Program +
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
          Club meetings, the Mentorship Program, and industry events. Managed by the exec team, members can check in for
          meetings from the portal.
        </p>
        <div className="border-t border-gold mt-7" />
      </section>

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-2 pb-4">
        <a
          href={OUTLOOK_GROUP_JOIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between gap-3 rounded-xl border border-navy/15 bg-navy/[0.03] px-5 py-4 hover:bg-navy/[0.06] transition-colors"
        >
          <div>
            <div className="font-semibold text-navy">Get announcements and the calendar in Outlook</div>
            <div className="text-[13px] text-secondary">
              Join the club&apos;s Outlook group to get event emails and add the schedule to your own calendar.
            </div>
          </div>
          <span className="shrink-0 px-4 py-2 rounded-md bg-navy text-white text-[13px] font-semibold">Join →</span>
        </a>
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
