import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { caseStudySchema } from "@/lib/validators";

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
  const parsed = caseStudySchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid case study data.");
  }

  const study = await prisma.caseStudy.update({
    where: { id },
    data: parsed.data
  });
  revalidatePath("/case-studies");
  revalidatePath("/");
  revalidatePath("/admin/case-studies");
  return Response.json(study);
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
  const study = await prisma.caseStudy.delete({ where: { id } });
  revalidatePath("/case-studies");
  revalidatePath("/");
  revalidatePath("/admin/case-studies");
  return Response.json(study);
}
