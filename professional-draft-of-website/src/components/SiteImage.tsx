"use client";

import { useGtre } from "@/lib/store/GtreStore";

/**
 * A framed photo whose source an admin can swap from Admin → Images. Reads the
 * uploaded image for `slotKey` from the store and falls back to `defaultSrc`.
 *
 * Uses a plain <img> (not next/image) on purpose: the source may be an arbitrary
 * Supabase Storage URL or a data URL, which next/image would reject without host
 * config. Mirrors PhotoSlot's framing so it drops in anywhere a photo goes.
 */
export default function SiteImage({
  slotKey,
  defaultSrc,
  alt,
  ratio = "aspect-[3/2]",
  className = "",
  imgClassName = "",
}: {
  slotKey: string;
  defaultSrc: string;
  alt: string;
  ratio?: string;
  className?: string;
  imgClassName?: string;
}) {
  const { state } = useGtre();
  const src = state.siteImages?.[slotKey] || defaultSrc;
  return (
    <div className={`relative ${ratio} overflow-hidden rounded-br-[2rem] ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} className={`absolute inset-0 w-full h-full object-cover ${imgClassName}`} />
    </div>
  );
}
