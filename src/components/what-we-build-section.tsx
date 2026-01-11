"use client"

import { Monitor, Brain, Package, Palette, GraduationCap } from "lucide-react"
// motion no longer directly used after migrating to TiltCard
import { TiltCard } from "@/components/ui/tilt-card"

const services = [
  {
    name: "Websites & Web Apps",
    description: "Custom websites and web applications built with modern technologies and best practices.",
    icon: Monitor,
    color: "text-blue-600 dark:text-blue-400",
  },
  {
    name: "AI Tools & Chatbots",
    description: "Intelligent automation tools and conversational AI solutions tailored to your needs.",
    icon: Brain,
    color: "text-purple-600 dark:text-purple-400",
  },
  {
    name: "Templates & Brand Kits",
    description: "Professional design templates and comprehensive brand identity packages.",
    icon: Package,
    color: "text-green-600 dark:text-green-400",
  },
  {
    name: "UI/UX Design",
    description: "User-centered design solutions using Figma, Canva, and industry-leading tools.",
    icon: Palette,
    color: "text-pink-600 dark:text-pink-400",
  },
  {
    name: "Education & Mentorship",
    description: "Design education, workshops, and personalized mentorship programs.",
    icon: GraduationCap,
    color: "text-orange-600 dark:text-orange-400",
  },
]

export function WhatWeBuildSection() {
  return (
  <div id="what-we-build" className="py-16 sm:py-24 lg:py-32 bg-page-alt dark:bg-page">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-fg sm:text-3xl lg:text-4xl">
            What We Build
          </h2>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-muted px-4 sm:px-0">
            Zi Designs is a creative-tech studio led by Musinguzi Simon Peter.
            We combine design, tech, and AI to create impactful digital experiences.
          </p>
        </div>
        
        <div className="mx-auto mt-12 sm:mt-16 lg:mt-24 max-w-2xl lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-6 sm:gap-8 lg:gap-x-8 lg:gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service, i) => (
              <TiltCard
                key={service.name}
                className="group flex flex-col items-start tilt-card p-8 glass border border-base"
                maxTilt={16}
                hoverScale={1.05}
                delay={0.05 * i}
              >
                <div className={`rounded-lg p-3 mb-1 ${service.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}/10 group-hover:scale-110 transition-transform duration-300 layer-front`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} aria-hidden="true" />
                </div>
                <dt className="mt-3 font-semibold text-fg text-lg layer-mid">
                  {service.name}
                </dt>
                <dd className="mt-2 leading-7 text-muted layer-base">
                  {service.description}
                </dd>
              </TiltCard>
            ))}
          </dl>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 border-t border-base pt-16 sm:pt-20">
          <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">50+</div>
              <div className="mt-2 text-sm text-muted">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">25+</div>
              <div className="mt-2 text-sm text-muted">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">5+</div>
              <div className="mt-2 text-sm text-muted">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">100%</div>
              <div className="mt-2 text-sm text-muted">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
