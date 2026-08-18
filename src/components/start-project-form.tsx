"use client"

import { useState, useMemo, useEffect } from "react"
import { motion } from "framer-motion"
import jsPDF from "jspdf"
import autoTable from "jspdf-autotable"
import { useSearchParams, useRouter } from "next/navigation"
import { StartProjectStepOne } from "@/components/start-project-step-one"
import { StartProjectContactStep } from "@/components/start-project-contact-step"
import { StartProjectConfirmStep } from "@/components/start-project-confirm-step"

type Phase = 1 | 2 | 3

const CATEGORIES = ["Design", "Branding", "Development"]

const SERVICES: Record<string, string[]> = {
  Design: ["Free Poster (First-Time Offer)", "Posters & Flyers", "CV Design", "Presentations", "Company Profiles", "Certificates", "Magazine Design"],
  Branding: ["Logo"],
  Development: ["Website", "Mobile Application"],
}

const STARTING_PRICES: Record<string, string> = {
  "Free Poster (First-Time Offer)": "FREE",
  "Posters & Flyers": "UGX 20,000",
  "Certificates": "UGX 20,000",
  "CV Design": "UGX 150,000",
  "Presentations": "UGX 100,000 (up to 10 slides)",
  "Company Profiles": "UGX 100,000 (up to 10 pages)",
  "Magazine Design": "UGX 100,000 (up to 10 pages)",
  "Logo": "UGX 200,000",
  "Website": "UGX 750,000",
  "Mobile Application": "UGX 5,000,000",
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

const MAGAZINE_DESIGN_PACKAGE_OPTIONS: PackageOption[] = [
  {
    label: "UGX 100,000",
    details: ["Up to 8-page magazine layout", "1 revision", "Print-ready PDF"],
  },
  {
    label: "UGX 250,000",
    details: ["Up to 20-page magazine", "2 revisions", "Professional typography and imagery"],
  },
  {
    label: "UGX 500,000+",
    details: ["Full magazine design (40+ pages)", "Brand-aligned layout system", "Multiple revisions and print support"],
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
  if (["free poster (first-time offer)", "free poster"].includes(normalized)) {
    // Return empty array for free poster - no package options needed
    return []
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
  if (["magazine design"].includes(normalized)) {
    return MAGAZINE_DESIGN_PACKAGE_OPTIONS
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

export function StartProjectForm({ onPhaseChange }: { onPhaseChange?: (phase: Phase) => void }) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [phase, setPhase] = useState<Phase>(1)
  const [selectedCategory, setSelectedCategory] = useState<string | null>("Design")
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedMain, setSelectedMain] = useState<string | null>(null)
  const [selectedPrice, setSelectedPrice] = useState<string | null>(null)

  // Notify parent of phase changes
  useEffect(() => {
    onPhaseChange?.(phase)
  }, [phase, onPhaseChange])

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    const categoryParam = searchParams.get("category")
    const priceParam = searchParams.get("price")
    
    if (serviceParam) {
      // Map service to category and auto-select
      const serviceToCategory: Record<string, string> = {
        "Free Poster": "Design",
        "Free Poster (First-Time Offer)": "Design",
        "Posters & Flyers": "Design",
        "Certificates": "Design",
        "CV Design": "Design",
        "Presentations": "Design",
        "Company Profiles": "Design",
        "Magazine Design": "Design",
        "Logo": "Branding",
        "Logo Design": "Branding",
        "Website": "Development",
        "Mobile Application": "Development",
      }
      
      // If category is explicitly provided, use it
      const category = categoryParam || serviceToCategory[serviceParam]
      if (category) {
        setSelectedCategory(category)
        // Map "Free Poster" URL param to the display name
        const displayService = serviceParam === "Free Poster" ? "Free Poster (First-Time Offer)" : serviceParam
        setSelectedService(displayService)
      }
    }

    if (priceParam) {
      setSelectedPrice(priceParam)
      setBudget(priceParam) // Set budget to match the price from URL
    }

    const phaseParam = searchParams.get("phase")
    if (phaseParam) {
      const n = parseInt(phaseParam, 10)
      if (n >= 1 && n <= 3) setPhase(n as Phase)
    }

    // Check if user came from promo strip (has bonus) and hasn't redeemed it yet
    const redeemed = localStorage.getItem("promo-redeemed") === "true"
    const hasBonus = !redeemed && (searchParams.get("bonus") === "true" || localStorage.getItem("promo-claimed") === "true")
    setHasFreePosterBonus(hasBonus)
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
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [hasFreePosterBonus, setHasFreePosterBonus] = useState(false)

  const servicesForCategory = useMemo(() => (selectedCategory ? SERVICES[selectedCategory] ?? [] : []), [selectedCategory])

  const startingPrice = selectedService ? STARTING_PRICES[selectedService] ?? "Custom — contact for scope" : null

  const displayedService = selectedService === "Other" ? (customService || "Other") : selectedService
  const displayedBudget = budget === "Other / Custom" ? (customBudget || "Other / Custom") : budget
  const packageOptions = useMemo(() => getPackageOptions(displayedService, selectedCategory), [displayedService, selectedCategory])

  const isPhase1Valid = (!!selectedService && (selectedService !== "Other" || customService.trim().length > 0)) || !!selectedMain

  const validateName = (v: string) => v.trim().length >= 2
  const validatePhone = (v: string) => {
    const digits = v.replace(/\D/g, "")
    return digits.length >= 7 && digits.length <= 15
  }
  const validateEmail = (v: string) => /^\S+@\S+\.\S+$/.test(v)

  const nameValid = validateName(name)
  const phoneValid = validatePhone(phone)
  const emailValid = validateEmail(email)

  const isPhase2Valid = nameValid && phoneValid && emailValid

  const submit = async () => {
    setSubmitError(null)
    
    // Prevent duplicate submissions
    if (hasSubmitted) {
      console.log("Form already submitted, skipping duplicate submission")
      setPhase(3) // Just navigate to confirmation page
      return
    }
    
    if (!isPhase2Valid) {
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

      // EmailJS — notify both inboxes securely through our API proxy
      const emailRes = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "service_1ral4jg",
          template_id: "template_y5ipuvd",
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
            goal: goal || "—",
            details: details || "—",
            logo_url: "https://zidesigns.vercel.app/favicon/android-chrome-512x512.png",
          },
        }),
      })

      if (!emailRes.ok) {
        // Non-blocking — log but don't fail the submission
        console.warn("EmailJS notification failed:", await emailRes.text())
      }

      setHasSubmitted(true) // Mark as submitted
      
      // If they claimed the bonus, mark it as fully redeemed
      if (hasFreePosterBonus) {
        localStorage.setItem("promo-redeemed", "true")
      }
      
      setPhase(3)
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

    // Use jsPDF standard fonts to avoid unicode cmap errors
    // helvetica-bold for brand logo and headings, helvetica for body text

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

    // Determine appropriate label based on service type
    const getServiceTypeLabel = () => {
      if (!selectedService) return "Service Type"
      
      // Check if it's a package-based service
      const packagesServices = [
        "Starter Website", "Business Website", "Web Platform",
        "Mobile App Starter", "Business Mobile App", "Advanced Mobile App",
        "SaaS MVP", "Business SaaS", "Enterprise SaaS"
      ]
      
      if (packagesServices.some(pkg => selectedService?.toLowerCase().includes(pkg.toLowerCase()))) {
        return "Package"
      }
      
      // For design services with multiple items
      if (selectedService?.includes(",")) {
        return "Services"
      }
      
      return "Service"
    }

    const getPriceLabel = () => {
      // If service is a named package, call it "Package Price"
      const packagesServices = [
        "Starter Website", "Business Website", "Web Platform",
        "Mobile App Starter", "Business Mobile App", "Advanced Mobile App",
        "SaaS MVP", "Business SaaS", "Enterprise SaaS"
      ]
      
      if (packagesServices.some(pkg => selectedService?.toLowerCase().includes(pkg.toLowerCase()))) {
        return "Package Price"
      }
      
      // For multiple services
      if (selectedService?.includes(",")) {
        return "Estimated Total"
      }
      
      return "Price"
    }

    autoTable(doc, {
      startY: 60,
      head: [["Field", "Details"]],
      body: [
        ["Project Category", selectedCategory ?? "—"],
        [getServiceTypeLabel(), displayedService ?? "—"],
        [getPriceLabel(), displayedBudget ?? "—"],
        ...(hasFreePosterBonus ? [["First-Time Offer", "FREE Poster/Flyer Design"]] : []),
      ],
      headStyles: { fillColor: primary, textColor: 255, fontStyle: "bold", font: "helvetica" },
      alternateRowStyles: { fillColor: [245, 253, 251] },
      columnStyles: { 0: { fontStyle: "bold", cellWidth: 50 } },
      styles: { font: "helvetica", fontStyle: "normal", fontSize: 10, cellPadding: 4 },
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
      styles: { font: "helvetica", fontStyle: "normal", fontSize: 10, cellPadding: 4 },
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
      <div className="flex-1 min-h-0 flex flex-col">
        <div className="bg-surface rounded-xl sm:rounded-2xl border border-base shadow-sm p-3 sm:p-4 md:p-6 flex-1 flex flex-col min-h-0">
          <div className="flex flex-col flex-1 min-h-0">
            <div className="flex border-b border-base mb-4 sm:mb-6 -mx-3 sm:-mx-4 md:-mx-6 px-3 sm:px-4 md:px-6 overflow-x-auto flex-shrink-0">
              {[
                { n: 1, label: 'Services' },
                { n: 2, label: 'Contact' },
                { n: 3, label: 'Confirm' },
              ].map(({ n, label }) => {
                const done = phase > n
                const active = phase === n
                const reachable = n < 3 || (isPhase1Valid && isPhase2Valid)
                return (
                  <button
                    key={n}
                    onClick={() => {
                      if (n < 3) setPhase(n as Phase)
                      else if (reachable) setPhase(n as Phase)
                    }}
                    className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-xs sm:text-sm border-b-2 transition-colors whitespace-nowrap
                      ${active
                        ? 'border-[var(--primary)] text-fg font-semibold'
                        : done
                        ? 'border-transparent text-[var(--primary)] cursor-pointer'
                        : 'border-transparent text-muted cursor-default'
                      } ${!reachable ? 'opacity-40 cursor-not-allowed' : ''}`}
                  >
                    {done ? (
                      <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[var(--primary)] flex items-center justify-center text-black text-[10px] sm:text-xs">✓</span>
                    ) : (
                      <span className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full border flex items-center justify-center text-[10px] sm:text-xs
                        ${active ? 'border-[var(--primary)] text-fg' : 'border-base text-muted'}`}>
                        {n}
                      </span>
                    )}
                    <span className="hidden xs:inline sm:inline">{label}</span>
                  </button>
                )
              })}
            </div>

            {phase === 1 && <StartProjectStepOne />}

            {phase === 2 && (
              <StartProjectContactStep
                name={name}
                setName={setName}
                phone={phone}
                setPhone={setPhone}
                email={email}
                setEmail={setEmail}
                company={company}
                setCompany={setCompany}
                preferredContact={preferredContact}
                setPreferredContact={setPreferredContact}
                nameTouched={nameTouched}
                setNameTouched={setNameTouched}
                phoneTouched={phoneTouched}
                setPhoneTouched={setPhoneTouched}
                emailTouched={emailTouched}
                setEmailTouched={setEmailTouched}
                nameValid={nameValid}
                phoneValid={phoneValid}
                emailValid={emailValid}
                selectedService={selectedService}
                displayedService={displayedService}
                selectedPrice={selectedPrice}
                hasFreePosterBonus={hasFreePosterBonus}
                isPhase2Valid={isPhase2Valid}
                submitting={submitting}
                submitError={submitError}
                onBack={() => {
                  // Navigate back to the appropriate package page based on fromPackage param
                  const fromPackageParam = searchParams.get("fromPackage")
                  
                  if (fromPackageParam === "graphic-design") {
                    router.push('/graphic-design-packages')
                  } else if (fromPackageParam === "website") {
                    router.push('/website-packages')
                  } else if (fromPackageParam === "mobile-app") {
                    router.push('/mobile-app-packages')
                  } else if (fromPackageParam === "saas") {
                    router.push('/saas-packages')
                  } else {
                    // Fallback: try to determine from category
                    const categoryParam = searchParams.get("category")
                    if (categoryParam === "Design") {
                      router.push('/graphic-design-packages')
                    } else {
                      // Default fallback to service selection
                      setPhase(1)
                    }
                  }
                }}
                onSubmit={submit}
              />
            )}

            {phase === 3 && (
              <StartProjectConfirmStep
                selectedCategory={selectedCategory}
                selectedService={selectedService}
                displayedService={displayedService}
                budget={budget}
                displayedBudget={displayedBudget}
                name={name}
                phone={phone}
                email={email}
                company={company}
                preferredContact={preferredContact}
                hasFreePosterBonus={hasFreePosterBonus}
                onNewRequest={() => {
                  setPhase(1)
                  setSelectedCategory(null)
                  setSelectedService(null)
                  setSelectedMain(null)
                  setBudget(null)
                  setDetails("")
                  setName("")
                  setPhone("")
                  setEmail("")
                  setCompany("")
                  setPreferredContact("WhatsApp")
                  setCustomService("")
                  setCustomBudget("")
                  setHasSubmitted(false) // Reset submission flag
                  router.push('/start-project')
                }}
                onDownload={downloadSummary}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
