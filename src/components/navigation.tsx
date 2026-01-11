"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "#" },
  { name: "Build", href: "#what-we-build" },
  { name: "Learn", href: "#design-lessons" },
  { name: "Work", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; top: number; height: number } | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])

  const positionPill = (index: number) => {
    const container = containerRef.current
    const el = linkRefs.current[index]
    if (!container || !el) return
    const cRect = container.getBoundingClientRect()
    const eRect = el.getBoundingClientRect()
    const PILL_HEIGHT = 36 // constant pill height (matches CSS)
    // choose a pill width based on link width but clamp to avoid overlap with neighbors
    const minW = 88
    const maxW = 180
    const padding = 24 // extra horizontal padding inside the pill
    const computedWidth = Math.min(maxW, Math.max(minW, Math.round(eRect.width + padding)))
    // center pill under the target link
    const left = eRect.left - cRect.left + (eRect.width - computedWidth) / 2
    // vertically center inside container
    const top = Math.max(0, (cRect.height - PILL_HEIGHT) / 2)
    setPillStyle({ left, width: computedWidth, top, height: PILL_HEIGHT })
  }

  useEffect(() => {
    // Position on mount and when activeIndex changes
    positionPill(activeIndex)
    const onResize = () => positionPill(activeIndex)
    window.addEventListener("resize", onResize)
    return () => window.removeEventListener("resize", onResize)
  }, [activeIndex])

  const contactIndex = navigation.findIndex((n) => n.name === "Contact")
  const isContactActive = activeIndex === contactIndex

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-page/80 backdrop-blur-lg border-b border-base">
        <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="#" className="-m-1.5 p-1.5">
            <span className="font-stencil text-2xl text-gradient">ZI DESIGNS</span>
          </Link>
        </div>
        
        <div className="flex lg:hidden gap-3 items-center">
          <ThemeToggle />
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-lg p-2.5 text-fg hover:bg-surface-alt transition-colors duration-200"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-8">
          <div ref={containerRef} className="nav-pill-wrap flex lg:gap-x-6">
            <div
              className={`nav-pill-indicator ${pillStyle ? 'active' : ''}`}
              style={
                pillStyle
                  ? { transform: `translateX(${pillStyle.left}px)`, width: `${pillStyle.width}px`, top: `${pillStyle.top}px`, height: `${pillStyle.height}px`, opacity: isContactActive ? 0 : 1 }
                  : { width: 0 }
              }
              aria-hidden="true"
            />
            {navigation.map((item, idx) => (
              <Link key={item.name} href={item.href} legacyBehavior>
                <a
                  ref={(el) => { linkRefs.current[idx] = el }}
                  onClick={() => {
                    setActiveIndex(idx)
                    // In case the link navigates to an anchor on the same page, keep pill
                    setTimeout(() => positionPill(idx), 50)
                  }}
                  className={item.name === 'Contact' ? 'btn-contact focus-ring' : 'text-sm font-semibold leading-6 text-fg nav-link-hover'}
                >
                  {item.name}
                  {item.name === 'Contact' ? <span className="shimmer-overlay" aria-hidden="true" /> : null}
                </a>
              </Link>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </nav>
      </header>

      {/* Mobile menu - outside header to avoid nav constraints */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 z-[70] w-full overflow-y-auto bg-page px-6 py-6 sm:max-w-sm border-l border-base shadow-2xl lg:hidden">
            <div className="flex items-center justify-between mb-2">
              <Link href="#" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="font-stencil text-xl text-gradient">ZI DESIGNS</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-lg p-2.5 text-fg hover:bg-surface-alt transition-colors duration-200"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-3 py-8">
                  {navigation.map((item) => (
                    item.name === 'Contact' ? (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block rounded-lg bg-[var(--primary)] px-4 py-3 text-center text-base font-semibold text-black shadow-md transition-all duration-300 hover:shadow-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    ) : (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-mx-3 block rounded-lg px-4 py-3 text-base font-semibold text-fg hover:bg-surface-alt transition-colors duration-200 text-center"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </a>
                    )
                  ))}
                </div>
                <div className="py-6">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
