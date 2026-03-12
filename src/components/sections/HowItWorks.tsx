"use client";

import { Reveal } from "../Reveal";
import { motion } from "framer-motion";

const steps = [
    {
        num: "01",
        title: "User's Device",
        subtitle: "Flint SDK inside",
        description: "Collects 50+ device signals",
    },
    {
        num: "02",
        title: "Your Server",
        subtitle: "Calls Flint API",
        description: "Sends payload before processing",
    },
    {
        num: "03",
        title: "Flint Intelligence",
        subtitle: "Score in <50ms",
        description: "Runs behavioral & network models",
    },
    {
        num: "04",
        title: "Decision",
        subtitle: "ALLOW / FLAG / BLOCK",
        description: "Immediate response to your server",
    },
];

const decisions = [
    {
        decision: "ALLOW",
        color: "#22C55E",
        range: "0-50",
        text: "Transaction proceeds instantly. User notices nothing. This covers 90% of all transactions.",
    },
    {
        decision: "FLAG",
        color: "#F59E0B",
        range: "50-80",
        text: "User sees a lightweight verification step like an OTP. Catches suspicion without hard-blocking.",
    },
    {
        decision: "BLOCK",
        color: "#EF4444",
        range: "80-100",
        text: "Transaction stopped before money moves. Only triggered when multiple signals agree on high risk.",
    },
];

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-40 bg-bg-primary relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                <Reveal delay={0.1}>
                    <h2 className="text-[32px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary text-center">
                        One API call, one decision
                    </h2>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="mt-8 text-[18px] md:text-[20px] text-text-secondary text-center max-w-[750px] mx-auto leading-[1.6]">
                        Your system calls our API before processing any payment. We return
                        a score and decision. If we don&apos;t respond in time, your system
                        fails-open to ensure no user is ever blocked by us.
                    </p>
                </Reveal>

                {/* Flow Diagram */}
                <div className="mt-24">
                    {/* Desktop flow - horizontal */}
                    <div className="hidden md:flex items-start justify-center">
                        {steps.map((step, i) => (
                            <div key={i} className="flex items-center">
                                <Reveal delay={i * 0.15} y={20}>
                                    <div className="bg-bg-secondary/40 border border-border-subtle rounded-2xl p-8 w-[240px] text-center hover:border-amber-500/20 transition-all group">
                                        <span className="text-[11px] font-mono text-text-tertiary px-2 py-1 bg-bg-tertiary rounded border border-border-subtle group-hover:border-amber-500/30 group-hover:text-amber-500 transition-colors">
                                            {step.num}
                                        </span>
                                        <p className="text-[17px] font-bold text-text-primary mt-6 tracking-tight">
                                            {step.title}
                                        </p>
                                        <p className="text-[13px] text-amber-500 mt-2 font-semibold uppercase tracking-wider">
                                            {step.subtitle}
                                        </p>
                                        <p className="text-[13px] text-text-tertiary mt-4 leading-relaxed group-hover:text-text-secondary transition-colors">
                                            {step.description}
                                        </p>
                                    </div>
                                </Reveal>
                                {i < steps.length - 1 && (
                                    <div className="mx-2 lg:mx-4">
                                        <motion.svg 
                                            width="40" height="20" viewBox="0 0 40 20" fill="none"
                                            initial={{ opacity: 0 }}
                                            whileInView={{ opacity: 1 }}
                                            transition={{ delay: i * 0.2 + 0.3 }}
                                        >
                                            <path d="M0 10 H30" stroke="#27272A" strokeWidth="2" strokeDasharray="4 4" />
                                            <path d="M30 5 L40 10 L30 15" fill="#27272A" />
                                        </motion.svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Mobile flow - vertical */}
                    <div className="flex md:hidden flex-col items-center gap-4">
                        {steps.map((step, i) => (
                            <div key={i} className="flex flex-col items-center w-full">
                                <Reveal delay={i * 0.1} y={20}>
                                    <div className="bg-bg-secondary/40 border border-border-subtle rounded-2xl p-6 w-full max-w-[320px] text-center">
                                        <span className="text-[11px] font-mono text-text-tertiary">{step.num}</span>
                                        <p className="text-[18px] font-bold text-text-primary mt-2">
                                            {step.title}
                                        </p>
                                        <p className="text-[13px] text-amber-500 mt-1 font-semibold">
                                            {step.subtitle}
                                        </p>
                                        <p className="text-[13px] text-text-tertiary mt-3">
                                            {step.description}
                                        </p>
                                    </div>
                                </Reveal>
                                {i < steps.length - 1 && (
                                    <div className="my-2">
                                        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                                            <path d="M10 0 V20" stroke="#27272A" strokeWidth="2" strokeDasharray="4 4" />
                                            <path d="M5 20 L10 30 L15 20" fill="#27272A" />
                                        </svg>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Decision Cards */}
                <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {decisions.map((d, i) => (
                        <Reveal key={i} delay={0.1 * i} y={30}>
                            <div
                                className="h-full bg-bg-secondary/30 backdrop-blur-sm border border-border-subtle rounded-2xl p-10 hover:border-border-hover transition-all duration-300 relative overflow-hidden group"
                            >
                                <div 
                                    className="absolute top-0 left-0 w-full h-[3px]" 
                                    style={{ backgroundColor: d.color }} 
                                />
                                <div 
                                    className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none group-hover:opacity-[0.05] transition-opacity" 
                                    style={{ backgroundColor: d.color }} 
                                />
                                
                                <div className="flex items-center gap-3 mb-6">
                                    <span
                                        className="text-[16px] font-bold tracking-wider uppercase border-b-2"
                                        style={{ color: d.color, borderColor: `${d.color}40` }}
                                    >
                                        {d.decision}
                                    </span>
                                </div>
                                <p className="text-[13px] font-mono text-text-tertiary mb-6 bg-bg-tertiary/50 w-fit px-3 py-1 rounded border border-border-subtle">
                                    Risk Score: {d.range}
                                </p>
                                <p className="text-[16px] text-text-secondary leading-[1.8]">
                                    {d.text}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
