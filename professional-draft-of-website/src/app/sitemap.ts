import type { MetadataRoute } from "next";

const SITE_URL = "https://gtrealestate.org";

// Public marketing pages only, the portal/admin/auth routes are excluded via
// robots.ts and add no SEO value (private, gated content).
const PUBLIC_PATHS = [
  "",
  "/about",
  "/analyst-program",
  "/calendar",
  "/news",
  "/alumni",
  "/leadership",
  "/advisory-board",
  "/contact",
  "/events",
  "/rolodex",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PUBLIC_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
  }));
}
