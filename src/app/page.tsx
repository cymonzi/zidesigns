import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { ServicesShowcase } from "@/components/services-showcase";
// Contact section removed; contact handled in footer and /start-project
import { Footer } from "@/components/footer";
import { AIChatbot } from "@/components/ai-chatbot";
import { PageTitleTracker } from "@/components/page-title-tracker";
import { SectionReveal } from "@/components/section-reveal";

export const metadata: Metadata = {
  title: "Zi Designs - Creative Tech Studio",
  description:
    "Zi Designs helps startups and creators in Uganda and beyond grow with websites, mobile apps, graphic design, video editing, and AI-powered digital products.",
  alternates: {
    canonical: "https://zidesigns.vercel.app",
  },
  openGraph: {
    title: "Zi Designs - Creative Tech Studio",
    description:
      "Websites, mobile apps, graphic design, video editing, and AI-powered digital products for startups and creators in Uganda and beyond.",
    url: "https://zidesigns.vercel.app",
  },
  twitter: {
    title: "Zi Designs - Creative Tech Studio",
    description:
      "Websites, mobile apps, graphic design, video editing, and AI-powered digital products for startups and creators in Uganda and beyond.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-page">
      <Navigation />
      <PageTitleTracker />
      <main>
        <SectionReveal>
          <HeroSection />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <ServicesShowcase />
        </SectionReveal>
        {/* ContactSection removed — contact links moved to the footer and Start Project flow */}
      </main>
      <SectionReveal delay={0.1}>
        <Footer />
      </SectionReveal>
      <AIChatbot />
    </div>
  );
}
