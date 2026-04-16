import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";

import { formatDate } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <article
      className={`group overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-card transition duration-300 hover:-translate-y-1 dark:bg-white/5 ${
        featured ? "grid gap-0 lg:grid-cols-[1.1fr_0.9fr]" : ""
      }`}
    >
      <div className="relative min-h-[280px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between p-8">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
          </p>
          <h3 className="font-serif text-3xl text-ink">{post.title}</h3>
          <p className="text-base leading-8 text-copy">{post.excerpt}</p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-ink transition hover:text-gold"
        >
          Read Article
        </Link>
      </div>
    </article>
  );
}
