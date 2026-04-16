import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { caseStudySchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    return error as Response;
  }

  const body = await request.json().catch(() => null);
  const parsed = caseStudySchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid case study data.");
  }

  const study = await prisma.caseStudy.create({ data: parsed.data });
  revalidatePath("/case-studies");
  revalidatePath("/");
  revalidatePath("/admin/case-studies");
  return Response.json(study);
}
