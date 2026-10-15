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
    </>
  );
}
