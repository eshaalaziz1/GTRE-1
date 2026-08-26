"use client";

import { useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { textValue, TEXT_SLOTS } from "@/lib/siteText";
import { useEditMode } from "@/lib/editMode";

/**
 * Renders an admin-editable piece of copy (see src/lib/siteText.ts). Shows the
 * admin's saved text for `slotKey` when set, otherwise the slot's default. Emits
 * just the text so it can drop inside any tag (<h1>, <p>, …).
 *
 * When an admin turns on Edit mode (floating bar), the text becomes click-to-edit
 * right on the page. Members and signed-out visitors always see plain text.
 */
export default function SiteText({ slotKey }: { slotKey: string }) {
  const { state, currentAccount, setSiteText } = useGtre();
  const { editMode } = useEditMode();
  const [editing, setEditing] = useState(false);

  const value = textValue(state.siteText, slotKey);
  const canEdit = editMode && currentAccount?.role === "admin";

  if (!canEdit) return <>{value}</>;

  return (
    <>
      <span
        role="button"
        tabIndex={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setEditing(true);
        }}
        title="Click to edit"
        className="cursor-text rounded-sm bg-gold/15 outline-dashed outline-1 outline-gold/70 px-0.5 hover:bg-gold/25 transition-colors"
      >
        {value}
      </span>
      {editing && (
        <SiteTextEditor slotKey={slotKey} value={value} onSave={(v) => setSiteText(slotKey, v)} onClose={() => setEditing(false)} />
      )}
    </>
  );
}

function SiteTextEditor({
  slotKey,
  value,
  onSave,
  onClose,
}: {
  slotKey: string;
  value: string;
  onSave: (v: string) => void;
  onClose: () => void;
}) {
  const slot = TEXT_SLOTS.find((s) => s.key === slotKey);
  const [draft, setDraft] = useState(value);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 p-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-xl bg-white p-5 shadow-xl text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-[13px] font-semibold text-navy mb-2">Edit {slot?.label ?? slotKey}</div>
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          rows={slot?.multiline ? 6 : 2}
          autoFocus
          className="w-full border border-border rounded-lg p-3 text-sm text-text outline-none focus:border-navy resize-y"
        />
        <div className="flex items-center justify-between mt-3">
          <button
            onClick={() => { onSave(""); onClose(); }}
            className="text-[13px] text-secondary hover:text-navy"
          >
            Reset to default
          </button>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3 py-1.5 text-[13px] font-semibold text-secondary hover:text-navy">
              Cancel
            </button>
            <button
              onClick={() => { onSave(draft); onClose(); }}
              className="px-4 py-1.5 rounded-md bg-navy text-white text-[13px] font-semibold hover:bg-navy-deep transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
