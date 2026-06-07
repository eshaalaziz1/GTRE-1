"use client";

import Link from "next/link";
import { useState } from "react";

/**
 * Analyst Rolodex GATEWAY (not the directory itself).
 *
 * Explains what the Rolodex is and gates entry behind a sign-in / request-access
 * flow so only verified alumni and recruiters get through. On success it sends
 * the visitor to the actual Analyst Rolodex application.
 *
 * The auth here is a lightweight client-side demo. Real vetting (approved-user
 * store, email verification, an approval queue) swaps in at the marked spot.
 */

// The gated Analyst Directory lives at this route.
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
  const [mode, setMode] = useState<"signin" | "request">("signin");
  const [submitted, setSubmitted] = useState(false);
  const [authed, setAuthed] = useState(false);

  return (
    <>
      {/* Hero */}
      <section className="bg-navy text-white">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-20 grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
              For alumni & recruiters
            </div>
            <h1 className="display text-5xl text-white">The Analyst Rolodex</h1>
            <p className="mt-5 text-lg text-white/80 max-w-xl leading-relaxed">
              A private, vetted directory of Georgia Tech&apos;s strongest real
              estate students, backed by what the club tracks all semester:
              academics, attendance, graded case-study work, and experience.
              Built so you can find and hire the next analyst before anyone else.
            </p>
            <div className="mt-8 flex flex-wrap gap-6 text-sm text-white/70">
              <span>Vetted access only</span>
              <span>120+ active members</span>
              <span>Updated every semester</span>
            </div>
          </div>

          {/* Auth card */}
          <div className="bg-white rounded-2xl shadow-xl p-7 text-text">
            {authed ? (
              <div className="text-center py-6">
                <div className="text-2xl display text-navy">You&apos;re in.</div>
                <p className="text-sm text-secondary mt-3 mb-6">
                  Welcome back. Continue to the Analyst Rolodex.
                </p>
                <Link
                  href={ROLODEX_URL}
                  className="inline-block w-full px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
                >
                  Enter the Analyst Rolodex →
                </Link>
              </div>
            ) : submitted ? (
              <div className="text-center py-6">
                <div className="text-2xl display text-navy">Request received.</div>
                <p className="text-sm text-secondary mt-3">
                  We verify every account by hand. Once a club officer confirms
                  you&apos;re a Georgia Tech alum or an approved recruiting
                  partner, we&apos;ll email your login.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setMode("signin"); }}
                  className="mt-6 text-sm font-semibold text-gold-hover hover:text-navy"
                >
                  Back to sign in
                </button>
              </div>
            ) : (
              <>
                <div className="flex gap-1 p-1 bg-surface rounded-lg mb-6">
                  <button
                    onClick={() => setMode("signin")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                      mode === "signin" ? "bg-white text-navy shadow-sm" : "text-secondary"
                    }`}
                  >
                    Sign in
                  </button>
                  <button
                    onClick={() => setMode("request")}
                    className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                      mode === "request" ? "bg-white text-navy shadow-sm" : "text-secondary"
                    }`}
                  >
                    Request access
                  </button>
                </div>

                {mode === "signin" ? (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      // TODO: replace with real authentication against approved users.
                      setAuthed(true);
                    }}
                    className="space-y-4"
                  >
                    <Field label="Email" type="email" placeholder="you@firm.com" />
                    <Field label="Password" type="password" placeholder="••••••••" />
                    <button className="w-full px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors">
                      Sign in
                    </button>
                    <p className="text-[12px] text-secondary text-center">
                      Access is limited to verified alumni and recruiters.
                    </p>
                  </form>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setSubmitted(true);
                    }}
                    className="space-y-4"
                  >
                    <Field label="Full name" type="text" placeholder="Jane Doe" />
                    <Field label="Work email" type="email" placeholder="you@firm.com" />
                    <Field label="Company" type="text" placeholder="Firm name" />
                    <Field label="Affiliation" type="text" placeholder="GT alum, recruiter, etc." />
                    <Field label="LinkedIn URL" type="url" placeholder="https://www.linkedin.com/in/you" />
                    <button className="w-full px-6 py-3 rounded-md bg-gold text-navy text-sm font-bold hover:bg-gold-hover transition-colors">
                      Request access
                    </button>
                  </form>
                )}
              </>
            )}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-20">
        <h2 className="display text-4xl text-navy mb-12">How access works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t-4 border-gold pt-6">
              <div className="text-3xl display text-gold-hover mb-3">{s.n}</div>
              <h3 className="text-xl font-semibold text-navy mb-2">{s.title}</h3>
              <p className="text-[15px] text-secondary leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Eligibility band */}
      <section className="bg-surface border-y border-border">
        <div className="mx-auto max-w-[1280px] px-6 lg:px-10 py-14 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div>
            <h2 className="display text-2xl text-navy">Not sure if you qualify?</h2>
            <p className="text-secondary mt-1 text-[15px]">
              The Rolodex is open to Georgia Tech alumni and recruiting partners the club has verified.
            </p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 px-6 py-3 rounded-md border border-navy text-navy text-sm font-semibold hover:bg-white transition-colors"
          >
            Contact the club
          </Link>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  type,
  placeholder,
}: {
  label: string;
  type: string;
  placeholder: string;
}) {
  return (
    <label className="block">
      <span className="text-[12px] font-semibold text-navy uppercase tracking-wide">{label}</span>
      <input
        required
        type={type}
        placeholder={placeholder}
        className="mt-1.5 w-full px-3.5 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-navy"
      />
    </label>
  );
}
