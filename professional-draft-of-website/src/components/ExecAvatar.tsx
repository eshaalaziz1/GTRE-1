"use client";

import { useState } from "react";

/**
 * Headshot with a graceful fallback: tries to load the image at `src`, and if
 * the file isn't there yet (404), shows a clean initials avatar instead. This
 * lets us wire every exec member to /exec/<slug>.jpg up front — the photos
 * appear automatically the moment the files are added to /public/exec.
 */
export default function ExecAvatar({
  src,
  name,
  size = 150,
}: {
  src: string;
  name: string;
  size?: number;
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
        className="rounded-full bg-gold-soft text-navy flex items-center justify-center font-semibold shrink-0"
        style={{ width: size, height: size, fontSize: size * 0.32 }}
        aria-label={name}
      >
        {initials}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="rounded-full object-cover shrink-0"
      style={{ width: size, height: size }}
    />
  );
}
