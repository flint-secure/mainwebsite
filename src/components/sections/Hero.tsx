"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import WaitlistModal from "../WaitlistModal";
import { Reveal } from "../Reveal";

const headlineLines = [
    { text: "Every transaction.", highlight: false },
    { text: "Scored in ", highlight: false, suffix: "47ms", suffixHighlight: true },
    { text: "Before money moves.", highlight: false },
];

const requestLines = [
    { text: 'POST /v1/score', className: "text-text-tertiary" },
    { text: "" },
    { text: "{", className: "text-[#A1A1AA]" },
    { key: '"sender"', value: '"user_2847"', isString: true },
    { key: '"amount"', value: "48500", isNumber: true },
    { key: '"device"', value: '"fp_3f8a...c91d"', isString: true },
    { key: '"time"', value: '"02:47:03Z"', isString: true },
    { key: '"recipient"', value: '"acc_new_0192"', isString: true },
    { text: "}", className: "text-[#A1A1AA]" },
];

const responseLines = [
    { text: "{", className: "text-[#A1A1AA]" },
    { key: '"decision"', value: '"BLOCK"', isDecision: true },
    { key: '"risk_score"', value: "89", isScore: true },
    { key: '"reasons"', value: "[", isArray: true },
    { arrayItem: '"device_never_seen"' },
    { arrayItem: '"amount_38x_average"' },
    { arrayItem: '"unusual_hour"' },
    { arrayItem: '"new_recipient"' },
    { text: "    ]", className: "text-[#A1A1AA]" },
    { key: '"processing_time_ms"', value: "11", isNumber: true },
    { text: "}", className: "text-[#A1A1AA]" },
];

function CodeLine({ line, visible }: { line: Record<string, unknown>; visible: boolean }) {
    if (!visible) return null;

    if (line.arrayItem) {
        return (
            <div className="pl-6">
                <span className="text-[#22C55E]">{line.arrayItem as string}</span>
                <span className="text-[#A1A1AA]">,</span>
            </div>
        );
    }

    if (line.key) {
        return (
            <div className="pl-4">
                <span className="text-[#60A5FA]">{line.key as string}</span>
                <span className="text-[#A1A1AA]">: </span>
                {line.isDecision ? (
                    <span className="text-[#EF4444] drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]">
                        {line.value as string}
                    </span>
                ) : line.isScore ? (
                    <span className="text-[#F59E0B]">{line.value as string}</span>
                ) : line.isNumber ? (
                    <span className="text-[#F59E0B]">{line.value as string}</span>
                ) : line.isString ? (
                    <span className="text-[#22C55E]">{line.value as string}</span>
                ) : line.isArray ? (
                    <span className="text-[#A1A1AA]">{line.value as string}</span>
                ) : (
                    <span className="text-text-code">{line.value as string}</span>
                )}
                {!line.isArray && <span className="text-[#A1A1AA]">,</span>}
            </div>
        );
    }

    return (
        <div className={line.className as string || "text-text-code"}>
            {line.text as string}
        </div>
    );
}

export default function Hero() {
    const [visibleRequestLines, setVisibleRequestLines] = useState(0);
    const [showDivider, setShowDivider] = useState(false);
    const [visibleResponseLines, setVisibleResponseLines] = useState(0);
    const [animationStarted, setAnimationStarted] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const animRef = useRef(false);

    useEffect(() => {
        if (animRef.current) return;
        animRef.current = true;

        const startDelay = 800;
        const lineDelay = 60;

        setTimeout(() => {
            setAnimationStarted(true);
            let currentLine = 0;
            const requestTimer = setInterval(() => {
                currentLine++;
                setVisibleRequestLines(currentLine);
                if (currentLine >= requestLines.length) {
                    clearInterval(requestTimer);
                    setTimeout(() => {
                        setShowDivider(true);
                        let responseLine = 0;
                        const responseTimer = setInterval(() => {
                            responseLine++;
                            setVisibleResponseLines(responseLine);
                            if (responseLine >= responseLines.length) {
                                clearInterval(responseTimer);
                            }
                        }, lineDelay);
                    }, 400);
                }
            }, lineDelay);
        }, startDelay);
    }, []);

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center relative overflow-hidden pt-20"
            style={{
                background: "radial-gradient(circle at 50% 50%, #111115 0%, #09090B 100%)",
            }}
        >
            {/* Ambient Background */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-20 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                    {/* Left Column */}
                    <div className="flex-1 lg:max-w-[55%]">
                        <Reveal delay={0.1} y={20}>
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 text-[12px] font-bold tracking-wider uppercase mb-8">
                                Real-time fraud intelligence
                            </div>
                        </Reveal>

                        <div className="space-y-2">
                            {headlineLines.map((line, i) => (
                                <Reveal key={i} delay={0.2 + i * 0.1} y={30}>
                                    <div className="text-[42px] md:text-[64px] lg:text-[72px] font-bold leading-[1.05] tracking-[-0.04em] text-text-primary">
                                        {line.text}
                                        {line.suffix && (
                                            <span className="text-amber-500 italic ml-2">{line.suffix}</span>
                                        )}
                                    </div>
                                </Reveal>
                            ))}
                        </div>

                        <Reveal delay={0.6}>
                            <p className="mt-8 text-[18px] md:text-[21px] font-normal text-text-secondary leading-[1.6] max-w-[540px]">
                                Flint scores every transaction in under 50ms using device intelligence and behavioral analysis. One API call, before money moves.
                            </p>
                        </Reveal>

                        <Reveal delay={0.8}>
                            <div className="mt-12 flex flex-col sm:flex-row gap-5">
                                <button
                                    onClick={() => setModalOpen(true)}
                                    className="text-[16px] font-bold bg-amber-500 text-bg-primary px-8 py-4 rounded-xl hover:bg-amber-400 transition-all duration-200 hover:scale-[1.02] shadow-[0_8px_25px_rgba(245,158,11,0.25)] cursor-pointer"
                                >
                                    Start Free Trial
                                </button>
                                <a
                                    href="#integration"
                                    className="text-[16px] font-bold text-text-primary px-8 py-4 rounded-xl border border-border-subtle hover:border-amber-500/30 hover:bg-amber-500/5 transition-all duration-200 text-center"
                                >
                                    View Demo →
                                </a>
                            </div>
                        </Reveal>

                        <Reveal delay={1.0}>
                            <div className="mt-10 flex items-center gap-6">
                                <div className="flex -space-x-3">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-primary bg-bg-tertiary" />
                                    ))}
                                </div>
                                <p className="text-[13px] text-text-tertiary">
                                    Trusted by <span className="text-text-secondary font-semibold">50+ fintech teams</span>
                                </p>
                            </div>
                        </Reveal>
                    </div>

                    {/* Right Column - Terminal */}
                    <Reveal delay={0.4} y={40} width="100%">
                        <div className="flex-1 w-full lg:max-w-[480px]">
                            <div
                                className="bg-[#0C0C0F] border border-border-subtle rounded-2xl overflow-hidden shadow-2xl relative"
                                style={{
                                    boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 120px rgba(245,158,11,0.05)",
                                }}
                            >
                                {/* Terminal top bar */}
                                <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-bg-secondary/50">
                                    <div className="flex gap-1">
                                        <div className="w-8 h-1 rounded-full bg-border-subtle" />
                                    </div>
                                    <span className="text-[11px] text-text-tertiary font-mono uppercase tracking-widest">
                                        status: live
                                    </span>
                                </div>

                                {/* Code content */}
                                <div className="p-6 font-mono text-[13px] leading-[1.8] space-y-0.5 min-h-[420px]">
                                    {requestLines.map((line, i) => (
                                        <CodeLine key={`req-${i}`} line={line as Record<string, unknown>} visible={i < visibleRequestLines} />
                                    ))}

                                    {showDivider && (
                                        <motion.div 
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="my-5 flex items-center gap-3 text-text-tertiary text-[11px]"
                                        >
                                            <span className="flex-1 h-px bg-border-subtle" />
                                            <span className="font-bold uppercase tracking-tighter">
                                                Response · <span className="text-amber-500">47ms</span>
                                            </span>
                                            <span className="flex-1 h-px bg-border-subtle" />
                                        </motion.div>
                                    )}

                                    {responseLines.map((line, i) => (
                                        <CodeLine key={`res-${i}`} line={line as Record<string, unknown>} visible={showDivider && i < visibleResponseLines} />
                                    ))}
                                </div>
                                
                                {/* Bottom Accent */}
                                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>

            <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
}
