"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { MAIN_NAV, UTILITY_NAV } from "@/lib/nav";

/**
 * Two-row institutional header, faithful to the Wisconsin / Graaskamp pattern:
 *  Row 1 (white): logo lockup left · utility links + search right
 *  Row 2 (white, ruled): brand label left · section nav right
 * Re-skinned to Georgia Tech (navy / gold). Collapses to a toggle on mobile.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="bg-white border-b border-border">
      {/* Row 1 */}
      <div className="border-b border-border">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8 h-[88px] flex items-center justify-between">
          <Link href="/about" className="flex items-center shrink-0">
            <Image
              src="/gtre-logo.png"
              alt="Georgia Tech Real Estate Club"
              width={1450}
              height={340}
              priority
              className="h-12 w-auto"
            />
          </Link>

          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-6">
              {UTILITY_NAV.map((u) => (
                <Link
                  key={u.label}
                  href={u.href}
                  className="text-[15px] font-semibold text-text hover:text-navy transition-colors whitespace-nowrap"
                >
                  {u.label}
                </Link>
              ))}
            </nav>
            <button aria-label="Search" className="text-gold-hover hover:text-navy transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <circle cx="11" cy="11" r="7" />
                <line x1="21" y1="21" x2="16.5" y2="16.5" />
              </svg>
            </button>
            <button
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden flex flex-col gap-1.5 p-1"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-navy" />
              <span className="block w-6 h-0.5 bg-navy" />
              <span className="block w-6 h-0.5 bg-navy" />
            </button>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-[1320px] px-6 lg:px-8 h-[52px] flex items-center gap-8">
          <nav className="flex items-center gap-7">
            {MAIN_NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-[15px] transition-colors ${
                  isActive(item.href)
                    ? "text-navy font-semibold"
                    : "text-text hover:text-navy"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
      <div className="h-[3px] bg-gold" />

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden border-t border-border bg-white">
          {[...UTILITY_NAV, ...MAIN_NAV].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`block px-6 py-3 text-sm font-semibold border-b border-border ${
                isActive(item.href) ? "text-navy bg-surface" : "text-text"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
