"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function WhatsAppWidget() {
  const pathname = usePathname();
  const phoneNumber = "8801916948710";
  const message = encodeURIComponent("Hello, I would like to inquire about your legal services.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end gap-3 sm:bottom-8 sm:right-8">
      {/* Tooltip-like badge */}
      <div className="rounded-2xl border border-white/10 bg-white/90 px-4 py-2 text-sm font-medium text-ink shadow-2xl backdrop-blur-md dark:bg-slate-900/90 dark:text-white">
        Consult on WhatsApp
      </div>
      
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 sm:h-16 sm:w-16"
        aria-label="Contact on WhatsApp"
      >
        {/* Pulse Effect */}
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20" />
        
        <div className="relative h-8 w-8 transition-transform group-hover:rotate-12 sm:h-10 sm:w-10">
          <Image
            src="/images/whatsapp-svgrepo-com.svg"
            alt="WhatsApp"
            fill
            className="object-contain"
          />
        </div>
      </Link>
    </div>
  );
}
