"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import WaitlistModal from "../WaitlistModal";

const plans = [
    {
        name: "Developer",
        price: "Free",
        priceSub: "forever",
        description: "For testing and evaluation.",
        highlighted: false,
        features: [
            { text: "1,000 API calls / month", included: true },
            { text: "Device fingerprinting", included: true },
            { text: "Basic risk scoring", included: true },
            { text: "Community support", included: true },
            { text: "Network intelligence", included: false },
            { text: "Behavioral profiling", included: false },
            { text: "Dashboard", included: false },
        ],
        cta: "Get API Key",
        ctaStyle: "ghost" as const,
    },
    {
        name: "Growth",
        price: "Rs 1,00,000",
        priceSub: "/ month",
        description: "For payment companies and banks.",
        highlighted: true,
        badge: "MOST POPULAR",
        features: [
            { text: "500,000 API calls / month", included: true },
            { text: "Full scoring engine", included: true },
            { text: "Network intelligence", included: true },
            { text: "Behavioral profiling", included: true },
            { text: "Full dashboard", included: true },
            { text: "Webhook alerts", included: true },
            { text: "Custom thresholds", included: true },
            { text: "Priority support", included: true },
        ],
        cta: "Start Free Trial",
        ctaStyle: "primary" as const,
    },
    {
        name: "Enterprise",
        price: "Custom",
        priceSub: "negotiated",
        description: "For eSewa-scale volume.",
        highlighted: false,
        features: [
            { text: "Unlimited API calls", included: true },
            { text: "Everything in Growth", included: true },
            { text: "Custom ML model training", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "SLA: 99.99% uptime", included: true },
            { text: "On-premise deployment option", included: true },
            { text: "Custom integrations", included: true },
            { text: "Phone support", included: true },
        ],
        cta: "Contact Us",
        ctaStyle: "ghost" as const,
    },
];

import { fadeUp } from "@/lib/animations";

export default function Pricing() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section id="pricing" className="py-24 md:py-40 bg-bg-primary">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.span {...fadeUp} className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6 text-center">
                    PRICING
                </motion.span>
                <motion.h2 {...fadeUp} className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    Start free. Scale when ready.
                </motion.h2>
                <motion.p {...fadeUp} className="mt-6 text-[17px] text-text-secondary text-center max-w-[640px] mx-auto leading-[1.6]">
                    Every plan includes the full scoring API, device intelligence, and
                    dashboard. Higher tiers unlock network intelligence, behavioral
                    profiling, and dedicated support.
                </motion.p>

                {/* Pricing cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                    {plans.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative bg-bg-secondary rounded-xl p-8 lg:p-10 ${plan.highlighted
                                    ? "border border-amber-500 scale-[1.02] lg:scale-[1.03]"
                                    : "border border-border-subtle"
                                }`}
                            style={
                                plan.highlighted
                                    ? { boxShadow: "0 0 60px rgba(245,158,11,0.08)" }
                                    : {}
                            }
                        >
                            {plan.badge && (
                                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-bg-primary text-[11px] font-bold uppercase tracking-[0.06em] px-3 py-1 rounded-full">
                                    {plan.badge}
                                </span>
                            )}

                            <p className="text-[14px] font-semibold uppercase tracking-[0.08em] text-amber-500">
                                {plan.name}
                            </p>
                            <div className="mt-4 flex items-baseline gap-2">
                                <span className="font-mono text-[36px] lg:text-[40px] font-bold text-text-primary tracking-[-0.04em]">
                                    {plan.price}
                                </span>
                                <span className="text-[16px] text-text-tertiary">
                                    {plan.priceSub}
                                </span>
                            </div>
                            <p className="mt-2 text-[14px] text-text-secondary">
                                {plan.description}
                            </p>

                            <ul className="mt-8 space-y-3">
                                {plan.features.map((f, j) => (
                                    <li key={j} className="flex items-center gap-3 text-[14px]">
                                        {f.included ? (
                                            <Check className="w-4 h-4 text-green shrink-0" />
                                        ) : (
                                            <X className="w-4 h-4 text-text-tertiary shrink-0" />
                                        )}
                                        <span
                                            className={
                                                f.included ? "text-text-secondary" : "text-text-tertiary"
                                            }
                                        >
                                            {f.text}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => {
                                    if (plan.ctaStyle === "ghost" && plan.name === "Enterprise") {
                                        window.location.href = "mailto:hello@.com?subject=Enterprise%20Inquiry";
                                    } else {
                                        setModalOpen(true);
                                    }
                                }}
                                className={`mt-8 w-full py-3 rounded-lg text-[14px] font-semibold transition-all duration-150 cursor-pointer ${plan.ctaStyle === "primary"
                                        ? "bg-amber-500 text-bg-primary hover:bg-amber-400 hover:scale-[1.02]"
                                        : "border border-border-subtle text-text-primary hover:border-border-hover"
                                    }`}
                            >
                                {plan.cta}
                            </button>
                        </motion.div>
                    ))}
                </div>

                <motion.div {...fadeUp} className="mt-12 text-center">
                    <p className="text-[15px] text-text-secondary max-w-[640px] mx-auto leading-[1.6]">
                        All plans include a 3-month free trial in shadow mode — Flint scores
                        every transaction but blocks nothing. You review the results. If the
                        numbers don&apos;t convince you, remove Flint at zero cost.
                    </p>
                    <p className="mt-4 text-[14px] text-text-tertiary">
                        Or pay per transaction: Rs 0.05-0.15 per API call. No commitment.
                    </p>
                </motion.div>
            </div>

            <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
}
