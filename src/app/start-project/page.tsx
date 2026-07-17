"use client"

// Link removed — navigation provided in the form
import { motion } from "framer-motion"
import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTitleTracker } from "@/components/page-title-tracker"
import { AIChatbot } from "@/components/ai-chatbot"
import { SectionReveal } from "@/components/section-reveal"
import { StartProjectForm } from "@/components/start-project-form"

export default function StartProjectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Navigation />
      <PageTitleTracker />
      <main className="flex-1 min-h-[calc(100vh_-_var(--nav-height))] pt-[calc(var(--nav-height)_+_1rem)] pb-20 px-6 lg:px-8 max-w-5xl mx-auto">
        <div className="relative pt-10 sm:pt-12 pb-8 sm:pb-12 px-4 text-center overflow-hidden">
          <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(64,224,208,0.15),transparent_70%)] blur-3xl" />
          </div>

          <motion.h1 initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="text-2xl sm:text-3xl font-bold tracking-tight">
            Start a <span className="text-gradient">Project</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="mt-2 text-muted max-w-lg mx-auto text-sm sm:text-base leading-7">
            Tell us about your project and we'll recommend the best solution, timeline, and next steps. Most inquiries receive a response within 24 hours.
          </motion.p>
        </div>

        <SectionReveal className="mt-10">
          <Suspense fallback={<div>Loading...</div>}>
            <StartProjectForm />
          </Suspense>
        </SectionReveal>

        {/* page-level Return Home removed; use form actions instead */}
      </main>

      <SectionReveal delay={0.1}>
        <Footer />
      </SectionReveal>

      <AIChatbot />
    </div>
  )
}
