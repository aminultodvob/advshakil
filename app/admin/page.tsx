import Link from "next/link";
import { getDashboardStats } from "@/lib/data";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { LinkButton } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const [stats, latestPosts, latestMessages] = await Promise.all([
    getDashboardStats(),
    prisma.blogPost.findMany({
      take: 4,
      orderBy: { updatedAt: "desc" }
    }),
    prisma.contactMessage.findMany({
      take: 5,
      orderBy: { createdAt: "desc" }
    })
  ]);

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Overview"
        description="A high-level view of content, inquiries, and key publishing activity."
        action={<LinkButton href="/admin/posts/new">New Post</LinkButton>}
      />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Blog Posts", value: stats.posts },
          { label: "Messages", value: stats.messages },
          { label: "Case Studies", value: stats.caseStudies },
          { label: "Practice Areas", value: stats.practiceAreas }
        ].map((stat) => (
          <div key={stat.label} className="rounded-[28px] bg-white p-6 shadow-card">
            <p className="text-sm text-ink/55">{stat.label}</p>
            <p className="mt-4 font-serif text-5xl text-ink">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
        <div className="rounded-[32px] bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-serif text-3xl text-ink">Recent publishing activity</h2>
          <div className="mt-8 space-y-4">
            {latestPosts.map((post) => (
              <div
                key={post.id}
                className="flex items-center justify-between rounded-[22px] border border-ink/8 px-5 py-4"
              >
                <div>
                  <p className="font-medium text-ink">{post.title}</p>
                  <p className="mt-1 text-sm text-ink/55">
                    {post.status === "PUBLISHED" ? "Published" : "Draft"}
                  </p>
                </div>
                <Link
                  href={`/admin/posts/${post.id}`}
                  className="text-sm font-semibold text-ink"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[32px] bg-white p-6 shadow-card sm:p-8">
          <h2 className="font-serif text-3xl text-ink">Latest inquiries</h2>
          <div className="mt-8 space-y-4">
            {latestMessages.map((message) => (
              <div key={message.id} className="rounded-[22px] border border-ink/8 p-5">
                <p className="font-medium text-ink">{message.subject}</p>
                <p className="mt-1 text-sm text-ink/55">
                  {message.name} · {message.email}
                </p>
                <p className="mt-3 text-sm leading-7 text-ink/65">
                  {message.message.slice(0, 120)}
                  {message.message.length > 120 ? "..." : ""}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
