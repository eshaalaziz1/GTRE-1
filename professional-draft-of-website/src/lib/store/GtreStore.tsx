"use client";

// ---------------------------------------------------------------------------
// GtreStore — the app's data-layer entry point.
//
// Pages import `useGtre` (and `GtreProvider`, `isGeorgiaTechEmail`, the Result
// types) from here and never care which backend is live. This module simply
// picks the adapter at runtime from NEXT_PUBLIC_DATA_BACKEND:
//   * "supabase" → SupabaseGtreProvider (real backend: auth + Postgres + RLS)
//   * anything else / unset → MockGtreProvider (localStorage prototype)
//
// Both adapters implement the shared GtreContextValue contract in context.tsx,
// so no page component changes when you flip the backend. See SETUP.md.
// ---------------------------------------------------------------------------

import { type ReactNode } from "react";
import { MockGtreProvider } from "./MockStore";
import { SupabaseGtreProvider } from "./SupabaseStore";

export { useGtre, isGeorgiaTechEmail } from "./context";
export type { GtreContextValue, SignUpResult, LoginResult } from "./context";

const USE_SUPABASE =
  (process.env.NEXT_PUBLIC_DATA_BACKEND ?? "").toLowerCase() === "supabase";

export function GtreProvider({ children }: { children: ReactNode }) {
  if (USE_SUPABASE) return <SupabaseGtreProvider>{children}</SupabaseGtreProvider>;
  return <MockGtreProvider>{children}</MockGtreProvider>;
}
