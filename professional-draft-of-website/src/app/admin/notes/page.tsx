import { redirect } from "next/navigation";

// Meeting Notes was removed from the admin portal. Old links go to the dashboard.
export default function AdminNotesPage() {
  redirect("/admin");
}
