import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOWED_ORIGINS = [
  "https://www.reatgt.org",
  "https://reatgt.org",
];

const EMBED_TOKEN = "45d741baddf0eb2ddbd5d9e2b7a66d3a7ba7df68ae06dfc0347cd73dd7655ff5";

function isAllowedOrigin(origin: string | null, referer: string | null): boolean {
  const source = origin || referer || "";
  return ALLOWED_ORIGINS.some((allowed) => source.startsWith(allowed));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow static assets, unauthorized page, and API routes
  if (
    pathname === "/unauthorized" ||
    pathname === "/" ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api")
  ) {
    return NextResponse.next();
  }

  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");

  // Check 1: Allow if embedded from Wix site
  if (isAllowedOrigin(origin, referer)) {
    const response = NextResponse.next();
    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors https://www.reatgt.org https://reatgt.org"
    );
    return response;
  }

  // Check 2: Allow if valid auth token present in URL
  const url = new URL(request.url);
  const authParam = url.searchParams.get("auth");
  if (authParam === EMBED_TOKEN) {
    const response = NextResponse.next();
    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors https://www.reatgt.org https://reatgt.org"
    );
    return response;
  }

  // Block: redirect to unauthorized
  return NextResponse.redirect(new URL("/unauthorized", request.url));
}

export const config = {
  matcher: ["/dashboard/:path*", "/newsletters/:path*"],
};
