import type { Metadata, Viewport } from "next";
import { Manrope, Fraunces } from "next/font/google";
import { brand, course, curriculum, faq, hero, pricing } from "@/content/site";
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
  title: `${brand.courseName} — ${brand.name}`,
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
    title: `${brand.courseName} — ${brand.name}`,
    description: hero.body,
    url: brand.siteUrl,
    siteName: brand.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.courseName} — ${brand.name}`,
    description: hero.body,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0d101b",
};

/* Only claims Simran has actually made. No aggregateRating until there are
 * real reviews to aggregate — inventing one is both a trust problem and, in
 * structured data, something search engines penalise. */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      name: brand.fullName,
      jobTitle: brand.role,
      url: brand.siteUrl,
      sameAs: [`https://instagram.com/${brand.instagram}`],
    },
    {
      "@type": "Course",
      name: brand.courseName,
      description: course.intro,
      provider: { "@type": "Person", name: brand.fullName },
      inLanguage: ["en", "hi"],
      educationalLevel: "Beginner",
      teaches: course.points,
      syllabusSections: curriculum.modules.map((m, i) => ({
        "@type": "Syllabus",
        position: i + 1,
        name: m.title,
      })),
      offers: {
        "@type": "Offer",
        price: pricing.price.replace(/,/g, ""),
        priceCurrency: "INR",
        category: "Paid",
        availability: "https://schema.org/InStock",
      },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
