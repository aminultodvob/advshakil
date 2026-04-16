import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { MediaLibrary } from "@/components/admin/media-library";

export default async function AdminMediaPage() {
  const assets = await prisma.mediaAsset.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Media library"
        description="Upload and manage reusable visual assets for blog posts, pages, and future content."
      />
      <MediaLibrary assets={assets} />
    </div>
  );
}
