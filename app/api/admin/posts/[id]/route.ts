import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { postSchema } from "@/lib/validators";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch (error) {
    return error as Response;
  }

  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = postSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid blog post data.");
  }

  const existing = await prisma.blogPost.findUnique({ where: { id } });

  const post = await prisma.blogPost.update({
    where: { id },
    data: {
      ...parsed.data,
      publishedAt:
        parsed.data.status === "PUBLISHED" ? existing?.publishedAt ?? new Date() : null
    }
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${post.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/posts");

  return Response.json(post);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch (error) {
    return error as Response;
  }

  const { id } = await params;
  const post = await prisma.blogPost.delete({ where: { id } });

  revalidatePath("/blog");
  revalidatePath("/");
  revalidatePath("/admin/posts");

  return Response.json(post);
}
