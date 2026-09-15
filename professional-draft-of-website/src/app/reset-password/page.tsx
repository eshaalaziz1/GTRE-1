"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Field, Notice } from "@/components/ui";
import { getSupabaseClient } from "@/lib/supabase/client";

const USES_SUPABASE = (process.env.NEXT_PUBLIC_DATA_BACKEND ?? "").toLowerCase() === "supabase";

// Landing page for the reset link emailed by /forgot-password. Supabase's
// client SDK parses the recovery token out of the URL fragment on load and
// fires a "PASSWORD_RECOVERY" auth event once it has established a short-lived
// recovery session. We wait for that specific event (rather than just "is
// there any session") before letting the member set a new password, so a
// bare/expired visit to this page, or an unrelated normal login session,
// can't be mistaken for a valid reset.
export default function ResetPasswordPage() {
  const router = useRouter();
  const { setNewPassword } = useGtre();
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);
  const [checking, setChecking] = useState(USES_SUPABASE);
  const [recoveryReady, setRecoveryReady] = useState(!USES_SUPABASE);

  useEffect(() => {
    if (!USES_SUPABASE) return;
    const supabase = getSupabaseClient();
    let settled = false;

    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        settled = true;
        setRecoveryReady(true);
        setChecking(false);
      }
    });

    // Fallback for the case where Supabase already fired PASSWORD_RECOVERY
    // (or established the recovery session) before this listener attached.
    supabase.auth.getSession().then(({ data }) => {
      if (settled) return;
      if (data.session) {
        setRecoveryReady(true);
      }
      setChecking(false);
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (next !== confirm) return setError("The passwords don't match.");
    if (next.length < 8) return setError("Password must be at least 8 characters.");
    setBusy(true);
    const res = await setNewPassword(next);
    setBusy(false);
    if (!res.ok) return setError(res.error || "Couldn't set your new password.");
    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  return (
    <section className="bg-navy text-white min-h-[calc(100vh-143px)]">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
          Member area
        </div>
        <h1 className="display text-4xl text-white">Set a new password</h1>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-7 text-text">
          {checking ? (
            <div className="text-center py-4">
              <div className="text-sm text-secondary">Verifying your reset link…</div>
            </div>
          ) : done ? (
            <div className="text-center py-4">
              <div className="text-2xl display text-navy">Password updated</div>
              <p className="text-sm text-secondary mt-3">
                You can now sign in with your new password. Taking you to sign in…
              </p>
              <Link href="/login" className="inline-block mt-6 text-sm font-semibold text-gold-hover hover:text-navy">
                Go to sign in →
              </Link>
            </div>
          ) : !recoveryReady ? (
            <div className="text-center py-4">
              <div className="text-2xl display text-navy">Link expired or invalid</div>
              <p className="text-sm text-secondary mt-3">
                This password reset link is no longer valid, links only work once and
                expire after a while. Request a new one to continue.
              </p>
              <Link
                href="/forgot-password"
                className="mt-6 inline-block px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
              >
                Request a new link
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {error && <Notice tone="error">{error}</Notice>}
              <p className="text-sm text-secondary">
                Choose a new password for your account. Open this page from the link in your reset
                email if you haven&apos;t.
              </p>
              <Field label="New password" type="password" value={next} onChange={setNext} placeholder="At least 8 characters" required autoComplete="new-password" />
              <Field label="Confirm new password" type="password" value={confirm} onChange={setConfirm} required autoComplete="new-password" />
              <Button type="submit" className="w-full" disabled={busy}>
                {busy ? "Saving…" : "Set new password"}
              </Button>
              <div className="pt-4 border-t border-border text-center">
                <Link href="/login" className="text-sm font-semibold text-gold-hover hover:text-navy">
                  ← Back to sign in
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
