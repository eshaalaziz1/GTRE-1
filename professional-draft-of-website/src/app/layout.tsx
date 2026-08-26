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

export const metadata: Metadata = {
  title: "Georgia Tech Real Estate Club",
  description:
    "The Georgia Tech Real Estate Club connects students, alumni, and industry through education, events, and a vetted analyst network.",
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
