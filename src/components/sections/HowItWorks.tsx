"use client";

import { motion } from "framer-motion";

const steps = [
    {
        title: "User's Device",
        subtitle: "Flint SDK inside",
        description: "Collects device signals",
    },
    {
        title: "Client's Server",
        subtitle: "Calls Flint before processing",
        description: "Sends TX + fingerprint to Flint API",
    },
    {
        title: "Flint API",
        subtitle: "Score in <50ms",
        description: "Reads Redis, calculates risk score",
    },
    {
        title: "Decision",
        subtitle: "ALLOW / FLAG / BLOCK",
        description: "Returns to client in <50ms",
    },
];

const decisions = [
    {
        decision: "ALLOW",
        color: "#22C55E",
        range: "0-50",
        text: "Transaction proceeds instantly. User notices nothing. No additional verification. This is 90% of all transactions.",
    },
    {
        decision: "FLAG",
        color: "#F59E0B",
        range: "50-80",
        text: "User sees a lightweight verification step — a confirmation button or OTP. Takes 5-30 seconds. Catches suspicious transactions without hard-blocking.",
    },
    {
        decision: "BLOCK",
        color: "#EF4444",
        range: "80-100",
        text: "Transaction stopped before money moves. User and security team alerted. Only triggered when multiple signals agree — new device, unusual amount, wrong time, suspicious recipient.",
    },
];

import { fadeUp } from "@/lib/animations";

export default function HowItWorks() {
    return (
        <section id="how-it-works" className="py-24 md:py-40 bg-bg-tertiary">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.span {...fadeUp} className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6 text-center">
                    HOW IT WORKS
                </motion.span>

                <motion.h2 {...fadeUp} className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    One API call. One decision. Under 50ms.
                </motion.h2>

                <motion.p {...fadeUp} className="mt-6 text-[17px] md:text-[20px] text-text-secondary text-center max-w-[700px] mx-auto leading-[1.6]">
                    Flint sits between the user and the transaction. Your system calls our
                    API before processing any payment. We return ALLOW, FLAG, or BLOCK. If
                    we don&apos;t respond in 150ms, your system proceeds normally. We can never
                    cause a payment to fail.
                </motion.p>

                {/* Flow Diagram */}
                <div className="mt-16 overflow-x-auto">
                    {/* Desktop flow - horizontal */}
                    <div className="hidden md:flex items-start justify-center gap-0">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.15 }}
                                viewport={{ once: true }}
                                className="flex items-start"
                            >
                                <div className="bg-bg-secondary border border-border-subtle rounded-xl p-6 w-[200px] lg:w-[240px] text-center">
                                    <p className="text-[16px] font-semibold text-text-primary">
                                        {step.title}
                                    </p>
                                    <p className="text-[13px] text-amber-500 mt-1 font-medium">
                                        {step.subtitle}
                                    </p>
                                    <p className="text-[12px] text-text-tertiary mt-3">
                                        {step.description}
                                    </p>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="flex items-center h-[80px] mx-2">
                                        <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                                            <motion.line
                                                x1="0" y1="10" x2="30" y2="10"
                                                stroke="#F59E0B"
                                                strokeWidth="2"
                                                strokeDasharray="4 4"
                                                initial={{ pathLength: 0, opacity: 0 }}
                                                whileInView={{ pathLength: 1, opacity: 1 }}
                                                transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                                                viewport={{ once: true }}
                                            />
                                            <motion.polygon
                                                points="30,5 40,10 30,15"
                                                fill="#F59E0B"
                                                initial={{ opacity: 0 }}
                                                whileInView={{ opacity: 1 }}
                                                transition={{ duration: 0.3, delay: 0.6 + i * 0.15 }}
                                                viewport={{ once: true }}
                                            />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile flow - vertical */}
                    <div className="flex md:hidden flex-col items-center gap-0">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="flex flex-col items-center"
                            >
                                <div className="bg-bg-secondary border border-border-subtle rounded-xl p-6 w-full max-w-[280px] text-center">
                                    <p className="text-[16px] font-semibold text-text-primary">
                                        {step.title}
                                    </p>
                                    <p className="text-[13px] text-amber-500 mt-1 font-medium">
                                        {step.subtitle}
                                    </p>
                                    <p className="text-[12px] text-text-tertiary mt-3">
                                        {step.description}
                                    </p>
                                </div>
                                {i < steps.length - 1 && (
                                    <div className="my-2">
                                        <svg width="20" height="30" viewBox="0 0 20 30" fill="none">
                                            <line x1="10" y1="0" x2="10" y2="20" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 4" />
                                            <polygon points="5,20 10,30 15,20" fill="#F59E0B" />
                                        </svg>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Decision Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                    {decisions.map((d, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-bg-secondary border border-border-subtle rounded-xl p-8 hover:border-border-hover transition-all duration-200"
                            style={{ borderTopWidth: "3px", borderTopColor: d.color }}
                        >
                            <div className="flex items-center gap-2 mb-3">
                                <span
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: d.color }}
                                />
                                <span
                                    className="text-[14px] font-bold tracking-wide"
                                    style={{ color: d.color }}
                                >
                                    {d.decision}
                                </span>
                            </div>
                            <p className="text-[13px] font-mono text-text-tertiary mb-3">
                                Score: {d.range}
                            </p>
                            <p className="text-[15px] text-text-secondary leading-[1.7]">
                                {d.text}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
