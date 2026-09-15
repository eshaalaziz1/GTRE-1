import type { MetadataRoute } from "next";

const SITE_URL = "https://gtrealestate.org";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Portal/admin/auth pages are private and gated behind sign-in; no
        // reason for search engines to crawl or index them.
        disallow: ["/portal", "/portal/", "/admin", "/admin/", "/login", "/signup", "/forgot-password", "/reset-password"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
