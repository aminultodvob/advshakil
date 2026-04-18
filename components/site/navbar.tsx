"use client";

import Link from "next/link";
import { Menu, Scale } from "lucide-react";
import { useState } from "react";

import { type Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { LinkButton } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { useLanguage } from "@/components/site/language-provider";

function getLinks(locale: Locale) {
  return [
    { href: "/", label: locale === "bn" ? "হোম" : "Home" },
    { href: "/about", label: locale === "bn" ? "পরিচিতি" : "About" },
    {
      href: "/practice-areas",
      label: locale === "bn" ? "প্র্যাকটিস এরিয়া" : "Practice Areas"
    },
    {
      href: "/case-studies",
      label: locale === "bn" ? "কেস স্টাডি" : "Case Studies"
    },
    {
      href: "https://politician.shakil.me/",
      label: locale === "bn" ? "রাজনৈতিক পরিসর" : "Political Space",
      external: true
    },
    { href: "/blog", label: locale === "bn" ? "ব্লগ" : "Blog" }
  ];
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { locale } = useLanguage();
  const links = getLinks(locale);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur-xl dark:border-white/10 dark:bg-[#1a2531]/95">
      <div className="container-shell flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white shadow-card dark:bg-white dark:text-slate-900">
            <Scale className="h-5 w-5" />
          </div>
          <div>
            <p className="font-serif text-xl text-slate-900 dark:text-white">
              {locale === "bn" ? "অ্যাডভোকেট সাকিল আহমাদ" : "Adv Shakil Ahmad"}
            </p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-white/70">
              {locale === "bn" ? "অ্যাডভোকেট" : "Advocate"}
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              className="text-sm font-medium text-slate-800 transition hover:text-slate-950 dark:text-white/90 dark:hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <ThemeToggle />
          <LinkButton href="https://lawsheba.com/" target="_blank">
            {locale === "bn" ? "ভিজিট ল' সেবা" : "Visit Law Sheba"}
          </LinkButton>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher compact />
          <ThemeToggle />
          <button
            onClick={() => setOpen((value) => !value)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300/80 bg-white text-slate-900 dark:border-white/10 dark:bg-[#273443] dark:text-white"
            aria-label={locale === "bn" ? "নেভিগেশন টগল করুন" : "Toggle navigation"}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-slate-200/80 bg-white/95 transition-all duration-300 dark:border-white/8 dark:bg-[#1a2531] lg:hidden",
          open ? "max-h-[420px]" : "max-h-0"
        )}
      >
        <div className="container-shell flex flex-col gap-4 py-5">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              target={link.external ? "_blank" : undefined}
              rel={link.external ? "noreferrer" : undefined}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-white/90"
            >
              {link.label}
            </Link>
          ))}
          <LinkButton
            href="https://lawsheba.com/"
            target="_blank"
            className="w-full"
            onClick={() => setOpen(false)}
          >
            {locale === "bn" ? "ভিজিট ল' সেবা" : "Visit Law Sheba"}
          </LinkButton>
        </div>
      </div>
    </header>
  );
}
