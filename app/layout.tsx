import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { brand, hero } from "@/content/site";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

/* Used only for the small italic eyebrow labels, in the idiom of an engraved
 * tempo marking. Two weights, one style — deliberately a narrow load. */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  style: "italic",
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(brand.siteUrl),
  title: `${brand.courseName} — ${brand.siteName}`,
  description: hero.body,
  keywords: [
    "piano lessons online",
    "learn piano India",
    "beginner piano course",
    "piano without sheet music",
    "Bollywood piano lessons",
    "keyboard lessons for beginners",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${brand.courseName} — ${brand.siteName}`,
    description: hero.body,
    url: brand.siteUrl,
    siteName: brand.siteName,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.courseName} — ${brand.siteName}`,
    description: hero.body,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d101b",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${manrope.variable} ${fraunces.variable}`}>
      <body className={manrope.className}>
        <a
          href="#main"
          className="sr-only-focusable focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:h-auto focus:w-auto focus:rounded-[var(--radius-btn)] focus:bg-rose focus:px-4 focus:py-2.5 focus:font-semibold focus:text-ivory focus:[clip-path:none]"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
