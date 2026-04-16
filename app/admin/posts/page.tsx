import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { LinkButton } from "@/components/ui/button";

export default async function AdminPostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Blog posts"
        description="Create, edit, publish, and feature articles with an SEO-friendly content workflow."
        action={<LinkButton href="/admin/posts/new">New Post</LinkButton>}
      />
      <div className="grid gap-5">
        {posts.map((post) => (
          <div key={post.id} className="rounded-[28px] bg-white p-6 shadow-card">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                  {post.status}
                </p>
                <h2 className="mt-3 font-serif text-3xl text-ink">{post.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-7 text-ink/65">
                  {post.excerpt}
                </p>
              </div>
              <Link
                href={`/admin/posts/${post.id}`}
                className="text-sm font-semibold uppercase tracking-[0.18em] text-ink"
              >
                Edit Post
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
