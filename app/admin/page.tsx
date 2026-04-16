import Link from "next/link";
import {
  BookOpenText,
  FolderKanban,
  BriefcaseBusiness,
  Mail,
  MessageSquareQuote,
  Plus,
  ArrowRight
} from "lucide-react";
import { getDashboardStats } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { LinkButton } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const [stats, latestPosts, latestMessages] = await Promise.all([
    getDashboardStats(),
    prisma.blogPost.findMany({ take: 4, orderBy: { updatedAt: "desc" } }),
    prisma.contactMessage.findMany({ take: 5, orderBy: { createdAt: "desc" } })
  ]);

  const unreadCount = latestMessages.filter((m) => !m.isRead).length;

  const statCards = [
    { label: "Blog Posts", value: stats.posts, href: "/admin/posts", icon: BookOpenText, color: "bg-blue-50 text-blue-500" },
    { label: "Messages", value: stats.messages, href: "/admin/messages", icon: Mail, color: "bg-amber-50 text-amber-500", badge: unreadCount },
    { label: "Case Studies", value: stats.caseStudies, href: "/admin/case-studies", icon: FolderKanban, color: "bg-emerald-50 text-emerald-500" },
    { label: "Practice Areas", value: stats.practiceAreas, href: "/admin/practice-areas", icon: BriefcaseBusiness, color: "bg-purple-50 text-purple-500" }
  ];

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Overview"
        description="Content, inquiries, and publishing activity at a glance."
        action={<LinkButton href="/admin/posts/new"><Plus className="mr-1.5 h-3.5 w-3.5" />New Post</LinkButton>}
      />

      {/* Stats grid – 2 cols on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {statCards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group relative flex flex-col justify-between rounded-[22px] bg-white p-5 shadow-sm ring-1 ring-ink/5 transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${card.color}`}>
                <card.icon className="h-4 w-4" />
              </div>
              {card.badge ? (
                <span className="rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold text-gold">
                  {card.badge} new
                </span>
              ) : null}
            </div>
            <div className="mt-4">
              <p className="font-serif text-4xl font-light text-ink">{card.value}</p>
              <p className="mt-1 text-xs font-medium text-ink/40">{card.label}</p>
            </div>
            <ArrowRight className="absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/10 transition group-hover:translate-x-0.5 group-hover:text-ink/30" />
          </Link>
        ))}
      </div>

      {/* Recent posts + latest messages stacked on mobile, side-by-side on xl */}
      <div className="grid gap-4 xl:grid-cols-[1fr_0.9fr]">
        {/* Posts */}
        <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-ink/5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-ink">Recent Posts</h2>
            <Link href="/admin/posts" className="text-xs font-semibold text-ink/40 hover:text-gold transition-colors">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {latestPosts.length === 0 && (
              <p className="py-6 text-center text-sm text-ink/30">No posts yet.</p>
            )}
            {latestPosts.map((post) => (
              <Link
                key={post.id}
                href={`/admin/posts/${post.id}`}
                className="flex items-center justify-between gap-3 rounded-[16px] px-4 py-3 transition hover:bg-mist/60"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{post.title}</p>
                  <span
                    className={`mt-1 inline-block rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      post.status === "PUBLISHED"
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-amber-50 text-amber-600"
                    }`}
                  >
                    {post.status}
                  </span>
                </div>
                <ArrowRight className="h-3.5 w-3.5 shrink-0 text-ink/20" />
              </Link>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="rounded-[24px] bg-white p-5 shadow-sm ring-1 ring-ink/5 sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-serif text-2xl text-ink">
              Latest Enquiries
              {unreadCount > 0 && (
                <span className="ml-2 rounded-full bg-gold/10 px-2 py-0.5 text-sm text-gold">
                  {unreadCount}
                </span>
              )}
            </h2>
            <Link href="/admin/messages" className="text-xs font-semibold text-ink/40 hover:text-gold transition-colors">
              View all →
            </Link>
          </div>
          <div className="space-y-2">
            {latestMessages.length === 0 && (
              <p className="py-6 text-center text-sm text-ink/30">No messages yet.</p>
            )}
            {latestMessages.map((msg) => (
              <div
                key={msg.id}
                className={`rounded-[16px] px-4 py-3 ${
                  msg.isRead ? "opacity-50" : "border border-gold/15 bg-gold/5"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-medium text-ink">{msg.subject}</p>
                  {!msg.isRead && (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-gold" />
                  )}
                </div>
                <p className="mt-0.5 truncate text-xs text-ink/45">{msg.name} · {msg.email}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick action row – phone-friendly shortcut buttons */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {[
          { href: "/admin/posts/new", label: "New Blog Post", icon: BookOpenText },
          { href: "/admin/case-studies", label: "Manage Cases", icon: FolderKanban },
          { href: "/admin/testimonials", label: "Testimonials", icon: MessageSquareQuote }
        ].map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 rounded-[18px] border border-ink/8 bg-white px-4 py-3.5 text-sm font-medium text-ink transition hover:border-gold/30 hover:bg-gold/5"
          >
            <item.icon className="h-4 w-4 shrink-0 text-gold" />
            <span className="truncate">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
