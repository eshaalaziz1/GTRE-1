import { redirect } from "next/navigation";

// The standalone landing now lives on the About page (the former homepage
// content was folded in there). Send the root to /about.
export default function Home() {
  redirect("/about");
}
