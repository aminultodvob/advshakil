import { CalendarDays, Mail, MapPin, Phone } from "lucide-react";

import { SiteShell } from "@/components/site/site-shell";
import { ContactForm } from "@/components/site/contact-form";
import { SectionHeading } from "@/components/ui/section-heading";

export default function ContactPage() {
  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.88fr_1.12fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Contact"
              title="Start a confidential conversation."
              copy="For consultation requests, legal strategy discussions, or professional inquiries, use the contact form and expect a prompt response."
            />
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "admin@shakilahmad.com" },
                { icon: Phone, label: "Phone", value: "+880 1916-948710" },
                { icon: MapPin, label: "Location", value: "Dhaka, Bangladesh" },
                {
                  icon: CalendarDays,
                  label: "Consultation",
                  value: "Private appointments available upon request"
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
                    <p className="mt-2 text-sm leading-7 text-ink/70">{item.value}</p>
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
