import type { Metadata } from "next";
import { getPublishedPosts } from "@/lib/data";
import { localizeBlogPost } from "@/lib/content-localization";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { absoluteUrl, DEFAULT_OG_IMAGE, getSeoKeywords } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/ui/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title =
    locale === "bn"
      ? "ব্লগ | অ্যাডভোকেট সাকিল আহমাদ"
      : "Legal Blog | Shakil Ahmad on Corporate Law, Tax, Litigation & Strategy";
  const description =
    locale === "bn"
      ? "করপোরেট আইন, ট্যাক্স, ভ্যাট, লিটিগেশন, কৌশলগত আইনচিন্তা এবং জনজীবন নিয়ে অ্যাডভোকেট সাকিল আহমাদের ব্লগ।"
      : "Read legal insights from Adv Shakil Ahmad on corporate law, tax, VAT, litigation, strategic legal thinking, and public leadership.";

  return {
    title,
    description,
    keywords: getSeoKeywords(locale),
    alternates: {
      canonical: absoluteUrl("/blog")
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/blog"),
      images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), alt: "Legal Blog" }]
    }
  };
}

export default async function BlogPage() {
  const locale = await getLocale();
  const posts = (await getPublishedPosts()).map((post) => localizeBlogPost(post, locale));

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={t(locale, "Legal Insights", "আইনগত অন্তর্দৃষ্টি")}
            title={t(
              locale,
              "Thoughtful legal writing for clients, founders, and decision-makers.",
              "মক্কেল, উদ্যোক্তা ও সিদ্ধান্তগ্রহণকারীদের জন্য গভীরতাপূর্ণ আইনভিত্তিক লেখা।"
            )}
            copy={t(
              locale,
              "A modern publishing system designed for authority-building content, practical guidance, and search-friendly visibility.",
              "কর্তৃত্বপূর্ণ কনটেন্ট, বাস্তবধর্মী নির্দেশনা এবং সার্চ-ফ্রেন্ডলি দৃশ্যমানতার জন্য নির্মিত একটি আধুনিক প্রকাশনা ব্যবস্থা।"
            )}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
