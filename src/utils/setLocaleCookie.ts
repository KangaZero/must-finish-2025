export function setLocaleCookie(locale: "en" | "ja") {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`; // 1 year
}
