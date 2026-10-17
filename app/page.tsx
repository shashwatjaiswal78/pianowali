import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StickyCTA } from "@/components/layout/StickyCTA";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Course } from "@/components/sections/Course";
import { CourseDetail } from "@/components/sections/CourseDetail";
import { Curriculum } from "@/components/sections/Curriculum";
import { Audience } from "@/components/sections/Audience";
import { Testimonials } from "@/components/sections/Testimonials";
import { Convert } from "@/components/sections/Convert";
import { brand, course, curriculum, faq, pricing } from "@/content/site";

/* Homepage only — the FAQ and Course data describe this page, and FAQ markup
 * on a page without those questions (like /policies) breaks Google's rules.
 *
 * Only claims Simran has actually made. No aggregateRating until there are
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

export default function Page() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <About />
        <Course />
        <CourseDetail />
        <Curriculum />
        <Audience />
        <Testimonials />
        <Convert />
      </main>
      <Footer />
      <StickyCTA />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
