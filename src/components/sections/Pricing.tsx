"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import WaitlistModal from "../WaitlistModal";
import { Reveal } from "../Reveal";

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
        description: "For scaling payment apps.",
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
        description: "For high-volume platforms.",
        highlighted: false,
        features: [
            { text: "Unlimited API calls", included: true },
            { text: "Everything in Growth", included: true },
            { text: "Custom ML model training", included: true },
            { text: "Dedicated account manager", included: true },
            { text: "SLA: 99.99% uptime", included: true },
            { text: "On-premise deployment", included: true },
            { text: "Custom integrations", included: true },
            { text: "24/7 Phone support", included: true },
        ],
        cta: "Talk to Sales",
        ctaStyle: "ghost" as const,
    },
];

export default function Pricing() {
    const [modalOpen, setModalOpen] = useState(false);

    return (
        <section id="pricing" className="py-24 md:py-40 bg-bg-primary relative overflow-hidden">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                <Reveal delay={0.1}>
                    <h2 className="text-[32px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary text-center">
                        Pricing for every scale
                    </h2>
                </Reveal>
                
                <Reveal delay={0.2}>
                    <p className="mt-8 text-[18px] text-text-secondary text-center max-w-[640px] mx-auto leading-[1.6]">
                        Every plan includes the full scoring API and device intelligence. Unlock network intelligence and behavioral profiling as you grow.
                    </p>
                </Reveal>

                {/* Pricing cards */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
                    {plans.map((plan, i) => (
                        <Reveal key={i} delay={0.1 * i} y={30}>
                            <div
                                className={`h-full relative bg-bg-secondary/40 backdrop-blur-sm rounded-2xl p-8 lg:p-10 flex flex-col transition-all duration-300 ${plan.highlighted
                                        ? "border-2 border-amber-500/50 scale-[1.05] z-10 shadow-[0_20px_50px_rgba(245,158,11,0.1)]"
                                        : "border border-border-subtle hover:border-border-hover shadow-xl"
                                    }`}
                            >
                                {plan.badge && (
                                    <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-500 text-bg-primary text-[11px] font-bold uppercase tracking-[0.1em] px-4 py-1.5 rounded-full shadow-lg">
                                        {plan.badge}
                                    </span>
                                )}

                                <p className="text-[13px] font-bold uppercase tracking-[0.15em] text-amber-500/80">
                                    {plan.name}
                                </p>
                                <div className="mt-6 flex items-baseline gap-2">
                                    <span className="font-mono text-[38px] lg:text-[44px] font-bold text-text-primary tracking-tighter">
                                        {plan.price}
                                    </span>
                                    <span className="text-[15px] text-text-tertiary font-medium">
                                        {plan.priceSub}
                                    </span>
                                </div>
                                <p className="mt-3 text-[14px] text-text-secondary leading-relaxed">
                                    {plan.description}
                                </p>

                                <div className="h-px bg-border-subtle w-full my-8" />

                                <ul className="space-y-4 flex-1">
                                    {plan.features.map((f, j) => (
                                        <li key={j} className="flex items-start gap-3 text-[14px]">
                                            <div className="mt-1 shrink-0">
                                                {f.included ? (
                                                    <Check className="w-4 h-4 text-green" />
                                                ) : (
                                                    <X className="w-4 h-4 text-text-tertiary/50" />
                                                )}
                                            </div>
                                            <span
                                                className={
                                                    f.included ? "text-text-secondary" : "text-text-tertiary italic"
                                                }
                                            >
                                                {f.text}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                    onClick={() => {
                                        if (plan.name === "Enterprise") {
                                            window.location.href = "mailto:hello.flintsecure@gmail.com?subject=Enterprise Inquiry";
                                        } else {
                                            setModalOpen(true);
                                        }
                                    }}
                                    className={`mt-10 w-full py-4 rounded-xl text-[15px] font-bold transition-all duration-200 cursor-pointer ${plan.ctaStyle === "primary"
                                            ? "bg-amber-500 text-bg-primary hover:bg-amber-400 shadow-lg shadow-amber-500/20"
                                            : "border border-border-subtle text-text-primary hover:bg-white/5 hover:border-border-hover"
                                        }`}
                                >
                                    {plan.cta}
                                </button>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={0.5}>
                    <div className="mt-20 p-8 rounded-2xl bg-bg-secondary/20 border border-border-subtle/50 text-center backdrop-blur-sm">
                        <p className="text-[15px] text-text-secondary max-w-[700px] mx-auto leading-[1.7]">
                            <span className="text-amber-500 font-bold uppercase tracking-wider text-[12px] block mb-2">Shadow Mode Trial</span>
                            All plans include a 3-month trial in shadow mode. Flint scores
                            every transaction but blocks nothing. You review the numbers. If the
                            detection accuracy doesn&apos;t convince you, remove Flint at zero cost.
                        </p>
                    </div>
                </Reveal>
            </div>

            <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
}
