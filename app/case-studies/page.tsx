import { prisma } from "@/lib/prisma";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";

export default async function CaseStudiesPage() {
  const caseStudies = await prisma.caseStudy.findMany({
    orderBy: [{ featured: "desc" }, { createdAt: "desc" }]
  });

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Case Studies"
            title="Structured legal thinking, applied to consequential matters."
            copy="Each study is presented in a clean problem-to-outcome format that communicates both strategic process and result orientation."
          />
          <div className="mt-14 space-y-6">
            {caseStudies.map((study) => (
              <article
                id={study.slug}
                key={study.id}
                className="rounded-[32px] border border-white/80 bg-white p-8 shadow-card sm:p-10 dark:border-white/10 dark:bg-[#233142]"
              >
                <div className="grid gap-6 lg:grid-cols-[0.65fr_1.35fr]">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                      Selected Matter
                    </p>
                    <h2 className="mt-4 font-serif text-4xl text-slate-900 dark:text-white">{study.title}</h2>
                    <p className="mt-4 text-base leading-8 text-slate-700 dark:text-white/80">{study.excerpt}</p>
                  </div>
                  <div className="grid gap-5 md:grid-cols-3">
                    <div className="rounded-[24px] bg-mist p-5 dark:bg-[#2a3a4d]">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                        Problem
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-white/80">{study.problem}</p>
                    </div>
                    <div className="rounded-[24px] bg-mist p-5 dark:bg-[#2a3a4d]">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                        Strategy
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-white/80">{study.strategy}</p>
                    </div>
                    <div className="rounded-[24px] bg-mist p-5 dark:bg-[#2a3a4d]">
                      <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
                        Outcome
                      </p>
                      <p className="mt-3 text-sm leading-7 text-slate-700 dark:text-white/80">{study.outcome}</p>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
