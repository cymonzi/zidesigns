"use client";

// motion no longer directly used here after refactor
import { TiltCard } from "@/components/ui/tilt-card";
import { Code2, Cpu, Layers3, ShieldCheck, Zap, LayoutDashboard } from "lucide-react";

const features = [
  {
    icon: LayoutDashboard,
    title: "Unified Interface",
    desc: "A clean command surface that centralizes creation, iteration and insights.",
    accent: "teal",
  },
  {
    icon: Cpu,
    title: "AI Assisted",
    desc: "Context-aware assistance accelerates workflows without replacing control.",
    accent: "purple",
  },
  {
    icon: Layers3,
    title: "Composable Blocks",
    desc: "Reusable primitives let you assemble complex flows fast.",
    accent: "blue",
  },
  {
    icon: ShieldCheck,
    title: "Secure by Design",
    desc: "Granular permission model & environment isolation baked in.",
    accent: "emerald",
  },
  {
    icon: Zap,
    title: "Realtime Sync",
    desc: "Low-latency presence & streaming state updates across sessions.",
    accent: "amber",
  },
  {
    icon: Code2,
    title: "Extensible API",
    desc: "Open hooks & events let you integrate internal tools easily.",
    accent: "pink",
  },
];

const accentMap: Record<string,string> = {
  teal: "from-teal-400/30 to-teal-500/10 text-teal-400",
  purple: "from-violet-400/30 to-violet-500/10 text-violet-400",
  blue: "from-sky-400/30 to-sky-500/10 text-sky-400",
  emerald: "from-emerald-400/30 to-emerald-500/10 text-emerald-400",
  amber: "from-amber-400/30 to-amber-500/10 text-amber-400",
  pink: "from-pink-400/30 to-pink-500/10 text-pink-400",
};

export function FeatureShowcase() {
  return (
    <section className="relative py-28" id="features">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="orb orb-teal w-[28rem] h-[28rem] -top-32 -left-24" />
        <div className="orb orb-charcoal w-[32rem] h-[32rem] top-1/3 -right-40" />
      </div>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-fg text-3xl sm:text-4xl font-bold tracking-tight">
            A foundation built for speed & clarity
          </h2>
          <p className="mt-4 text-muted text-lg max-w-xl">
            Opinionated structure, motion-first feedback, and AI augmentation—crafted for building modern digital experiences quickly without sacrificing finesse.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => {
            const palette = accentMap[f.accent];
            return (
              <TiltCard
                key={f.title}
                className="tilt-card p-6 flex flex-col gap-4 overflow-hidden group bg-surface-alt/60 backdrop-blur-xl border border-base"
                maxTilt={18}
                hoverScale={1.06}
                delay={i * 0.05}
              >
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${palette} flex items-center justify-center layer-front`}> 
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-fg font-semibold text-lg layer-mid">{f.title}</h3>
                <p className="text-sm leading-6 text-muted layer-base">{f.desc}</p>
                <div className="pointer-events-none absolute -bottom-10 -right-10 w-40 h-40 rounded-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-0 group-hover:opacity-30 transition-opacity duration-500 layer-base" />
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
