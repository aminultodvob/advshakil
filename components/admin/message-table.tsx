"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ContactMessage } from "@prisma/client";
import { CheckCircle, ChevronDown, ChevronUp, Mail, Phone, Clock, Check } from "lucide-react";

export function MessageTable({ messages }: { messages: ContactMessage[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [expanded, setExpanded] = useState<string | null>(null);
  const [doneIds, setDoneIds] = useState<Set<string>>(new Set());

  const unread = messages.filter((m) => !m.isRead);
  const read = messages.filter((m) => m.isRead);

  function markAsRead(id: string) {
    startTransition(async () => {
      await fetch(`/api/admin/messages/${id}`, { method: "PATCH" });
      setDoneIds((prev) => new Set([...prev, id]));
      router.refresh();
    });
  }

  function MessageCard({ message }: { message: ContactMessage }) {
    const isOpen = expanded === message.id;
    const isRead = message.isRead || doneIds.has(message.id);

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        className={`overflow-hidden rounded-[20px] border bg-white transition-all ${
          isRead ? "border-ink/5 opacity-70" : "border-gold/20 shadow-sm shadow-gold/10"
        }`}
      >
        {/* Card header */}
        <button
          className="flex w-full items-start gap-3 p-4 text-left"
          onClick={() => setExpanded(isOpen ? null : message.id)}
        >
          <div
            className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
              isRead ? "bg-mist text-ink/30" : "bg-gold/10 text-gold"
            }`}
          >
            <Mail className="h-4 w-4" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate font-semibold text-ink">{message.name}</p>
              {!isRead && (
                <span className="shrink-0 rounded-full bg-gold/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gold">
                  New
                </span>
              )}
            </div>
            <p className="mt-0.5 truncate text-sm font-medium text-ink/60">{message.subject}</p>
            <p className="mt-1 truncate text-xs text-ink/35">
              {new Date(message.createdAt).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
                year: "numeric"
              })}
            </p>
          </div>
          <span className="mt-1 shrink-0 text-ink/20">
            {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </span>
        </button>

        {/* Expanded body */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="space-y-4 border-t border-ink/5 px-4 pb-5 pt-4">
                <div className="flex flex-wrap gap-4 text-xs text-ink/50">
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3 w-3" /> {message.email}
                  </span>
                  {message.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3 w-3" /> {message.phone}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3 w-3" />
                    {new Date(message.createdAt).toLocaleString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                      day: "numeric",
                      month: "short"
                    })}
                  </span>
                </div>
                <p className="text-sm leading-relaxed text-ink/70">{message.message}</p>
                {!isRead && (
                  <button
                    onClick={() => markAsRead(message.id)}
                    disabled={isPending}
                    className="flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-ink/90 active:scale-95"
                  >
                    <Check className="h-3.5 w-3.5" />
                    Mark as Read
                  </button>
                )}
                {isRead && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                    <CheckCircle className="h-3.5 w-3.5" /> Read
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-ink/10 bg-white/60 py-20 text-center">
        <Mail className="mx-auto h-8 w-8 text-ink/15" />
        <p className="mt-4 text-sm text-ink/30">No messages yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Unread */}
      {unread.length > 0 && (
        <div className="space-y-3">
          <p className="ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/30">
            Unread · {unread.length}
          </p>
          <AnimatePresence mode="popLayout">
            {unread.map((m) => (
              <MessageCard key={m.id} message={m} />
            ))}
          </AnimatePresence>
        </div>
      )}
      {/* Read */}
      {read.length > 0 && (
        <div className="space-y-3">
          <p className="ml-1 text-[10px] font-bold uppercase tracking-widest text-ink/25">
            Read · {read.length}
          </p>
          <AnimatePresence mode="popLayout">
            {read.map((m) => (
              <MessageCard key={m.id} message={m} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
