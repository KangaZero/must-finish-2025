export function setLocaleCookie(locale: "en" | "ja") {
  if (typeof document === "undefined") return;
  if (locale !== "en" && locale !== "ja") return;
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // 1 year
}
