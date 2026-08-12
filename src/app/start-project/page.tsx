"use client"

// Link removed — navigation provided in the form
import { motion } from "framer-motion"
import { Suspense, useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTitleTracker } from "@/components/page-title-tracker"
import { AIChatbot } from "@/components/ai-chatbot"
import { SectionReveal } from "@/components/section-reveal"
import { StartProjectForm } from "@/components/start-project-form"

type Phase = 1 | 2 | 3

const STEP_HEADINGS: Record<Phase, { title: string; subtitle: string }> = {
  1: {
    title: "Start a Project",
    subtitle: "Choose from our packages or customize your own solution to bring your vision to life.",
  },
  2: {
    title: "Your Contact Information",
    subtitle: "Share your details so we can get in touch with you about your project.",
  },
  3: {
    title: "Review & Submit",
    subtitle: "Review your project details and submit your request. We'll contact you within 24 hours.",
  },
}

// Words to apply gradient effect to in each title
const GRADIENT_WORDS: Record<Phase, string> = {
  1: "Project",
  2: "Information",
  3: "Submit",
}

function StartProjectContent() {
  const [currentPhase, setCurrentPhase] = useState<Phase>(1)
  const { title, subtitle } = STEP_HEADINGS[currentPhase]
  const gradientWord = GRADIENT_WORDS[currentPhase]

  return (
    <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col">
      {/* Header */}
      <div className="relative pb-4 sm:pb-6 text-center flex-shrink-0">
        <motion.div
          key={currentPhase + "-badge"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base bg-surface text-xs font-medium text-muted tracking-widest uppercase mb-2 sm:mb-3"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
          Get Started
        </motion.div>

        <motion.h1
          key={currentPhase + "-title"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight px-2"
        >
          {title.split(gradientWord).map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && <span className="text-gradient">{gradientWord}</span>}
            </span>
          ))}
        </motion.h1>
        
        <motion.p
          key={currentPhase + "-subtitle"}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-2 text-muted max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Form Content */}
      <div className="flex-1 min-h-0">
        <Suspense fallback={<div>Loading...</div>}>
          <StartProjectForm onPhaseChange={setCurrentPhase} />
        </Suspense>
      </div>
    </div>
  )
}

export default function StartProjectPage() {
  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Navigation />
      <PageTitleTracker />
      
      <main className="flex-1 pt-[var(--nav-height)] overflow-hidden">
        <StartProjectContent />
      </main>

      <SectionReveal delay={0.3}>
        <Footer />
      </SectionReveal>

      <AIChatbot />
    </div>
  )
}
