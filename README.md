# Zi Designs - Creative Tech Studio Website

A modern, responsive website for Zi Designs, a creative-tech studio led by Musinguzi Simon Peter. We combine design, tech, and AI to create impactful digital experiences.

## 🚀 Features

- **Modern Design**: Clean, professional design with mint aqua and charcoal color scheme
- **Dark/Light Mode**: Automatic theme switching with manual toggle
- **Responsive**: Mobile-first design that works on all devices
- **SEO Optimized**: Proper meta tags and semantic HTML structure
- **Performance**: Built with Next.js 15 and optimized for speed
- **Accessibility**: WCAG compliant with proper aria labels and keyboard navigation

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Icons**: Lucide React
- **Fonts**: Inter (body), Orbitron (stencil logo)
- **Theme**: Custom theme provider with system preference detection
- **Deployment**: Ready for Vercel deployment

## 📱 Sections

1. **Navigation**: Logo, menu links, and theme toggle with mobile hamburger menu
2. **Hero Section**: Bold statement with CTAs and animated elements
3. **What We Build**: Services showcase with icons and statistics
4. **Design Lessons**: Educational content preview with cards
5. **Portfolio**: Project showcase with filtering and categories
6. **Contact**: Multiple contact options and project inquiry form
7. **Footer**: Links, social media, newsletter signup

## 🎨 Design System

### Colors
- Primary: `#40E0D0` (Mint Aqua)
- Secondary: `#36454F` (Charcoal)
- Light theme: White background with gray text
- Dark theme: Slate background with light text

### Typography
- Logo: Orbitron (stencil-style)
- Body: Inter (clean sans-serif)
- Letter spacing: 0.1em for logo

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd zidesigns_site
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css           # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with theme provider
│   └── page.tsx             # Main homepage
├── components/
│   ├── contact-section.tsx   # Contact form and options
│   ├── design-lessons-section.tsx # Educational content
│   ├── footer.tsx           # Site footer
│   ├── hero-section.tsx     # Hero banner
│   ├── navigation.tsx       # Header navigation
│   ├── portfolio-section.tsx # Project showcase
│   ├── theme-provider.tsx   # Theme context provider
│   ├── theme-toggle.tsx     # Dark/light mode toggle
│   └── what-we-build-section.tsx # Services section
└── lib/
    └── utils.ts             # Utility functions
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically on every push

### Manual Deployment

```bash
npm run build
npm run start
```

## 📝 Content Management

### Updating Services
Edit the `services` array in `src/components/what-we-build-section.tsx`

### Adding Design Lessons
Edit the `lessons` array in `src/components/design-lessons-section.tsx`

### Updating Portfolio
Edit the `projects` array in `src/components/portfolio-section.tsx`

### Contact Information
Update contact details in `src/components/contact-section.tsx` and `src/components/footer.tsx`

## 🎯 SEO & Meta Tags

The site includes comprehensive SEO optimization:
- Open Graph tags for social media
- Twitter Card meta tags
- Proper meta descriptions and keywords
- Structured semantic HTML

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

Copyright © 2025 Zi Designs. All rights reserved.

---

**Built with ❤️ in Uganda by Zi Designs**

For more information, visit [zidesigns.com](https://zidesigns.com) or follow [@zidesigns01](https://twitter.com/zidesigns01)
