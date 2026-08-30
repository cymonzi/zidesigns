import type { Metadata } from "next";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { PageTitleTracker } from "@/components/page-title-tracker";
import { AIChatbot } from "@/components/ai-chatbot";
import { SectionReveal } from "@/components/section-reveal";
import { InsightsShowcase } from "@/components/insights-showcase";

export const metadata: Metadata = {
  title: "Programs - Zi Designs",
  description: "Practical programs designed to help people discover their potential, develop valuable capabilities, and turn what they have into meaningful opportunities.",
  alternates: {
    canonical: "https://zidesigns.vercel.app/learn",
  },
  openGraph: {
    title: "Programs - Zi Designs",
    description: "Practical programs designed to help people discover their potential, develop valuable capabilities, and turn what they have into meaningful opportunities.",
    url: "https://zidesigns.vercel.app/learn",
  },
  twitter: {
    title: "Programs - Zi Designs",
    description: "Practical programs designed to help people discover their potential, develop valuable capabilities, and turn what they have into meaningful opportunities.",
  },
};

export default function LearnPage() {
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
