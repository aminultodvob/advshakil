"use client";

import type { BlogPost } from "@prisma/client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createSlug } from "@/lib/utils";
import { postStatuses } from "@/lib/validators";

type PostValue = Pick<
  BlogPost,
  "title" | "slug" | "excerpt" | "coverImage" | "content" | "status" | "featured"
>;

const initialPost: PostValue = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "https://images.unsplash.com/photo-1528747008803-1b92fe4f3fbd?auto=format&fit=crop&w=1200&q=80",
  content: "<p>Start writing here...</p>",
  status: "DRAFT",
  featured: false
};

export function PostEditor({
  post
}: {
  post?: BlogPost | null;
}) {
  const router = useRouter();
  const [value, setValue] = useState<PostValue>(post ?? initialPost);
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit, Image],
    content: post?.content ?? initialPost.content,
    onUpdate: ({ editor: instance }) => {
      setValue((current) => ({ ...current, content: instance.getHTML() }));
    }
  });

  useEffect(() => {
    if (editor && post?.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post?.content]);

  function uploadImage(event: React.ChangeEvent<HTMLInputElement>) {
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

      editor?.chain().focus().setImage({ src: payload.url }).run();
      setStatus("Image uploaded successfully.");
    });
  }

  function save(nextStatus?: (typeof postStatuses)[number]) {
    setStatus(null);
    startTransition(async () => {
      const payload = {
        ...value,
        slug: value.slug || createSlug(value.title),
        status: nextStatus ?? value.status
      };

      const response = await fetch(
        post ? `/api/admin/posts/${post.id}` : "/api/admin/posts",
        {
          method: post ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setStatus(data.error ?? "Unable to save post.");
        return;
      }

      setStatus("Post saved successfully.");
      router.push(`/admin/posts/${data.id}`);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[30px] bg-white p-6 shadow-card sm:p-8">
          <div className="space-y-5">
            <Input
              placeholder="Post title"
              value={value.title}
              onChange={(event) =>
                setValue((current) => ({
                  ...current,
                  title: event.target.value,
                  slug:
                    current.slug === "" || current.slug === createSlug(current.title)
                      ? createSlug(event.target.value)
                      : current.slug
                }))
              }
            />
            <Input
              placeholder="SEO-friendly slug"
              value={value.slug}
              onChange={(event) =>
                setValue((current) => ({ ...current, slug: createSlug(event.target.value) }))
              }
            />
            <Textarea
              placeholder="Short excerpt"
              value={value.excerpt}
              onChange={(event) =>
                setValue((current) => ({ ...current, excerpt: event.target.value }))
              }
            />
          </div>
        </div>

        <div className="rounded-[30px] bg-white p-6 shadow-card sm:p-8">
          <div className="space-y-5">
            <Input
              placeholder="Cover image URL"
              value={value.coverImage}
              onChange={(event) =>
                setValue((current) => ({ ...current, coverImage: event.target.value }))
              }
            />
            <label className="block text-sm text-ink/65">
              Upload inline image
              <Input type="file" className="mt-2 pt-3" onChange={uploadImage} />
            </label>
            <label className="flex items-center gap-3 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={value.featured}
                onChange={(event) =>
                  setValue((current) => ({ ...current, featured: event.target.checked }))
                }
              />
              Mark as featured article
            </label>
          </div>
        </div>
      </div>

      <div className="rounded-[30px] bg-white shadow-card">
        <div className="flex flex-wrap gap-2 border-b border-ink/8 p-4">
          {[
            { label: "Bold", action: () => editor?.chain().focus().toggleBold().run() },
            { label: "Italic", action: () => editor?.chain().focus().toggleItalic().run() },
            { label: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run() },
            { label: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run() },
            { label: "Bullet", action: () => editor?.chain().focus().toggleBulletList().run() }
          ].map((tool) => (
            <Button key={tool.label} type="button" variant="secondary" onClick={tool.action}>
              {tool.label}
            </Button>
          ))}
        </div>
        <EditorContent editor={editor} />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-ink/60">{status ?? "All changes are local until saved."}</p>
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="secondary"
            disabled={isPending}
            onClick={() => save("DRAFT")}
          >
            Save Draft
          </Button>
          <Button
            type="button"
            disabled={isPending}
            onClick={() => save("PUBLISHED")}
          >
            {isPending ? "Saving..." : "Publish Post"}
          </Button>
        </div>
      </div>
    </div>
  );
}
