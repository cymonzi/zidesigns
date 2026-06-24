"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"

type Phase = 1 | 2 | 3 | 4

const CATEGORIES = ["Design", "Branding", "Development", "AI & Automation", "Strategy & Consulting"]

const SERVICES: Record<string, string[]> = {
  Design: ["Posters & Flyers", "CV Design", "Presentations", "Company Profiles", "Certificates"],
  Branding: ["Starter Logo", "Basic Logo", "Standard Logo", "Professional Logo", "Brand Identity Package"],
  Development: ["Starter Website", "Business Website", "E-Commerce Website", "Web Application", "Mobile Application"],
  "AI & Automation": ["AI Chatbots", "Workflow Automation", "AI Content Tools", "Custom AI Integrations", "Data & Analytics"],
  "Strategy & Consulting": ["Product Discovery", "Digital Strategy", "Technical Consultation"],
}

const STARTING_PRICES: Record<string, string> = {
  "Posters & Flyers": "UGX 20,000+",
  "Certificates": "UGX 20,000+",
  "CV Design": "UGX 50,000+",
  "Presentations": "UGX 100,000+",
  "Company Profiles": "UGX 100,000+",
  "Starter Logo": "UGX 30,000+",
  "Basic Logo": "UGX 50,000+",
  "Standard Logo": "UGX 100,000+",
  "Professional Logo": "UGX 200,000+",
  "Brand Identity Package": "UGX 500,000+",
  "Starter Website": "UGX 750,000+",
  "Business Website": "UGX 1,500,000+",
  "E-Commerce Website": "UGX 3,000,000+",
  "Web Application": "UGX 3,000,000+",
  "Mobile Application": "UGX 5,000,000+",
  "AI Chatbots": "From UGX 1,500,000",
  "Workflow Automation": "From UGX 2,000,000",
  "AI Content Tools": "From UGX 1,500,000",
  "Custom AI Integrations": "From UGX 3,000,000+",
  "Data & Analytics": "From UGX 1,500,000",
}

const BUDGETS: Record<string, string[]> = {
  Design: ["UGX 20,000–50,000", "UGX 50,000–100,000", "UGX 100,000–250,000", "UGX 250,000+"],
  Branding: ["UGX 20,000–50,000", "UGX 50,000–100,000", "UGX 100,000–250,000", "UGX 250,000+"],
  Development: ["UGX 500,000–1,000,000", "UGX 1,000,000–2,000,000", "UGX 2,000,000–5,000,000", "UGX 5,000,000+"],
  "AI & Automation": ["UGX 3,000,000–5,000,000", "UGX 5,000,000–10,000,000", "UGX 10,000,000+"],
  "Strategy & Consulting": ["UGX 500,000–1,500,000", "UGX 1,500,000–3,000,000", "UGX 3,000,000+"],
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-surface border border-base p-4">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-semibold text-fg text-right">{value}</span>
    </div>
  )
}

export function StartProjectForm() {
  const [phase, setPhase] = useState<Phase>(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedService, setSelectedService] = useState<string | null>(null)

  const [currency, setCurrency] = useState<"UGX" | "USD">("UGX")
  const approxRate = 3800 // example static approximate rate UGX per USD

  const [budget, setBudget] = useState<string | null>(null)
  const [timeline, setTimeline] = useState<string | null>(null)
  const [goal, setGoal] = useState("")
  const [details, setDetails] = useState("")

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [preferredContact, setPreferredContact] = useState<string | null>("WhatsApp")
  const [nameTouched, setNameTouched] = useState(false)
  const [phoneTouched, setPhoneTouched] = useState(false)
  const [emailTouched, setEmailTouched] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const servicesForCategory = useMemo(() => (selectedCategory ? SERVICES[selectedCategory] ?? [] : []), [selectedCategory])

  const startingPrice = selectedService ? STARTING_PRICES[selectedService] ?? "Custom — contact for scope" : null

  const budgetsForCategory = selectedCategory ? BUDGETS[selectedCategory] ?? [] : []

  const isPhase1Valid = !!selectedService
  const isPhase2Valid = !!budget && !!timeline && goal.trim().length > 0

  const validateName = (v: string) => v.trim().length >= 2
  const validatePhone = (v: string) => {
    const digits = v.replace(/\D/g, "")
    return digits.length >= 7 && digits.length <= 15
  }
  const validateEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v)

  const nameValid = validateName(name)
  const phoneValid = validatePhone(phone)
  const emailValid = validateEmail(email)

  const isPhase3Valid = nameValid && phoneValid && emailValid

  const submit = async () => {
    setSubmitError(null)
    if (!isPhase3Valid) {
      setNameTouched(true)
      setPhoneTouched(true)
      setEmailTouched(true)
      return
    }

    setSubmitting(true)
    try {
      const payload = {
        category: selectedCategory ?? "",
        service: selectedService ?? "",
        startingPrice: startingPrice ?? "",
        budget: budget ?? "",
        timeline: timeline ?? "",
        goal,
        details,
        name,
        phone,
        email,
        company,
        preferredContact,
        _cc: "cymonmusinguzi@gmail.com,zidesigns001@gmail.com",
        _replyto: email,
        _subject: `New project request - ${name || "(no name)"}`,
      }

      const res = await fetch("https://formspree.io/f/xqevebow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const text = await res.text()
        throw new Error(`Submission failed: ${res.status} ${text}`)
      }

      // EmailJS — notify both inboxes
      const emailRes = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_1ral4jg",
          template_id: "template_p7lg0nz",
          user_id: "9CSL_X0NzWLZWuDOw",
          template_params: {
            client_name: name,
            client_email: email,
            client_phone: phone,
            company: company || "—",
            preferred_contact: preferredContact ?? "—",
            category: selectedCategory ?? "—",
            service: selectedService ?? "—",
            budget: budget ?? "—",
            timeline: timeline ?? "—",
            goal: goal || "—",
            details: details || "—",
            logo_url: "https://zidesigns.vercel.app/favicon/android-chrome-512x512.png",
          },
        }),
      })

      const emailResText = await emailRes.text()
      console.log("EmailJS response:", emailRes.status, emailResText)

      setPhase(4)
    } catch (err: any) {
      console.error("Form submission error:", err)
      setSubmitError(err?.message || "Submission failed. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const buildSummaryText = () => {
    const lines: string[] = []
    lines.push('ZI DESIGNS - Project Request')
    lines.push('------------------------------')
    lines.push(`Category: ${selectedCategory ?? '—'}`)
    lines.push(`Service: ${selectedService ?? '—'}`)
    lines.push(`Starting price: ${startingPrice ?? '—'}`)
    lines.push(`Budget: ${budget ?? '—'}`)
    lines.push(`Timeline: ${timeline ?? '—'}`)
    lines.push('')
    lines.push('Project details:')
    lines.push(details || '—')
    lines.push('')
    lines.push('Contact')
    lines.push(`Name: ${name || '—'}`)
    lines.push(`Phone: ${phone || '—'}`)
    lines.push(`Email: ${email || '—'}`)
    lines.push(`Company: ${company || '—'}`)
    lines.push(`Preferred contact: ${preferredContact || '—'}`)
    lines.push('')
    lines.push('Thank you for requesting a project. We will contact you within 24 hours.')
    return lines.join('\n')
  }

  const downloadSummary = async () => {
    const doc = new jsPDF()
    const primary: [number, number, number] = [29, 178, 152]

    doc.setFillColor(primary[0], primary[1], primary[2])
    doc.rect(0, 0, 210, 28, "F")

    // Load and add logo
    try {
      const response = await fetch("/favicon/android-chrome-512x512.png")
      const blob = await response.blob()
      const dataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader()
        reader.onload = () => resolve(reader.result as string)
        reader.readAsDataURL(blob)
      })
      doc.addImage(dataUrl, "PNG", 14, 6, 16, 16)
    } catch (error) {
      console.error("Failed to load logo:", error)
    }

    doc.setTextColor(255, 255, 255)
    doc.setFontSize(20)
    doc.setFont("helvetica", "bold")
    doc.text("ZI DESIGNS", 33, 18)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.text("zidesigns.vercel.app", 150, 18, { align: "right" })

    doc.setTextColor(30, 30, 30)
    doc.setFontSize(16)
    doc.setFont("helvetica", "bold")
    doc.text("Project Request Summary", 14, 44)

    doc.setFontSize(9)
    doc.setFont("helvetica", "normal")
    doc.setTextColor(120, 120, 120)
    doc.text(`Generated: ${new Date().toLocaleDateString("en-UG", { dateStyle: "long" })}`, 14, 52)

    autoTable(doc, {
      startY: 60,
      head: [["Field", "Details"]],
      body: [
        ["Category", selectedCategory ?? "—"],
        ["Service", selectedService ?? "—"],
        ["Starting Price", startingPrice ?? "—"],
        ["Budget", budget ?? "—"],
        ["Timeline", timeline ?? "—"],
        ["Primary Goal", goal || "—"],
        ["Additional Details", details || "—"],
      ],
      headStyles: { fillColor: primary, textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [245, 253, 251] },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
      styles: { fontSize: 10, cellPadding: 4 },
    })

    const afterFirst = (doc as any).lastAutoTable.finalY + 10

    doc.setFontSize(12)
    doc.setFont("helvetica", "bold")
    doc.setTextColor(30, 30, 30)
    doc.text("Contact Information", 14, afterFirst)

    autoTable(doc, {
      startY: afterFirst + 6,
      body: [
        ["Full Name", name || "—"],
        ["Phone", phone || "—"],
        ["Email", email || "—"],
        ["Company", company || "—"],
        ["Preferred Contact", preferredContact || "—"],
      ],
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
      styles: { fontSize: 10, cellPadding: 4 },
      alternateRowStyles: { fillColor: [245, 253, 251] },
    })

    const pageHeight = doc.internal.pageSize.height
    doc.setFillColor(primary[0], primary[1], primary[2])
    doc.rect(0, pageHeight - 20, 210, 20, "F")
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(8)
    doc.text("zidesigns001@gmail.com  |  +256 782062673  |  @zidesigns01", 14, pageHeight - 8)

    const stamp = new Date().toISOString().slice(0, 10)
    doc.save(`zidesigns-request-${stamp}.pdf`)
  }

  return (
    <>
      <div className="grid gap-6 min-h-[calc(100vh_-_var(--nav-height)_-20rem)]">
        <div className="bg-surface rounded-2xl border border-base shadow-sm p-4 md:p-6 min-h-full">
          <div className="flex flex-col">
            <div className="flex border-b border-base mb-6 -mx-4 md:-mx-6 px-4 md:px-6 overflow-x-auto">
              {[
                { n: 1, label: 'Service' },
                { n: 2, label: 'Details' },
                { n: 3, label: 'Contact' },
                { n: 4, label: 'Confirm' },
              ].map(({ n, label }) => {
                const done = phase > n
                const active = phase === n
                const reachable = n < 4 || (isPhase1Valid && isPhase2Valid && isPhase3Valid)
                let isValid = false
                if (n === 1) isValid = isPhase1Valid
                else if (n === 2) isValid = isPhase2Valid
                else if (n === 3) isValid = isPhase3Valid
                else isValid = phase > n
                return (
                  <button
                    key={n}
                    onClick={() => {
                      if (n < 4) setPhase(n as Phase)
                      else if (reachable) setPhase(n as Phase)
                    }}
                    className={`flex items-center gap-2 px-4 py-3 text-sm border-b-2 transition-colors
                      ${active
                        ? 'border-[var(--primary)] text-fg font-semibold'
                        : isValid
                        ? 'border-transparent text-[var(--primary)] cursor-pointer'
                        : 'border-transparent text-muted cursor-default'
                      } ${!reachable ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {isValid ? (
                      <span className="w-5 h-5 rounded-full bg-[var(--primary)] flex items-center justify-center text-black text-xs">✓</span>
                    ) : (
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs
                        ${active ? 'border-[var(--primary)] text-fg' : 'border-base text-muted'}`}>
                        {n}
                      </span>
                    )}
                    <span className="hidden sm:inline">{label}</span>
                  </button>
                )
              })}
            </div>

            {phase === 1 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-semibold">What do you need?</h3>

                <div className="mt-4">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {CATEGORIES.map((c) => (
                      <button
                        key={c}
                        onClick={() => {
                          setSelectedCategory(c)
                          setSelectedService(null)
                          setBudget(null)
                        }}
                        className={`px-4 py-2 rounded-full border ${selectedCategory === c ? 'bg-[var(--primary)] text-black border-transparent shadow-sm' : 'bg-surface-alt text-fg border-base'}`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>

                  {selectedCategory && (
                    <div className="mt-4">
                      <p className="text-sm text-muted">Choose a service</p>
                      <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
                        {servicesForCategory.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedService(s)}
                            className={`px-3 py-2 rounded-full border ${selectedService === s ? 'bg-[var(--primary)] text-black border-transparent' : 'bg-surface-alt text-fg border-base'}`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      {selectedService && (
                        <div className="mt-4 flex items-center justify-between">
                          <div className="text-sm text-muted">Starting price</div>
                          <div className="font-semibold">{startingPrice}</div>
                        </div>
                      )}

                      <div className="mt-8 pt-4 border-t border-base flex justify-end gap-3">
                        <button
                          disabled={!isPhase1Valid}
                          onClick={() => setPhase(2)}
                          className="px-6 py-2 rounded-lg bg-[var(--primary)] text-black"
                        >
                          Continue →
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </motion.div>
            )}

            {phase === 2 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-semibold">Project context</h3>

                <div className="mt-4 grid sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <div className="text-sm font-semibold">Budget</div>
                    <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
                      {budgetsForCategory.map((b) => (
                        <button
                          key={b}
                          onClick={() => setBudget(b)}
                          className={`px-3 py-2 rounded-full border ${budget === b ? 'bg-[var(--primary)] text-black border-transparent shadow-sm' : 'bg-surface-alt text-fg border-base'}`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm font-semibold">Timeline</div>
                    <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
                      {['As Soon As Possible (1–3 Days)', '1 Week', '2–4 Weeks', '1 Month+', 'Flexible'].map((t) => (
                        <button
                          key={t}
                          onClick={() => setTimeline(t)}
                          className={`px-3 py-2 rounded-full border ${timeline === t ? 'bg-[var(--primary)] text-black border-transparent shadow-sm' : 'bg-surface-alt text-fg border-base'}`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold">Primary goal</div>
                  <input value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Primary goal (e.g., increase sales, launch product)" className="w-full mt-2 rounded-md border px-3 py-2" />
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold">More details (optional)</div>
                  <textarea value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Optional: wider context, audience, constraints..." className="w-full mt-2 rounded-md border px-3 py-2 min-h-[80px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background" />
                </div>

                <div className="mt-8 pt-4 border-t border-base flex justify-end gap-3">
                  <button
                    onClick={() => setPhase((p) => Math.max(1, p - 1) as Phase)}
                    className="px-6 py-2 rounded-lg bg-base/40 text-muted"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={!isPhase2Valid}
                    onClick={() => setPhase(3)}
                    className="px-6 py-2 rounded-lg bg-[var(--primary)] text-black"
                  >
                    Continue →
                  </button>
                </div>
              </motion.div>
            )}

            {phase === 3 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <h3 className="text-lg font-semibold">Your details</h3>

                <div className="mt-4 grid sm:grid-cols-2 gap-3 md:gap-4">
                  <div>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      onBlur={() => setNameTouched(true)}
                      placeholder="Your name (first or preferred)"
                      aria-invalid={!nameValid}
                      className="w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                    {nameTouched && !nameValid && (
                      <p className="text-xs text-red-500 mt-1">Please enter your name (first or preferred name is fine).</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => setPhoneTouched(true)}
                      placeholder="Phone Number (e.g., +2567...)"
                      aria-invalid={!phoneValid}
                      className="w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                    {phoneTouched && !phoneValid && (
                      <p className="text-xs text-red-500 mt-1">Enter a valid phone number (7–15 digits).</p>
                    )}
                  </div>

                  <div>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => setEmailTouched(true)}
                      placeholder="Email Address"
                      aria-invalid={!emailValid}
                      className="w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                    />
                    {emailTouched && !emailValid && (
                      <p className="text-xs text-red-500 mt-1">Please enter a valid email address.</p>
                    )}
                  </div>

                  <div>
                    <input value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Company / Organisation (optional)" className="w-full rounded-md border px-3 py-2 text-sm opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-background" />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-sm font-semibold">Preferred contact method</div>
                  <div className="mt-3 flex flex-wrap gap-2 md:gap-3">
                    {['WhatsApp', 'Email', 'Phone Call'].map((m) => (
                      <button
                        key={m}
                        onClick={() => setPreferredContact(m)}
                        className={`px-3 py-2 rounded-full border ${preferredContact === m ? 'bg-[var(--primary)] text-black border-transparent' : 'bg-surface-alt text-fg border-base'}`}
                      >
                        {m}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-base flex justify-end gap-3">
                  <button
                    onClick={() => setPhase((p) => Math.max(1, p - 1) as Phase)}
                    className="px-6 py-2 rounded-lg bg-base/40 text-muted"
                  >
                    Cancel
                  </button>
                  <div className="flex flex-col items-end gap-2 w-full sm:w-auto">
                    <button
                      disabled={!isPhase3Valid || submitting}
                      onClick={submit}
                      className="px-6 py-2 rounded-lg bg-[var(--primary)] text-black disabled:opacity-60"
                    >
                      {submitting ? "Sending..." : "Continue →"}
                    </button>
                    {submitError && <p className="text-xs text-red-500 mt-1">{submitError}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 4 && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                <div className="grid md:grid-cols-[1fr_280px] gap-4 md:gap-6 items-start">
                  <div className="space-y-5">
                    <div>
                      <h3 className="text-lg font-bold sm:text-xl">Project Request Submitted</h3>
                      <p className="mt-2 text-sm md:text-base text-muted">We've received your request and will be in touch within 24 hours to discuss next steps.</p>
                    </div>

                    <div className="bg-surface rounded-2xl border border-base p-4 md:p-6 shadow-sm">
                      <div className="flex items-start gap-3">
                        <div className="font-semibold">What happens next</div>
                      </div>
                      <ol className="mt-3 list-inside list-decimal text-sm space-y-1">
                        <li className="font-semibold">We review your request</li>
                        <li className="font-semibold">We reach out within 24 hours</li>
                        <li className="font-semibold">Plan, quote & start</li>
                      </ol>

                      <div className="mt-4">
                        <div className="text-sm font-semibold">Quick contact options</div>
                        <div className="mt-2 flex flex-col gap-1 md:gap-2">
                          <a href="https://wa.me/256782062673" className="text-xs md:text-sm text-[var(--primary)] break-all">WhatsApp: +256 782 062673</a>
                          <a href="mailto:zidesigns001@gmail.com" className="text-xs md:text-sm text-fg break-all">Email: zidesigns001@gmail.com</a>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-start">
                        <button
                          onClick={() => {
                            setPhase(1)
                            setSelectedCategory(null)
                            setSelectedService(null)
                            setBudget(null)
                            setTimeline(null)
                            setDetails("")
                            setName("")
                            setPhone("")
                            setEmail("")
                            setCompany("")
                            setPreferredContact("WhatsApp")
                          }}
                          className="w-full sm:w-auto px-4 py-2 rounded-lg border text-sm md:text-base"
                        >
                          Request another
                        </button>
                        <button onClick={() => downloadSummary()} className="w-full sm:w-auto px-4 py-2 rounded-lg border bg-surface-alt text-sm md:text-base">
                          Download summary
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0 rounded-2xl bg-surface-alt border border-base p-4 md:p-5 shadow-sm">
                    {selectedService ? (
                      <>
                        <p className="text-xs md:text-sm font-semibold text-fg">Your request so far</p>
                        <div className="mt-4 space-y-2 md:space-y-3">
                          {selectedCategory && <SummaryRow label="Category" value={selectedCategory} />}
                          {selectedService && <SummaryRow label="Service" value={selectedService} />}
                          {startingPrice && <SummaryRow label="Starting price" value={startingPrice} />}
                          {budget && <SummaryRow label="Budget" value={budget} />}
                          {timeline && <SummaryRow label="Timeline" value={timeline} />}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-xs md:text-sm font-semibold text-fg">Quick tips</p>
                        <ul className="mt-4 space-y-1 md:space-y-2 text-xs md:text-sm text-muted list-disc list-inside">
                          <li>Pick the service closest to your idea.</li>
                          <li>Budget and timeline help us give a realistic quote.</li>
                          <li>Detail your goal clearly for the fastest reply.</li>
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
