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
import { 
  Save, 
  Send, 
  Image as ImageIcon, 
  ChevronLeft, 
  Eye, 
  Type, 
  FileText,
  Sparkles,
  Settings2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type PostValue = Pick<
  BlogPost,
  "title" | "slug" | "excerpt" | "coverImage" | "content" | "status" | "featured"
>;

const initialPost: PostValue = {
  title: "",
  slug: "",
  excerpt: "",
  coverImage: "",
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
      try {
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

        // Insert into editor
        editor?.chain().focus().setImage({ src: payload.url }).run();
        
        // Also update cover image if it's currently empty
        setValue(curr => ({
           ...curr,
           coverImage: curr.coverImage || payload.url
        }));

        setStatus("Image uploaded and inserted successfully.");
      } catch (err) {
        setStatus("Network error during upload.");
      } finally {
        // Reset file input
        event.target.value = "";
      }
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
    <div className="relative space-y-8 pb-24">
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-8 left-1/2 z-[100] -translate-x-1/2"
          >
            <div className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-2xl backdrop-blur-xl ring-1 ring-white/20">
              {status}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Top Bar */}
      <div className="sticky top-0 z-50 -mx-4 mb-8 bg-mist/80 px-4 py-4 backdrop-blur-lg sm:-mx-8 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              className="h-11 w-11 rounded-full p-0"
              onClick={() => router.push("/admin/posts")}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="font-serif text-2xl text-ink">
                {post ? "Edit Article" : "Compose New Insight"}
              </h1>
              <p className="text-xs text-ink/50 uppercase tracking-widest">
                {value.status} &bull; {value.slug || "no-slug"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              variant="secondary"
              className="rounded-full px-6"
              disabled={isPending}
              onClick={() => save("DRAFT")}
            >
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button
              type="button"
              className="rounded-full bg-gold px-8 text-white hover:bg-gold/90 shadow-lg shadow-gold/20"
              disabled={isPending}
              onClick={() => save("PUBLISHED")}
            >
              <Send className="mr-2 h-4 w-4" />
              {isPending ? "Publishing..." : "Publish Post"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="space-y-8">
          {/* Main Content Area */}
          <div className="rounded-[40px] border border-ink/5 bg-white p-8 shadow-card sm:p-12">
            <div className="space-y-10">
              <div className="group space-y-4">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold opacity-60 group-focus-within:opacity-100 transition-opacity">
                  <Type className="h-3 w-3" />
                  Headline
                </label>
                <input
                  type="text"
                  placeholder="Enter a compelling title..."
                  className="w-full border-none bg-transparent p-0 font-serif text-5xl text-ink outline-none placeholder:text-ink/15 focus:ring-0"
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
              </div>

              <div className="group space-y-4">
                <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold opacity-60 group-focus-within:opacity-100 transition-opacity">
                  <FileText className="h-3 w-3" />
                  Summary
                </label>
                <textarea
                  placeholder="Draft a brief introduction to engage readers..."
                  className="min-h-[120px] w-full resize-none border-none bg-transparent p-0 text-xl leading-relaxed text-ink/70 outline-none placeholder:text-ink/15 focus:ring-0"
                  value={value.excerpt}
                  onChange={(event) =>
                    setValue((current) => ({ ...current, excerpt: event.target.value }))
                  }
                />
              </div>

              <div className="space-y-6 pt-10 border-t border-ink/5">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold">
                    <Sparkles className="h-3 w-3" />
                    Content Editor
                  </label>
                  <div className="flex gap-1 rounded-full border border-ink/5 bg-mist p-1">
                    {[
                      { icon: "B", action: () => editor?.chain().focus().toggleBold().run(), active: editor?.isActive('bold') },
                      { icon: "I", action: () => editor?.chain().focus().toggleItalic().run(), active: editor?.isActive('italic') },
                      { icon: "H2", action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(), active: editor?.isActive('heading', { level: 2 }) },
                      { icon: "H3", action: () => editor?.chain().focus().toggleHeading({ level: 3 }).run(), active: editor?.isActive('heading', { level: 3 }) },
                      { icon: "List", action: () => editor?.chain().focus().toggleBulletList().run(), active: editor?.isActive('bulletList') },
                    ].map((tool, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={tool.action}
                        className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                          tool.active ? "bg-white text-gold shadow-sm" : "text-ink/40 hover:text-ink/60"
                        }`}
                      >
                        {tool.icon}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="min-h-[500px] border-none">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          {/* Metadata & Media Box */}
          <div className="sticky top-28 space-y-6">
            <div className="rounded-[36px] border border-ink/5 bg-white p-8 shadow-card">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gold mb-8">
                <Settings2 className="h-3 w-3" />
                Post Settings
              </div>
              
              <div className="space-y-8">
                <div className="space-y-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/40">
                    Routing Slug
                  </label>
                  <Input
                    placeholder="post-url-slug"
                    className="rounded-2xl border-ink/5 bg-mist/50 focus:bg-white transition-all"
                    value={value.slug}
                    onChange={(event) =>
                      setValue((current) => ({ ...current, slug: createSlug(event.target.value) }))
                    }
                  />
                </div>

                <div className="space-y-4">
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-ink/40">
                    Art Direction (Cover)
                  </label>
                  <div className="group relative overflow-hidden rounded-2xl border-2 border-dashed border-ink/5 bg-mist/30 p-2 transition-all hover:border-gold/30">
                    {value.coverImage ? (
                      <div className="relative aspect-video w-full overflow-hidden rounded-xl">
                        <img 
                          src={value.coverImage} 
                          alt="Cover preview" 
                          className="h-full w-full object-cover"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-ink/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <label className="cursor-pointer rounded-full bg-white px-4 py-2 text-xs font-bold text-ink hover:scale-105 transition-transform">
                            Replace Image
                            <input type="file" className="hidden" onChange={uploadImage} accept="image/*" />
                          </label>
                        </div>
                      </div>
                    ) : (
                      <label className="flex aspect-video w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-xl hover:bg-white transition-colors">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
                          <ImageIcon className="h-6 w-6" />
                        </div>
                        <span className="text-xs font-medium text-ink/40">Upload Cover Image</span>
                        <input type="file" className="hidden" onChange={uploadImage} accept="image/*" />
                      </label>
                    )}
                  </div>
                  <Input
                    placeholder="Or paste image URL..."
                    className="mt-3 rounded-xl border-ink/5 text-xs opacity-60 focus:opacity-100 transition-opacity"
                    value={value.coverImage}
                    onChange={(event) =>
                      setValue((current) => ({ ...current, coverImage: event.target.value }))
                    }
                  />
                </div>

                <div className="pt-6 border-t border-ink/5">
                  <label className="flex cursor-pointer items-center justify-between gap-3 group">
                    <div className="space-y-1">
                      <span className="text-sm font-semibold text-ink group-hover:text-gold transition-colors">Featured Post</span>
                      <p className="text-[10px] text-ink/40 leading-relaxed uppercase tracking-wider">Showcase on the homepage</p>
                    </div>
                    <div className="relative inline-flex items-center">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={value.featured}
                        onChange={(event) =>
                          setValue((current) => ({ ...current, featured: event.target.checked }))
                        }
                      />
                      <div className="w-11 h-6 bg-mist peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gold"></div>
                    </div>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-2 rounded-2xl bg-ink/5 p-4 text-[11px] font-medium text-ink/40 uppercase tracking-widest">
              <Eye className="h-3 w-3" />
              Live Preview matches design
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
