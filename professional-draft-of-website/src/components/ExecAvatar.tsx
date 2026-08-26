"use client";

import { useState } from "react";

/**
 * Circular headshot that centers each person's face regardless of how their
 * photo was framed (portrait, square, or landscape). `focus` sets the crop's
 * focal point (CSS object-position / transform-origin) and `zoom` tightens the
 * crop, so a face that sits high or off-center is pulled to the middle of the
 * circle. Falls back to an initials avatar if the image file is missing.
 */
export default function ExecAvatar({
  src,
  name,
  size = 150,
  focus = "50% 30%",
  zoom = 1,
}: {
  src: string;
  name: string;
  size?: number;
  focus?: string;
  zoom?: number;
}) {
  const [failed, setFailed] = useState(false);

  const initials = name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");

  if (failed) {
    return (
      <div
        className="rounded-full bg-gold-soft text-navy flex items-center justify-center font-semibold shrink-0 ring-1 ring-navy/15 shadow-[0_1px_4px_rgba(0,0,0,0.10)]"
        style={{ width: size, height: size, fontSize: size * 0.32 }}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  return (
    <div
      className="rounded-full overflow-hidden bg-gold-soft shrink-0 ring-1 ring-navy/15 shadow-[0_1px_4px_rgba(0,0,0,0.10)]"
      style={{ width: size, height: size }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={name}
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
        style={{ objectPosition: focus, transform: `scale(${zoom})`, transformOrigin: focus }}
      />
    </div>
  );
}
