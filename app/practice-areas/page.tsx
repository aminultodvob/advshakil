import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticeIcon } from "@/components/site/practice-icon";

export default async function PracticeAreasPage() {
  const practiceAreas = await prisma.practiceArea.findMany({
    orderBy: { createdAt: "asc" }
  });

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Practice Areas"
            title="Focused legal expertise across litigation, corporate, tax, and dispute strategy."
            copy="Each service line is structured to inspire confidence immediately and to support practical, high-value outcomes."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {practiceAreas.map((area) => (
              <Link
                key={area.id}
                href={`/practice-areas/${area.slug}`}
                className="group rounded-[32px] border border-white/80 bg-white p-8 shadow-card transition hover:-translate-y-1 dark:bg-white/5"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold">
                  <PracticeIcon icon={area.icon} />
                </div>
                <h2 className="mt-6 font-serif text-3xl text-ink">{area.title}</h2>
                <p className="mt-4 text-base leading-8 text-ink/70">{area.summary}</p>
                <div className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-ink">
                  Learn more
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
