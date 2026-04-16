import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "@prisma/client";

import { formatDate, formatTime, getReadingTime } from "@/lib/utils";

export function PostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  const publishLabel = post.publishedAt ? formatDate(post.publishedAt) : "Draft";
  const publishTime = post.publishedAt ? formatTime(post.publishedAt) : "Unscheduled";
  const readingTime = getReadingTime(post.content);

  return (
    <article
      className={`group overflow-hidden rounded-[32px] border border-white/70 bg-white shadow-card transition duration-300 hover:-translate-y-1 dark:border-white/10 dark:bg-[rgb(var(--surface-soft))] ${
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
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em]">
            <span className="rounded-full bg-gold/10 px-3 py-1.5 text-gold">
              {publishLabel}
            </span>
            <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-muted dark:bg-white/10 dark:text-white/80">
              {publishTime}
            </span>
            <span className="rounded-full bg-black/[0.04] px-3 py-1.5 text-muted dark:bg-white/10 dark:text-white/80">
              {readingTime}
            </span>
          </div>
          <h3 className="font-serif text-3xl text-slate-900 dark:text-white">{post.title}</h3>
          <p className="text-base leading-8 text-copy">{post.excerpt}</p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-slate-900 transition hover:text-gold dark:text-white"
        >
          Read Article
        </Link>
      </div>
    </article>
  );
}
