"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import type { MediaAsset } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function MediaLibrary({ assets }: { assets: MediaAsset[] }) {
  const router = useRouter();
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function upload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

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
        return;
      }

      setStatus("File uploaded successfully.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[30px] bg-white p-6 shadow-card sm:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="font-serif text-3xl text-ink">Media uploads</h2>
            <p className="mt-2 text-sm leading-7 text-ink/62">
              Upload blog visuals and reusable assets to the local media library.
            </p>
          </div>
          <label>
            <Input type="file" className="pt-3" onChange={upload} />
          </label>
        </div>
        {status ? <p className="mt-4 text-sm text-ink/65">{status}</p> : null}
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {assets.map((asset) => (
          <div key={asset.id} className="overflow-hidden rounded-[28px] bg-white shadow-card">
            <div className="relative h-52">
              <Image
                src={asset.url}
                alt={asset.alt ?? asset.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="space-y-3 p-5">
              <p className="truncate font-medium text-ink">{asset.name}</p>
              <p className="truncate text-sm text-ink/55">{asset.url}</p>
              <Button
                type="button"
                variant="secondary"
                disabled={isPending}
                onClick={() => navigator.clipboard.writeText(asset.url)}
              >
                Copy URL
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
