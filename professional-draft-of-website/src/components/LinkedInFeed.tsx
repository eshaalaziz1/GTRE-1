"use client";

import Script from "next/script";

// Renders a SociableKit "LinkedIn Page Posts" widget, which auto-syncs the
// club's LinkedIn company feed. The embed id comes from the SociableKit snippet
// (<div class="sk-ww-linkedin-page-post" data-embed-id="XXXX">). The widget
// script scans the page for that div and injects the feed.
export default function LinkedInFeed({ embedId }: { embedId: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white p-2 sm:p-4">
      <div className="sk-ww-linkedin-page-post" data-embed-id={embedId} />
      <Script
        src="https://widgets.sociablekit.com/linkedin-page-posts/widget.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
