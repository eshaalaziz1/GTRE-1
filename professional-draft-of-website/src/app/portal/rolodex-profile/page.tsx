"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Badge, Button, Card, EmptyState, Field, Notice, Select, TextArea } from "@/components/ui";
import type { RolodexCoursework, RolodexExperience, RolodexProfile } from "@/lib/store/types";

const STATUSES: RolodexProfile["status"][] = ["Available", "Looking for opportunities", "Interning"];

export default function RolodexProfilePage() {
  const { state, currentAccount } = useGtre();
  const me = currentAccount!;
  const profile = state.rolodexProfiles.find((r) => r.accountId === me.id);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Rolodex Profile</h2>
        <p className="text-secondary mt-1">
          What recruiters and alumni see about you in the Analyst Rolodex. Nothing is visible publicly until you
          publish it.
        </p>
      </div>

      {profile ? (
        <ProfileEditor profile={profile} />
      ) : (
        <EmptyState
          title="You're not on the Rolodex yet."
          body="A club officer adds members to the Rolodex. Once they add you, you'll be able to fill in and publish your profile here."
        />
      )}
    </div>
  );
}

function ProfileEditor({ profile }: { profile: RolodexProfile }) {
  const { updateRolodexProfile, setRolodexResume } = useGtre();
  const [form, setForm] = useState({
    major: profile.major,
    concentration: profile.concentration,
    year: profile.year,
    gradYear: profile.gradYear != null ? String(profile.gradYear) : "",
    hometown: profile.hometown,
    status: profile.status,
    disciplines: profile.disciplines.join(", "),
    skills: profile.skills.join(", "),
    summary: profile.summary,
    bio: profile.bio,
    experience: profile.experience,
    linkedin: profile.linkedin,
  });
  const [experiences, setExperiences] = useState<RolodexExperience[]>(profile.experiences);
  const [coursework, setCoursework] = useState<RolodexCoursework[]>(profile.coursework);
  const [saved, setSaved] = useState(false);
  const [resumeBusy, setResumeBusy] = useState(false);
  const [resumeError, setResumeError] = useState("");
  const set = <K extends keyof typeof form>(k: K, v: (typeof form)[K]) => setForm((f) => ({ ...f, [k]: v }));

  function save(e: React.FormEvent) {
    e.preventDefault();
    updateRolodexProfile(profile.id, {
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
      experiences: experiences.filter((e) => e.company.trim() || e.role.trim()),
      coursework: coursework.filter((c) => c.course.trim()),
    });
    setSaved(true);
  }

  async function onResumeChange(file: File | null) {
    if (!file) return;
    setResumeError("");
    setResumeBusy(true);
    const res = await setRolodexResume(profile.id, file);
    setResumeBusy(false);
    if (!res.ok) setResumeError(res.error || "Couldn't upload your resume.");
  }

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge tone={profile.published ? "green" : "gray"}>
              {profile.published ? "Published — visible on the Rolodex" : "Not published — only you and officers can see this"}
            </Badge>
          </div>
          <Button
            type="button"
            variant={profile.published ? "outline" : "gold"}
            onClick={() => updateRolodexProfile(profile.id, { published: !profile.published })}
          >
            {profile.published ? "Unpublish" : "Publish to Rolodex"}
          </Button>
        </div>
        <p className="text-[13px] text-secondary mt-3">
          Publishing is your consent to appear in the directory, shown to vetted alumni and recruiting partners.
          Unpublish any time to pull your profile down.
        </p>
      </Card>

      <Card>
        <form onSubmit={save} className="space-y-4">
          {saved && <Notice tone="success">Saved.</Notice>}
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Major" value={form.major} onChange={(v) => set("major", v)} />
            <Field label="Concentration" value={form.concentration} onChange={(v) => set("concentration", v)} placeholder="Real Estate Finance" />
          </div>
          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Year" value={form.year} onChange={(v) => set("year", v)} placeholder="Junior" />
            <Field label="Grad year" type="number" value={form.gradYear} onChange={(v) => set("gradYear", v)} />
            <Field label="Hometown" value={form.hometown} onChange={(v) => set("hometown", v)} />
          </div>
          <Select
            label="Status"
            value={form.status}
            onChange={(v) => set("status", v as RolodexProfile["status"])}
            options={STATUSES.map((s) => ({ value: s, label: s }))}
          />
          <Field
            label="Focus areas (comma-separated)"
            value={form.disciplines}
            onChange={(v) => set("disciplines", v)}
            placeholder="Acquisitions, Development, Capital Markets"
          />
          <Field label="Skills (comma-separated)" value={form.skills} onChange={(v) => set("skills", v)} placeholder="Argus, Excel, Financial Modeling" />
          <TextArea
            label="Directory summary (short, shown on your card)"
            value={form.summary}
            onChange={(v) => set("summary", v)}
            rows={2}
          />
          <TextArea label="Full bio" value={form.bio} onChange={(v) => set("bio", v)} rows={5} />
          <TextArea
            label="Experience (short line shown on your card)"
            value={form.experience}
            onChange={(v) => set("experience", v)}
            rows={2}
          />
          <Field label="LinkedIn URL" type="url" value={form.linkedin} onChange={(v) => set("linkedin", v)} placeholder="https://www.linkedin.com/in/you" />

          <ListEditor
            label="Work experience"
            items={experiences}
            onChange={setExperiences}
            empty={{ company: "", role: "", period: "" }}
            renderRow={(item, update) => (
              <div className="grid sm:grid-cols-3 gap-2">
                <input
                  value={item.company}
                  onChange={(e) => update({ ...item, company: e.target.value })}
                  placeholder="Company"
                  className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-navy"
                />
                <input
                  value={item.role}
                  onChange={(e) => update({ ...item, role: e.target.value })}
                  placeholder="Role"
                  className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-navy"
                />
                <input
                  value={item.period}
                  onChange={(e) => update({ ...item, period: e.target.value })}
                  placeholder="Summer 2026"
                  className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-navy"
                />
              </div>
            )}
          />

          <ListEditor
            label="Relevant coursework"
            items={coursework}
            onChange={setCoursework}
            empty={{ course: "", grade: "" }}
            renderRow={(item, update) => (
              <div className="grid sm:grid-cols-[1fr_120px] gap-2">
                <input
                  value={item.course}
                  onChange={(e) => update({ ...item, course: e.target.value })}
                  placeholder="Real Estate Finance"
                  className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-navy"
                />
                <input
                  value={item.grade}
                  onChange={(e) => update({ ...item, grade: e.target.value })}
                  placeholder="A"
                  className="px-3 py-2 border border-border rounded-lg text-sm outline-none focus:border-navy"
                />
              </div>
            )}
          />

          <Button type="submit">Save changes</Button>
        </form>
      </Card>

      <Card>
        <h3 className="font-semibold text-navy mb-2">Resume</h3>
        {resumeError && <Notice tone="error">{resumeError}</Notice>}
        {profile.resumeUrl && (
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="block text-[13px] text-gold-hover hover:text-navy underline mb-3">
            View current resume
          </a>
        )}
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          disabled={resumeBusy}
          onChange={(e) => onResumeChange(e.target.files?.[0] ?? null)}
          className="text-sm file:mr-3 file:px-3.5 file:py-2 file:rounded-lg file:border-0 file:bg-navy file:text-white file:text-sm file:font-semibold file:cursor-pointer"
        />
        {resumeBusy && <p className="text-[12px] text-secondary mt-2">Uploading…</p>}
      </Card>
    </div>
  );
}

function ListEditor<T>({
  label,
  items,
  onChange,
  empty,
  renderRow,
}: {
  label: string;
  items: T[];
  onChange: (items: T[]) => void;
  empty: T;
  renderRow: (item: T, update: (next: T) => void) => React.ReactNode;
}) {
  return (
    <div>
      <span className="text-[12px] font-semibold text-navy uppercase tracking-wide">{label}</span>
      <div className="mt-1.5 space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-2">
            <div className="flex-1">
              {renderRow(item, (next) => onChange(items.map((it, j) => (j === i ? next : it))))}
            </div>
            <button
              type="button"
              onClick={() => onChange(items.filter((_, j) => j !== i))}
              className="px-2 py-2 text-secondary hover:text-red-600 text-sm"
              aria-label="Remove"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => onChange([...items, empty])}
          className="text-[13px] font-semibold text-gold-hover hover:text-navy"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
