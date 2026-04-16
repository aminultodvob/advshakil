"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { MediaAsset } from "@prisma/client";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Copy, Loader2, Check, Images, CloudUpload } from "lucide-react";

export function MediaLibrary({ assets }: { assets: MediaAsset[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    startTransition(async () => {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/admin/media", {
        method: "POST",
        body: formData
      });

      const payload = await response.json();

      if (!response.ok) {
        setStatus(payload.error ?? "Upload failed.");
        event.target.value = "";
        return;
      }

      setStatus("Uploaded to Cloudinary ✓");
      setTimeout(() => setStatus(null), 3000);
      router.refresh();
      event.target.value = "";
    });
  }

  function copyUrl(asset: MediaAsset) {
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 2000);
  }

  return (
    <div className="space-y-6">
      {/* Upload zone */}
      <label
        className={`group flex cursor-pointer flex-col items-center justify-center gap-4 rounded-[28px] border-2 border-dashed p-10 text-center transition-all ${
          isPending
            ? "border-gold/40 bg-gold/5"
            : "border-ink/10 bg-white hover:border-gold/30 hover:bg-gold/5"
        }`}
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full transition-all ${
            isPending ? "bg-gold/15 text-gold" : "bg-mist text-ink/30 group-hover:bg-gold/10 group-hover:text-gold"
          }`}
        >
          {isPending ? (
            <Loader2 className="h-7 w-7 animate-spin" />
          ) : (
            <CloudUpload className="h-7 w-7" />
          )}
        </div>
        <div>
          <p className="font-semibold text-ink">
            {isPending ? "Uploading to Cloudinary…" : "Tap to upload an image"}
          </p>
          <p className="mt-1 text-sm text-ink/40">
            {isPending ? "Please wait" : "JPG, PNG, WebP, SVG supported"}
          </p>
        </div>
        {!isPending && <input type="file" className="hidden" onChange={upload} accept="image/*" />}
      </label>

      {/* Status toast */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="rounded-2xl border border-emerald-100 bg-emerald-50 px-5 py-3 text-sm font-medium text-emerald-700"
          >
            {status}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grid */}
      {assets.length === 0 ? (
        <div className="rounded-[24px] border border-dashed border-ink/10 bg-white/60 py-16 text-center">
          <Images className="mx-auto h-8 w-8 text-ink/15" />
          <p className="mt-3 text-sm text-ink/30">No media uploaded yet.</p>
        </div>
      ) : (
        <div>
          <p className="mb-3 ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/25">
            {assets.length} asset{assets.length !== 1 ? "s" : ""}
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {assets.map((asset) => (
              <motion.div
                key={asset.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="group overflow-hidden rounded-[20px] bg-white shadow-sm ring-1 ring-ink/5"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-mist">
                  <Image
                    src={asset.url}
                    alt={asset.alt ?? asset.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                </div>
                <div className="p-3">
                  <p className="truncate text-xs font-medium text-ink">{asset.name}</p>
                  <button
                    onClick={() => copyUrl(asset)}
                    className={`mt-2 flex w-full items-center justify-center gap-1.5 rounded-xl py-2 text-xs font-semibold transition-all ${
                      copiedId === asset.id
                        ? "bg-emerald-50 text-emerald-600"
                        : "bg-mist text-ink/50 hover:bg-ink hover:text-white"
                    }`}
                  >
                    {copiedId === asset.id ? (
                      <><Check className="h-3 w-3" /> Copied</>
                    ) : (
                      <><Copy className="h-3 w-3" /> Copy URL</>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
