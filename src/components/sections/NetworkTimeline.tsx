"use client";

import { motion } from "framer-motion";

const events = [
    {
        time: "10:00:00 AM",
        badge: "ATTACK DETECTED",
        badgeColor: "#EF4444",
        dotColor: "#EF4444",
        title: "SIM-swapped device attempts login on Platform A",
        body: "New device fingerprint. Different carrier. Different IP range. Account holder's phone number but everything else has changed.",
    },
    {
        time: "10:00:02 AM",
        badge: "SCORED",
        badgeColor: "#F59E0B",
        dotColor: "#EF4444",
        title: "Flint scores the transaction: 94/100",
        body: "Device never seen (25), emulator signals (30), carrier change (15), 2 AM transaction (20), amount 40x average (25). Decision: BLOCK.",
    },
    {
        time: "10:00:05 AM",
        badge: "PROPAGATED",
        badgeColor: "#F59E0B",
        dotColor: "#F59E0B",
        title: "Fraud signal shared across the network",
        body: "Device fingerprint and fraud indicators propagated to all Flint clients in 280ms. Every platform is now aware of this device.",
    },
    {
        time: "10:05:00 AM",
        badge: "BLOCKED",
        badgeColor: "#22C55E",
        dotColor: "#22C55E",
        title: "Same device attempts transaction on Platform B",
        body: "Platform B has never seen this device. But Flint's network intelligence immediately identifies it. Blocked in 0.4 seconds. No fraud analysis needed — the network already knows.",
    },
    {
        time: "Without Flint",
        badge: "UNPROTECTED",
        badgeColor: "#EF4444",
        dotColor: "#EF4444",
        title: "Platform B has no idea.",
        body: "Without network intelligence, Platform B treats this as a normal new device. The attacker has a free window until the victim reports the fraud — hours or days later.",
    },
];

export default function NetworkTimeline() {
    return (
        <section id="network" className="py-24 md:py-40 bg-bg-primary">
            <div className="max-w-[800px] mx-auto px-6 md:px-12">
                <motion.span
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6 text-center"
                >
                    THE MOAT
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center"
                >
                    What happens in 5 minutes.
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-6 text-[17px] text-text-secondary text-center max-w-[500px] mx-auto leading-[1.6]"
                >
                    A single fraud event. Two platforms. One network.
                </motion.p>

                {/* Timeline */}
                <div className="mt-16 relative">
                    {/* Vertical line */}
                    <div className="absolute left-[18px] md:left-[22px] top-0 bottom-0 w-[2px] bg-border-subtle" />

                    <div className="space-y-8">
                        {events.map((event, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.08 }}
                                viewport={{ once: true, margin: "-50px" }}
                                className="relative flex gap-6 md:gap-8"
                            >
                                {/* Dot */}
                                <div className="relative z-10 mt-6 shrink-0">
                                    <div
                                        className="w-[12px] h-[12px] rounded-full ring-4 ring-bg-primary"
                                        style={{
                                            backgroundColor: event.dotColor,
                                            boxShadow: `0 0 12px ${event.dotColor}40`,
                                        }}
                                    />
                                </div>

                                {/* Card */}
                                <div className="flex-1 bg-bg-secondary border border-border-subtle rounded-lg p-6 hover:border-border-hover transition-colors duration-200">
                                    <div className="flex flex-wrap items-center gap-3 mb-3">
                                        <span className="text-[14px] font-mono text-amber-500">
                                            {event.time}
                                        </span>
                                        <span
                                            className="text-[11px] font-semibold uppercase tracking-[0.06em] px-2.5 py-1 rounded-full"
                                            style={{
                                                backgroundColor: `${event.badgeColor}20`,
                                                color: event.badgeColor,
                                            }}
                                        >
                                            {event.badge}
                                        </span>
                                    </div>
                                    <h4 className="text-[18px] font-semibold text-text-primary leading-[1.3]">
                                        {event.title}
                                    </h4>
                                    <p className="mt-2 text-[14px] text-text-secondary leading-[1.6]">
                                        {event.body}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
