"use client"

import { Monitor, Smartphone, Palette } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

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
      {/* Gradient transition overlay */}
      <div className="relative h-32 bg-gradient-to-b from-page via-page/95 to-page/80" />
      
      {/* Section Header - scrolls away */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 0.84, 0.44, 1] }}
        className="bg-page/80 backdrop-blur-lg py-28"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-3xl sm:text-4xl lg:text-5xl font-medium text-muted px-4 sm:px-0 max-w-4xl mx-auto tracking-tight leading-tight sm:leading-tight lg:leading-tight">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-fg font-semibold"
            >
              Every great product
            </motion.span> starts with an <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35, duration: 0.6 }}
              className="text-fg font-semibold"
            >
              idea
            </motion.span>. We help
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mx-2 text-fg font-semibold"
            >
              shape
            </motion.span>, <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mx-2 text-fg font-semibold"
            >
              design
            </motion.span>, and bring it into the
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="mx-2 text-fg font-semibold"
            >
              digital world
            </motion.span> through the <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.95, duration: 0.6 }}
              className="mx-2 text-fg font-semibold"
            >
              services
            </motion.span> we offer.
          </p>
          </div>
        </div>
      </motion.div>

      {/* Smooth transition gradient */}
      <div className="relative bg-gradient-to-b from-page/80 to-page/40" />

      {/* Services Section */}
      <div ref={containerRef} className="relative" style={{ height: `${300 * services.length}vh` }}>
        <div ref={sectionRef} className="sticky top-0 min-h-screen flex flex-col justify-center bg-page/80 backdrop-blur-lg">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            <div className="mx-auto max-w-6xl">
              <div className="space-y-4">
              {services.map((service, i) => {
                const isActive = i === activeIndex
                const isPassed = i < activeIndex
                const isUpcoming = i > activeIndex

                return (
                  <motion.div
                    key={`card-${service.name}`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ 
                      opacity: isActive ? 1 : isPassed ? 0.2 : 0.3,
                      x: isActive ? 0 : isUpcoming ? 20 : -10,
                      y: 0,
                      scale: isActive ? 1 : 0.96,
                      filter: isActive ? 'blur(0px)' : 'blur(1px)'
                    }}
                    transition={{ 
                      duration: 0.6, 
                      ease: [0.16, 0.84, 0.44, 1],
                      x: { duration: 0.5 },
                      opacity: { duration: 0.4 }
                    }}
                    className={`rounded-2xl bg-surface border transition-all duration-500 ${
                      isActive 
                        ? 'border-[var(--primary)]/40 shadow-2xl shadow-[var(--primary)]/20' 
                        : 'border-border/50'
                    }`}
                  >
                    <div className="p-6 sm:p-8 lg:p-10">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 lg:gap-8">
                        {/* Icon with rotation effect */}
                        <motion.div 
                          animate={{
                            scale: isActive ? 1 : 0.9,
                            rotate: isActive ? 0 : -5
                          }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className={`flex-shrink-0 rounded-xl p-4 transition-all duration-500 ${
                            service.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')
                          }/${isActive ? '20' : '10'}`}
                        >
                          <service.icon className={`h-12 w-12 sm:h-14 sm:w-14 ${service.color} transition-transform duration-300`} aria-hidden="true" />
                        </motion.div>

                        {/* Title with slide effect */}
                        <motion.div 
                          animate={{
                            x: isActive ? 0 : -10,
                            opacity: isActive ? 1 : 0.6
                          }}
                          transition={{ duration: 0.4, delay: 0.1 }}
                          className="flex-shrink-0 sm:w-48 lg:w-56"
                        >
                          <h3 className="text-xl sm:text-2xl font-bold text-fg">
                            {service.name}
                          </h3>
                        </motion.div>

                        {/* Description with fade effect */}
                        <motion.div 
                          animate={{
                            x: isActive ? 0 : 10,
                            opacity: isActive ? 1 : 0.5
                          }}
                          transition={{ duration: 0.5, delay: 0.15 }}
                          className="flex-1"
                        >
                          <p className="text-base sm:text-lg text-muted leading-relaxed">
                            {service.description}
                          </p>
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Progress indicator with smooth transitions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex justify-center gap-2 mt-8"
            >
              {services.map((_, idx) => (
                <motion.div
                  key={idx}
                  animate={{
                    width: idx === activeIndex ? 32 : 8,
                    backgroundColor: idx === activeIndex ? 'var(--primary)' : 'rgba(128, 128, 128, 0.3)'
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                  className="h-2 rounded-full"
                />
              ))}
            </motion.div>
          </div>
          </div>
        </div>
      </div>
    </>
  )
}
