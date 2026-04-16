import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { postSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    await requireAdmin();

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
  } catch (error: any) {
    if (error instanceof Response) return error;
    
    if (error.code === "P2002") {
      return jsonError("A post with this slug already exists.", 409);
    }
    
    console.error("[POSTS_POST]", error);
    return jsonError("An unexpected error occurred.", 500);
  }
}
