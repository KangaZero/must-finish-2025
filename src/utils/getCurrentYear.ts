/**
 *
 * @param locale - The locale code ("en" or "ja").
 * @returns If @locale is "ja", returns the current year in the Japanese calendar system (Reiwa era).
 */
// NOTE: Cannot import type Locale as this function is directly used for where type Locale references.
const getCurrentYear = (locale: "en" | "ja"): number => {
  if (locale === "ja") {
    return new Date().getFullYear() - 2019; // Japanese calendar year (Reiwa era started in 2019)
  } else {
    return new Date().getFullYear();
  }
};

export { getCurrentYear };
