"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"

export function PackageBonusBanner() {
  const [isRedeemed, setIsRedeemed] = useState(false)

  useEffect(() => {
    // Check if offer has been redeemed
    const redeemed = localStorage.getItem("promo-redeemed")
    setIsRedeemed(redeemed === "true")
  }, [])

  // Don't show if already redeemed
  if (isRedeemed) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="mb-4 sm:mb-6"
    >
      <div className="block rounded-xl sm:rounded-2xl border-2 border-[var(--primary)]/40 bg-gradient-to-br from-[var(--primary)]/10 to-[var(--primary)]/5 p-4 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
            <span className="text-2xl">🎁</span>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-base sm:text-lg font-bold text-fg mb-1">Complete Your Request & Claim Your Free Poster</h3>
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              Submit your service request and get your first poster/flyer free as a first-time client.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
