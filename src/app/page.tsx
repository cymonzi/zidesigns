import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { WhatWeBuildSection } from "@/components/what-we-build-section";
import { DesignLessonsSection } from "@/components/design-lessons-section";
import { PortfolioSection } from "@/components/portfolio-section";
import { ContactSection } from "@/components/contact-section";
// Replacing FeatureShowcase with softer neumorphic style variant
import { SoftFeatureShowcase } from "@/components/soft-feature-showcase";
import { InteractiveDashboard } from "@/components/interactive-dashboard";
import { PricingSection } from "@/components/pricing-section";
import { Footer } from "@/components/footer";
import { CanvaEmbed } from "@/components/canva-embed";

export default function Home() {
  return (
    <div className="min-h-screen bg-page">
      <Navigation />
      <main>
        <HeroSection />
  <WhatWeBuildSection />
  <SoftFeatureShowcase />
  <InteractiveDashboard />
  <PricingSection />
  <DesignLessonsSection />
  <PortfolioSection />
  <CanvaEmbed
    src="https://www.canva.com/design/DAG0X0lGqV4/C7DMfuOPWodYN5iMLR96NQ/view?embed"
    title="Copy of SKILLING IN THE WILD"
    href="https://www.canva.com/design/DAG0X0lGqV4/C7DMfuOPWodYN5iMLR96NQ/view?utm_content=DAG0X0lGqV4&utm_campaign=designshare&utm_medium=embeds&utm_source=link"
    author="MUSINGUZI"
  />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
