"use client"

import { useState } from "react"
import { Send, Mail, Phone, ArrowRight, Sparkles } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    message: "",
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-stretch">
          <div className="flex h-full flex-col rounded-[2rem] border border-base bg-[linear-gradient(160deg,rgba(64,224,208,0.14),rgba(255,255,255,0.02))] p-8 shadow-sm sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full border border-base bg-surface px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-muted">
              Your Next Win
            </div>

            <h2 className="mt-6 max-w-xl text-4xl font-bold tracking-tight text-fg sm:text-5xl">
              Tell us the goal. We&apos;ll build what gets you there.
            </h2>

            <p className="mt-5 max-w-lg text-base leading-8 text-muted sm:text-lg">
              You bring the idea. We turn it into a website, app, or visual system that helps you grow.
            </p>

            <div className="mt-10 space-y-4">
              <a
                href="mailto:zidesigns001@gmail.com"
                className="flex items-center justify-between gap-4 rounded-2xl border border-base bg-surface px-5 py-4 transition-colors hover:bg-surface-alt"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[var(--primary)]/15 p-3 text-[var(--primary)]">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-fg">Email</div>
                    <div className="text-sm text-muted">zidesigns001@gmail.com</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted" />
              </a>

              <a
                href="https://instagram.com/zidesigns01"
                className="flex items-center justify-between gap-4 rounded-2xl border border-base bg-surface px-5 py-4 transition-colors hover:bg-surface-alt"
              >
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-pink-500/15 p-3 text-pink-500">
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                    </svg>
                  </div>
                  <div>
                    <div className="font-semibold text-fg">Instagram</div>
                    <div className="text-sm text-muted">@zidesigns01</div>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted" />
              </a>
            </div>
          </div>

          <div className="flex h-full flex-col rounded-[2rem] border border-base bg-surface p-8 shadow-sm sm:p-10">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-fg">Tell us what you need</h3>
                <p className="mt-2 text-sm leading-6 text-muted">
                  Share your goal and timeline. We&apos;ll send the best next step.
                </p>
              </div>
              <div className="rounded-full border border-base px-3 py-1 text-xs font-medium uppercase tracking-[0.22em] text-muted">
                Quick Response
              </div>
            </div>

            <form action="https://formspree.io/f/mlgpplpl" method="POST" className="mt-8 flex h-full flex-col space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-fg-soft">
                    Your name or brand
                  </label>
                  <p className="mt-1 text-xs text-muted">
                    Just enough for us to know what to call you.
                  </p>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-xl border border-base bg-surface-alt px-4 py-3 text-fg placeholder-muted transition-colors focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                    placeholder="Sarah or Bright Labs"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-fg-soft">
                    Phone number
                  </label>
                  <div className="relative mt-2">
                    <Phone className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
                    <input
                      type="tel"
                      name="phone"
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="block w-full rounded-xl border border-base bg-surface-alt py-3 pl-11 pr-4 text-fg placeholder-muted transition-colors focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                      placeholder="e.g. +256 700 123 456"
                    />
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-fg-soft">
                    Email address <span className="text-muted">(optional)</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-xl border border-base bg-surface-alt px-4 py-3 text-fg placeholder-muted transition-colors focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                    placeholder="name@company.com"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium text-fg-soft">
                    What result do you want?
                  </label>
                  <select
                    name="service"
                    id="service"
                    value={formData.service}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-xl border border-base bg-surface-alt px-4 py-3 text-fg transition-colors focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                  >
                    <option value="">Choose your best fit</option>
                    <option value="website-development">Website Development</option>
                    <option value="mobile-app-design">Mobile App Design</option>
                    <option value="graphic-design">Graphic Design</option>
                    <option value="video-editing">Video Editing & Visual Effects</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-fg-soft">
                  What should this help you achieve?
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-xl border border-base bg-surface-alt px-4 py-3 text-fg placeholder-muted transition-colors focus:border-[var(--primary)] focus:ring-[var(--primary)]"
                  placeholder="Example: Get more leads, launch an MVP, or refresh our brand."
                />
              </div>

              <div className="mt-auto flex flex-col gap-4 border-t border-base pt-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-6 text-muted">
                  Share the fastest way to reach you and we&apos;ll keep it simple.
                </p>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-black shadow-lg transition-all duration-200 hover:bg-[var(--primary)]/90"
                >
                  Submit
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
