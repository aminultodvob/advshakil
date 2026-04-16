import { prisma } from "@/lib/prisma";

export async function getHomepageData() {
  const [practiceAreas, testimonials, caseStudies, featuredPost, recentPosts] =
    await Promise.all([
      prisma.practiceArea.findMany({ orderBy: { createdAt: "asc" } }),
      prisma.testimonial.findMany({
        where: { featured: true },
        orderBy: { createdAt: "asc" }
      }),
      prisma.caseStudy.findMany({
        take: 3,
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
      }),
      prisma.blogPost.findFirst({
        where: { status: "PUBLISHED", featured: true },
        orderBy: { publishedAt: "desc" }
      }),
      prisma.blogPost.findMany({
        where: { status: "PUBLISHED" },
        take: 4,
        orderBy: [{ featured: "desc" }, { publishedAt: "desc" }]
      })
    ]);

  return {
    practiceAreas,
    testimonials,
    caseStudies,
    featuredPost,
    recentPosts
  };
}

export async function getPublishedPosts() {
  return prisma.blogPost.findMany({
    where: { status: "PUBLISHED" },
    orderBy: [{ featured: "desc" }, { publishedAt: "desc" }]
  });
}

export async function getDashboardStats() {
  const [posts, messages, caseStudies, practiceAreas] = await Promise.all([
    prisma.blogPost.count(),
    prisma.contactMessage.count(),
    prisma.caseStudy.count(),
    prisma.practiceArea.count()
  ]);

  return { posts, messages, caseStudies, practiceAreas };
}
