"use client"

import { Monitor, Brain, Package, Palette, GraduationCap } from "lucide-react"

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
    <div id="what-we-build" className="py-24 sm:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            What We Build
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Zi Designs is a creative-tech studio led by Musinguzi Simon Peter.
            We combine design, tech, and AI to create impactful digital experiences.
          </p>
        </div>
        
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="group flex flex-col items-start bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-gray-700"
              >
                <div className={`rounded-lg p-3 ${service.color.replace('text-', 'bg-').replace('dark:text-', 'dark:bg-')}/10 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`h-6 w-6 ${service.color}`} aria-hidden="true" />
                </div>
                <dt className="mt-4 font-semibold text-gray-900 dark:text-white text-lg">
                  {service.name}
                </dt>
                <dd className="mt-2 leading-7 text-gray-600 dark:text-gray-300">
                  {service.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Stats Section */}
        <div className="mt-20 border-t border-gray-200 dark:border-gray-700 pt-20">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">50+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">25+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">5+</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient">100%</div>
              <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
