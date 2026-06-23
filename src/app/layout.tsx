import type { Metadata } from "next";
import { Inter, Orbitron, Montserrat, Nunito } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const siteUrl = "https://zidesigns.vercel.app";
const homeUrl = `${siteUrl}/`;
const socialImage = `${siteUrl}/images/banner.png`;

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["400", "700"],
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  weight: ["300", "400", "700"],
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "700", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(homeUrl),
  title: {
    default: "Zi Designs - Creative Tech Studio",
    template: "%s | Zi Designs",
  },
  description: "Zi Designs is a Uganda-based creative-tech studio building websites, mobile apps, graphic design systems, video edits, and AI-powered digital products for startups and creators.",
  icons: {
    icon: [
      { url: "/favicon/favicon.ico" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon/favicon.ico"],
  },
  manifest: "/favicon/site.webmanifest",
  keywords: [
    "web design Uganda",
    "web development Uganda",
    "website designer Kampala",
    "website development Kampala",
    "UI UX design",
    "mobile app design",
    "mobile app design Uganda",
    "AI tools development",
    "branding design",
    "graphic design Uganda",
    "video editing Uganda",
    "creative agency Uganda",
    "digital studio Uganda",
    "creative tech studio",
    "website templates",
    "Zi Designs",
    "Musinguzi Simon Peter",
    "cymonzi",
  ],
  authors: [{ name: "Musinguzi Simon Peter", url: siteUrl }],
  creator: "Zi Designs",
  publisher: "Zi Designs",
  category: "technology",
  applicationName: "Zi Designs",
  referrer: "origin-when-cross-origin",
  verification: {
    google: "kPbDs6wD5oh9vzAUycB7-J59XVhN_kdFZ6L3mA1QdgA",
  },
  alternates: {
    canonical: homeUrl,
  },
  openGraph: {
    title: "Zi Designs - Creative Tech Studio",
    description: "Zi Designs helps startups and creators launch sharper websites, mobile apps, graphic design, video edits, and AI-powered digital products from Uganda to the world.",
    url: homeUrl,
    siteName: "Zi Designs",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Zi Designs creative tech studio building websites, apps, graphic design, and video content",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zi Designs - Creative Tech Studio",
    description: "Websites, mobile apps, graphic design, video edits, and AI-powered tools for startups and creators.",
    creator: "@zidesigns01",
    images: [socialImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${homeUrl}#organization`,
      name: "Zi Designs",
      url: homeUrl,
      logo: `${siteUrl}/favicon/apple-touch-icon.png`,
      image: `${siteUrl}/opengraph-image`,
      email: "zidesigns001@gmail.com",
      founder: {
        "@type": "Person",
        name: "Musinguzi Simon Peter",
      },
      sameAs: ["https://www.instagram.com/zidesigns01"],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${homeUrl}#service`,
      name: "Zi Designs",
      url: homeUrl,
      description:
        "Zi Designs is a Uganda-based creative-tech studio that builds websites, mobile apps, graphic design systems, video edits, and AI-powered digital products for startups and creators.",
      areaServed: [
        {
          "@type": "Country",
          name: "Uganda",
        },
        {
          "@type": "Place",
          name: "Worldwide",
        },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "UG",
        addressRegion: "Uganda",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "zidesigns001@gmail.com",
        availableLanguage: ["English"],
      },
      serviceType: [
        "Web Development",
        "Mobile App Design",
        "UI/UX Design",
        "Graphic Design",
        "AI Tools Development",
        "Video Editing",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${homeUrl}#website`,
      url: homeUrl,
      name: "Zi Designs",
      publisher: {
        "@id": `${homeUrl}#organization`,
      },
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${orbitron.variable} ${montserrat.variable} ${nunito.variable} antialiased`}
        style={{ ['--font-sans' as any]: 'var(--font-nunito)', ['--font-heading' as any]: 'var(--font-montserrat)' } as any}
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
