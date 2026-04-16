import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { practiceAreaSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    return error as Response;
  }

  const body = await request.json().catch(() => null);
  const parsed = practiceAreaSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid practice area data.");
  }

  const area = await prisma.practiceArea.create({ data: parsed.data });
  revalidatePath("/practice-areas");
  revalidatePath("/");
  revalidatePath("/admin/practice-areas");
  return Response.json(area);
}
