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
import MouseEffect from "@/components/MouseEffect";

export default function Home() {
  return (
    <div
      className="relative min-h-screen bg-bg-primary"
      style={{
        background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.04), transparent 40%)`,
      }}
    >
      <MouseEffect />
      <Navbar />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}
