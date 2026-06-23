"use client"

import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface SubExample {
  name: string
  url: string
  type: "embed"
  thumbnail?: string
  imageAlt?: string
}

interface WebExample {
  name: string
  url: string
  image: string
  imageAlt?: string
}

interface SingleExample {
  name: string
  url: string
  type: "live" | "embed"
}

interface Service {
  id: number
  number: string
  slug: string
  title: string
  description: string
  example?: SingleExample
  webExamples?: WebExample[]
  subExamples?: SubExample[]
}

const services: Service[] = [
  {
    id: 1,
    number: "01",
    slug: "website",
    title: "Website Development",
    description:
      "Turn visitors into leads with a website that looks sharp, loads fast, and makes people take action.",
    webExamples: [
      {
        name: "Futureline Solutions",
        url: "https://futureline-ten.vercel.app/",
        image: "/images/futureline.png",
        imageAlt: "Homepage preview for Futureline Solutions website designed and developed by Zi Designs",
      },
      {
        name: "Workmasters Website",
        url: "https://theworkmasters.vercel.app",
        image: "/images/theworkmasters.png",
        imageAlt: "Landing page preview for The Workmasters website built by Zi Designs",
      },
    ],
  },
  {
    id: 2,
    number: "02",
    slug: "mobile-app",
    title: "Mobile App Design",
    description:
      "Launch faster with app flows your users understand in seconds, so your product gets used not ignored.",
    subExamples: [
      {
        name: "Nfunayo App Wireframes",
        url: "https://www.canva.com/design/DAGQoe1eN-k/pIxPEgpY0wcHTJE0dU5mbg/view?embed",
        type: "embed",
      },
      {
        name: "Litywise UI Prototype",
        url: "https://embed.figma.com/proto/r5vxvEstbY70m6gKVKDYEk/Litywise-UI?scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=439-8&embed-host=share",
        type: "embed",
        thumbnail: "/images/Litywise-UI.png",
        imageAlt: "Litywise mobile app UI prototype screens designed by Zi Designs",
      },
    ],
  },
  {
    id: 3,
    number: "03",
    slug: "graphic-design",
    title: "Graphic Design",
    description: "Make your brand instantly recognizable with visuals people remember and trust.",
    webExamples: [
      {
        name: "Builder Profiles",
        url: "/images/zicharacter.png",
        image: "/images/zicharacter.png",
        imageAlt: "Builder Profiles Design",
      },
      {
        name: "Coffee Farmers Training",
        url: "/images/ct.png",
        image: "/images/ct.png",
        imageAlt: "Coffee Farmers Training Design",
      },
      {
        name: "Course Masters",
        url: "/images/cm.png",
        image: "/images/cm.png",
        imageAlt: "Course Masters Design",
      },
    ],
  },
  {
    id: 4,
    number: "04",
    slug: "video-editing",
    title: "Video Editing & Visual Effects",
    description: "Stop the scroll with polished videos that hold attention and drive real response.",
    subExamples: [
      {
        name: "Cymon Zi Promo",
        url: "https://www.canva.com/design/DAGqCS_xbwU/Les8qtK0EmSSqUodfD8y_A/watch?embed",
        type: "embed",
      },
      {
        name: "CSHE Video Production",
        url: "https://www.canva.com/design/DAG8aLd0yHw/reMb1Jbz9UmRbtpgVq2rOg/watch?embed",
        type: "embed",
      },
    ],
  },
  {
    id: 5,
    number: "05",
    slug: "smart-tools",
    title: "Smart Digital Tools",
    description:
      "We design and build simple, intelligent tools that help people manage their daily lives.",
    webExamples: [
      {
        name: "Momento - Intro Page",
        url: "https://momento01.vercel.app/",
        image: "/images/momento/intro-page.png",
        imageAlt: "Momento app intro screen preview designed by Zi Designs",
      },
      {
        name: "Momento - Sign Up",
        url: "https://momento01.vercel.app/",
        image: "/images/momento/sign-up.png",
        imageAlt: "Momento sign up screen preview designed by Zi Designs",
      },
      {
        name: "Momento - Inside",
        url: "https://momento01.vercel.app/",
        image: "/images/momento/inside.png",
        imageAlt: "Momento in-app dashboard preview designed by Zi Designs",
      },
    ],
  },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
}

function getProjectLink(url: string) {
  return url.replace("?embed", "").replace("watch?embed", "watch")
}

function EmbedSlideshow({ examples }: { examples: SubExample[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length)
  }

  const currentExample = examples[currentIndex]
  const fullViewLink = getProjectLink(currentExample?.url ?? "")

  if (!currentExample) {
    return null
  }

  return (
    <div className="space-y-4">
      <div className="rounded-2xl overflow-hidden border border-base shadow-md relative h-80">
        {currentExample.thumbnail ? (
          <Link
            href={fullViewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full w-full bg-surface"
          >
            <Image
              src={currentExample.thumbnail}
              alt={currentExample.imageAlt ?? currentExample.name}
              fill
              className="object-cover"
            />
          </Link>
        ) : (
          <iframe
            loading="lazy"
            key={`${currentExample.name}-${currentIndex}`}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            src={currentExample.url}
            allowFullScreen
            allow="fullscreen"
          />
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <p className="text-sm text-muted font-medium truncate">
            {currentExample.name}
          </p>
          <a
            href={fullViewLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary)]/75 transition-colors flex-shrink-0"
          >
            <ExternalLink className="h-3 w-3" />
            Full view
          </a>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border border-base hover:bg-surface transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 text-muted" />
          </button>
          <span className="text-xs text-muted font-medium px-1 w-12 text-center">
            {currentIndex + 1} / {examples.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-base hover:bg-surface transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 text-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}

function LiveSlideshow({ examples }: { examples: WebExample[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + examples.length) % examples.length)
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % examples.length)
  }

  const currentExample = examples[currentIndex]

  if (!currentExample) {
    return null
  }

  return (
    <div className="space-y-4">
      <Link
        href={currentExample.url}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-2xl overflow-hidden border border-base shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 bg-surface"
      >
        <div className="relative w-full h-[400px]">
          <Image
            src={currentExample.image}
            alt={currentExample.imageAlt ?? currentExample.name}
            fill
            className="object-contain bg-surface/50 p-2"
          />
        </div>
      </Link>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted font-medium truncate">
            {currentExample.name}
          </p>
          <a
            href={currentExample.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary)]/75 transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Visit
          </a>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handlePrev}
            className="p-2 rounded-lg border border-base hover:bg-surface transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="h-4 w-4 text-muted" />
          </button>
          <span className="text-xs text-muted font-medium px-1 w-12 text-center">
            {currentIndex + 1} / {examples.length}
          </span>
          <button
            onClick={handleNext}
            className="p-2 rounded-lg border border-base hover:bg-surface transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="h-4 w-4 text-muted" />
          </button>
        </div>
      </div>
    </div>
  )
}

export function ServicesShowcase() {
  return (
    <section id="services" className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* ── Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20"
        >
          {/* Label pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base bg-surface text-xs font-medium text-muted tracking-widest uppercase mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
            Our Services
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg leading-[1.05]">
              What We Do
            </h2>
            <p className="sm:max-w-xs text-base text-muted leading-relaxed">
              You bring the goal. We build the product that gets you there.
            </p>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="border-t border-base mb-0" />

        {/* ── Service Rows ── */}
        <div>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-${service.slug}`}
              custom={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start py-16 border-b border-base"
            >
              {/* ── Left: Text Content ── */}
              <div className={`flex flex-col gap-8 ${index % 2 === 1 ? "lg:order-2" : ""}`}>

                {/* Number + Title */}
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono font-semibold text-[var(--primary)] mt-1.5 shrink-0">
                    {service.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-fg leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base text-muted leading-relaxed pl-9">
                  {service.description}
                </p>

                {/* CTA / Links */}
                <div className="pl-9">
                  {!service.webExamples && service.example?.type === "live" && (
                    <a
                      href={service.example.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--primary)] text-black text-sm font-semibold rounded-lg hover:bg-[var(--primary)]/85 active:scale-[0.97] transition-all"
                    >
                      See Live Result
                      <ArrowUpRight className="h-4 w-4" />
                    </a>
                  )}

                  {service.subExamples && (
                    <div className="flex flex-col gap-3">
                      <p className="text-xs font-medium text-muted uppercase tracking-widest mb-1">
                        Proof
                      </p>
                      {service.subExamples.map((ex) => (
                        <a
                          key={ex.name}
                          href={getProjectLink(ex.url)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary)]/75 transition-colors group"
                        >
                          {ex.name}
                          <ExternalLink className="h-3.5 w-3.5 opacity-60 group-hover:opacity-100 transition-opacity" />
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* ── Right: Preview ── */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>

                {/* Live websites slideshow */}
                {service.webExamples && service.webExamples.length > 0 && (
                  <LiveSlideshow examples={service.webExamples} />
                )}

                {/* Live site screenshot */}
                {!service.webExamples && service.example?.type === "live" && (
                  <Link
                    href={service.example.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-2xl overflow-hidden border border-base shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 bg-surface"
                  >
                    <Image
                      src="/images/theworkmasters.png"
                      alt={service.example.name}
                      width={700}
                      height={460}
                      className="w-full h-auto"
                    />
                  </Link>
                )}

                {/* Single embed */}
                {service.example?.type === "embed" && (
                  <div className="relative h-80 rounded-2xl overflow-hidden border border-base shadow-md">
                    <iframe
                      loading="lazy"
                      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
                      src={service.example.url}
                      allowFullScreen
                      allow="fullscreen"
                    />
                  </div>
                )}

                {service.subExamples && service.subExamples.length > 0 && (
                  <EmbedSlideshow examples={service.subExamples} />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
