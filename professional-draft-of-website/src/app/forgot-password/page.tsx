"use client";

import Link from "next/link";
import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Field } from "@/components/ui";

// Forgot-password: enter your email and we send a reset link (which opens the
// /reset-password page). We always show the same confirmation so we never
// reveal whether an email is registered.
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

  return (
    <section className="bg-navy text-white min-h-[calc(100vh-143px)]">
      <div className="mx-auto max-w-[480px] px-6 py-16">
        <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
          Member area
        </div>
        <h1 className="display text-4xl text-white">Reset your password</h1>

        <div className="mt-8 bg-white rounded-2xl shadow-xl p-7 text-text">
          {sent ? (
            <div className="text-center py-4">
              <div className="text-2xl display text-navy">Check your email</div>
              <p className="text-sm text-secondary mt-3">
                If an account exists for <strong>{email}</strong>, we&apos;ve sent a link to reset
                your password. It may take a few minutes to arrive, check your spam folder too.
              </p>
              <Link href="/login" className="inline-block mt-6 text-sm font-semibold text-gold-hover hover:text-navy">
                ← Back to sign in
              </Link>
            </div>
          ) : (
            <>
              <p className="text-sm text-secondary mb-5">
                Enter your account email and we&apos;ll send you a link to set a new password.
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
                  {busy ? "Sending…" : "Send reset link"}
                </Button>
              </form>
              <div className="mt-6 pt-6 border-t border-border text-center">
                <Link href="/login" className="text-sm font-semibold text-gold-hover hover:text-navy">
                  ← Back to sign in
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
