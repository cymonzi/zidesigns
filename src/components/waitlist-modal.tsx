"use client"

import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

interface WaitlistModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function WaitlistModal({ isOpen, onClose }: WaitlistModalProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  const [mode, setMode] = useState<"loading" | "view" | "edit" | "new">("loading")
  const [waitlistName, setWaitlistName] = useState("")
  const [waitlistEmail, setWaitlistEmail] = useState("")
  const [waitlistSubmitting, setWaitlistSubmitting] = useState(false)
  const [waitlistError, setWaitlistError] = useState<string | null>(null)

  const storageKey = "gmf_waitlist"

  const trimmedEmail = waitlistEmail.trim()
  const emailValid = /^\S+@\S+\.\S+$/.test(trimmedEmail)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Load localStorage when modal opens to decide view vs edit
  useEffect(() => {
    let mountedFlag = true
    if (!isOpen) return
    setMode("loading")
    // small delay to allow a skeleton to show and avoid flash
    setTimeout(() => {
      if (!mountedFlag) return
      try {
        const raw = localStorage.getItem(storageKey)
        if (raw) {
          const obj = JSON.parse(raw)
          setWaitlistName(obj.name || "")
          setWaitlistEmail(obj.email || "")
          setMode("view")
        } else {
          setWaitlistName("")
          setWaitlistEmail("")
          setMode("new")
        }
      } catch (err) {
        console.error("Error reading waitlist from localStorage", err)
        setMode("new")
      }
    }, 120)
    return () => {
      mountedFlag = false
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden"
    else document.body.style.overflow = "unset"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const saveLocal = (name: string, email: string) => {
    try {
      const entry = { name, email, submittedAt: new Date().toISOString() }
      localStorage.setItem(storageKey, JSON.stringify(entry))
    } catch (err) {
      console.error("Failed to persist waitlist locally", err)
    }
  }

  const handleWaitlistSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const email = waitlistEmail.trim()
    setWaitlistEmail(email)

    if (!emailValid) {
      setWaitlistError("Please enter a valid email address.")
      return
    }

    setWaitlistSubmitting(true)
    setWaitlistError(null)

    try {
      const response = await fetch("https://formspree.io/f/xqevebow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: waitlistName,
          email,
          _replyto: email,
          _cc: "cymonmusinguzi@gmail.com,zidesigns001@gmail.com",
          _subject: `GMF Waitlist Signup - ${waitlistName || "No name"}`,
        }),
      })

      if (!response.ok) {
        const text = await response.text()
        throw new Error(`Submission failed: ${response.status} ${text}`)
      }

      // EmailJS — notify the inbox via secure server proxy
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_1ral4jg",
          template_id: "template_8bvs34k",
          user_id: "9CSL_X0NzWLZWuDOw",
          template_params: {
            name: waitlistName || "—",
            email,
            submitted_at: new Date().toLocaleString(),
            logo_url: "https://zidesigns.vercel.app/favicon/android-chrome-512x512.png",
          },
        }),
      })

      if (!emailRes.ok) {
        console.warn("EmailJS notification failed:", await emailRes.text())
      }

      // persist locally
      saveLocal(waitlistName, email)

      // close modal and navigate back to Insights with a joined flag
      onClose()
      try {
        const joinedParam = mode === "edit" || mode === "view" ? "updated=1" : "joined=1"
        router.push(`/insights?${joinedParam}`)
      } catch (err) {
        console.error("Navigation after submit failed:", err)
      }
    } catch (error: any) {
      console.error("Waitlist signup error:", error)
      setWaitlistError("Could not submit your sign-up. Please try again.")
    } finally {
      setWaitlistSubmitting(false)
    }
  }

  if (!mounted) return null

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6" aria-modal="true" role="dialog">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/98 backdrop-blur-3xl"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="relative w-full max-w-4xl overflow-hidden rounded-2xl bg-background border border-base shadow-2xl z-10 flex flex-col max-h-[90vh]"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-20 rounded-full p-2 bg-background/40 backdrop-blur-md border border-base hover:bg-surface text-muted-foreground hover:text-foreground transition-colors shadow-sm"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6 md:p-10 overflow-y-auto w-full max-h-[90vh]">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--primary)]">Join the Waitlist</p>
              <h2 className="mt-3 text-2xl font-bold text-fg">Be first to access the GMF launch.</h2>

              {mode === "loading" ? (
                <div className="mt-8 space-y-4">
                  <div className="h-6 w-2/5 bg-surface/50 rounded-md animate-pulse" />
                  <div className="h-10 bg-surface/50 rounded-md animate-pulse" />
                  <div className="h-10 bg-surface/50 rounded-md animate-pulse" />
                </div>
              ) : mode === "view" ? (
                <div className="mt-8 space-y-6">
                  <div className="text-sm text-muted">You joined the GMF waitlist with the details below.</div>
                  <div className="rounded-xl bg-surface px-4 py-3">
                    <div className="text-sm text-fg font-medium">{waitlistName || "—"}</div>
                    <div className="text-sm text-muted">{waitlistEmail || "—"}</div>
                  </div>
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <button
                      type="button"
                      onClick={() => setMode("edit")}
                      className="inline-flex items-center justify-center rounded-full border border-base px-4 py-2 text-sm font-semibold text-fg hover:bg-surface"
                    >
                      Edit Details
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setWaitlistName("")
                        setWaitlistEmail("")
                        setWaitlistError(null)
                        setMode("new")
                      }}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-4 py-2 text-sm font-semibold text-black hover:bg-[var(--primary)]/90"
                    >
                      Add new person
                    </button>
                  </div>
                </div>
              ) : (
                <form className="mt-8 space-y-5" onSubmit={handleWaitlistSubmit} aria-live="polite">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <label className="space-y-2 text-sm text-fg">
                      <span>Name</span>
                      <input
                        type="text"
                        value={waitlistName}
                        onChange={(event) => setWaitlistName(event.target.value)}
                        placeholder="Your name"
                        className="w-full rounded-2xl border border-base bg-surface px-4 py-3 text-sm text-fg outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                        disabled={waitlistSubmitting}
                      />
                    </label>
                    <label className="space-y-2 text-sm text-fg">
                      <span>Email address</span>
                      <input
                        type="email"
                        value={waitlistEmail}
                        onChange={(event) => setWaitlistEmail(event.target.value)}
                        placeholder="name@example.com"
                        className="w-full rounded-2xl border border-base bg-surface px-4 py-3 text-sm text-fg outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                        disabled={waitlistSubmitting}
                      />
                    </label>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm text-muted">Sign up now and we&apos;ll notify you when the full course is ready.</div>
                    <button
                      type="submit"
                      disabled={!emailValid || waitlistSubmitting}
                      className="inline-flex items-center justify-center rounded-full bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[var(--primary)]/90 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {waitlistSubmitting ? "Joining..." : mode === "edit" ? "Update" : "Submit"}
                    </button>
                  </div>

                  {waitlistError && (
                    <p className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-500">{waitlistError}</p>
                  )}
                </form>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  )
}
