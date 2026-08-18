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

interface StartProjectConfirmStepProps {
  selectedCategory: string | null
  selectedService: string | null
  displayedService: string | null
  budget: string | null
  displayedBudget: string | null
  name: string
  phone: string
  email: string
  company: string
  preferredContact: string | null
  hasFreePosterBonus?: boolean
  onNewRequest: () => void
  onDownload: () => void
}

export function StartProjectConfirmStep({
  selectedCategory,
  selectedService,
  displayedService,
  budget,
  displayedBudget,
  name,
  phone,
  email,
  company,
  preferredContact,
  hasFreePosterBonus = false,
  onNewRequest,
  onDownload,
}: StartProjectConfirmStepProps) {
  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="flex-1 min-h-0 flex flex-col">
      {/* Request Another Project Button - Top Left (outside cards) */}
      <button
        onClick={onNewRequest}
        className="inline-flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-medium text-muted-foreground hover:text-[var(--primary)] transition-colors mb-3 sm:mb-4 w-fit"
      >
        <svg className="h-3.5 w-3.5 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Request another project
      </button>

      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Request Submitted</h3>

      {/* 2-Column Layout - Stacks on mobile */}
      <div className="grid lg:grid-cols-[1fr_400px] gap-4 sm:gap-6 flex-1 min-h-0">
        {/* Left Panel - Next Steps */}
        <div className="rounded-xl sm:rounded-2xl border border-base/40 bg-surface/30 backdrop-blur-sm p-3 sm:p-4 md:p-6 flex flex-col overflow-hidden max-h-[350px] sm:max-h-[400px]">
          <div className="overflow-y-auto pr-1 sm:pr-2 custom-scrollbar flex-1">
            <div className="space-y-4 sm:space-y-6">
              <div>
                <p className="text-xs sm:text-sm md:text-base text-muted leading-relaxed">
                  Your request is with the team now. We will review the details and follow up within 24 hours to finalize scope, pricing, and next steps.
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-base/50">
                <p className="text-xs sm:text-sm font-semibold text-fg mb-2 sm:mb-3">What happens next</p>
                <ol className="list-inside list-decimal space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted">
                  <li className="font-semibold">We review your request and scope.</li>
                  <li className="font-semibold">We reach out within 24 hours.</li>
                  <li className="font-semibold">We prepare a proposal or next step plan.</li>
                </ol>
              </div>

              <div className="rounded-xl sm:rounded-2xl bg-surface-alt/50 border border-base/30 p-3 sm:p-4">
                <p className="text-xs sm:text-sm font-semibold text-fg mb-2 sm:mb-3">Quick contact options</p>
                <div className="flex flex-col gap-1.5 sm:gap-2 text-[10px] sm:text-xs md:text-sm">
                  <a href="https://wa.me/256782062673" className="text-[var(--primary)] break-all hover:underline">WhatsApp: +256 782 062673</a>
                  <a href="mailto:zidesigns001@gmail.com" className="text-fg break-all hover:text-[var(--primary)] transition-colors">Email: zidesigns001@gmail.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Summary & Download - Hidden on mobile */}
        <div className="hidden lg:flex rounded-2xl border border-base bg-surface flex-col overflow-hidden max-h-[400px]">
          <div className="p-6 border-b border-base flex-shrink-0">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
              Summary
            </h3>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar p-6 min-h-0">
            {selectedService ? (
              <div className="space-y-3">
                {name && <SummaryRow label="Name" value={name} />}
                {phone && <SummaryRow label="Phone" value={phone} />}
                {email && <SummaryRow label="Email" value={email} />}
                {company && <SummaryRow label="Company" value={company} />}
                {preferredContact && <SummaryRow label="Preferred" value={preferredContact} />}
                {selectedService && <SummaryRow label="Service" value={displayedService ?? selectedService} />}
                {budget && <SummaryRow label="Total Price" value={displayedBudget ?? budget} />}
                {hasFreePosterBonus && (
                  <div className="flex items-start justify-between gap-4 rounded-2xl bg-[var(--primary)]/10 border border-[var(--primary)]/30 p-4">
                    <span className="text-sm text-fg flex items-center gap-2">
                      <span className="text-lg">🎁</span>
                      First-Time Bonus
                    </span>
                    <span className="text-sm font-semibold text-[var(--primary)] text-right">FREE Poster/Flyer</span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <p className="text-sm text-muted-foreground">
                  No service selected
                </p>
              </div>
            )}
          </div>

          {/* Download Button */}
          <div className="p-4 sm:p-6 border-t border-base flex-shrink-0">
            <button
              onClick={onDownload}
              className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 active:scale-[0.98]"
            >
              Download summary
              <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Summary & Download - Shows on mobile */}
        <div className="lg:hidden mt-4">
          {/* Mobile Summary Card */}
          {selectedService && (
            <div className="rounded-xl border border-base bg-surface p-4 mb-4">
              <p className="text-xs text-muted-foreground mb-3 font-semibold uppercase tracking-wider">Your Request</p>
              <div className="space-y-2">
                {name && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-muted-foreground">Name</span>
                    <span className="text-xs font-semibold text-foreground text-right">{name}</span>
                  </div>
                )}
                {selectedService && (
                  <div className="flex items-start justify-between gap-4">
                    <span className="text-xs text-muted-foreground">Service</span>
                    <span className="text-xs font-semibold text-foreground text-right">{displayedService ?? selectedService}</span>
                  </div>
                )}
                {displayedBudget && (
                  <div className="flex items-start justify-between gap-4 pt-2 border-t border-base/50">
                    <span className="text-xs text-muted-foreground">Total Price</span>
                    <span className="text-base font-bold text-[var(--primary)] text-right">{displayedBudget}</span>
                  </div>
                )}
                {hasFreePosterBonus && (
                  <div className="flex items-start justify-between gap-4 pt-2 mt-2 border-t border-[var(--primary)]/30 bg-[var(--primary)]/5 -mx-4 -mb-4 px-4 pb-4 rounded-b-xl">
                    <span className="text-xs text-fg flex items-center gap-2">
                      <span>🎁</span>
                      Bonus
                    </span>
                    <span className="text-xs font-semibold text-[var(--primary)] text-right">FREE Poster/Flyer</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Download Button */}
          <button
            onClick={onDownload}
            className="w-full inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-[var(--primary)] text-black text-xs sm:text-sm font-semibold transition hover:bg-[var(--primary)]/90 active:scale-[0.98] shadow-lg"
          >
            Download summary
            <svg className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        </div>
      </div>
    </motion.div>
  )
}
