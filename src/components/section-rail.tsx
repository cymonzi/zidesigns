"use client"

import { useEffect, useState } from "react"

export interface RailSection {
  id: string
  label: string
}

const DEFAULT_HOME_SECTIONS: RailSection[] = [
  { id: "home", label: "00 // TOP" },
  { id: "service-graphic-design", label: "01 // DESIGN" },
  { id: "service-website", label: "02 // WEB" },
  { id: "service-smart-tools", label: "03 // SAAS & AI" },
  { id: "service-mobile-app", label: "04 // MOBILE" },
  { id: "cymonzi", label: "05 // CYMONZI" },
  { id: "contact", label: "06 // CONTACT" },
]

interface SectionRailProps {
  sections?: RailSection[]
}

/** Fixed right-edge telemetry scroll indicator adapted from cymonzi_site. */
export function SectionRail({ sections = DEFAULT_HOME_SECTIONS }: SectionRailProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "home")

  useEffect(() => {
    const elements = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0, 0.2, 0.5, 0.75],
      }
    )

    elements.forEach((el) => observer.observe(el))

    const handleScrollBounds = () => {
      if (window.scrollY < 80) {
        setActiveId(sections[0].id)
      } else if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 40
      ) {
        setActiveId(sections[sections.length - 1].id)
      }
    }

    window.addEventListener("scroll", handleScrollBounds, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScrollBounds)
    }
  }, [sections])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <nav
      aria-label="Section progress"
      className="fixed right-3 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-2.5 md:flex lg:right-5"
    >
      {sections.map((section) => {
        const isActive = section.id === activeId
        return (
          <button
            key={section.id}
            type="button"
            onClick={() => scrollTo(section.id)}
            aria-label={`Jump to ${section.label}`}
            aria-current={isActive ? "location" : undefined}
            className="group flex cursor-pointer items-center gap-2.5 py-1 focus:outline-none"
          >
            <span
              className={`pointer-events-none font-mono text-[9px] uppercase tracking-[0.12em] transition-all duration-300 ${
                isActive
                  ? "translate-x-0 text-[var(--primary)] opacity-100"
                  : "translate-x-1 text-muted opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
              }`}
            >
              {section.label}
            </span>
            <span
              className={`block h-[2px] rounded-full transition-all duration-300 ${
                isActive
                  ? "w-7 bg-[var(--primary)] shadow-[0_0_8px_rgba(64,224,208,0.65)]"
                  : "w-3 bg-muted/40 group-hover:w-5 group-hover:bg-fg"
              }`}
            />
          </button>
        )
      })}
    </nav>
  )
}
