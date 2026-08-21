"use client";

import { useRef, useState } from "react";
import { useGtre } from "@/lib/store/GtreStore";
import { Button, Card, Notice } from "@/components/ui";
import { IMAGE_SLOTS, type ImageSlot } from "@/lib/images";

export default function AdminImages() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="display text-3xl text-navy">Images</h2>
        <p className="text-secondary mt-1">
          Swap the photos on key pages, upload a new image and it goes live for
          everyone. No code or GitHub needed.
        </p>
      </div>

      <div className="grid gap-6">
        {IMAGE_SLOTS.map((slot) => (
          <ImageSlotCard key={slot.key} slot={slot} />
        ))}
      </div>
    </div>
  );
}

function ImageSlotCard({ slot }: { slot: ImageSlot }) {
  const { state, setSiteImage, resetSiteImage } = useGtre();
  const inputRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ tone: "success" | "error"; text: string } | null>(null);

  const current = state.siteImages?.[slot.key];
  const src = current || slot.defaultSrc;

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setMsg({ tone: "error", text: "Please choose an image file." });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setMsg({ tone: "error", text: "Image is over 5 MB, please use a smaller file." });
      return;
    }
    setBusy(true);
    setMsg(null);
    const res = await setSiteImage(slot.key, file);
    setBusy(false);
    if (inputRef.current) inputRef.current.value = "";
    setMsg(res.ok ? { tone: "success", text: "Updated. The new image is live." } : { tone: "error", text: res.error || "Upload failed." });
  }

  return (
    <Card>
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full sm:w-64 shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={slot.label}
            className="w-full aspect-[3/2] object-cover rounded-lg border border-border"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-navy">{slot.label}</h3>
          {slot.description && <p className="text-[13px] text-secondary mt-1">{slot.description}</p>}
          <p className="text-[12px] text-secondary mt-2">
            {current ? "Showing a custom uploaded image." : "Showing the default image."}
          </p>

          {msg && (
            <div className="mt-3">
              <Notice tone={msg.tone}>{msg.text}</Notice>
            </div>
          )}

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              onChange={onFile}
              disabled={busy}
              className="hidden"
              id={`file-${slot.key}`}
            />
            <Button type="button" onClick={() => inputRef.current?.click()} disabled={busy}>
              {busy ? "Uploading…" : current ? "Replace image" : "Upload image"}
            </Button>
            {current && (
              <button
                type="button"
                onClick={() => {
                  resetSiteImage(slot.key);
                  setMsg({ tone: "success", text: "Reverted to the default image." });
                }}
                disabled={busy}
                className="text-sm font-semibold text-secondary hover:text-navy"
              >
                Reset to default
              </button>
            )}
          </div>
          <p className="text-[12px] text-secondary mt-3">JPG, PNG, or WebP · up to 5 MB.</p>
        </div>
      </div>
    </Card>
  );
}
