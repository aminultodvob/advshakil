import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/api";

export async function PATCH(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
  } catch (error) {
    return error as Response;
  }

  const { id } = await params;
  const message = await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true }
  });

  revalidatePath("/admin/messages");
  return Response.json(message);
}
