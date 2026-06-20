"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Menu, X, ArrowUpRight, Mail } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import { AboutModal } from "./about-modal"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Home", href: "#home" },
  { name: "What We Do", href: "#services" },
  { name: "About", href: "#", action: "about" },
  { name: "Contact", href: "#contact" },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()
  const isHome = pathname === "/"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [pillStyle, setPillStyle] = useState<{ left: number; width: number; top: number; height: number } | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | HTMLButtonElement | null>>([])

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

  useEffect(() => {
    if (!mobileMenuOpen) {
      document.body.style.overflow = ""
      return
    }

    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = ""
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [mobileMenuOpen])

  const contactIndex = navigation.findIndex((n) => n.name === "Contact")
  const isContactActive = activeIndex === contactIndex

  const handleGoHome = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    if (!isHome) {
      router.push("/#home")
      return
    }
    setActiveIndex(0)
    window.history.replaceState(null, "", "#home")
    window.scrollTo({ top: 0, behavior: "smooth" })
    setTimeout(() => positionPill(0), 50)
  }

  const navHref = (href: string) => (isHome ? href : "/" + href)

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 bg-page/80 backdrop-blur-lg border-b border-base">
        <nav className="flex items-center justify-between p-6 lg:px-8 max-w-7xl mx-auto" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="#home" className="-m-1.5 p-1.5" onClick={handleGoHome}>
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
            {navigation.map((item, idx) => {
              if (item.action === "about") {
                return (
                  <button
                    key={item.name}
                    ref={(el) => { linkRefs.current[idx] = el }}
                    onClick={(e) => {
                      e.preventDefault()
                      setAboutModalOpen(true)
                      if (isHome) {
                        setActiveIndex(idx)
                        setTimeout(() => positionPill(idx), 50)
                      }
                    }}
                    className={item.name === 'Contact' ? 'btn-contact focus-ring' : 'text-sm font-semibold leading-6 text-fg nav-link-hover whitespace-nowrap'}
                  >
                    {item.name}
                  </button>
                )
              }
              return (
                <a
                  key={item.name}
                  href={navHref(item.href)}
                  ref={(el) => { linkRefs.current[idx] = el }}
                  onClick={() => {
                    if (isHome) {
                      setActiveIndex(idx)
                      setTimeout(() => positionPill(idx), 50)
                    }
                  }}
                  className={item.name === 'Contact' ? 'btn-contact focus-ring' : 'text-sm font-semibold leading-6 text-fg nav-link-hover whitespace-nowrap'}
                >
                  {item.name}
                  {item.name === 'Contact' ? <span className="shimmer-overlay" aria-hidden="true" /> : null}
                </a>
              )
            })}
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
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile menu"
            className="fixed inset-y-0 right-0 z-[70] w-full overflow-y-auto border-l border-base bg-page/95 px-6 py-6 shadow-2xl backdrop-blur-xl sm:max-w-sm lg:hidden"
          >
            <div className="flex items-center justify-between mb-2">
              <Link
                href="#home"
                className="-m-1.5 p-1.5"
                onClick={(event) => {
                  handleGoHome(event)
                  setMobileMenuOpen(false)
                }}
              >
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

            <p className="mt-6 text-xs uppercase tracking-[0.2em] text-fg font-semibold">Menu</p>
            <div className="mt-4 space-y-3">
              {navigation.map((item, idx) => {
                if (item.action === "about") {
                  return (
                    <button
                      key={item.name}
                      onClick={(e) => {
                        e.preventDefault()
                        setAboutModalOpen(true)
                        setMobileMenuOpen(false)
                      }}
                      className={cn(
                        "group flex w-full items-center justify-between rounded-xl border px-4 py-3 text-base font-semibold transition-all duration-200 text-left",
                        "border-base bg-surface text-fg hover:bg-surface-alt"
                      )}
                    >
                      <span className="inline-flex items-center gap-3">
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full text-xs bg-surface-alt">
                          {idx + 1}
                        </span>
                        {item.name}
                      </span>
                      <ArrowUpRight className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
                    </button>
                  )
                }

                return (
                  <a
                    key={item.name}
                    href={navHref(item.href)}
                    className={cn(
                      "group flex items-center justify-between rounded-xl border px-4 py-3 text-base font-semibold transition-all duration-200",
                      item.name === "Contact"
                        ? "border-transparent bg-[var(--primary)] text-black shadow-md"
                        : "border-base bg-surface text-fg hover:bg-surface-alt"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="inline-flex items-center gap-3">
                      <span className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-full text-xs",
                        item.name === "Contact" ? "bg-black/15" : "bg-surface-alt"
                      )}>
                        {idx + 1}
                      </span>
                      {item.name}
                    </span>
                    <ArrowUpRight className="h-4 w-4 opacity-60 transition-opacity group-hover:opacity-100" />
                  </a>
                )
              })}
            </div>

            <div className="mt-8 rounded-xl border border-base bg-surface p-4">
              <p className="text-xs uppercase tracking-[0.18em] text-muted">Quick Contact</p>
              <a
                href="mailto:zidesigns001@gmail.com"
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-base px-4 py-2.5 text-sm font-semibold text-fg transition-colors hover:bg-surface-alt"
              >
                <Mail className="h-4 w-4" />
                Email Us
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-base">
              <ThemeToggle />
            </div>
          </div>
        </>
      )}

      {/* Render the About modal outside the mobile menu so it overlaps everything */}
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
    </>
  )
}
