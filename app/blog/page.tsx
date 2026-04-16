import { getPublishedPosts } from "@/lib/data";
import { SiteShell } from "@/components/site/site-shell";
import { PostCard } from "@/components/site/post-card";
import { SectionHeading } from "@/components/ui/section-heading";

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  const [featured, ...rest] = posts;

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Legal Insights"
            title="Thoughtful legal writing for clients, founders, and decision-makers."
            copy="A modern publishing system designed for authority-building content, practical guidance, and search-friendly visibility."
          />
          <div className="mt-14 space-y-8">
            {featured ? <PostCard post={featured} featured /> : null}
            <div className="grid gap-6 lg:grid-cols-2">
              {rest.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
