"use client";

import { useState } from "react";
import { getSupabaseClient } from "@/lib/supabase/client";

/**
 * "Continue with LinkedIn" — Supabase LinkedIn (OIDC) sign-in.
 *
 * Hidden unless NEXT_PUBLIC_LINKEDIN_AUTH === "on", so it only appears once a
 * LinkedIn app is configured in Supabase (see SETUP.md → "LinkedIn login").
 * That keeps a non-functional button off the live site until it's ready to test.
 *
 * On success LinkedIn returns the member to `redirectTo`; the signup trigger
 * creates their profile (role inferred from email — LinkedIn users become
 * `industry` by default). Best suited to industry/alumni sign-in and profile
 * auto-fill; students still sign up with their @gatech.edu email.
 */
export default function LinkedInButton({ redirectTo = "/portal" }: { redirectTo?: string }) {
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if ((process.env.NEXT_PUBLIC_LINKEDIN_AUTH ?? "").toLowerCase() !== "on") return null;

  async function onClick() {
    setError("");
    setBusy(true);
    try {
      const supabase = getSupabaseClient();
      const origin = typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "linkedin_oidc",
        options: { redirectTo: `${origin}${redirectTo}` },
      });
      if (error) {
        setError(error.message);
        setBusy(false);
      }
      // On success the browser is redirected to LinkedIn, so no further UI here.
    } catch (e) {
      setError(e instanceof Error ? e.message : "LinkedIn sign-in is unavailable.");
      setBusy(false);
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 border-t border-border" />
        <span className="text-[12px] uppercase tracking-wide text-secondary">or</span>
        <div className="flex-1 border-t border-border" />
      </div>
      <button
        type="button"
        onClick={onClick}
        disabled={busy}
        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#0A66C2] text-white text-sm font-semibold hover:bg-[#004182] transition-colors disabled:opacity-60"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
        {busy ? "Redirecting…" : "Continue with LinkedIn"}
      </button>
      {error && <p className="mt-2 text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
