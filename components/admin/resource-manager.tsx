"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { createSlug } from "@/lib/utils";

type ResourceField = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "checkbox";
  slugSource?: boolean;
};

type ResourceItem = Record<string, string | boolean> & { id: string };

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
  const [draft, setDraft] = useState(emptyState);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingState, setEditingState] = useState<Record<string, string | boolean>>({});
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateState(
    setter: React.Dispatch<React.SetStateAction<Record<string, string | boolean>>>,
    state: Record<string, string | boolean>,
    key: string,
    value: string | boolean
  ) {
    const sourceField = fields.find((field) => field.slugSource);

    setter({
      ...state,
      [key]: value,
      ...(sourceField && key === sourceField.key
        ? { slug: createSlug(String(value)) }
        : {})
    });
  }

  function save(itemId?: string) {
    const body = itemId ? editingState : draft;

    startTransition(async () => {
      const response = await fetch(itemId ? `${endpoint}/${itemId}` : endpoint, {
        method: itemId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
      const payload = await response.json();

      if (!response.ok) {
        setStatus(payload.error ?? "Unable to save.");
        return;
      }

      setStatus("Saved successfully.");
      setEditingId(null);
      setEditingState({});
      setDraft(emptyState);
      router.refresh();
    });
  }

  function remove(itemId: string) {
    startTransition(async () => {
      const response = await fetch(`${endpoint}/${itemId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        setStatus("Unable to delete.");
        return;
      }

      setStatus("Deleted successfully.");
      router.refresh();
    });
  }

  return (
    <div className="space-y-8">
      <div className="rounded-[30px] bg-white p-6 shadow-card sm:p-8">
        <h2 className="font-serif text-3xl text-ink">{title}</h2>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/62">{description}</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {fields.map((field) =>
            field.type === "textarea" ? (
              <Textarea
                key={field.key}
                placeholder={field.label}
                className="md:col-span-2"
                value={String(draft[field.key] ?? "")}
                onChange={(event) =>
                  updateState(setDraft, draft, field.key, event.target.value)
                }
              />
            ) : field.type === "checkbox" ? (
              <label
                key={field.key}
                className="flex items-center gap-3 rounded-2xl border border-ink/10 px-4 py-3 text-sm text-ink/70"
              >
                <input
                  type="checkbox"
                  checked={Boolean(draft[field.key])}
                  onChange={(event) =>
                    updateState(setDraft, draft, field.key, event.target.checked)
                  }
                />
                {field.label}
              </label>
            ) : (
              <Input
                key={field.key}
                placeholder={field.label}
                value={String(draft[field.key] ?? "")}
                onChange={(event) =>
                  updateState(setDraft, draft, field.key, event.target.value)
                }
              />
            )
          )}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-sm text-ink/55">{status ?? "Changes sync after save."}</p>
          <Button type="button" onClick={() => save()} disabled={isPending}>
            Add New
          </Button>
        </div>
      </div>

      <div className="space-y-5">
        {items.map((item) => {
          const isEditing = editingId === item.id;
          const source = isEditing ? editingState : item;

          return (
            <div key={item.id} className="rounded-[30px] bg-white p-6 shadow-card sm:p-8">
              <div className="grid gap-4 md:grid-cols-2">
                {fields.map((field) =>
                  field.type === "textarea" ? (
                    <Textarea
                      key={field.key}
                      className="md:col-span-2"
                      value={String(source[field.key] ?? "")}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateState(setEditingState, editingState, field.key, event.target.value)
                      }
                    />
                  ) : field.type === "checkbox" ? (
                    <label
                      key={field.key}
                      className="flex items-center gap-3 rounded-2xl border border-ink/10 px-4 py-3 text-sm text-ink/70"
                    >
                      <input
                        type="checkbox"
                        checked={Boolean(source[field.key])}
                        disabled={!isEditing}
                        onChange={(event) =>
                          updateState(
                            setEditingState,
                            editingState,
                            field.key,
                            event.target.checked
                          )
                        }
                      />
                      {field.label}
                    </label>
                  ) : (
                    <Input
                      key={field.key}
                      value={String(source[field.key] ?? "")}
                      disabled={!isEditing}
                      onChange={(event) =>
                        updateState(setEditingState, editingState, field.key, event.target.value)
                      }
                    />
                  )
                )}
              </div>
              <div className="mt-6 flex flex-wrap justify-end gap-3">
                {isEditing ? (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingId(null);
                        setEditingState({});
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="button" onClick={() => save(item.id)} disabled={isPending}>
                      Save Changes
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => {
                        setEditingId(item.id);
                        setEditingState(item);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => remove(item.id)}
                      disabled={isPending}
                    >
                      Delete
                    </Button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
