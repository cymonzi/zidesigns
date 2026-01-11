"use client";

import { motion } from 'framer-motion';
import { Users2 } from 'lucide-react';
import { TiltCard } from '@/components/ui/tilt-card';

export function SoftFeatureShowcase() {
  return (
    <section id="features" className="relative py-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-fg">Clarity & comfort surfaces</h2>
          <p className="mt-4 text-lg text-muted">Soft depth cards with subtle inner light—adapted from neumorphic inspiration while preserving accessibility and contrast.</p>
        </div>

        <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
          {/* Dial Card */}
          <TiltCard className="soft-card p-8 flex flex-col" maxTilt={10} hoverScale={1.03} glare={false}>
            <div className="soft-dial">
              <div className="soft-dial-indicator" />
              <div className="soft-dial-knob" />
            </div>
            <h3 className="text-lg font-semibold text-fg mb-2">Real-Time Analytics</h3>
            <p className="text-sm leading-6 text-muted">Stay ahead with accurate, real-time performance tracking</p>
          </TiltCard>

          {/* Bar Chart Card */}
          <TiltCard className="soft-card p-8 flex flex-col relative" maxTilt={10} hoverScale={1.03} glare={false}>
            <div className="flex items-center justify-between mb-6">
              <span className="soft-pill-bar">80% Automation</span>
              <span className="soft-pill-bar">10% Cost</span>
            </div>
            <div className="flex gap-4 mb-8 items-end h-48">
              {([42,80,60,48,34] as number[]).map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ scaleY: 0, opacity: 0 }}
                  whileInView={{ scaleY: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ delay: 0.05 * i, duration: 0.6, ease: [0.16,0.84,0.44,1] }}
                  className="soft-bar-col origin-bottom"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <h3 className="text-lg font-semibold text-fg mb-2">AI-Driven Growth</h3>
            <p className="text-sm leading-6 text-muted">Make smarter moves with accurate, real-time business insights.</p>
          </TiltCard>

          {/* Icon Badge Card */}
          <TiltCard className="soft-card p-8 flex flex-col items-start" maxTilt={10} hoverScale={1.03} glare={false}>
            <div className="w-20 h-20 rounded-full relative mb-8 flex items-center justify-center" style={{background: 'linear-gradient(var(--surface-alt), var(--surface))', boxShadow: '0 8px 18px -6px rgba(0,0,0,0.08), 0 2px 0 rgba(255,255,255,0.5) inset, 0 -2px 0 rgba(0,0,0,0.05) inset'}}>
              <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{background: 'linear-gradient(var(--surface), var(--surface-alt))', boxShadow: '0 4px 10px -4px rgba(0,0,0,0.1), 0 1px 0 rgba(255,255,255,0.55) inset, 0 -1px 0 rgba(0,0,0,0.05) inset'}}>
                <Users2 className="w-7 h-7" />
              </div>
            </div>
            <h3 className="text-lg font-semibold text-fg mb-2">Sync in real time</h3>
            <p className="text-sm leading-6 text-muted">Connect with your team instantly to track progress and updates</p>
          </TiltCard>

          {/* Additional smaller soft cards to reach layout symmetry */}
          <TiltCard className="soft-card p-8 flex flex-col" maxTilt={10} hoverScale={1.03} glare={false}>
            <div className="flex gap-3 mb-6 flex-wrap">
              {['Real-Time Insights','Automation','Data Decisions','Faster Innovation'].map(label => (
                <span key={label} className="soft-badge">{label}</span>
              ))}
            </div>
            <h3 className="text-lg font-semibold text-fg mb-2">Capability Tags</h3>
            <p className="text-sm leading-6 text-muted">Highlight key value props with soft badges for quick scanning.</p>
          </TiltCard>

          <TiltCard className="soft-card p-8 flex flex-col" maxTilt={10} hoverScale={1.03} glare={false}>
            <h3 className="text-lg font-semibold text-fg mb-4">Comfort Surfaces</h3>
            <p className="text-sm leading-6 text-muted mb-6">Soft layering reduces visual fatigue while keeping structure clear.</p>
            <div className="flex gap-4 items-end h-32">
              {[28,52,40,34].map((h,i) => (
                <div key={i} className="soft-bar-col" style={{height: `${h}%`, width: '1.9rem'}} />
              ))}
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
