import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminPracticeAreasPage() {
  const items = await prisma.practiceArea.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Practice areas"
        description="Maintain service lines, summaries, icons, and detailed descriptions that power both the homepage and dedicated expertise pages."
      />
      <ResourceManager
        title="Practice area manager"
        description="Use Lucide icon names such as Scale, BriefcaseBusiness, FileText, Landmark, BadgeDollarSign, or ReceiptText."
        endpoint="/api/admin/practice-areas"
        items={items as never[]}
        emptyState={{
          title: "",
          slug: "",
          icon: "Scale",
          summary: "",
          description: ""
        }}
        fields={[
          { key: "title", label: "Title", slugSource: true },
          { key: "slug", label: "Slug" },
          { key: "icon", label: "Icon name" },
          { key: "summary", label: "Summary", type: "textarea" },
          { key: "description", label: "Description", type: "textarea" }
        ]}
      />
    </div>
  );
}
