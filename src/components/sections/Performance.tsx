"use client";

import { motion } from "framer-motion";

const segments = [
    { label: "Network", ms: 15, color: "#71717A", note: "Speed of light" },
    { label: "Validate", ms: 0.1, color: "#22C55E", note: "Schema check" },
    { label: "Redis", ms: 2, color: "#F59E0B", note: "6 parallel lookups" },
    { label: "Score", ms: 0.5, color: "#22C55E", note: "Risk calculation" },
    { label: "Respond", ms: 0.1, color: "#22C55E", note: "Serialize + send" },
];

const totalMs = segments.reduce((sum, s) => sum + s.ms, 0);

const metrics = [
    { metric: "<50ms", label: "Median response time", sub: "P99 under 100ms" },
    { metric: "0ms", label: "Added to your failure rate", sub: "Fail-open architecture" },
    { metric: "6", label: "Parallel data lookups", sub: "Redis in-memory, not disk" },
    { metric: "0", label: "Database queries during scoring", sub: "All data pre-computed in RAM" },
];

const fadeUp = {
    initial: { opacity: 0, y: 30 } as const,
    whileInView: { opacity: 1, y: 0 } as const,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
    viewport: { once: true, margin: "-100px" },
};

export default function Performance() {
    return (
        <section id="performance" className="py-24 md:py-40 bg-bg-primary">
            <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.span {...fadeUp} className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6 text-center">
                    PERFORMANCE
                </motion.span>
                <motion.h2 {...fadeUp} className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    Where every millisecond goes.
                </motion.h2>

                {/* Stacked bar */}
                <motion.div {...fadeUp} className="mt-16">
                    <div className="flex rounded-lg overflow-hidden h-12 border border-border-subtle">
                        {segments.map((seg, i) => {
                            const widthPct = (seg.ms / totalMs) * 100;
                            return (
                                <div
                                    key={i}
                                    className="relative group flex items-center justify-center text-[11px] font-mono font-medium"
                                    style={{
                                        width: `${Math.max(widthPct, 5)}%`,
                                        backgroundColor: seg.color + "20",
                                        borderRight: i < segments.length - 1 ? "1px solid #27272A" : "none",
                                    }}
                                >
                                    <span className="hidden md:inline" style={{ color: seg.color }}>
                                        {seg.label} {seg.ms}ms
                                    </span>
                                    <span className="md:hidden" style={{ color: seg.color }}>
                                        {seg.ms}
                                    </span>
                                </div>
                            );
                        })}
                    </div>

                    {/* Legend */}
                    <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 justify-center">
                        {segments.map((seg, i) => (
                            <div key={i} className="flex items-center gap-2 text-[13px]">
                                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: seg.color }} />
                                <span className="text-text-secondary">
                                    {seg.label}: <span className="font-mono">{seg.ms}ms</span>
                                </span>
                                <span className="text-text-tertiary">— {seg.note}</span>
                            </div>
                        ))}
                    </div>

                    {/* Highlight text */}
                    <motion.p {...fadeUp} className="mt-8 text-center text-[16px] text-text-secondary">
                        <span className="font-mono text-amber-500">15ms</span> is network
                        latency — the speed of light.{" "}
                        <span className="font-mono text-green">2.7ms</span> is everything
                        Flint does.
                    </motion.p>
                </motion.div>

                {/* Four metric cards */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            viewport={{ once: true }}
                            className="bg-bg-secondary border border-border-subtle rounded-xl p-6 text-center hover:border-border-hover transition-colors duration-200"
                        >
                            <p className="font-mono text-[36px] lg:text-[48px] font-bold text-amber-500 tracking-[-0.04em]">
                                {m.metric}
                            </p>
                            <p className="text-[14px] lg:text-[16px] font-semibold text-text-primary mt-2">
                                {m.label}
                            </p>
                            <p className="text-[13px] text-text-tertiary mt-1">{m.sub}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
