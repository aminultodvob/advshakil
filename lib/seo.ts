import type { Locale } from "@/lib/i18n";

export const SITE_URL = "https://shakilahmad-law.vercel.app";

export const SITE_NAME = "Adv Shakil Ahmad";

export const DEFAULT_OG_IMAGE = "/images/advshakil.jpg";

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export function getSeoKeywords(locale: Locale) {
  const english = [
    "Shakil Ahmad",
    "Adv Shakil Ahmad",
    "Advocate Shakil Ahmad",
    "Sakil Ahmad",
    "Bangladesh Supreme Court lawyer",
    "Lawyer at the Bangladesh Supreme Court",
    "Advocate",
    "Politician",
    "Legal Strategist",
    "Corporate and Tax Expert",
    "Corporate Lawyer in Bangladesh",
    "Corporate Lawyer",
    "Litigation Lawyer",
    "Income Tax Lawyer",
    "VAT Lawyer",
    "Arbitration Lawyer",
    "Documentation Lawyer",
    "Special Public Prosecutor",
    "Assistant Attorney General rank",
    "Pilkhana massacre case lawyer",
    "National Citizen Party",
    "NCP",
    "Central Joint Chief Coordinator",
    "Law Sheba",
    "Legal services in Bangladesh",
    "Top advocate in Bangladesh",
    "Supreme Court Advocate Bangladesh",
    "Corporate legal advisor Bangladesh",
    "Tax lawyer Bangladesh"
  ];

  const bangla = [
    "অ্যাডভোকেট সাকিল আহমাদ",
    "সাকিল আহমাদ",
    "বাংলাদেশ সুপ্রিম কোর্টের আইনজীবী",
    "সুপ্রিম কোর্টের আইনজীবী",
    "করপোরেট আইনজীবী",
    "ট্যাক্স আইনজীবী",
    "লিটিগেশন আইনজীবী",
    "আরবিট্রেশন আইনজীবী",
    "ভ্যাট আইনজীবী",
    "আয়কর আইনজীবী",
    "জাতীয় নাগরিক পার্টি",
    "এনসিপি",
    "কেন্দ্রীয় যুগ্ম মুখ্য সমন্বয়ক",
    "ল' সেবা",
    "বাংলাদেশের আইনগত সেবা"
  ];

  return locale === "bn" ? [...bangla, ...english] : [...english, ...bangla];
}

export function getHomeTitle(locale: Locale) {
  return locale === "bn"
    ? "অ্যাডভোকেট সাকিল আহমাদ | অ্যাডভোকেট, রাজনীতিবিদ, লিগ্যাল স্ট্র্যাটেজিস্ট"
    : "Adv Shakil Ahmad | Advocate, Politician, Legal Strategist, Corporate & Tax Expert";
}

export function getHomeDescription(locale: Locale) {
  return locale === "bn"
    ? "অ্যাডভোকেট সাকিল আহমাদের অফিসিয়াল পোর্টফোলিও। তিনি বাংলাদেশ সুপ্রিম কোর্টের আইনজীবী, করপোরেট ও ট্যাক্স বিশেষজ্ঞ, জাতীয় নাগরিক পার্টির কেন্দ্রীয় যুগ্ম মুখ্য সমন্বয়ক এবং ল' সেবার সঙ্গে যুক্ত একজন উচ্চমানের আইন পেশাজীবী।"
    : "Official portfolio of Adv Shakil Ahmad, lawyer at the Bangladesh Supreme Court, advocate, politician, legal strategist, corporate lawyer, tax expert, NCP Central Joint Chief Coordinator, and Law Sheba legal professional.";
}

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": absoluteUrl("/#person"),
        name: "Adv Shakil Ahmad",
        alternateName: [
          "Shakil Ahmad",
          "Sakil Ahmad",
          "অ্যাডভোকেট সাকিল আহমাদ"
        ],
        url: absoluteUrl("/"),
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        jobTitle: [
          "Advocate",
          "Politician",
          "Legal Strategist",
          "Corporate & Tax Expert"
        ],
        worksFor: {
          "@id": absoluteUrl("/#lawsheba")
        },
        alumniOf: {
          "@type": "CollegeOrUniversity",
          name: "Northern University"
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "244(2nd Floor), RH Home Center, 74/B/1 Green Road",
          addressLocality: "Dhaka",
          addressCountry: "BD"
        },
        sameAs: [
          "https://politician.shakil.me/",
          "https://lawsheba.com/",
          "https://www.facebook.com/smshakil.law",
          "https://www.youtube.com/@AdvShakilAhmad"
        ],
        knowsAbout: [
          "Litigation",
          "Corporate Law",
          "Documentation",
          "Arbitration",
          "Income Tax",
          "VAT",
          "Political Leadership",
          "National Citizen Party"
        ]
      },
      {
        "@type": "LegalService",
        "@id": absoluteUrl("/#lawsheba"),
        name: "Law Sheba",
        url: "https://lawsheba.com/",
        areaServed: "Bangladesh",
        serviceType: [
          "Litigation",
          "Corporate Law",
          "Documentation",
          "Arbitration",
          "Income Tax",
          "VAT"
        ]
      },
      {
        "@type": "WebSite",
        "@id": absoluteUrl("/#website"),
        url: absoluteUrl("/"),
        name: "Adv Shakil Ahmad",
        publisher: {
          "@id": absoluteUrl("/#person")
        }
      }
    ]
  };
}
