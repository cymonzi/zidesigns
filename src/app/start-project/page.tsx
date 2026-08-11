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
      
      <main className="flex-1 pt-[var(--nav-height)] overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col">
          {/* Header */}
          <div className="relative pb-4 sm:pb-6 text-center flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base bg-surface text-xs font-medium text-muted tracking-widest uppercase mb-2 sm:mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              Get Started
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight px-2"
            >
              Start a <span className="text-gradient">Project</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-muted max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4"
            >
              Tell us about your project and we'll recommend the best solution, timeline, and next steps.
            </motion.p>
          </div>

          {/* Form Content */}
          <div className="flex-1 min-h-0">
            <Suspense fallback={<div>Loading...</div>}>
              <StartProjectForm />
            </Suspense>
          </div>
        </div>
      </main>

      <SectionReveal delay={0.3}>
        <Footer />
      </SectionReveal>

      <AIChatbot />
    </div>
  )
}
