"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  X,
  Edit3,
  Trash2,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  StarOff,
  Loader2
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createSlug } from "@/lib/utils";

type ResourceField = {
  key: string;
  label: string;
  placeholder?: string;
  type?: "text" | "textarea" | "checkbox";
  slugSource?: boolean;
};

type ResourceItem = Record<string, string | boolean> & { id: string };

/* ────────────────────────────────────────────────────────────── */
/* Single generic form                                           */
/* ────────────────────────────────────────────────────────────── */
function ResourceForm({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
  isPending,
  submitLabel = "Save",
  cancelLabel = "Cancel"
}: {
  fields: ResourceField[];
  values: Record<string, string | boolean>;
  onChange: (key: string, value: string | boolean) => void;
  onSubmit: () => void;
  onCancel?: () => void;
  isPending: boolean;
  submitLabel?: string;
  cancelLabel?: string;
}) {
  return (
    <div className="space-y-4">
      {fields.map((field) => {
        if (field.type === "checkbox") {
          return (
            <label
              key={field.key}
              className="flex cursor-pointer items-center justify-between rounded-2xl border border-ink/8 bg-mist/40 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{field.label}</p>
                <p className="text-[11px] text-ink/40">Featured on homepage</p>
              </div>
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={Boolean(values[field.key])}
                  onChange={(e) => onChange(field.key, e.target.checked)}
                />
                <div className="h-6 w-11 rounded-full bg-ink/10 transition-all peer-checked:bg-gold after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow after:transition-all after:content-[''] peer-checked:after:translate-x-5" />
              </div>
            </label>
          );
        }
        if (field.type === "textarea") {
          return (
            <div key={field.key} className="space-y-1.5">
              <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/35">
                {field.label}
              </label>
              <Textarea
                placeholder={field.placeholder ?? `Describe the ${field.label.toLowerCase()}...`}
                className="min-h-[100px] rounded-2xl border-ink/8 bg-white text-sm leading-relaxed focus:border-gold/40 focus:ring-0"
                value={String(values[field.key] ?? "")}
                onChange={(e) => onChange(field.key, e.target.value)}
              />
            </div>
          );
        }
        return (
          <div key={field.key} className="space-y-1.5">
            <label className="ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/35">
              {field.label}
            </label>
            <Input
              placeholder={field.placeholder ?? field.label}
              className="h-11 rounded-2xl border-ink/8 bg-white text-sm focus:border-gold/40 focus:ring-0"
              value={String(values[field.key] ?? "")}
              onChange={(e) => onChange(field.key, e.target.value)}
            />
          </div>
        );
      })}

      <div className="flex gap-3 pt-2">
        {onCancel && (
          <Button
            type="button"
            variant="ghost"
            className="flex-1 rounded-2xl border border-ink/10 text-sm"
            onClick={onCancel}
            disabled={isPending}
          >
            {cancelLabel}
          </Button>
        )}
        <Button
          type="button"
          className="flex-1 rounded-2xl bg-ink py-3 text-sm text-white shadow-lg"
          onClick={onSubmit}
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : null}
          {isPending ? "Saving..." : submitLabel}
        </Button>
      </div>
    </div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Single saved item card                                        */
/* ────────────────────────────────────────────────────────────── */
function ItemCard({
  item,
  fields,
  endpoint,
  onRefresh,
  onStatusMsg
}: {
  item: ResourceItem;
  fields: ResourceField[];
  endpoint: string;
  onRefresh: () => void;
  onStatusMsg: (msg: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editState, setEditState] = useState<Record<string, string | boolean>>(item);
  const [isPending, startTransition] = useTransition();

  /* derive display title */
  const titleField = fields.find((f) => f.slugSource) ?? fields[0];
  const titleValue = String(item[titleField.key] ?? "Untitled");
  const isFeatured = Boolean(item["featured"]);
  const hasFeaturedField = fields.some((f) => f.type === "checkbox");

  function handleChange(key: string, value: string | boolean) {
    const slugSrc = fields.find((f) => f.slugSource);
    setEditState((prev) => ({
      ...prev,
      [key]: value,
      ...(slugSrc && key === slugSrc.key ? { slug: createSlug(String(value)) } : {})
    }));
  }

  function saveEdit() {
    startTransition(async () => {
      const res = await fetch(`${endpoint}/${item.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editState)
      });
      if (!res.ok) {
        onStatusMsg("Could not save changes.");
        return;
      }
      onStatusMsg("Saved successfully.");
      setEditing(false);
      setExpanded(false);
      onRefresh();
    });
  }

  function handleDelete() {
    if (!confirm("Delete this item permanently?")) return;
    startTransition(async () => {
      const res = await fetch(`${endpoint}/${item.id}`, { method: "DELETE" });
      if (!res.ok) {
        onStatusMsg("Could not delete item.");
        return;
      }
      onStatusMsg("Deleted successfully.");
      onRefresh();
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      className="overflow-hidden rounded-[24px] border border-ink/8 bg-white shadow-sm"
    >
      {/* Header row - always visible */}
      <div
        className="flex cursor-pointer items-center gap-3 p-4"
        onClick={() => {
          if (!editing) setExpanded((v) => !v);
        }}
      >
        {hasFeaturedField && (
          <div className="flex-shrink-0">
            {isFeatured ? (
              <Star className="h-4 w-4 fill-gold text-gold" />
            ) : (
              <StarOff className="h-4 w-4 text-ink/20" />
            )}
          </div>
        )}
        <p className="flex-1 truncate font-serif text-lg text-ink">{titleValue}</p>
        <div className="flex items-center gap-2">
          {!editing && (
            <>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/30 hover:bg-ink/5 hover:text-ink transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  setEditState(item);
                  setEditing(true);
                  setExpanded(true);
                }}
              >
                <Edit3 className="h-3.5 w-3.5" />
              </button>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink/30 hover:bg-red-50 hover:text-red-500 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
                disabled={isPending}
              >
                {isPending ? (
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                ) : (
                  <Trash2 className="h-3.5 w-3.5" />
                )}
              </button>
            </>
          )}
          {!editing && (
            <span className="text-ink/20">
              {expanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </span>
          )}
        </div>
      </div>

      {/* Expanded view / edit form */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.35 }}
            className="overflow-hidden"
          >
            <div className="border-t border-ink/5 px-4 pb-5 pt-4">
              {editing ? (
                <ResourceForm
                  fields={fields}
                  values={editState}
                  onChange={handleChange}
                  onSubmit={saveEdit}
                  onCancel={() => {
                    setEditing(false);
                    setExpanded(false);
                  }}
                  isPending={isPending}
                  submitLabel="Save Changes"
                />
              ) : (
                <div className="space-y-3">
                  {fields
                    .filter((f) => f.type !== "checkbox")
                    .map((f) => (
                      <div key={f.key}>
                        <p className="mb-0.5 text-[9px] font-bold uppercase tracking-widest text-ink/25">
                          {f.label}
                        </p>
                        <p className="text-sm leading-relaxed text-ink/70">
                          {String(item[f.key] ?? "—")}
                        </p>
                      </div>
                    ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/* ────────────────────────────────────────────────────────────── */
/* Main ResourceManager export                                   */
/* ────────────────────────────────────────────────────────────── */
export function ResourceManager({
  title,
  description,
  fields,
  endpoint,
  items,
  emptyState
}: {
  title: string;
  description: string;
  fields: ResourceField[];
  endpoint: string;
  items: ResourceItem[];
  emptyState: Record<string, string | boolean>;
}) {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [draft, setDraft] = useState(emptyState);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleDraftChange(key: string, value: string | boolean) {
    const slugSrc = fields.find((f) => f.slugSource);
    setDraft((prev) => ({
      ...prev,
      [key]: value,
      ...(slugSrc && key === slugSrc.key ? { slug: createSlug(String(value)) } : {})
    }));
  }

  function showStatus(msg: string) {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(null), 3500);
  }

  function create() {
    startTransition(async () => {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(draft)
      });
      const payload = await res.json();
      if (!res.ok) {
        showStatus(payload.error ?? "Could not create item.");
        return;
      }
      showStatus("Created successfully.");
      setDraft(emptyState);
      setShowAdd(false);
      router.refresh();
    });
  }

  return (
    <div className="space-y-6">
      {/* ── Toast notification ─────────────── */}
      <AnimatePresence>
        {statusMsg && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-20 left-1/2 z-[200] -translate-x-1/2 xl:bottom-8"
          >
            <div className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white shadow-2xl ring-1 ring-white/20">
              <CheckCircle2 className="h-4 w-4 text-gold" />
              {statusMsg}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Page header + Add button ────────── */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h2>
          <p className="mt-1 max-w-lg text-sm leading-relaxed text-ink/50">{description}</p>
        </div>
        <button
          onClick={() => setShowAdd((v) => !v)}
          className={`flex shrink-0 items-center gap-2 rounded-2xl px-5 py-3 text-sm font-semibold shadow-sm transition-all ${
            showAdd
              ? "bg-ink/8 text-ink"
              : "bg-ink text-white shadow-lg shadow-ink/20 hover:bg-ink/90"
          }`}
        >
          {showAdd ? <X className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
          {showAdd ? "Cancel" : "Add New"}
        </button>
      </div>

      {/* ── Add form (collapsible) ───────────── */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            key="add-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="overflow-hidden"
          >
            <div className="rounded-[28px] border border-gold/20 bg-white p-5 shadow-md ring-1 ring-gold/10 sm:p-8">
              <div className="mb-6 flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold">
                  New Entry
                </span>
              </div>
              <ResourceForm
                fields={fields}
                values={draft}
                onChange={handleDraftChange}
                onSubmit={create}
                isPending={isPending}
                submitLabel="Create"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Saved items list ─────────────────── */}
      <div>
        {items.length === 0 ? (
          <div className="rounded-[24px] border border-dashed border-ink/10 bg-white/60 py-16 text-center">
            <p className="text-sm text-ink/30">No entries yet. Add one above.</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/25">
              {items.length} saved {items.length === 1 ? "entry" : "entries"}
            </p>
            <AnimatePresence mode="popLayout">
              {items.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  fields={fields}
                  endpoint={endpoint}
                  onRefresh={() => router.refresh()}
                  onStatusMsg={showStatus}
                />
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
