export const LANG_COOKIE = "site-lang";
export const locales = ["en", "bn"] as const;

export type Locale = (typeof locales)[number];

export function normalizeLocale(value?: string | null): Locale {
  return value === "bn" ? "bn" : "en";
}

export function t(locale: Locale, english: string, bangla: string) {
  return locale === "bn" ? bangla : english;
}

export function getIntlLocale(locale: Locale) {
  return locale === "bn" ? "bn-BD" : "en-US";
}
