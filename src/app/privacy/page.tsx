import type { Metadata } from "next"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { AIChatbot } from "@/components/ai-chatbot"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Zi Designs collects, uses, and protects your information. Plain language — no legal maze.",
  alternates: {
    canonical: "https://zidesigns.vercel.app/privacy",
  },
  robots: {
    index: false,
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-page text-fg">
      <Navigation />

      <main className="mx-auto max-w-3xl px-6 pt-32 pb-20">

        {/* Page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-sm text-muted">Last updated: 2026</p>
        </div>

        {/* Intro card */}
        <div className="rounded-2xl border border-base bg-card p-6 mb-6">
          <p className="text-base leading-7 text-muted">
            Zi Designs respects your privacy. This page explains what information
            we collect and how we use it. Nothing complicated - just plain language.
          </p>
        </div>

        {/* Section cards */}
        <div className="space-y-4">

          {/* 1 */}
          <div className="rounded-2xl border border-base bg-card p-6">
            <h2 className="text-base font-semibold text-fg">1. Information we collect</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              When you contact us or submit a project request, we may collect:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {["Name or company name", "Email address", "Project details or messages you send"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 2 */}
          <div className="rounded-2xl border border-base bg-card p-6">
            <h2 className="text-base font-semibold text-fg">2. How we use this information</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              We use this information to:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              {["Respond to your inquiries", "Discuss potential projects", "Improve our services"].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--primary)]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3 */}
          <div className="rounded-2xl border border-base bg-card p-6">
            <h2 className="text-base font-semibold text-fg">3. Data protection</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Your information is not sold or shared with third parties. It is
              only used to communicate with you regarding your request.
            </p>
          </div>

          {/* 4 */}
          <div className="rounded-2xl border border-base bg-card p-6">
            <h2 className="text-base font-semibold text-fg">4. Third-party tools</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Our website may use tools such as hosting platforms or analytics
              services that help us operate the site. These services have their
              own privacy policies governing the use of your data.
            </p>
          </div>

          {/* 5 — Contact card with accent */}
          <div className="rounded-2xl border border-[var(--primary)]/30 bg-[var(--primary)]/5 p-6">
            <h2 className="text-base font-semibold text-fg">5. Contact</h2>
            <p className="mt-3 text-sm leading-7 text-muted">
              Questions about this policy?{" "}
              <Link
                href="/#contact"
                className="text-[var(--primary)] font-medium hover:underline"
              >
                Reach out via the contact form
              </Link>{" "}
              and we'll get back to you.
            </p>
          </div>

        </div>
      </main>

      <Footer />
      <AIChatbot />
    </div>
  )
}
