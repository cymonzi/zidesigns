import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Zi Designs - Creative Tech Studio | UI/UX, Web Development & AI Tools",
  description: "We build smart brands, websites, and tools that work. From UI/UX to AI tools — we combine design with strategy to create impactful digital experiences.",
  keywords: "web design, UI/UX design, web development, AI tools, branding, templates, Uganda, creative studio",
  authors: [{ name: "Musinguzi Simon Peter", url: "https://zidesigns.com" }],
  creator: "Zi Designs",
  openGraph: {
    title: "Zi Designs - Creative Tech Studio",
    description: "We build smart brands, websites, and tools that work. From UI/UX to AI tools — we combine design with strategy.",
    url: "https://zidesigns.com",
    siteName: "Zi Designs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zi Designs - Creative Tech Studio",
    description: "We build smart brands, websites, and tools that work.",
    creator: "@zidesigns01",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${orbitron.variable} antialiased`}
      >
        <ThemeProvider
          defaultTheme="system"
          storageKey="zi-designs-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
