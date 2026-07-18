"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Instagram, Mail } from "lucide-react"
import { AboutModal } from "./about-modal"

const navigation = {
  main: [
    { name: "Home", href: "#home" },
    { name: "Services", href: "#services" },
    { name: "Insights", href: "/insights" },
    { name: "About", href: "#", action: "about" },
    { name: "Get Started", href: "/start-project" },
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
    <footer id="contact" className="bg-page/80 backdrop-blur-lg border-t border-base">
      <AboutModal isOpen={aboutModalOpen} onClose={() => setAboutModalOpen(false)} />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Brand */}
          <div>
            <Link href={navHref("#home")} className="flex items-center">
              <span className="font-stencil text-2xl text-gradient">ZI DESIGNS</span>
            </Link>

            <p className="mt-4 text-sm leading-6 text-muted max-w-sm">
              Websites, apps, branding, and digital experiences designed to help your business grow.
            </p>
          </div>

          {/* Navigation */}
          <div className="lg:mx-auto">
            <h3 className="text-sm font-semibold text-fg">Navigation</h3>

            <ul role="list" className="mt-6 space-y-4">
              {navigation.main.map((item) => (
                <li key={item.name}>
                  {item.action === "about" ? (
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        setAboutModalOpen(true)
                      }}
                      className="text-sm leading-6 text-muted hover:text-[var(--primary)] hover:underline transition-colors"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={navHref(item.href)}
                      className="text-sm leading-6 text-muted hover:text-[var(--primary)] hover:underline transition-colors"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:mx-auto">
            <h3 className="text-sm font-semibold text-fg">Contact</h3>

            <ul role="list" className="mt-6 space-y-4">
              <li>
                <a
                  href="https://instagram.com/zidesigns01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm leading-6 text-muted hover:text-[var(--primary)] transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                  Instagram
                </a>
              </li>

              <li>
                <a
                  href="mailto:zidesigns001@gmail.com"
                  className="inline-flex items-center gap-2 text-sm leading-6 text-muted hover:text-[var(--primary)] transition-colors"
                >
                  <Mail className="h-5 w-5" />
                  zidesigns001@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 border-t border-base pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link
              href="/privacy"
              className="text-sm leading-6 text-muted hover:text-[var(--primary)] hover:underline transition-colors"
            >
              Privacy Policy
            </Link>
          </div>
          <p className="mt-8 text-xs leading-5 text-muted md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Zi Designs. All rights reserved. 
          </p>
        </div>
      </div>
    </footer>
  )
}
