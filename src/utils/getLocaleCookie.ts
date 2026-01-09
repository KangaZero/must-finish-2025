// import { IncomingMessage } from "http";

// export function getLocaleCookieFromServer(req: IncomingMessage) {
//   const cookie = req.headers.cookie || "";
//   const match = cookie.match(/NEXT_LOCALE=([^;]+)/);
//   return match ? (match[1] as "ja" | "en") : undefined;
// }

export function getLocaleCookieFromClient() {
  const match = document.cookie.match(/(?:^|; )NEXT_LOCALE=([^;]*)/);
  return match ? (match[1] as "ja" | "en") : undefined;
}
