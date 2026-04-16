import { Facebook, MapPin, Youtube } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white dark:bg-[#1b2633]">
      <div className="container-shell py-12">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <div>
              <p className="font-serif text-2xl text-slate-900 dark:text-white">
                Adv Shakil Ahmad
              </p>
              <p className="mt-1 text-sm text-slate-600 dark:text-white/75">
                Advocate | Politician | Legal Strategist | Corporate & Tax Expert
              </p>
            </div>
            <div className="flex items-start gap-3 max-w-sm text-sm text-slate-600 dark:text-white/70">
              <MapPin className="h-5 w-5 shrink-0 text-gold" />
              <p>
                244(2nd Floor), RH Home Center, 74/B/1 Green Road,<br />
                Tejgaon, Dhaka, Bangladesh.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-8 lg:items-end">
            <div className="flex flex-wrap gap-x-8 gap-y-4 text-sm font-medium text-slate-700 dark:text-white/80">
              <Link href="/about" className="hover:text-gold dark:hover:text-gold transition-colors">About</Link>
              <Link href="/practice-areas" className="hover:text-gold dark:hover:text-gold transition-colors">Practice Areas</Link>
              <Link href="/blog" className="hover:text-gold dark:hover:text-gold transition-colors">Blog</Link>
              <Link href="/contact" className="hover:text-gold dark:hover:text-gold transition-colors">Contact</Link>
            </div>
            
            <div className="flex items-center gap-4">
              <Link 
                href="https://www.facebook.com/smshakil.law" 
                target="_blank" 
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-[#1877F2] hover:text-white dark:bg-white/5 dark:text-white/80 dark:hover:bg-[#1877F2] dark:hover:text-white transition-all shadow-sm"
                aria-label="Follow on Facebook"
              >
                <Facebook className="h-5 w-5 fill-current" />
              </Link>
              <Link 
                href="https://www.youtube.com/@AdvShakilAhmad" 
                target="_blank" 
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-slate-700 hover:bg-[#FF0000] hover:text-white dark:bg-white/5 dark:text-white/80 dark:hover:bg-[#FF0000] dark:hover:text-white transition-all shadow-sm group"
                aria-label="Subscribe on YouTube"
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
        <div className="mt-12 border-t border-ink/5 pt-8 flex flex-col md:flex-row justify-between gap-4 text-xs text-slate-500 dark:text-white/50">
          <p>© {new Date().getFullYear()} Adv Shakil Ahmad. All rights reserved.</p>
          <Link href="/admin" className="hover:text-gold transition-colors">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
}
