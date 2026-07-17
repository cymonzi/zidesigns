# Zi Designs - Creative Tech Studio Website

A modern, responsive website for Zi Designs, a creative-tech studio led by Musinguzi Simon Peter. We build professional websites, mobile applications, graphic designs, and digital tools that help businesses grow and succeed.

## 🚀 Features

- **Modern Design**: Clean, professional design with mint aqua (#40E0D0) + charcoal (#36454F) palette
- **Dark/Light/System Theme**: Flash-safe custom theme provider with persistent localStorage
- **Responsive Design**: Mobile-first, fluid typography, touch-friendly interfaces
- **Services Showcase**: Dynamic display of 5 core services with pricing and portfolio examples
- **Multi-Step Project Request Form**: Interactive form with service selection, package options, and PDF summary generation
- **AI Chatbot Assistant**: Interactive chat with project knowledge, service info, and smart navigation links
- **SEO Optimized**: Semantic HTML, metadata, and proper heading hierarchy
- **Accessibility**: Focus rings, keyboard navigation, reduced-motion support
- **Performance**: Optimized images, lazy loading, minimal dependencies

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS variables
- **Motion**: Framer Motion for animations
- **Icons**: Lucide React
- **PDF Generation**: jsPDF + jsPDF-autotable
- **Animation**: Lottie Web (for avatar animation in chatbot)
- **Theme**: next-themes for theme management
- **Fonts**: Inter (body), Orbitron (logo)

## 🎨 Design System

### Color Palette
- **Primary**: Mint Aqua (#40E0D0) - Brand accent, CTAs, highlights
- **Secondary**: Charcoal (#36454F) - Dark backgrounds, typography
- **Light Mode**: Clean white surfaces with subtle shadows
- **Dark Mode**: Deep backgrounds with elevated surface layers

### Semantic CSS Variables
Defined in `src/app/globals.css`:
- `--primary` / `--primary-rgb`: Brand mint color
- `--page` / `--surface` / `--surface-alt`: Background layers
- `--fg` / `--muted`: Text colors
- `--base`: Border and divider color

## 🌗 Theme System

The project uses a custom theme provider in `src/components/theme-provider.tsx`:

```tsx
import { useTheme } from '@/components/theme-provider'

export function ThemeToggle() {
  const { resolvedTheme, toggleTheme } = useTheme()
  return (
    <button onClick={toggleTheme}>
      {resolvedTheme === 'dark' ? '🌙 Dark' : '🌞 Light'}
    </button>
  )
}
```

- Supports light, dark, and system preferences
- Persists to localStorage
- Flash-safe implementation with no layout shift

## 📱 Page Sections

1. **Navigation** - Sticky header with theme toggle and mobile menu
2. **Hero Section** - Bold headline with CTAs and gradient backgrounds
3. **Services Showcase** - Five service categories with pricing details and portfolio examples
   - Website Development (Futureline Solutions, Workmasters Website)
   - Mobile Application Development
   - Graphic Design
   - Video Editing & Visual Effects
   - Smart Digital Tools
4. **Start Project Form** - Multi-step form for service requests with package selection and PDF generation
5. **Footer** - Links and social media
6. **AI Chatbot** - Interactive assistant with project knowledge and navigation

## 🤖 AI Chatbot Features

The chatbot component (`src/components/ai-chatbot.tsx`) includes:
- Service and project information
- Timeline and process details
- Contact method suggestions
- Smart section linking
- Lottie animated avatar
- Real-time response suggestions

## 📁 Project Structure
```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── privacy/
│   │   └── page.tsx
│   └── start-project/
│       └── page.tsx
├── components/
│   ├── about-modal.tsx
│   ├── ai-chatbot.tsx
│   ├── footer.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── page-title-tracker.tsx
│   ├── services-showcase.tsx
│   ├── start-project-form.tsx
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   └── ui/
│       └── tilt-card.tsx
└── lib/
    └── utils.ts
```

## 🏗️ Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit: http://localhost:3000

## 🔨 Build & Deploy

```bash
# Build for production
npm run build

# Start production server
npm start
```

The site is optimized for Vercel deployment. Push to `main` branch to trigger automatic deployment.

## 📂 Key Files

- `src/app/layout.tsx` - Root layout with theme provider and metadata
- `src/app/page.tsx` - Home page with all sections
- `src/app/start-project/page.tsx` - Dedicated page for project request form
- `src/app/globals.css` - Global styles and CSS variables
- `src/components/services-showcase.tsx` - Service categories with pricing and examples
- `src/components/start-project-form.tsx` - Multi-step form with PDF generation
- `src/components/ai-chatbot.tsx` - Interactive chatbot with knowledge base
- `src/components/theme-provider.tsx` - Theme system implementation

## 🎯 Getting Started as a Contributor

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a feature branch: `git checkout -b feature/your-feature`
4. Make changes and test locally
5. Commit with descriptive messages
6. Push to GitHub and create a pull request

## � Services

Zi Designs offers comprehensive digital services:

- **Website Development** - Professional websites starting from UGX 750,000
- **Mobile Application Development** - Custom Android & iOS apps starting from UGX 5,000,000  
- **Graphic Design** - Visual design services starting from UGX 20,000
- **Video Editing & Visual Effects** - Professional video production and editing
- **Smart Digital Tools** - Custom business tools and workflow automation

## 📄 Portfolio Showcase

Featured projects in the Services section:
- **Futureline Solutions**: https://futureline-ten.vercel.app/
- **Workmasters Website**: https://theworkmasters.vercel.app/
- **Nfunayo App Wireframes**: Mobile app design prototypes
- **Litywise UI Prototype**: Mobile app UI screens
- **Momento**: Smart digital tool with intro, sign-up, and dashboard screens

## 📄 License
Private – All rights reserved © 2025 Zi Designs.

Built with ❤️ in Uganda.
