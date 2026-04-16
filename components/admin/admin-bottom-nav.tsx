"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  BriefcaseBusiness,
  FolderKanban,
  LayoutDashboard,
  Mail,
  MessageSquareQuote,
  Images
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog", icon: BookOpenText },
  { href: "/admin/case-studies", label: "Cases", icon: FolderKanban },
  { href: "/admin/practice-areas", label: "Practice", icon: BriefcaseBusiness },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/testimonials", label: "Reviews", icon: MessageSquareQuote },
  { href: "/admin/media", label: "Media", icon: Images }
];

export function AdminBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-ink/8 bg-white/95 backdrop-blur-xl xl:hidden">
      <div className="flex items-stretch overflow-x-auto scrollbar-none">
        {links.map((link) => {
          const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex min-w-[64px] flex-1 flex-col items-center justify-center gap-1 px-2 py-3 text-[10px] font-semibold uppercase tracking-wider transition-colors",
                active ? "text-gold" : "text-ink/40 hover:text-ink/70"
              )}
            >
              <link.icon className={cn("h-5 w-5 transition-transform", active && "scale-110")} />
              <span className="leading-none">{link.label}</span>
              {active && (
                <span className="absolute bottom-0 left-0 right-0 mx-auto h-0.5 w-8 rounded-full bg-gold" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
