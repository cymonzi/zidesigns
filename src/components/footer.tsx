"use client"

import Link from "next/link"
import { MessageCircle, Linkedin, Twitter, Github } from "lucide-react"

const navigation = {
  main: [
    { name: "Home", href: "#" },
    { name: "What We Build", href: "#what-we-build" },
    { name: "Design Lessons", href: "#design-lessons" },
    { name: "Portfolio", href: "#portfolio" },
    { name: "Contact", href: "#contact" },
  ],
  services: [
    { name: "Website Development", href: "#" },
    { name: "UI/UX Design", href: "#" },
    { name: "AI Tools", href: "#" },
    { name: "Brand Identity", href: "#" },
    { name: "Mentorship", href: "#" },
  ],
  social: [
    {
      name: "Twitter",
      href: "https://twitter.com/zidesigns01",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/zidesigns",
      icon: Linkedin,
    },
    {
      name: "GitHub",
      href: "https://github.com/zidesigns",
      icon: Github,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/256700000000",
      icon: MessageCircle,
    },
  ],
}

export function Footer() {
  return (
  <footer className="bg-page border-t border-base">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:py-20 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:gap-12 lg:grid-cols-4">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link href="#" className="flex items-center">
              <span className="font-stencil text-2xl text-gradient">ZI DESIGNS</span>
            </Link>
            <p className="mt-6 text-sm leading-6 text-muted max-w-md">
              A creative-tech studio led by Musinguzi Simon Peter. We combine design, tech, and AI 
              to create impactful digital experiences that drive results.
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
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted hover:text-fg transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold leading-6 text-fg">
              Services
            </h3>
            <ul role="list" className="mt-6 space-y-4">
              {navigation.services.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm leading-6 text-muted hover:text-fg transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
  <div className="mt-16 border-t border-base pt-8 lg:flex lg:items-center lg:justify-between">
          <div>
            <h3 className="text-sm font-semibold leading-6 text-fg">
              Subscribe to our newsletter
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Get the latest design insights, project updates, and industry tips.
            </p>
          </div>
          <form className="mt-6 sm:flex sm:max-w-md lg:mt-0">
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              type="email"
              name="email-address"
              id="email-address"
              autoComplete="email"
              required
              className="w-full min-w-0 appearance-none rounded-md border border-base bg-surface px-3 py-2 text-base text-fg placeholder-muted shadow-sm focus:border-[var(--primary)] focus:ring-[var(--primary)] sm:w-64 sm:text-sm"
              placeholder="Enter your email"
            />
            <div className="mt-4 sm:ml-4 sm:mt-0 sm:flex-shrink-0">
              <button
                type="submit"
                className="flex w-full items-center justify-center rounded-md bg-[var(--primary)] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[var(--primary)]/90 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 transition-colors"
              >
                Subscribe
              </button>
            </div>
          </form>
        </div>

        {/* Bottom Section */}
  <div className="mt-8 border-t border-base pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <Link
              href="/privacy"
              className="text-sm leading-6 text-muted hover:text-fg transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm leading-6 text-muted hover:text-fg transition-colors"
            >
              Terms of Service
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
