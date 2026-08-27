import { redirect } from "next/navigation";

// Opportunities now lives inside the member portal.
export default function OpportunitiesRedirect() {
  redirect("/portal/opportunities");
}
