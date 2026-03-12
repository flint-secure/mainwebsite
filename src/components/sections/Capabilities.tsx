"use client";

import React from "react";
import { Reveal } from "../Reveal";
import { motion } from "framer-motion";

const capabilities = [
    {
        title: "Device Intelligence",
        subtitle: "50+ signals. One fingerprint.",
        icon: "device",
        body: `A lightweight SDK collects device characteristics — screen resolution, GPU rendering patterns, audio processing fingerprint, installed fonts, browser configuration. No biometrics. No personal data. Just observable hardware and software signals that combine into a unique device fingerprint.

Devices build trust over time. A new device starts at low trust and earns confidence through days of normal use.`,
        details: [
            "Canvas and WebGL rendering fingerprint",
            "Audio processing fingerprint",
            "Font enumeration",
            "Bot and emulator detection",
            "Progressive trust scoring",
        ],
    },
    {
        title: "Behavioral Analysis",
        subtitle: "Per-user baselines. Real-time deviation.",
        icon: "behavioral",
        body: `Flint builds a behavioral profile for every user — average transaction amount, active hours, common recipients, typical velocity, spending rhythm. When a transaction deviates from the user's established pattern, the risk score increases proportionally.

Rs 5,000 at 2 AM is suspicious for someone who averages Rs 1,200 during business hours. Flint adapts to individual behavior, not static rules.`,
        details: [
            "30-day rolling behavioral profiles",
            "Amount anomaly detection (z-score based)",
            "Active hours histogram per user",
            "Velocity baseline comparison",
            "Transaction type pattern analysis",
        ],
    },
    {
        title: "Network Intelligence",
        subtitle: "Caught once. Blocked everywhere.",
        icon: "network",
        body: `When a device or account is confirmed as fraudulent on any client's platform, that signal propagates across every Flint client in under 300 milliseconds. A fraudster caught on one payment app is immediately blocked on every other payment app, bank, and e-commerce platform in the network.

Intelligence sharing ensures everyone benefits from catching a fraudster once.`,
        details: [
            "Cross-client device blacklisting",
            "Real-time fraud signal propagation",
            "Money mule chain detection",
            "Recipient risk network analysis",
            "Anonymized intelligence sharing",
        ],
    },
];

function DeviceIcon() {
    return (
        <div className="bg-bg-code border border-border-subtle rounded-lg p-3 font-mono text-[11px] leading-[1.5] w-fit border-t-2 border-t-amber-500 shadow-lg">
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
        <div className="bg-bg-code border border-border-subtle rounded-lg p-3 w-fit border-t-2 border-t-amber-500 shadow-lg">
            <div className="flex items-end gap-[3px] h-[32px]">
                {bars.map((v, i) => (
                    <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(v / max) * 100}%` }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        className="w-[6px] rounded-sm bg-amber-500"
                        style={{
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
        <div className="bg-bg-code border border-border-subtle rounded-lg p-3 w-fit border-t-2 border-t-amber-500 shadow-lg">
            <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
                <motion.circle 
                    cx="20" cy="25" r="5" fill="#EF4444" 
                    animate={{ scale: [1, 1.2, 1] }} 
                    transition={{ repeat: Infinity, duration: 2 }}
                />
                <circle cx="40" cy="10" r="4" fill="#F59E0B" />
                <circle cx="40" cy="40" r="4" fill="#F59E0B" />
                <circle cx="60" cy="15" r="4" fill="#F59E0B" />
                <circle cx="60" cy="35" r="4" fill="#F59E0B" />
                <circle cx="75" cy="25" r="3" fill="#F59E0B" opacity="0.7" />
                <motion.path 
                    d="M20 25 L40 10 M20 25 L40 40 M40 10 L60 15 M40 10 L60 35" 
                    stroke="#F59E0B" strokeWidth="0.5" strokeOpacity="0.4"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1.5 }}
                />
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
        <section id="capabilities" className="py-24 md:py-40 bg-[#070709] relative overflow-hidden">
             {/* Background mesh */}
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(#F59E0B 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                <Reveal delay={0.1}>
                    <h2 className="text-[32px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary text-center">
                        How we actually catch fraud
                    </h2>
                </Reveal>
                
                <Reveal delay={0.2}>
                    <p className="mt-8 text-[18px] text-text-secondary text-center max-w-[700px] mx-auto leading-[1.6]">
                        Each transaction is analyzed across device intelligence, behavioral
                        patterns, and cross-platform network data. Combined into a single risk score in under 50ms.
                    </p>
                </Reveal>

                <div className="mt-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {capabilities.map((cap, i) => {
                        const Icon = iconMap[cap.icon];
                        return (
                            <Reveal key={i} delay={0.1 * i} y={40}>
                                <div
                                    className="h-full bg-bg-secondary/50 backdrop-blur-sm border border-border-subtle rounded-2xl p-10 hover:border-amber-500/30 hover:bg-bg-secondary/80 transition-all duration-300 group"
                                >
                                    <div className="mb-8">
                                        <Icon />
                                    </div>
                                    <h3 className="text-[26px] font-bold text-text-primary tracking-tight">
                                        {cap.title}
                                    </h3>
                                    <p className="text-[15px] font-semibold text-amber-500 mt-2 uppercase tracking-wider">
                                        {cap.subtitle}
                                    </p>
                                    <div className="mt-6 text-[15px] text-text-secondary leading-[1.8]">
                                        {cap.body}
                                    </div>
                                    <ul className="mt-8 space-y-3">
                                        {cap.details.map((detail, j) => (
                                            <li key={j} className="text-[13px] text-text-tertiary flex items-start gap-3">
                                                <span className="text-amber-500/50 mt-0.5">→</span>
                                                <span className="group-hover:text-text-secondary transition-colors">{detail}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
