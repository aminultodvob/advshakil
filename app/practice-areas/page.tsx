import Link from "next/link";

import { prisma } from "@/lib/prisma";
import { localizePracticeArea } from "@/lib/content-localization";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { PracticeIcon } from "@/components/site/practice-icon";

export default async function PracticeAreasPage() {
  const locale = await getLocale();
  const practiceAreas = (await prisma.practiceArea.findMany({
    orderBy: { createdAt: "asc" }
  })).map((area) => localizePracticeArea(area, locale));

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={t(locale, "Practice Areas", "প্র্যাকটিস এরিয়া")}
            title={t(
              locale,
              "Focused legal expertise across litigation, corporate, tax, and dispute strategy.",
              "লিটিগেশন, করপোরেট, ট্যাক্স ও বিরোধ কৌশলে নিবিড় আইনগত দক্ষতা।"
            )}
            copy={t(
              locale,
              "Each service line is structured to inspire confidence immediately and to support practical, high-value outcomes.",
              "প্রতিটি সেবাক্ষেত্র এমনভাবে বিন্যস্ত, যা শুরু থেকেই আস্থা জাগায় এবং বাস্তবসম্মত ও মূল্যবান ফলাফল নিশ্চিত করতে সহায়তা করে।"
            )}
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
                <h2 className="mt-6 font-serif text-3xl text-ink dark:text-white">{area.title}</h2>
                <p className="mt-4 text-base leading-8 text-ink/70 dark:text-white/80">{area.summary}</p>
                <div className="mt-8 text-sm font-semibold uppercase tracking-[0.18em] text-ink dark:text-white">
                  {t(locale, "Learn more", "বিস্তারিত জানুন")}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
