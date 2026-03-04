"use client";

import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import HowItWorks from "@/components/sections/HowItWorks";
import LiveDemo from "@/components/sections/LiveDemo";
import Capabilities from "@/components/sections/Capabilities";
import NetworkTimeline from "@/components/sections/NetworkTimeline";
import Integration from "@/components/sections/Integration";
import Performance from "@/components/sections/Performance";
import OpenSource from "@/components/sections/OpenSource";
import Pricing from "@/components/sections/Pricing";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={mainRef}
      className="relative"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.04), transparent 40%)`,
      }}
    >
      <Navbar />
      <Hero />
      <Problem />
      <HowItWorks />
      <LiveDemo />
      <Capabilities />
      <NetworkTimeline />
      <Integration />
      <Performance />
      <OpenSource />
      <Pricing />
      <Footer />
    </div>
  );
}
