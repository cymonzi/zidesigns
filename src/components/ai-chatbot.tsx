"use client"

import { useState, useRef, useEffect } from "react"
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
  "How do I start a project?",
  "Show me recent projects",
  "How can I contact you?",
]

const responseSuggestions: Record<string, string[]> = {
  services: ["Tell me about website development", "Tell me about mobile app design", "Tell me about graphic design"],
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
  { keywords: ["work", "projects", "portfolio"], link: { label: "View Work", href: "#work" } },
  { keywords: ["contact", "email", "instagram", "whatsapp", "start project"], link: { label: "Go to Contact", href: "#contact" } },
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

const aiResponses: Record<string, string> = {
  // About Zi Designs
  "what is zi designs": "Zi Designs is a creative-tech studio that designs websites, mobile apps, and visual systems for startups, creators, and organizations. We combine design, development, and AI tools to turn ideas into real digital products.",
  "who founded": "Zi Designs was founded by Musinguzi Simon Peter, a creative-tech leader passionate about building impactful digital products.",
  
  // Services
  "website": "We design and build modern, responsive websites that help businesses present their services clearly and attract new clients. Check out our work on Futureline Solutions and Workmasters Website.",
  "mobile app": "We design mobile app interfaces and wireframes that focus on usability, clarity, and real-world user needs. Check out our Nfunayo wireframes for an example.",
  "graphic design": "We design visual assets that communicate ideas clearly and professionally. Our work includes logos, posters, and other design assets.",
  "services": "Zi Designs offers services in Website Development, Mobile App Design, Graphic Design, and Video Editing. What would you like to know more about?",
  
  // Projects
  "futureline": "Futureline Solutions is a modern website we built to help them present their vision and connect with clients. You can check it out at https://futureline-ten.vercel.app/",
  "workmasters": "Workmasters Website is a professional website we designed to present services clearly and help the company reach new clients. You can visit it at https://workmasters.vercel.app",
  "nfunayo": "Nfunayo is a mobile app we designed with wireframes focused on usability and user needs. It's a simple expense tracking application.",
  "projects": "Our recent work includes: Futureline Solutions, Workmasters Website, Nfunayo App Wireframes, and graphic design projects like logos and posters. Would you like details about any of these?",
  "work": "We have a variety of work including Futureline Solutions, the Workmasters Website, Nfunayo app wireframes, and graphic design projects like logos and posters.",
  
  // Process & Timeline
  "how long": "Project timelines vary depending on complexity. Typically, websites take 4-8 weeks, mobile apps 8-12 weeks, and design work 1-4 weeks.",
  "timeline": "Project timelines vary depending on complexity. Typically, websites take 4-8 weeks, mobile apps 8-12 weeks, and design work 1-4 weeks.",
  "process": "Our process includes: discovery & planning, design & prototyping, development, testing, and launch. We keep you involved at every stage.",
  "start a project": "You can start by filling out the contact form on our website or messaging us directly on WhatsApp or email. Tell us about your idea and we'll discuss how we can help!",
  
  // Pricing
  "price": "Pricing is handled directly between client and business based on your exact scope. Please contact us and we will share the right package for your project.",
  "cost": "Pricing is handled directly between client and business based on your exact scope. Please contact us and we will share the right package for your project.",
  "budget": "Let's discuss your project goals directly and share a tailored quote. Reach us through the contact form, email, or Instagram.",
  
  // Contact
  "contact": "You can reach us through: the contact form on our website, Instagram (@zidesigns01), or email at zidesigns001@gmail.com. We respond quickly!",
  "email": "You can email us at zidesigns001@gmail.com or fill out the contact form on our website.",
  "instagram": "You can reach us on Instagram @zidesigns01. Follow us for updates and behind-the-scenes content!",
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

  for (const key of Object.keys(aiResponses)) {
    const keyTokens = key.split(/\s+/)
    const overlap = keyTokens.filter((t) => tokens.includes(t)).length
    const score = overlap / keyTokens.length
    if (score > bestScore) {
      bestScore = score
      bestKey = key
    }
  }

  return { key: bestKey, score: bestScore }
}

function getSuggestionGroup(message: string): string[] {
  const lower = message.toLowerCase()
  if (lower.includes("service") || lower.includes("website") || lower.includes("mobile") || lower.includes("graphic")) return responseSuggestions.services
  if (lower.includes("project") || lower.includes("work") || lower.includes("portfolio")) return responseSuggestions.projects
  if (lower.includes("price") || lower.includes("cost") || lower.includes("budget") || lower.includes("quote")) return responseSuggestions.contact
  if (lower.includes("process") || lower.includes("timeline") || lower.includes("how long") || lower.includes("start")) return responseSuggestions.process
  if (lower.includes("contact") || lower.includes("email") || lower.includes("instagram") || lower.includes("whatsapp")) return responseSuggestions.contact
  return responseSuggestions.fallback
}

function isPricingRelated(message: string): boolean {
  const lower = message.toLowerCase()
  return lower.includes("price") || lower.includes("pricing") || lower.includes("cost") || lower.includes("budget") || lower.includes("quote")
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
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [quickSuggestions, setQuickSuggestions] = useState<string[]>(defaultSuggestions)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const lottieContainer = useRef<HTMLDivElement>(null)
  const lottieInstance = useRef<any>(null)

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

  const buildAIReply = (userText: string): { text: string; suggestions: string[]; links: ChatLink[] } => {
    const lowerMessage = userText.toLowerCase().trim()
    const contextualLinks = getLinksForText(lowerMessage)

    if (isAcknowledgement(lowerMessage)) {
      return { text: getRandomResponse(acknowledgementResponses), suggestions: defaultSuggestions, links: contextualLinks }
    }

    if (isClosing(lowerMessage)) {
      return {
        text: getRandomResponse(closingResponses),
        suggestions: ["Start a new project", "Show me your services", "How can I contact you?"],
        links: [{ label: "Go to Contact", href: "#contact" }],
      }
    }

    for (const [key, response] of Object.entries(aiResponses)) {
      if (lowerMessage.includes(key)) {
        const keyLinks = getLinksForText(key)
        return { text: response, suggestions: getSuggestionGroup(key), links: keyLinks.length > 0 ? keyLinks : contextualLinks }
      }
    }

    if (isQuestion(lowerMessage)) {
      const bestMatch = getBestKeywordMatch(lowerMessage)
      if (bestMatch.key && bestMatch.score >= 0.5) {
        const matchLinks = getLinksForText(bestMatch.key)
        return {
          text: aiResponses[bestMatch.key],
          suggestions: getSuggestionGroup(bestMatch.key),
          links: matchLinks.length > 0 ? matchLinks : contextualLinks,
        }
      }

      return {
        text: "Great question. I may not have a direct answer yet, but I can help you with services, timelines, projects, and contact options. What would you like to explore next?",
        suggestions: defaultSuggestions,
        links: contextualLinks,
      }
    }

    return {
      text: "I can help with services, timelines, project examples, and how to get started. Tap a suggestion below or ask anything in your own words.",
      suggestions: defaultSuggestions,
      links: contextualLinks,
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
    if (isPricingRelated(suggestion)) {
      submitUserMessage("How can I contact you?")
      return
    }
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
                  <h3 className="text-lg font-semibold text-black">Zi AI Assistant</h3>
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
                            href={link.href}
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
