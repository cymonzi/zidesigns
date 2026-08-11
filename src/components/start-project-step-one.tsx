"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Check, ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"

type MainService = "graphic-design" | "website" | "mobile-app" | "saas"

interface MainServiceOption {
  id: MainService
  number: string
  title: string
  description: string
}

const MAIN_SERVICES: MainServiceOption[] = [
  {
    id: "graphic-design",
    number: "01",
    title: "Graphic & Brand Design",
    description: "Visual identities and creative assets that make brands distinctive and consistent."
  },
  {
    id: "website",
    number: "02",
    title: "Website Development",
    description: "Professional websites that help businesses establish credibility and grow online."
  },
  {
    id: "saas",
    number: "03",
    title: "Web Apps & SaaS",
    description: "Custom digital products built to solve problems, streamline processes, and scale."
  },
  {
    id: "mobile-app",
    number: "04",
    title: "Mobile App Development",
    description: "Custom Android and iOS applications designed for engagement and growth."
  }
]

interface DesignService {
  id: string
  name: string
  price: number
  displayPrice: string
}

const GRAPHIC_SERVICES: DesignService[] = [
  { id: "posters-flyers", name: "Posters & Flyers", price: 20000, displayPrice: "UGX 20,000" },
  { id: "certificates", name: "Certificates", price: 20000, displayPrice: "UGX 20,000" },
  { id: "cv-design", name: "CV Design", price: 50000, displayPrice: "UGX 50,000" },
  { id: "logo-design", name: "Logo Design", price: 50000, displayPrice: "UGX 50,000" },
  { id: "presentations", name: "Presentations", price: 100000, displayPrice: "UGX 100,000" },
  { id: "company-profiles", name: "Company Profiles", price: 100000, displayPrice: "UGX 100,000" },
  { id: "magazine-design", name: "Magazine Design", price: 100000, displayPrice: "UGX 100,000" },
]

interface PackageOption {
  id: string
  number: string
  name: string
  price: number
  displayPrice: string
  description: string
  features: string[]
  note?: string
}

const WEBSITE_PACKAGES: PackageOption[] = [
  {
    id: "starter",
    number: "01",
    name: "Starter Website",
    price: 750000,
    displayPrice: "UGX 750,000",
    description: "For individuals and small businesses that need a professional online presence.",
    features: [
      "Custom responsive website",
      "Up to 3 pages",
      "Contact & WhatsApp integration",
      "Basic SEO setup",
      "Domain included",
      "Deployment"
    ]
  },
  {
    id: "business",
    number: "02",
    name: "Business Website",
    price: 1500000,
    displayPrice: "UGX 1,500,000",
    description: "For businesses and organizations that need a more complete online presence.",
    features: [
      "Everything in Starter",
      "Up to 6–8 pages",
      "Custom layouts & sections",
      "Gallery / portfolio",
      "Contact forms",
      "Google Maps integration",
      "Google Analytics",
      "Enhanced SEO",
      "Hosting included",
      "Business email setup",
      "Post-launch support"
    ]
  },
  {
    id: "platform",
    number: "03",
    name: "Web Platform",
    price: 3000000,
    displayPrice: "UGX 3,000,000",
    description: "For businesses that need a website with interactive functionality.",
    features: [
      "Custom web application / PWA",
      "User login",
      "Basic dashboard",
      "Basic admin panel",
      "Database",
      "Custom forms",
      "Basic integrations",
      "Deployment"
    ],
    note: "Best for: portals, booking systems, client dashboards, and internal business tools."
  }
]

const MOBILE_PACKAGES: PackageOption[] = [
  {
    id: "starter",
    number: "01",
    name: "Mobile App Starter",
    price: 5000000,
    displayPrice: "UGX 5,000,000",
    description: "For simple apps and MVPs.",
    features: [
      "Up to 8 screens",
      "Android or iOS (single platform)",
      "User login",
      "Basic database",
      "Core app functionality",
      "Basic API integration",
      "App deployment"
    ]
  },
  {
    id: "business",
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
      "App deployment",
      "Post-launch support"
    ]
  },
  {
    id: "advanced",
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
    ]
  }
]

const SAAS_PACKAGES: PackageOption[] = [
  {
    id: "mvp",
    number: "01",
    name: "SaaS MVP",
    price: 5000000,
    displayPrice: "UGX 5,000,000",
    description: "For startups turning an idea into a working software product.",
    features: [
      "User accounts",
      "Core product features",
      "User dashboard",
      "Admin dashboard",
      "Database",
      "Basic payments",
      "Basic notifications",
      "Deployment"
    ]
  },
  {
    id: "business",
    number: "02",
    name: "Business SaaS",
    price: 10000000,
    displayPrice: "UGX 10,000,000",
    description: "For businesses ready to operate a complete software platform.",
    features: [
      "Everything in SaaS MVP",
      "Multiple user roles",
      "Advanced dashboards",
      "Subscription & payment systems",
      "Advanced workflows",
      "Third-party integrations",
      "Analytics & reporting",
      "Custom admin tools",
      "Post-launch support"
    ]
  },
  {
    id: "enterprise",
    number: "03",
    name: "Enterprise SaaS",
    price: 20000000,
    displayPrice: "UGX 20,000,000",
    description: "For complex platforms built for scale.",
    features: [
      "Everything in Business SaaS",
      "Multi-tenant architecture",
      "Advanced permissions",
      "Custom APIs & integrations",
      "Automation",
      "AI functionality where required",
      "Real-time features",
      "Advanced security",
      "Scalable infrastructure",
      "Documentation & training",
      "Extended support"
    ]
  }
]

export function StartProjectStepOne() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedMainService, setSelectedMainService] = useState<MainService | null>(null)

  // Determine where the user came from
  const from = searchParams.get('from') || 'home'
  
  // Generate back button label and destination
  const getBackNavigation = () => {
    if (from === 'home') {
      return { label: 'Back to Home', destination: '/' }
    }
    // Default fallback
    return { label: 'Back to Get Started', destination: '/' }
  }

  const backNav = getBackNavigation()

  const handleContinue = () => {
    if (!selectedMainService) return
    
    // Map service to package page and service display name
    const serviceRoutes = {
      'graphic-design': { route: '/graphic-design-packages', name: 'Graphic & Brand Design' },
      'website': { route: '/website-packages', name: 'Website Development' },
      'mobile-app': { route: '/mobile-app-packages', name: 'Mobile App Development' },
      'saas': { route: '/saas-packages', name: 'Web Apps & SaaS' }
    }
    
    const serviceInfo = serviceRoutes[selectedMainService]
    if (serviceInfo) {
      // Pass the service name so package page knows where user came from
      router.push(`${serviceInfo.route}?from=${encodeURIComponent(serviceInfo.name)}`)
    }
  }

  const isValid = () => {
    return !!selectedMainService
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-col min-h-0">
      {/* Back Button - Top Left */}
      <button
        onClick={() => router.push(backNav.destination)}
        className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-[var(--primary)] transition-colors mb-3 sm:mb-4 w-fit"
      >
        <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        {backNav.label}
      </button>

      {/* 2-Column Layout - Stacks on mobile */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-4 sm:gap-6 flex-1 min-h-0">
        {/* Left Panel - Service Selection */}
        <div className="flex flex-col overflow-hidden max-h-[350px] sm:max-h-[400px]">
          <div className="mb-3 sm:mb-4 flex-shrink-0">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider">
              Our Services
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar min-h-0">
            {/* Main Service Selection */}
            <div className="space-y-2 sm:space-y-3">
              {MAIN_SERVICES.map((service, index) => {
                const isSelected = selectedMainService === service.id
                return (
                  <motion.button
                    key={service.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.06, duration: 0.3 }}
                    onClick={() => {
                      setSelectedMainService(service.id)
                    }}
                    className={`w-full group rounded-xl sm:rounded-2xl border transition-all p-3 sm:p-4 md:p-5 text-left ${
                      isSelected
                        ? "border-[var(--primary)] bg-[var(--primary)]/5 shadow-sm"
                        : "border-base bg-surface hover:bg-surface-alt hover:border-[var(--primary)]/40"
                    }`}
                  >
                    <div className="flex items-start gap-2.5 sm:gap-3 md:gap-4">
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
                        <div className="flex items-baseline gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                          <span className="text-[10px] sm:text-xs font-bold text-muted-foreground opacity-60">
                            {service.number}
                          </span>
                          <h4 className={`text-sm sm:text-base font-bold transition-colors ${
                            isSelected ? "text-[var(--primary)]" : "text-foreground"
                          }`}>
                            {service.title}
                          </h4>
                        </div>

                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                )
              })}
            </div>
          </div>
        </div>

        {/* Right Panel - Service Info (Read-only) - Hidden on mobile, shown on lg+ */}
        <div className="hidden lg:flex rounded-2xl border border-base bg-surface flex-col overflow-hidden max-h-[400px]">
          <div className="p-4 sm:p-6 border-b border-base flex-shrink-0">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider">
              Service Details
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 min-h-0">
            {!selectedMainService ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <div className="w-16 h-16 rounded-full bg-surface-alt border border-base flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-sm text-muted-foreground">
                  Select a service to see details
                </p>
              </div>
            ) : selectedMainService === "graphic-design" ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-[var(--primary)] mb-2">
                    Graphic & Brand Design
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Visual identities and creative assets that make brands distinctive and consistent.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Available Services
                  </h5>
                  <div className="space-y-2">
                    {GRAPHIC_SERVICES.map((service) => (
                      <div 
                        key={service.id}
                        className="flex items-center justify-between text-sm p-3 rounded-lg bg-surface-alt/50 border border-base/30"
                      >
                        <span className="text-foreground">{service.name}</span>
                        <span className="font-semibold text-muted-foreground">{service.displayPrice}</span>
                      </div>
                    ))}
                    <div className="flex items-center justify-between text-sm p-3 rounded-lg bg-surface-alt/50 border border-base/30">
                      <span className="text-foreground">Other / Custom</span>
                      <span className="font-semibold text-muted-foreground">Quote</span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-base">
                  <div className="flex items-center gap-2 text-sm text-[var(--primary)] bg-[var(--primary)]/5 p-4 rounded-lg border border-[var(--primary)]/20">
                    <ArrowRight className="h-5 w-5 flex-shrink-0" />
                    <p className="font-medium">
                      Click Continue to select your desired design services
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedMainService === "website" ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-[var(--primary)] mb-2">
                    Website Development
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Professional websites that help businesses establish credibility and grow online.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Available Packages
                  </h5>
                  <div className="space-y-3">
                    {WEBSITE_PACKAGES.map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="p-4 rounded-lg bg-surface-alt/50 border border-base/30"
                      >
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-xs font-bold text-muted-foreground opacity-60">
                            {pkg.number}
                          </span>
                          <h6 className="text-base font-bold text-foreground">
                            {pkg.name}
                          </h6>
                        </div>
                        <p className="text-sm font-semibold text-[var(--primary)] mb-2">
                          {pkg.displayPrice}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {pkg.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-base">
                  <div className="flex items-center gap-2 text-sm text-[var(--primary)] bg-[var(--primary)]/5 p-4 rounded-lg border border-[var(--primary)]/20">
                    <ArrowRight className="h-5 w-5 flex-shrink-0" />
                    <p className="font-medium">
                      Click Continue to select your website package
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedMainService === "mobile-app" ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-[var(--primary)] mb-2">
                    Mobile App Development
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Custom Android and iOS applications designed for engagement and growth.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Available Packages
                  </h5>
                  <div className="space-y-3">
                    {MOBILE_PACKAGES.map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="p-4 rounded-lg bg-surface-alt/50 border border-base/30"
                      >
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-xs font-bold text-muted-foreground opacity-60">
                            {pkg.number}
                          </span>
                          <h6 className="text-base font-bold text-foreground">
                            {pkg.name}
                          </h6>
                        </div>
                        <p className="text-sm font-semibold text-[var(--primary)] mb-2">
                          {pkg.displayPrice}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {pkg.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-base">
                  <div className="flex items-center gap-2 text-sm text-[var(--primary)] bg-[var(--primary)]/5 p-4 rounded-lg border border-[var(--primary)]/20">
                    <ArrowRight className="h-5 w-5 flex-shrink-0" />
                    <p className="font-medium">
                      Click Continue to select your mobile app package
                    </p>
                  </div>
                </div>
              </div>
            ) : selectedMainService === "saas" ? (
              <div className="space-y-6">
                <div>
                  <h4 className="text-lg font-bold text-[var(--primary)] mb-2">
                    Web Apps & SaaS
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Custom digital products built to solve problems, streamline processes, and scale.
                  </p>
                </div>

                <div className="space-y-3">
                  <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Available Packages
                  </h5>
                  <div className="space-y-3">
                    {SAAS_PACKAGES.map((pkg) => (
                      <div 
                        key={pkg.id}
                        className="p-4 rounded-lg bg-surface-alt/50 border border-base/30"
                      >
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-xs font-bold text-muted-foreground opacity-60">
                            {pkg.number}
                          </span>
                          <h6 className="text-base font-bold text-foreground">
                            {pkg.name}
                          </h6>
                        </div>
                        <p className="text-sm font-semibold text-[var(--primary)] mb-2">
                          {pkg.displayPrice}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {pkg.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-base">
                  <div className="flex items-center gap-2 text-sm text-[var(--primary)] bg-[var(--primary)]/5 p-4 rounded-lg border border-[var(--primary)]/20">
                    <ArrowRight className="h-5 w-5 flex-shrink-0" />
                    <p className="font-medium">
                      Click Continue to select your SaaS package
                    </p>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {/* Continue Button */}
          <div className="p-4 sm:p-6 border-t border-base flex-shrink-0">
            <button
              onClick={handleContinue}
              disabled={!isValid()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              Continue
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Mobile Continue Button - Shows on mobile when service is selected */}
        {selectedMainService && (
          <div className="lg:hidden mt-4">
            <button
              onClick={handleContinue}
              disabled={!isValid()}
              className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg"
            >
              Continue
              <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
