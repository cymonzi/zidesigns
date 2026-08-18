"use client"

import { useState, useEffect, Suspense } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { PageTitleTracker } from "@/components/page-title-tracker"
import { AIChatbot } from "@/components/ai-chatbot"
import { SectionReveal } from "@/components/section-reveal"
import { PackageBonusBanner } from "@/components/package-bonus-banner"

interface MobileAppPackage {
  id: string
  number: string
  name: string
  price: number
  displayPrice: string
  description: string
  features: string[]
  note?: string
}

const MOBILE_APP_PACKAGES: MobileAppPackage[] = [
  {
    id: "mobile-app-starter",
    number: "01",
    name: "Mobile App Starter",
    price: 5000000,
    displayPrice: "UGX 5,000,000",
    description: "For simple apps and MVPs.",
    features: [
      "Up to 8 screens",
      "Android or iOS",
      "User login",
      "Basic database",
      "Core app functionality",
      "Basic API integration",
      "App deployment"
    ],
    note: "Best for: simple utility apps, MVPs, and focused mobile experiences."
  },
  {
    id: "business-mobile-app",
    number: "02",
    name: "Business Mobile App",
    price: 10000000,
    displayPrice: "UGX 10,000,000",
    description: "For businesses that need a complete mobile application.",
    features: [
      "Up to 20 screens",
      "Android & iOS",
      "User accounts",
      "Database & backend",
      "Push notifications",
      "Payment integration",
      "Maps & location",
      "Admin dashboard",
      "Analytics",
      "App deployment"
    ],
    note: "Best for: customer-facing business apps and full-featured mobile products."
  },
  {
    id: "advanced-mobile-app",
    number: "03",
    name: "Advanced Mobile App",
    price: 20000000,
    displayPrice: "UGX 20,000,000",
    description: "For complex mobile products requiring advanced functionality.",
    features: [
      "20+ screens",
      "Android & iOS",
      "Custom backend & APIs",
      "Advanced user roles",
      "Advanced security",
      "Real-time functionality",
      "AI integrations",
      "Offline functionality",
      "Third-party integrations",
      "Advanced analytics",
      "Documentation & training",
      "Extended post-launch support"
    ],
    note: "Best for: complex platforms, startups, and large-scale mobile products."
  }
]

function MobileAppPackagesContent() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get the service name from URL to display contextual back button
  const fromParam = searchParams.get('from')
  const backLabel = fromParam === 'home' ? 'Home' : (fromParam || 'Services')

  const handleContinue = () => {
    if (!selectedPackage) return

    const pkg = MOBILE_APP_PACKAGES.find((p) => p.id === selectedPackage)
    if (pkg) {
      router.push(`/start-project?service=${encodeURIComponent(pkg.name)}&price=${encodeURIComponent(pkg.displayPrice)}&category=Development&phase=2&fromPackage=mobile-app`)
    }
  }

  useEffect(() => {
    const svc = searchParams.get("service")
    if (!svc) return
    const match = MOBILE_APP_PACKAGES.find((p) => p.name.toLowerCase() === svc.toLowerCase())
    if (match) setSelectedPackage(match.id)
  }, [searchParams])

  const selectedPkg = MOBILE_APP_PACKAGES.find((p) => p.id === selectedPackage)

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
              Mobile App Development
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight px-2"
            >
              Choose your <span className="text-gradient">package</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mt-2 text-muted max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-4"
            >
              Select a package that best fits your needs. We'll refine the details together.
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
            {/* Left Column - Packages Container (Subtle background with scrollable content) */}
            <SectionReveal className="min-h-0 flex flex-col">
              {/* Container with subtle background and defined height */}
              <div className="rounded-xl sm:rounded-2xl border border-base/40 bg-surface/30 backdrop-blur-sm p-3 sm:p-4 md:p-6 flex flex-col max-h-[450px] sm:max-h-[500px]">
                <div className="overflow-y-auto pr-1 sm:pr-2 custom-scrollbar flex-1">
                  <div className="space-y-2.5 sm:space-y-3 md:space-y-4 pb-4">
                    {MOBILE_APP_PACKAGES.map((pkg, index) => {
                      const isSelected = selectedPackage === pkg.id
                      return (
                        <motion.div
                          key={pkg.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.08, duration: 0.3 }}
                          className={`w-full group rounded-xl sm:rounded-2xl border transition-all ${
                            isSelected
                              ? "border-[var(--primary)] bg-[var(--primary)]/5"
                              : "border-base bg-surface hover:bg-surface-alt hover:border-[var(--primary)]/40"
                          }`}
                        >
                          <button
                            onClick={() => setSelectedPackage(pkg.id)}
                            className="w-full p-3 sm:p-4 md:p-6 text-left"
                          >
                            <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4">
                              {/* Checkbox */}
                              <div
                                className={`flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded border-2 flex items-center justify-center transition-colors ${
                                  isSelected
                                    ? "bg-[var(--primary)] border-[var(--primary)]"
                                    : "border-muted-foreground/40 group-hover:border-[var(--primary)]/60"
                                }`}
                              >
                                {isSelected && <Check className="h-3 w-3 sm:h-4 sm:w-4 text-black" strokeWidth={3} />}
                              </div>

                              <div className="flex-1 min-w-0">
                                {/* Package Header */}
                                <div className="flex items-baseline gap-1.5 sm:gap-2 md:gap-3 mb-1.5 sm:mb-2">
                                  <span className="text-[10px] sm:text-xs md:text-sm font-bold text-muted-foreground opacity-60">
                                    {pkg.number}
                                  </span>
                                  <h3 className={`text-base sm:text-lg md:text-xl font-bold transition-colors ${
                                    isSelected ? "text-[var(--primary)]" : "text-foreground"
                                  }`}>
                                    {pkg.name}
                                  </h3>
                                </div>

                                {/* Price */}
                                <div className="mb-2 sm:mb-3">
                                  <span className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors ${
                                    isSelected ? "text-[var(--primary)]" : "text-foreground"
                                  }`}>
                                    {pkg.displayPrice}
                                  </span>
                                </div>

                                {/* Description */}
                                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                                  {pkg.description}
                                </p>

                                {/* Note */}
                                {pkg.note && (
                                  <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-base/50">
                                    <p className="text-[10px] sm:text-xs text-muted-foreground italic leading-relaxed">
                                      {pkg.note}
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </button>
                        </motion.div>
                      )
                    })}

                    {/* Additional Info Card */}
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: MOBILE_APP_PACKAGES.length * 0.08, duration: 0.3 }}
                      className="rounded-xl sm:rounded-2xl border border-base/60 bg-surface/50 p-3 sm:p-4 md:p-5"
                    >
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">Need something specific?</span>
                        <br />
                        Every mobile app is unique. We'll customize features and pricing based on your exact needs.
                      </p>
                    </motion.div>
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
                  <h3 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider">
                    Your selection
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
                  {selectedPkg ? (
                    <div className="p-6">
                      <div className="mb-6">
                        {/* Package Number Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--primary)]/10 border border-[var(--primary)]/20 mb-3">
                          <span className="text-xs font-bold text-[var(--primary)]">
                            {selectedPkg.number}
                          </span>
                        </div>

                        {/* Package Name */}
                        <h4 className="text-xl font-bold text-foreground mb-2">
                          {selectedPkg.name}
                        </h4>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                          {selectedPkg.description}
                        </p>

                        {/* Price Display */}
                        <div className="py-4 border-y border-base">
                          <div className="flex items-baseline justify-between">
                            <span className="text-sm font-semibold text-muted-foreground">
                              Starting from
                            </span>
                            <span className="text-3xl font-bold text-[var(--primary)]">
                              {selectedPkg.displayPrice}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Features List */}
                      <div className="mb-6">
                        <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider !mb-5">
                          What's included
                        </h5>
                        <div className="grid grid-cols-1 gap-3">
                          {selectedPkg.features.map((feature, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-start gap-2.5 p-3 rounded-lg bg-surface border border-base/50 hover:border-[var(--primary)]/30 transition-colors"
                            >
                              <Check className="h-4 w-4 flex-shrink-0 mt-0.5 text-[var(--primary)]" strokeWidth={2.5} />
                              <span className="text-sm text-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Note if exists */}
                      {selectedPkg.note && (
                        <div className="p-4 rounded-xl bg-[var(--primary)]/5 border border-[var(--primary)]/10">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            <span className="font-semibold text-foreground">💡 </span>
                            {selectedPkg.note}
                          </p>
                        </div>
                      )}

                      {/* Disclaimer */}
                      <div className="mt-6 pt-6 border-t border-base">
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          Final pricing may vary based on specific requirements, additional features, and project complexity.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full p-6">
                      <p className="text-sm text-muted-foreground text-center">
                        Select a package to see the details
                      </p>
                    </div>
                  )}
                </div>

                {/* Continue Button - Fixed at Bottom */}
                <div className="p-4 sm:p-6 border-t border-base flex-shrink-0">
                  <button
                    onClick={handleContinue}
                    disabled={!selectedPackage}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                  >
                    Continue
                    <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
                  </button>
                </div>
              </motion.div>
            </SectionReveal>

            {/* Mobile Summary Card - Shows on mobile when package is selected */}
            {selectedPkg && (
              <div className="lg:hidden mt-4">
                <div className="rounded-xl border border-base bg-surface p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">Selected Package</p>
                      <h4 className="text-base font-bold text-foreground">{selectedPkg.name}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground mb-1">Price</p>
                      <p className="text-lg font-bold text-[var(--primary)]">{selectedPkg.displayPrice}</p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedPkg.description}</p>
                </div>
                <button
                  onClick={handleContinue}
                  disabled={!selectedPackage}
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

export default function MobileAppPackagesPage() {
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
      <MobileAppPackagesContent />
    </Suspense>
  )
}
