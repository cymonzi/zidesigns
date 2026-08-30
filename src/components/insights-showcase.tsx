"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Suspense, useEffect, useState, useRef } from "react"
import WaitlistModal from "./waitlist-modal"
import LearnToast from "./learn-toast"

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

interface Framework {
  id: number
  number: string
  title: string
  description: string
  latestRelease: string
  latestFramework: string
  frameworkDescription?: string
  audience: string[]
  tags: string[]
  images: string[]
  frameworkId: string
  trailerUrl: string
  posterUrl: string
}

const frameworks: Framework[] = [
  {
    id: 1,
    number: "01",
    title: "From Gift to Income",
    description:
      "A 6-week online program designed to help fresh graduates discover their gifts, develop them with purpose, and start turning capability into opportunity.",
    latestRelease: "This September",
    latestFramework: "The Gift Maturation Framework",
    frameworkDescription:
      "Your gift is only the beginning. This program helps you understand what you have, develop it into something valuable, put it to work in the real world, and explore how it can generate income.",
    audience: ["Fresh Graduates", "Early Career Builders", "Aspiring Creators", "Career Switchers"],
    tags: ["Discover", "Develop", "Deploy", "Earn"],
    images: [
      "/images/GMF/1.png",
      "/images/GMF/2.png",
      "/images/GMF/4.png",
      "/images/GMF/7.png",
      "/images/GMF/12.png",
      "/images/GMF/15.png",
      "/images/GMF/18.png",
    ],
    frameworkId: "gmf",
    trailerUrl: "/videos/GMF-Trailer.mp4",
    posterUrl: "/images/GMF.png",
  },
]

export function InsightsShowcase() {
  const [waitlistOpen, setWaitlistOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const startMuted = async () => {
      try {
        video.muted = true
        await video.play()
        setIsPlaying(true)
      } catch (error) {
        console.error("Auto-play failed:", error)
      }
    }

    startMuted()
  }, [])

  const handlePlayClick = async () => {
    const video = videoRef.current
    if (!video) return

    try {
      if (video.paused) {
        await video.play()
        setIsPlaying(true)
      } else {
        video.pause()
        setIsPlaying(false)
      }
    } catch (error) {
      console.error("Video playback error:", error)
    }
  }

  return (
    <section className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base bg-surface text-xs font-medium text-muted tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            Programs
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg leading-[1.05]">
              Learn
            </h2>
            <div className="sm:max-w-xs flex flex-col gap-3">
              <p className="text-base text-muted leading-relaxed order-1 sm:order-2">
                Practical programs designed to help people discover their potential, develop valuable capabilities, and turn what they have into meaningful opportunities.
              </p>
              <div className="order-2 sm:order-1">
                <Suspense fallback={null}>
                  <LearnToast />
                </Suspense>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="border-t border-base mb-0" />

        <div>
          {frameworks.map((framework, index) => (
            <motion.div
              key={framework.id}
              custom={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-stretch py-16 border-b border-base"
            >
              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono font-semibold text-[var(--primary)] mt-1.5 shrink-0">
                    {framework.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-fg leading-snug">
                    {framework.title}
                  </h3>
                </div>

                <p className="text-base text-muted leading-relaxed pl-9">
                  {framework.description}
                </p>

                <div className="pl-9 space-y-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-muted uppercase tracking-wider">Starting</p>
                    <p className="text-xl font-bold text-fg">{framework.latestRelease}</p>
                    <p className="text-sm font-semibold text-[var(--primary)]">The Gift Maturation Framework</p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted uppercase tracking-wider mb-3">Who it&apos;s for</p>
                    <ul className="flex flex-wrap gap-2">
                      {framework.audience.map((item, i) => (
                        <li key={i} className="px-3 py-1 rounded-full bg-surface-alt border border-base text-xs font-medium text-fg">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-muted uppercase tracking-wider mb-3">Transformation</p>
                    <ul className="flex flex-wrap gap-2">
                      {framework.tags.map((item, i) => (
                        <li
                          key={i}
                          className="inline-flex items-center gap-1 rounded-full bg-surface-alt/80 px-3 py-1.5 text-xs font-medium text-muted"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {framework.frameworkDescription && (
                    <p className="text-sm text-muted leading-relaxed italic">
                      {framework.frameworkDescription}
                    </p>
                  )}
                </div>
              </div>

              <div id="preview" className="order-1 lg:order-2">
                <div className="rounded-[2rem] border border-base bg-surface shadow-[0_30px_80px_rgba(0,0,0,0.1)] dark:shadow-[0_30px_80px_rgba(15,23,42,0.35)] p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-semibold uppercase tracking-[0.24em] text-muted">
                      The GMF Trailer
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-surface-alt px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--primary)] border border-[var(--primary)]/15">
                        Preview
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 overflow-hidden rounded-[1.75rem] bg-surface-alt relative">
                    <video
                      ref={videoRef}
                      poster={framework.posterUrl}
                      className="aspect-video w-full object-cover"
                      controls
                      disablePictureInPicture
                      preload="metadata"
                      playsInline
                      muted
                      loop
                    >
                      <source src={framework.trailerUrl} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  </div>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <span className="rounded-full bg-surface-alt px-4 py-2 text-xs text-muted">Ready To Get Started?</span>
                  </div>

                  <div className="mt-6 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setWaitlistOpen(true)}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-7 py-3 text-sm font-semibold text-black transition hover:bg-[var(--primary)]/90"
                    >
                      Join the Waitlist
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <WaitlistModal isOpen={waitlistOpen} onClose={() => setWaitlistOpen(false)} />
    </section>
  )
}
