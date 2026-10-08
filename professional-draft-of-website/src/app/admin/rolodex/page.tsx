"use client";

import { useMemo, useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, ConfirmDelete, EmptyState, Field, Notice, Select, TextArea } from "@/components/ui";
import type { RolodexProfile } from "@/lib/store/types";

const STATUSES: RolodexProfile["status"][] = ["Available", "Looking for opportunities", "Interning"];

export default function AdminRolodex() {
  const { state, addRolodexProfile } = useGtre();
  const [pickId, setPickId] = useState("");
  const [added, setAdded] = useState(false);

  // Approved student accounts that don't already have a Rolodex profile.
  const candidates = useMemo(
    () =>
      state.accounts.filter(
        (a) =>
          a.role === "student" &&
          a.status === "approved" &&
          !state.rolodexProfiles.some((r) => r.accountId === a.id),
      ),
    [state.accounts, state.rolodexProfiles],
  );

  const list = [...state.rolodexProfiles].sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  function onAdd(e: React.FormEvent) {
    e.preventDefault();
    const acct = candidates.find((a) => a.id === pickId);
    if (!acct) return;
    addRolodexProfile({ accountId: acct.id, name: acct.name, major: acct.major, gradYear: acct.gradYear });
    setPickId("");
    setAdded(true);
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Analyst Rolodex</h2>
        <p className="text-secondary mt-1">
          Add a member to the Rolodex, then they fill in and publish their own profile from{" "}
          <strong>Portal → Rolodex Profile</strong>. Nothing shows on the public directory until it's published.
        </p>
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-4">Add a member to the Rolodex</h3>
        {added && <Notice tone="success">Added. The member can now edit and publish their profile.</Notice>}
        {candidates.length === 0 ? (
          <p className="text-[14px] text-secondary">
            Every approved student member already has a Rolodex profile (or there are no approved student members
            yet).
          </p>
        ) : (
          <form onSubmit={onAdd} className="flex flex-wrap items-end gap-3">
            <div className="min-w-[260px] flex-1">
              <Select
                label="Member"
                value={pickId}
                onChange={setPickId}
                options={[
                  { value: "", label: "Select a member…" },
                  ...candidates.map((a) => ({ value: a.id, label: `${a.name} (${a.email})` })),
                ]}
              />
            </div>
            <Button type="submit" disabled={!pickId}>
              Add to Rolodex
            </Button>
          </form>
        )}
      </Card>

      <section>
        <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">Profiles ({list.length})</h3>
        {list.length === 0 ? (
          <EmptyState title="No one is on the Rolodex yet." />
        ) : (
          <div className="space-y-3">
            {list.map((r) => (
              <RolodexRow key={r.id} r={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function RolodexRow({ r }: { r: RolodexProfile }) {
  const { state, updateRolodexProfile, deleteRolodexProfile } = useGtre();
  const [editing, setEditing] = useState(false);
  const account = state.accounts.find((a) => a.id === r.accountId);

  if (editing) return <RolodexEditForm r={r} onDone={() => setEditing(false)} />;

  return (
    <Card>
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <Badge tone={r.published ? "green" : "gray"}>{r.published ? "Published" : "Not published"}</Badge>
            <Badge tone="gold">{r.status}</Badge>
          </div>
          <div className="font-semibold text-navy">{r.name}</div>
          <div className="text-[13px] text-secondary mt-0.5">
            {account?.email ?? "account removed"}
            {r.major ? ` · ${r.major}` : ""}
            {r.gradYear ? ` · Class of ${r.gradYear}` : ""}
          </div>
          <div className="text-[12px] text-secondary mt-1">/rolodex/directory/{r.slug}</div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => updateRolodexProfile(r.id, { published: !r.published })}
            className="text-[13px] font-semibold text-secondary hover:text-navy"
          >
            {r.published ? "Unpublish" : "Publish"}
          </button>
          <button onClick={() => setEditing(true)} className="text-[13px] font-semibold text-gold-hover hover:text-navy">
            Edit
          </button>
          <ConfirmDelete onConfirm={() => deleteRolodexProfile(r.id)} />
        </div>
      </div>
    </Card>
  );
}

function RolodexEditForm({ r, onDone }: { r: RolodexProfile; onDone: () => void }) {
  const { updateRolodexProfile } = useGtre();
  const [form, setForm] = useState({
    name: r.name,
    major: r.major,
    concentration: r.concentration,
    year: r.year,
    gradYear: r.gradYear != null ? String(r.gradYear) : "",
    hometown: r.hometown,
    status: r.status,
    disciplines: r.disciplines.join(", "),
    skills: r.skills.join(", "),
    summary: r.summary,
    bio: r.bio,
    experience: r.experience,
    linkedin: r.linkedin,
  });
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    updateRolodexProfile(r.id, {
      name: form.name,
      major: form.major,
      concentration: form.concentration,
      year: form.year,
      gradYear: form.gradYear ? Number(form.gradYear) : undefined,
      hometown: form.hometown,
      status: form.status,
      disciplines: form.disciplines.split(",").map((s) => s.trim()).filter(Boolean),
      skills: form.skills.split(",").map((s) => s.trim()).filter(Boolean),
      summary: form.summary,
      bio: form.bio,
      experience: form.experience,
      linkedin: form.linkedin,
    });
    onDone();
  }

  return (
    <Card>
      <form onSubmit={save} className="space-y-4">
        <div className="text-[13px] font-semibold text-navy">Edit Rolodex profile (admin override)</div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Name" value={form.name} onChange={(v) => set("name", v)} required />
          <Field label="Major" value={form.major} onChange={(v) => set("major", v)} />
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          <Field label="Concentration" value={form.concentration} onChange={(v) => set("concentration", v)} />
          <Field label="Year (Sophomore, etc.)" value={form.year} onChange={(v) => set("year", v)} />
          <Field label="Grad year" type="number" value={form.gradYear} onChange={(v) => set("gradYear", v)} />
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          <Field label="Hometown" value={form.hometown} onChange={(v) => set("hometown", v)} />
          <Select
            label="Status"
            value={form.status}
            onChange={(v) => set("status", v as RolodexProfile["status"])}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
          />
        </div>
        <Field label="Focus areas (comma-separated)" value={form.disciplines} onChange={(v) => set("disciplines", v)} />
        <Field label="Skills (comma-separated)" value={form.skills} onChange={(v) => set("skills", v)} />
        <TextArea label="Directory summary (short)" value={form.summary} onChange={(v) => set("summary", v)} rows={2} />
        <TextArea label="Full bio" value={form.bio} onChange={(v) => set("bio", v)} rows={4} />
        <TextArea label="Experience (short line shown on directory card)" value={form.experience} onChange={(v) => set("experience", v)} rows={2} />
        <Field label="LinkedIn URL" type="url" value={form.linkedin} onChange={(v) => set("linkedin", v)} />
        <div className="flex gap-2">
          <Button type="submit">Save changes</Button>
          <button type="button" onClick={onDone} className="px-4 py-2 text-[13px] font-semibold text-secondary hover:text-navy">
            Cancel
          </button>
        </div>
      </form>
    </Card>
  );
}
