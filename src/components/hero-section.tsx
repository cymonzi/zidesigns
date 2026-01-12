"use client"

import Link from "next/link"
import { ArrowRight, Play } from "lucide-react"
import { motion } from "framer-motion"
import { AntigravityBackground } from "./antigravity-background"

export function HeroSection() {
  // Removed mouse parallax/tilt — using simple fade animations for headline words

  return (
    <div className="relative isolate px-4 sm:px-6 pt-24 sm:pt-32 lg:px-8 min-h-screen flex items-center perspective overflow-hidden">
      {/* Antigravity background effect */}
      <AntigravityBackground />
      
      {/* Ambient gradient blobs (top-left and bottom-right) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-44 left-12 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_10%_10%,rgba(64,224,208,0.15),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-8 right-12 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle_at_90%_90%,rgba(54,69,79,0.12),transparent_70%)] blur-3xl" />
      </div>

      <motion.div
        style={{ transformStyle: "preserve-3d" }}
        className="mx-auto max-w-5xl w-full text-center relative"
      >
        <motion.h1
          style={{ transformStyle: "preserve-3d" }}
          className="text-3xl font-bold tracking-tight text-fg sm:text-5xl lg:text-7xl layer-front mx-auto max-w-4xl leading-tight"
        >
          We build{" "}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
            className="text-gradient inline-block"
          >
            smart brands
          </motion.span>
          ,{" "}
          <br className="hidden lg:inline" />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
            className="text-gradient inline-block"
          >
            websites
          </motion.span>
          ,{" "}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
            className="text-gradient inline-block"
          >
            mobile apps
          </motion.span>
          {" "}and{" "}
          <br className="hidden lg:inline" />
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.60, duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
            className="text-gradient inline-flex items-center gap-2"
          >
            tools
          </motion.span>
          {" "}that work.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16,0.84,0.44,1] }}
          className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted max-w-2xl mx-auto px-4 sm:px-0"
        >
          From UI/UX to AI tools, we combine design with strategy to create impactful digital experiences that drive results.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16,0.84,0.44,1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Link
            href="#contact"
            className="w-full sm:w-auto focus-ring relative rounded-lg bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-[rgba(64,224,208,0.35)] ring-0 transition-all duration-300 hover:shadow-[rgba(64,224,208,0.55)] text-center"
          >
            <span className="relative z-10 inline-flex items-center gap-2 justify-center">Start a Project <ArrowRight className="h-4 w-4" /></span>
            <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link
            href="#design-lessons"
            className="w-full sm:w-auto focus-ring group relative rounded-lg border border-base px-7 py-3.5 text-sm font-semibold text-fg transition-all duration-300 hover:bg-surface-alt text-center"
          >
            <span className="inline-flex items-center gap-2 justify-center"><Play className="h-4 w-4" /> Explore Services</span>
          </Link>
        </motion.div>

        {/* Floating feature cards removed */}

        {/* Scroll indicator removed per request */}
      </motion.div>

      {/* Overlay shine (subtle) */}
      <div
        style={{ opacity: 0.25 }}
        className="pointer-events-none absolute inset-0 -z-20 bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.12),transparent_60%)] dark:bg-[radial-gradient(circle_at_60%_40%,rgba(255,255,255,0.06),transparent_60%)] mix-blend-overlay"
        aria-hidden="true"
      />
    </div>
  )
}
