import { NextResponse, type NextRequest } from "next/server";
import { getLocaleCookieFromClient } from "./utils/getLocaleCookie";
import type { Locale } from "./lib/i18n";

const locales: Locale[] = ["en", "ja"];

export function proxy(request: NextRequest) {
  // Check if there is any supported locale in the pathname
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (!pathnameHasLocale)
    return console.warn(
      "No locale in pathname or it does not match accepted locales",
    );

  const locale = getLocaleCookieFromClient();
  request.nextUrl.pathname = locale
    ? `/${locale}/${pathname}`
    : `/en/${pathname}`;
  // e.g. incoming request is /products
  // The new URL is now /en-US/products
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!api|_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
