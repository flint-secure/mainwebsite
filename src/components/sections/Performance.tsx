"use client";

import { Reveal } from "../Reveal";
import { motion } from "framer-motion";

const segments = [
    { label: "Network", ms: 15, note: "Speed of light", description: "Cross-region latency" },
    { label: "Validate", ms: 0.1, note: "Schema check", description: "Request sanitization" },
    { label: "Redis", ms: 2, note: "6 parallel lookups", description: "State retrieval" },
    { label: "Score", ms: 0.5, note: "Risk calculation", description: "Model inference" },
    { label: "Respond", ms: 0.1, note: "Serialize + send", description: "Protocol buffer" },
];

const metrics = [
    { metric: "<50ms", label: "Median Response", sub: "P99 under 100ms" },
    { metric: "0ms", label: "Failure Rate", sub: "Fail-open architecture" },
    { metric: "6", label: "Parallel Lookups", sub: "Redis in-memory" },
    { metric: "0", label: "DB Queries", sub: "RAM-first architecture" },
];

export default function Performance() {
    return (
        <section id="performance" className="py-24 md:py-40 bg-[#09090B] relative overflow-hidden">
             {/* Background decoration */}
             <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 relative z-10">
                <Reveal delay={0.1}>
                    <h2 className="text-[32px] md:text-[56px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary text-center">
                        Where every millisecond goes
                    </h2>
                </Reveal>
                
                <Reveal delay={0.2}>
                    <p className="mt-8 text-[18px] text-text-secondary text-center max-w-[700px] mx-auto leading-[1.6]">
                        Speed is a security feature. We optimized our stack to ensure 
                        fraud detection never slows down your checkout flow.
                    </p>
                </Reveal>

                {/* Latency Timeline */}
                <div className="mt-24 max-w-[900px] mx-auto">
                    <Reveal delay={0.3}>
                        <div className="bg-bg-secondary/40 border border-border-subtle rounded-2xl p-8 lg:p-12 backdrop-blur-sm">
                            <div className="space-y-10">
                                {segments.map((seg, i) => (
                                    <div key={i} className="relative flex items-center group">
                                        {/* Connector Line */}
                                        {i < segments.length - 1 && (
                                            <div className="absolute left-[120px] top-[40px] w-px h-[40px] bg-border-subtle group-hover:bg-amber-500/30 transition-colors" />
                                        )}
                                        
                                        {/* Label */}
                                        <div className="w-[120px] shrink-0">
                                            <span className="text-[13px] font-bold text-text-tertiary uppercase tracking-widest group-hover:text-text-primary transition-colors">
                                                {seg.label}
                                            </span>
                                        </div>

                                        {/* Bar and Value */}
                                        <div className="flex-1 flex items-center gap-6">
                                            <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden border border-border-subtle/50">
                                                <motion.div
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${(seg.ms / 15) * 100}%` }}
                                                    transition={{ delay: 0.5 + i * 0.1, duration: 1, ease: "easeOut" }}
                                                    className="h-full bg-amber-500"
                                                />
                                            </div>
                                            <div className="w-[80px] text-right">
                                                <span className="font-mono text-[16px] font-bold text-amber-500">
                                                    {seg.ms}ms
                                                </span>
                                            </div>
                                        </div>

                                        {/* Note */}
                                        <div className="hidden md:block w-[180px] ml-8">
                                            <span className="text-[13px] text-text-tertiary">
                                                — {seg.note}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-16 pt-8 border-t border-border-subtle flex flex-col md:flex-row justify-between items-center gap-4">
                                <p className="text-[14px] text-text-tertiary italic">
                                    Total processing time: <span className="text-text-primary font-bold font-mono">2.7ms</span>
                                </p>
                                <p className="text-[14px] text-text-tertiary italic">
                                    Network overhead: <span className="text-text-primary font-bold font-mono">15ms</span>
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>

                {/* Grid Metrics */}
                <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {metrics.map((m, i) => (
                        <Reveal key={i} delay={0.1 * i} y={20}>
                            <div
                                className="h-full bg-bg-secondary/30 border border-border-subtle rounded-2xl p-8 text-center hover:border-amber-500/20 transition-all group"
                            >
                                <p className="font-mono text-[42px] font-bold text-text-primary tracking-tighter group-hover:text-amber-500 transition-colors">
                                    {m.metric}
                                </p>
                                <p className="text-[15px] font-bold text-text-primary mt-3 uppercase tracking-tight">
                                    {m.label}
                                </p>
                                <p className="text-[13px] text-text-tertiary mt-2 group-hover:text-text-secondary transition-colors">
                                    {m.sub}
                                </p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
