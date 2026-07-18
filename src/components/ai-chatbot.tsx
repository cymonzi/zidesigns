"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { RotateCcw, Send, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import lottie from "lottie-web"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
  links?: ChatLink[]
}

interface ChatLink {
  label: string
  href: string
}

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi 👋\nI'm the Zi Designs assistant.\nAsk me anything about our services, projects, or how to start a project.",
    sender: "ai",
    timestamp: new Date(),
  },
]

const defaultSuggestions = [
  "What services do you offer?",
  "Tell me about Insights",
  "How do I start a project?",
  "Show me recent projects",
]

const responseSuggestions: Record<string, string[]> = {
  services: ["Tell me about website development", "Tell me about mobile app design", "Tell me about graphic design"],
  insights: ["What is the GMF framework?", "Tell me about Insights", "What frameworks do you have?"],
  projects: ["Show me website work", "Show me design work", "How long do projects take?"],
  process: ["What is your process?", "How long does a website take?", "What do you need from me to start?"],
  contact: ["How can I contact you?", "Do you use WhatsApp?", "Can I send project details by email?"],
  fallback: defaultSuggestions,
}

const keywordSectionLinks: Array<{ keywords: string[]; link: ChatLink }> = [
  { keywords: ["services"], link: { label: "View Services", href: "#services" } },
  { keywords: ["website", "workmasters", "futureline"], link: { label: "Website Service", href: "#service-website" } },
  { keywords: ["mobile app", "mobile", "app", "nfunayo"], link: { label: "Mobile App Service", href: "#service-mobile-app" } },
  { keywords: ["graphic design", "graphic", "logo", "poster", "book cover"], link: { label: "Graphic Design Service", href: "#service-graphic-design" } },
  { keywords: ["video", "video editing", "visual effects"], link: { label: "Video Editing Service", href: "#service-video-editing" } },
  { keywords: ["ai", "chatbot", "automation", "workflow"], link: { label: "Smart Digital Tools", href: "#service-smart-tools" } },
  { keywords: ["strategy", "consulting", "discovery"], link: { label: "View Services", href: "#services" } },
  { keywords: ["insights", "knowledge hub", "frameworks", "gmf", "gift maturation"], link: { label: "View Insights", href: "/insights" } },
  { keywords: ["start a project", "start project", "how do i start", "how to start"], link: { label: "Start a Project", href: "/start-project" } },
  { keywords: ["deposit", "payment", "refund", "cost", "price", "budget"], link: { label: "Contact Us", href: "#contact" } },
  { keywords: ["work", "projects", "portfolio"], link: { label: "View Work", href: "#work" } },
  { keywords: ["contact", "email", "instagram", "whatsapp"], link: { label: "Go to Contact", href: "#contact" } },
]

// Acknowledgement phrases that don't need full AI responses
const acknowledgementPhrases = [
  "ok",
  "okay",
  "thanks",
  "thank you",
  "cool",
  "alright",
  "nice",
  "got it",
  "sure",
  "great",
  "lol",
  "haha",
  "wow",
  "awesome",
  "perfect",
]

// Variations of friendly acknowledgement responses
const acknowledgementResponses = [
  "You're welcome! Let me know if you need anything about Zi Designs.",
  "Happy to help! 😊 Feel free to ask if you have more questions.",
  "Anytime! What else can I help you with?",
  "No problem 👍 Let me know if you need anything else.",
  "Glad I could help! Need anything else?",
  "You got it! Anything else you'd like to know?",
  "That's great! Feel free to ask if you need more info.",
  "Awesome! I'm here if you have more questions.",
]

// Conversation closing phrases
const closingPhrases = ["bye", "goodbye", "thanks anyway", "that's all", "no thanks", "later"]

// Closing responses
const closingResponses = [
  "You're welcome! If you ever want to start a project with Zi Designs, just let me know.",
  "Thanks for chatting! Feel free to reach out anytime if you want to collaborate.",
  "Talk soon! We'd love to work with you on your next project.",
  "Take care! Feel free to contact us when you're ready to start your project.",
]

// Question indicators
const questionIndicators = ["what", "how", "do you", "can you", "where", "when", "why", "?", "tell me", "explain"]

// Typo/variant alias map for normalization
const aliasMap: Record<string, string> = {
  "mobileapp": "mobile app",
  "mobil": "mobile",
  "webapp": "web application",
  "chatbot": "chatbot",
  "logo": "logo",
  "branding": "branding",
  "graphic": "graphic design",
  "video": "video editing",
  "automation": "automation",
  "ai": "ai",
}

function normalizeInput(text: string): string {
  let normalized = text.toLowerCase().trim()
  for (const [alias, replacement] of Object.entries(aliasMap)) {
    normalized = normalized.replace(new RegExp(alias, "g"), replacement)
  }
  return normalized
}

const aiResponses: Record<string, string> = {
  // About
  "what is zi designs": "Zi Designs is a creative-tech studio based in Kampala, Uganda. We partner with startups, small businesses, personal brands, churches, NGOs, and entrepreneurs to build digital systems that perform, scale, and grow with you.",
  "who founded": "Zi Designs was founded by Musinguzi Simon Peter, a creative-tech leader passionate about building impactful digital products for African businesses.",
  "where are you located": "We're based in Kampala, Uganda - but we work with clients across East Africa and internationally. All communication and file delivery is handled digitally.",
  "outside uganda": "Yes! We work with clients across East Africa and internationally. Payments can be arranged in both USD and UGX.",

  // Insights
  "insights": "Our Insights page is a knowledge hub featuring practical frameworks, research, and resources designed to help people learn, build, and grow. It includes frameworks like the Gift Maturation Framework (GMF) and other tools for personal and professional development.",
  "knowledge hub": "The Knowledge Hub is our Insights page where we share ideas, frameworks, research, and practical resources. It's designed to help individuals and organizations create lasting value through structured thinking and proven models.",
  "gmf": "The Gift Maturation Framework (GMF) is a practical model for discovering your gifts, developing them with purpose, expressing them through service, validating their value, building sustainable systems, and multiplying their impact. You can view and download it from our Insights page.",
  "gift maturation": "The Gift Maturation Framework provides a practical pathway for personal and professional growth. It guides you through six stages: Discovery, Development, Expression, Validation, Structure, and Multiplication. Visit our Insights page to learn more.",
  "frameworks": "We develop practical frameworks to simplify complex ideas and guide decision-making. Our current frameworks include the Gift Maturation Framework (GMF) for personal growth, with more coming soon. Check our Insights page for the latest resources.",

  // Services
  "services": "We offer five service areas: Graphic Design, Logo & Branding, Website Development, Mobile Applications, and AI & Automation. We also offer Strategy & Consulting. What would you like to know more about?",
  "graphic design": "We create compelling visual assets including Posters & Flyers (from UGX 20,000), CV Design (from UGX 50,000), Presentations (from UGX 100,000), Company Profiles (from UGX 100,000), and Certificates (from UGX 20,000). All files are delivered print-ready and web-optimised.",
  "logo": "Our branding packages range from a Starter Logo (UGX 30,000 - 1 concept, 1 revision) all the way to a full Brand Identity Package (UGX 500,000 - full identity system, unlimited revisions, all assets). Every tier includes the source files.",
  "branding": "We build brand identities that are distinctive, scalable, and aligned with your business values. Packages start at UGX 30,000 for a Starter Logo up to UGX 500,000 for a full Brand Identity system with guidelines and all assets.",
  "website": "We build fast, responsive, SEO-optimised websites. Packages: Starter Website (UGX 750,000) for personal brands and landing pages, Business Website (UGX 1,500,000) for up to 5+ pages with blog, gallery and analytics, and E-Commerce Website (UGX 3,000,000) with unlimited products, payments, and an admin dashboard. All include mobile-first design, SSL, and 14 days post-launch support.",
  "web application": "Beyond websites, we build custom dashboards, management platforms, booking systems, and data-driven applications. This includes user authentication, database architecture, REST APIs, and payment integration. Web applications start from UGX 3,000,000.",
  "mobile app": "We develop native and cross-platform mobile apps for Android and iOS using React Native or Flutter. Includes backend integration, push notifications, offline functionality, and App Store deployment support. Mobile apps start from UGX 5,000,000.",
  "ai chatbot": "We build AI-powered chatbots for 24/7 customer support, lead capture, and FAQ automation - powered by large language models. Starting from UGX 1,500,000.",
  "ai": "Our AI & Automation solutions include AI Chatbots, Workflow Automation, AI Content Tools, Custom AI Integrations, and Data & Analytics dashboards. We integrate AI into your existing website, app, or business workflows. Starting from UGX 1,500,000.",
  "automation": "We automate repetitive business tasks - emails, reports, data entry, notifications - saving you time and reducing errors. Workflow automation starts from UGX 2,000,000.",
  "strategy": "Our Strategy & Consulting services include Product Discovery, Digital Strategy, and Technical Consultation - helping you plan the right solution before building it.",

  // Process
  "process": "Our process has 7 steps: Inquiry → Discovery Call → Proposal & Scope → Project Confirmation (50% deposit) → Design & Development → Review & Revisions → Final Delivery & Handover. We keep you updated at every milestone.",
  "how long": "Timelines vary by project: graphic design takes 1–4 days, branding 3–7 days, websites 2–6 weeks, web applications 6–12 weeks, and mobile apps 8–16 weeks. Rush delivery is available - contact us to discuss.",
  "timeline": "Timelines depend on complexity: design work 1–4 days, branding 3–7 days, websites 2–6 weeks, web apps 6–12 weeks, mobile apps 8–16 weeks. Rush delivery is available on request.",
  "start a project": "Starting is simple - fill out our project request form on the website, message us on WhatsApp (+256 782062673), or email zidesigns001@gmail.com. We respond within 24 hours and schedule a discovery call to understand your goals.",
  "how do i start": "Just reach out! Fill in the project request form, WhatsApp us on +256 782062673, or email zidesigns001@gmail.com. We acknowledge all inquiries within 24 hours.",

  // Pricing & Payment
  "price": "Our published prices are starting points - your final quote reflects the full scope of your project. Factors include deliverables, complexity, timeline, and revision rounds. Contact us for a tailored quote.",
  "cost": "Pricing starts at UGX 20,000 for simple design work, up to UGX 5,000,000+ for mobile apps. Every quote is scoped to your specific project. Reach out and we'll prepare a clear proposal.",
  "budget": "We work with a range of budgets. Share your project idea and we'll recommend the best option and prepare a transparent proposal with no surprises.",
  "deposit": "A 50% deposit is required before work begins. This secures your project slot and covers initial production. The remaining 50% is due on completion before final files are released.",
  "payment": "We accept Mobile Money (MTN or Airtel), bank transfer, and other mutually agreed methods. A 50% deposit starts the project; the balance is due on completion.",
  "refund": "Deposits are non-refundable once work has commenced. Any concerns are handled in accordance with the terms in your project agreement.",

  // Deliverables & FAQs
  "revisions": "Every package includes a defined number of revision rounds - from 1 round on the Starter Logo up to unlimited on Professional and Brand Identity packages. Additional revisions beyond your package are billed at a small hourly rate.",
  "file format": "Design and branding files are delivered in PNG, JPG, SVG, PDF, and source files (AI, PSD, or Figma) where applicable. Websites are fully deployed and handed over with all credentials.",
  "hosting": "We assist with deployment and setup, but domain registration and hosting are third-party costs billed separately. We guide you through the process and recommend reliable providers.",
  "portfolio": "You can view our work at zidesigns.vercel.app. You can also request a portfolio PDF during your discovery call.",
  "retainer": "Yes, we offer retainer packages for clients who need consistent monthly design or development support. Contact us to discuss a custom arrangement.",

  // Contact
  "contact": "You can reach us via WhatsApp or phone at +256 782062673, email at zidesigns001@gmail.com, or Instagram @zidesigns01. We respond within 24 hours.",
  "whatsapp": "Message us directly on WhatsApp: +256 782062673. It's the fastest way to reach us.",
  "email": "Send us an email at zidesigns001@gmail.com and we'll get back to you within 24 hours.",
  "instagram": "Follow us and send a DM on Instagram @zidesigns01 for updates and project enquiries.",
  "phone": "You can call or WhatsApp us on +256 782062673.",
}

function isAcknowledgement(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim()
  return acknowledgementPhrases.some((phrase) => lowerMessage === phrase || lowerMessage.startsWith(phrase + " "))
}

function isClosing(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim()
  return closingPhrases.some((phrase) => lowerMessage.includes(phrase))
}

function isQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  return questionIndicators.some((indicator) => lowerMessage.includes(indicator))
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
}

function getBestKeywordMatch(message: string): { key: string | null; score: number } {
  const tokens = message
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)

  let bestKey: string | null = null
  let bestScore = 0

  const sortedEntries = Object.entries(aiResponses).sort((a, b) => b[0].length - a[0].length)
  for (const [key] of sortedEntries) {
    const keyTokens = key.split(/\s+/)
    const overlap = keyTokens.filter((t) => tokens.includes(t)).length
    const score = overlap / keyTokens.length
    // Tiebreaker: prefer longer keys when scores are equal
    if (score > bestScore || (score === bestScore && score > 0 && key.length > (bestKey?.length || 0))) {
      bestScore = score
      bestKey = key
    }
  }

  return { key: bestKey, score: bestScore }
}

function getSuggestionGroup(message: string): string[] {
  const lower = message.toLowerCase()
  if (lower.includes("service") || lower.includes("website") || lower.includes("mobile") || lower.includes("graphic")) return responseSuggestions.services
  if (lower.includes("insights") || lower.includes("framework") || lower.includes("gmf") || lower.includes("knowledge")) return responseSuggestions.insights
  if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio")) return responseSuggestions.projects
  if (lower.includes("price") || lower.includes("cost") || lower.includes("budget") || lower.includes("quote")) return responseSuggestions.contact
  if (lower.includes("process") || lower.includes("timeline") || lower.includes("how long") || lower.includes("start")) return responseSuggestions.process
  if (lower.includes("contact") || lower.includes("email") || lower.includes("instagram") || lower.includes("whatsapp")) return responseSuggestions.contact
  return responseSuggestions.fallback
}

function getLinksForText(message: string): ChatLink[] {
  const lower = message.toLowerCase()
  const links: ChatLink[] = []

  for (const entry of keywordSectionLinks) {
    if (entry.keywords.some((keyword) => lower.includes(keyword))) {
      if (!links.some((link) => link.href === entry.link.href)) {
        links.push(entry.link)
      }
    }
  }

  return links
}

export function AIChatbot() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [quickSuggestions, setQuickSuggestions] = useState<string[]>(defaultSuggestions)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lottieContainer = useRef<HTMLDivElement>(null)
  const lottieInstance = useRef<any>(null)

  // Hydrate messages from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem("zi-chat-history")
        if (stored) {
          const parsed = JSON.parse(stored)
          if (Array.isArray(parsed) && parsed.length > 0) {
            setMessages(parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })))
          }
        }
      } catch (e) {
        console.error("Failed to load chat history:", e)
      }
    }
  }, [])

  // Persist messages to localStorage on update (capped at 20)
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const toStore = messages.slice(-20)
        localStorage.setItem("zi-chat-history", JSON.stringify(toStore))
      } catch (e) {
        console.error("Failed to save chat history:", e)
      }
    }
  }, [messages])

  useEffect(() => {
    let isMounted = true

    const loadAnimation = async () => {
      if (!lottieContainer.current) return

      try {
        const response = await fetch("/animation/avatarx.json")
        const animationData = await response.json()
        if (!isMounted || !lottieContainer.current) return

        lottieInstance.current?.destroy()
        lottieInstance.current = lottie.loadAnimation({
          container: lottieContainer.current,
          renderer: "svg",
          loop: true,
          autoplay: true,
          animationData,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid meet",
          },
        })
      } catch (error) {
        console.error("Failed to load avatar animation:", error)
      }
    }

    loadAnimation()

    return () => {
      isMounted = false
      lottieInstance.current?.destroy()
      lottieInstance.current = null
    }
  }, [])

  useEffect(() => {
    if (!lottieInstance.current) return
    if (isOpen) {
      lottieInstance.current.pause()
    } else {
      lottieInstance.current.play()
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Adjust link hrefs based on current page
  const adjustLinkHref = (href: string): string => {
    // If on homepage, keep hash links as-is
    if (pathname === "/") {
      return href
    }
    // If on other pages and it's a hash link, prepend "/" to point to homepage
    if (href.startsWith("#")) {
      return "/" + href
    }
    // Otherwise keep as-is (absolute paths like /start-project)
    return href
  }

  const buildAIReply = (userText: string): { text: string; suggestions: string[]; links: ChatLink[] } => {
    const normalizedMessage = normalizeInput(userText)
    const contextualLinks = getLinksForText(normalizedMessage)

    if (isAcknowledgement(normalizedMessage)) {
      return { text: getRandomResponse(acknowledgementResponses), suggestions: defaultSuggestions, links: contextualLinks }
    }

    if (isClosing(normalizedMessage)) {
      return {
        text: getRandomResponse(closingResponses),
        suggestions: ["Start a new project", "Show me your services", "How can I contact you?"],
        links: [{ label: "Go to Contact", href: "#contact" }],
      }
    }

    // Sort by key length (longest first) to ensure specific phrases match before generic substrings
    const sortedEntries = Object.entries(aiResponses).sort((a, b) => b[0].length - a[0].length)
    for (const [key, response] of sortedEntries) {
      if (normalizedMessage.includes(key)) {
        const keyLinks = getLinksForText(key)
        let finalLinks = keyLinks.length > 0 ? keyLinks : contextualLinks
        // Add contact link for pricing-related responses
        if (key === "price" || key === "cost" || key === "budget") {
          const contactLink = { label: "Want a full quote? Contact us", href: "#contact" }
          if (!finalLinks.some((link) => link.href === contactLink.href)) {
            finalLinks = [...finalLinks, contactLink]
          }
        }
        return { text: response, suggestions: getSuggestionGroup(key), links: finalLinks }
      }
    }

    if (isQuestion(normalizedMessage)) {
      const bestMatch = getBestKeywordMatch(normalizedMessage)
      if (bestMatch.key && bestMatch.score >= 0.5) {
        const matchLinks = getLinksForText(bestMatch.key)
        let finalLinks = matchLinks.length > 0 ? matchLinks : contextualLinks
        // Add contact link for pricing-related matches
        if (bestMatch.key === "price" || bestMatch.key === "cost" || bestMatch.key === "budget") {
          const contactLink = { label: "Want a full quote? Contact us", href: "#contact" }
          if (!finalLinks.some((link) => link.href === contactLink.href)) {
            finalLinks = [...finalLinks, contactLink]
          }
        }
        return {
          text: aiResponses[bestMatch.key],
          suggestions: getSuggestionGroup(bestMatch.key),
          links: finalLinks,
        }
      }

      // Low-confidence fallback: always include contact link
      const fallbackLinks = contextualLinks.length > 0 
        ? contextualLinks 
        : [{ label: "Go to Contact", href: "#contact" }]
      const contactLink = { label: "Go to Contact", href: "#contact" }
      if (!fallbackLinks.some((link) => link.href === contactLink.href)) {
        fallbackLinks.push(contactLink)
      }
      return {
        text: "Great question. I may not have a direct answer yet, but I can help you with services, timelines, projects, and contact options. What would you like to explore next?",
        suggestions: defaultSuggestions,
        links: fallbackLinks,
      }
    }

    // Final fallback: always include contact link
    const finalFallbackLinks = contextualLinks.length > 0 
      ? contextualLinks 
      : [{ label: "Go to Contact", href: "#contact" }]
    const contactLink = { label: "Go to Contact", href: "#contact" }
    if (!finalFallbackLinks.some((link) => link.href === contactLink.href)) {
      finalFallbackLinks.push(contactLink)
    }
    return {
      text: "I can help with services, timelines, project examples, and how to get started. Tap a suggestion below or ask anything in your own words.",
      suggestions: defaultSuggestions,
      links: finalFallbackLinks,
    }
  }

  const submitUserMessage = (text: string) => {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: trimmed,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setQuickSuggestions([])
    setIsLoading(true)

    setTimeout(() => {
      const reply = buildAIReply(trimmed)

      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: reply.text,
        sender: "ai",
        timestamp: new Date(),
        links: reply.links,
      }

      setMessages((prev) => [...prev, aiResponse])
      setQuickSuggestions(reply.suggestions)
      setIsLoading(false)
    }, 500)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    submitUserMessage(inputValue)
  }

  const handleSuggestionClick = (suggestion: string) => {
    submitUserMessage(suggestion)
  }

  const handleClearChat = () => {
    setMessages([
      {
        ...initialMessages[0],
        id: Date.now().toString(),
        timestamp: new Date(),
      },
    ])
    setInputValue("")
    setQuickSuggestions(defaultSuggestions)
    setIsLoading(false)
    // Clear localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem("zi-chat-history")
      } catch (e) {
        console.error("Failed to clear chat history:", e)
      }
    }
  }

  return (
    <>
      {/* FAB Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[80] flex items-center justify-center h-16 w-16 rounded-full bg-[var(--primary)] text-black shadow-2xl hover:shadow-[0_10px_30px_rgba(64,224,208,0.4)] transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-page focus:ring-[var(--primary)]"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isOpen ? (
          <span className="absolute -top-3 -left-3 rounded-2xl bg-surface text-fg text-[10px] font-semibold px-2 py-1 border border-base shadow-sm leading-none">
            Chat
          </span>
        ) : null}
        <div className="h-11 w-11">
          <div ref={lottieContainer} className="h-full w-full" />
        </div>
        {isOpen ? (
          <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-surface text-fg border border-base flex items-center justify-center">
            <X className="h-3 w-3" />
          </span>
        ) : null}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close chat"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[65] bg-transparent"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ duration: 0.2 }}
              className="fixed bottom-24 right-6 z-[75] w-96 max-w-[calc(100vw-32px)] h-[600px] max-h-[80vh] rounded-2xl bg-surface border border-base shadow-2xl flex flex-col overflow-hidden"
            >
            {/* Header */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 px-6 py-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 style={{ color: '#000' }} className="text-lg font-semibold">Zi AI Assistant</h3>
                  <p className="text-sm text-black/70">Always here to help</p>
                </div>
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="inline-flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-1 text-[11px] font-semibold text-black hover:bg-black/15 transition-colors"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`rounded-2xl px-4 py-2 max-w-xs text-sm whitespace-pre-wrap ${
                      message.sender === "user"
                        ? "bg-[var(--primary)] text-black rounded-br-none"
                        : "bg-surface-alt text-fg rounded-bl-none border border-base/50"
                    }`}
                  >
                    {message.text}
                    {message.sender === "ai" && message.links && message.links.length > 0 ? (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {message.links.map((link) => (
                          <a
                            key={`${message.id}-${link.href}`}
                            href={adjustLinkHref(link.href)}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex rounded-full border border-base bg-page/60 px-2.5 py-1 text-[11px] font-semibold text-fg hover:bg-page transition-colors"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-surface-alt text-fg rounded-2xl rounded-bl-none border border-base/50 px-4 py-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-fg rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-fg rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-fg rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="border-t border-base px-4 py-3 bg-page/50">
              {quickSuggestions.length > 0 ? (
                <div className="mb-3 flex flex-wrap gap-2">
                  {quickSuggestions.slice(0, 3).map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => handleSuggestionClick(suggestion)}
                      disabled={isLoading}
                      className="rounded-full border border-base bg-surface px-3 py-1.5 text-xs text-fg hover:bg-surface-alt transition-colors disabled:opacity-50"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              ) : null}
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything..."
                  disabled={isLoading}
                  className="flex-1 rounded-full bg-surface border border-base px-4 py-2 text-sm text-fg placeholder-muted focus:outline-none focus:border-[var(--primary)] transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-[var(--primary)] hover:bg-[var(--primary)]/90 disabled:opacity-50 text-black rounded-full p-2 transition-all duration-200 flex items-center justify-center h-10 w-10"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
