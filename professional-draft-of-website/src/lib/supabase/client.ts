"use client";

// ---------------------------------------------------------------------------
// Browser Supabase client (singleton).
//
// Uses the public URL + anon key, safe to expose to the browser. Row-Level
// Security on every table is what actually protects data; the anon key only
// lets a caller do what the signed-in user's RLS policies permit. Admin-only
// mutations work because the admin's session satisfies the `is_admin()` RLS
// policies in supabase/schema.sql, no service-role key is shipped to the client.
// ---------------------------------------------------------------------------

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anon) {
    throw new Error(
      "Supabase backend selected but NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are not set. See SETUP.md.",
    );
  }
  client = createBrowserClient(url, anon);
  return client;
}
