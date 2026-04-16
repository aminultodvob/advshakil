import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { PostEditor } from "@/components/admin/post-editor";

export default async function EditPostPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await prisma.blogPost.findUnique({ where: { id } });

  if (!post) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Edit post"
        description="Refine the article, update the publishing state, and keep the content library current."
      />
      <PostEditor post={post} />
    </div>
  );
}
