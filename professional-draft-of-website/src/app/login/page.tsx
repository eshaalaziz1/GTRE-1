"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Field, Notice } from "@/components/ui";
import LinkedInButton from "@/components/LinkedInButton";

/**
 * Member / industry / admin sign-in. No Google sign-in (removed per direction).
 * Approved accounts only — pending or rejected accounts get a clear message.
 */
export default function LoginPage() {
  const router = useRouter();
  const { login } = useGtre();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await login(email, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    const dest =
      res.account.role === "admin"
        ? "/admin"
        : res.account.role === "industry"
          ? "/rolodex/directory"
          : "/portal";
    router.push(dest);
  }

  return (
    <section className="bg-navy text-white min-h-[calc(100vh-143px)]">
      <div className="mx-auto max-w-[1080px] px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
            Member area
          </div>
          <h1 className="display text-5xl text-white">Sign in</h1>
          <p className="mt-5 text-lg text-white/80 max-w-md leading-relaxed">
            The member portal is your hub for club info, assignments, check-ins,
            the Analyst Program, announcements, and documents.
          </p>
          <ul className="mt-8 space-y-2 text-white/70 text-sm">
            <li>• Students sign in with a Georgia Tech email.</li>
            <li>• Industry professionals sign in with their approved account.</li>
            <li>• New here? Request access — an officer approves every account.</li>
          </ul>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-7 text-text">
          <form onSubmit={onSubmit} className="space-y-4">
            {error && <Notice tone="error">{error}</Notice>}
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={setEmail}
              placeholder="you@gatech.edu"
              required
              autoComplete="email"
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={setPassword}
              placeholder="••••••••"
              required
              autoComplete="current-password"
            />
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>

          {/* Appears only when LinkedIn auth is configured (see SETUP.md). */}
          <LinkedInButton redirectTo="/portal" />

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-secondary">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="font-semibold text-gold-hover hover:text-navy">
                Request access
              </Link>
            </p>
          </div>

          {/* Prototype helper — only shown while the localStorage mock is active. */}
          {(process.env.NEXT_PUBLIC_DATA_BACKEND ?? "").toLowerCase() !== "supabase" && (
            <div className="mt-5 rounded-lg bg-surface border border-border p-3 text-[12px] text-secondary leading-relaxed">
              <span className="font-semibold text-navy">Demo logins:</span>{" "}
              admin@gatech.edu / admin123 · member@gatech.edu / member123 ·
              recruiter@firm.com / recruiter123
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
