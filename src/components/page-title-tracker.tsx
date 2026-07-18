"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

const BASE_TITLE = "Zi Designs"

const sectionMap: Array<{ id: string; label: string }> = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "service-website", label: "Website" },
  { id: "service-mobile-app", label: "Mobile App" },
  { id: "service-graphic-design", label: "Graphic Design" },
  { id: "service-video-editing", label: "Video" },
  { id: "contact", label: "Contact" },
]

const pageTitles: Record<string, string> = {
  "/start-project": "Start Project",
  "/insights": "Insights",
}

function setTitle(label: string) {
  document.title = `${BASE_TITLE} - ${label}`
}

export function PageTitleTracker() {
  const pathname = usePathname()

  useEffect(() => {
    // Check if current pathname has a specific title
    if (pageTitles[pathname]) {
      setTitle(pageTitles[pathname])
      return
    }

    const activeByHash = () => {
      const hash = window.location.hash.replace("#", "")
      const found = sectionMap.find((s) => s.id === hash)
      if (found) {
        setTitle(found.label)
        return true
      }
      return false
    }

    const onScroll = () => {
      const viewportMid = window.innerHeight * 0.35
      let current = sectionMap[0]

      for (const section of sectionMap) {
        const el = document.getElementById(section.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= viewportMid) {
          current = section
        }
      }

      setTitle(current.label)
    }

    const onHashChange = () => {
      if (!activeByHash()) {
        onScroll()
      }
    }

    const initializedFromHash = activeByHash()
    if (!initializedFromHash) {
      onScroll()
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("hashchange", onHashChange)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("hashchange", onHashChange)
    }
  }, [pathname])

  return null
}
