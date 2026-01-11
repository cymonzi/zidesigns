# Zi Designs - Creative Tech Studio Website

A modern, responsive website for Zi Designs, a creative-tech studio led by Musinguzi Simon Peter. We combine design, tech, motion, and AI to create impactful digital experiences.

## 🚀 Features

- **Modern Design**: Clean, professional design with mint aqua + charcoal palette
- **Dark/Light/System Theme**: Flash-safe custom provider (`resolvedTheme`) with animated toggle
- **3D Motion & Micro‑FX**: Parallax hero, tilt / depth cards, staged entrances (Framer Motion)
- **Interactive Product Previews**: Feature showcase + animated dashboard mock (flecto‑style)
- **Pricing Tiers**: Animated pricing grid with popular plan highlight
- **Semantic Design Tokens**: Surface, foreground, accent, border, glass, orb, gradient utilities
- **Responsive**: Mobile-first, fluid typography & layout
- **SEO + A11y**: Semantic landmarks, focus rings, reduced‑motion support
- **Performance Minded**: Lean components, client boundaries scoped

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + custom CSS variables
- **Motion**: Framer Motion 11
- **Icons**: Lucide React
- **Fonts**: Inter (body), Orbitron (stencil logo)

## 🎨 Design System

### Core Semantic Tokens (light/dark)
Defined in `globals.css` using `:root` + `[data-theme="dark"]`:

| Token | Purpose |
|-------|---------|
| `--bg-page` | App page background |
| `--bg-surface` / `--bg-surface-alt` | Layered panels |
| `--fg` / `--fg-muted` | Primary / secondary text |
| `--border-base` | Subtle hairlines |
| `--primary` / `--primary-fg` | Accent brand mint + readable fg |
| `--danger` | Alert / destructive accent |

Utility classes map to tokens: `bg-page`, `bg-surface`, `text-fg`, `text-muted`, `border-base`, etc.

### Visual FX Utilities
- Glass: `.glass` (frosted translucency)
- Orbs: `.orb`, `.orb-accent` (mint glow blobs)
- Gradient border: `.gradient-border` + mask trick
- Ring glow: `.ring-glow` (accent halo)
- Depth shadows: `var(--elevate)`, `var(--elevate-strong)`
- Perspective & Layers: `.perspective`, `.layer-base|mid|front`
- Motion helpers: `.tilt-card`, `.float-soft`

## 🌗 Theme System
`src/components/theme-provider.tsx` supplies:
- `theme`: current user preference (`light | dark | system`)
- `resolvedTheme`: actual applied mode (`light | dark`)
- `setTheme(theme)` and `toggleTheme()`
- Persists to `localStorage (zi-designs-theme)` and responds to OS changes.

Usage example:
```tsx
import { useTheme } from '@/components/theme-provider'

export function ModeBadge() {
  const { resolvedTheme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme} className="px-3 py-1 rounded-md border text-sm">
      {resolvedTheme === 'dark' ? '🌙 Dark' : '🌞 Light'}
    </button>
  )
}
```

## 🧊 3D / Motion Patterns
Hero and service cards use Framer Motion for depth + entrance animations:
```tsx
<motion.div
  initial={{ opacity: 0, y: 40, rotateX: 15 }}
  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
  whileHover={{ rotateX: -6, rotateY: 6, translateZ: 12 }}
  transition={{ duration: 0.65, ease: [0.16,0.84,0.44,1] }}
  viewport={{ once: true, amount: 0.25 }}
  className="tilt-card p-6"
  style={{ transformStyle: 'preserve-3d' }}
/>
```

### Parallax Tilt (Hero)
Mouse position maps to `rotateX` / `rotateY` for headline and overlay shine; see `hero-section.tsx`.

## 📱 Sections
1. Navigation
2. Hero (3D enhanced)
3. What We Build (tilt service cards)
4. Feature Showcase (glass feature grid + orbs)
5. Interactive Dashboard (animated panel tabs)
6. Pricing Section (tiers with popular highlight)
7. Design Lessons
8. Portfolio
9. Contact
10. Footer

## 📁 Project Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── what-we-build-section.tsx
│   ├── feature-showcase.tsx
│   ├── interactive-dashboard.tsx
│   ├── pricing-section.tsx
│   ├── design-lessons-section.tsx
│   ├── portfolio-section.tsx
│   ├── contact-section.tsx
│   ├── footer.tsx
│   ├── theme-provider.tsx
│   └── theme-toggle.tsx
└── lib/
    └── utils.ts
```

## 🏗️ Development
```bash
npm install
npm run dev
```
Visit: http://localhost:3000

## 🔨 Build & Run
```bash
npm run build
npm start
```

## ✅ Accessibility & Performance
- Focus ring utility `.focus-ring`
- `prefers-reduced-motion` respected (animations minimized)
- Static prerender for core route

## 🚀 Deployment
Optimized for Vercel. Push to `main` triggers deployment.

## 🧭 Roadmap Ideas
- Portfolio 3D gallery grid with staggered animation
- MDX-powered lessons content
- Shared `useTilt` hook + reduced-motion fallback
- Theme switcher menu (system / light / dark explicit)

## 📄 License
Private – All rights reserved © 2025 Zi Designs.

Built with ❤️ in Uganda.
