"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { X, Gift, ArrowRight } from "lucide-react"

export function PromoStrip() {
  const [isDismissed, setIsDismissed] = useState(false)
  const [isRedeemed, setIsRedeemed] = useState(false)
  const pathname = usePathname()

  // Hide promo strip on package pages only
  const isPackagePage = pathname?.includes('-packages')
  const isStartProjectPage = pathname === '/start-project'

  useEffect(() => {
    // Check localStorage on mount
    const dismissed = localStorage.getItem("promo-strip-dismissed")
    const redeemed = localStorage.getItem("promo-redeemed")
    setIsDismissed(dismissed === "true")
    setIsRedeemed(redeemed === "true")

    // Listen for changes from other tabs (e.g. form submitted in another tab)
    const onStorage = (e: StorageEvent) => {
      if (e.key === "promo-redeemed" && e.newValue === "true") setIsRedeemed(true)
      if (e.key === "promo-strip-dismissed" && e.newValue === "true") setIsDismissed(true)
    }
    window.addEventListener("storage", onStorage)
    return () => window.removeEventListener("storage", onStorage)
  }, [])

  const handleDismiss = () => {
    setIsDismissed(true)
    localStorage.setItem("promo-strip-dismissed", "true")
  }

  // Don't show if dismissed, redeemed, or on package pages
  if (isDismissed || isRedeemed || isPackagePage) return null

  return (
    <div className="fixed top-[var(--nav-height)] left-0 right-0 z-40 bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 dark:from-[#0f172a] dark:via-[#1e293b] dark:to-[#0f172a] border-b border-[#40e0d0]/30 dark:border-b-[#40e0d0]/20 backdrop-blur-sm relative overflow-hidden">
      {/* Animated line running along the top border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
        <div className="h-full w-1/4 bg-[#40e0d0] shadow-[0_0_10px_#40e0d0] animate-[moveLine_4s_linear_infinite]" />
      </div>
      
      {/* Animated line running along the bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] overflow-hidden">
        <div className="h-full w-1/4 bg-[#40e0d0] shadow-[0_0_10px_#40e0d0] animate-[moveLineReverse_4s_linear_infinite]" />
      </div>
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-2 sm:py-2.5 md:py-3 relative z-10">
        <div className="flex items-center justify-between gap-2 sm:gap-3 md:gap-4">
          {/* Left side - Message */}
          <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
            <Gift className="h-4 w-4 sm:h-5 sm:w-5 text-[#40e0d0] flex-shrink-0" />
            <p className="text-xs sm:text-sm md:text-base font-medium text-slate-800 dark:text-slate-100 leading-tight sm:leading-normal">
              <span className="hidden sm:inline">First-time clients get a FREE poster/flyer with any service.</span>
              <span className="sm:hidden">First-timers: FREE poster with service</span>
            </p>
          </div>

          {/* Right side - CTA Button and Close */}
          <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
            {isStartProjectPage ? (
              <button
                disabled
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-300 dark:bg-slate-700 px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 cursor-not-allowed whitespace-nowrap opacity-60"
              >
                Claimed <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            ) : (
              <Link
                href="/start-project?bonus=true"
                onClick={() => localStorage.setItem("promo-claimed", "true")}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#40e0d0] px-2.5 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-[#063c36] transition-all duration-200 hover:bg-[#35c9ba] hover:shadow-lg hover:shadow-[#40e0d0]/20 hover:scale-105 whitespace-nowrap"
              >
                Claim <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4" />
              </Link>
            )}
            
            {/* Close button */}
            <button
              onClick={handleDismiss}
              className="p-0.5 sm:p-1 rounded hover:bg-slate-300/50 dark:hover:bg-white/5 transition-colors duration-200 flex-shrink-0"
              aria-label="Dismiss offer"
            >
              <X className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced gradient overlay with glow effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#40e0d0]/8 via-[#40e0d0]/12 to-[#40e0d0]/8 dark:from-[#40e0d0]/5 dark:via-[#40e0d0]/8 dark:to-[#40e0d0]/5 pointer-events-none" />
    </div>
  )
}
