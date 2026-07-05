"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Tabs } from "@/components/ui";
import type { Account } from "@/lib/store/types";

// One screen manages every account type. Filter tabs cover the "manage members",
// "approve/reject", "manage alumni", and "manage Companies & Recruiters" tasks.
type Filter = "pending" | "members" | "alumni" | "industry" | "all";

export default function MembersPage() {
  const { state } = useGtre();
  const [filter, setFilter] = useState<Filter>("pending");
  const [query, setQuery] = useState("");

  const counts = {
    pending: state.accounts.filter((a) => a.status === "pending").length,
    members: state.accounts.filter((a) => a.role === "student" && a.status === "approved" && !a.isAlumni).length,
    alumni: state.accounts.filter((a) => a.isAlumni).length,
    industry: state.accounts.filter((a) => a.role === "industry").length,
    all: state.accounts.length,
  };

  const matches = (a: Account) => {
    switch (filter) {
      case "pending":
        return a.status === "pending";
      case "members":
        return a.role === "student" && a.status === "approved" && !a.isAlumni;
      case "alumni":
        return !!a.isAlumni;
      case "industry":
        return a.role === "industry";
      case "all":
        return true;
    }
  };

  const q = query.trim().toLowerCase();
  const rows = state.accounts
    .filter(matches)
    .filter((a) => !q || a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q))
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <div className="space-y-6">
      <div>
        <h2 className="display text-3xl text-navy">Members &amp; Accounts</h2>
        <p className="text-secondary mt-1">
          Approve or reject new accounts, manage members, alumni, and industry partners, and set roles.
        </p>
      </div>

      <Tabs
        active={filter}
        onChange={(k) => setFilter(k as Filter)}
        tabs={[
          { key: "pending", label: `Pending (${counts.pending})` },
          { key: "members", label: `Members (${counts.members})` },
          { key: "alumni", label: `Alumni (${counts.alumni})` },
          { key: "industry", label: `Companies & Recruiters (${counts.industry})` },
          { key: "all", label: `All (${counts.all})` },
        ]}
      />

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search by name or email…"
        className="w-full max-w-sm px-3.5 py-2.5 border border-border rounded-lg text-sm outline-none focus:border-navy"
      />

      {rows.length === 0 ? (
        <EmptyState title="No accounts here." body="Nothing matches this filter yet." />
      ) : (
        <div className="space-y-3">
          {rows.map((a) => (
            <AccountRow key={a.id} account={a} />
          ))}
        </div>
      )}
    </div>
  );
}

function AccountRow({ account: a }: { account: Account }) {
  const { approveAccount, rejectAccount, deleteAccount, setRole, toggleAlumni } = useGtre();

  const statusTone = a.status === "approved" ? "green" : a.status === "pending" ? "amber" : "red";

  return (
    <Card>
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge tone={a.role === "industry" ? "gold" : a.role === "admin" ? "navy" : "gray"}>
              {a.role === "student" ? "Student" : a.role === "industry" ? "Industry" : "Admin"}
            </Badge>
            <Badge tone={statusTone}>{a.status}</Badge>
            {a.isAlumni && <Badge tone="gold">Alumni</Badge>}
          </div>
          <div className="font-semibold text-navy">{a.name}</div>
          <div className="text-[13px] text-secondary break-all">{a.email}</div>
          <div className="text-[13px] text-secondary mt-1 space-x-3">
            {a.company && <span>{a.company}</span>}
            {a.title && <span>· {a.title}</span>}
            {a.major && <span>{a.major}</span>}
            {a.gradYear && <span>· Class of {a.gradYear}</span>}
          </div>
          {a.linkedin && (
            <a href={a.linkedin} target="_blank" rel="noreferrer" className="text-[13px] font-semibold text-gold-hover hover:text-navy">
              LinkedIn ↗
            </a>
          )}
          <div className="text-[11px] text-secondary mt-1">
            Requested {new Date(a.createdAt).toLocaleDateString()}
            {a.approvedAt && ` · approved ${new Date(a.approvedAt).toLocaleDateString()}`}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          {a.status === "pending" && (
            <div className="flex gap-2">
              <Button variant="gold" onClick={() => approveAccount(a.id)}>
                Approve
              </Button>
              <Button variant="danger" onClick={() => rejectAccount(a.id)}>
                Reject
              </Button>
            </div>
          )}
          {a.status === "rejected" && (
            <Button variant="gold" onClick={() => approveAccount(a.id)}>
              Approve after all
            </Button>
          )}
          <div className="flex items-center gap-3 text-[13px]">
            {a.role !== "admin" && (
              <button onClick={() => setRole(a.id, "admin")} className="font-semibold text-secondary hover:text-navy">
                Make admin
              </button>
            )}
            {a.role === "admin" && (
              <button onClick={() => setRole(a.id, "student")} className="font-semibold text-secondary hover:text-navy">
                Remove admin
              </button>
            )}
            {a.role === "student" && (
              <button onClick={() => toggleAlumni(a.id)} className="font-semibold text-secondary hover:text-navy">
                {a.isAlumni ? "Unmark alumni" : "Mark alumni"}
              </button>
            )}
            <ConfirmDelete onConfirm={() => deleteAccount(a.id)} />
          </div>
        </div>
      </div>
    </Card>
  );
}
