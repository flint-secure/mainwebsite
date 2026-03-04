"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import WaitlistModal from "../WaitlistModal";

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
        const lineDelay = 150;

        // Animate request lines
        let currentLine = 0;
        const requestTimer = setInterval(() => {
            currentLine++;
            setVisibleRequestLines(currentLine);
            if (currentLine >= requestLines.length) {
                clearInterval(requestTimer);
                // Show divider after pause
                setTimeout(() => {
                    setShowDivider(true);
                    // Animate response lines
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

        setTimeout(() => setAnimationStarted(true), startDelay);

        return () => clearInterval(requestTimer);
    }, []);

    return (
        <section
            id="hero"
            className="min-h-screen flex items-center relative overflow-hidden pt-16"
            style={{
                background: "linear-gradient(180deg, #09090B 0%, #0F0F13 100%)",
            }}
        >
            <div className="w-full max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-20 lg:py-0">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
                    {/* Left Column */}
                    <div className="flex-1 lg:max-w-[55%]">
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="inline-block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6"
                        >
                            REAL-TIME FRAUD INTELLIGENCE
                        </motion.span>

                        <h1 className="sr-only">
                            Every transaction. Scored in 47ms. Before money moves.
                        </h1>
                        <div className="space-y-1" aria-hidden="true">
                            {headlineLines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.6,
                                        delay: 0.2 + i * 0.15,
                                        ease: [0.25, 0.1, 0.25, 1],
                                    }}
                                    className="text-[40px] md:text-[56px] lg:text-[64px] font-bold leading-[1.1] tracking-[-0.03em] text-text-primary"
                                >
                                    {line.text}
                                    {line.suffix && (
                                        <span className="text-amber-500">{line.suffix}</span>
                                    )}
                                    {line.text === "Before money moves." && ""}
                                </motion.div>
                            ))}
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.7 }}
                            className="mt-6 text-[17px] md:text-[20px] font-normal text-text-secondary leading-[1.6] max-w-[540px]"
                        >
                            Flint is a real-time fraud detection API for digital payment
                            companies. Device intelligence, behavioral analysis, and
                            cross-platform network intelligence — one API call, one
                            decision, before the transaction processes.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.9 }}
                            className="mt-10 flex flex-col sm:flex-row gap-4"
                        >
                            <button
                                onClick={() => setModalOpen(true)}
                                className="text-base font-semibold bg-amber-500 text-bg-primary px-7 py-3.5 rounded-lg hover:bg-amber-400 transition-all duration-150 hover:scale-[1.02] cursor-pointer"
                            >
                                Start Free Trial
                            </button>
                            <a
                                href="#integration"
                                className="text-base font-medium text-text-primary px-7 py-3.5 rounded-lg border border-border-subtle hover:border-border-hover transition-all duration-200 text-center"
                            >
                                Read Documentation →
                            </a>
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 1.1 }}
                            className="mt-8 text-[13px] text-text-tertiary"
                        >
                            Open source SDKs · MIT Licensed · Fail-open by design
                        </motion.p>
                    </div>

                    {/* Right Column - Terminal */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: animationStarted ? 1 : 0, y: animationStarted ? 0 : 30 }}
                        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                        className="flex-1 w-full lg:max-w-[45%]"
                    >
                        <div
                            className="bg-bg-code border border-border-subtle rounded-xl overflow-hidden"
                            style={{
                                boxShadow: "0 0 120px rgba(245,158,11,0.08)",
                            }}
                        >
                            {/* Terminal top bar */}
                            <div className="flex items-center justify-between px-5 py-3 border-b border-border-subtle">
                                <div className="flex gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-green" />
                                </div>
                                <span className="text-[12px] text-text-tertiary font-mono">
                                    api.flintsecure.app
                                </span>
                            </div>

                            {/* Code content */}
                            <div className="p-5 font-mono text-[12px] md:text-[13px] leading-[1.7] space-y-0.5 min-h-[380px]">
                                {requestLines.map((line, i) => (
                                    <CodeLine key={`req-${i}`} line={line as Record<string, unknown>} visible={i < visibleRequestLines} />
                                ))}

                                {showDivider && (
                                    <div className="my-3 flex items-center gap-2 text-text-tertiary text-[11px]">
                                        <span className="flex-1 h-px bg-border-subtle" />
                                        <span>
                                            Response · <span className="text-amber-500">47ms</span>
                                        </span>
                                        <span className="flex-1 h-px bg-border-subtle" />
                                    </div>
                                )}

                                {responseLines.map((line, i) => (
                                    <CodeLine key={`res-${i}`} line={line as Record<string, unknown>} visible={showDivider && i < visibleResponseLines} />
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </section>
    );
}
