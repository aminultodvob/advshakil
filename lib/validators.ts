import { z } from "zod";

export const postStatuses = ["DRAFT", "PUBLISHED"] as const;

export const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional().or(z.literal("")),
  subject: z.string().min(3),
  message: z.string().min(10)
});

export const postSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3),
  excerpt: z.string().min(10),
  coverImage: z.string().min(1),
  content: z.string().min(10),
  status: z.enum(postStatuses),
  featured: z.boolean().default(false)
});

export const practiceAreaSchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  icon: z.string().min(2),
  summary: z.string().min(10),
  description: z.string().min(20)
});

export const caseStudySchema = z.object({
  title: z.string().min(2),
  slug: z.string().min(2),
  excerpt: z.string().min(10),
  problem: z.string().min(10),
  strategy: z.string().min(10),
  outcome: z.string().min(10),
  featured: z.boolean().default(false)
});

export const testimonialSchema = z.object({
  name: z.string().min(2),
  role: z.string().min(2),
  company: z.string().optional().or(z.literal("")),
  quote: z.string().min(10),
  featured: z.boolean().default(true)
});
