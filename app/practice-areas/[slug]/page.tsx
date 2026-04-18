import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";
import { localizePracticeArea } from "@/lib/content-localization";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { SiteShell } from "@/components/site/site-shell";
import { PracticeIcon } from "@/components/site/practice-icon";

export default async function PracticeAreaDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const locale = await getLocale();
  const { slug } = await params;
  const practiceArea = await prisma.practiceArea.findUnique({
    where: { slug }
  });

  if (!practiceArea) {
    notFound();
  }

  const localizedPracticeArea = localizePracticeArea(practiceArea, locale);
  const points =
    locale === "bn"
      ? [
          "তীক্ষ্ণ ইস্যু শনাক্তকরণ",
          "নথিভিত্তিক ঝুঁকি নিয়ন্ত্রণ",
          "বাণিজ্যিক বাস্তবতাসম্মত আইনগত পরামর্শ",
          "চাপের মধ্যে প্রস্তুত আইনগত উপস্থাপনা"
        ]
      : [
          "Sharp issue identification",
          "Documentation-first risk control",
          "Commercially aware legal advice",
          "Prepared advocacy under pressure"
        ];

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6">
            <span className="eyebrow">{t(locale, "Practice Detail", "প্র্যাকটিসের বিস্তারিত")}</span>
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gold/10 text-gold">
              <PracticeIcon icon={localizedPracticeArea.icon} className="h-7 w-7" />
            </div>
            <h1 className="font-serif text-5xl text-ink dark:text-white">{localizedPracticeArea.title}</h1>
            <p className="text-xl leading-9 text-ink/70 dark:text-white/80">{localizedPracticeArea.summary}</p>
          </div>
          <div className="glass-panel gold-ring p-8 sm:p-10">
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-gold">
                  {t(locale, "Strategic Approach", "কৌশলগত দৃষ্টিভঙ্গি")}
                </p>
                <p className="mt-3 text-lg leading-9 text-ink/75 dark:text-white/82">
                  {localizedPracticeArea.description}
                </p>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                {points.map((point) => (
                  <div key={point} className="rounded-[24px] bg-mist p-5 text-sm text-ink/70 dark:bg-white/5 dark:text-white/80">
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
