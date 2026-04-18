import type {
  BlogPost,
  CaseStudy,
  PracticeArea,
  Testimonial
} from "@prisma/client";

import type { Locale } from "@/lib/i18n";

type PracticeTranslation = {
  title: string;
  summary: string;
  description: string;
};

type CaseStudyTranslation = {
  title: string;
  excerpt: string;
  problem: string;
  strategy: string;
  outcome: string;
};

type BlogTranslation = {
  title: string;
  excerpt: string;
  content: string;
};

const practiceAreaTranslations: Record<string, PracticeTranslation> = {
  litigation: {
    title: "লিটিগেশন",
    summary:
      "কঠোর প্রস্তুতি, শক্তিশালী উপস্থাপনা এবং কৌশলগত দৃষ্টিভঙ্গির উপর প্রতিষ্ঠিত আদালতভিত্তিক আইনসেবা।",
    description:
      "মামলার প্রাথমিক অবস্থান নির্ধারণ থেকে চূড়ান্ত শুনানি পর্যন্ত প্রতিটি লিটিগেশন ম্যান্ডেট পরিচালিত হয় গভীর প্রক্রিয়াগত শৃঙ্খলা, প্রমাণভিত্তিক কৌশল এবং মক্কেলের আইনগত ও বাণিজ্যিক স্বার্থকে কেন্দ্র করে।"
  },
  "corporate-law": {
    title: "করপোরেট আইন",
    summary:
      "প্রবৃদ্ধি, গভার্ন্যান্স, কাঠামো ও লেনদেনগত আস্থার জন্য বোর্ডরুম-উপযোগী আইনগত পরামর্শ।",
    description:
      "করপোরেট পরামর্শের মধ্যে রয়েছে প্রতিষ্ঠান কাঠামো নির্ধারণ, গভার্ন্যান্স, চুক্তি, শেয়ারহোল্ডার বিষয়, ডিউ ডিলিজেন্স এবং উচ্চাকাঙ্ক্ষী ব্যবসা ও উদ্যোক্তাদের জন্য উপযোগী আইনগত ঝুঁকি নিয়ন্ত্রণ।"
  },
  documentation: {
    title: "ডকুমেন্টেশন",
    summary:
      "সম্পদের সুরক্ষা, অস্পষ্টতা হ্রাস এবং বিরোধ প্রতিরোধে নিখুঁত খসড়া প্রণয়ন।",
    description:
      "চুক্তি, নোটিশ, দলিল, এগ্রিমেন্ট, অভ্যন্তরীণ নীতিমালা এবং নিয়ন্ত্রক নথি প্রণয়ন করা হয় বাণিজ্যিক স্বচ্ছতা, কার্যকারিতা এবং ঝুঁকি বণ্টনের সূক্ষ্ম বিবেচনায়।"
  },
  arbitration: {
    title: "আরবিট্রেশন",
    summary:
      "গোপনীয়তা, গতি ও কৌশলগত সুবিধাকে অগ্রাধিকার দিয়ে বেসরকারি বিরোধ নিষ্পত্তির প্রস্তুতি।",
    description:
      "আরবিট্রেশন বিষয়গুলো পরিচালিত হয় প্রক্রিয়াগত দক্ষতা, প্রমাণভিত্তিক কৌশল, আলোচনায় লিভারেজ এবং ফলাফলমুখী উপস্থাপনার সমন্বয়ে।"
  },
  "income-tax": {
    title: "আয়কর",
    summary:
      "অ্যাসেসমেন্ট, বিরোধ, কমপ্লায়েন্স এবং কৌশলগত অবস্থান নির্ধারণে স্পষ্ট কর-পরামর্শ।",
    description:
      "আয়কর-সংক্রান্ত সেবার মধ্যে রয়েছে পরামর্শ, অ্যাসেসমেন্ট, নোটিশ, মামলা সহায়তা, কমপ্লায়েন্স কৌশল এবং বাণিজ্যিক বাস্তবতা বিবেচনায় নির্দিষ্ট বিষয়ে প্রতিনিধিত্ব।"
  },
  vat: {
    title: "ভ্যাট",
    summary:
      "কমপ্লায়েন্স, বিরোধ ও ডকুমেন্টেশনে বাণিজ্যিক বাস্তবতাভিত্তিক ভ্যাট পরামর্শ।",
    description:
      "ভ্যাট বিষয়গুলো বিবেচনা করা হয় আইনগত ব্যাখ্যা, কার্যক্রমভিত্তিক প্রক্রিয়া পর্যালোচনা এবং প্রতিরক্ষাযোগ্য কমপ্লায়েন্স কাঠামোর বাস্তবসম্মত সমন্বয়ে।"
  }
};

const caseStudyTranslations: Record<string, CaseStudyTranslation> = {
  "cross-border-shareholder-dispute": {
    title: "সীমান্তপারের শেয়ারহোল্ডার বিরোধ",
    excerpt:
      "গভার্ন্যান্সের ধারাবাহিকতা বজায় রেখে উচ্চমূল্যের একটি ব্যবসায়িক দ্বন্দ্বকে স্থিতিশীল করা হয়েছিল।",
    problem:
      "মালিকানা অধিকার ও বোর্ড নিয়ন্ত্রণকে কেন্দ্র করে নেতৃত্বগত অচলাবস্থা ব্যবসার ধারাবাহিকতা ও বিনিয়োগকারীর আস্থাকে ঝুঁকির মুখে ফেলে।",
    strategy:
      "আইনি নোটিশ, গভার্ন্যান্স বিশ্লেষণ, আলোচনামূলক লিভারেজ এবং লক্ষ্যভিত্তিক বিরোধ-প্রস্তুতির সমন্বয়ে একটি সমন্বিত কৌশল গঠন করা হয়।",
    outcome:
      "বিষয়টি বাণিজ্যিকভাবে গ্রহণযোগ্য নিষ্পত্তির দিকে অগ্রসর হয়, একই সঙ্গে প্রতিষ্ঠানের কার্যক্রমগত স্থিতি ও কৌশলগত বিকল্পসমূহ অক্ষুণ্ণ থাকে।"
  },
  "vat-risk-restructuring": {
    title: "প্রবৃদ্ধিশীল প্রতিষ্ঠানের জন্য ভ্যাট ঝুঁকি পুনর্গঠন",
    excerpt:
      "বৃহৎ পরিসরে কমপ্লায়েন্স ঝুঁকি কমাতে ডকুমেন্টেশন ও অভ্যন্তরীণ কার্যপ্রবাহ পুনর্গঠিত হয়।",
    problem:
      "দ্রুত সম্প্রসারণের ফলে বিভিন্ন বিভাগে ভ্যাট-সংক্রান্ত ডকুমেন্টেশন ঘাটতি ও প্রক্রিয়াগত অসামঞ্জস্য প্রকাশ পায়।",
    strategy:
      "আইনগত ও প্রক্রিয়াগত অডিট পরিচালনা করে অভ্যন্তরীণ ডকুমেন্টেশন মানদণ্ড পুনর্নির্মাণ করা হয় এবং প্রমাণপ্রবাহকে আইনগত চাহিদার সঙ্গে সামঞ্জস্য করা হয়।",
    outcome:
      "প্রতিষ্ঠানটি শক্তিশালী কমপ্লায়েন্স আস্থা, উন্নত অডিট প্রস্তুতি এবং অভ্যন্তরীণ জবাবদিহিতার স্পষ্ট কাঠামো অর্জন করে।"
  },
  "high-stakes-litigation-strategy": {
    title: "উচ্চ-ঝুঁকির লিটিগেশন কৌশল",
    excerpt:
      "শুনানির আগেই কৌশলগত শক্তি বাড়াতে একটি শৃঙ্খলাপূর্ণ মামলা পরিচালনা কাঠামো তৈরি করা হয়।",
    problem:
      "একটি জটিল বিরোধে একাধিক পক্ষ জড়িত থাকায় আর্থিক, সুনামগত ও সময়গত ঝুঁকি একসঙ্গে তৈরি হয়।",
    strategy:
      "প্রমাণ মানচিত্রায়ন, চাপের কেন্দ্র নির্ধারণ এবং শুনানি-প্রস্তুতির ওপর ভিত্তি করে ধাপে ধাপে লিটিগেশন কৌশল তৈরি করা হয়।",
    outcome:
      "মক্কেল অধিকতর কৌশলগত শক্তি, সুসংহত যুক্তি এবং উন্নত আলোচনামূলক অবস্থান নিয়ে কার্যক্রমে প্রবেশ করে।"
  }
};

const testimonialTranslations: Record<
  string,
  { name: string; role: string; company: string; quote: string }
> = {
  "Managing Director, Industrial Group-Corporate Client": {
    name: "ব্যবস্থাপনা পরিচালক, শিল্পপ্রতিষ্ঠান",
    role: "করপোরেট ক্লায়েন্ট",
    company: "গোপনীয়",
    quote:
      "সাকিল আহমাদ আদালতের দৃঢ়তা ও বোর্ডরুমের স্বচ্ছতা একসঙ্গে নিয়ে আসেন। তাঁর পরামর্শ পরিমিত, বাণিজ্যিকভাবে বিচক্ষণ এবং গভীরভাবে নির্ভরযোগ্য।"
  },
  "Founder, Growth Venture-Business Founder": {
    name: "প্রতিষ্ঠাতা, গ্রোথ ভেঞ্চার",
    role: "ব্যবসা প্রতিষ্ঠাতা",
    company: "ব্যক্তিগত",
    quote:
      "একটি অত্যন্ত সংবেদনশীল আইনগত পর্যায়ে আমরা তাঁর বিচক্ষণতার ওপর নির্ভর করেছি। ডকুমেন্টেশনের মান ও কৌশলগত চিন্তা ছিল অসাধারণ।"
  },
  "Senior Executive-Private Client": {
    name: "সিনিয়র এক্সিকিউটিভ",
    role: "ব্যক্তিগত ক্লায়েন্ট",
    company: "প্রযোজ্য নয়",
    quote:
      "চাপের মুহূর্তে স্থির, যোগাযোগে নিখুঁত এবং বাস্তবায়নে অবিচল। সবচেয়ে গুরুত্বপূর্ণ সময়ে তিনি আমাদের প্রয়োজনীয় আস্থা দিয়েছেন।"
  }
};

const blogTranslations: Record<string, BlogTranslation> = {
  "the-new-standard-for-corporate-legal-readiness": {
    title: "করপোরেট আইনগত প্রস্তুতির নতুন মানদণ্ড",
    excerpt:
      "আধুনিক ব্যবসার জন্য কেন আগাম-পরিকল্পিত, নথিভিত্তিক এবং বাণিজ্যিকভাবে বুদ্ধিদীপ্ত আইনগত কাঠামো অপরিহার্য।",
    content: `
      <h2>আইনগত প্রস্তুতি এখন আর কেবল প্রতিক্রিয়াশীল কাজ নয়।</h2>
      <p>গুরুত্বপূর্ণ ব্যবসার ক্ষেত্রে আইনগত কাঠামো এখন পরিচালনাগত উৎকর্ষতার অংশ। চুক্তি, গভার্ন্যান্স, কমপ্লায়েন্স ব্যবস্থা এবং বিরোধ-প্রস্তুতি এখন ব্যবসার গতি, আস্থা এবং প্রতিষ্ঠানের মূল্যকে সরাসরি প্রভাবিত করে।</p>
      <h3>উচ্চ-কার্যক্ষম প্রতিষ্ঠানগুলো কী ভিন্নভাবে করে</h3>
      <ul>
        <li>তারা বিরোধের পর নয়, লেনদেনের আগেই ঝুঁকি পর্যালোচনা করে।</li>
        <li>তারা নথিপত্রকে মানসম্মত করে, যাতে দল দ্রুত এবং কম ভুলে কাজ এগিয়ে নিতে পারে।</li>
        <li>তারা কর ও কমপ্লায়েন্সকে প্রশাসনিক ঝামেলা নয়, কৌশলগত স্তর হিসেবে বিবেচনা করে।</li>
      </ul>
      <p>সর্বোত্তম আইনগত কৌশল অনেক সময় দৃশ্যমান হয় না। এটি প্রতিষ্ঠানের অনুমোদন, স্বাক্ষর, নথিভুক্তকরণ এবং সিদ্ধান্ত-উন্নয়ন প্রক্রিয়ার ভেতরেই গঠিত থাকে।</p>
    `
  }
};

export function localizePracticeArea(
  practiceArea: PracticeArea,
  locale: Locale
): PracticeArea {
  if (locale === "en") {
    return practiceArea;
  }

  const translation = practiceAreaTranslations[practiceArea.slug];

  if (!translation) {
    return practiceArea;
  }

  return {
    ...practiceArea,
    title: translation.title,
    summary: translation.summary,
    description: translation.description
  };
}

export function localizeCaseStudy(caseStudy: CaseStudy, locale: Locale): CaseStudy {
  if (locale === "en") {
    return caseStudy;
  }

  const translation = caseStudyTranslations[caseStudy.slug];

  if (!translation) {
    return caseStudy;
  }

  return {
    ...caseStudy,
    title: translation.title,
    excerpt: translation.excerpt,
    problem: translation.problem,
    strategy: translation.strategy,
    outcome: translation.outcome
  };
}

export function localizeTestimonial(
  testimonial: Testimonial,
  locale: Locale
): Testimonial {
  if (locale === "en") {
    return testimonial;
  }

  const key = `${testimonial.id}`;
  const translation = testimonialTranslations[key];

  if (!translation) {
    return testimonial;
  }

  return {
    ...testimonial,
    name: translation.name,
    role: translation.role,
    company: translation.company,
    quote: translation.quote
  };
}

export function localizeBlogPost(blogPost: BlogPost, locale: Locale): BlogPost {
  if (locale === "en") {
    return blogPost;
  }

  const translation = blogTranslations[blogPost.slug];

  if (!translation) {
    return blogPost;
  }

  return {
    ...blogPost,
    title: translation.title,
    excerpt: translation.excerpt,
    content: translation.content
  };
}
