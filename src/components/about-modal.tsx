"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X, Github, Linkedin, Mail } from "lucide-react"
import Image from "next/image"

interface AboutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" aria-modal="true" role="dialog">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/98 backdrop-blur-3xl"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-background border border-base shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            {/* Close Button - Always visible regardless of scroll */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full p-2 bg-background/40 backdrop-blur-md border border-base hover:bg-surface text-muted-foreground hover:text-foreground transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Scrollable Content Area */}
            <div className="flex flex-col md:flex-row overflow-y-auto w-full max-h-[90vh]">
              
              {/* Profile Image Section */}
              <div className="flex flex-col items-center justify-center pt-10 pb-6 px-6 md:p-10 md:w-2/5 shrink-0 bg-surface/30 border-b md:border-b-0 md:border-r border-base">
                <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-4 border-background shadow-lg mb-4 md:mb-0">
                  {/* Using 1.2.JPG based on terminal output */}
                  <Image
                    src="/images/1.2.JPG"
                    alt="Simon Peter Musinguzi"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 160px, 224px"
                    priority
                  />
                </div>
              </div>
              
              {/* Content Section */}
              <div className="p-6 md:p-10 md:w-3/5 space-y-8">
                {/* Header & Bio */}
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-2">
                    Meet the Founder
                  </h2>
                  <p className="text-lg font-medium text-[var(--primary)] mb-5">
                    Hi, I&apos;m Simon Peter Musinguzi, founder of Zi Designs.
                  </p>
                  <div className="space-y-4 text-muted-foreground leading-relaxed text-sm md:text-base">
                    <p>
                      Based in Kampala, Uganda, I help startups, businesses, and organizations transform ideas into digital products through UI/UX design, web development, mobile apps, branding, and AI-powered solutions.
                    </p>
                    <p>
                      My approach combines design, technology, and business thinking to create experiences that are both functional and impactful.
                    </p>
                  </div>
                </div>

                {/* Tools & Tech */}
                <div>
                  <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-3 text-muted-foreground">Tools & Technologies</h3>
                  <div className="flex flex-wrap gap-2 text-sm text-foreground">
                    {['React', 'Next.js', 'Flutter', 'Firebase', 'Figma', 'Canva', 'AI Tools', 'GitHub'].map((tool) => (
                      <span key={tool} className="px-3 py-1.5 rounded-full bg-surface border border-base font-medium transition-colors hover:border-[var(--primary)]/50">
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Socials & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div>
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-3 text-muted-foreground">Connect</h3>
                    <div className="flex flex-col gap-3">
                      <a href="https://github.com/cymonzi" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-foreground hover:text-[var(--primary)] transition-colors group w-fit">
                        <span className="p-2 rounded-full bg-surface border border-base group-hover:border-[var(--primary)]/50 transition-colors">
                          <Github className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium">github.com/cymonzi</span>
                      </a>
                      <a href="https://linkedin.com/in/musinguzi-simon-peter-5ba74b2a8" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-foreground hover:text-[var(--primary)] transition-colors group w-fit">
                        <span className="p-2 rounded-full bg-surface border border-base group-hover:border-[var(--primary)]/50 transition-colors">
                          <Linkedin className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium">LinkedIn Profile</span>
                      </a>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm uppercase tracking-wider font-semibold text-foreground mb-3 text-muted-foreground">Contact</h3>
                    <div className="flex flex-col gap-3">
                      <a href="mailto:cymonmusinguzi@gmail.com" className="flex items-center gap-2.5 text-foreground hover:text-[var(--primary)] transition-colors group w-fit">
                        <span className="p-2 rounded-full bg-surface border border-base group-hover:border-[var(--primary)]/50 transition-colors">
                          <Mail className="h-4 w-4" />
                        </span>
                        <span className="text-sm font-medium break-all">cymonmusinguzi@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
