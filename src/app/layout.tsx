import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://flintsecure.app"),
  title: {
    default: "Flint — Real-Time Fraud Detection API for Digital Payments",
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
  openGraph: {
    title: "Flint — Real-Time Fraud Detection API",
    description:
      "Every transaction scored in under 50ms. Device fingerprinting, behavioral analysis, and network intelligence. One API call before money moves.",
    type: "website",
    url: "https://flintsecure.app",
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
    title: "Flint — Real-Time Fraud Detection API",
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
    "@type": "SoftwareApplication",
    name: "Flint",
    operatingSystem: "Cloud",
    applicationCategory: "SecurityApplication",
    description:
      "Real-time fraud detection API for digital payments using device intelligence and behavioral analysis.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Flint",
      url: "https://flintsecure.app",
    },
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
      </body>
    </html>
  );
}
