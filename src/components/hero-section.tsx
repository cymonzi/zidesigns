"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

export function HeroSection() {
  // Removed mouse parallax/tilt — using simple fade animations for headline words

  return (
    <div id="home" className="relative isolate px-4 sm:px-6 pt-[var(--nav-height)] lg:px-8 min-h-screen flex items-center perspective overflow-hidden">
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
          className="text-3xl font-bold tracking-tight text-fg sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl layer-front mx-auto max-w-3xl sm:max-w-4xl md:max-w-5xl leading-[1.1] sm:leading-[1.15] text-center break-words"
        >
          {/* Line 1: "Turn concepts into" - Regular */}
          <span className="block mb-1 sm:mb-2">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0, duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
              className="inline-block"
            >
              Turn concepts into
            </motion.span>
          </span>

          {/* Line 2: "digital experiences" gradient */}
          <span className="block mb-1 sm:mb-2">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
              className="text-gradient inline-block"
            >
              digital experiences
            </motion.span>
          </span>

          {/* Line 3: "that work" - Regular with different accent */}
          <span className="block">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.18, duration: 0.7, ease: [0.16, 0.84, 0.44, 1] }}
              className="inline-block text-muted"
            >
              that work
            </motion.span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16,0.84,0.44,1] }}
          className="mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted max-w-2xl mx-auto px-4 sm:px-0"
        >
          Zi Designs is a creative-tech studio crafting websites, mobile apps, and visual systems for startups, creators, and organizations.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.7, ease: [0.16,0.84,0.44,1] }}
          className="mt-4 text-base sm:text-lg leading-7 sm:leading-8 text-muted max-w-2xl mx-auto px-4 sm:px-0"
        >
          Using design, development, and AI tools, we help you go from concept to functional, beautiful digital products.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7, ease: [0.16,0.84,0.44,1] }}
          className="mt-4 text-base sm:text-lg font-semibold text-fg max-w-2xl mx-auto px-4 sm:px-0"
        >
          Simple. Clean. Functional. 
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7, ease: [0.16,0.84,0.44,1] }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6 px-4 sm:px-0"
          style={{ transform: 'translateZ(40px)' }}
        >
          <Link
            href="/start-project"
            className="w-full sm:w-auto focus-ring relative rounded-lg bg-[var(--primary)] px-7 py-3.5 text-sm font-semibold text-black shadow-lg shadow-[rgba(64,224,208,0.35)] ring-0 transition-all duration-300 hover:shadow-[rgba(64,224,208,0.55)] text-center"
          >
            <span className="relative z-10 inline-flex items-center gap-2 justify-center">Request a Service <ArrowRight className="h-4 w-4" /></span>
            <span className="pointer-events-none absolute inset-0 rounded-lg bg-gradient-to-br from-white/10 to-white/0 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
          <Link
            href="#services"
            className="w-full sm:w-auto focus-ring group relative rounded-lg border border-base px-7 py-3.5 text-sm font-semibold text-fg transition-all duration-300 hover:bg-surface-alt text-center"
          >
            <span className="inline-flex items-center gap-2 justify-center"><ArrowRight className="h-4 w-4" /> View Services</span>
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
