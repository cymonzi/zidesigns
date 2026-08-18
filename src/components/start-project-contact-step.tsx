"use client"

import { motion } from "framer-motion"

interface SummaryRowProps {
  label: string
  value: string
}

function SummaryRow({ label, value }: SummaryRowProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl bg-surface border border-base p-4">
      <span className="text-sm text-muted">{label}</span>
      <span className="text-sm font-semibold text-fg text-right">{value}</span>
    </div>
  )
}

interface StartProjectContactStepProps {
  // Contact form state
  name: string
  setName: (value: string) => void
  phone: string
  setPhone: (value: string) => void
  email: string
  setEmail: (value: string) => void
  company: string
  setCompany: (value: string) => void
  preferredContact: string | null
  setPreferredContact: (value: string | null) => void
  
  // Validation state
  nameTouched: boolean
  setNameTouched: (value: boolean) => void
  phoneTouched: boolean
  setPhoneTouched: (value: boolean) => void
  emailTouched: boolean
  setEmailTouched: (value: boolean) => void
  nameValid: boolean
  phoneValid: boolean
  emailValid: boolean
  
  // Summary data
  selectedService: string | null
  displayedService: string | null
  selectedPrice: string | null
  hasFreePosterBonus?: boolean
  
  // Form submission
  isPhase2Valid: boolean
  submitting: boolean
  submitError: string | null
  onBack: () => void
  onSubmit: () => void
}

export function StartProjectContactStep({
  name,
  setName,
  phone,
  setPhone,
  email,
  setEmail,
  company,
  setCompany,
  preferredContact,
  setPreferredContact,
  nameTouched,
  setNameTouched,
  phoneTouched,
  setPhoneTouched,
  emailTouched,
  setEmailTouched,
  nameValid,
  phoneValid,
  emailValid,
  selectedService,
  displayedService,
  selectedPrice,
  hasFreePosterBonus = false,
  isPhase2Valid,
  submitting,
  submitError,
  onBack,
  onSubmit,
}: StartProjectContactStepProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-h-0 flex flex-col">
      {/* Back Button - Top Left (outside cards) */}
      <button
        onClick={onBack}
        className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-[var(--primary)] transition-colors mb-3 sm:mb-4 w-fit"
      >
        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Packages
      </button>

      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Your details</h3>

      {/* 2-Column Layout - Stacks on mobile */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-4 sm:gap-6 flex-1 min-h-0">
        {/* Left Panel - Contact Form */}
        <div className="rounded-xl sm:rounded-2xl border border-base/40 bg-surface/30 backdrop-blur-sm p-3 sm:p-4 md:p-6 flex flex-col overflow-hidden">
          <div className="overflow-y-auto pr-1 sm:pr-2 custom-scrollbar flex-1">
            <div className="space-y-3 sm:space-y-4 pb-4">
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Name *</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    placeholder="Your name (first or preferred)"
                    aria-invalid={!nameValid}
                    className="w-full rounded-lg sm:rounded-xl border border-base bg-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                  {nameTouched && !nameValid && (
                    <p className="text-[10px] sm:text-xs text-red-500 mt-1">Please enter your name (first or preferred name is fine).</p>
                  )}
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => setPhoneTouched(true)}
                    placeholder="Phone Number (e.g., +2567...)"
                    aria-invalid={!phoneValid}
                    className="w-full rounded-lg sm:rounded-xl border border-base bg-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                  {phoneTouched && !phoneValid && (
                    <p className="text-[10px] sm:text-xs text-red-500 mt-1">Enter a valid phone number (7–15 digits).</p>
                  )}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => setEmailTouched(true)}
                    placeholder="Email Address"
                    aria-invalid={!emailValid}
                    className="w-full rounded-lg sm:rounded-xl border border-base bg-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20"
                  />
                  {emailTouched && !emailValid && (
                    <p className="text-[10px] sm:text-xs text-red-500 mt-1">Please enter a valid email address.</p>
                  )}
                </div>

                <div>
                  <label className="text-xs sm:text-sm font-semibold mb-1.5 sm:mb-2 block">Company (optional)</label>
                  <input 
                    value={company} 
                    onChange={(e) => setCompany(e.target.value)} 
                    placeholder="Company / Organisation" 
                    className="w-full rounded-lg sm:rounded-xl border border-base bg-surface px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 opacity-80" 
                  />
                </div>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-base/50">
                <label className="text-xs sm:text-sm font-semibold mb-2 sm:mb-3 block">Preferred contact method</label>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {['WhatsApp', 'Email', 'Phone Call'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPreferredContact(m)}
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full border transition-all ${
                        preferredContact === m 
                          ? 'bg-[var(--primary)] text-black border-transparent shadow-sm' 
                          : 'bg-surface text-fg border-base hover:border-[var(--primary)]/40'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Summary - Hidden on mobile */}
        <div className="hidden lg:flex rounded-2xl border border-base bg-surface flex-col overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-base flex-shrink-0">
            <h3 className="text-xs sm:text-sm font-semibold text-foreground uppercase tracking-wider">
              Summary
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 sm:p-6 min-h-0">
            <div className="space-y-3">
              {selectedService && <SummaryRow label="Service" value={displayedService ?? selectedService} />}
              {selectedPrice && <SummaryRow label="Price" value={selectedPrice} />}
              {hasFreePosterBonus && (
                <div className="flex items-start justify-between gap-4 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 p-4">
                  <span className="text-sm text-fg flex items-center gap-2">
                    <span className="text-lg">🎁</span>
                    Bonus
                  </span>
                  <span className="text-sm font-semibold text-[var(--primary)] text-right">FREE Poster</span>
                </div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="p-4 sm:p-6 border-t border-base flex-shrink-0">
            <div className="flex flex-col gap-3">
              {submitError && (
                <p className="text-xs text-red-500">{submitError}</p>
              )}
              <button
                disabled={!isPhase2Valid || submitting}
                onClick={onSubmit}
                className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
              >
                {submitting ? "Sending..." : "Submit"}
                <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Summary & Submit - Shows on mobile */}
        <div className="lg:hidden mt-4">
          {/* Mobile Summary Card */}
          {(selectedService || selectedPrice) && (
            <div className="rounded-xl border border-base bg-surface p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Summary</p>
              <div className="space-y-2">
                {selectedService && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-muted-foreground">Service</span>
                    <span className="text-xs font-semibold text-foreground text-right">{displayedService ?? selectedService}</span>
                  </div>
                )}
                {selectedPrice && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-muted-foreground">Price</span>
                    <span className="text-base font-bold text-[var(--primary)] text-right">{selectedPrice}</span>
                  </div>
                )}
                {hasFreePosterBonus && (
                  <div className="flex items-start justify-between gap-4 pt-2 mt-2 border-t border-[var(--primary)]/30 bg-[var(--primary)]/5 -mx-4 -mb-4 px-4 pb-4 rounded-b-xl">
                    <span className="text-xs text-fg flex items-center gap-2">
                      <span>🎁</span>
                      Bonus
                    </span>
                    <span className="text-xs font-semibold text-[var(--primary)] text-right">FREE Poster</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Submit Button */}
          <div className="flex flex-col gap-3">
            {submitError && (
              <p className="text-xs text-red-500">{submitError}</p>
            )}
            <button
              disabled={!isPhase2Valid || submitting}
              onClick={onSubmit}
              className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] shadow-lg"
            >
              {submitting ? "Sending..." : "Submit"}
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
