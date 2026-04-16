"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus(null);

    startTransition(async () => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        setForm(initialState);
        setStatus("Your message has been sent. We will respond promptly.");
        return;
      }

      const payload = await response.json().catch(() => null);
      setStatus(payload?.error ?? "Unable to send your message right now.");
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          placeholder="Your name"
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <Input
          type="email"
          placeholder="Email address"
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          placeholder="Phone number"
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
        />
        <Input
          placeholder="Subject"
          value={form.subject}
          onChange={(event) => setForm({ ...form, subject: event.target.value })}
          required
        />
      </div>
      <Textarea
        placeholder="Tell us about your legal matter"
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
        required
      />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/55">
          Confidential consultation inquiries are handled with discretion.
        </p>
        <Button type="submit" disabled={isPending}>
          {isPending ? "Sending..." : "Send Inquiry"}
        </Button>
      </div>
      {status ? <p className="text-sm text-ink/70">{status}</p> : null}
    </form>
  );
}
