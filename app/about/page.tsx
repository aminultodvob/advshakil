import type { Metadata } from "next";
import {
  BookOpen,
  BriefcaseBusiness,
  Mail,
  Phone,
  Scale,
  ShieldCheck,
  Target
} from "lucide-react";
import Image from "next/image";

import { t } from "@/lib/i18n";
import { getLocale } from "@/lib/i18n-server";
import { absoluteUrl, DEFAULT_OG_IMAGE, getSeoKeywords } from "@/lib/seo";
import { SiteShell } from "@/components/site/site-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { MotionDiv } from "@/components/site/motion";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title =
    locale === "bn"
      ? "পরিচিতি | অ্যাডভোকেট সাকিল আহমাদ"
      : "About Adv Shakil Ahmad | Supreme Court Lawyer & NCP Leader";
  const description =
    locale === "bn"
      ? "অ্যাডভোকেট সাকিল আহমাদের শিক্ষা, সুপ্রিম কোর্টে আইনচর্চা, জনস্বার্থে কাজ, জুলাই আন্দোলনে আইনগত সহায়তা এবং জাতীয় নাগরিক পার্টিতে নেতৃত্বের বিস্তারিত পরিচিতি।"
      : "Learn about Adv Shakil Ahmad's education, Bangladesh Supreme Court legal practice, public-interest legal service, July movement legal support, and National Citizen Party leadership role.";

  return {
    title,
    description,
    keywords: getSeoKeywords(locale),
    alternates: {
      canonical: absoluteUrl("/about")
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl("/about"),
      images: [{ url: absoluteUrl(DEFAULT_OG_IMAGE), alt: "Adv Shakil Ahmad" }]
    }
  };
}

export default async function AboutPage() {
  const locale = await getLocale();

  const timeline = [
    {
      year: t(locale, "Early Education", "প্রাথমিক শিক্ষা"),
      title: t(
        locale,
        "Foundational studies from Gangni to advanced madrasa education",
        "গাংনী থেকে উচ্চতর মাদরাসা শিক্ষার ভিত্তি নির্মাণ"
      ),
      copy: t(
        locale,
        "He studied up to class five in Gangni before continuing high school education outside Meherpur district. He later completed both Dakhil and Alim with Golden A Plus from Ta'mirul Millat Kamil Madrasa, Tongi.",
        "গাংনীতে পঞ্চম শ্রেণি পর্যন্ত পড়াশোনা শেষে তিনি মেহেরপুর জেলার বাইরে উচ্চবিদ্যালয় পর্যায়ে অধ্যয়ন করেন। পরে টঙ্গীর তা’মীরুল মিল্লাত কামিল মাদরাসা থেকে দাখিল ও আলিম উভয় পরীক্ষায় গোল্ডেন এ প্লাস অর্জন করেন।"
      )
    },
    {
      year: t(locale, "Legal Studies", "আইন শিক্ষা"),
      title: t(locale, "Honors and Masters in Law", "আইনে অনার্স ও মাস্টার্স"),
      copy: t(
        locale,
        "He went on to complete both Honors and Masters in Law from Northern University, establishing the academic base for a career in high-level legal practice.",
        "পরবর্তীতে তিনি নর্দার্ন ইউনিভার্সিটি থেকে আইন বিষয়ে অনার্স ও মাস্টার্স সম্পন্ন করেন, যা তাঁর উচ্চমানের আইনপেশার জন্য শক্তিশালী একাডেমিক ভিত্তি তৈরি করে।"
      )
    },
    {
      year: t(locale, "Professional Practice", "পেশাগত প্র্যাকটিস"),
      title: t(
        locale,
        "Supreme Court advocacy and special public prosecution",
        "সুপ্রিম কোর্টে আইনচর্চা ও বিশেষ পাবলিক প্রসিকিউশন"
      ),
      copy: t(
        locale,
        "He currently practices law at the Bangladesh Supreme Court and serves as a Special Public Prosecutor with the rank of Assistant Attorney General in the Pilkhana massacre case, while also leading 'Law Seba' Law Chamber as Head of Chamber.",
        "তিনি বর্তমানে বাংলাদেশ সুপ্রিম কোর্টে আইন পেশায় নিয়োজিত এবং পিলখানা হত্যাকাণ্ড মামলায় সহকারী অ্যাটর্নি জেনারেলের মর্যাদায় স্পেশাল পাবলিক প্রসিকিউটর হিসেবে দায়িত্ব পালন করছেন। একই সঙ্গে তিনি ‘ল' সেবা’ ল' চেম্বারের প্রধান হিসেবেও কাজ করছেন।"
      )
    },
    {
      year: "July 2024",
      title: t(
        locale,
        "Legal support during the July movement and after the mass uprising",
        "জুলাই আন্দোলন ও গণঅভ্যুত্থানের পর আইনগত সহায়তা"
      ),
      copy: t(
        locale,
        "From the early phase of the July movement, he provided free legal assistance to protesting students and citizens after police arrests began. He actively participated in Rampura until August 2, 2024, and in Shahbag from August 3, 2024 to August 5, 2024. After the July mass uprising, he worked as filing lawyer in the cases of more than ten martyrs, including Shaheed Ashabul Yamin and Shaheed Sabit.",
        "জুলাই আন্দোলনের প্রারম্ভিক পর্যায় থেকেই তিনি পুলিশি গ্রেপ্তার শুরু হলে আন্দোলনরত শিক্ষার্থী ও সাধারণ মানুষের জন্য বিনামূল্যে আইনগত সহায়তা দেন। তিনি ২ আগস্ট ২০২৪ পর্যন্ত রামপুরায় এবং ৩ আগস্ট ২০২৪ থেকে ৫ আগস্ট ২০২৪ পর্যন্ত শাহবাগে সক্রিয়ভাবে অংশগ্রহণ করেন। জুলাই গণঅভ্যুত্থানের পর শহীদ আশাবুল ইয়ামিন ও শহীদ সাবিতসহ দশজনেরও বেশি শহীদের মামলায় তিনি ফাইলিং আইনজীবী হিসেবে কাজ করেন।"
      )
    }
  ];

  const highlightCards = [
    {
      icon: BookOpen,
      title: t(locale, "Education", "শিক্ষা"),
      copy: t(
        locale,
        "Studied up to class five in Gangni, then continued high school outside Meherpur district. Earned Golden A Plus in both Dakhil and Alim from Ta'mirul Millat Kamil Madrasa, Tongi, before completing Honors and Masters in Law from Northern University.",
        "গাংনীতে পঞ্চম শ্রেণি পর্যন্ত পড়াশোনা শেষে মেহেরপুর জেলার বাইরে উচ্চবিদ্যালয় পর্যায়ে অধ্যয়ন করেন। টঙ্গীর তা’মীরুল মিল্লাত কামিল মাদরাসা থেকে দাখিল ও আলিম উভয় পরীক্ষায় গোল্ডেন এ প্লাস অর্জনের পর নর্দার্ন ইউনিভার্সিটি থেকে আইন বিষয়ে অনার্স ও মাস্টার্স সম্পন্ন করেন।"
      )
    },
    {
      icon: BriefcaseBusiness,
      title: t(locale, "Professional Standing", "পেশাগত অবস্থান"),
      copy: t(
        locale,
        "Currently practicing as a lawyer at the Bangladesh Supreme Court, serving as Special Public Prosecutor with the rank of Assistant Attorney General in the Pilkhana massacre case, and leading 'Law Seba' Law Chamber as Head of Chamber.",
        "বর্তমানে তিনি বাংলাদেশ সুপ্রিম কোর্টে আইনজীবী হিসেবে প্র্যাকটিস করছেন, পিলখানা হত্যাকাণ্ড মামলায় সহকারী অ্যাটর্নি জেনারেলের মর্যাদায় স্পেশাল পাবলিক প্রসিকিউটর হিসেবে দায়িত্ব পালন করছেন এবং ‘ল' সেবা’ ল' চেম্বারের প্রধান হিসেবে কাজ করছেন।"
      )
    },
    {
      icon: Scale,
      title: t(locale, "Public-Interest Legal Work", "জনস্বার্থে আইনগত কাজ"),
      copy: t(
        locale,
        "From the beginning of the July movement, he provided free legal assistance to arrested students and citizens across the country when police actions intensified, serving countless people in urgent need of legal protection.",
        "জুলাই আন্দোলনের শুরু থেকেই পুলিশি দমন-পীড়ন বাড়লে তিনি সারা দেশের গ্রেপ্তারকৃত শিক্ষার্থী ও সাধারণ মানুষের জন্য বিনামূল্যে আইনগত সহায়তা প্রদান করেন এবং অসংখ্য মানুষকে জরুরি আইনগত সুরক্ষা দেন।"
      )
    },
    {
      icon: ShieldCheck,
      title: t(locale, "Post-Uprising Casework", "গণঅভ্যুত্থান-পরবর্তী মামলা কার্যক্রম"),
      copy: t(
        locale,
        "After the July mass uprising, he worked as filing lawyer in the cases of more than ten martyrs, including Shaheed Ashabul Yamin and Shaheed Sabit, extending legal service into the most sensitive and consequential matters.",
        "জুলাই গণঅভ্যুত্থানের পর তিনি শহীদ আশাবুল ইয়ামিন ও শহীদ সাবিতসহ দশজনেরও বেশি শহীদের মামলায় ফাইলিং আইনজীবী হিসেবে কাজ করেন, যা তাঁর আইনগত সেবাকে সবচেয়ে সংবেদনশীল ও তাৎপর্যপূর্ণ পর্যায়ে নিয়ে যায়।"
      )
    }
  ];

  return (
    <SiteShell>
      <section className="section-space">
        <div className="container-shell grid gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <MotionDiv
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <SectionHeading
              eyebrow={t(locale, "Professional Profile", "পেশাগত পরিচিতি")}
              title={t(
                locale,
                "A legal career defined by courtroom seriousness, public service, and disciplined advocacy.",
                "আদালতকেন্দ্রিক গাম্ভীর্য, জনসেবা এবং শৃঙ্খলাপূর্ণ আইনচর্চায় নির্মিত একটি পেশাজীবন।"
              )}
              copy={t(
                locale,
                "Advocate Shakil Ahmad combines Supreme Court practice, public-interest legal work, and strategic advisory experience with a profile shaped by academic distinction and direct service in moments of national significance.",
                "অ্যাডভোকেট সাকিল আহমাদের প্রোফাইল সুপ্রিম কোর্টে আইনচর্চা, জনস্বার্থে আইনি সহায়তা এবং কৌশলগত পরামর্শদানের অভিজ্ঞতার সমন্বয়ে গঠিত; যা একাডেমিক উৎকর্ষতা ও জাতীয় গুরুত্বপূর্ণ সময়ে সরাসরি সেবার মাধ্যমে সমৃদ্ধ হয়েছে।"
              )}
            />
            <div className="glass-panel gold-ring p-8 sm:p-10">
              <p className="text-lg leading-9 text-ink/75">
                {locale === "bn" ? (
                  <>
                    তিনি বর্তমানে বাংলাদেশ সুপ্রিম কোর্টে আইন পেশায় নিয়োজিত এবং পিলখানা হত্যাকাণ্ড মামলায় সহকারী অ্যাটর্নি জেনারেলের মর্যাদায় স্পেশাল পাবলিক প্রসিকিউটর হিসেবে দায়িত্ব পালন করছেন। একই সঙ্গে{" "}
                    <span className="font-semibold text-ink dark:text-white">‘ল' সেবা’</span>{" "}
                    ল' চেম্বারের প্রধান হিসেবেও কাজ করছেন।
                  </>
                ) : (
                  <>
                    He is currently practicing law at the Bangladesh Supreme Court
                    and serving as a Special Public Prosecutor with the rank of
                    Assistant Attorney General in the Pilkhana massacre case. He
                    also leads{" "}
                    <span className="font-semibold text-ink dark:text-white">'Law Seba'</span>{" "}
                    Law Chamber as Head of Chamber.
                  </>
                )}
              </p>
              <p className="mt-6 text-lg leading-9 text-ink/75">
                {t(
                  locale,
                  "His profile is distinguished not only by legal practice, but by direct involvement in public-interest legal support. From the beginning of the July movement, he provided free legal assistance to arrested students and citizens across the country, reflecting a sustained commitment to access to justice.",
                  "তাঁর প্রোফাইল কেবল পেশাগত আইনচর্চায় সীমাবদ্ধ নয়; জনস্বার্থে সরাসরি আইনগত সহায়তার মধ্য দিয়েও তা আলাদা হয়ে উঠেছে। জুলাই আন্দোলনের শুরু থেকেই তিনি সারা দেশের গ্রেপ্তার হওয়া শিক্ষার্থী ও সাধারণ মানুষের জন্য বিনামূল্যে আইনি সহায়তা দিয়ে ন্যায়বিচারে প্রবেশাধিকারের প্রতি গভীর অঙ্গীকারের পরিচয় দিয়েছেন।"
                )}
              </p>
            </div>
          </MotionDiv>

          <MotionDiv
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-[56px] shadow-2xl ring-1 ring-gold/20">
              <Image
                src="/adv_shakil.jpg"
                alt={t(
                  locale,
                  "Advocate Shakil Ahmad in courtroom attire",
                  "আদালতের পোশাকে অ্যাডভোকেট সাকিল আহমাদ"
                )}
                fill
                className="rounded-[56px] object-cover object-top"
                sizes="(max-width: 768px) 100vw, 500px"
              />
            </div>
            <div className="absolute -bottom-6 left-6 right-6 rounded-[26px] border border-white/10 bg-[linear-gradient(135deg,rgba(9,17,28,0.88),rgba(9,17,28,0.68))] p-6 text-white shadow-2xl backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {t(locale, "Professional Presence", "পেশাগত উপস্থিতি")}
              </p>
              <p className="mt-3 font-serif text-3xl leading-tight">
                {t(
                  locale,
                  "A professional identity shaped by courtroom discipline, public trust, and legal service.",
                  "আদালতের শৃঙ্খলা, জনআস্থা ও আইনগত সেবায় নির্মিত এক পেশাগত পরিচয়।"
                )}
              </p>
            </div>
            <div className="absolute -bottom-6 -left-6 -z-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl" />
            <div className="absolute -right-6 -top-6 -z-10 h-32 w-32 rounded-full bg-gold/10 blur-3xl opacity-50" />
          </MotionDiv>
        </div>
      </section>

      <section className="section-space bg-white dark:bg-[#1b2633]">
        <div className="container-shell">
          <SectionHeading
            eyebrow={t(locale, "Education & Practice", "শিক্ষা ও পেশা")}
            title={t(
              locale,
              "Academic distinction translated into serious legal work.",
              "একাডেমিক উৎকর্ষতা থেকে গড়ে ওঠা উচ্চমানের আইনচর্চা।"
            )}
            copy={t(
              locale,
              "The journey from early education in Gangni to Supreme Court practice reflects both discipline and sustained professional growth.",
              "গাংনীর প্রাথমিক শিক্ষা থেকে সুপ্রিম কোর্টে আইনচর্চা পর্যন্ত এই যাত্রা শৃঙ্খলা ও ধারাবাহিক পেশাগত বিকাশের সাক্ষ্য বহন করে।"
            )}
          />
          <div className="mt-14 space-y-6">
            {timeline.map((item) => (
              <div
                key={item.year}
                className="grid gap-6 rounded-[28px] border border-ink/8 bg-mist p-8 lg:grid-cols-[220px_1fr] dark:bg-white/5"
              >
                <p className="font-serif text-3xl text-gold">{item.year}</p>
                <div>
                  <h3 className="font-serif text-3xl text-ink dark:text-white">{item.title}</h3>
                  <p className="mt-3 max-w-4xl text-base leading-8 text-ink/70 dark:text-white/80">
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={t(locale, "Key Areas", "মূল ক্ষেত্রসমূহ")}
            title={t(
              locale,
              "A profile shaped by education, litigation, public-interest action, and legal leadership.",
              "শিক্ষা, লিটিগেশন, জনস্বার্থে ভূমিকা এবং আইনগত নেতৃত্বে নির্মিত একটি প্রোফাইল।"
            )}
            copy={t(
              locale,
              "These sections highlight the academic foundation, active legal mandates, movement-period legal service, and the institutional seriousness of his ongoing work.",
              "এখানে তাঁর একাডেমিক ভিত্তি, সক্রিয় আইনগত দায়িত্ব, আন্দোলনকালে আইনি সহায়তা এবং চলমান কাজের প্রাতিষ্ঠানিক গভীরতা তুলে ধরা হয়েছে।"
            )}
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {highlightCards.map((item) => (
              <div key={item.title} className="glass-panel p-8">
                <item.icon className="h-6 w-6 text-gold" />
                <h3 className="mt-5 font-serif text-3xl text-ink dark:text-white">{item.title}</h3>
                <p className="mt-4 text-base leading-8 text-ink/70 dark:text-white/80">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-space">
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
              <p className="mt-5 text-lg leading-8 text-ink/72 dark:text-white">
                {locale === "bn" ? (
                  <>
                    আইনজীবী পরিচয়ের পাশাপাশি অ্যাডভোকেট সাকিল আহমাদ{" "}
                    <span className="font-semibold text-ink dark:text-white">
                      জাতীয় নাগরিক পার্টি (এনসিপি)-র কেন্দ্রীয় যুগ্ম মুখ্য সমন্বয়ক
                    </span>{" "}
                    হিসেবে দায়িত্ব পালন করছেন। এই ভূমিকা তাঁর সংগঠনক্ষমতা, জনসম্পৃক্ততা, প্রাতিষ্ঠানিক দায়িত্ববোধ এবং জাতীয় গুরুত্বপূর্ণ বিষয়ে সরাসরি সম্পৃক্ততার পরিচায়ক।
                  </>
                ) : (
                  <>
                    Alongside his legal career, Advocate Shakil Ahmad serves the
                    National Citizen Party (NCP) as{" "}
                    <span className="font-semibold text-ink dark:text-white">Central Joint Chief Coordinator</span>.
                    This role reflects an additional dimension of leadership built on
                    organization, public engagement, institutional responsibility,
                    and direct involvement in matters of national importance.
                  </>
                )}
              </p>
              <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-white">
                {t(
                  locale,
                  "The combination of courtroom discipline and political coordination gives his profile a rare balance of legal authority, public trust, and strategic clarity in both civic and professional spheres.",
                  "আদালতের শৃঙ্খলা ও রাজনৈতিক সমন্বয়ের এই সমন্বয় তাঁর প্রোফাইলে আইনগত কর্তৃত্ব, জনআস্থা এবং কৌশলগত স্বচ্ছতার এক বিরল ভারসাম্য তৈরি করেছে।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-space">
        <div className="container-shell grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="glass-panel gold-ring p-8 sm:p-10">
            <p className="eyebrow">{t(locale, "July Movement", "জুলাই আন্দোলন")}</p>
            <h2 className="mt-6 font-serif text-4xl leading-tight text-ink sm:text-5xl dark:text-white">
              {t(
                locale,
                "Legal service during the movement was practical, immediate, and deeply personal.",
                "আন্দোলনের সময় আইনগত সেবা ছিল বাস্তবধর্মী, তাৎক্ষণিক এবং গভীরভাবে মানবিক।"
              )}
            </h2>
            <p className="mt-5 text-lg leading-8 text-ink/70 dark:text-white/80">
              {t(
                locale,
                "He remained actively involved in Rampura until August 2, 2024, and in Shahbag from August 3, 2024 through August 5, 2024. His role was not symbolic. It included direct participation, urgent legal support, and sustained help for those facing arrest and state pressure.",
                "তিনি ২ আগস্ট ২০২৪ পর্যন্ত রামপুরায় এবং ৩ আগস্ট ২০২৪ থেকে ৫ আগস্ট ২০২৪ পর্যন্ত শাহবাগে সক্রিয়ভাবে অংশগ্রহণ করেন। তাঁর ভূমিকা ছিল প্রতীকী নয়; এতে ছিল সরাসরি অংশগ্রহণ, জরুরি আইনগত সহায়তা এবং গ্রেপ্তার ও রাষ্ট্রীয় চাপের মুখে থাকা মানুষের পাশে অবিচলভাবে থাকা।"
              )}
            </p>
          </div>

          <div className="grid gap-6">
            <div className="glass-panel p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                {t(locale, "Contact", "যোগাযোগ")}
              </p>
              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-gold/10 p-3 text-gold">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-ink/55 dark:text-white/65">
                      WhatsApp
                    </p>
                    <p className="text-lg font-medium text-ink dark:text-white">01916-948710</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-2xl bg-gold/10 p-3 text-gold">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm text-ink/55 dark:text-white/65">Email</p>
                    <p className="text-lg font-medium text-ink dark:text-white">
                      shakilreal@gmail.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-panel p-8">
              <Target className="h-6 w-6 text-gold" />
              <h3 className="mt-5 font-serif text-3xl text-ink dark:text-white">
                {t(locale, "Mission & Professional Orientation", "মিশন ও পেশাগত দৃষ্টিভঙ্গি")}
              </h3>
              <p className="mt-4 text-base leading-8 text-ink/70 dark:text-white/80">
                {t(
                  locale,
                  "The work is grounded in legal seriousness, client service, and public responsibility. Whether acting in court, advising through sensitive disputes, or supporting citizens in times of crisis, the objective remains the same: clear strategy, principled action, and disciplined execution.",
                  "এই কাজের ভিত্তি হলো আইনগত গভীরতা, মক্কেলসেবা এবং জনদায়িত্ব। আদালতে উপস্থিতি, সংবেদনশীল বিরোধে পরামর্শদান বা সংকটময় সময়ে নাগরিকদের সহায়তা যাই হোক না কেন, লক্ষ্য একটিই: স্পষ্ট কৌশল, নীতিনিষ্ঠ পদক্ষেপ এবং শৃঙ্খলাপূর্ণ বাস্তবায়ন।"
                )}
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
