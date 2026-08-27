"use client";

import { useRef, useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { useEditMode } from "@/lib/editMode";

/**
 * A framed photo whose source an admin can swap. Reads the uploaded image for
 * `slotKey` from the store and falls back to `defaultSrc`.
 *
 * When an admin turns on Edit mode, a "Change photo" overlay appears on the image
 * so it can be replaced right on the page (uploads to Supabase Storage in
 * production; a data URL in the demo). Members never see edit controls.
 *
 * Uses a plain <img> (not next/image) on purpose: the source may be an arbitrary
 * Supabase Storage URL or a data URL, which next/image would reject.
 */
export default function SiteImage({
  slotKey,
  defaultSrc,
  alt,
  ratio = "aspect-[3/2]",
  rounded = "rounded-br-[2rem]",
  className = "",
  imgClassName = "",
}: {
  slotKey: string;
  defaultSrc: string;
  alt: string;
  ratio?: string;
  rounded?: string;
  className?: string;
  imgClassName?: string;
}) {
  const { state, currentAccount, setSiteImage, resetSiteImage } = useGtre();
  const { editMode } = useEditMode();
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const overridden = !!state.siteImages?.[slotKey];
  const src = state.siteImages?.[slotKey] || defaultSrc;
  const canEdit = editMode && currentAccount?.role === "admin";

  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    setErr("");
    setBusy(true);
    const res = await setSiteImage(slotKey, file);
    setBusy(false);
    if (!res.ok) setErr(res.error || "Upload failed.");
  }

  return (
    <div className={`relative ${ratio} overflow-hidden ${rounded} ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`} />

      {canEdit && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-navy/45">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={busy}
            className="px-4 py-2 rounded-md bg-white text-navy text-[13px] font-semibold shadow disabled:opacity-60"
          >
            {busy ? "Uploading…" : "Change photo"}
          </button>
          {overridden && (
            <button onClick={() => resetSiteImage(slotKey)} className="text-white text-[12px] underline">
              Reset to default
            </button>
          )}
          {err && <div className="text-[11px] text-white bg-red-600/80 px-2 py-0.5 rounded">{err}</div>}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onPick} />
        </div>
      )}
    </div>
  );
}
