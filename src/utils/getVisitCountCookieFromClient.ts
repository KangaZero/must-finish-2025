/**
 * Gets the visit count from the VISIT_COUNT cookie on the client side.
 * Returns undefined if the cookie is not set, not a number, or is invalid.
 */
export function getVisitCountCookieFromClient() {
  if (!document) return;
  const match = document.cookie.match(/(?:^|; )VISIT_COUNT=([^;]*)/);
  //WARNING: The user can manually change the cookie, so to make sure no funny business happens this check is added
  return match
    ? typeof parseInt(match[1], 10) === "number"
      ? parseInt(match[1], 10)
      : undefined
    : undefined;
}
