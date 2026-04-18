import type { MetadataRoute } from "next";

import { prisma } from "@/lib/prisma";
import { SITE_URL } from "@/lib/seo";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, practiceAreas] = await Promise.all([
    prisma.blogPost.findMany({
      where: { status: "PUBLISHED" },
      select: { slug: true, updatedAt: true }
    }),
    prisma.practiceArea.findMany({
      select: { slug: true, updatedAt: true }
    })
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${SITE_URL}/practice-areas`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9
    },
    {
      url: `${SITE_URL}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.85
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8
    }
  ];

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.updatedAt,
    changeFrequency: "monthly",
    priority: 0.75
  }));

  const practiceRoutes: MetadataRoute.Sitemap = practiceAreas.map((area) => ({
    url: `${SITE_URL}/practice-areas/${area.slug}`,
    lastModified: area.updatedAt,
    changeFrequency: "monthly",
    priority: 0.75
  }));

  return [...staticRoutes, ...blogRoutes, ...practiceRoutes];
}
