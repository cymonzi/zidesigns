"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram } from "lucide-react"
import { AboutModal } from "./about-modal"

const navigation = {
  main: [
    { name: "Home", href: "#home" },
    { name: "What We Do", href: "#services" },
    { name: "About", href: "#", action: "about" },
    { name: "Contact", href: "#contact" },
  ],
  social: [
    {
      name: "Instagram",
      href: "https://instagram.com/zidesigns01",
      icon: Instagram,
    },
  ],
}

export function Footer() {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const navHref = (href: string) => (isHome ? href : "/" + href)
  const [aboutModalOpen, setAboutModalOpen] = useState(false)

  return (
    <footer className="bg-page/80 backdrop-blur-lg border-t border-base">
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href={navHref("#home")} className="flex items-center">
              <span className="font-stencil text-2xl text-gradient">ZI DESIGNS</span>
            </Link>
            <p className="mt-6 text-sm leading-6 text-muted max-w-md">
              You bring the vision. We build the website, app, or visuals that help you win online.
            </p>
            <div className="mt-6 flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-[var(--primary)] transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-fg">
              Navigation
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  {item.action === "about" ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setAboutModalOpen(true)
                      }}
                      className="text-sm leading-6 text-muted hover:text-fg transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={navHref(item.href)}
                      className="text-sm leading-6 text-muted hover:text-fg transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-base pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link
              href="/privacy"
              className="text-sm leading-6 text-muted hover:text-fg transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="mt-8 text-xs leading-5 text-muted md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Zi Designs. All rights reserved. Built with ❤️ in Uganda.
          </p>
        </div>
      </div>
    </footer>
  )
}
