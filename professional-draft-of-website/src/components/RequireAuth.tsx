"use client";

import Link from "next/link";
import { useGtre } from "@/lib/store/GtreStore";
import type { Role } from "@/lib/store/types";

/**
 * Client-side access gate. Wrap any portal/admin page in this to require a
 * signed-in account, optionally restricted to specific roles.
 *
 * This is prototype-grade gating (state lives in the browser). With Supabase,
 * pair this with server-side checks / RLS so protected data is never sent to
 * an unauthorized client — see SETUP.md.
 */
export default function RequireAuth({
  roles,
  children,
}: {
  roles?: Role[];
  children: React.ReactNode;
}) {
  const { currentAccount, ready } = useGtre();

  // While the adapter is still loading (Supabase: fetching the session; mock:
  // hydrating from localStorage), don't flash the sign-in gate at a user who is
  // actually logged in.
  if (!ready) {
    return (
      <section className="mx-auto max-w-[640px] px-6 py-24 text-center">
        <div className="text-secondary text-sm">Loading…</div>
      </section>
    );
  }

  if (!currentAccount) {
    return (
      <Gate
        title="Sign in required"
        body="This area is for signed-in members. Please sign in to continue."
        cta={{ label: "Go to sign in", href: "/login" }}
      />
    );
  }

  if (roles && !roles.includes(currentAccount.role)) {
    return (
      <Gate
        title="You don't have access to this area"
        body="Your account doesn't have permission to view this page. If you think this is a mistake, contact a club officer."
        cta={{ label: "Back to portal", href: "/portal" }}
      />
    );
  }

  return <>{children}</>;
}

function Gate({
  title,
  body,
  cta,
}: {
  title: string;
  body: string;
  cta: { label: string; href: string };
}) {
  return (
    <section className="mx-auto max-w-[640px] px-6 py-24 text-center">
      <div className="text-gold text-[12px] font-semibold uppercase tracking-[0.22em] mb-4">
        Members area
      </div>
      <h1 className="display text-4xl text-navy">{title}</h1>
      <p className="mt-4 text-secondary leading-relaxed">{body}</p>
      <Link
        href={cta.href}
        className="mt-8 inline-block px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
      >
        {cta.label}
      </Link>
    </section>
  );
}
