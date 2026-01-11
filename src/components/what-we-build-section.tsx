"use client"

import { Monitor, Smartphone, Palette } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const services = [
  {
    name: "Website Building",
    description: "Modern, responsive websites built for clarity, speed, and conversion.",
    icon: Monitor,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "Mobile App Development",
    description: "Android-first mobile apps designed to validate ideas and scale products.",
    icon: Smartphone,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Graphic Design",
    description: "Clean visual systems and design assets that support your product and brand.",
    icon: Palette,
    color: "text-pink-600 dark:text-pink-400",
  },
]

export function WhatWeBuildSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      
      // Calculate scroll progress through the tall container
      if (rect.top <= 0 && rect.bottom > windowHeight) {
        // We're in the sticky section
        const scrolledIntoSection = Math.abs(rect.top)
        const totalScrollable = rect.height - windowHeight
        const progress = scrolledIntoSection / totalScrollable
        
        // Map progress to card index
        const cardIndex = Math.floor(progress * services.length)
        setActiveIndex(Math.min(cardIndex, services.length - 1))
      } else if (rect.bottom <= windowHeight) {
        // Section has scrolled past
        setActiveIndex(services.length - 1)
      } else {
        // Section hasn't entered yet
        setActiveIndex(0)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <>
      {/* Section Header - scrolls away */}
      <div className="bg-page/80 backdrop-blur-lg py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl lg:text-5xl">
            What We Do
          </h2>
          <p className="mt-4 sm:mt-5 text-base sm:text-lg leading-7 sm:leading-8 text-muted px-4 sm:px-0 max-w-3xl mx-auto">
            We focus on designing and developing digital products that are clear, functional, <br className="hidden sm:inline" />
            and built to last.
          </p>
        </div>
      </div>

      {/* Sticky Services Section */}
      <div ref={containerRef} className="relative" style={{ height: `${300 * services.length}vh` }}>
        <div ref={sectionRef} className="sticky top-0 min-h-screen flex flex-col justify-center bg-page/80 backdrop-blur-lg py-12 sm:py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
            {/* Two Column Layout */}
            <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Card Stack Animation */}
            <div className="relative h-[400px] sm:h-[450px] lg:h-[500px]">
              {services.map((service, i) => {
                const isActive = i === activeIndex
                const isPassed = i < activeIndex
                const offset = isPassed ? -100 : (i - activeIndex) * 8

                return (
                  <div
                    key={`card-${service.name}`}
                    className="absolute inset-0 transition-all duration-500 ease-out"
                    style={{
                      transform: `translateY(${offset}%) scale(${isActive ? 1 : 0.92})`,
                      opacity: isPassed ? 0 : isActive ? 1 : 0.5,
                      zIndex: services.length - i,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="h-full w-full flex items-center justify-center p-8 glass border-2 border-base rounded-2xl bg-surface/90 backdrop-blur-sm shadow-xl overflow-hidden relative">
                      {/* Large decorative icon */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <service.icon className="h-64 w-64" aria-hidden="true" />
                      </div>
                      
                      {/* Centered icon */}
                      <div className={`relative rounded-2xl p-8 ${service.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}/15`}>
                        <service.icon className={`h-24 w-24 sm:h-32 sm:w-32 ${service.color}`} aria-hidden="true" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Vertical Divider */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2" />

            {/* Right Side - Text Content */}
            <div className="relative">
              {services.map((service, i) => {
                const isActive = i === activeIndex
                const isPassed = i < activeIndex

                return (
                  <div
                    key={`text-${service.name}`}
                    className="transition-all duration-500 ease-out"
                    style={{
                      position: i === 0 ? 'relative' : 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      opacity: isActive ? 1 : 0,
                      transform: `translateY(${isActive ? 0 : isPassed ? -20 : 20}px)`,
                      pointerEvents: isActive ? 'auto' : 'none',
                    }}
                  >
                    <div className="space-y-6">
                      <div className={`inline-flex rounded-xl p-3 ${service.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}/10`}>
                        <service.icon className={`h-10 w-10 ${service.color}`} aria-hidden="true" />
                      </div>
                      
                      <div>
                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-fg mb-4">
                          {service.name}
                        </h3>
                        <p className="text-base sm:text-lg text-muted leading-relaxed">
                          {service.description}
                        </p>
                      </div>

                      {/* Progress indicator */}
                      <div className="flex gap-2 pt-4">
                        {services.map((_, idx) => (
                          <div
                            key={idx}
                            className={`h-1.5 rounded-full transition-all duration-300 ${
                              idx === activeIndex 
                                ? 'w-12 bg-[var(--primary)]' 
                                : 'w-1.5 bg-border'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            </div>
          </div>
        </div>
      </div>
    </>
  )
}
