import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, Star } from "lucide-react";

import { getHomepageData } from "@/lib/data";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { TestimonialCarousel } from "@/components/site/testimonial-carousel";
import { MotionDiv } from "@/components/site/motion";
import { PracticeIcon } from "@/components/site/practice-icon";

export default async function HomePage() {
  const { practiceAreas, testimonials, caseStudies, featuredPost } =
    await getHomepageData();

  const stats = [
    { label: "Years of Experience", value: 8, suffix: "+" },
    { label: "Core Practice Verticals", value: 6, suffix: "" },
    { label: "National Leadership Role", value: 1, suffix: "" }
  ];

  return (
    <SiteShell>
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gold opacity-90" />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-12 h-[460px] w-[460px] rounded-full bg-gold/15 blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-8 h-72 w-72 rounded-full bg-ink/10 blur-3xl dark:bg-gold/10"
        />

        <div className="container-shell relative py-8 sm:py-10 lg:py-12">
          <div className="grid items-start gap-10 xl:grid-cols-[0.96fr_1.04fr]">
            <MotionDiv
              initial="hidden"
              animate="visible"
              variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
              className="space-y-8 xl:pr-8"
            >
              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="eyebrow"
              >
                Legal counsel with corporate, litigation, and tax depth
              </MotionDiv>

              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="space-y-6"
              >
                <h1 className="max-w-6xl font-serif text-4xl leading-[1.12] text-ink dark:text-white sm:text-6xl lg:text-[4.2rem]">
                  <span className="lg:block">Advocate | Politician |</span>
                  <span className="lg:block">Legal Strategist |</span>
                  <span className="lg:block">Corporate &amp; Tax Expert</span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-700 dark:text-white/80 sm:text-xl">
                  Shakil Ahmad delivers high-trust legal representation across
                  litigation, corporate law, documentation, arbitration, income
                  tax, and VAT with the calm judgment, sharp preparation, and
                  modern responsiveness expected from elite counsel.
                </p>
              </MotionDiv>

              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-4"
              >
                <LinkButton href="https://lawsheba.com/" target="_blank">Visit Law Sheba</LinkButton>
                <LinkButton href="/practice-areas" variant="secondary">
                  View Expertise
                </LinkButton>
              </MotionDiv>

              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-3"
              >
                {["Litigation", "Corporate Law", "Income Tax", "VAT", "Arbitration"].map(
                  (item) => (
                    <span
                      key={item}
                      className="rounded-full border border-gold/20 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white/80"
                    >
                      {item}
                    </span>
                  )
                )}
              </MotionDiv>

              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="grid gap-4 sm:grid-cols-3"
              >
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className="glass-panel bg-white/88 p-6 dark:border-white/10 dark:bg-[#233142]"
                  >
                    <p className="font-serif text-4xl text-ink dark:text-white">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    </p>
                    <p className="mt-2 text-sm text-slate-600 dark:text-white/70">{stat.label}</p>
                  </div>
                ))}
              </MotionDiv>
            </MotionDiv>

            <MotionDiv
              initial={{ opacity: 0, x: 40, scale: 0.97 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              className="relative mx-auto w-full max-w-[640px] xl:-mt-2"
            >
              <div className="absolute -right-8 top-10 hidden h-40 w-40 rounded-full bg-gold/15 blur-3xl lg:block" />
              <div className="glass-panel gold-ring relative overflow-hidden p-4 sm:p-5">
                <div className="relative min-h-[520px] overflow-hidden rounded-[34px] bg-[#eef1f4] sm:min-h-[680px] dark:bg-[#243242]">
                  <Image
                    src="/images/advshakil.jpg"
                    alt="Portrait of Advocate Shakil Ahmad"
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1280px) 100vw, 620px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/18 via-transparent to-transparent" />

                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                    <div className="mx-auto max-w-[520px] rounded-[24px] border border-white/18 bg-[linear-gradient(135deg,rgba(9,17,28,0.92),rgba(9,17,28,0.8))] p-5 text-white shadow-2xl backdrop-blur-xl sm:mx-0 sm:max-w-[440px] sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                        Advocate &amp; Politician
                      </p>
                      <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-[2.35rem]">
                        Adv Shakil Ahmad
                      </h2>
                      <div className="mt-4 space-y-2 text-sm text-white/80 sm:text-[15px]">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold" />
                          Lawyer at the Bangladesh Supreme Court
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-gold text-gold" />
                          Central Joint Chief Coordinator, NCP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </MotionDiv>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-[36px]">
            <div className="absolute inset-0">
              <Image
                src="/images/supreme-court.jpg"
                alt="Supreme Court of Bangladesh"
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(8,17,28,0.88),rgba(8,17,28,0.58),rgba(8,17,28,0.3))]" />
            <div className="relative z-10 grid min-h-[420px] items-end p-8 sm:p-10 lg:min-h-[500px] lg:p-14">
              <div className="max-w-3xl space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
                  Institutional Presence
                </p>
                <h2 className="font-serif text-4xl leading-tight text-white sm:text-5xl">
                  Advocacy informed by constitutional seriousness and courtroom discipline.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-white/80 sm:text-lg">
                  The legal identity is shaped not only by private counsel and commercial
                  strategy, but by a deeper alignment with institutional rigor, public
                  trust, and the formal gravity of the justice system.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Practice Excellence"
            title="Comprehensive legal capability, delivered with elite calm."
            copy="Every mandate is approached with a premium blend of strategic foresight, technical rigor, and client-centered execution."
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {practiceAreas.map((area) => (
              <Link
                key={area.id}
                href={`/practice-areas/${area.slug}`}
                className="group rounded-[30px] border border-white/80 bg-white p-8 shadow-card transition duration-300 hover:-translate-y-1 hover:border-gold/30 dark:border-white/10 dark:bg-[#233142]"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold dark:bg-gold/12">
                  <PracticeIcon icon={area.icon} />
                </div>
                <h3 className="mt-6 font-serif text-3xl text-ink dark:text-white">{area.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-700 dark:text-white/80">{area.summary}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.18em] text-slate-700 dark:text-white/90">
                  Explore expertise
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <SectionHeading
            eyebrow="Client Trust"
            title="Confidence earned through strategy, communication, and results."
            copy="Clients seek counsel that can stand up in the courtroom, hold weight in negotiations, and remain composed through complexity."
          />
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      <section className="section-space bg-white dark:bg-[#1b2633]">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Selected Matters"
            title="Case studies shaped by clear strategy and decisive execution."
            copy="Representative engagements illustrating how legal problems are reframed into structured, defensible outcomes."
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <article
                key={study.id}
                className="rounded-[30px] border border-ink/8 bg-mist p-8 dark:border-white/10 dark:bg-[#233142]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  Case Study
                </p>
                <h3 className="mt-4 font-serif text-3xl text-ink dark:text-white">{study.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-700 dark:text-white/80">{study.excerpt}</p>
                <Link
                  href={`/case-studies#${study.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-ink dark:text-white"
                >
                  View Matter
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {featuredPost ? (
        <section className="section-space">
          <div className="container-shell">
            <SectionHeading
              eyebrow="Latest Insight"
              title="Modern legal thinking for serious clients and ambitious businesses."
              copy="Insight-led articles designed to inform, reassure, and position legal counsel as a strategic advantage."
            />
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="mt-14 block overflow-hidden rounded-[34px] border border-white/80 bg-white shadow-card dark:border-white/10 dark:bg-[#233142]"
            >
              <div className="grid items-center gap-8 p-8 lg:grid-cols-[0.85fr_1.15fr] lg:p-12">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
                    Featured Article
                  </p>
                  <h3 className="mt-4 font-serif text-4xl text-ink dark:text-white">
                    {featuredPost.title}
                  </h3>
                </div>
                <p className="text-lg leading-8 text-slate-700 dark:text-white/80">
                  {featuredPost.excerpt}
                </p>
              </div>
            </Link>
          </div>
        </section>
      ) : null}

      <section className="section-space">
        <div className="container-shell">
          <div className="glass-panel gold-ring overflow-hidden p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow">Private Consultation</p>
                <h2 className="mt-6 font-serif text-4xl text-ink dark:text-white sm:text-5xl">
                  Legal matters deserve trusted strategy from the very first conversation.
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-white/80">
                  Start with a confidential consultation designed to clarify the
                  legal landscape, identify the core risks, and define the next
                  best move with confidence.
                </p>
              </div>
              <LinkButton href="https://lawsheba.com/" target="_blank" className="h-fit">
                Visit Law Sheba
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
