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
  title: "Flint — Real-Time Fraud Detection API for Digital Payments",
  description:
    "Flint scores every transaction in under 50ms. Device intelligence, behavioral analysis, and cross-platform network intelligence for payment companies and banks. Open source SDKs.",
  openGraph: {
    title: "Flint — Real-Time Fraud Detection API",
    description:
      "Every transaction scored in under 50ms. Device fingerprinting, behavioral analysis, and network intelligence. One API call before money moves.",
    type: "website",
    url: "https://flintsecure.com",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flint — Real-Time Fraud Detection API",
    description:
      "Every transaction scored in under 50ms. Open source SDKs. Built for South Asian payments.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
