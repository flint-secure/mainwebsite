"use client";

import { motion } from "framer-motion";

const fadeUp = {
    initial: { opacity: 0, y: 30 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    viewport: { once: true, margin: "-100px" },
};

const capabilities = [
    {
        title: "Device Intelligence",
        subtitle: "50+ signals. One fingerprint.",
        icon: "device",
        body: `A lightweight SDK collects device characteristics — screen resolution, GPU rendering patterns, audio processing fingerprint, installed fonts, browser configuration. No biometrics. No personal data. Just observable hardware and software signals that combine into a unique device fingerprint.

Devices build trust over time. A new device starts at low trust and earns confidence through days of normal use. Your customers don't get blocked for buying a new phone — they just see one extra verification on day one.`,
        details: [
            "Canvas and WebGL rendering fingerprint",
            "Audio processing fingerprint",
            "Font enumeration",
            "Bot and emulator detection",
            "Progressive trust scoring",
            "Works on web, Android, and iOS",
        ],
    },
    {
        title: "Behavioral Analysis",
        subtitle: "Per-user baselines. Real-time deviation.",
        icon: "behavioral",
        body: `Flint builds a behavioral profile for every user — average transaction amount, active hours, common recipients, typical velocity, spending rhythm. When a transaction deviates from the user's established pattern, the risk score increases proportionally.

Rs 5,000 at 2 AM is suspicious for someone who averages Rs 1,200 during business hours. The same transaction is normal for a night shift worker. Flint adapts to individual behavior, not static rules.`,
        details: [
            "30-day rolling behavioral profiles",
            "Amount anomaly detection (z-score based)",
            "Active hours histogram per user",
            "Velocity baseline comparison",
            "Transaction type pattern analysis",
            "Seasonal and cultural adjustment",
        ],
    },
    {
        title: "Network Intelligence",
        subtitle: "Caught once. Blocked everywhere.",
        icon: "network",
        body: `When a device or account is confirmed as fraudulent on any client's platform, that signal propagates across every Flint client in under 300 milliseconds. A fraudster caught on one payment app is immediately blocked on every other payment app, bank, and e-commerce platform in the network.

No single company can build this alone. The more clients in the network, the better the detection for everyone. This is Flint's primary competitive moat — the intelligence gets better as the network grows.`,
        details: [
            "Cross-client device blacklisting",
            "Real-time fraud signal propagation",
            "Money mule chain detection",
            "Recipient risk network analysis",
            "Anonymized intelligence sharing (no personal data crosses clients)",
            "Flywheel effect: more clients = better detection",
        ],
    },
];

function DeviceIcon() {
    return (
        <div className="bg-bg-code border border-border-subtle rounded-lg p-3 font-mono text-[11px] leading-[1.5] w-fit border-t-2 border-t-amber-500">
            <div className="text-text-tertiary">
                <span className="text-[#60A5FA]">fp</span>_3f8a...9d
            </div>
            <div>
                <span className="text-text-tertiary">trust: </span>
                <span className="text-[#22C55E]">92</span>
            </div>
            <div>
                <span className="text-text-tertiary">seen: </span>
                <span className="text-[#F59E0B]">47x</span>
            </div>
        </div>
    );
}

function BehavioralIcon() {
    const bars = [1, 2, 5, 8, 7, 5, 3, 1, 1, 2, 4, 6, 8, 5, 3, 1];
    const max = Math.max(...bars);
    return (
        <div className="bg-bg-code border border-border-subtle rounded-lg p-3 w-fit border-t-2 border-t-amber-500">
            <div className="flex items-end gap-[3px] h-[32px]">
                {bars.map((v, i) => (
                    <div
                        key={i}
                        className="w-[6px] rounded-sm bg-amber-500"
                        style={{
                            height: `${(v / max) * 100}%`,
                            opacity: 0.4 + (v / max) * 0.6,
                        }}
                    />
                ))}
            </div>
            <div className="flex justify-between mt-1 text-[9px] text-text-tertiary font-mono">
                <span>6am</span>
                <span>6pm</span>
                <span>12am</span>
            </div>
        </div>
    );
}

function NetworkIcon() {
    return (
        <div className="bg-bg-code border border-border-subtle rounded-lg p-3 w-fit border-t-2 border-t-amber-500">
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
                {/* Lines */}
                <line x1="20" y1="25" x2="40" y2="10" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                <line x1="20" y1="25" x2="40" y2="40" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                <line x1="40" y1="10" x2="60" y2="15" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                <line x1="40" y1="10" x2="60" y2="35" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                <line x1="40" y1="40" x2="60" y2="35" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                <line x1="60" y1="15" x2="75" y2="25" stroke="#F59E0B" strokeWidth="1" opacity="0.5" />
                {/* Nodes */}
                <circle cx="20" cy="25" r="5" fill="#EF4444" />
                <circle cx="40" cy="10" r="4" fill="#F59E0B" />
                <circle cx="40" cy="40" r="4" fill="#F59E0B" />
                <circle cx="60" cy="15" r="4" fill="#F59E0B" />
                <circle cx="60" cy="35" r="4" fill="#F59E0B" />
                <circle cx="75" cy="25" r="3" fill="#F59E0B" opacity="0.7" />
            </svg>
        </div>
    );
}

const iconMap: Record<string, () => React.ReactElement> = {
    device: DeviceIcon,
    behavioral: BehavioralIcon,
    network: NetworkIcon,
};

export default function Capabilities() {
    return (
        <section id="capabilities" className="py-24 md:py-40 bg-bg-tertiary">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.span {...fadeUp} className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6 text-center">
                    CAPABILITIES
                </motion.span>
                <motion.h2 {...fadeUp} className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    Three layers. One score.
                </motion.h2>
                <motion.p {...fadeUp} className="mt-6 text-[17px] text-text-secondary text-center max-w-[700px] mx-auto leading-[1.6]">
                    Each transaction is analyzed across device intelligence, behavioral
                    patterns, and cross-platform network data. All three layers combine
                    into a single risk score in under 50 milliseconds.
                </motion.p>

                <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {capabilities.map((cap, i) => {
                        const Icon = iconMap[cap.icon];
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className="bg-bg-secondary border border-border-subtle rounded-xl p-8 lg:p-10 hover:border-border-hover transition-all duration-200"
                            >
                                <div className="mb-6">
                                    <Icon />
                                </div>
                                <h3 className="text-[24px] font-bold text-text-primary">
                                    {cap.title}
                                </h3>
                                <p className="text-[16px] font-medium text-amber-500 mt-2">
                                    {cap.subtitle}
                                </p>
                                <div className="mt-5 text-[15px] text-text-secondary leading-[1.7] whitespace-pre-line">
                                    {cap.body}
                                </div>
                                <ul className="mt-6 space-y-2">
                                    {cap.details.map((detail, j) => (
                                        <li key={j} className="text-[13px] text-text-tertiary flex items-start gap-2">
                                            <span className="text-amber-500 mt-0.5">→</span>
                                            <span>{detail}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
