import Breadcrumb from "@/components/Breadcrumb";
import SiteText from "@/components/SiteText";
import LinkedInFeed from "@/components/LinkedInFeed";
import { LINKEDIN_URL, LINKEDIN_POSTS, SOCIABLEKIT_EMBED_ID } from "@/lib/linkedin";

export const metadata = { title: "News | GT Real Estate Club" };

export default function NewsPage() {
  return (
    <>
      <Breadcrumb trail={[{ label: "News" }]} />

      <div className="mx-auto max-w-[1280px] px-6 lg:px-10 pt-4 pb-16">
        <div className="mb-8">
          <h1 className="display text-4xl lg:text-5xl text-navy mb-3"><SiteText slotKey="news-title">News</SiteText></h1>
          <p className="text-secondary max-w-2xl">
            <SiteText slotKey="news-intro">Event recaps, member news, and recruiting updates, straight from our LinkedIn.</SiteText>
          </p>
        </div>

        {SOCIABLEKIT_EMBED_ID ? (
          <LinkedInFeed embedId={SOCIABLEKIT_EMBED_ID} />
        ) : LINKEDIN_POSTS.length === 0 ? (
          <FollowPanel />
        ) : (
          // Masonry-style columns so variable-height post embeds pack cleanly.
          <div className="[column-fill:_balance] columns-1 gap-6 md:columns-2 xl:columns-3">
            {LINKEDIN_POSTS.map((p, i) => (
              <div
                key={p.url}
                className="mb-6 break-inside-avoid overflow-hidden rounded-xl border border-border bg-white shadow-sm"
              >
                <iframe
                  src={p.url}
                  title={`Georgia Tech Real Estate Club LinkedIn post ${i + 1}`}
                  className="w-full"
                  height={p.tall ? 720 : 560}
                  frameBorder="0"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function FollowPanel() {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-surface">
      <div className="max-w-xl mx-auto text-center py-20 px-6">
        <div className="w-16 h-16 rounded-2xl bg-navy flex items-center justify-center mx-auto mb-6">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="#ffffff" aria-hidden="true">
            <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
          </svg>
        </div>
        <h2 className="display text-2xl text-navy">Follow us on LinkedIn</h2>
        <p className="text-secondary mt-3 leading-relaxed">
          Our latest posts, from event recaps to recruiting news and member
          highlights, live on LinkedIn and appear here as they&apos;re
          published. Follow the club to stay in the loop.
        </p>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-block px-6 py-3 rounded-md bg-navy text-white text-sm font-semibold hover:bg-navy-deep transition-colors"
        >
          Visit our LinkedIn →
        </a>
      </div>
    </div>
  );
}
