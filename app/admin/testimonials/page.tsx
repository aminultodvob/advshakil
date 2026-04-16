import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { ResourceManager } from "@/components/admin/resource-manager";

export default async function AdminTestimonialsPage() {
  const items = await prisma.testimonial.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Testimonials"
        description="Curate trust-building quotes and decide which references appear on the public site."
      />
      <ResourceManager
        title="Testimonial manager"
        description="Use concise, premium social proof that feels credible and aligned with the brand tone."
        endpoint="/api/admin/testimonials"
        items={items as never[]}
        emptyState={{
          name: "",
          role: "",
          company: "",
          quote: "",
          featured: true
        }}
        fields={[
          { key: "name", label: "Client name" },
          { key: "role", label: "Role" },
          { key: "company", label: "Company" },
          { key: "quote", label: "Quote", type: "textarea" },
          { key: "featured", label: "Show on homepage", type: "checkbox" }
        ]}
      />
    </div>
  );
}
