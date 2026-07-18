import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTitleTracker } from "@/components/page-title-tracker";
import { AIChatbot } from "@/components/ai-chatbot";
import { SectionReveal } from "@/components/section-reveal";
import { InsightsShowcase } from "@/components/insights-showcase";

export const metadata: Metadata = {
  title: "Insights - Zi Designs",
  description: "Share ideas, frameworks, research, and practical resources designed to help people learn, build and grow.",
  alternates: {
    canonical: "https://zidesigns.vercel.app/insights",
  },
  openGraph: {
    title: "Insights - Zi Designs",
    description: "Share ideas, frameworks, research, and practical resources designed to help people learn, build and grow.",
    url: "https://zidesigns.vercel.app/insights",
  },
  twitter: {
    title: "Insights - Zi Designs",
    description: "Share ideas, frameworks, research, and practical resources designed to help people learn, build and grow.",
  },
};

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-page">
      <Navigation />
      <PageTitleTracker />
      <main>
        <SectionReveal>
          <InsightsShowcase />
        </SectionReveal>
      </main>
      <SectionReveal delay={0.1}>
        <Footer />
      </SectionReveal>
      <AIChatbot />
    </div>
  );
}
