import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const localeCookie = request.cookies.get("NEXT_LOCALE")?.value;
  const url = request.nextUrl;
  //NOTE: Do not redirect requests for static assets
  if (url.pathname.match(/\.(svg|jpg|jpeg|png|gif|mp4|webp|ico)$/)) {
    return NextResponse.next();
  }
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
