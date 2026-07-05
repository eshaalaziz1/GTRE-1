"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import Avatar from "@/components/Avatar";
import { Badge, Button, Card, Field, Notice } from "@/components/ui";

export default function ProfilePage() {
  const { state, currentAccount } = useGtre();
  const me = currentAccount!;

  const mySubs = state.submissions.filter((s) => s.accountId === me.id);
  const myCheckIns = state.checkIns.filter((c) => c.accountId === me.id);

  // Profile edits are local to this prototype (no store action needed yet).
  // With Supabase, wire these to an `updateProfile` mutation.
  const [major, setMajor] = useState(me.major ?? "");
  const [gradYear, setGradYear] = useState(me.gradYear?.toString() ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Profile</h2>
        <p className="text-secondary mt-1">Your account details and club activity.</p>
      </div>

      <Card>
        <div className="flex items-center gap-4">
          <Avatar name={me.name} photo={null} size={72} />
          <div>
            <h3 className="text-xl font-semibold text-navy">{me.name}</h3>
            <div className="text-secondary text-sm">{me.email}</div>
            <div className="flex items-center gap-2 mt-2">
              <Badge tone="navy">{me.role === "student" ? "Member" : me.role}</Badge>
              <Badge tone="green">{me.status}</Badge>
              {me.isAlumni && <Badge tone="gold">Alumni</Badge>}
            </div>
          </div>
        </div>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <h3 className="font-semibold text-navy mb-4">Academic details</h3>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSaved(true);
            }}
            className="space-y-4"
          >
            {saved && <Notice tone="success">Saved (local to this prototype).</Notice>}
            <Field label="Major" value={major} onChange={setMajor} placeholder="Business Administration" />
            <Field label="Graduation year" type="number" value={gradYear} onChange={setGradYear} placeholder="2027" />
            <Button type="submit" variant="outline">
              Save changes
            </Button>
          </form>
        </Card>

        <Card>
          <h3 className="font-semibold text-navy mb-4">Your activity</h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-secondary">Assignments submitted</dt>
              <dd className="font-semibold text-navy">{mySubs.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-secondary">Graded</dt>
              <dd className="font-semibold text-navy">{mySubs.filter((s) => s.grade != null).length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-secondary">Events attended</dt>
              <dd className="font-semibold text-navy">{myCheckIns.length}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-secondary">Member since</dt>
              <dd className="font-semibold text-navy">{new Date(me.createdAt).toLocaleDateString()}</dd>
            </div>
          </dl>
        </Card>
      </div>
    </div>
  );
}
