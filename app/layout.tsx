import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://shakilahmad-law.vercel.app"),
  title: {
    default: "Adv Shakil Ahmad | Advocate & Politician",
    template: "%s | Adv Shakil Ahmad"
  },
  description:
    "Professional counsel in litigation, corporate law, tax, and political leadership.",
  openGraph: {
    title: "Adv Shakil Ahmad | Advocate",
    description:
      "A premium legal portfolio and consultation platform for one of the country's top legal professionals.",
    type: "website"
  }
};

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
        <ThemeScript />
        <LanguageProvider initialLocale={locale}>
          {children}
          <WhatsAppWidget />
        </LanguageProvider>
      </body>
    </html>
  );
}
