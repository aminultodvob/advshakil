import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminCaseStudiesPage() {
  const items = await prisma.caseStudy.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Case studies"
        description="Showcase representative matters using a clean Problem, Strategy, Outcome structure."
      />
      <ResourceManager
        title="Case study manager"
        description="Feature your strongest matters at the top of the homepage and case studies archive."
        endpoint="/api/admin/case-studies"
        items={items as never[]}
        emptyState={{
          title: "",
          slug: "",
          excerpt: "",
          problem: "",
          strategy: "",
          outcome: "",
          featured: false
        }}
        fields={[
          { key: "title", label: "Title", slugSource: true },
          { key: "slug", label: "Slug" },
          { key: "excerpt", label: "Excerpt", type: "textarea" },
          { key: "problem", label: "Problem", type: "textarea" },
          { key: "strategy", label: "Strategy", type: "textarea" },
          { key: "outcome", label: "Outcome", type: "textarea" },
          { key: "featured", label: "Featured case study", type: "checkbox" }
        ]}
      />
    </div>
  );
}
