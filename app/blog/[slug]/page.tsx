import Image from "next/image";
import { notFound } from "next/navigation";
import { Clock3, CalendarDays, FileText, RefreshCw } from "lucide-react";

import { prisma } from "@/lib/prisma";
import { localizeBlogPost } from "@/lib/content-localization";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import {
  formatDate,
  formatDateTime,
  formatTime,
  getReadingTime
} from "@/lib/utils";
import { SiteShell } from "@/components/site/site-shell";
import { BlogSocial } from "@/components/site/blog-social";

export default async function BlogDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
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

  const localizedPost = localizeBlogPost(post, locale);
  const publishedDate = localizedPost.publishedAt ?? localizedPost.createdAt;
  const readingTime = getReadingTime(localizedPost.content, locale);
  const articleMeta = [
    {
      label: t(locale, "Published", "প্রকাশিত"),
      value: formatDate(publishedDate, locale),
      detail: formatTime(publishedDate, locale),
      icon: CalendarDays
    },
    {
      label: t(locale, "Reading time", "পড়ার সময়"),
      value: readingTime,
      detail: t(locale, "Editorial estimate", "সম্পাদনাগত হিসাব"),
      icon: Clock3
    },
    {
      label: t(locale, "Format", "ধরণ"),
      value: t(locale, "Legal insight", "আইনগত অন্তর্দৃষ্টি"),
      detail: t(locale, "Professional commentary", "পেশাদার বিশ্লেষণ"),
      icon: FileText
    },
    {
      label: t(locale, "Updated", "সর্বশেষ হালনাগাদ"),
      value: formatDate(localizedPost.updatedAt, locale),
      detail: formatTime(localizedPost.updatedAt, locale),
      icon: RefreshCw
    }
  ];

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell max-w-5xl">
          <div className="rounded-[40px] border border-white/70 bg-white/90 p-8 shadow-card backdrop-blur-xl dark:border-white/10 dark:bg-[rgb(var(--surface-soft))/0.92] sm:p-10">
            <div className="space-y-6 text-center">
              <span className="eyebrow">{t(locale, "Published Insight", "প্রকাশিত অন্তর্দৃষ্টি")}</span>
              <div className="space-y-4">
                <p className="text-sm uppercase tracking-[0.3em] text-gold">
                  {formatDateTime(publishedDate, locale)}
                </p>
                <h1 className="font-serif text-5xl leading-tight text-slate-900 dark:text-white sm:text-6xl">
                  {localizedPost.title}
                </h1>
              </div>
              <p className="mx-auto max-w-3xl text-lg leading-8 text-copy">
                {localizedPost.excerpt}
              </p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {articleMeta.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.label}
                    className="rounded-[26px] border border-black/5 bg-[rgb(var(--surface-soft))] p-5 text-left dark:border-white/10 dark:bg-[rgb(var(--surface-strong))]"
                  >
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-gold/10 p-3 text-gold">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                          {item.label}
                        </p>
                        <p className="mt-1 text-base font-semibold text-slate-900 dark:text-white">
                          {item.value}
                        </p>
                        <p className="mt-1 text-sm text-muted">{item.detail}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative mt-12 h-[360px] overflow-hidden rounded-[36px] shadow-card">
            <Image
              src={localizedPost.coverImage}
              alt={localizedPost.title}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/18 via-transparent to-transparent" />
          </div>
          <article
            className="prose-content mt-12 rounded-[36px] border border-white/70 bg-white p-8 shadow-card sm:p-12 dark:border-white/10 dark:bg-[rgb(var(--surface-soft))]"
            dangerouslySetInnerHTML={{ __html: localizedPost.content }}
          />
          <BlogSocial slug={localizedPost.slug} title={localizedPost.title} />
        </div>
      </section>
    </SiteShell>
  );
}
