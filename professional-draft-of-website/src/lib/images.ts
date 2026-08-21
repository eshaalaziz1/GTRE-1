// Swappable site images. Each slot is a named spot on the site whose photo an
// admin can replace from Admin → Images (upload) without touching code. Pages
// render these through <SiteImage slotKey=… defaultSrc=… />, which shows the
// admin's uploaded image when present and the bundled default otherwise.
//
// To make another image swappable: add a slot here and use <SiteImage> for it.

export type ImageSlot = {
  key: string;
  label: string;
  description?: string;
  /** Bundled fallback shown until an admin uploads a replacement. */
  defaultSrc: string;
};

export const IMAGE_SLOTS: ImageSlot[] = [
  {
    key: "home-mission",
    label: "Homepage, mission photo",
    description: "The large photo beside the mission on the homepage.",
    defaultSrc: "/photos/naiop-win.webp",
  },
  {
    key: "analyst-hero",
    label: "Analyst Program, hero photo",
    description: "The photo in the Analyst Program page header.",
    defaultSrc: "/photos/analyst-session.jpg",
  },
];
