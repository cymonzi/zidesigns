"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Mail, ArrowRight } from "lucide-react"
interface SpecificItem {
  id: string
  label: string
  value: string
}
interface CategoryInfo {
  label: string
  specifics: SpecificItem[]
}
const CATEGORIES: Record<string, CategoryInfo> = {
  graphic: {
    label: "Graphic Design",
    specifics: [
      { id: "g1", label: "Posters & Flyers", value: "Posters & Flyers" },
      { id: "g2", label: "CV Design", value: "CV Design" },
      { id: "g3", label: "Presentations", value: "Presentations" },
      { id: "g4", label: "Company Profile", value: "Company Profile" },
      { id: "g5", label: "Certificates", value: "Certificates" },
      { id: "g6", label: "Magazine", value: "Magazine" },
    ],
  },
  brand: {
    label: "Logo & Branding",
    specifics: [
      { id: "b1", label: "Logo Concepts", value: "Logo Concepts" },
      { id: "b2", label: "Brand Guide", value: "Brand Guide" },
      { id: "b3", label: "Stationery & Mockups", value: "Stationery & Mockups" },
      { id: "b4", label: "Full Identity System", value: "Full Identity System" },
    ],
  },
  website: {
    label: "Website Development",
    specifics: [
      { id: "w1", label: "Starter Website", value: "Starter Website" },
      { id: "w2", label: "Business Website", value: "Business Website" },
      { id: "w3", label: "E-commerce Website", value: "E-commerce Website" },
      { id: "w4", label: "Web App / Dashboard", value: "Web Application / Dashboard" },
    ],
  },
  mobile: {
    label: "Mobile Apps",
    specifics: [
      { id: "m1", label: "iOS App", value: "iOS App" },
      { id: "m2", label: "Android App", value: "Android App" },
      { id: "m3", label: "Cross-platform App", value: "Cross-platform App" },
      { id: "m4", label: "Backend Integration", value: "Backend Integration" },
    ],
  },
  ai: {
    label: "AI & Automation",
    specifics: [
      { id: "a1", label: "AI Chatbot", value: "AI Chatbot" },
      { id: "a2", label: "Workflow Automation", value: "Workflow Automation" },
      { id: "a3", label: "AI Content Tools", value: "AI Content Tools" },
      { id: "a4", label: "Data & Analytics", value: "Data & Analytics" },
    ],
  },
}
export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    message: "",
  })
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [selectedSpecifics, setSelectedSpecifics] = useState<string[]>([])
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleCategoryClick = (cat: string) => {
    if (activeCategory === cat) {
      setActiveCategory(null)
      setSelectedSpecifics([])
    } else {
      setActiveCategory(cat)
      setSelectedSpecifics([])
    }
  }
  const handleToggleSpecific = (val: string) => {
    setSelectedSpecifics((prev) =>
      prev.includes(val) ? prev.filter((item) => item !== val) : [...prev, val]
    )
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (!activeCategory) {
      e.preventDefault()
      alert("Please select a category closest to your goal (Step 1).")
    }
  }
  return (
    <section id="contact" className="py-24 sm:py-32 bg-page/80 backdrop-blur-lg border-t border-base relative overflow-hidden">
      {/* Background ambient light */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-44 left-1/4 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(64,224,208,0.07),transparent_70%)] blur-3xl" />
      </div>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form action="https://formspree.io/f/mlgpplpl" method="POST" onSubmit={handleSubmit} className="w-full">
          {/* Hidden fields to submit to Formspree */}
          <input
            type="hidden"
            name="service"
            value={activeCategory ? CATEGORIES[activeCategory].label : ""}
          />
          <input
            type="hidden"
            name="selected_specifics"
            value={selectedSpecifics.join(", ")}
          />
          <div className="grid gap-16 lg:grid-cols-2 lg:items-stretch">
            
            {/* LEFT COLUMN: Contact Cards, Heading, and Step 1 */}
            <div className="flex flex-col space-y-8">
              
              {/* Heading: Get in touch */}
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg">
                  Get in touch
                </h2>
              </div>
              {/* Clickable Contact Cards */}
              <div className="space-y-4 max-w-md">
                <a
                  href="mailto:zidesigns001@gmail.com"
                  className="flex items-center justify-between gap-4 rounded-2xl border border-base bg-surface px-5 py-4 transition-all hover:bg-surface-alt hover:border-[var(--primary)]/50 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-[var(--primary)]/10 p-3 text-[var(--primary)] group-hover:scale-105 transition-transform duration-200">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="font-semibold text-fg text-sm">Email Us</div>
                      <div className="text-xs text-muted">zidesigns001@gmail.com</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all duration-200" />
                </a>
                <a
                  href="https://instagram.com/zidesigns01"
                  className="flex items-center justify-between gap-4 rounded-2xl border border-base bg-surface px-5 py-4 transition-all hover:bg-surface-alt hover:border-[var(--primary)]/50 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="rounded-xl bg-pink-500/10 p-3 text-pink-500 group-hover:scale-105 transition-transform duration-200">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-fg text-sm">Follow Instagram</div>
                      <div className="text-xs text-muted">@zidesigns01</div>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted group-hover:text-[var(--primary)] group-hover:translate-x-0.5 transition-all duration-200" />
                </a>
              </div>
              <div className="h-px bg-base w-full max-w-md" />
              {/* Title & Description */}
              <div className="flex flex-col">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-fg">
                  Tell us what you need
                </h2>
                <p className="mt-2 text-sm text-muted leading-relaxed max-w-md">
                  Pick a category, share a few specifics, and we&apos;ll send you the best next step. We usually reply within 24 hours.
                </p>
              </div>
              {/* STEP 1: Category Chips & Specifics */}
              <div className="space-y-4">
                <div>
                
                  <div className="text-xs sm:text-sm font-semibold text-fg mb-4">Step 1: What result do you want?</div>
                  
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(CATEGORIES).map(([key, cat]) => {
                      const isActive = activeCategory === key
                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => handleCategoryClick(key)}
                          className={`border text-[11px] sm:text-xs font-medium px-3.5 py-2.5 rounded-full transition-all duration-150 whitespace-nowrap cursor-pointer select-none ${
                            isActive
                              ? "bg-[var(--primary)] border-[var(--primary)] text-black font-semibold shadow-md shadow-[rgba(64,224,208,0.25)]"
                              : "border-base bg-surface-alt text-muted hover:border-strong hover:text-fg"
                          }`}
                        >
                          {cat.label}
                        </button>
                      )
                    })}
                  </div>
                </div>
                {/* Specifics Checklist */}
                <div className="min-h-[100px]">
                  <AnimatePresence mode="wait">
                    {activeCategory ? (
                      <motion.div
                        key={activeCategory}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="flex flex-wrap gap-2 pt-4 border-t border-dashed border-base">
                          {CATEGORIES[activeCategory].specifics.map((spec) => {
                            const isChecked = selectedSpecifics.includes(spec.value)
                            return (
                              <div key={spec.id} className="relative">
                                <input
                                  type="checkbox"
                                  id={spec.id}
                                  name="specific"
                                  value={spec.value}
                                  checked={isChecked}
                                  onChange={() => handleToggleSpecific(spec.value)}
                                  className="sr-only"
                                />
                                <label
                                  htmlFor={spec.id}
                                  className={`inline-flex items-center gap-2 border rounded-lg px-3 py-1.5 text-[11px] font-medium cursor-pointer transition-all duration-150 select-none ${
                                    isChecked
                                      ? "border-[var(--primary)] text-[var(--primary)] bg-[var(--primary)]/10"
                                      : "border-base bg-surface-alt text-muted hover:border-strong hover:text-fg"
                                  }`}
                                >
                                  <span
                                    className={`w-3 h-3 rounded transition-all duration-150 flex items-center justify-center ${
                                      isChecked
                                        ? "border-[var(--primary)] bg-[var(--primary)] shadow-[inset_0_0_0_2px_rgba(64,224,208,0.25)]"
                                        : "border-muted-alt/50"
                                    }`}
                                  >
                                    {isChecked && (
                                      <svg
                                        className="w-2 h-2 text-black"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="3.5"
                                        viewBox="0 0 24 24"
                                      >
                                        <polyline points="20 6 9 17 4 12" />
                                      </svg>
                                    )}
                                  </span>
                                  {spec.label}
                                </label>
                              </div>
                            )
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <div className="flex items-center justify-center h-full min-h-[100px] text-xs text-muted border border-dashed border-base rounded-xl p-4 bg-surface/50">
                        Please select a service category above to view specifics
                      </div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>
            {/* RIGHT COLUMN: Step 2 & Step 3 */}
            <div className="flex flex-col justify-between space-y-8">
              
              {/* STEP 2: Description */}
       
              <div className="space-y-3">
                <div className="text-xs sm:text-sm font-semibold text-fg">Step 2: Describe your project</div>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-surface-alt border border-base rounded-xl text-fg text-xs sm:text-sm px-4 py-3 placeholder-muted-alt/60 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-hidden outline-none min-h-[120px] resize-y leading-relaxed transition-colors duration-150"
                  placeholder="Example: Get more leads, launch an MVP, or refresh our brand."
                />
              </div>
              {/* STEP 3: Contact Details */}
              <div className="space-y-4">
                <div className="h-px bg-base w-full" />
                <div className="text-xs sm:text-sm font-semibold text-fg">Step 3: How can we reach you?</div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] font-semibold text-fg-soft mb-1.5">Name</div>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-base rounded-xl text-fg text-xs sm:text-sm px-4 py-3 placeholder-muted-alt/60 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-hidden outline-none transition-colors duration-150"
                      placeholder="Sarah or Bright Labs"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-fg-soft mb-1.5">
                      Company <span className="text-[10px] font-normal text-muted/70 float-right">optional</span>
                    </div>
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-base rounded-xl text-fg text-xs sm:text-sm px-4 py-3 placeholder-muted-alt/60 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-hidden outline-none transition-colors duration-150"
                      placeholder="Bright Labs Ltd"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <div className="text-[11px] font-semibold text-fg-soft mb-1.5">Phone</div>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-base rounded-xl text-fg text-xs sm:text-sm px-4 py-3 placeholder-muted-alt/60 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-hidden outline-none transition-colors duration-150"
                      placeholder="+256 700 123 456"
                    />
                  </div>
                  <div>
                    <div className="text-[11px] font-semibold text-fg-soft mb-1.5">Email</div>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-surface-alt border border-base rounded-xl text-fg text-xs sm:text-sm px-4 py-3 placeholder-muted-alt/60 focus:border-[var(--primary)] focus:ring-1 focus:ring-[var(--primary)] focus:outline-hidden outline-none transition-colors duration-150"
                      placeholder="name@company.com"
                    />
                  </div>
                </div>
              </div>
              {/* Submit footer */}
              <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t border-base gap-4">
                <p className="text-[11px] sm:text-xs text-muted leading-normal text-center sm:text-left max-w-xs">
                  We reply within 24 hours.
                </p>
                <button
                  type="submit"
                  className="w-full sm:w-auto bg-[var(--primary)] text-black font-bold text-xs sm:text-sm px-6 py-3.5 rounded-xl flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[rgba(64,224,208,0.35)] transition-all duration-150 cursor-pointer select-none"
                >
                  Submit
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}