"use client"

import { useState } from "react"
import { MessageCircle, Send, Calendar, Mail, Phone } from "lucide-react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    budget: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted:", formData)
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
  <div id="contact" className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Let&apos;s Build Something
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted">
            Whether it&apos;s a website, AI tool, or template — let&apos;s bring your idea to life.
            We&apos;d love to hear about your project and explore how we can help.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-16 lg:max-w-none lg:grid-cols-2">
          {/* Contact Options */}
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold text-fg mb-6">
                Get in Touch
              </h3>
              <div className="space-y-6">
                <a
                  href="https://wa.me/256700000000"
                  className="flex items-center gap-4 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
                >
                  <div className="rounded-lg bg-green-500 p-3">
                    <MessageCircle className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-fg">Message on WhatsApp</div>
                    <div className="text-sm text-muted">Quick response guaranteed</div>
                  </div>
                </a>

                <a
                  href="mailto:hello@zidesigns.com"
                  className="flex items-center gap-4 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
                >
                  <div className="rounded-lg bg-blue-500 p-3">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-fg">Send us an Email</div>
                    <div className="text-sm text-muted">hello@zidesigns.com</div>
                  </div>
                </a>

                <a
                  href="https://calendly.com/zidesigns"
                  className="flex items-center gap-4 p-4 rounded-lg bg-purple-50 dark:bg-purple-900/20 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors group"
                >
                  <div className="rounded-lg bg-purple-500 p-3">
                    <Calendar className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-fg">Book a Call</div>
                    <div className="text-sm text-muted">Schedule a free consultation</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="pt-8 border-t border-base">
              <h4 className="font-semibold text-fg mb-4">Contact Information</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 text-muted">
                  <Mail className="h-4 w-4" />
                  hello@zidesigns.com
                </div>
                <div className="flex items-center gap-3 text-muted">
                  <Phone className="h-4 w-4" />
                  +256 700 000 000
                </div>
                <div className="flex items-center gap-3 text-muted">
                  <MessageCircle className="h-4 w-4" />
                  @zidesigns01
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl border border-base shadow-sm bg-surface">
            <h3 className="text-xl font-semibold text-fg mb-6">
              Tell us about your project
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-fg-soft">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-base bg-surface-alt px-4 py-3 text-fg placeholder-muted focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-fg-soft">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-base bg-surface-alt px-4 py-3 text-fg placeholder-muted focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="projectType" className="block text-sm font-medium text-fg-soft">
                    Project Type
                  </label>
                  <select
                    name="projectType"
                    id="projectType"
                    value={formData.projectType}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-base bg-surface-alt px-4 py-3 text-fg focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                  >
                    <option value="">Select a project type</option>
                    <option value="website">Website</option>
                    <option value="webapp">Web Application</option>
                    <option value="ai-tool">AI Tool</option>
                    <option value="template">Template/Brand Kit</option>
                    <option value="ui-ux">UI/UX Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="block text-sm font-medium text-fg-soft">
                    Budget Range
                  </label>
                  <select
                    name="budget"
                    id="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border border-base bg-surface-alt px-4 py-3 text-fg focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                  >
                    <option value="">Select budget range</option>
                    <option value="under-1k">Under $1,000</option>
                    <option value="1k-5k">$1,000 - $5,000</option>
                    <option value="5k-10k">$5,000 - $10,000</option>
                    <option value="10k-plus">$10,000+</option>
                    <option value="discuss">Let&apos;s discuss</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-fg-soft">
                  Project Details *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border border-base bg-surface-alt px-4 py-3 text-fg placeholder-muted focus:border-[var(--primary)] focus:ring-[var(--primary)] transition-colors"
                  placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-lg bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[var(--primary)]/90 transition-all duration-200 group"
              >
                Send Proposal
                <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
