import type { MetadataRoute } from "next";

// Canonical public domain — must match the sitemap host.
const BASE_URL = "https://www.gtrealestate.org";

// Allow crawling of the public site, but keep authenticated / private / utility
// areas out of the index. No `noindex` is introduced anywhere; these Disallow
// rules only ask crawlers not to fetch the listed subtrees.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin", // admin console
          "/portal", // member portal
          "/rolodex", // member-only Analyst Rolodex (gateway + directory)
          "/opportunities", // redirects into /portal
          "/login",
          "/forgot-password",
          "/reset-password",
          "/search", // query utility, no stable content
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
