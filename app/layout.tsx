import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import "@/app/globals.css";
import { ThemeScript } from "@/components/theme/theme-script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair"
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

import { WhatsAppWidget } from "@/components/site/whatsapp-widget";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeScript />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}
