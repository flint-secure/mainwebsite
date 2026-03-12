import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";
import Chatbot from "@/components/Chatbot";

const siteUrl = getSiteUrl();

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Flint | Real-Time Fraud Detection API for Digital Payments",
    template: "%s | Flint",
  },
  description:
    "Flint scores every transaction in under 50ms. Device intelligence, behavioral analysis, and cross-platform network intelligence for payment companies and banks. Open source SDKs.",
  keywords: [
    "fraud detection",
    "payment security",
    "device fingerprinting",
    "behavioral analysis",
    "API",
    "real-time",
    "digital payments",
    "open source",
    "fraud prevention",
  ],
  authors: [{ name: "Flint Team" }],
  creator: "Flint Team",
  publisher: "Flint",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Flint | Real-Time Fraud Detection API",
    description:
      "Every transaction scored in under 50ms. Device fingerprinting, behavioral analysis, and network intelligence. One API call before money moves.",
    type: "website",
    url: siteUrl,
    siteName: "Flint",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Flint Fraud Detection Dashboard",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flint | Real-Time Fraud Detection API",
    description:
      "Every transaction scored in under 50ms. Open source SDKs. Built for South Asian payments.",
    creator: "@flintsecure",
    images: ["/og-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        "@id": `${siteUrl}/#software`,
        "name": "Flint",
        "operatingSystem": "Cloud",
        "applicationCategory": "SecurityApplication",
        "description": "Real-time fraud detection API for digital payments using device intelligence and behavioral analysis.",
        "url": siteUrl,
        "author": { "@id": `${siteUrl}/#organization` },
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        }
      },
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "Flint",
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": `${siteUrl}/favicon.png`
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "hello.flintsecure@gmail.com",
          "contactType": "customer support"
        },
        "sameAs": [
          "https://twitter.com/flintsecure"
        ]
      },
      {
        "@type": "Person",
        "@id": `${siteUrl}/#founder`,
        "name": "Flint Founders",
        "url": siteUrl,
        "worksFor": { "@id": `${siteUrl}/#organization` },
        "jobTitle": "Founder"
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
        <Chatbot />
      </body>
    </html>
  );
}
