"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import type { ContactMessage } from "@prisma/client";

import { Button } from "@/components/ui/button";

export function MessageTable({ messages }: { messages: ContactMessage[] }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function markAsRead(id: string) {
    startTransition(async () => {
      await fetch(`/api/admin/messages/${id}`, {
        method: "PATCH"
      });
      router.refresh();
    });
  }

  return (
    <div className="overflow-hidden rounded-[30px] bg-white shadow-card">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-ink/8 text-ink/55">
            <tr>
              <th className="px-6 py-4 font-medium">Client</th>
              <th className="px-6 py-4 font-medium">Subject</th>
              <th className="px-6 py-4 font-medium">Message</th>
              <th className="px-6 py-4 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id} className="border-b border-ink/8 align-top last:border-0">
                <td className="px-6 py-5">
                  <p className="font-medium text-ink">{message.name}</p>
                  <p className="mt-1 text-ink/55">{message.email}</p>
                </td>
                <td className="px-6 py-5 text-ink/72">{message.subject}</td>
                <td className="px-6 py-5 text-ink/68">{message.message}</td>
                <td className="px-6 py-5">
                  {message.isRead ? (
                    <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Read
                    </span>
                  ) : (
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => markAsRead(message.id)}
                      disabled={isPending}
                    >
                      Mark Read
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
