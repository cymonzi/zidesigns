"use client"

import Link from "next/link"
import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react"

const lessons = [
  {
    id: 1,
    title: "Color Theory in Modern UI Design",
    description: "Master the art of color selection and application in digital interfaces for maximum impact.",
    category: "UI Design",
    readTime: "8 min read",
    date: "Dec 15, 2024",
    image: "/api/placeholder/400/250",
  },
  {
    id: 2,
    title: "Typography Hierarchy That Works",
    description: "Learn how to create clear, readable typography systems that guide users through your content.",
    category: "Typography",
    readTime: "6 min read",
    date: "Dec 10, 2024",
    image: "/api/placeholder/400/250",
  },
  {
    id: 3,
    title: "Micro-interactions and User Delight",
    description: "Small animations and interactions that make big differences in user experience.",
    category: "UX Design",
    readTime: "10 min read",
    date: "Dec 5, 2024",
    image: "/api/placeholder/400/250",
  },
  {
    id: 4,
    title: "Building Consistent Design Systems",
    description: "From components to guidelines - creating scalable design systems for growing products.",
    category: "Design Systems",
    readTime: "12 min read",
    date: "Nov 28, 2024",
    image: "/api/placeholder/400/250",
  },
  {
    id: 5,
    title: "AI Tools for Faster Design Workflow",
    description: "Leverage AI to speed up your design process without compromising creativity.",
    category: "AI & Design",
    readTime: "7 min read",
    date: "Nov 20, 2024",
    image: "/api/placeholder/400/250",
  },
  {
    id: 6,
    title: "Mobile-First Design Principles",
    description: "Essential strategies for designing beautiful, functional mobile experiences first.",
    category: "Mobile Design",
    readTime: "9 min read",
    date: "Nov 15, 2024",
    image: "/api/placeholder/400/250",
  },
]

export function DesignLessonsSection() {
  return (
  <div id="design-lessons" className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="h-8 w-8 text-[var(--primary)]" />
            <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
              Design Lessons
            </h2>
          </div>
          <p className="text-lg leading-8 text-muted">
            Real-world UI/UX, branding tips, and creative insights — from{" "}
            <span className="text-[var(--primary)] font-semibold">@zidesigns01</span>
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {lessons.map((lesson) => (
            <article
              key={lesson.id}
              className="group flex flex-col items-start tilt-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-base overflow-hidden bg-surface"
            >
              <div className="relative w-full h-48 bg-gradient-to-br from-[var(--primary)]/20 to-[var(--secondary)]/20 overflow-hidden">
                {/* Placeholder for lesson thumbnail */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-[var(--primary)]/50" />
                </div>
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center rounded-full bg-[var(--primary)]/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                    {lesson.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-x-4 text-xs text-muted mb-3">
                  <time dateTime={lesson.date} className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {lesson.date}
                  </time>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {lesson.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold leading-6 text-fg group-hover:text-[var(--primary)] transition-colors">
                  {lesson.title}
                </h3>
                
                <p className="mt-3 text-sm leading-6 text-muted flex-1">
                  {lesson.description}
                </p>
                
                <div className="mt-4">
                  <Link
                    href={`/lessons/${lesson.id}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--primary)] hover:text-[var(--primary)]/80 transition-colors group"
                  >
                    Read Lesson
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/lessons"
            className="inline-flex items-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[var(--primary)]/90 transition-all duration-200 group"
          >
            Explore All Lessons
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  )
}
