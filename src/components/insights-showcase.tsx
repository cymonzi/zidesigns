"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ArrowUpRight, Download, Eye } from "lucide-react"
import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { getOrCreateVisitorId, formatCompact } from "@/lib/visitor-id"

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
  coverImage: string
  frameworkId: string
  downloadUrl: string
}

const frameworks: Framework[] = [
  {
    id: 1,
    number: "01",
    title: "Frameworks",
    description: "Practical models developed to simplify complex ideas, guide decision-making, and help individuals and organizations create lasting value.",
    latestRelease: "July 26",
    latestFramework: "Gift Maturation Framework (GMF)",
    frameworkDescription: "GMF provides a practical pathway for discovering your gifts, developing them with purpose, expressing them through service, validating their value, building sustainable systems, and multiplying their impact.",
    audience: ["Students", "Professionals", "Entrepreneurs", "Leaders", "Educators"],
    tags: ["Discovery", "Development", "Expression", "Validation", "Structure", "Multiplication"],
    coverImage: "/images/GMF.png",
    frameworkId: "gmf",
    downloadUrl: "/document/GMF.pdf",
  },
]

export function InsightsShowcase() {
  const [viewCounts, setViewCounts] = useState<Record<string, { views: number; downloads: number }>>({})

  useEffect(() => {
    const trackViews = async () => {
      const visitorId = getOrCreateVisitorId()

      for (const framework of frameworks) {
        try {
          // Increment view count
          const { error: incrementError } = await supabase.rpc('increment_view', { 
            p_framework_id: framework.frameworkId, 
            p_visitor_id: visitorId 
          })

          if (incrementError) {
            console.error('Increment view error:', incrementError)
          }

          // Fetch current counts
          const { data, error } = await supabase
            .from('frameworks')
            .select('views, downloads')
            .eq('id', framework.frameworkId)
            .single()

          console.log('Supabase response:', { frameworkId: framework.frameworkId, data, error })

          if (error) {
            console.error('Fetch counts error:', error)
          }

          if (data && !error && data.views !== undefined && data.downloads !== undefined) {
            setViewCounts(prev => ({
              ...prev,
              [framework.frameworkId]: { views: data.views, downloads: data.downloads }
            }))
          } else {
            // Fallback to initial values if fetch fails or returns undefined
            console.log('Using fallback values for:', framework.frameworkId)
            setViewCounts(prev => ({
              ...prev,
              [framework.frameworkId]: { views: 1284, downloads: 312 }
            }))
          }
        } catch (err) {
          console.error('Error tracking views:', err)
          // Fallback to initial values
          setViewCounts(prev => ({
            ...prev,
            [framework.frameworkId]: { views: 1284, downloads: 312 }
          }))
        }
      }
    }

    trackViews()
  }, [])

  const handleDownload = async (frameworkId: string, downloadUrl: string) => {
    // Increment download count if Supabase is configured
    if (supabase) {
      try {
        await supabase.rpc('increment_download', { p_framework_id: frameworkId })
      } catch (err) {
        console.error('Error incrementing download:', err)
      }
    }

    // Trigger download
    const a = document.createElement("a")
    a.href = downloadUrl
    a.download = ""
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
  }

  return (
    <section className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base">
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
            Insights
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-fg leading-[1.05]">
              Insights
            </h2>
            <p className="sm:max-w-xs text-base text-muted leading-relaxed">
              Share ideas, frameworks, research, and practical resources designed to help people learn, build and grow.
            </p>
          </div>
        </motion.div>

        {/* ── Divider ── */}
        <div className="border-t border-base mb-0" />

        {/* ── Framework Rows ── */}
        <div>
          {frameworks.map((framework, index) => (
            <motion.div
              key={framework.id}
              custom={index}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-80px" }}
              variants={fadeUp}
              className="grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 items-start py-16 border-b border-base"
            >
              {/* ── Left: Text Content ── */}
              <div className="flex flex-col gap-8">

                {/* Number + Title */}
                <div className="flex items-start gap-5">
                  <span className="text-xs font-mono font-semibold text-[var(--primary)] mt-1.5 shrink-0">
                    {framework.number}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-fg leading-snug">
                    {framework.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base text-muted leading-relaxed pl-9">
                  {framework.description}
                </p>

                {/* Meta Details */}
                <div className="pl-9 space-y-5">
                  {/* Latest Release */}
                  <div className="flex flex-col gap-1">
                    <p className="text-xs font-medium text-muted uppercase tracking-wider">Latest Release</p>
                    <p className="text-xl font-bold text-fg">{framework.latestRelease}</p>
                    <p className="text-sm text-muted">{framework.latestFramework}</p>
                  </div>

                  {/* Audience chips */}
                  <div>
                    <p className="text-xs font-medium text-muted uppercase tracking-wider mb-3">Audience</p>
                    <ul className="flex flex-wrap gap-2">
                      {framework.audience.map((item, i) => (
                        <li key={i} className="px-3 py-1 rounded-full bg-surface-alt border border-base text-xs font-medium text-fg">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tag chips */}
                  <div>
                    <p className="text-xs font-medium text-muted uppercase tracking-wider mb-3">Topics</p>
                    <ul className="flex flex-wrap gap-1.5">
                      {framework.tags.map((item, i) => (
                        <li key={i} className="px-2.5 py-1 rounded-md bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-medium">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Framework-specific description */}
                  {framework.frameworkDescription && (
                    <p className="text-sm text-muted leading-relaxed italic">
                      {framework.frameworkDescription}
                    </p>
                  )}
                </div>
              </div>

              {/* ── Right: Cover Image + Action Bar ── */}
              <div className="flex flex-col gap-4 order-1 lg:order-2">
                {/* Cover Image */}
                <div className="rounded-2xl overflow-hidden border border-base shadow-md bg-surface">
                  <div className="relative w-full h-[400px]">
                    <Image
                      src={framework.coverImage}
                      alt={framework.latestFramework}
                      fill
                      className="object-contain bg-surface/50 p-2"
                    />
                  </div>
                </div>

                {/* Action Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-4 py-3 rounded-xl bg-surface-alt border border-base">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Eye className="h-3.5 w-3.5" />
                      <span 
                        className="font-medium"
                        title={`${viewCounts[framework.frameworkId]?.views || 0} views`}
                      >
                        {formatCompact(viewCounts[framework.frameworkId]?.views || 0)} Views
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted">
                      <Download className="h-3.5 w-3.5" />
                      <span 
                        className="font-medium"
                        title={`${viewCounts[framework.frameworkId]?.downloads || 0} downloads`}
                      >
                        {formatCompact(viewCounts[framework.frameworkId]?.downloads || 0)} Downloads
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleDownload(framework.frameworkId, framework.downloadUrl)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-[var(--primary)] text-black text-xs font-semibold rounded-lg hover:bg-[var(--primary)]/85 active:scale-[0.97] transition-all w-full sm:w-auto"
                  >
                    Download Framework
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
