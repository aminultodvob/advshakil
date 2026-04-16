import { prisma } from "@/lib/prisma";
import { AdminHeader } from "@/components/admin/admin-header";
import { MessageTable } from "@/components/admin/message-table";

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-8">
      <AdminHeader
        title="Messages"
        description="Review consultation requests, subject lines, and message status from the contact form."
      />
      <MessageTable messages={messages} />
    </div>
  );
}
