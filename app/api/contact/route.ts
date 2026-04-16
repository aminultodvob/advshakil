import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { contactSchema } from "@/lib/validators";
import { jsonError } from "@/lib/api";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Please complete all required contact fields.");
  }

  await prisma.contactMessage.create({
    data: parsed.data
  });

  revalidatePath("/admin/messages");

  return Response.json({ success: true });
}
