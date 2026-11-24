"use client"

import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { RotateCcw, Send, X, ArrowLeft, ArrowUpRight } from "lucide-react"
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
  external?: boolean
}

type TopicCategory =
  | "services"
  | "graphic-design"
  | "website"
  | "saas"
  | "mobile-app"
  | "learn"
  | "cymonzi"
  | "projects"
  | "process"
  | "pricing"
  | "contact"
  | "general"

const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hi 👋\nI'm the **Zi Designs** assistant.\nAsk me about our **services & packages**, **recent projects**, **Learn (GMF)**, or how to **start a project**.",
    sender: "ai",
    timestamp: new Date(),
  },
]

const defaultSuggestions = [
  "What services do you offer?",
  "Compare website packages",
  "Tell me about Learn",
  "How do I start a project?",
]

const responseSuggestions: Record<TopicCategory, string[]> = {
  services: [
    "Graphic & Brand Design prices",
    "Compare website packages",
    "Web Apps & SaaS packages",
  ],
  "graphic-design": [
    "How much is a logo or CV?",
    "Show me recent projects",
    "How do I start a project?",
  ],
  website: [
    "What is included in Starter Website?",
    "How long does a website take?",
    "Show me website work",
  ],
  saas: [
    "What is included in SaaS MVP?",
    "Tell me about mobile apps",
    "How do I start a project?",
  ],
  "mobile-app": [
    "Mobile App Starter vs Business App",
    "How long do projects take?",
    "How do I start a project?",
  ],
  learn: [
    "Who is From Gift to Income for?",
    "How much is the Learn program?",
    "What is the GMF framework?",
  ],
  cymonzi: [
    "What is New Wave UG?",
    "What services do you offer?",
    "How can I contact you?",
  ],
  projects: [
    "Compare website packages",
    "Mobile app packages",
    "How do I start a project?",
  ],
  process: [
    "How long do projects take?",
    "What are the payment terms?",
    "How can I contact you?",
  ],
  pricing: [
    "Compare website packages",
    "Graphic & Brand Design prices",
    "What are the payment terms?",
  ],
  contact: [
    "What is your process?",
    "What services do you offer?",
    "Compare website packages",
  ],
  general: defaultSuggestions,
}

const keywordSectionLinks: Array<{ keywords: string[]; link: ChatLink }> = [
  { keywords: ["services", "offer"], link: { label: "View Services", href: "#services" } },
  {
    keywords: ["graphic", "poster", "flyer", "logo", "cv", "certificate", "presentation", "company profile", "magazine"],
    link: { label: "Graphic Design Packages", href: "/graphic-design-packages?from=home" },
  },
  {
    keywords: ["website", "landing page", "starter website", "business website", "web platform", "futureline", "workmasters"],
    link: { label: "Website Packages", href: "/website-packages?from=home" },
  },
  {
    keywords: ["saas", "web app", "web application", "smart tool", "dashboard", "beyond", "automation", "ai"],
    link: { label: "SaaS & Web App Packages", href: "/saas-packages?from=home" },
  },
  {
    keywords: ["mobile app", "mobile", "android", "ios", "offscreen", "nfunayo", "litywise"],
    link: { label: "Mobile App Packages", href: "/mobile-app-packages?from=home" },
  },
  {
    keywords: ["learn", "knowledge hub", "framework", "gmf", "gift maturation", "gift to income", "program", "course"],
    link: { label: "Explore Learn", href: "/learn" },
  },
  {
    keywords: ["cymonzi", "music", "new wave ug", "sonic", "song", "artist"],
    link: { label: "Enter Artist Hub", href: "https://cymonzi-site.vercel.app/", external: true },
  },
  {
    keywords: ["start a project", "start project", "how do i start", "how to start", "quote", "hire", "request"],
    link: { label: "Start a Project", href: "/start-project" },
  },
  {
    keywords: ["deposit", "payment", "refund", "cost", "price", "budget", "pricing", "how much"],
    link: { label: "Start a Project", href: "/start-project" },
  },
  {
    keywords: ["work", "projects", "portfolio", "examples", "recent"],
    link: { label: "View Services & Work", href: "#services" },
  },
  {
    keywords: ["whatsapp"],
    link: { label: "Chat on WhatsApp", href: "https://wa.me/256782062673", external: true },
  },
  {
    keywords: ["contact", "email", "instagram", "phone"],
    link: { label: "Start a Project", href: "/start-project" },
  },
]

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

const acknowledgementResponses = [
  "You're welcome! Let me know if you'd like to explore any package or start a project.",
  "Happy to help! Feel free to ask about pricing, timelines, or any service.",
  "Anytime! What else would you like to know about Zi Designs?",
  "Glad I could help! Tap a suggestion below or ask anything else.",
]

const closingPhrases = ["bye", "goodbye", "thanks anyway", "that's all", "no thanks", "later"]

const closingResponses = [
  "Thanks for chatting! Whenever you're ready to build with Zi Designs, you can start a project in under 2 minutes.",
  "Talk soon! Feel free to reach out anytime you want to launch your next website, app, or design project.",
  "Take care! We're here whenever you're ready to bring your next idea to life.",
]

const greetingPhrases = ["hi", "hello", "hey", "good morning", "good afternoon", "good evening", "yo"]

const questionIndicators = [
  "what",
  "how",
  "do you",
  "can you",
  "where",
  "when",
  "why",
  "who",
  "which",
  "?",
  "tell me",
  "explain",
  "show",
  "compare",
  "price",
  "cost",
]

const aliasMap: Record<string, string> = {
  mobileapp: "mobile app",
  mobil: "mobile",
  webapp: "web app",
  "web application": "web app",
  logos: "logo",
  websites: "website",
  apps: "mobile app",
  "gift to income": "from gift to income",
  flyers: "poster",
  posters: "poster",
}

function normalizeInput(text: string): string {
  let normalized = text.toLowerCase().trim()
  for (const [alias, replacement] of Object.entries(aliasMap)) {
    normalized = normalized.replace(new RegExp(`\\b${alias}\\b`, "g"), replacement)
  }
  return normalized
}

interface KnowledgeEntry {
  key: string
  category: TopicCategory
  keywords: string[]
  response: string
  links: ChatLink[]
}

const knowledgeBase: KnowledgeEntry[] = [
  // Services Overview
  {
    key: "services",
    category: "services",
    keywords: ["services", "what do you offer", "what do you do", "offerings", "help me with"],
    response:
      "We focus on **4 core service areas** built for speed and clarity:\n\n• **01 Graphic & Brand Design** (from **UGX 20,000**): Posters, flyers, CVs, presentations, company profiles, and logos.\n• **02 Website Development** (from **UGX 750,000**): Starter, Business, and interactive Web Platform packages.\n• **03 Web Apps & SaaS** (from **UGX 5,000,000**): Custom business tools, workflow automation, and full SaaS products.\n• **04 Mobile App Development** (from **UGX 5,000,000**): Android and iOS apps from MVP to enterprise scale.\n\nWhich area would you like to explore?",
    links: [
      { label: "View Services", href: "#services" },
      { label: "Start a Project", href: "/start-project" },
    ],
  },

  // 01 Graphic & Brand Design
  {
    key: "graphic design",
    category: "graphic-design",
    keywords: ["graphic design", "graphic", "design prices", "poster", "flyer", "certificate", "magazine", "company profile", "presentation"],
    response:
      "Our **01 Graphic & Brand Design** packages deliver print-ready and web-optimized assets:\n\n• **Posters & Flyers:** from **UGX 20,000**\n• **Certificates:** from **UGX 20,000**\n• **Presentations:** **UGX 100,000** (up to 10 slides)\n• **Company Profiles:** **UGX 100,000** (up to 10 pages)\n• **Magazine Design:** **UGX 100,000** (up to 10 pages)\n• **CV Design:** **UGX 150,000**\n• **Logo Design:** **UGX 200,000**\n\nYou can select multiple items and quantities directly in our Graphic Design package builder.",
    links: [
      { label: "Graphic Design Packages", href: "/graphic-design-packages?from=home" },
      { label: "View Recent Designs", href: "#service-graphic-design" },
    ],
  },
  {
    key: "logo",
    category: "graphic-design",
    keywords: ["logo", "branding", "brand identity", "cv", "cv design", "resume"],
    response:
      "Here are our **Branding & Professional Design** starting prices:\n\n• **Logo Design:** **UGX 200,000** (custom concepts, revisions, and full source files)\n• **CV Design:** **UGX 150,000** (modern layout, editable source + PDF)\n• **Company Profiles & Presentations:** **UGX 100,000** (up to 10 pages/slides)\n• **Posters, Flyers & Certificates:** from **UGX 20,000**",
    links: [
      { label: "Graphic Design Packages", href: "/graphic-design-packages?from=home" },
      { label: "Start a Project", href: "/start-project" },
    ],
  },

  // 02 Website Development
  {
    key: "website",
    category: "website",
    keywords: ["website", "compare website packages", "website packages", "web design", "starter website", "business website", "web platform", "landing page"],
    response:
      "Our **02 Website Development** packages include responsive UI, SEO setup, and deployment:\n\n• **01 Starter Website (UGX 750,000):** Up to 3 pages, WhatsApp & contact integration, basic SEO, domain included.\n• **02 Business Website (UGX 1,500,000):** Up to 6 to 8 pages, gallery/portfolio, Google Maps & Analytics, hosting + business email included.\n• **03 Web Platform (UGX 3,000,000):** Custom web app/PWA with user login, dashboard, admin panel, and database.\n\nRecent live builds include **Futureline Solutions** and **The Workmasters**.",
    links: [
      { label: "Compare Website Packages", href: "/website-packages?from=home" },
      { label: "Website Showcase", href: "#service-website" },
    ],
  },

  // 03 Web Apps & SaaS
  {
    key: "saas",
    category: "saas",
    keywords: ["saas", "web app", "smart tools", "saas mvp", "business saas", "enterprise saas", "beyond", "dashboard", "workflow", "automation", "ai"],
    response:
      "Our **03 Web Apps & SaaS** packages are built for startups and businesses automating workflows or launching software products:\n\n• **01 SaaS MVP (UGX 5,000,000):** User accounts, core product features, user & admin dashboards, database, basic payments, deployment.\n• **02 Business SaaS (UGX 10,000,000):** Multiple user roles, subscription & payment systems, advanced workflows, third-party integrations, analytics.\n• **03 Enterprise SaaS (UGX 20,000,000):** Multi-tenant architecture, custom APIs, automation, AI integrations, real-time features, and extended support.\n\nCheck out **Beyond** in our showcase for a live example.",
    links: [
      { label: "View SaaS Packages", href: "/saas-packages?from=home" },
      { label: "Web Apps Showcase", href: "#service-smart-tools" },
    ],
  },

  // 04 Mobile App Development
  {
    key: "mobile app",
    category: "mobile-app",
    keywords: ["mobile app", "mobile", "android", "ios", "flutter", "mobile app starter", "offscreen", "nfunayo", "litywise"],
    response:
      "Our **04 Mobile App Development** packages cover Android and iOS from MVP to full scale:\n\n• **01 Mobile App Starter (UGX 5,000,000):** Up to 8 screens (Android or iOS), user login, basic database & API integration, deployment.\n• **02 Business Mobile App (UGX 10,000,000):** Up to 20 screens (Android & iOS), push notifications, payments, maps, admin dashboard, analytics.\n• **03 Advanced Mobile App (UGX 20,000,000):** 20+ screens, custom backend & APIs, real-time & AI features, offline support, and training.\n\nFeatured mobile work includes **Offscreen**, **Nfunayo**, and **Litywise**.",
    links: [
      { label: "Mobile App Packages", href: "/mobile-app-packages?from=home" },
      { label: "Mobile Showcase", href: "#service-mobile-app" },
    ],
  },

  // Learn & GMF
  {
    key: "learn",
    category: "learn",
    keywords: ["learn", "from gift to income", "gmf", "gift maturation", "framework", "program", "course", "training", "knowledge hub"],
    response:
      "**From Gift to Income** is our 4-week practical program on the **Learn** page, powered by **The Gift Maturation Framework (GMF)**:\n\n• **Starting:** Happening in 2027 (4 Weeks · Saturdays · 3:00 PM)\n• **Format:** Hybrid (Physical + Online)\n• **Investment:** **UGX 250,000**\n• **Who it's for:** Fresh Graduates, Young Professionals, Aspiring Entrepreneurs, Freelancers & Creators, and Early-Stage Business Owners.\n• **Pathway:** Gift → Product → Brand → Technology → Offers → Income → Wealth.\n\nYou can watch the GMF Trailer and apply directly on the Learn page.",
    links: [{ label: "Go to Learn Page", href: "/learn" }],
  },

  // Cymonzi / Music
  {
    key: "cymonzi",
    category: "cymonzi",
    keywords: ["cymonzi", "music", "new wave ug", "sonic architecture", "artist hub", "songs", "sound"],
    response:
      "Beyond client systems and digital products, our creative direction extends into original music under **Cymonzi**.\n\n• **Identity:** Kampala-based artist and sonic architect interpreting **New Wave UG**, bridging memory, city energy, and global frequencies.\n• **Experience:** Explore official music videos, audio transmissions, and merch drops in the dedicated Artist Hub.",
    links: [
      { label: "Enter Artist Hub", href: "https://cymonzi-site.vercel.app/", external: true },
      { label: "View Spotlight", href: "#cymonzi" },
    ],
  },

  // Portfolio / Projects
  {
    key: "projects",
    category: "projects",
    keywords: ["recent projects", "portfolio", "examples", "show me work", "past work", "websites built", "clients", "futureline", "workmasters"],
    response:
      "Here are some of our featured projects across the platform:\n\n• **Websites:** **Futureline Solutions** and **The Workmasters**\n• **Web Apps & SaaS:** **Beyond** (finance & account tracking platform)\n• **Mobile Apps:** **Offscreen** (APK available), **Nfunayo**, and **Litywise**\n• **Graphic Design:** GMF visual series, Builder Profiles, Coffee Farmers Training, Course Masters, and WM Poster.",
    links: [
      { label: "Explore Showcase", href: "#services" },
      { label: "Start a Project", href: "/start-project" },
    ],
  },

  // Pricing Overview
  {
    key: "pricing",
    category: "pricing",
    keywords: ["price", "pricing", "cost", "how much", "budget", "packages", "rates", "quote"],
    response:
      "Here is a quick summary of our starting prices:\n\n• **Graphic & Brand Design:** **UGX 20,000** (Posters/Certificates) to **UGX 200,000** (Logo)\n• **Website Development:** **UGX 750,000** (Starter) · **UGX 1,500,000** (Business) · **UGX 3,000,000** (Web Platform)\n• **Web Apps & SaaS:** **UGX 5,000,000** (MVP) to **UGX 20,000,000** (Enterprise)\n• **Mobile Apps:** **UGX 5,000,000** (Starter) to **UGX 20,000,000** (Advanced)\n• **Learn (From Gift to Income):** **UGX 250,000**\n\nYou can generate an instant PDF quote in our Start Project flow.",
    links: [
      { label: "Get Instant Quote", href: "/start-project" },
      { label: "View Services", href: "#services" },
    ],
  },

  // Payment & Deposit
  {
    key: "payment",
    category: "process",
    keywords: ["payment", "deposit", "refund", "pay", "installments", "mobile money", "usd"],
    response:
      "Our payment structure is simple and transparent:\n\n• **50% Deposit:** Required to confirm your project slot and begin production.\n• **50% Final Balance:** Due upon completion before final files or live credentials are handed over.\n• **Methods:** Mobile Money (MTN / Airtel), bank transfer, and USD or UGX arrangements for international clients.",
    links: [{ label: "Start a Project", href: "/start-project" }],
  },

  // Process & Timelines
  {
    key: "process",
    category: "process",
    keywords: ["process", "how do you work", "steps", "workflow", "how do i start", "start a project", "onboarding"],
    response:
      "Starting a project takes just a few minutes:\n\n• **1. Select Your Package:** Pick a service tier or customize your deliverables on `/start-project`.\n• **2. Instant Summary & PDF:** Review your scope and download a project summary PDF.\n• **3. Discovery & Confirmation:** We review your request within 24 hours, align on timeline, and kick off with a 50% deposit.\n• **4. Build, Review & Launch:** Collaborative milestones, revisions, and full handover.",
    links: [
      { label: "Start a Project", href: "/start-project" },
      { label: "Chat on WhatsApp", href: "https://wa.me/256782062673", external: true },
    ],
  },
  {
    key: "timeline",
    category: "process",
    keywords: ["how long", "timeline", "duration", "delivery time", "turnaround", "deadline", "fast"],
    response:
      "Typical turnaround times by service:\n\n• **Graphic Design:** 1 to 4 days\n• **Logo & Branding:** 3 to 7 days\n• **Websites:** 2 to 6 weeks\n• **Web Apps & SaaS:** 6 to 12 weeks\n• **Mobile Apps:** 8 to 16 weeks\n\nNeed rush delivery? Let us know your target launch date when submitting your project.",
    links: [{ label: "Start a Project", href: "/start-project" }],
  },

  // Deliverables, Revisions, Hosting
  {
    key: "revisions",
    category: "process",
    keywords: ["revisions", "file format", "source files", "hosting", "domain", "maintenance", "support", "retainer"],
    response:
      "Here is how we handle deliverables, revisions, and hosting:\n\n• **Revisions:** Every package includes dedicated revision rounds to make sure you're happy with the result.\n• **Files & Ownership:** Print-ready and web-optimized files (PNG, JPG, PDF, SVG, Figma/source where applicable) plus full code/credential handover.\n• **Domains & Hosting:** Starter Website includes domain setup, and Business Website includes hosting and business email setup.",
    links: [
      { label: "Compare Website Packages", href: "/website-packages?from=home" },
      { label: "Start a Project", href: "/start-project" },
    ],
  },

  // About & Location
  {
    key: "about",
    category: "general",
    keywords: ["what is zi designs", "who founded", "founder", "simon peter", "musinguzi", "where are you located", "location", "kampala", "uganda", "outside uganda"],
    response:
      "**Zi Designs** is a Kampala-based creative-tech studio founded by **Simon Peter Musinguzi**.\n\nWe combine UI/UX design, web and mobile engineering, branding, and AI-powered tools to help startups, businesses, and creators across Uganda and internationally move from idea to execution faster.",
    links: [
      { label: "View Services", href: "#services" },
      { label: "Start a Project", href: "/start-project" },
    ],
  },

  // Contact
  {
    key: "contact",
    category: "contact",
    keywords: ["contact", "whatsapp", "email", "instagram", "phone", "call", "reach you", "talk"],
    response:
      "You can reach Zi Designs directly through any of these channels:\n\n• **Project Request Form:** `/start-project` (fastest way to scope a quote)\n• **WhatsApp / Phone:** **+256 782 062 673**\n• **Email:** **zidesigns001@gmail.com**\n• **Instagram:** **@zidesigns01**\n\nWe respond to all inquiries within 24 hours.",
    links: [
      { label: "Start a Project", href: "/start-project" },
      { label: "WhatsApp Us", href: "https://wa.me/256782062673", external: true },
    ],
  },
]

function isAcknowledgement(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim()
  return acknowledgementPhrases.some(
    (phrase) => lowerMessage === phrase || lowerMessage.startsWith(phrase + " ")
  )
}

function isClosing(message: string): boolean {
  const lowerMessage = message.toLowerCase().trim()
  return closingPhrases.some((phrase) => lowerMessage.includes(phrase))
}

function isGreetingOnly(message: string): boolean {
  const clean = message.toLowerCase().replace(/[^a-z\s]/g, "").trim()
  return greetingPhrases.includes(clean)
}

function isQuestion(message: string): boolean {
  const lowerMessage = message.toLowerCase()
  return questionIndicators.some((indicator) => lowerMessage.includes(indicator))
}

function getRandomResponse(responses: string[]): string {
  return responses[Math.floor(Math.random() * responses.length)]
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

  return links.slice(0, 3)
}

/** Match user query against knowledgeBase with multi-keyword scoring + follow-up context memory */
function findBestKnowledgeEntry(
  normalizedMessage: string,
  lastCategory: TopicCategory
): KnowledgeEntry | null {
  // 1. Check follow-up pronouns ("how much is it", "what's included", "what are the packages")
  const isFollowUpPrice =
    /\b(how much|price|cost|packages|tiers|included)\b/.test(normalizedMessage) &&
    !/\b(website|mobile|graphic|saas|logo|learn|gmf)\b/.test(normalizedMessage)

  if (isFollowUpPrice) {
    const contextMatch = knowledgeBase.find((entry) => entry.category === lastCategory)
    if (contextMatch) return contextMatch
  }

  // 2. Score every knowledge entry by phrase & token overlap
  const tokens = normalizedMessage
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)

  let bestEntry: KnowledgeEntry | null = null
  let bestScore = 0

  for (const entry of knowledgeBase) {
    let score = 0

    for (const kw of entry.keywords) {
      if (normalizedMessage.includes(kw)) {
        // Exact substring phrase match gets high weight proportional to length
        score += 3 + kw.split(" ").length * 1.5
      } else {
        const kwTokens = kw.split(/\s+/)
        const overlap = kwTokens.filter((t) => tokens.includes(t)).length
        if (overlap > 0) {
          score += (overlap / kwTokens.length) * 1.8
        }
      }
    }

    if (score > bestScore) {
      bestScore = score
      bestEntry = entry
    }
  }

  return bestScore >= 1.2 ? bestEntry : null
}

function isRelevantToProject(message: string): boolean {
  const relevantKeywords = [
    "design",
    "website",
    "web",
    "mobile",
    "app",
    "graphic",
    "logo",
    "branding",
    "saas",
    "automation",
    "ai",
    "service",
    "price",
    "cost",
    "budget",
    "timeline",
    "project",
    "work",
    "portfolio",
    "contact",
    "email",
    "whatsapp",
    "instagram",
    "start",
    "process",
    "payment",
    "deposit",
    "refund",
    "learn",
    "framework",
    "gmf",
    "gift",
    "cymonzi",
    "music",
    "kampala",
    "uganda",
    "zi",
    "package",
    "revision",
    "cv",
    "poster",
    "flyer",
  ]

  const lower = message.toLowerCase()
  return relevantKeywords.some((keyword) => lower.includes(keyword))
}

/** Lightweight inline formatter for **bold** segments and bullet lists */
function renderFormattedText(text: string) {
  const lines = text.split("\n")

  const formatInline = (line: string) => {
    const parts = line.split(/(\*\*[^*]+\*\*)/g)
    return parts.map((part, idx) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={idx} className="font-semibold text-fg">
            {part.slice(2, -2)}
          </strong>
        )
      }
      return <span key={idx}>{part}</span>
    })
  }

  return (
    <div className="space-y-1.5 leading-relaxed">
      {lines.map((line, i) => {
        const trimmed = line.trim()
        if (!trimmed) {
          return <div key={i} className="h-1" />
        }
        if (trimmed.startsWith("• ") || trimmed.startsWith("- ")) {
          return (
            <div key={i} className="flex items-start gap-2 pl-0.5">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
              <span className="flex-1">{formatInline(trimmed.slice(2))}</span>
            </div>
          )
        }
        return <p key={i}>{formatInline(line)}</p>
      })}
    </div>
  )
}

export function AIChatbot() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [streamingMessageId, setStreamingMessageId] = useState<string | null>(null)
  const [streamedWordCount, setStreamedWordCount] = useState<number>(0)
  const [quickSuggestions, setQuickSuggestions] = useState<string[]>(defaultSuggestions)
  const lastCategoryRef = useRef<TopicCategory>("services")
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
  }, [messages, streamedWordCount, isLoading])

  // Stream words smoothly when a new AI response arrives
  useEffect(() => {
    if (!streamingMessageId) return
    const targetMsg = messages.find((m) => m.id === streamingMessageId)
    if (!targetMsg) {
      setStreamingMessageId(null)
      return
    }

    const totalWords = targetMsg.text.split(" ").length
    if (streamedWordCount >= totalWords) {
      setStreamingMessageId(null)
      return
    }

    const timer = setTimeout(() => {
      setStreamedWordCount((prev) => Math.min(prev + 4, totalWords))
    }, 24)

    return () => clearTimeout(timer)
  }, [streamingMessageId, streamedWordCount, messages])

  const adjustLinkHref = (href: string): string => {
    if (href.startsWith("http://") || href.startsWith("https://")) {
      return href
    }
    if (pathname === "/") {
      return href
    }
    if (href.startsWith("#")) {
      return "/" + href
    }
    return href
  }

  const buildAIReply = (
    userText: string
  ): { text: string; suggestions: string[]; links: ChatLink[] } => {
    const normalizedMessage = normalizeInput(userText)
    const contextualLinks = getLinksForText(normalizedMessage)

    if (isGreetingOnly(normalizedMessage)) {
      return {
        text: "Hello! 👋 How can I help you today? You can ask about our **Website**, **Mobile App**, **SaaS**, or **Graphic Design** packages, or our **Learn** program.",
        suggestions: defaultSuggestions,
        links: [{ label: "View Services", href: "#services" }],
      }
    }

    if (isAcknowledgement(normalizedMessage)) {
      return {
        text: getRandomResponse(acknowledgementResponses),
        suggestions: responseSuggestions[lastCategoryRef.current] ?? defaultSuggestions,
        links: contextualLinks,
      }
    }

    if (isClosing(normalizedMessage)) {
      return {
        text: getRandomResponse(closingResponses),
        suggestions: ["How do I start a project?", "What services do you offer?", "How can I contact you?"],
        links: [{ label: "Start a Project", href: "/start-project" }],
      }
    }

    const matchedEntry = findBestKnowledgeEntry(normalizedMessage, lastCategoryRef.current)
    if (matchedEntry) {
      lastCategoryRef.current = matchedEntry.category
      const mergedLinks = [...matchedEntry.links]
      for (const extra of contextualLinks) {
        if (!mergedLinks.some((l) => l.href === extra.href) && mergedLinks.length < 3) {
          mergedLinks.push(extra)
        }
      }
      return {
        text: matchedEntry.response,
        suggestions: responseSuggestions[matchedEntry.category] ?? defaultSuggestions,
        links: mergedLinks,
      }
    }

    if (isQuestion(normalizedMessage) && !isRelevantToProject(normalizedMessage)) {
      return {
        text: "I'm built specifically for **Zi Designs**, so I can best help with our **services, package pricing, timelines, portfolio, Learn (GMF)**, and **starting a project**. What would you like to explore?",
        suggestions: defaultSuggestions,
        links: [
          { label: "View Services", href: "#services" },
          { label: "Start a Project", href: "/start-project" },
        ],
      }
    }

    const fallbackLinks =
      contextualLinks.length > 0
        ? contextualLinks
        : [
            { label: "View Services", href: "#services" },
            { label: "Start a Project", href: "/start-project" },
          ]

    return {
      text: "Here's what I can help you with right away:\n\n• **Services & Packages:** Graphic Design (from UGX 20k), Websites (from UGX 750k), SaaS & Mobile Apps (from UGX 5M)\n• **Learn:** From Gift to Income program (Happening in 2027)\n• **Project Quotes:** Scope and download an instant PDF summary on `/start-project`",
      suggestions: defaultSuggestions,
      links: fallbackLinks,
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
      const newMsgId = (Date.now() + 1).toString()

      const aiResponse: Message = {
        id: newMsgId,
        text: reply.text,
        sender: "ai",
        timestamp: new Date(),
        links: reply.links,
      }

      setMessages((prev) => [...prev, aiResponse])
      setStreamedWordCount(4)
      setStreamingMessageId(newMsgId)
      setQuickSuggestions(reply.suggestions ?? defaultSuggestions)
      setIsLoading(false)
    }, 320)
  }

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    submitUserMessage(inputValue)
  }

  const handleSuggestionClick = (suggestion: string) => {
    submitUserMessage(suggestion)
  }

  const handleClearChat = () => {
    setStreamingMessageId(null)
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
    lastCategoryRef.current = "services"
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
              <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--primary)]/80 px-6 py-4 relative">
                {/* Back Button - Top Left */}
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="absolute left-4 top-4 rounded-full p-2 bg-black/10 hover:bg-black/15 transition-colors"
                  aria-label="Go back"
                >
                  <ArrowLeft className="h-4 w-4 text-black" />
                </button>

                <div className="flex items-start justify-center gap-3">
                  <div className="text-center">
                    <h3 style={{ color: "#000" }} className="text-lg font-semibold">
                      Zi AI Assistant
                    </h3>
                    <p className="text-sm text-black/70">Always here to help</p>
                  </div>
                </div>

                {/* Clear Button - Top Right */}
                <button
                  type="button"
                  onClick={handleClearChat}
                  className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-black/10 px-2.5 py-1.5 text-[11px] font-semibold text-black hover:bg-black/15 transition-colors"
                  aria-label="Clear chat"
                >
                  <RotateCcw className="h-3.5 w-3.5" />
                  Clear
                </button>
              </div>

              {/* Messages Container */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isCurrentlyStreaming = message.id === streamingMessageId
                  const displayText = isCurrentlyStreaming
                    ? message.text.split(" ").slice(0, streamedWordCount).join(" ")
                    : message.text

                  return (
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
                        className={`rounded-2xl px-4 py-2.5 max-w-[85%] text-sm ${
                          message.sender === "user"
                            ? "bg-[var(--primary)] text-black rounded-br-none whitespace-pre-wrap"
                            : "bg-surface-alt text-fg rounded-bl-none border border-base/50"
                        }`}
                      >
                        {message.sender === "ai"
                          ? renderFormattedText(displayText)
                          : displayText}

                        {message.sender === "ai" &&
                        !isCurrentlyStreaming &&
                        message.links &&
                        message.links.length > 0 ? (
                          <div className="mt-3 flex flex-wrap gap-2 pt-1 border-t border-base/40">
                            {message.links.map((link) => (
                              <a
                                key={`${message.id}-${link.href}`}
                                href={adjustLinkHref(link.href)}
                                target={link.external ? "_blank" : undefined}
                                rel={link.external ? "noopener noreferrer" : undefined}
                                onClick={() => {
                                  if (!link.external) setIsOpen(false)
                                }}
                                className="inline-flex items-center gap-1 rounded-full border border-base bg-page/70 px-2.5 py-1 text-[11px] font-semibold text-fg hover:border-[var(--primary)]/60 hover:text-[var(--primary)] transition-colors"
                              >
                                {link.label}
                                <ArrowUpRight className="h-3 w-3" />
                              </a>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    </motion.div>
                  )
                })}
                {isLoading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div className="bg-surface-alt text-fg rounded-2xl rounded-bl-none border border-base/50 px-4 py-2.5">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce delay-100" />
                        <div className="w-2 h-2 bg-[var(--primary)] rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <div className="border-t border-base px-4 py-3 bg-page/50">
                {Array.isArray(quickSuggestions) && quickSuggestions.length > 0 ? (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {quickSuggestions.slice(0, 3).map((suggestion) => (
                      <button
                        key={suggestion}
                        type="button"
                        onClick={() => handleSuggestionClick(suggestion)}
                        disabled={isLoading || Boolean(streamingMessageId)}
                        className="rounded-full border border-base bg-surface px-3 py-1.5 text-xs text-fg hover:bg-surface-alt hover:border-[var(--primary)]/40 transition-colors disabled:opacity-50"
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
