"use client"

import { ArrowRight, Radio } from "lucide-react"
import { motion } from "framer-motion"

const CYMONZI_URL = "https://cymonzi-site.vercel.app/"

const disciplines = [
  "New Wave UG",
  "Sonic Architecture",
  "Original Music",
  "Visual Direction",
  "Global Frequencies",
]

const FREQ_BARS = [
  0.35, 0.7, 0.45, 0.9, 0.55, 0.8, 0.3, 0.95, 0.6, 0.85, 0.4, 0.75, 0.5, 0.88,
  0.42, 0.68,
]

export function CymonziSpotlight() {
  return (
    <section
      id="cymonzi"
      aria-labelledby="cymonzi-spotlight-heading"
      className="py-16 sm:py-24 bg-page/80 backdrop-blur-lg border-t border-base scroll-mt-20"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden rounded-3xl border border-base bg-surface p-7 sm:p-10 lg:p-12 shadow-sm"
        >
          {/* Subtle architectural coordinate grid overlay (from cymonzi_site) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(64,224,208,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(64,224,208,0.05)_1px,transparent_1px)] bg-[size:48px_48px] opacity-60"
          />

          {/* Subtle ambient accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[var(--primary)]/10 blur-3xl"
          />

          {/* Corner HUD Crosshair Ticks */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-3 font-mono text-xs text-[var(--primary)]/70"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-3.5 top-3 font-mono text-xs text-[var(--primary)]/70"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-3.5 font-mono text-xs text-[var(--primary)]/70"
          >
            +
          </span>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 right-3.5 font-mono text-xs text-[var(--primary)]/70"
          >
            +
          </span>

          {/* Top Telemetry Bar */}
          <div className="relative mb-7 flex flex-wrap items-center justify-between gap-3 border-b border-base pb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-base bg-surface-alt text-xs font-medium text-muted tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--primary)] animate-pulse" />
              Creative Direction &amp; Sound
            </div>
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.14em] text-muted">
              LOC // 0.3476° N, 32.5825° E · KAMPALA, UG
            </span>
          </div>

          <div className="relative grid grid-cols-1 lg:grid-cols-[1.35fr_0.65fr] gap-8 lg:gap-12 items-start lg:items-center">
            {/* Left: Editorial Copy */}
            <div className="space-y-5">
              <h2
                id="cymonzi-spotlight-heading"
                className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-fg leading-tight"
              >
                Sonic Architecture:{" "}
                <span className="text-[var(--primary)]">Cymonzi</span>
              </h2>

              <p className="text-base text-muted leading-relaxed max-w-2xl">
                Beyond client systems and digital products, our creative
                direction extends into original music. Cymonzi is a
                Kampala-based artist and sonic architect offering a distinct
                interpretation of New Wave UG, bridging memory, city energy,
                and global frequencies without creative borders.
              </p>

              <ul className="flex flex-wrap gap-2 pt-1">
                {disciplines.map((item) => (
                  <li
                    key={item}
                    className="px-3 py-1 rounded-full bg-surface-alt border border-base text-xs font-medium text-fg transition-colors hover:border-[var(--primary)]/50"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: Futuristic Telemetry Module + Waveform + CTA */}
            <div className="relative flex flex-col justify-between gap-5 rounded-2xl border border-base bg-surface-alt/80 p-6 sm:p-7 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    SOUND_ID // NEW WAVE UG
                  </p>
                  <p className="mt-1 text-lg font-bold tracking-tight text-fg">
                    CYMONZI
                  </p>
                </div>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-base bg-surface text-[var(--primary)]">
                  <Radio className="h-4 w-4" />
                </div>
              </div>

              {/* Reactive Minimalist CSS Waveform Bars */}
              <div className="rounded-xl border border-base bg-surface/70 px-3.5 py-3">
                <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
                  <span>SIGNAL // ACTIVE</span>
                  <span className="text-[var(--primary)]">KLA · 24FPS</span>
                </div>
                <div
                  aria-hidden="true"
                  className="flex h-7 items-end justify-between gap-1"
                >
                  {FREQ_BARS.map((height, idx) => (
                    <span
                      key={idx}
                      className="waveform-bar w-full rounded-full bg-[var(--primary)]/80"
                      style={{
                        height: `${Math.round(height * 100)}%`,
                        animationDelay: `${idx * 90}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              <a
                href={CYMONZI_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-semibold text-black hover:bg-[var(--primary)]/85 active:scale-[0.98] transition-all"
              >
                Enter Artist Hub
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
