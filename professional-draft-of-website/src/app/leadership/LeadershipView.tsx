"use client";

import { useState } from "react";
import ExecAvatar from "@/components/ExecAvatar";
import type { ExecMember, ExecTerm } from "@/lib/leadership";

// Semester switcher for the leadership page. Defaults to the newest term
// (Fall 2026) and reveals a selector once past semesters are added to
// EXEC_TERMS, so the landing view is always the current board.
export default function LeadershipView({ terms }: { terms: ExecTerm[] }) {
  const [active, setActive] = useState(terms[0]?.term ?? "");
  const term = terms.find((t) => t.term === active) ?? terms[0];
  if (!term) return null;

  const [president, ...rest] = term.members;

  return (
    <>
      {terms.length > 1 && (
        <section className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-6">
          <div className="flex flex-wrap gap-2">
            {terms.map((t) => (
              <button
                key={t.term}
                onClick={() => setActive(t.term)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-semibold border transition-colors ${
                  t.term === term.term
                    ? "bg-navy text-white border-navy"
                    : "border-border text-secondary hover:border-navy hover:text-navy"
                }`}
              >
                {t.term}
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10 py-10">
        <div className="flex items-center gap-4 mb-8">
          <h2 className="display text-3xl text-navy">{term.term}</h2>
          <div className="flex-1 border-t border-gold" />
          <span className="text-[13px] font-semibold uppercase tracking-[0.18em] text-gold-hover">
            Executive Board
          </span>
        </div>

        {/* President — featured wide card */}
        {president && <PresidentCard member={president} />}

        {/* The rest of the board */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {rest.map((m) => (
            <ExecCard key={m.slug} member={m} />
          ))}
        </div>
      </section>
    </>
  );
}

function PresidentCard({ member }: { member: ExecMember }) {
  return (
    <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-7 flex flex-col sm:flex-row items-center sm:items-start gap-7">
      <ExecAvatar src={member.photo} name={member.name} size={168} focus={member.focus} zoom={member.zoom} />
      <div className="text-center sm:text-left">
        <div className="text-[12px] font-semibold uppercase tracking-[0.2em] text-gold-hover mb-1">
          {member.role}
        </div>
        <h3 className="text-2xl font-bold text-navy">{member.name}</h3>
        <p className="text-[15px] text-secondary leading-relaxed mt-3 max-w-2xl">{member.bio}</p>
      </div>
    </div>
  );
}

function ExecCard({ member }: { member: ExecMember }) {
  return (
    <div className="bg-white border border-border border-t-4 border-t-navy rounded-b-2xl shadow-[0_8px_16px_rgba(0,0,0,0.08)] p-6 flex flex-col items-center text-center">
      <ExecAvatar src={member.photo} name={member.name} size={132} focus={member.focus} zoom={member.zoom} />
      <h3 className="mt-4 text-[17px] font-bold text-navy">{member.name}</h3>
      <div className="text-[14px] italic text-gold-hover mt-0.5">{member.role}</div>
      <p className="text-[14px] text-secondary leading-relaxed mt-3">{member.bio}</p>
    </div>
  );
}
