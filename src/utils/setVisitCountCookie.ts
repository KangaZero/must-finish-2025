/**
 * Sets a cookie to track the number of visits.
 * If visits is provided, it sets the cookie to that value, else it sets it to 1.
 * @param @optional visits
 * @returns void
 */
export function setVisitCountCookie(visits?: number) {
  if (typeof document === "undefined") return;
  if (visits) {
    document.cookie = `VISIT_COUNT=${visits}; path=/; max-age=31536000`; // 1 year
  } else {
    document.cookie = `VISIT_COUNT=1; path=/; max-age=31536000`; // 1 year
  }
}
