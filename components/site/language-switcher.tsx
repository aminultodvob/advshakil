"use client";

import { Languages } from "lucide-react";

import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/site/language-provider";

const options: Array<{ value: Locale; label: string }> = [
  { value: "en", label: "EN" },
  { value: "bn", label: "বাং" }
];

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-slate-300/80 bg-white/95 p-1 shadow-sm backdrop-blur dark:border-white/10 dark:bg-[#273443]",
        compact ? "h-11" : "h-12"
      )}
      role="group"
      aria-label={locale === "bn" ? "ভাষা নির্বাচন" : "Language selection"}
    >
      <div className="flex h-9 w-9 items-center justify-center rounded-full text-slate-500 dark:text-white/70">
        <Languages className="h-4 w-4" />
      </div>
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => setLocale(option.value)}
          className={cn(
            "rounded-full px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition",
            locale === option.value
              ? "bg-slate-900 text-white shadow-card dark:bg-white dark:text-slate-900"
              : "text-slate-700 hover:text-slate-950 dark:text-white/78 dark:hover:text-white"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
