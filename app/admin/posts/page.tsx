import Link from "next/link";
import { Plus, Edit3, FileText, FileCheck } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { LinkButton } from "@/components/ui/button";

export default async function AdminPostsPage() {
  const posts = await prisma.blogPost.findMany({
    orderBy: { updatedAt: "desc" }
  });

  const published = posts.filter((p) => p.status === "PUBLISHED");
  const drafts = posts.filter((p) => p.status === "DRAFT");

  function PostRow({ post }: { post: (typeof posts)[number] }) {
    return (
      <Link
        href={`/admin/posts/${post.id}`}
        className="group flex items-start gap-3 rounded-[18px] border border-ink/5 bg-white p-4 shadow-sm transition hover:border-gold/20 hover:shadow-md sm:items-center"
      >
        <div
          className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:mt-0 ${
            post.status === "PUBLISHED"
              ? "bg-emerald-50 text-emerald-500"
              : "bg-amber-50 text-amber-500"
          }`}
        >
          {post.status === "PUBLISHED" ? (
            <FileCheck className="h-4 w-4" />
          ) : (
            <FileText className="h-4 w-4" />
          )}
        </div>

        <div className="min-w-0 flex-1">
          <p className="truncate font-serif text-lg text-ink leading-tight">{post.title}</p>
          <p className="mt-1 truncate text-xs text-ink/40 leading-none">
            {post.slug}
          </p>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <span
            className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider sm:inline-block ${
              post.status === "PUBLISHED"
                ? "bg-emerald-50 text-emerald-600"
                : "bg-amber-50 text-amber-600"
            }`}
          >
            {post.status}
          </span>
          <Edit3 className="h-4 w-4 text-ink/20 transition group-hover:text-gold" />
        </div>
      </Link>
    );
  }

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Blog Posts"
        description="Write, publish, and feature articles from here."
        action={
          <LinkButton href="/admin/posts/new" className="flex items-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New Post
          </LinkButton>
        }
      />

      {posts.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-ink/10 bg-white/60 py-20 text-center">
          <FileText className="mx-auto h-8 w-8 text-ink/15" />
          <p className="mt-3 text-sm text-ink/30">No posts yet. Create one above.</p>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Published */}
          {published.length > 0 && (
            <div className="space-y-2">
              <p className="ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/25">
                Published · {published.length}
              </p>
              {published.map((post) => (
                <PostRow key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* Drafts */}
          {drafts.length > 0 && (
            <div className="space-y-2">
              <p className="ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/25">
                Drafts · {drafts.length}
              </p>
              {drafts.map((post) => (
                <PostRow key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
