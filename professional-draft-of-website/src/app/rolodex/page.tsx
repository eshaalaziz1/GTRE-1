"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Field, Notice } from "@/components/ui";
import LinkedInButton from "@/components/LinkedInButton";
import SiteText from "@/components/SiteText";

/**
 * Analyst Rolodex GATEWAY (not the directory itself).
 *
 * Explains what the Rolodex is and gates entry behind the real account system:
 * approved industry professionals and alumni sign in; new visitors request
 * access (which routes to the industry sign-up + admin approval flow). On a
 * successful sign-in the visitor continues to the vetted directory.
 */
const ROLODEX_URL = "/rolodex/directory";

const STEPS = [
  {
    n: "01",
    title: "Verify you belong",
    body: "Access is limited to Georgia Tech alumni and vetted recruiting partners. Sign in or request access below.",
  },
  {
    n: "02",
    title: "Browse vetted analysts",
    body: "See each member's academics, attendance, graded case-study work, experience, and resume in one profile.",
  },
  {
    n: "03",
    title: "Reach out and hire",
    body: "Search by role, industry, or skill, then contact members directly through the club.",
  },
];

export default function RolodexGateway() {
  const router = useRouter();
  const { currentAccount, login } = useGtre();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await login(email, password);
    if (!res.ok) return setError(res.error);
    router.push(ROLODEX_URL);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
              <SiteText slotKey="rolodex-hero-eyebrow">For alumni &amp; recruiters</SiteText>
            </div>
            <h1 className="display text-5xl text-white"><SiteText slotKey="rolodex-hero-title">The Analyst Rolodex</SiteText></h1>
            <p className="mt-5 text-lg text-white/80 max-w-xl leading-relaxed">
              <SiteText slotKey="rolodex-hero-paragraph">A private, vetted directory of Georgia Tech&apos;s strongest real estate students, backed by what the club
              tracks all semester: academics, attendance, graded case-study work, and experience. Built so you can find
              and hire the next analyst before anyone else.</SiteText>
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
              <span><SiteText slotKey="rolodex-feature-1">Vetted access only</SiteText></span>
              <span><SiteText slotKey="rolodex-feature-2">Georgia Tech&apos;s top analysts</SiteText></span>
              <span><SiteText slotKey="rolodex-feature-3">Updated every semester</SiteText></span>
            </div>
          </div>

          {/* Auth card */}
          <div className="bg-white rounded-2xl shadow-xl p-7 text-text">
            {currentAccount ? (
              <div className="text-center py-6">
                <div className="text-2xl display text-navy"><SiteText slotKey="rolodex-welcome-heading">You&apos;re in.</SiteText></div>
                <p className="text-sm text-secondary mt-3 mb-6">
                  Welcome back, {currentAccount.name.split(" ")[0]}. Continue to the Analyst Rolodex.
                </p>
                <Link href={ROLODEX_URL} className="inline-block w-full px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
                  <SiteText slotKey="rolodex-enter-link">Enter the Analyst Rolodex →</SiteText>
                </Link>
              </div>
            ) : (
              <>
                <h2 className="text-lg font-semibold text-navy mb-1"><SiteText slotKey="rolodex-signin-heading">Sign in to continue</SiteText></h2>
                <p className="text-[13px] text-secondary mb-5"><SiteText slotKey="rolodex-signin-subtitle">Approved alumni and recruiting partners only.</SiteText></p>
                <form onSubmit={onSubmit} className="space-y-4">
                  {error && <Notice tone="error">{error}</Notice>}
                  <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@firm.com" required />
                  <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" required />
                  <Button type="submit" className="w-full">
                    Sign in
                  </Button>
                </form>

                {/* Industry & alumni can use LinkedIn (no GT email needed).
                    Appears only once LinkedIn auth is configured (see SETUP.md). */}
                <LinkedInButton redirectTo="/rolodex/directory" />
                <div className="mt-5 pt-5 border-t border-border text-center">
                  <p className="text-sm text-secondary">
                    New here?{" "}
                    <Link href="/signup" className="font-semibold text-gold-hover hover:text-navy">
                      <SiteText slotKey="rolodex-request-access-link">Request access</SiteText>
                    </Link>
                    {". Every account is approved by hand."}
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-20">
        <h2 className="display text-4xl text-navy mb-12"><SiteText slotKey="rolodex-how-heading">How access works</SiteText></h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t-4 border-gold pt-6">
              <div className="text-3xl display text-gold-hover mb-3">{s.n}</div>
              <h3 className="text-xl font-semibold text-navy mb-2"><SiteText slotKey={`rolodex-step-${s.n}-title`}>{s.title}</SiteText></h3>
              <p className="text-[15px] text-secondary leading-relaxed"><SiteText slotKey={`rolodex-step-${s.n}-body`}>{s.body}</SiteText></p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility band */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="display text-2xl text-navy"><SiteText slotKey="rolodex-eligibility-heading">Not sure if you qualify?</SiteText></h2>
            <p className="text-secondary mt-1 text-[15px]">
              <SiteText slotKey="rolodex-eligibility-paragraph">The Rolodex is open to Georgia Tech alumni and recruiting partners the club has verified.</SiteText>
            </p>
          </div>
          <Link href="/contact" className="shrink-0 px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-white transition-colors">
            <SiteText slotKey="rolodex-contact-link">Contact the club</SiteText>
          </Link>
        </div>
      </section>
    </>
  );
}
