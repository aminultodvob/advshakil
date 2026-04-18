import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { getIntlLocale, type Locale } from "@/lib/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string, locale: Locale = "en") {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    day: "numeric",
    month: "long",
    year: "numeric"
  }).format(value);
}

export function formatTime(date: Date | string, locale: Locale = "en") {
  const value = typeof date === "string" ? new Date(date) : date;
  return new Intl.DateTimeFormat(getIntlLocale(locale), {
    hour: "numeric",
    minute: "2-digit",
    hour12: true
  }).format(value);
}

export function formatDateTime(date: Date | string, locale: Locale = "en") {
  const value = typeof date === "string" ? new Date(date) : date;
  return locale === "bn"
    ? `${formatDate(value, locale)} ${formatTime(value, locale)}`
    : `${formatDate(value, locale)} at ${formatTime(value, locale)}`;
}

export function getReadingTime(content: string, locale: Locale = "en") {
  const plainText = content
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  const words = plainText ? plainText.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return locale === "bn" ? `${minutes} মিনিট পাঠ` : `${minutes} min read`;
}

export function createSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
