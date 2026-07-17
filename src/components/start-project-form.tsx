"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useSearchParams } from "next/navigation"

type Phase = 1 | 2 | 3 | 4

const CATEGORIES = ["Design", "Branding", "Development"]

const SERVICES: Record<string, string[]> = {
  Design: ["Posters & Flyers", "CV Design", "Presentations", "Company Profiles", "Certificates"],
  Branding: ["Logo"],
  Development: ["Website", "Mobile Application"],
}

const STARTING_PRICES: Record<string, string> = {
  "Posters & Flyers": "UGX 20,000+",
  "Certificates": "UGX 20,000+",
  "CV Design": "UGX 50,000+",
  "Presentations": "UGX 100,000+",
  "Company Profiles": "UGX 100,000+",
  "Logo": "UGX 50,000+",
  "Website": "UGX 750,000+",
  "Mobile Application": "UGX 5,000,000+",
}

type PackageOption = {
  label: string
  details: string[]
}

const POSTERS_FLYERS_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 20,000",
    details: ["1 poster/flyer design", "1 revision", "Print-ready & digital files"],
  },
  {
    label: "UGX 50,000",
    details: ["Up to 3 designs", "2 revisions", "Source files included"],
  },
  {
    label: "UGX 100,000",
    details: ["Up to 6 designs", "Unlimited minor revisions", "Source files & priority support"],
  },
]

const CV_DESIGN_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 50,000",
    details: ["Modern CV layout", "1 revision", "PDF and editable source"],
  },
  {
    label: "UGX 100,000",
    details: ["2 variations + polished structure", "2 revisions", "ATS-friendly formatting"],
  },
  {
    label: "UGX 200,000+",
    details: ["Executive CV + cover letter", "Premium visual direction", "Tailored to your field"],
  },
]

const PRESENTATION_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 100,000",
    details: ["Up to 10-slide presentation", "Clean visual layout", "2 revisions"],
  },
  {
    label: "UGX 250,000",
    details: ["20-slide deck with branding", "3 revisions", "Enhanced visuals and icons"],
  },
  {
    label: "UGX 500,000+",
    details: ["Pitch-ready presentation", "Custom templates and animations", "Tailored to your audience"],
  },
]

const COMPANY_PROFILE_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 100,000",
    details: ["Simple company profile layout", "1 revision", "PDF-ready design"],
  },
  {
    label: "UGX 250,000",
    details: ["Multi-page profile with branding", "2 revisions", "Professional visual hierarchy"],
  },
  {
    label: "UGX 500,000+",
    details: ["Premium company profile", "Advanced layout and visuals", "Tailored for investors or clients"],
  },
]

const CERTIFICATE_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 20,000",
    details: ["1 certificate design", "1 revision", "Print-ready export"],
  },
  {
    label: "UGX 50,000",
    details: ["Certificate set with matching style", "2 revisions", "Printable and digital files"],
  },
  {
    label: "UGX 100,000+",
    details: ["Custom certificate series", "Brand-aligned styling", "Flexible for events or training"],
  },
]

const BRANDING_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 50,000",
    details: ["2 logo concepts", "Brand colours", "PNG, PDF & SVG files", "2 revisions"],
  },
  {
    label: "UGX 250,000",
    details: ["Premium logo package", "Multiple concepts", "Brand kit & mockups", "Source files"],
  },
  {
    label: "UGX 500,000",
    details: ["Complete brand identity", "Brand guidelines", "Full branding assets", "Unlimited revisions"],
  },
]

const DEVELOPMENT_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 750,000",
    details: ["Landing page or personal website", "Responsive design", "Contact form", "SEO & deployment"],
  },
  {
    label: "UGX 1,500,000",
    details: ["Business website (5+ pages)", "Blog & gallery", "Google Analytics", "SEO & deployment"],
  },
  {
    label: "UGX 3,000,000",
    details: ["E-commerce website", "Payments", "Admin dashboard", "Deployment & support"],
  },
]

const MOBILE_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 5,000,000",
    details: ["Up to 8 screens", "Android or iOS (single platform)", "User authentication", "Basic backend integration", "Admin dashboard (basic)", "Testing & deployment support"],
  },
  {
    label: "UGX 10,000,000",
    details: ["Up to 20 screens", "Android & iOS", "Custom UI/UX", "Push notifications", "Payment integration", "Maps & location", "Admin dashboard", "Analytics", "30 days post-launch support"],
  },
  {
    label: "UGX 20,000,000+",
    details: ["Unlimited screens", "Android & iOS", "Custom backend/API development", "Role-based permissions", "Advanced security", "AI integrations", "Offline functionality", "Third-party integrations", "Analytics & reporting", "Documentation", "Training", "90 days support"],
  },
]

function getPackageOptions(service: string | null | undefined, category: string | null): PackageOption[] {
  if (!service) return []

  const normalized = service.toLowerCase()
  if (["posters & flyers"].includes(normalized)) {
    return POSTERS_FLYERS_PACKAGE_OPTIONS
  }
  if (["certificates"].includes(normalized)) {
    return CERTIFICATE_PACKAGE_OPTIONS
  }
  if (["cv design"].includes(normalized)) {
    return CV_DESIGN_PACKAGE_OPTIONS
  }
  if (["presentations"].includes(normalized)) {
    return PRESENTATION_PACKAGE_OPTIONS
  }
  if (["company profiles"].includes(normalized)) {
    return COMPANY_PROFILE_PACKAGE_OPTIONS
  }
  if (["logo"].includes(normalized)) {
    return BRANDING_PACKAGE_OPTIONS
  }
  if (["website"].includes(normalized)) {
    return DEVELOPMENT_PACKAGE_OPTIONS
  }
  if (["mobile application"].includes(normalized)) {
    return MOBILE_PACKAGE_OPTIONS
  }

  if (category === "Design") return POSTERS_FLYERS_PACKAGE_OPTIONS
  if (category === "Branding") return BRANDING_PACKAGE_OPTIONS
  if (category === "Development") return DEVELOPMENT_PACKAGE_OPTIONS

  return []
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
  const searchParams = useSearchParams()
  const [phase, setPhase] = useState<Phase>(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Design")
  const [selectedService, setSelectedService] = useState<string | null>(null)

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    if (serviceParam) {
      if (serviceParam.includes("Website") || serviceParam.includes("Mobile")) {
        setSelectedCategory("Development")
      }
    }
  }, [searchParams])

  const [currency, setCurrency] = useState<"UGX" | "USD">("UGX")
  const approxRate = 3800 // example static approximate rate UGX per USD

  const [budget, setBudget] = useState<string | null>(null)
  const [goal, setGoal] = useState("")
  const [details, setDetails] = useState("")
  const [customService, setCustomService] = useState("")
  const [customBudget, setCustomBudget] = useState("")

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

  const displayedService = selectedService === "Other" ? (customService || "Other") : selectedService
  const displayedBudget = budget === "Other / Custom" ? (customBudget || "Other / Custom") : budget
  const packageOptions = useMemo(() => getPackageOptions(displayedService, selectedCategory), [displayedService, selectedCategory])

  const isPhase1Valid = !!selectedService && (selectedService !== "Other" || customService.trim().length > 0)
  const isPhase2Valid = !!budget && (budget !== "Other / Custom" || customBudget.trim().length > 0)

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
        // Formspree helper fields: send copies to both addresses and set reply-to
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

      // Success: show confirmation
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
    lines.push(`Service: ${displayedService ?? '—'}`)
    lines.push(`Package: ${displayedBudget ?? '—'}`)
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
        ["Package", displayedBudget ?? "—"],
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
        ["Name", name || "—"],
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
                        : done
                        ? 'border-transparent text-[var(--primary)] cursor-pointer'
                        : 'border-transparent text-muted cursor-default'
                      } ${!reachable ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {done ? (
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
                              onClick={() => {
                                setSelectedService(s)
                                setCustomService("")
                              }}
                              className={`px-3 py-2 rounded-full border ${selectedService === s ? 'bg-[var(--primary)] text-black border-transparent' : 'bg-surface-alt text-fg border-base'}`}
                            >
                              {s}
                            </button>
                          ))}
                          <button
                            key="Other"
                            onClick={() => {
                              setSelectedService("Other")
                              setCustomService("")
                            }}
                            className={`px-3 py-2 rounded-full border ${selectedService === "Other" ? 'bg-[var(--primary)] text-black border-transparent' : 'bg-surface-alt text-fg border-base'}`}
                          >
                            Other
                          </button>
                        </div>

                        {selectedService === "Other" && (
                          <div className="mt-4">
                            <input
                              value={customService}
                              onChange={(e) => setCustomService(e.target.value)}
                              placeholder="Describe your service (e.g. custom app, AI workflow, or brand system)"
                              className="w-full mt-2 rounded-md border px-3 py-2 text-sm"
                            />
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
                <h3 className="text-lg font-semibold">Choose a package</h3>
                <p className="mt-2 text-sm text-muted">These package options are tailored to {displayedService || "your selected service"} and show what you get at each investment level.</p>

                <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-3">
                    {packageOptions.slice(0, 3).map((option) => (
                      <button
                        key={option.label}
                        type="button"
                        onClick={() => {
                          setBudget(option.label)
                          setCustomBudget("")
                        }}
                        className={`w-full rounded-2xl border p-4 text-left transition ${budget === option.label ? 'border-[var(--primary)] bg-[rgba(64,224,208,0.14)] shadow-sm' : 'border-base bg-surface-alt hover:border-[var(--primary)]/60'}`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <div className="text-sm font-semibold">{option.label}</div>
                            <p className="mt-1 text-sm text-muted">Select this package</p>
                          </div>
                          {budget === option.label && (
                            <span className="rounded-full bg-[var(--primary)] px-2.5 py-1 text-xs font-semibold text-black">Selected</span>
                          )}
                        </div>
                      </button>
                    ))}

                    <button
                      type="button"
                      onClick={() => {
                        setBudget("Other / Custom")
                        setCustomBudget("")
                      }}
                      className={`w-full rounded-2xl border p-4 text-left transition ${budget === "Other / Custom" ? 'border-[var(--primary)] bg-[rgba(64,224,208,0.14)] shadow-sm' : 'border-base bg-surface-alt hover:border-[var(--primary)]/60'}`}
                    >
                      <div className="text-sm font-semibold">Other / Custom</div>
                      <p className="mt-1 text-sm text-muted">Tell us your scope and we’ll tailor a package around it.</p>
                    </button>
                  </div>

                  <div className="rounded-2xl border border-base bg-surface p-4 md:p-5">
                    <div className="text-sm font-semibold">Package details</div>
                    {budget ? (
                      <div className="mt-3 rounded-xl border border-base bg-surface-alt p-4">
                        {budget === "Other / Custom" ? (
                          <>
                            <p className="text-sm font-semibold">Custom package</p>
                            <p className="mt-2 text-sm text-muted">We’ll tailor this around your scope and budget.</p>
                          </>
                        ) : (
                          <>
                            <p className="text-sm font-semibold">{budget}</p>
                            <ul className="mt-3 space-y-2 text-sm text-muted list-disc list-inside">
                              {packageOptions.find((option) => option.label === budget)?.details.map((detail) => (
                                <li key={detail}>{detail}</li>
                              ))}
                            </ul>
                          </>
                        )}
                      </div>
                    ) : (
                      <p className="mt-3 text-sm text-muted">Select a package to see its details here.</p>
                    )}
                  </div>
                </div>

                {budget === "Other / Custom" && (
                  <div className="mt-4">
                    <input
                      value={customBudget}
                      onChange={(e) => setCustomBudget(e.target.value)}
                      placeholder="e.g. UGX 800,000 or open to discussion"
                      className="w-full rounded-md border px-3 py-2 text-sm"
                    />
                  </div>
                )}

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
                            setDetails("")
                            setName("")
                            setPhone("")
                            setEmail("")
                            setCompany("")
                            setPreferredContact("WhatsApp")
                            setCustomService("")
                            setCustomBudget("")
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
                          {selectedService && <SummaryRow label="Service" value={displayedService ?? selectedService} />}
                          {budget && <SummaryRow label="Package" value={displayedBudget ?? budget} />}
                        </div>
                      </>
                    ) : (
                      <>
                        <p className="text-xs md:text-sm font-semibold text-fg">Quick tips</p>
                        <ul className="mt-4 space-y-1 md:space-y-2 text-xs md:text-sm text-muted list-disc list-inside">
                          <li>Pick the service closest to your idea.</li>
                          <li>Select the package that best matches your scope.</li>
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
