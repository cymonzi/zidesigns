"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Smartphone, Globe, Palette } from "lucide-react";

const tabs = [
  { key: 'nfunayo', label: 'Nfunayo', icon: Smartphone },
  { key: 'websites', label: 'Websites', icon: Globe },
  { key: 'graphics', label: 'Graphics', icon: Palette },
];

export function InteractiveDashboard() {
  const [active, setActive] = useState('nfunayo');

  return (
    <section className="relative py-28" id="featured-work">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="orb orb-accent w-[30rem] h-[30rem] -bottom-40 left-1/2 -translate-x-1/2" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-5xl mb-12 mx-auto text-center">
          <p className="text-3xl sm:text-4xl lg:text-5xl font-medium text-muted px-4 sm:px-0 max-w-4xl mx-auto tracking-tight leading-tight sm:leading-tight lg:leading-tight">
            A curated <span className="text-fg font-semibold">showcase</span> of projects where <span className="text-fg font-semibold">ideas</span> take shape. We translate <span className="text-fg font-semibold">concepts</span> into screens, <span className="text-fg font-semibold">websites</span>, and visual assets that deliver <span className="text-fg font-semibold">clarity</span>, <span className="text-fg font-semibold">usability</span>, and <span className="text-fg font-semibold">impact</span>.
          </p>
        </div>

        <div className="flex flex-wrap gap-3 justify-center">
          {tabs.map(t => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`relative rounded-full px-4 py-2 text-sm font-medium transition-all backdrop-blur-md border ${active === t.key ? 'bg-[var(--primary)] text-white border-transparent shadow-lg shadow-[rgba(64,224,208,0.35)]' : 'bg-surface-alt text-muted border-base hover:text-fg'} focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]`}
            >
              <span className="inline-flex items-center gap-2">
                <t.icon className="w-4 h-4" /> {t.label}
              </span>
              {active === t.key && (
                <motion.span layoutId="active-pill" className="absolute inset-0 rounded-full" style={{ mixBlendMode: 'overlay' }} />
              )}
            </button>
          ))}
        </div>

        <div className="relative mt-10">
          <div className="perspective">
            <motion.div
              className="relative mx-auto max-w-5xl rounded-2xl border border-base bg-surface-alt/60 backdrop-blur-xl overflow-hidden shadow-[0_8px_40px_-8px_rgba(0,0,0,0.4)]"
              initial={{ rotateX: 14, opacity: 0, y: 80 }}
              whileInView={{ rotateX: 0, opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.9, ease: [0.16,0.84,0.44,1] }}
            >
              <div className="h-10 flex items-center gap-2 px-4 border-b border-base bg-gradient-to-r from-surface to-surface-alt">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-400" />
                  <span className="w-3 h-3 rounded-full bg-amber-400" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-xs text-muted tracking-wide">preview.session.local</div>
              </div>
              <div className="relative min-h-[380px]">
                <AnimatePresence mode="wait">
                  {active === 'nfunayo' && <PanelNfunayo key="nfunayo" />}
                  {active === 'websites' && <PanelWebsites key="websites" />}
                  {active === 'graphics' && <PanelGraphics key="graphics" />}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function BasePanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: .98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -25, scale: .98 }}
      transition={{ duration: 0.55, ease: [0.16,0.84,0.44,1] }}
      className="absolute inset-0 grid grid-cols-12 gap-6 p-6 text-sm"
    >
      {children}
    </motion.div>
  );
}

function PanelNfunayo() {
  const screens = [
    { title: 'Home Screen', desc: 'Clean dashboard with quick access to core features' },
    { title: 'User Profile', desc: 'Personalized interface with settings and preferences' },
    { title: 'Activity Feed', desc: 'Real-time updates and notifications in a scrollable view' },
    { title: 'Search & Filter', desc: 'Intuitive search with advanced filtering options' },
  ];
  
  return (
    <BasePanel>
      <div className="col-span-12">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-fg">Nfunayo Mobile App</h3>
          <p className="text-sm text-muted mt-1">Android-first mobile application with clean user flows and modern interface design</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {screens.map((screen, i) => (
            <div key={i} className="rounded-xl border border-base bg-surface p-4 flex flex-col gap-3">
              <div className="aspect-[9/16] rounded-lg bg-gradient-to-br from-[var(--primary)]/10 to-purple-500/10 flex items-center justify-center border border-base">
                <Smartphone className="w-12 h-12 text-[var(--primary)]/40" />
              </div>
              <div>
                <h4 className="font-medium text-fg text-sm">{screen.title}</h4>
                <p className="text-xs text-muted mt-1">{screen.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasePanel>
  );
}

function PanelWebsites() {
  const projects = [
    { title: 'E-Commerce Platform', desc: 'Responsive online store with seamless checkout experience', tech: 'Next.js, Tailwind' },
    { title: 'Corporate Website', desc: 'Professional business site with modern design and fast performance', tech: 'React, TypeScript' },
    { title: 'Portfolio Site', desc: 'Creative showcase with smooth animations and engaging interactions', tech: 'Framer Motion' },
  ];
  
  return (
    <BasePanel>
      <div className="col-span-12">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-fg">Website Projects</h3>
          <p className="text-sm text-muted mt-1">Modern, responsive websites built for clarity, speed, and conversion</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {projects.map((project, i) => (
            <div key={i} className="rounded-xl border border-base bg-surface-alt p-4 flex flex-col gap-3">
              <div className="aspect-video rounded-lg bg-gradient-to-br from-blue-500/10 to-[var(--primary)]/10 flex items-center justify-center border border-base">
                <Globe className="w-10 h-10 text-blue-400/40" />
              </div>
              <div>
                <h4 className="font-medium text-fg text-sm">{project.title}</h4>
                <p className="text-xs text-muted mt-1">{project.desc}</p>
                <div className="mt-2 text-[10px] text-[var(--primary)] font-medium">{project.tech}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasePanel>
  );
}

function PanelGraphics() {
  const assets = [
    { title: 'Brand Identity', desc: 'Logo design, color palette, and typography system', category: 'Branding' },
    { title: 'UI Components', desc: 'Reusable design system elements and patterns', category: 'UI/UX' },
    { title: 'Marketing Assets', desc: 'Social media graphics, banners, and promotional materials', category: 'Marketing' },
    { title: 'Illustrations', desc: 'Custom illustrations and iconography for digital products', category: 'Visual Design' },
  ];
  
  return (
    <BasePanel>
      <div className="col-span-12">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-fg">Graphic Design</h3>
          <p className="text-sm text-muted mt-1">Clean visual systems and design assets that support your product and brand</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assets.map((asset, i) => (
            <div key={i} className="rounded-xl border border-base bg-surface p-4 flex gap-4">
              <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-pink-500/10 to-purple-500/10 flex items-center justify-center border border-base flex-shrink-0">
                <Palette className="w-8 h-8 text-pink-400/40" />
              </div>
              <div className="flex-1">
                <div className="text-[10px] text-[var(--primary)] font-medium mb-1">{asset.category}</div>
                <h4 className="font-medium text-fg text-sm">{asset.title}</h4>
                <p className="text-xs text-muted mt-1">{asset.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasePanel>
  );
}
