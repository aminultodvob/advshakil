import type { Metadata } from "next";
import Script from "next/script";
import {
  Hind_Siliguri,
  Inter,
  Noto_Serif_Bengali,
  Playfair_Display
} from "next/font/google";

import "@/app/globals.css";
import { ThemeScript } from "@/components/theme/theme-script";
import { WhatsAppWidget } from "@/components/site/whatsapp-widget";
import { LanguageProvider } from "@/components/site/language-provider";
import { getLocale } from "@/lib/i18n-server";
import {
  absoluteUrl,
  DEFAULT_OG_IMAGE,
  getHomeDescription,
  getHomeTitle,
  getPersonSchema,
  getSeoKeywords,
  SITE_NAME,
  SITE_URL
} from "@/lib/seo";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
});

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-hind-siliguri"
});

const notoSerifBengali = Noto_Serif_Bengali({
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-serif-bengali"
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const title = getHomeTitle(locale);
  const description = getHomeDescription(locale);
  const keywords = getSeoKeywords(locale);

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: title,
      template: `%s | ${SITE_NAME}`
    },
    description,
    keywords,
    alternates: {
      canonical: absoluteUrl("/")
    },
    authors: [{ name: "Adv Shakil Ahmad", url: absoluteUrl("/") }],
    creator: "Adv Shakil Ahmad",
    publisher: "Adv Shakil Ahmad",
    category: "Legal Services",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    openGraph: {
      type: "website",
      url: absoluteUrl("/"),
      title,
      description,
      siteName: SITE_NAME,
      locale: locale === "bn" ? "bn_BD" : "en_US",
      images: [
        {
          url: absoluteUrl(DEFAULT_OG_IMAGE),
          width: 1200,
          height: 1200,
          alt: "Adv Shakil Ahmad"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(DEFAULT_OG_IMAGE)]
    }
  };
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html lang={locale} data-locale={locale} suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfair.variable} ${hindSiliguri.variable} ${notoSerifBengali.variable}`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-B8ZEVTFYGD"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-B8ZEVTFYGD');
          `}
        </Script>
        <ThemeScript />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonSchema()) }}
        />
        <LanguageProvider initialLocale={locale}>
          {children}
          <WhatsAppWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
