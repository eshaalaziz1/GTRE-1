"use client";

import Link from "next/link";
import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Field, Notice } from "@/components/ui";

/**
 * Account request. Two paths:
 *  - Students: Georgia Tech email required, no Google sign-in.
 *  - Industry professionals: email + password + LinkedIn required.
 * Both create a PENDING account; an admin approves before first login.
 */
export default function SignupPage() {
  const [mode, setMode] = useState<"student" | "industry">("student");

  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-[1080px] px-6 lg:px-10 py-16 grid lg:grid-cols-2 gap-12 items-start">
        <div className="lg:pt-4">
          <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
            Join GTRE
          </div>
          <h1 className="display text-5xl text-white">Request access</h1>
          <p className="mt-5 text-lg text-white/80 max-w-md leading-relaxed">
            Every account is reviewed by a club officer before it&apos;s
            activated. You&apos;ll get an email once you&apos;re approved.
          </p>

          <div className="mt-8 space-y-4 max-w-md">
            <div className="rounded-xl border border-white/15 p-4">
              <div className="font-semibold text-white">Students &amp; members</div>
              <p className="text-sm text-white/70 mt-1">
                Sign up with your <strong>@gatech.edu</strong> email to join the
                club, the Analyst Program, and the member portal.
              </p>
            </div>
            <div className="rounded-xl border border-white/15 p-4">
              <div className="font-semibold text-white">Industry professionals</div>
              <p className="text-sm text-white/70 mt-1">
                Recruiters and alumni firms request access with a LinkedIn
                profile. Approved partners can view the Analyst Rolodex.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-7 text-text">
          <div className="flex gap-1 p-1 bg-surface rounded-lg mb-6">
            <button
              onClick={() => setMode("student")}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                mode === "student" ? "bg-white text-navy shadow-sm" : "text-secondary"
              }`}
            >
              Student / Member
            </button>
            <button
              onClick={() => setMode("industry")}
              className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${
                mode === "industry" ? "bg-white text-navy shadow-sm" : "text-secondary"
              }`}
            >
              Industry Professional
            </button>
          </div>

          {mode === "student" ? <StudentForm /> : <IndustryForm />}

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-sm text-secondary">
              Already have an account?{" "}
              <Link href="/login" className="font-semibold text-gold-hover hover:text-navy">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudentForm() {
  const { signUpStudent } = useGtre();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [major, setMajor] = useState("");
  const [gradYear, setGradYear] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-2xl display text-navy">Check your email.</div>
        <p className="text-sm text-secondary mt-3">
          Thanks, {name.split(" ")[0]}. We sent a verification link to{" "}
          <strong>{email}</strong> — click it to confirm your address. After that,
          a club officer approves your account, and you&apos;ll be able to sign in.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signUpStudent({
      name,
      email,
      password,
      major: major || undefined,
      gradYear: gradYear ? Number(gradYear) : undefined,
    });
    if (!res.ok) return setError(res.error);
    setDone(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <Notice tone="error">{error}</Notice>}
      <Field label="Full name" value={name} onChange={setName} placeholder="Jane Doe" required />
      <Field
        label="Georgia Tech email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@gatech.edu"
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Major" value={major} onChange={setMajor} placeholder="Business Admin" />
        <Field label="Grad year" type="number" value={gradYear} onChange={setGradYear} placeholder="2027" />
      </div>
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Create a password"
        required
        autoComplete="new-password"
      />
      <Button type="submit" className="w-full">
        Request access
      </Button>
      <p className="text-[12px] text-secondary text-center">
        Only <strong>@gatech.edu</strong> emails are accepted for student accounts.
      </p>
    </form>
  );
}

function IndustryForm() {
  const { signUpIndustry } = useGtre();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="text-center py-6">
        <div className="text-2xl display text-navy">Check your email.</div>
        <p className="text-sm text-secondary mt-3">
          Thanks, {name.split(" ")[0]}. We sent a verification link to{" "}
          <strong>{email}</strong> — click it to confirm your address. We verify
          every industry account by hand; once an officer approves you, you&apos;ll
          be able to sign in and view the Analyst Rolodex.
        </p>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signUpIndustry({
      name,
      email,
      password,
      linkedin,
      company: company || undefined,
      title: title || undefined,
    });
    if (!res.ok) return setError(res.error);
    setDone(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {error && <Notice tone="error">{error}</Notice>}
      <Field label="Full name" value={name} onChange={setName} placeholder="Jane Doe" required />
      <Field
        label="Work email"
        type="email"
        value={email}
        onChange={setEmail}
        placeholder="you@firm.com"
        required
      />
      <div className="grid grid-cols-2 gap-3">
        <Field label="Company" value={company} onChange={setCompany} placeholder="Firm name" />
        <Field label="Title" value={title} onChange={setTitle} placeholder="VP, Acquisitions" />
      </div>
      <Field
        label="LinkedIn URL"
        type="url"
        value={linkedin}
        onChange={setLinkedin}
        placeholder="https://www.linkedin.com/in/you"
        required
      />
      <Field
        label="Password"
        type="password"
        value={password}
        onChange={setPassword}
        placeholder="Create a password"
        required
        autoComplete="new-password"
      />
      <Button type="submit" variant="gold" className="w-full">
        Request access
      </Button>
      <p className="text-[12px] text-secondary text-center">
        A LinkedIn URL is required and accounts need admin approval before first login.
      </p>
    </form>
  );
}
