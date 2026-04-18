"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input, Textarea } from "@/components/ui/input";
import { useLanguage } from "@/components/site/language-provider";

const initialState = {
  name: "",
  email: "",
  phone: "",
  subject: "",
  message: ""
};

export function ContactForm() {
  const { locale } = useLanguage();
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
        setStatus(
          locale === "bn"
            ? "আপনার বার্তা পাঠানো হয়েছে। আমরা দ্রুত সাড়া দেব।"
            : "Your message has been sent. We will respond promptly."
        );
        return;
      }

      const payload = await response.json().catch(() => null);
      setStatus(
        payload?.error ??
          (locale === "bn"
            ? "এই মুহূর্তে আপনার বার্তা পাঠানো যাচ্ছে না।"
            : "Unable to send your message right now.")
      );
    });
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          placeholder={locale === "bn" ? "আপনার নাম" : "Your name"}
          value={form.name}
          onChange={(event) => setForm({ ...form, name: event.target.value })}
          required
        />
        <Input
          type="email"
          placeholder={locale === "bn" ? "ইমেইল ঠিকানা" : "Email address"}
          value={form.email}
          onChange={(event) => setForm({ ...form, email: event.target.value })}
          required
        />
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Input
          placeholder={locale === "bn" ? "ফোন নম্বর" : "Phone number"}
          value={form.phone}
          onChange={(event) => setForm({ ...form, phone: event.target.value })}
        />
        <Input
          placeholder={locale === "bn" ? "বিষয়" : "Subject"}
          value={form.subject}
          onChange={(event) => setForm({ ...form, subject: event.target.value })}
          required
        />
      </div>
      <Textarea
        placeholder={
          locale === "bn"
            ? "আপনার আইনগত বিষয়ে সংক্ষেপে লিখুন"
            : "Tell us about your legal matter"
        }
        value={form.message}
        onChange={(event) => setForm({ ...form, message: event.target.value })}
        required
      />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink/55">
          {locale === "bn"
            ? "গোপনীয় পরামর্শ-সংক্রান্ত অনুরোধ সর্বোচ্চ সতর্কতার সঙ্গে বিবেচনা করা হয়।"
            : "Confidential consultation inquiries are handled with discretion."}
        </p>
        <Button type="submit" disabled={isPending}>
          {isPending
            ? locale === "bn"
              ? "পাঠানো হচ্ছে..."
              : "Sending..."
            : locale === "bn"
              ? "বার্তা পাঠান"
              : "Send Inquiry"}
        </Button>
      </div>
      {status ? <p className="text-sm text-ink/70">{status}</p> : null}
    </form>
  );
}
