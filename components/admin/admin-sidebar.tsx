"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenText,
  BriefcaseBusiness,
  FolderKanban,
  Images,
  LayoutDashboard,
  Mail,
  MessageSquareQuote
} from "lucide-react";

import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Blog Posts", icon: BookOpenText },
  { href: "/admin/practice-areas", label: "Practice Areas", icon: BriefcaseBusiness },
  { href: "/admin/case-studies", label: "Case Studies", icon: FolderKanban },
  { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { href: "/admin/messages", label: "Messages", icon: Mail },
  { href: "/admin/media", label: "Media", icon: Images }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/70 bg-white/75 px-5 py-6 backdrop-blur xl:block">
      <div className="rounded-[28px] bg-ink p-6 text-white">
        <p className="font-serif text-3xl">Shakil Ahmad</p>
        <p className="mt-2 text-sm text-white/70">Admin control center</p>
      </div>
      <nav className="mt-8 space-y-2">
        {links.map((link) => {
          const active =
            pathname === link.href || pathname.startsWith(`${link.href}/`);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                active
                  ? "bg-ink text-white shadow-card"
                  : "text-ink/70 hover:bg-ink/5 hover:text-ink"
              )}
            >
              <link.icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
