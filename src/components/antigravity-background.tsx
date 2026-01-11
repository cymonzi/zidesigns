"use client"

import { useEffect, useRef } from "react"

export function AntigravityBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const canvasWidth = window.innerWidth
    const canvasHeight = window.innerHeight

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = canvasWidth
      canvas.height = canvasHeight
    }
    setCanvasSize()

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Particle class
    class Particle {
      x: number
      y: number
      baseX: number
      baseY: number
      size: number
      speedY: number
      speedX: number
      opacity: number
      color: string
      vx: number
      vy: number

      constructor() {
        this.x = Math.random() * canvasWidth
        this.y = -Math.random() * 100
        this.baseX = this.x
        this.baseY = this.y
        this.size = Math.random() * 3 + 1
        this.speedY = Math.random() * 1 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.5 + 0.2
        this.color = Math.random() > 0.5 ? "rgba(64, 224, 208, " : "rgba(54, 69, 79, "
        this.vx = 0
        this.vy = 0
      }

      update() {
        // Calculate distance from cursor
        const dx = mouseRef.current.x - this.x
        const dy = mouseRef.current.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 200

        // Repel from cursor (antigravity effect)
        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          const angle = Math.atan2(dy, dx)
          this.vx -= Math.cos(angle) * force * 2
          this.vy -= Math.sin(angle) * force * 2
        }

        // Apply velocity with damping
        this.vx *= 0.95
        this.vy *= 0.95

        // Normal downward movement (gravity)
        this.y += this.speedY
        this.x += this.speedX

        // Apply cursor repulsion
        this.x += this.vx
        this.y += this.vy
        
        if (this.y > canvasHeight + 10) {
          this.y = -10
          this.x = Math.random() * canvasWidth
          this.vx = 0
          this.vy = 0
        }
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color + this.opacity + ")"
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Create particles
    const particles: Particle[] = []
    const particleCount = 80

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    let animationId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight)
      
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      animationId = requestAnimationFrame(animate)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      setCanvasSize()
    }
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{ opacity: 0.4, pointerEvents: "none" }}
    />
  )
}
