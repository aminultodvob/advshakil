import { v2 as cloudinary } from "cloudinary";
import { revalidatePath } from "next/cache";

import { prisma } from "@/lib/prisma";
import { requireAdmin, jsonError } from "@/lib/api";

export async function POST(request: Request) {
  try {
    await requireAdmin();

    const formData = await request.formData();
    const file = formData.get("file");

    if (!(file instanceof File)) {
      return jsonError("Please attach a valid file.");
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Upload to Cloudinary using a stream
    const uploadResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "adv-shakil",
            resource_type: "auto"
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        )
        .end(buffer);
    }) as any;

    const asset = await prisma.mediaAsset.create({
      data: {
        name: file.name,
        url: uploadResponse.secure_url
      }
    });

    revalidatePath("/admin/media");

    return Response.json(asset);
  } catch (error: any) {
    if (error instanceof Response) return error;
    
    console.error("[MEDIA_POST]", error);
    return jsonError("Failed to upload image to Cloudinary.", 500);
  }
}
