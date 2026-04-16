import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { practiceAreaSchema } from "@/lib/validators";

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
  const parsed = practiceAreaSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid practice area data.");
  }

  const area = await prisma.practiceArea.update({
    where: { id },
    data: parsed.data
  });
  revalidatePath("/practice-areas");
  revalidatePath(`/practice-areas/${area.slug}`);
  revalidatePath("/");
  revalidatePath("/admin/practice-areas");
  return Response.json(area);
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
  const area = await prisma.practiceArea.delete({ where: { id } });
  revalidatePath("/practice-areas");
  revalidatePath("/");
  revalidatePath("/admin/practice-areas");
  return Response.json(area);
}
