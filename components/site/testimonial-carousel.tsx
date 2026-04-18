"use client";

import { useEffect, useState } from "react";

import { useLanguage } from "@/components/site/language-provider";

type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string | null;
  quote: string;
};

export function TestimonialCarousel({
  testimonials
}: {
  testimonials: Testimonial[];
}) {
  const { locale } = useLanguage();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) {
      return;
    }

    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, [testimonials.length]);

  if (!testimonials.length) {
    return null;
  }

  const active = testimonials[index];

  return (
    <div className="glass-panel gold-ring relative overflow-hidden p-8 sm:p-10">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />
      <p className="font-serif text-2xl leading-relaxed text-ink sm:text-3xl">
        "{active.quote}"
      </p>
      <div className="mt-8 flex items-center justify-between gap-4">
        <div>
          <p className="font-semibold text-ink">{active.name}</p>
          <p className="text-sm text-muted">
            {active.role}
            {active.company ? ` · ${active.company}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {testimonials.map((testimonial, dotIndex) => (
            <button
              key={testimonial.id}
              onClick={() => setIndex(dotIndex)}
              className={`h-2.5 rounded-full transition-all ${
                dotIndex === index ? "w-8 bg-gold" : "w-2.5 bg-ink/20"
              }`}
              aria-label={
                locale === "bn"
                  ? `প্রশংসাপত্র ${dotIndex + 1} এ যান`
                  : `Go to testimonial ${dotIndex + 1}`
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
