import Image from "next/image";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { SiteShell } from "@/components/site/site-shell";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await prisma.blogPost.findFirst({
    where: {
      slug,
      status: "PUBLISHED"
    }
  });

  if (!post) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell max-w-5xl">
          <div className="space-y-6 text-center">
            <span className="eyebrow">Published Insight</span>
            <h1 className="font-serif text-5xl leading-tight text-ink sm:text-6xl">
              {post.title}
            </h1>
            <p className="text-sm uppercase tracking-[0.3em] text-gold">
              {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
            </p>
            <p className="mx-auto max-w-3xl text-lg leading-8 text-ink/70">
              {post.excerpt}
            </p>
          </div>
          <div className="relative mt-12 h-[360px] overflow-hidden rounded-[36px]">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
            />
          </div>
          <article
            className="prose-content mt-12 rounded-[36px] border border-white/70 bg-white p-8 shadow-card sm:p-12 dark:bg-white/5"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </div>
      </section>
    </SiteShell>
  );
}
