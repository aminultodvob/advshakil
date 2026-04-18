import type { Metadata } from "next";
import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { absoluteUrl, DEFAULT_OG_IMAGE, getSeoKeywords } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title =
    locale === "bn"
      ? "যোগাযোগ | অ্যাডভোকেট সাকিল আহমাদ"
      : "Contact Adv Shakil Ahmad | Supreme Court Lawyer, Corporate & Tax Expert";
  const description =
    locale === "bn"
      ? "পরামর্শ, আইনগত কৌশল, করপোরেট আইন, ট্যাক্স, লিটিগেশন বা পেশাগত যোগাযোগের জন্য অ্যাডভোকেট সাকিল আহমাদের সঙ্গে যোগাযোগ করুন।"
      : "Contact Adv Shakil Ahmad for consultation, litigation strategy, corporate law, tax, VAT, arbitration, and professional legal inquiries.";

  return {
    title,
    description,
    keywords: getSeoKeywords(locale),
    alternates: {
      canonical: absoluteUrl("/contact")
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/contact"),
      images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), alt: "Contact Adv Shakil Ahmad" }]
    }
  };
}

export default async function ContactPage() {
  const locale = await getLocale();

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow={t(locale, "Contact", "যোগাযোগ")}
              title={t(
                locale,
                "Start a confidential conversation.",
                "গোপনীয় একটি আলাপ শুরু করুন।"
              )}
              copy={t(
                locale,
                "For consultation requests, legal strategy discussions, or professional inquiries, use the contact form and expect a prompt response.",
                "পরামর্শ, আইনগত কৌশল বা পেশাগত অনুসন্ধানের জন্য যোগাযোগ ফর্ম ব্যবহার করুন। দ্রুত সাড়া দেওয়া হবে।"
              )}
            />
            <div className="space-y-4">
              {[
                { icon: Mail, label: t(locale, "Email", "ইমেইল"), value: "admin@shakilahmad.com" },
                { icon: Phone, label: t(locale, "Phone", "ফোন"), value: "+880 1916-948710" },
                {
                  icon: MapPin,
                  label: t(locale, "Location", "অবস্থান"),
                  value: t(locale, "Dhaka, Bangladesh", "ঢাকা, বাংলাদেশ")
                },
                {
                  icon: CalendarDays,
                  label: t(locale, "Consultation", "পরামর্শ"),
                  value: t(
                    locale,
                    "Private appointments available upon request",
                    "অনুরোধের ভিত্তিতে ব্যক্তিগত অ্যাপয়েন্টমেন্ট পাওয়া যাবে"
                  )
                }
              ].map((item) => (
                <div key={item.label} className="glass-panel flex items-start gap-4 p-5">
                  <div className="rounded-2xl bg-gold/10 p-3 text-gold">
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      {item.label}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ink/70 dark:text-white/80">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="glass-panel gold-ring p-8 sm:p-10">
            <ContactForm />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
