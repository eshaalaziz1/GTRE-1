// LinkedIn presence for the News page.
//
// The News page renders these posts as LinkedIn's own live embeds, so they stay
// in sync with LinkedIn and show the authentic post (text, images, reactions).
//
// TO ADD A POST: on the post in LinkedIn, click the "..." menu -> "Embed this
// post", copy the src URL from the <iframe> (it looks like
// https://www.linkedin.com/embed/feed/update/urn:li:share:1234567890), and add
// it below. Newest first. Set `tall: true` for image/长 posts that need more room.

export const LINKEDIN_URL = "https://www.linkedin.com/company/georgiatechrealestate/";

// SociableKit "LinkedIn Page Posts" widget — auto-syncs the whole company feed.
// From the embed snippet, copy the value of data-embed-id here
// (<div class="sk-ww-linkedin-page-post" data-embed-id="XXXXXXX">). When set, the
// News page shows the live auto-updating feed; when empty it falls back to the
// manual embeds below, then to the Follow panel.
export const SOCIABLEKIT_EMBED_ID = "25701946";

export type LinkedInPost = { url: string; tall?: boolean };

export const LINKEDIN_POSTS: LinkedInPost[] = [
  // Example (replace with real embed URLs):
  // { url: "https://www.linkedin.com/embed/feed/update/urn:li:share:7000000000000000000", tall: true },
];
