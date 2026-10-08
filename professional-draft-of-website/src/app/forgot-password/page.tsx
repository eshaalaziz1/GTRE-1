"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Field, Notice } from "@/components/ui";

// Forgot-password: enter your email and we send a 6-digit reset code (a code,
// not a link — @gatech.edu mail runs through Outlook/Defender, whose link
// scanners can open and consume a one-time magic link before the member ever
// clicks it, which is exactly what was causing reset links to land people on
// the homepage instead of the reset form; see SETUP.md for the matching
// Supabase email-template change). The member enters the code + a new
// password together on this same page, no separate link to click.
export default function ForgotPasswordPage() {
  const { requestPasswordReset } = useGtre();
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    await requestPasswordReset(email);
    setBusy(false);
    setSent(true);
  }

  if (sent) return <ResetCodeStep email={email.trim()} />;

  return (
    <section className="bg-navy text-white min-h-[calc(100vh-143px)]">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
          Member area
        </div>
        <h1 className="display text-4xl text-white">Reset your password</h1>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-7 text-text">
          <p className="text-sm text-secondary mb-5">
            Enter your account email and we&apos;ll send you a 6-digit code to set a new password.
          </p>
          <form onSubmit={onSubmit} className="space-y-4">
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@gatech.edu"
              required
              autoComplete="email"
            />
            <Button type="submit" className="w-full" disabled={busy}>
              {busy ? "Sending…" : "Send reset code"}
            </Button>
          </form>
          <div className="mt-6 pt-6 border-t border-border text-center">
            <Link href="/login" className="text-sm font-semibold text-gold-hover hover:text-navy">
              ← Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResetCodeStep({ email }: { email: string }) {
  const router = useRouter();
  const { confirmPasswordReset, requestPasswordReset } = useGtre();
  const [code, setCode] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [resent, setResent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (next !== confirm) return setError("The passwords don't match.");
    if (next.length < 8) return setError("Password must be at least 8 characters.");
    setBusy(true);
    const res = await confirmPasswordReset(email, code, next);
    setBusy(false);
    if (!res.ok) return setError(res.error || "Couldn't set your new password.");
    setDone(true);
    setTimeout(() => router.push("/login"), 2000);
  }

  async function onResend() {
    setError("");
    setResent(false);
    await requestPasswordReset(email);
    setResent(true);
  }

  return (
    <section className="bg-navy text-white min-h-[calc(100vh-143px)]">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
          Member area
        </div>
        <h1 className="display text-4xl text-white">Enter your code</h1>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-7 text-text">
          {done ? (
            <div className="text-center py-4">
              <div className="text-2xl display text-navy">Password updated</div>
              <p className="text-sm text-secondary mt-3">
                You can now sign in with your new password. Taking you to sign in…
              </p>
              <Link href="/login" className="inline-block mt-6 text-sm font-semibold text-gold-hover hover:text-navy">
                Go to sign in →
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              {error && <Notice tone="error">{error}</Notice>}
              {resent && <Notice tone="success">A new code is on its way.</Notice>}
              <p className="text-sm text-secondary">
                We emailed a 6-digit code to <strong>{email}</strong>. Enter it along with your new
                password below.
              </p>
              <input
                inputMode="numeric"
                autoComplete="one-time-code"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                placeholder="••••••"
                aria-label="6-digit reset code"
                className="w-full text-center tracking-[0.5em] text-2xl px-3 py-3 border border-border rounded-md outline-none focus:border-navy"
                required
              />
              <Field label="New password" type="password" value={next} onChange={setNext} placeholder="At least 8 characters" required autoComplete="new-password" />
              <Field label="Confirm new password" type="password" value={confirm} onChange={setConfirm} required autoComplete="new-password" />
              <Button type="submit" className="w-full" disabled={busy || code.length < 6}>
                {busy ? "Saving…" : "Set new password"}
              </Button>
              <p className="text-[13px] text-secondary text-center">
                Didn&apos;t get it? Check spam, or{" "}
                <button type="button" onClick={onResend} className="font-semibold text-gold-hover hover:text-navy">
                  resend the code
                </button>
                .
              </p>
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
