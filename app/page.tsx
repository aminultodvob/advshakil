import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Flag, Landmark, MapPin, Star } from "lucide-react";

import { getHomepageData } from "@/lib/data";
import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import {
  localizeBlogPost,
  localizeCaseStudy,
  localizePracticeArea,
  localizeTestimonial
} from "@/lib/content-localization";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { LinkButton } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/site/animated-counter";
import { TestimonialCarousel } from "@/components/site/testimonial-carousel";
import { MotionDiv } from "@/components/site/motion";
import { PracticeIcon } from "@/components/site/practice-icon";
import { PostCard } from "@/components/site/post-card";

export default async function HomePage() {
  const locale = await getLocale();
  const { practiceAreas, testimonials, caseStudies, recentPosts } =
    await getHomepageData();

  const localizedPracticeAreas = practiceAreas.map((area) =>
    localizePracticeArea(area, locale)
  );
  const localizedTestimonials = testimonials.map((testimonial) =>
    localizeTestimonial(testimonial, locale)
  );
  const localizedCaseStudies = caseStudies.map((study) =>
    localizeCaseStudy(study, locale)
  );
  const localizedPosts = recentPosts.map((post) => localizeBlogPost(post, locale));

  const stats = [
    {
      label: t(locale, "Years of Experience", "বছরের অভিজ্ঞতা"),
      value: 8,
      suffix: "+"
    },
    {
      label: t(locale, "Core Practice Verticals", "মূল প্র্যাকটিস এরিয়া"),
      value: 6,
      suffix: ""
    },
    {
      label: t(locale, "National Leadership Role", "জাতীয় নেতৃত্বের ভূমিকা"),
      value: 1,
      suffix: ""
    }
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
                {t(
                  locale,
                  "Legal counsel with corporate, litigation, and tax depth",
                  "করপোরেট, লিটিগেশন ও ট্যাক্সে গভীর অভিজ্ঞতাসম্পন্ন আইনসেবা"
                )}
              </MotionDiv>

              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="space-y-6"
              >
                <h1 className="max-w-6xl font-serif text-4xl leading-[1.12] text-ink dark:text-white sm:text-6xl lg:text-[4.2rem]">
                  <span className="lg:block">
                    {t(locale, "Advocate | Politician |", "অ্যাডভোকেট | রাজনীতিবিদ |")}
                  </span>
                  <span className="lg:block">
                    {t(locale, "Legal Strategist |", "লিগ্যাল স্ট্র্যাটেজিস্ট |")}
                  </span>
                  <span className="lg:block">
                    {t(locale, "Corporate & Tax Expert", "করপোরেট ও ট্যাক্স বিশেষজ্ঞ")}
                  </span>
                </h1>
                <p className="max-w-2xl text-lg leading-8 text-slate-700 dark:text-white/90 sm:text-xl">
                  {t(
                    locale,
                    "Shakil Ahmad delivers high-trust legal representation across litigation, corporate law, documentation, arbitration, income tax, and VAT with the calm judgment, sharp preparation, and modern responsiveness expected from elite counsel.",
                    "সাকিল আহমাদ লিটিগেশন, করপোরেট আইন, ডকুমেন্টেশন, আরবিট্রেশন, আয়কর ও ভ্যাটে উচ্চমানের আইনগত প্রতিনিধিত্ব প্রদান করেন। তাঁর কাজের স্বাক্ষর হলো স্থির বিচারবোধ, সূক্ষ্ম প্রস্তুতি এবং আধুনিক পেশাদার সাড়া।"
                  )}
                </p>
              </MotionDiv>

              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-4"
              >
                <LinkButton href="https://lawsheba.com/" target="_blank">
                  {t(locale, "Visit Law Sheba", "ভিজিট ল' সেবা")}
                </LinkButton>
                <LinkButton href="/practice-areas" variant="secondary">
                  {t(locale, "View Expertise", "প্র্যাকটিস এরিয়া দেখুন")}
                </LinkButton>
              </MotionDiv>

              <MotionDiv
                variants={{ hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0 } }}
                className="flex flex-wrap gap-3"
              >
                {[
                  t(locale, "Litigation", "লিটিগেশন"),
                  t(locale, "Corporate Law", "করপোরেট আইন"),
                  t(locale, "Income Tax", "আয়কর"),
                  t(locale, "VAT", "ভ্যাট"),
                  t(locale, "Arbitration", "আরবিট্রেশন")
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-gold/20 bg-white/75 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm backdrop-blur dark:bg-white/10 dark:text-white/80"
                  >
                    {item}
                  </span>
                ))}
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
                    <p className="mt-2 text-sm text-slate-600 dark:text-white/80">{stat.label}</p>
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
                    alt={t(
                      locale,
                      "Portrait of Advocate Shakil Ahmad",
                      "অ্যাডভোকেট সাকিল আহমাদের প্রতিকৃতি"
                    )}
                    fill
                    priority
                    className="object-cover object-top"
                    sizes="(max-width: 1280px) 100vw, 620px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/18 via-transparent to-transparent" />

                  <div className="absolute inset-x-4 bottom-4 sm:inset-x-6 sm:bottom-6">
                    <div className="mx-auto max-w-[520px] rounded-[24px] border border-white/18 bg-[linear-gradient(135deg,rgba(9,17,28,0.92),rgba(9,17,28,0.8))] p-5 text-white shadow-2xl backdrop-blur-xl sm:mx-0 sm:max-w-[440px] sm:p-6">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                        {t(locale, "Advocate & Politician", "অ্যাডভোকেট ও রাজনীতিবিদ")}
                      </p>
                      <h2 className="mt-3 font-serif text-3xl leading-tight sm:text-[2.35rem]">
                        {t(locale, "Adv Shakil Ahmad", "অ্যাডভোকেট সাকিল আহমাদ")}
                      </h2>
                      <div className="mt-4 space-y-2 text-sm text-white/80 sm:text-[15px]">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-gold" />
                          {t(
                            locale,
                            "Lawyer at the Bangladesh Supreme Court",
                            "বাংলাদেশ সুপ্রিম কোর্টের আইনজীবী"
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="h-4 w-4 fill-gold text-gold" />
                          {t(
                            locale,
                            "Central Joint Chief Coordinator, NCP",
                            "কেন্দ্রীয় যুগ্ম মুখ্য সমন্বয়ক, এনসিপি"
                          )}
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

      <section className="pb-12 pt-10 sm:pb-14 sm:pt-12 lg:pb-16 lg:pt-14">
        <div className="container-shell">
          <div className="relative overflow-hidden rounded-[36px]">
            <div className="absolute inset-0">
              <Image
                src="/images/supreme-court.jpg"
                alt={t(locale, "Supreme Court of Bangladesh", "বাংলাদেশ সুপ্রিম কোর্ট")}
                fill
                className="object-cover"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(7,15,24,0.94),rgba(10,20,32,0.74),rgba(10,20,32,0.42))]" />
            <div className="relative z-10 grid min-h-[420px] items-end p-8 sm:p-10 lg:min-h-[500px] lg:p-14">
              <div className="max-w-3xl space-y-5">
                <p className="text-xs font-semibold uppercase tracking-[0.32em] text-gold">
                  {t(locale, "Institutional Presence", "প্রাতিষ্ঠানিক উপস্থিতি")}
                </p>
                <h2 className="font-serif text-4xl leading-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.35)] sm:text-5xl">
                  {t(
                    locale,
                    "Advocacy informed by constitutional seriousness and courtroom discipline.",
                    "সাংবিধানিক গুরুত্ববোধ ও আদালতকেন্দ্রিক শৃঙ্খলায় নির্মিত আইনচর্চা।"
                  )}
                </h2>
                <p className="max-w-2xl text-base leading-8 text-white sm:text-lg">
                  {t(
                    locale,
                    "The legal identity is shaped not only by private counsel and commercial strategy, but by a deeper alignment with institutional rigor, public trust, and the formal gravity of the justice system.",
                    "এই আইনগত পরিচয় কেবল ব্যক্তিগত পরামর্শ ও বাণিজ্যিক কৌশলে নির্মিত নয়; এটি গড়ে উঠেছে প্রাতিষ্ঠানিক শৃঙ্খলা, জনআস্থা এবং বিচারব্যবস্থার মর্যাদার গভীর অনুষঙ্গে।"
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pb-[4.5rem] lg:pt-12">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="relative overflow-hidden rounded-[40px] shadow-2xl ring-1 ring-gold/20">
              <div className="relative min-h-[360px] sm:min-h-[460px]">
                <Image
                  src="/images/09.avif"
                  alt={t(
                    locale,
                    "Advocate Shakil Ahmad serving in political leadership with the National Citizen Party",
                    "জাতীয় নাগরিক পার্টির রাজনৈতিক নেতৃত্বে অ্যাডভোকেট সাকিল আহমাদ"
                  )}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 620px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/10 to-transparent" />
              </div>
            </div>

            <div className="glass-panel gold-ring p-8 sm:p-10">
              <p className="eyebrow">{t(locale, "Political Leadership", "রাজনৈতিক নেতৃত্ব")}</p>
              <h2 className="mt-6 font-serif text-4xl leading-tight text-ink sm:text-5xl dark:text-white">
                {t(
                  locale,
                  "Serving the National Citizen Party with national-level coordination responsibility.",
                  "জাতীয় নাগরিক পার্টিতে জাতীয় পর্যায়ের সমন্বয় দায়িত্ব পালন।"
                )}
              </h2>
              <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-white">
                {locale === "bn" ? (
                  <>
                    আইনজীবী পরিচয়ের পাশাপাশি অ্যাডভোকেট সাকিল আহমাদ{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      জাতীয় নাগরিক পার্টি (এনসিপি)-র কেন্দ্রীয় যুগ্ম মুখ্য সমন্বয়ক
                    </span>{" "}
                    হিসেবে দায়িত্ব পালন করছেন। এই ভূমিকা তাঁর সংগঠনক্ষমতা, জনসম্পৃক্ততা, প্রাতিষ্ঠানিক দায়বদ্ধতা এবং জাতীয় গুরুত্বপূর্ণ বিষয়ে সরাসরি সম্পৃক্ততার আরেকটি শক্তিশালী মাত্রা তুলে ধরে।
                  </>
                ) : (
                  <>
                    Alongside his legal career, Advocate Shakil Ahmad serves the
                    National Citizen Party (NCP) as{" "}
                    <span className="font-semibold text-slate-900 dark:text-white">
                      Central Joint Chief Coordinator
                    </span>
                    . This role reflects an additional dimension of leadership built on
                    organization, public engagement, institutional responsibility,
                    and direct involvement in matters of national importance.
                  </>
                )}
              </p>
              <p className="mt-5 text-lg leading-8 text-slate-700 dark:text-white">
                {t(
                  locale,
                  "The combination of courtroom discipline and political coordination gives his profile a rare balance of legal authority, public trust, and strategic clarity in both civic and professional spheres.",
                  "আদালতের শৃঙ্খলা ও রাজনৈতিক সমন্বয় দক্ষতার এই সমন্বয় তাঁর প্রোফাইলকে আইনগত কর্তৃত্ব, জনআস্থা এবং কৌশলগত স্বচ্ছতার এক বিরল ভারসাম্যে উন্নীত করেছে।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-14 pt-6 sm:pb-16 sm:pt-8 lg:pb-[4.5rem] lg:pt-10">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div className="space-y-6">
              <SectionHeading
                eyebrow={t(locale, "National Leadership", "জাতীয় নেতৃত্ব")}
                title={t(
                  locale,
                  "Public leadership shaped by service, national responsibility, and love for country.",
                  "সেবা, জাতীয় দায়বদ্ধতা ও দেশপ্রেমে নির্মিত জননেতৃত্ব।"
                )}
                copy={t(
                  locale,
                  "Alongside Supreme Court practice, Adv Shakil Ahmad serves the National Citizen Party as Central Joint Chief Coordinator, bringing legal discipline, public engagement, and organizational leadership into national service.",
                  "সুপ্রিম কোর্টে আইনচর্চার পাশাপাশি অ্যাডভোকেট সাকিল আহমাদ জাতীয় নাগরিক পার্টির কেন্দ্রীয় যুগ্ম মুখ্য সমন্বয়ক হিসেবে জাতীয় সেবায় আইনগত শৃঙ্খলা, জনসম্পৃক্ততা ও সংগঠনগত নেতৃত্বকে একত্রিত করছেন।"
                )}
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="glass-panel p-6">
                  <Flag className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-serif text-2xl text-slate-900 dark:text-white">
                    {t(locale, "Serving the Nation", "জাতির সেবায়")}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-slate-700 dark:text-white/90">
                    {t(
                      locale,
                      "His political role reflects civic commitment, strategic coordination, and active service grounded in national interest.",
                      "তাঁর রাজনৈতিক ভূমিকা নাগরিক অঙ্গীকার, কৌশলগত সমন্বয় এবং জাতীয় স্বার্থভিত্তিক সক্রিয় সেবার পরিচয় বহন করে।"
                    )}
                  </p>
                </div>
                <div className="glass-panel p-6">
                  <Landmark className="h-6 w-6 text-gold" />
                  <h3 className="mt-4 font-serif text-2xl text-slate-900 dark:text-white">
                    {t(locale, "Leadership with Discipline", "শৃঙ্খলাবদ্ধ নেতৃত্ব")}
                  </h3>
                  <p className="mt-3 text-base leading-8 text-slate-700 dark:text-white/90">
                    {t(
                      locale,
                      "The same seriousness seen in legal practice carries into public leadership, communication, and organizational responsibility.",
                      "আইনচর্চায় যে গভীরতা দেখা যায়, একই শৃঙ্খলা তাঁর জননেতৃত্ব, যোগাযোগ ও সংগঠনগত দায়িত্ব পালনের মধ্যেও প্রতিফলিত হয়।"
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="glass-panel gold-ring relative overflow-hidden p-4 sm:p-5">
              <div
                aria-hidden
                className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gold/15 blur-3xl"
              />
              <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-[linear-gradient(145deg,rgba(16,24,35,0.98),rgba(28,40,55,0.94))] p-4 shadow-2xl sm:p-5">
                <div className="mb-4 flex items-center justify-between gap-4 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                      {t(locale, "Leadership Address", "নেতৃত্বের বক্তব্য")}
                    </p>
                    <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                      {t(
                        locale,
                        "Voice, conviction, and service to the nation",
                        "কণ্ঠ, বিশ্বাস ও জাতির প্রতি সেবা"
                      )}
                    </h3>
                  </div>
                  <div className="hidden rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/75 sm:block">
                    {t(locale, "National Citizen Party", "জাতীয় নাগরিক পার্টি")}
                  </div>
                </div>

                <div className="aspect-video overflow-hidden rounded-[24px] border border-white/10 bg-black shadow-[0_24px_60px_rgba(0,0,0,0.35)]">
                  <iframe
                    src="https://www.youtube.com/embed/iR9hp2Pu19w"
                    title={t(
                      locale,
                      "Adv Shakil Ahmad leadership video",
                      "অ্যাডভোকেট সাকিল আহমাদের নেতৃত্বমূলক ভিডিও"
                    )}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                      {t(locale, "Public Leadership", "জননেতৃত্ব")}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/80">
                      {t(
                        locale,
                        "A presentation of national responsibility, public connection, and disciplined political communication.",
                        "জাতীয় দায়বদ্ধতা, জনসংযোগ এবং শৃঙ্খলাপূর্ণ রাজনৈতিক ভাষ্যকে তুলে ধরার একটি পরিশীলিত উপস্থাপন।"
                      )}
                    </p>
                  </div>
                  <div className="rounded-[20px] border border-white/10 bg-white/5 px-4 py-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold">
                      {t(locale, "Service & Vision", "সেবা ও ভিশন")}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-white/80">
                      {t(
                        locale,
                        "Framed to reflect love for country, civic commitment, and leadership grounded in accountability.",
                        "দেশপ্রেম, নাগরিক অঙ্গীকার এবং জবাবদিহিমূলক নেতৃত্বের পরিচয় তুলে ধরার জন্য সাজানো।"
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={t(locale, "Practice Excellence", "প্র্যাকটিসের উৎকর্ষতা")}
            title={t(
              locale,
              "Comprehensive legal capability, delivered with elite calm.",
              "পূর্ণাঙ্গ আইনগত সক্ষমতা, উপস্থাপনায় অভিজাত স্থিরতা।"
            )}
            copy={t(
              locale,
              "Every mandate is approached with a premium blend of strategic foresight, technical rigor, and client-centered execution.",
              "প্রতিটি দায়িত্ব গ্রহণ করা হয় কৌশলগত দূরদৃষ্টি, কারিগরি দৃঢ়তা এবং মক্কেলকেন্দ্রিক বাস্তবায়নের সমন্বয়ে।"
            )}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {localizedPracticeAreas.map((area) => (
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
                  {t(locale, "Explore expertise", "বিস্তারিত দেখুন")}
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
            eyebrow={t(locale, "Client Trust", "ক্লায়েন্টের আস্থা")}
            title={t(
              locale,
              "Confidence earned through strategy, communication, and results.",
              "কৌশল, যোগাযোগ ও ফলাফলের মাধ্যমে অর্জিত আস্থা।"
            )}
            copy={t(
              locale,
              "Clients seek counsel that can stand up in the courtroom, hold weight in negotiations, and remain composed through complexity.",
              "মক্কেলরা এমন পরামর্শ চান যা আদালতে দৃঢ়, আলোচনায় প্রভাবশালী এবং জটিল পরিস্থিতিতেও স্থির থাকে।"
            )}
          />
          <TestimonialCarousel testimonials={localizedTestimonials} />
        </div>
      </section>

      <section className="section-space bg-white dark:bg-[#1b2633]">
        <div className="container-shell">
          <SectionHeading
            eyebrow={t(locale, "Selected Matters", "নির্বাচিত বিষয়সমূহ")}
            title={t(
              locale,
              "Case studies shaped by clear strategy and decisive execution.",
              "স্পষ্ট কৌশল ও দৃঢ় বাস্তবায়নে নির্মিত কেস স্টাডি।"
            )}
            copy={t(
              locale,
              "Representative engagements illustrating how legal problems are reframed into structured, defensible outcomes.",
              "প্রতিনিধিত্বমূলক কাজের উদাহরণ, যেখানে আইনগত সমস্যাকে কাঠামোবদ্ধ ও টেকসই সমাধানে রূপ দেওয়া হয়েছে।"
            )}
          />
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {localizedCaseStudies.map((study) => (
              <article
                key={study.id}
                className="rounded-[30px] border border-ink/8 bg-mist p-8 dark:border-white/10 dark:bg-[#233142]"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  {t(locale, "Case Study", "কেস স্টাডি")}
                </p>
                <h3 className="mt-4 font-serif text-3xl text-ink dark:text-white">{study.title}</h3>
                <p className="mt-4 text-base leading-8 text-slate-700 dark:text-white/80">{study.excerpt}</p>
                <Link
                  href={`/case-studies#${study.slug}`}
                  className="mt-6 inline-flex text-sm font-semibold uppercase tracking-[0.18em] text-ink dark:text-white"
                >
                  {t(locale, "View Matter", "বিস্তারিত দেখুন")}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {localizedPosts.length ? (
        <section className="section-space">
          <div className="container-shell">
            <SectionHeading
              eyebrow={t(locale, "Latest Insight", "সাম্প্রতিক অন্তর্দৃষ্টি")}
              title={t(
                locale,
                "Modern legal thinking for serious clients and ambitious businesses.",
                "গুরুত্বপূর্ণ মক্কেল ও উচ্চাভিলাষী প্রতিষ্ঠানের জন্য আধুনিক আইনভিত্তিক চিন্তা।"
              )}
              copy={t(
                locale,
                "Insight-led articles designed to inform, reassure, and position legal counsel as a strategic advantage.",
                "তথ্যসমৃদ্ধ ও কৌশলভিত্তিক আর্টিকেল, যা পাঠককে অবহিত করে, আশ্বস্ত করে এবং আইনগত পরামর্শকে কৌশলগত শক্তিতে রূপ দেয়।"
              )}
            />
            <div className="mt-14 flex items-center justify-between gap-4">
              <p className="text-sm uppercase tracking-[0.22em] text-gold">
                {t(locale, "Recent Articles", "সাম্প্রতিক আর্টিকেল")}
              </p>
              <LinkButton href="/blog" variant="secondary">
                {t(locale, "All Articles", "সব আর্টিকেল")}
              </LinkButton>
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {localizedPosts.slice(0, 3).map((post) => (
                <PostCard key={post.id} post={post} locale={locale} />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-space">
        <div className="container-shell">
          <div className="glass-panel gold-ring overflow-hidden p-8 sm:p-12">
            <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="eyebrow">{t(locale, "Private Consultation", "ব্যক্তিগত পরামর্শ")}</p>
                <h2 className="mt-6 font-serif text-4xl text-ink dark:text-white sm:text-5xl">
                  {t(
                    locale,
                    "Legal matters deserve trusted strategy from the very first conversation.",
                    "আইনগত বিষয়ে প্রথম আলাপ থেকেই প্রয়োজন বিশ্বস্ত কৌশলগত পরামর্শ।"
                  )}
                </h2>
                <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-700 dark:text-white/90">
                  {t(
                    locale,
                    "Start with a confidential consultation designed to clarify the legal landscape, identify the core risks, and define the next best move with confidence.",
                    "একটি গোপনীয় পরামর্শের মাধ্যমে শুরু করুন, যেখানে আইনগত অবস্থা স্পষ্ট করা হবে, মূল ঝুঁকি নির্ধারণ করা হবে এবং আত্মবিশ্বাসের সঙ্গে পরবর্তী পদক্ষেপ ঠিক করা হবে।"
                  )}
                </p>
              </div>
              <LinkButton href="https://lawsheba.com/" target="_blank" className="h-fit">
                {t(locale, "Visit Law Sheba", "ভিজিট ল' সেবা")}
              </LinkButton>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
