"use client";

import { useRef, useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { useEditMode } from "@/lib/editMode";

// Circular headshot with an initials fallback when no photo is on file. When
// `slotKey` is given and an admin is in Edit mode, a "Change photo" overlay lets
// them swap the photo in place (stored per person in siteImages).
export default function Avatar({
  name,
  photo,
  size = 120,
  slotKey,
}: {
  name: string;
  photo: string | null;
  size?: number;
  slotKey?: string;
}) {
  const { state, currentAccount, setSiteImage, resetSiteImage } = useGtre();
  const { editMode } = useEditMode();
  const [failed, setFailed] = useState(false);
  const [busy, setBusy] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const override = slotKey ? state.siteImages?.[slotKey] : undefined;
  const shownSrc = override || photo || "";
  const canEdit = !!slotKey && editMode && currentAccount?.role === "admin";

  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !slotKey) return;
    setBusy(true);
    await setSiteImage(slotKey, file);
    setBusy(false);
    setFailed(false);
  }

  return (
    <div
      className="relative rounded-full overflow-hidden bg-gold-soft text-navy flex items-center justify-center font-semibold ring-1 ring-navy/15 shadow-[0_1px_4px_rgba(0,0,0,0.10)]"
      style={{ width: size, height: size, fontSize: size * 0.34 }}
    >
      {shownSrc && !failed ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={shownSrc}
          alt={name}
          onError={() => setFailed(true)}
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <span>{initials}</span>
      )}

      {canEdit && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-navy/45">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="px-2.5 py-1 rounded bg-white text-navy text-[11px] font-semibold shadow disabled:opacity-60"
          >
            {busy ? "…" : "Change"}
          </button>
          {override && (
            <button onClick={() => resetSiteImage(slotKey!)} className="text-white text-[10px] underline">
              Reset
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
        </div>
      )}
    </div>
  );
}
