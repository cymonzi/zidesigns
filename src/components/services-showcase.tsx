"use client"

import { ExternalLink, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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
  downloadUrl?: string
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
  pricing?: {
    startingFrom?: string
    perfectFor: string[]
    whatsIncluded: string[]
    optionalAddons?: string[]
  }
}

const services: Service[] = [
  {
    id: 1,
    number: "01",
    slug: "website",
    title: "Website Development",
    description: "Professional websites designed to help businesses attract customers, build credibility, and grow online.",
    pricing: {
      startingFrom: "UGX 750,000",
      perfectFor: [
        "Small & Medium Businesses",
        "Startups",
        "Corporate Organizations",
        "E-commerce Brands",
      ],
      whatsIncluded: ["Responsive design", "Custom UI", "Contact forms", "SEO-ready setup", "Performance optimization", "CMS (where applicable)"],
      optionalAddons: ["Booking system", "Online payments", "Blog", "Live chat", "Analytics"],
    },
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
    title: "Mobile Application Development",
    description: "Build custom Android and iOS applications that help your business engage customers, streamline operations, and scale with confidence.",
    pricing: {
      startingFrom: "UGX 5,000,000",
      perfectFor: [
        "Startups & MVPs",
        "Customer-Facing Businesses",
        "Service Providers",
        "Organizations Building Digital Platforms",
      ],
      whatsIncluded: [
        "Custom UI/UX Design",
        "Android & iOS Development",
        "Backend Integration",
        "Testing & Deployment Support",
      ],
    },
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
    description: "Create visually compelling designs that communicate your message, strengthen your brand, and leave a lasting impression across print and digital platforms.",
    pricing: {
      startingFrom: "UGX 20,000",
      perfectFor: [
        "Marketing Campaigns",
        "Business Promotions",
        "Corporate Communications",
        "Events & Conferences",
      ],
      whatsIncluded: [
        "Posters & Flyers",
        "Social Media Graphics",
        "Company Profiles",
        "Presentation Design",
        "Marketing Materials",
      ],
    },
    webExamples: [
      {
        name: "GMF",
        url: "/insights#preview",
        image: "/images/GMF/1.png",
        imageAlt: "GMF Design by MUSINGUZI",
      },
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
      {
        name: "WM Poster",
        url: "/images/WMPoster.png",
        image: "/images/WMPoster.png",
        imageAlt: "WM Poster graphic design by Zi Designs",
      },
    ],
  },
  {
    id: 4,
    number: "04",
    slug: "video-editing",
    title: "Video Editing & Visual Effects",
    description: "Transform raw footage into engaging videos that capture attention, tell compelling stories, and elevate your brand across digital platforms.",
    pricing: {
      perfectFor: [
        "Marketing Campaigns",
        "Social Media Content",
        "Corporate Videos",
        "Product Promotions",
      ],
      whatsIncluded: [
        "Professional Video Editing",
        "Motion Graphics",
        "Visual Effects",
        "Color Correction & Audio Enhancement",
        "Export for Web & Social Media",
      ],
    },
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
    description: "Empower your business with custom digital tools that automate workflows, improve productivity, and simplify everyday operations.",
    pricing: {
      perfectFor: [
        "Automating repetitive tasks",
        "Digitizing manual workflows",
        "Managing business data",
        "Improving team productivity",
      ],
      whatsIncluded: [
        "Custom Business Tools",
        "Workflow Automation",
        "Data Management Solutions",
        "Dashboard Development",
        "Ongoing Support & Enhancements",
      ],
    },
    webExamples: [
      {
        name: "Beyond - Sign In",
        url: "https://beyond-cyan.vercel.app/",
        image: "/images/beyond/auth.png",
        imageAlt: "Beyond app auth screen preview designed by Zi Designs",
      },
      {
        name: "Beyond - Home",
        url: "https://beyond-cyan.vercel.app/",
        image: "/images/beyond/home.png",
        imageAlt: "Beyond app home screen preview designed by Zi Designs",
      },
      {
        name: "Beyond - Create Account",
        url: "https://beyond-cyan.vercel.app/",
        image: "/images/beyond/account.png",
        imageAlt: "Beyond app accounts screen preview designed by Zi Designs",
      },
      {
        name: "Beyond - Add Transaction",
        url: "https://beyond-cyan.vercel.app/",
        image: "/images/beyond/transaction.png",
        imageAlt: "Beyond app transactions screen preview designed by Zi Designs",
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

function LiveSlideshow({ examples, serviceSlug }: { examples: WebExample[]; serviceSlug?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const router = useRouter()

  // Auto-loop effect
  useEffect(() => {
    if (examples.length <= 1) return

    const interval = window.setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % examples.length)
    }, 5000)

    return () => window.clearInterval(interval)
  }, [examples.length])

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

  const isGraphicDesign = serviceSlug === "graphic-design"
  const isInternalLink = currentExample.url.startsWith("/")
  const isGmfPreview = isGraphicDesign && currentExample.name === "GMF"
  const actionHref = isGmfPreview ? "/insights#preview" : currentExample.url
  const actionLabel = isGmfPreview ? "Preview" : "View"
  const isSmartTools = serviceSlug === "smart-tools"

  return (
    <div className="space-y-4">
      {isSmartTools ? (
        <Link
          href={currentExample.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-2xl overflow-hidden border border-base shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 bg-surface"
        >
          <div className="relative w-full h-[400px] overflow-hidden">
            {examples.map((example, index) => (
              <motion.div
                key={example.name}
                initial={false}
                animate={{
                  opacity: index === currentIndex ? 1 : 0,
                }}
                transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0"
              >
                <Image
                  src={example.image}
                  alt={example.imageAlt ?? example.name}
                  fill
                  className="object-contain bg-surface/50 p-2"
                />
              </motion.div>
            ))}
          </div>
        </Link>
      ) : isGraphicDesign ? (
        <button
          type="button"
          onClick={() => {
            if (isInternalLink) {
              router.push(currentExample.url)
            } else {
              window.open(currentExample.url, "_blank", "noopener,noreferrer")
            }
          }}
          className="block w-full rounded-2xl overflow-hidden border border-base shadow-md hover:shadow-xl hover:scale-[1.015] transition-all duration-300 bg-surface text-left cursor-pointer"
        >
          <div className="relative w-full h-[400px]">
            <Image
              src={currentExample.image}
              alt={currentExample.imageAlt ?? currentExample.name}
              fill
              className="object-contain bg-surface/50 p-2"
            />
          </div>
        </button>
      ) : (
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
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <p className="text-sm text-muted font-medium truncate">
            {currentExample.name}
          </p>
          <a
            href={actionHref}
            target={isGmfPreview ? undefined : "_blank"}
            rel={isGmfPreview ? undefined : "noopener noreferrer"}
            className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-[var(--primary)] hover:text-[var(--primary)]/75 transition-colors"
          >
            {actionLabel}
          </a>
          {currentExample.downloadUrl && (
            <button
              type="button"
              onClick={() => {
                const a = document.createElement("a")
                a.href = currentExample.downloadUrl!
                a.download = ""
                document.body.appendChild(a)
                a.click()
                document.body.removeChild(a)
              }}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-semibold text-muted hover:text-fg transition-colors"
            >
              Download
            </button>
          )}
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
              Services
            </h2>
            <p className="sm:max-w-xs text-base text-muted leading-relaxed">
              Choose the service that fits your idea and let us build it with clarity and speed.
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

                {/* Pricing Details */}
                {service.pricing && (
                  <div className="pl-9 space-y-5">
                    {/* Starting price only if available */}
                    {service.pricing.startingFrom && (
                      <div className="flex flex-col gap-1">
                        <p className="text-xs font-medium text-muted uppercase tracking-wider">Starting Price</p>
                        <p className="text-xl font-bold text-fg">{service.pricing.startingFrom}</p>
                      </div>
                    )}

                    {/* Perfect for — chips */}
                    <ul className="flex flex-wrap gap-2">
                      {service.pricing.perfectFor.map((item, i) => (
                        <li key={i} className="px-3 py-1 rounded-full bg-surface-alt border border-base text-xs font-medium text-fg">
                          {item}
                        </li>
                      ))}
                    </ul>

                    {/* Included + add-ons merged into one chip row */}
                    <ul className="flex flex-wrap gap-1.5">
                      {service.pricing.whatsIncluded.map((item, i) => (
                        <li key={i} className="px-2.5 py-1 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">
                          {item}
                        </li>
                      ))}
                      {service.pricing.optionalAddons?.map((item, i) => (
                        <li key={i} className="px-2.5 py-1 rounded-md border border-dashed border-base text-muted text-xs font-medium">
                          + {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* CTA / Links */}
                <div className="pl-9 flex flex-col gap-3">
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

                  <Link
                    href={`/start-project?service=${encodeURIComponent(service.title)}`}
                    className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-5 py-2.5 rounded-lg border border-base text-sm font-semibold text-fg hover:bg-surface-alt hover:text-[var(--primary)] hover:underline transition-all"
                  >
                    Request this service
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>


                </div>
              </div>

              {/* ── Right: Preview ── */}
              <div className={`${index % 2 === 1 ? "lg:order-1" : ""}`}>

                {/* Live websites slideshow */}
                {service.webExamples && service.webExamples.length > 0 && (
                  <LiveSlideshow examples={service.webExamples} serviceSlug={service.slug} />
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
