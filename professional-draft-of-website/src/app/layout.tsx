import type { Metadata } from "next";
import { Source_Sans_3, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import Footer from "@/components/Footer";
import AdminEditBar from "@/components/AdminEditBar";
import { GtreProvider } from "@/lib/store/GtreStore";
import { EditModeProvider } from "@/lib/editMode";

// Body text.
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

// Display face for the wordmark and headings, a professional serif that pairs
// with the Source Sans body.
const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  display: "swap",
});

const SITE_URL = "https://gtrealestate.org";
const SITE_DESCRIPTION =
  "The Georgia Tech Real Estate Club connects students, alumni, and industry through education, events, and a vetted analyst network.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Georgia Tech Real Estate Club",
    template: "%s | Georgia Tech Real Estate Club",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Georgia Tech Real Estate Club",
    "GT Real Estate",
    "GTRE",
    "Georgia Tech real estate",
    "real estate analyst program",
  ],
  // No `alternates.canonical` / `openGraph.url` here: every page on the site
  // shares this root metadata (all pages are client components with no
  // per-route metadata of their own), so a hardcoded URL here would claim
  // EVERY page's canonical is the homepage — which is exactly the kind of
  // thing that produces Search Console's "duplicate without user-selected
  // canonical" warning. Omitting them lets Google infer each page's own URL
  // as its canonical instead of being told the wrong one.
  openGraph: {
    type: "website",
    siteName: "Georgia Tech Real Estate Club",
    title: "Georgia Tech Real Estate Club",
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Georgia Tech Real Estate Club",
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${sourceSans.variable} ${sourceSerif.variable} antialiased`}>
        {/* Without JS, show scroll-reveal content immediately instead of hidden. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important;}`}</style>
        </noscript>
        <GtreProvider>
          <EditModeProvider>
            <SiteHeader />
            <main>{children}</main>
            <Footer />
            <AdminEditBar />
          </EditModeProvider>
        </GtreProvider>
      </body>
    </html>
  );
}
