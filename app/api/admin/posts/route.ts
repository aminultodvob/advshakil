import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { postSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    return error as Response;
  }

  const body = await request.json().catch(() => null);
  const parsed = postSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid blog post data.");
  }

  const post = await prisma.blogPost.create({
    data: {
      ...parsed.data,
      publishedAt: parsed.data.status === "PUBLISHED" ? new Date() : null
    }
  });

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/posts");

  return Response.json(post);
}
