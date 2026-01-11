"use client"

import { useEffect, useRef, useState } from "react"

interface ScrollBlurSectionProps {
  children: React.ReactNode
  id?: string
  className?: string
}

export function ScrollBlurSection({ children, id, className = "" }: ScrollBlurSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [blurAmount, setBlurAmount] = useState(0)
  const [opacity, setOpacity] = useState(0.3)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      // Calculate how much of the section is visible
      // When section enters viewport from bottom
      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        // Section is in viewport
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.5)))
        
        // Blur increases from 0 to 16px as section enters
        const blur = scrollProgress * 16
        setBlurAmount(blur)
        
        // Opacity increases from 0.3 to 0.7
        const bgOpacity = 0.3 + (scrollProgress * 0.4)
        setOpacity(bgOpacity)
      } else if (sectionTop >= windowHeight) {
        // Section is below viewport
        setBlurAmount(0)
        setOpacity(0.3)
      } else {
        // Section is above viewport or fully visible
        setBlurAmount(16)
        setOpacity(0.7)
      }
    }

    handleScroll() // Initial check
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{
        background: `rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        transition: "background 0.3s ease-out, backdrop-filter 0.3s ease-out",
        borderTop: `1px solid rgba(255, 255, 255, ${Math.min(opacity, 0.3)})`,
        borderBottom: `1px solid rgba(255, 255, 255, ${Math.min(opacity, 0.3)})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "inherit",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {children}
    </div>
  )
}

// Dark mode variant
export function ScrollBlurSectionDark({ children, id, className = "" }: ScrollBlurSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [blurAmount, setBlurAmount] = useState(0)
  const [opacity, setOpacity] = useState(0.3)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const sectionTop = rect.top
      const sectionHeight = rect.height

      if (sectionTop < windowHeight && sectionTop > -sectionHeight) {
        const scrollProgress = Math.max(0, Math.min(1, (windowHeight - sectionTop) / (windowHeight * 0.5)))
        const blur = scrollProgress * 16
        setBlurAmount(blur)
        const bgOpacity = 0.3 + (scrollProgress * 0.4)
        setOpacity(bgOpacity)
      } else if (sectionTop >= windowHeight) {
        setBlurAmount(0)
        setOpacity(0.3)
      } else {
        setBlurAmount(16)
        setOpacity(0.7)
      }
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    window.addEventListener("resize", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleScroll)
    }
  }, [])

  return (
    <div
      ref={sectionRef}
      id={id}
      className={`relative ${className}`}
      style={{
        background: `rgba(15, 23, 42, ${opacity})`,
        backdropFilter: `blur(${blurAmount}px)`,
        WebkitBackdropFilter: `blur(${blurAmount}px)`,
        transition: "background 0.3s ease-out, backdrop-filter 0.3s ease-out",
        borderTop: `1px solid rgba(255, 255, 255, ${Math.min(opacity * 0.3, 0.1)})`,
        borderBottom: `1px solid rgba(255, 255, 255, ${Math.min(opacity * 0.3, 0.1)})`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "inherit",
          opacity: 0.5,
          pointerEvents: "none",
          zIndex: -1,
        }}
      />
      {children}
    </div>
  )
}
