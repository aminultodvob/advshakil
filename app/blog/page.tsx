import { getPublishedPosts } from "@/lib/data";
import { SiteShell } from "@/components/site/site-shell";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/ui/section-heading";

export default async function BlogPage() {
  const posts = await getPublishedPosts();

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Legal Insights"
            title="Thoughtful legal writing for clients, founders, and decision-makers."
            copy="A modern publishing system designed for authority-building content, practical guidance, and search-friendly visibility."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
