"use client"

import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

export default function LearnToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [show, setShow] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    const joined = searchParams.get("joined")
    const updated = searchParams.get("updated")
    if (joined || updated) {
      setMessage(updated ? "Your GMF Waitlist details are updated!" : "You're on the GMF waitlist - we'll email you when the course launches.")
      setShow(true)

      const clean = pathname || "/learn"
      try {
        router.replace(clean)
      } catch (err) {
        console.error("Failed to replace URL after showing toast", err)
      }

      const t = setTimeout(() => setShow(false), 4500)
      return () => clearTimeout(t)
    }
  }, [searchParams, router, pathname])

  return (
    <AnimatePresence>
      {show && (
        // Same container rhythm as the rest of the page — max-w-7xl + px-6 lg:px-8
        // ensures mobile edges line up with content, and desktop width matches sections.
        <div className="mx-auto mt-4 sm:-mt-10 max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
          >
            <div className="w-full rounded-lg bg-[var(--primary)] text-black px-4 py-3 shadow-lg">
              <div className="flex items-start justify-between gap-3">
                <div className="text-sm">{message}</div>
                <button onClick={() => setShow(false)} aria-label="Close toast" className="text-sm opacity-80">✕</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
