"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTitleTracker } from "@/components/page-title-tracker"
import { AIChatbot } from "@/components/ai-chatbot"
import { SectionReveal } from "@/components/section-reveal"
import { PackageBonusBanner } from "@/components/package-bonus-banner"

interface DesignService {
  id: string
  name: string
  startingPrice: number
  displayPrice: string
}

const GRAPHIC_DESIGN_SERVICES: DesignService[] = [
  { id: "posters-flyers", name: "Posters & Flyers", startingPrice: 20000, displayPrice: "UGX 20,000" },
  { id: "certificates", name: "Certificates", startingPrice: 20000, displayPrice: "UGX 20,000" },
  { id: "cv-design", name: "CV Design", startingPrice: 150000, displayPrice: "UGX 150,000" },
  { id: "presentations", name: "Presentations", startingPrice: 100000, displayPrice: "UGX 100,000 (up to 10 slides)" },
  { id: "company-profiles", name: "Company Profiles", startingPrice: 100000, displayPrice: "UGX 100,000 (up to 10 pages)" },
  { id: "magazine-design", name: "Magazine Design", startingPrice: 100000, displayPrice: "UGX 100,000 (up to 10 pages)" },
  { id: "logo-design", name: "Logo", startingPrice: 200000, displayPrice: "UGX 200,000" },
]

function GraphicDesignPackagesContent() {
  const [selectedServices, setSelectedServices] = useState<Set<string>>(new Set())
  const [serviceQuantities, setServiceQuantities] = useState<Record<string, number>>({})
  const [otherSelected, setOtherSelected] = useState(false)
  const [otherDescription, setOtherDescription] = useState("")
  const [otherPrice, setOtherPrice] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the service name from URL to display contextual back button
  const fromParam = searchParams.get('from')
  const backLabel = fromParam === 'home' ? 'Home' : (fromParam || 'Services')

  const toggleService = (serviceId: string) => {
    setSelectedServices((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(serviceId)) {
        newSet.delete(serviceId)
        // Remove quantity when deselected
        setServiceQuantities((prevQty) => {
          const newQty = { ...prevQty }
          delete newQty[serviceId]
          return newQty
        })
      } else {
        newSet.add(serviceId)
        // Set default quantity to 1 when selected
        setServiceQuantities((prevQty) => ({
          ...prevQty,
          [serviceId]: 1,
        }))
      }
      return newSet
    })
  }

  const updateQuantity = (serviceId: string, quantity: number) => {
    if (quantity >= 1 && quantity <= 999) {
      setServiceQuantities((prev) => ({
        ...prev,
        [serviceId]: quantity,
      }))
    }
  }

  const calculateTotal = () => {
    let total = 0
    selectedServices.forEach((serviceId) => {
      const service = GRAPHIC_DESIGN_SERVICES.find((s) => s.id === serviceId)
      if (service) {
        const quantity = serviceQuantities[serviceId] || 1
        total += service.startingPrice * quantity
      }
    })
    // Add other price if selected and valid
    if (otherSelected && otherPrice) {
      const parsedPrice = parseInt(otherPrice.replace(/[^0-9]/g, ''))
      if (!isNaN(parsedPrice)) {
        total += parsedPrice
      }
    }
    return total
  }

  const formatPrice = (price: number) => {
    return `UGX ${price.toLocaleString()}`
  }

  const handleContinue = () => {
    if (selectedServices.size === 0 && !otherSelected) return

    // Build the service names list
    const serviceNames: string[] = []
    selectedServices.forEach((serviceId) => {
      const service = GRAPHIC_DESIGN_SERVICES.find((s) => s.id === serviceId)
      if (service) {
        serviceNames.push(service.name)
      }
    })

    if (otherSelected && otherDescription.trim()) {
      serviceNames.push(`Other: ${otherDescription.trim()}`)
    }

    // Calculate total and format price
    const totalPrice = calculateTotal()
    const formattedPrice = `UGX ${totalPrice.toLocaleString()}`

    // Navigate to start-project form with all selected services and open contact step
    // Pass fromPackage param so contact step knows where to return
    const servicesParam = serviceNames.join(", ")
    router.push(`/start-project?service=${encodeURIComponent(servicesParam)}&price=${encodeURIComponent(formattedPrice)}&category=Design&phase=2&fromPackage=graphic-design`)
  }

  // Auto-select services from query param when present
  useEffect(() => {
    const svc = searchParams.get("service")
    if (!svc) return

    const parts = svc.split(",").map((p) => p.trim()).filter(Boolean)
    if (parts.length === 0) return

    const newSet = new Set<string>()
    const newQtys: Record<string, number> = {}

    parts.forEach((p) => {
      const lower = p.toLowerCase()
      const found = GRAPHIC_DESIGN_SERVICES.find((s) => s.name.toLowerCase() === lower)
      if (found) {
        newSet.add(found.id)
        newQtys[found.id] = 1
      } else if (lower.startsWith("other:")) {
        setOtherSelected(true)
        setOtherDescription(p.replace(/^[oO]ther:\s*/i, "").trim())
      }
    })

    if (newSet.size > 0) {
      setSelectedServices(newSet)
      setServiceQuantities((prev) => ({ ...prev, ...newQtys }))
    }
  }, [searchParams])

  const selectedServicesArray = Array.from(selectedServices)
    .map((id) => GRAPHIC_DESIGN_SERVICES.find((s) => s.id === id))
    .filter((s): s is DesignService => s !== undefined)

  const total = calculateTotal()
  const hasSelection = selectedServices.size > 0 || otherSelected

  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Navigation />
      <PageTitleTracker />
      
      <main className="flex-1 pt-[var(--nav-height)] overflow-hidden">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8 flex flex-col">
          {/* Header */}
          <div className="relative pb-4 sm:pb-6 text-center flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base bg-surface text-xs font-medium text-muted tracking-widest uppercase mb-2 sm:mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" />
              Graphic & Brand Design
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight px-2"
            >
              What do you <span className="text-gradient">need?</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-muted max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4"
            >
              Select one or more services. We'll estimate your starting cost.
            </motion.p>
          </div>

          {/* Back Button - Top Left (outside cards) */}
          <button
            onClick={() => fromParam === 'home' ? router.push('/') : router.push('/start-project')}
            className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-[var(--primary)] transition-colors mb-3 sm:mb-4 w-fit"
          >
            <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            Back to {backLabel}
          </button>

          {/* First-Time Client Bonus Banner */}
          <PackageBonusBanner />

          {/* 2-Column Layout with Fixed Heights - Stacks on mobile */}
          <div className="grid lg:grid-cols-[1fr_400px] gap-4 sm:gap-6 lg:gap-8 flex-1 min-h-0">
            {/* Left Column - Services Container (Subtle background with scrollable content) */}
            <SectionReveal className="min-h-0 flex flex-col">
              {/* Container with subtle background and defined height */}
              <div className="rounded-xl sm:rounded-2xl border border-base/40 bg-surface/30 backdrop-blur-sm p-3 sm:p-4 md:p-6 flex flex-col max-h-[450px] sm:max-h-[500px]">
                <div className="overflow-y-auto pr-1 sm:pr-2 custom-scrollbar flex-1">
                  <div className="space-y-2 sm:space-y-3 pb-4">
                {GRAPHIC_DESIGN_SERVICES.map((service, index) => {
                  const isSelected = selectedServices.has(service.id)
                  const quantity = serviceQuantities[service.id] || 1
                  return (
                    <motion.div
                      key={service.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      className={`w-full group rounded-2xl border transition-all ${
                        isSelected
                          ? "border-[var(--primary)] bg-[var(--primary)]/5"
                          : "border-base bg-surface hover:bg-surface-alt hover:border-[var(--primary)]/40"
                      }`}
                    >
                      <button
                        onClick={() => toggleService(service.id)}
                        className="w-full p-5 text-left"
                      >
                        <div className="flex items-center gap-4">
                          {/* Checkbox */}
                          <div
                            className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                              isSelected
                                ? "bg-[var(--primary)] border-[var(--primary)]"
                                : "border-muted-foreground/40 group-hover:border-[var(--primary)]/60"
                            }`}
                          >
                            {isSelected && <Check className="h-4 w-4 text-black" strokeWidth={3} />}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className={`text-lg font-semibold transition-colors ${
                              isSelected ? "text-[var(--primary)]" : "text-foreground"
                            }`}>
                              {service.name}
                            </div>
                            <div className="mt-0.5 text-sm text-muted-foreground">from {service.displayPrice}</div>
                          </div>
                        </div>
                      </button>

                      {/* Quantity Input - Shows when selected */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="px-5 pb-5 pt-2"
                        >
                          <div className="flex items-center gap-3">
                            <label className="text-sm font-medium text-muted-foreground">Quantity:</label>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateQuantity(service.id, quantity - 1)
                                }}
                                className="w-8 h-8 rounded-lg border border-base/60 transition flex items-center justify-center text-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-surface-alt hover:opacity-90 [&]:dark:bg-[#1e293b]"
                                disabled={quantity <= 1}
                              >
                                −
                              </button>
                              <input
                                type="number"
                                value={quantity}
                                onChange={(e) => {
                                  e.stopPropagation()
                                  const val = parseInt(e.target.value) || 1
                                  updateQuantity(service.id, val)
                                }}
                                onClick={(e) => e.stopPropagation()}
                                className="w-16 text-center rounded-lg border border-base/60 px-2 py-1.5 text-sm text-foreground outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 bg-surface-alt dark:bg-[#1e293b] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                min="1"
                                max="999"
                              />
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  updateQuantity(service.id, quantity + 1)
                                }}
                                className="w-8 h-8 rounded-lg border border-base/60 transition flex items-center justify-center text-foreground font-semibold disabled:opacity-50 disabled:cursor-not-allowed bg-surface-alt hover:opacity-90 [&]:dark:bg-[#1e293b]"
                                disabled={quantity >= 999}
                              >
                                +
                              </button>
                            </div>
                            <div className="ml-auto text-sm font-semibold text-[var(--primary)]">
                              {formatPrice(service.startingPrice * quantity)}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}

                {/* Other Option */}
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: GRAPHIC_DESIGN_SERVICES.length * 0.04, duration: 0.3 }}
                  onClick={() => setOtherSelected(!otherSelected)}
                  className={`w-full group rounded-xl sm:rounded-2xl border transition-all p-3 sm:p-4 md:p-5 text-left ${
                    otherSelected
                      ? "border-[var(--primary)] bg-[var(--primary)]/5"
                      : "border-base bg-surface hover:bg-surface-alt hover:border-[var(--primary)]/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5 sm:gap-3 md:gap-4">
                    {/* Checkbox */}
                    <div
                      className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-colors ${
                        otherSelected
                          ? "bg-[var(--primary)] border-[var(--primary)]"
                          : "border-muted-foreground/40 group-hover:border-[var(--primary)]/60"
                      }`}
                    >
                      {otherSelected && <Check className="h-3 w-3 sm:h-4 sm:w-4 text-black" strokeWidth={3} />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className={`text-sm sm:text-base md:text-lg font-semibold transition-colors ${
                        otherSelected ? "text-[var(--primary)]" : "text-foreground"
                      }`}>
                        Other
                      </div>
                      <div className="mt-0.5 text-xs sm:text-sm text-muted-foreground">Tell us what you need</div>
                    </div>
                  </div>
                </motion.button>

                {/* Other Description Input */}
                {otherSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="space-y-3">
                      <div>
                        <label className="block text-base font-medium text-foreground mb-2">
                          What else do you need?
                        </label>
                        <textarea
                          value={otherDescription}
                          onChange={(e) => {
                            const value = e.target.value
                            if (value.length <= 200) {
                              setOtherDescription(value)
                            }
                          }}
                          placeholder="Describe your design need..."
                          className="w-full rounded-xl border border-base bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 resize-none custom-scrollbar"
                          rows={4}
                          maxLength={200}
                        />
                        <p className="mt-1.5 text-xs text-muted-foreground text-right">
                          {otherDescription.length}/200 characters
                        </p>
                      </div>
                      <div>
                        <label className="block text-base font-medium text-foreground mb-2">
                          Estimated Price
                        </label>
                        <input
                          type="text"
                          value={otherPrice}
                          onChange={(e) => {
                            // Allow only numbers and limit to 10 digits (max 9,999,999,999)
                            const value = e.target.value.replace(/[^0-9]/g, '')
                            if (value.length <= 10) {
                              setOtherPrice(value)
                            }
                          }}
                          placeholder="e.g., 50000"
                          className="w-full rounded-xl border border-base bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                          maxLength={10}
                        />
                        {otherPrice && (
                          <p className="mt-1.5 text-xs text-muted-foreground">
                            UGX {parseInt(otherPrice).toLocaleString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
                  </div>
                </div>
              </div>
            </SectionReveal>

            {/* Right Column - Summary (Fixed Height, Scrollable) - Hidden on mobile */}
            <SectionReveal delay={0.1} className="hidden lg:flex min-h-0 flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-base bg-surface flex flex-col h-[500px]"
              >
                <div className="p-4 sm:p-6 border-b border-base flex-shrink-0">
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
                    Your selection
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
                  {hasSelection ? (
                    <div className="p-6">
                      <div className="space-y-3 mb-6">
                        {selectedServicesArray.map((service) => {
                          const quantity = serviceQuantities[service.id] || 1
                          const totalPrice = service.startingPrice * quantity
                          return (
                            <div key={service.id} className="space-y-1">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-muted-foreground">{service.name}</span>
                                <span className="font-medium text-foreground">{formatPrice(totalPrice)}</span>
                              </div>
                              {quantity > 1 && (
                                <div className="text-xs text-muted-foreground">
                                  {service.displayPrice} × {quantity}
                                </div>
                              )}
                            </div>
                          )
                        })}
                        {otherSelected && (
                          <div className="flex items-start justify-between text-sm gap-3">
                            <span className="text-muted-foreground flex-1">
                              {otherDescription.trim() ? `Other: ${otherDescription.trim().slice(0, 40)}${otherDescription.length > 40 ? "..." : ""}` : "Other (custom)"}
                            </span>
                            <span className="font-medium text-foreground whitespace-nowrap">
                              {otherPrice ? `UGX ${parseInt(otherPrice).toLocaleString()}` : "Price TBD"}
                            </span>
                          </div>
                        )}
                      </div>

                      {(selectedServices.size > 0 || (otherSelected && otherPrice)) && (
                        <div className="pt-6 border-t border-base">
                          <div className="flex items-baseline justify-between mb-3">
                            <span className="text-sm font-semibold text-muted-foreground">
                              Estimated starting total
                            </span>
                            <span className="text-2xl font-bold text-[var(--primary)]">{formatPrice(total)}</span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            Final pricing may vary based on quantity, complexity and requirements.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full p-6">
                      <p className="text-sm text-muted-foreground text-center">
                        Select one or more services to see your estimate
                      </p>
                    </div>
                  )}
                </div>

                {/* Continue Button - Fixed at Bottom */}
                <div className="p-4 sm:p-6 border-t border-base flex-shrink-0">
                  <button
                    onClick={handleContinue}
                    disabled={!hasSelection}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </motion.div>
            </SectionReveal>

            {/* Mobile Summary Card - Shows on mobile when services are selected */}
            {hasSelection && (
              <div className="lg:hidden mt-4">
                <div className="rounded-xl border border-base bg-surface p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground mb-2">Selected Services</p>
                      <div className="space-y-1">
                        {selectedServicesArray.map((service) => {
                          const quantity = serviceQuantities[service.id] || 1
                          return (
                            <p key={service.id} className="text-xs font-medium text-foreground">
                              {service.name} {quantity > 1 && `(×${quantity})`}
                            </p>
                          )
                        })}
                        {otherSelected && otherDescription && (
                          <p className="text-xs font-medium text-foreground">
                            Other: {otherDescription.slice(0, 30)}{otherDescription.length > 30 ? '...' : ''}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xs text-muted-foreground mb-1">Est. Total</p>
                      <p className="text-lg font-bold text-[var(--primary)]">{formatPrice(total)}</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Final pricing may vary based on requirements
                  </p>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={!hasSelection}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg"
                >
                  Continue
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      <SectionReveal delay={0.3}>
        <Footer />
      </SectionReveal>

      <AIChatbot />
    </div>
  )
}

export default function GraphicDesignPackagesPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col bg-page">
        <Navigation />
        <PageTitleTracker />
        <main className="flex-1 pt-[var(--nav-height)] flex items-center justify-center">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-[var(--primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-muted">Loading...</p>
          </div>
        </main>
      </div>
    }>
      <GraphicDesignPackagesContent />
    </Suspense>
  )
}
