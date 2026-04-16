"use client";

import { Facebook, MessageCircleMore, Share2 } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

export function BlogSocial({
  slug,
  title
}: {
  slug: string;
  title: string;
}) {
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const base =
      process.env.NEXT_PUBLIC_SITE_URL || window.location.origin || "";
    setUrl(`${base}/blog/${slug}`);
  }, [slug]);

  async function onShare() {
    if (!url) {
      return;
    }

    if (navigator.share) {
      await navigator.share({
        title,
        url
      });
      return;
    }

    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  if (!url) {
    return null;
  }

  const encodedUrl = encodeURIComponent(url);
  const likeSrc = `https://www.facebook.com/plugins/like.php?href=${encodedUrl}&width=220&layout=button_count&action=like&size=small&share=true&height=28&appId`;
  const commentsSrc = `https://www.facebook.com/plugins/comments.php?href=${encodedUrl}&numposts=5&width=100%&order_by=social`;

  return (
    <section className="mt-12 rounded-[36px] border border-white/70 bg-white p-8 shadow-card dark:border-white/10 dark:bg-[#233142] sm:p-10">
      <div className="flex flex-col gap-6 border-b border-ink/8 pb-8 dark:border-white/10 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
            Join the Conversation
          </p>
          <h2 className="font-serif text-3xl text-slate-900 dark:text-white">
            Reader engagement and social sharing
          </h2>
          <p className="max-w-2xl text-base leading-8 text-slate-700 dark:text-white/80">
            Readers can react, comment, and share this article directly through
            Facebook in a format that feels familiar and professional.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-ink/8 bg-mist px-4 py-2 dark:border-white/10 dark:bg-[#2a3a4d]">
            <iframe
              title="Facebook like and share"
              src={likeSrc}
              width="220"
              height="28"
              className="overflow-hidden border-0"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
          <Button type="button" variant="secondary" onClick={onShare}>
            <Share2 className="mr-2 h-4 w-4" />
            {copied ? "Link Copied" : "Share Article"}
          </Button>
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.78fr_1.22fr]">
        <div className="rounded-[28px] border border-ink/8 bg-mist p-6 dark:border-white/10 dark:bg-[#2a3a4d]">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-gold/10 p-3 text-gold">
              <Facebook className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Facebook Engagement
              </p>
              <p className="text-sm text-slate-600 dark:text-white/72">
                Like, share, and respond below.
              </p>
            </div>
          </div>
          <div className="mt-5 rounded-[22px] border border-ink/8 bg-white p-4 dark:border-white/10 dark:bg-[#233142]">
            <p className="text-sm leading-7 text-slate-700 dark:text-white/80">
              Social proof and public interaction help extend the reach of a
              well-written legal article while keeping discussion attached to a
              trusted network.
            </p>
          </div>
        </div>

        <div className="rounded-[28px] border border-ink/8 bg-mist p-4 dark:border-white/10 dark:bg-[#2a3a4d] sm:p-5">
          <div className="mb-4 flex items-center gap-3">
            <div className="rounded-2xl bg-gold/10 p-3 text-gold">
              <MessageCircleMore className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold text-slate-900 dark:text-white">
                Facebook Comments
              </p>
              <p className="text-sm text-slate-600 dark:text-white/72">
                Public discussion attached to this article
              </p>
            </div>
          </div>
          <div className="overflow-hidden rounded-[24px] bg-white dark:bg-[#233142]">
            <iframe
              title="Facebook comments"
              src={commentsSrc}
              className="min-h-[340px] w-full border-0"
              scrolling="no"
              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
