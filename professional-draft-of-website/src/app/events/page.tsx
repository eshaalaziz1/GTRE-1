import { redirect } from "next/navigation";

// The standalone Events tab was retired, the Calendar covers meetings, the
// Analyst Program, and industry events in one place. Old /events links redirect
// there so nothing breaks.
export default function EventsPage() {
  redirect("/calendar");
}
