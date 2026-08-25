"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Card, Field, TextArea } from "@/components/ui";
import { TEXT_SLOTS, textValue, type TextSlot } from "@/lib/siteText";

export default function AdminContent() {
  const groups = Array.from(new Set(TEXT_SLOTS.map((s) => s.group)));
  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Content</h2>
        <p className="text-secondary mt-1">
          Edit page titles, headers, and intro copy across the site, no code needed.
          Changes go live for everyone. Leave a field blank and save to restore the
          original text.
        </p>
      </div>

      {groups.map((g) => (
        <section key={g}>
          <h3 className="text-sm font-semibold text-navy uppercase tracking-wide mb-3">{g}</h3>
          <div className="space-y-4">
            {TEXT_SLOTS.filter((s) => s.group === g).map((slot) => (
              <SlotEditor key={slot.key} slot={slot} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function SlotEditor({ slot }: { slot: TextSlot }) {
  const { state, setSiteText } = useGtre();
  const current = textValue(state.siteText, slot.key);
  const [val, setVal] = useState(current);
  const [saved, setSaved] = useState(false);
  const hasOverride = Boolean(state.siteText?.[slot.key]);
  const dirty = val !== current;

  return (
    <Card>
      {slot.multiline ? (
        <TextArea
          label={slot.label}
          value={val}
          onChange={(v) => {
            setVal(v);
            setSaved(false);
          }}
          rows={3}
        />
      ) : (
        <Field
          label={slot.label}
          value={val}
          onChange={(v) => {
            setVal(v);
            setSaved(false);
          }}
        />
      )}
      <div className="mt-3 flex items-center gap-4">
        <Button
          type="button"
          onClick={() => {
            setSiteText(slot.key, val);
            setSaved(true);
          }}
          disabled={!dirty}
        >
          Save
        </Button>
        {hasOverride && (
          <button
            type="button"
            onClick={() => {
              setSiteText(slot.key, "");
              setVal(slot.defaultValue);
              setSaved(true);
            }}
            className="text-sm font-semibold text-secondary hover:text-navy"
          >
            Reset to default
          </button>
        )}
        {saved && !dirty && <span className="text-[13px] font-semibold text-green-600">Saved</span>}
      </div>
    </Card>
  );
}
