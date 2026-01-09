import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  const url = request.nextUrl;

  // Example: redirect to locale-prefixed path if cookie is set and not already in path
  if (
    localeCookie &&
    !url.pathname.startsWith(`/${localeCookie}`) &&
    url.pathname === "/"
  ) {
    url.pathname = `/${localeCookie}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
