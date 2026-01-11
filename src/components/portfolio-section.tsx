"use client"

import { useState } from "react"
import Link from "next/link"
import { ExternalLink, Github, Folder, Star } from "lucide-react"
import { cn } from "@/lib/utils"

const categories = ["All", "Websites", "Apps", "Templates", "Brand Identity", "AI Tools"]

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "Modern e-commerce solution with AI-powered recommendations and seamless checkout.",
    category: "Websites",
    image: "/api/placeholder/600/400",
    tags: ["Next.js", "TypeScript", "Tailwind", "Stripe"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 2,
    title: "Brand Identity Kit",
    description: "Complete brand package including logo, color palette, typography, and guidelines.",
    category: "Brand Identity",
    image: "/api/placeholder/600/400",
    tags: ["Figma", "Illustrator", "Branding", "Guidelines"],
    liveUrl: "#",
    featured: false,
  },
  {
    id: 3,
    title: "AI Chatbot Dashboard",
    description: "Intelligent customer service bot with natural language processing capabilities.",
    category: "AI Tools",
    image: "/api/placeholder/600/400",
    tags: ["React", "Python", "OpenAI", "FastAPI"],
    liveUrl: "#",
    githubUrl: "#",
    featured: true,
  },
  {
    id: 4,
    title: "Design System Components",
    description: "Reusable component library with comprehensive documentation and examples.",
    category: "Templates",
    image: "/api/placeholder/600/400",
    tags: ["React", "Storybook", "Design System", "Documentation"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
  {
    id: 5,
    title: "Mobile Banking App",
    description: "Secure and intuitive mobile banking experience with biometric authentication.",
    category: "Apps",
    image: "/api/placeholder/600/400",
    tags: ["React Native", "Firebase", "Fintech", "Security"],
    liveUrl: "#",
    featured: true,
  },
  {
    id: 6,
    title: "Portfolio Website Template",
    description: "Customizable portfolio template for creatives and professionals.",
    category: "Templates",
    image: "/api/placeholder/600/400",
    tags: ["Next.js", "Tailwind", "MDX", "Portfolio"],
    liveUrl: "#",
    githubUrl: "#",
    featured: false,
  },
]

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredProjects = projects.filter(
    (project) => activeCategory === "All" || project.category === activeCategory
  )

  return (
  <div id="portfolio" className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Our Work
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            Explore our latest projects, from custom websites to AI-powered tools and comprehensive brand identities.
          </p>
        </div>

        {/* Category Filter */}
        <div className="mx-auto mt-16 flex flex-wrap justify-center gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all duration-200 border",
                activeCategory === category
                  ? "bg-[var(--primary)] text-white shadow-lg border-[var(--primary)]"
                  : "bg-surface text-muted hover:bg-surface-alt border-base"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col tilt-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-base overflow-hidden bg-surface"
            >
              <div className="relative h-48 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 overflow-hidden">
                {/* Placeholder for project image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Folder className="h-16 w-16 text-[var(--primary)]/50" />
                </div>
                {project.featured && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-yellow-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                      <Star className="h-3 w-3" />
                      Featured
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center rounded-full bg-[var(--primary)]/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-fg">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-muted flex-1">
                  {project.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-block rounded-md chip-muted px-2 py-1 text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-4">
                  <Link
                    href={project.liveUrl}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors"
                  >
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </Link>
                  {project.githubUrl && (
                    <Link
                      href={project.githubUrl}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-muted hover:text-fg transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[var(--primary)]/90 transition-all duration-200 group"
          >
            View All Projects
            <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
