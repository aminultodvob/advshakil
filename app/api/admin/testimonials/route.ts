import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";
import { testimonialSchema } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    await requireAdmin();
  } catch (error) {
    return error as Response;
  }

  const body = await request.json().catch(() => null);
  const parsed = testimonialSchema.safeParse(body);

  if (!parsed.success) {
    return jsonError("Invalid testimonial data.");
  }

  const testimonial = await prisma.testimonial.create({
    data: parsed.data
  });
  revalidatePath("/");
  revalidatePath("/admin/testimonials");
  return Response.json(testimonial);
}
