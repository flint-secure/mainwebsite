import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import MouseEffect from "@/components/MouseEffect";

const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks"), { ssr: true });
const LiveDemo = dynamic(() => import("@/components/sections/LiveDemo"), { ssr: true });
const Capabilities = dynamic(() => import("@/components/sections/Capabilities"), { ssr: true });
const NetworkTimeline = dynamic(() => import("@/components/sections/NetworkTimeline"), { ssr: true });
const Integration = dynamic(() => import("@/components/sections/Integration"), { ssr: true });
const Performance = dynamic(() => import("@/components/sections/Performance"), { ssr: true });
const OpenSource = dynamic(() => import("@/components/sections/OpenSource"), { ssr: true });
const Pricing = dynamic(() => import("@/components/sections/Pricing"), { ssr: true });
const Footer = dynamic(() => import("@/components/sections/Footer"), { ssr: true });

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
