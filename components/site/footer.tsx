import { Facebook, MapPin } from "lucide-react";
import Link from "next/link";

import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";

export async function Footer() {
  const locale = await getLocale();

  return (
    <footer className="border-t border-ink/10 bg-white dark:bg-[#1b2633]">
      <div className="container-shell py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div>
              <p className="font-serif text-2xl text-slate-900 dark:text-white">
                {t(locale, "Adv Shakil Ahmad", "অ্যাডভোকেট সাকিল আহমাদ")}
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-white/75">
                {t(
                  locale,
                  "Advocate | Politician | Legal Strategist | Corporate & Tax Expert",
                  "অ্যাডভোকেট | রাজনীতিবিদ | লিগ্যাল স্ট্র্যাটেজিস্ট | করপোরেট ও ট্যাক্স বিশেষজ্ঞ"
                )}
              </p>
            </div>

            <div className="flex max-w-sm items-start gap-3 text-sm text-slate-600 dark:text-white/70">
              <MapPin className="h-5 w-5 shrink-0 text-gold" />
              <p>
                {t(
                  locale,
                  "244(2nd Floor), RH Home Center, 74/B/1 Green Road,",
                  "২৪৪ (২য় তলা), আরএইচ হোম সেন্টার, ৭৪/বি/১ গ্রিন রোড,"
                )}
                <br />
                {t(locale, "Tejgaon, Dhaka, Bangladesh.", "তেজগাঁও, ঢাকা, বাংলাদেশ।")}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-slate-700 dark:text-white/80">
              <Link href="/about" className="transition-colors hover:text-gold dark:hover:text-gold">
                {t(locale, "About", "পরিচিতি")}
              </Link>
              <Link href="/practice-areas" className="transition-colors hover:text-gold dark:hover:text-gold">
                {t(locale, "Practice Areas", "প্র্যাকটিস এরিয়া")}
              </Link>
              <Link href="/blog" className="transition-colors hover:text-gold dark:hover:text-gold">
                {t(locale, "Blog", "ব্লগ")}
              </Link>
              <Link href="/contact" className="transition-colors hover:text-gold dark:hover:text-gold">
                {t(locale, "Contact", "যোগাযোগ")}
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="https://www.facebook.com/smshakil.law"
                target="_blank"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm transition-all hover:bg-[#1877F2] hover:text-white dark:bg-white/5 dark:text-white/80 dark:hover:bg-[#1877F2] dark:hover:text-white"
                aria-label={t(locale, "Follow on Facebook", "ফেসবুকে অনুসরণ করুন")}
              >
                <Facebook className="h-5 w-5 fill-current" />
              </Link>
              <Link
                href="https://www.youtube.com/@AdvShakilAhmad"
                target="_blank"
                className="group flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 shadow-sm transition-all hover:bg-[#FF0000] hover:text-white dark:bg-white/5 dark:text-white/80 dark:hover:bg-[#FF0000] dark:hover:text-white"
                aria-label={t(locale, "Subscribe on YouTube", "ইউটিউবে সাবস্ক্রাইব করুন")}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-current transition-transform group-hover:scale-110"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-ink/5 pt-8 text-xs text-slate-500 dark:text-white/50 md:flex-row">
          <p>
            {t(
              locale,
              `© ${new Date().getFullYear()} Adv Shakil Ahmad. All rights reserved.`,
              `© ${new Date().getFullYear()} অ্যাডভোকেট সাকিল আহমাদ। সর্বস্বত্ব সংরক্ষিত।`
            )}
          </p>
          <Link href="/admin" className="transition-colors hover:text-gold">
            {t(locale, "Admin Access", "অ্যাডমিন প্রবেশ")}
          </Link>
        </div>
      </div>
    </footer>
  );
}
