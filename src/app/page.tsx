import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { WhatWeBuildSection } from "@/components/what-we-build-section";
import { DesignLessonsSection } from "@/components/design-lessons-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navigation />
      <main>
        <HeroSection />
        <WhatWeBuildSection />
        <DesignLessonsSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
