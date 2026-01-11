"use client";

import { motion } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { Check } from "lucide-react";

const tiers = [
  {
    name: 'Starter',
    price: 'Free',
    tagline: 'Experiment & learn',
    popular: false,
    features: [
      'Community support',
      '3 sandbox projects',
      'Basic templates',
      'Limited AI prompts',
      'Public portfolio'
    ]
  },
  {
    name: 'Pro',
    price: '$29',
    tagline: 'Ship client work faster',
    popular: true,
    features: [
      'Unlimited projects',
      'Private templates',
      'Advanced AI tooling',
      'Priority support',
      'Analytics dashboard',
      '1:1 design critique (monthly)'
    ]
  },
  {
    name: 'Studio',
    price: '$89',
    tagline: 'Scale creative output',
    popular: false,
    features: [
      'Team collaboration',
      'Shared component kits',
      'Custom AI models',
      'Design system audits',
      'Quarterly strategy call',
      'Priority roadmap influence'
    ]
  }
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-32">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="orb orb-accent w-[26rem] h-[26rem] top-1/3 -left-40" />
        <div className="orb orb-accent w-[18rem] h-[18rem] bottom-10 right-0 opacity-70" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-fg text-4xl font-bold tracking-tight">Flexible tiers that grow with you</h2>
          <p className="mt-5 text-muted text-lg">Simple tiers for individuals, pros, and studios. Transparent value—no hidden surprises.</p>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          {tiers.map((tier, i) => (
            <TiltCard
              key={tier.name}
              className={`relative flex flex-col rounded-2xl border p-6 backdrop-blur-xl ${tier.popular ? 'border-[var(--primary)]/50 bg-surface-alt/80 shadow-[0_0_0_1px_var(--primary),0_8px_40px_-8px_rgba(64,224,208,0.3)]' : 'border-base bg-surface/70'} overflow-hidden`}
              maxTilt={14}
              hoverScale={1.04}
              delay={i * 0.08}
            >
              {tier.popular && (
                <div className="absolute -top-3 right-4 bg-[var(--primary)] text-white text-[10px] font-semibold tracking-wide px-3 py-1 rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.15)]">MOST POPULAR</div>
              )}
              <div className="mb-5">
                <h3 className="text-fg font-semibold text-xl tracking-tight">{tier.name}</h3>
                <p className="mt-2 text-muted text-sm">{tier.tagline}</p>
              </div>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-bold text-fg">{tier.price}</span>
                {tier.price !== 'Free' && <span className="text-muted text-sm">/mo</span>}
              </div>
              <ul className="space-y-3 text-sm flex-1">
                {tier.features.map(f => (
                  <li key={f} className="flex items-start gap-3 text-muted">
                    <span className="mt-0.5 rounded-md bg-[var(--primary)]/15 p-1 text-[var(--primary)]">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <button className={`w-full relative inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-medium transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] ${tier.popular ? 'bg-[var(--primary)] text-white shadow-[0_4px_30px_-5px_rgba(64,224,208,0.5)] hover:shadow-[0_4px_35px_-4px_rgba(64,224,208,0.65)]' : 'bg-surface-alt hover:bg-surface border border-base text-fg'}`}>Get started</button>
              </div>
              {tier.popular && (
                <motion.div
                  aria-hidden
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: .4 }}
                >
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-[var(--primary)]/40" />
                  <div className="absolute -inset-px rounded-2xl border border-[var(--primary)]/30" style={{ mask: 'linear-gradient(white,transparent 60%)' }} />
                </motion.div>
              )}
            </TiltCard>
          ))}
        </div>

        <div className="mt-14 text-center">
          <p className="text-sm text-muted">Need something more bespoke? <a href="#contact" className="text-[var(--primary)] underline-offset-4 hover:underline">Talk to us about custom engagements</a>.</p>
        </div>
      </div>
    </section>
  );
}
