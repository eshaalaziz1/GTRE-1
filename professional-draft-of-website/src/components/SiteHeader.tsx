"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { MAIN_NAV, UTILITY_NAV } from "@/lib/nav";
import { useGtre } from "@/lib/store/GtreStore";

/**
 * Two-row institutional header in the Georgia Tech palette (navy / gold):
 *  Row 1 (white): logo lockup left · utility links + member area + search right
 *  Row 2 (white, ruled): brand label left · section nav right
 * Collapses to a toggle on mobile.
 */
export default function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const { currentAccount, logout } = useGtre();

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    const q = searchQ.trim();
    router.push(q ? `/search?q=${encodeURIComponent(q)}` : "/search");
    setSearchOpen(false);
    setSearchQ("");
  }
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

            {/* Member area */}
            <div className="hidden md:flex items-center gap-3">
              {currentAccount ? (
                <>
                  <Link
                    href={currentAccount.role === "admin" ? "/admin" : "/portal"}
                    className="text-[15px] font-semibold text-navy hover:text-navy-deep whitespace-nowrap"
                  >
                    {currentAccount.role === "admin" ? "Admin" : "My Portal"}
                  </Link>
                  <button
                    onClick={logout}
                    className="text-[13px] font-semibold text-secondary hover:text-navy whitespace-nowrap"
                  >
                    Sign out
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-md bg-navy text-white text-[14px] font-semibold hover:bg-navy-deep transition-colors whitespace-nowrap"
                >
                  Member Login
                </Link>
              )}
            </div>

            {searchOpen ? (
              <form onSubmit={submitSearch} className="hidden sm:flex items-center">
                <input
                  autoFocus
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  onBlur={() => !searchQ && setSearchOpen(false)}
                  placeholder="Search…"
                  className="w-44 px-3 py-1.5 border border-border rounded-md text-sm outline-none focus:border-navy"
                />
                <button type="submit" aria-label="Search" className="ml-1 text-gold-hover hover:text-navy">
                  <SearchIcon />
                </button>
              </form>
            ) : (
              <button
                aria-label="Search"
                onClick={() => setSearchOpen(true)}
                className="text-gold-hover hover:text-navy transition-colors"
              >
                <SearchIcon />
              </button>
            )}
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
          <form onSubmit={submitSearch} className="p-3 border-b border-border">
            <input
              value={searchQ}
              onChange={(e) => setSearchQ(e.target.value)}
              placeholder="Search the site…"
              className="w-full px-3 py-2 border border-border rounded-md text-sm outline-none focus:border-navy"
            />
          </form>
          {[...MAIN_NAV, ...UTILITY_NAV].map((item) => (
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
          {currentAccount ? (
            <>
              <Link
                href={currentAccount.role === "admin" ? "/admin" : "/portal"}
                onClick={() => setOpen(false)}
                className="block px-6 py-3 text-sm font-semibold border-b border-border text-navy bg-surface"
              >
                {currentAccount.role === "admin" ? "Admin Portal" : "My Portal"}
              </Link>
              <button
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="block w-full text-left px-6 py-3 text-sm font-semibold border-b border-border text-secondary"
              >
                Sign out
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm font-semibold border-b border-border text-navy bg-surface"
            >
              Member Login
            </Link>
          )}
        </nav>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.5" y2="16.5" />
    </svg>
  );
}
