"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { BarChart3, Gauge, ListTree, Settings2, TerminalSquare } from "lucide-react";

const tabs = [
  { key: 'metrics', label: 'Metrics', icon: Gauge },
  { key: 'pipeline', label: 'Pipelines', icon: ListTree },
  { key: 'terminal', label: 'Console', icon: TerminalSquare },
  { key: 'analytics', label: 'Analytics', icon: BarChart3 },
  { key: 'settings', label: 'Settings', icon: Settings2 },
];

export function InteractiveDashboard() {
  const [active, setActive] = useState('metrics');

  return (
    <section className="relative py-28" id="dashboard">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="orb orb-accent w-[30rem] h-[30rem] -bottom-40 left-1/2 -translate-x-1/2" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <h2 className="text-fg text-3xl sm:text-4xl font-bold tracking-tight">Interactive system preview</h2>
          <p className="mt-4 text-muted text-lg max-w-xl">A conceptual dashboard demonstrating depth, motion layering, and dynamic panel transitions—purely illustrative, no backend required.</p>
        </div>

        <div className="flex flex-wrap gap-3">
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
                  {active === 'metrics' && <PanelMetrics key="metrics" />}
                  {active === 'pipeline' && <PanelPipeline key="pipeline" />}
                  {active === 'terminal' && <PanelTerminal key="terminal" />}
                  {active === 'analytics' && <PanelAnalytics key="analytics" />}
                  {active === 'settings' && <PanelSettings key="settings" />}
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

function PanelMetrics() {
  return (
    <BasePanel>
      <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
        <StatCard label="Uptime" value="99.982%" trend="+0.12%" />
        <StatCard label="Latency" value="231ms" trend="-14ms" positive={false} />
        <StatCard label="Active Users" value="1,284" trend="+8%" />
      </div>
      <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
        <div className="rounded-xl border border-base bg-surface p-4 flex-1 flex flex-col">
          <h4 className="font-medium text-fg mb-3">Response Time (ms)</h4>
          <div className="flex-1 relative">
            <div className="absolute inset-0 flex items-end gap-1">
              {Array.from({ length: 42 }).map((_, i) => (
                <div key={i} className="flex-1 bg-gradient-to-t from-[var(--primary)]/15 to-[var(--primary)]/60 rounded-t" style={{ height: `${20 + Math.sin(i/2) * 20 + (i%5)*3}%` }} />
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MiniChart title="CPU" color="emerald" />
          <MiniChart title="Memory" color="pink" />
        </div>
      </div>
    </BasePanel>
  );
}

function PanelPipeline() {
  const stages = ['Fetch', 'Normalize', 'Infer', 'Enrich', 'Cache', 'Dispatch'];
  return (
    <BasePanel>
      <div className="col-span-12 flex flex-col gap-4">
        <h4 className="font-medium text-fg">Pipeline View</h4>
        <div className="flex flex-wrap gap-4">
          {stages.map((s,i) => (
            <div key={s} className="relative flex-1 min-w-[120px] p-4 rounded-xl border border-base bg-surface-alt">
              <div className="text-xs font-medium tracking-wide text-muted mb-1">Stage {i+1}</div>
              <div className="font-semibold text-fg">{s}</div>
              <div className="mt-2 h-1.5 rounded-full bg-[var(--primary)]/20 overflow-hidden">
                <div className="h-full bg-[var(--primary)]" style={{ width: `${60 + (i*6)}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </BasePanel>
  );
}

function PanelTerminal() {
  const lines = [
    '▶ yarn deploy:edge --region=eu-central-1',
    'Building containers…',
    '✓ Bundled 17 modules (2.3s)',
    'Pushing layers…',
    '✓ Release created #2143',
    'Activating traffic…',
    '✓ All regions healthy',
  ];
  return (
    <BasePanel>
      <div className="col-span-12 flex flex-col rounded-xl border border-base bg-[linear-gradient(#0f172a,#0f1e31)] text-xs font-mono text-[#c2d5f5] p-4">
        <div className="text-[10px] text-[#7b91b3] mb-2">session: deployment</div>
        {lines.map((l,i) => (
          <motion.div key={l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.15 }}>{l}</motion.div>
        ))}
      </div>
    </BasePanel>
  );
}

function PanelAnalytics() {
  return (
    <BasePanel>
      <div className="col-span-12 md:col-span-8 flex flex-col gap-6">
        <div className="rounded-xl border border-base bg-surface p-4 flex-1">
          <h4 className="font-medium text-fg mb-4">User Growth</h4>
          <div className="grid grid-cols-12 gap-1 h-40">
            {Array.from({ length: 72 }).map((_, i) => (
              <div key={i} className="col-span-1 bg-gradient-to-t from-[var(--primary)]/15 to-[var(--primary)]/70 rounded" style={{ height: `${20 + (Math.sin(i/3)+1)*30}%` }} />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <MiniChart title="Sessions" color="amber" />
          <MiniChart title="Errors" color="rose" inverse />
        </div>
      </div>
      <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
        <StatCard label="Avg Session" value="6m 21s" trend="+12%" />
        <StatCard label="Churn" value="3.4%" trend="-0.2%" positive={false} />
        <StatCard label="NPS" value="68" trend="+5" />
      </div>
    </BasePanel>
  );
}

function PanelSettings() {
  return (
    <BasePanel>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
        <div className="rounded-xl border border-base bg-surface p-4">
          <h4 className="font-medium text-fg mb-3">Environment Flags</h4>
          <div className="space-y-3 text-xs">
            {['edge-caching','beta-ai','new-pricing','telemetry','session-v2'].map(flag => (
              <div key={flag} className="flex items-center justify-between gap-4">
                <span className="text-muted font-mono">{flag}</span>
                <span className="inline-flex items-center rounded-full bg-[var(--primary)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--primary)]">ENABLED</span>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-base bg-surface-alt p-4">
          <h4 className="font-medium text-fg mb-3">Regions</h4>
          <div className="flex flex-wrap gap-2 text-[10px]">
            {['us-east','us-west','eu-central','ap-south','sa-east'].map(r => (
              <span key={r} className="bg-[var(--primary)]/10 text-[var(--primary)] rounded-md px-2 py-1 font-medium">{r}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 flex flex-col gap-4">
        <div className="rounded-xl border border-base bg-surface p-4 flex-1">
          <h4 className="font-medium text-fg mb-3">Scaling</h4>
          <p className="text-xs text-muted leading-5">Adaptive autoscaling keeps latency predictable. Configure min/max concurrency and leave the rest to intelligent capacity heuristics.</p>
          <div className="mt-4 h-2 rounded-full bg-[var(--primary)]/15 overflow-hidden">
            <div className="h-full bg-[var(--primary)] w-2/3" />
          </div>
        </div>
        <div className="rounded-xl border border-base bg-surface-alt p-4">
          <h4 className="font-medium text-fg mb-3">Integrations</h4>
          <div className="flex flex-wrap gap-2 text-[10px]">
            {['Slack','Zapier','Notion','Linear','Stripe'].map(int => (
              <span key={int} className="chip-muted rounded-md px-2 py-1 font-medium">{int}</span>
            ))}
          </div>
        </div>
      </div>
    </BasePanel>
  );
}

function StatCard({ label, value, trend, positive = true }: { label: string; value: string; trend: string; positive?: boolean }) {
  return (
    <div className="rounded-xl border border-base bg-surface-alt p-4 flex flex-col gap-2">
      <div className="text-xs text-muted uppercase tracking-wide">{label}</div>
      <div className="text-fg font-semibold text-lg">{value}</div>
      <div className={`text-[10px] font-medium ${positive ? 'text-emerald-400' : 'text-rose-400'}`}>{trend}</div>
    </div>
  );
}

function MiniChart({ title, color, inverse }: { title: string; color: 'emerald' | 'pink' | 'amber' | 'rose'; inverse?: boolean }) {
  const bars = Array.from({ length: 30 }).map((_, i) => 20 + (Math.sin(i/2)+1)*40);
  const gradients: Record<string, { normal: string; inverse: string }> = {
    emerald: { normal: 'from-emerald-400/20 to-emerald-500/70', inverse: 'from-emerald-500/70 to-emerald-400/20' },
    pink: { normal: 'from-pink-400/20 to-pink-500/70', inverse: 'from-pink-500/70 to-pink-400/20' },
    amber: { normal: 'from-amber-400/20 to-amber-500/70', inverse: 'from-amber-500/70 to-amber-400/20' },
    rose: { normal: 'from-rose-400/20 to-rose-500/70', inverse: 'from-rose-500/70 to-rose-400/20' },
  };
  const gradient = inverse ? gradients[color].inverse : gradients[color].normal;
  return (
    <div className="rounded-xl border border-base bg-surface-alt p-4 flex flex-col">
      <div className="text-xs text-muted mb-2">{title}</div>
      <div className="flex items-end gap-1 h-20">
        {bars.map((h,i) => (
          <div key={i} className={`flex-1 bg-gradient-to-t ${gradient} rounded-t`} style={{ height: `${h/1.6}%` }} />
        ))}
      </div>
    </div>
  );
}
