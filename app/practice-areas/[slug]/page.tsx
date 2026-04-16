import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { SiteShell } from "@/components/site/site-shell";
import { PracticeIcon } from "@/components/site/practice-icon";

export default async function PracticeAreaDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const practiceArea = await prisma.practiceArea.findUnique({
    where: { slug }
  });

  if (!practiceArea) {
    notFound();
  }

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <span className="eyebrow">Practice Detail</span>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/10 text-gold">
              <PracticeIcon icon={practiceArea.icon} className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-5xl text-ink">{practiceArea.title}</h1>
            <p className="text-xl leading-9 text-ink/70">{practiceArea.summary}</p>
          </div>
          <div className="glass-panel gold-ring p-8 sm:p-10">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  Strategic Approach
                </p>
                <p className="mt-3 text-lg leading-9 text-ink/75">
                  {practiceArea.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  "Sharp issue identification",
                  "Documentation-first risk control",
                  "Commercially aware legal advice",
                  "Prepared advocacy under pressure"
                ].map((point) => (
                  <div key={point} className="rounded-[24px] bg-mist p-5 text-sm text-ink/70">
                    {point}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
