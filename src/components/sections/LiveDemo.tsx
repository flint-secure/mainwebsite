"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

interface Inputs {
    amount: number;
    device: string;
    hour: number;
    velocity: number;
    recipient: string;
    vpn: boolean;
}

function calculateScore(inputs: Inputs) {
    let score = 0;
    const reasons: string[] = [];
    const breakdown = { device: 0, behavioral: 0, velocity: 0, recipient: 0 };

    // Device (max 35)
    if (inputs.device === "flagged") {
        breakdown.device = 35;
        reasons.push("device_flagged_in_network");
    } else if (inputs.device === "new") {
        breakdown.device = 22;
        reasons.push("new_device");
    } else if (inputs.device === "known") {
        breakdown.device = 8;
        reasons.push("device_recently_added");
    } else {
        breakdown.device = 0;
    }

    // Amount + time → behavioral (max 25)
    const ratio = inputs.amount / 1200;
    if (ratio > 20) {
        breakdown.behavioral += 15;
        reasons.push(`amount_${Math.round(ratio)}x_average`);
    } else if (ratio > 10) {
        breakdown.behavioral += 12;
        reasons.push(`amount_${Math.round(ratio)}x_average`);
    } else if (ratio > 5) {
        breakdown.behavioral += 8;
        reasons.push("amount_above_normal");
    } else if (ratio > 2) {
        breakdown.behavioral += 3;
    }

    const hour = inputs.hour;
    if (hour >= 1 && hour <= 5) {
        breakdown.behavioral += 10;
        reasons.push("unusual_hour_night");
    } else if (hour >= 22 || hour === 0) {
        breakdown.behavioral += 5;
        reasons.push("late_night");
    } else if (hour >= 6 && hour <= 7) {
        breakdown.behavioral += 2;
    }

    if (breakdown.behavioral > 25) breakdown.behavioral = 25;

    // Velocity (max 20)
    if (inputs.velocity > 10) {
        breakdown.velocity = 20;
        reasons.push("extreme_velocity");
    } else if (inputs.velocity > 5) {
        breakdown.velocity = 14;
        reasons.push("high_velocity");
    } else if (inputs.velocity > 3) {
        breakdown.velocity = 7;
        reasons.push("elevated_velocity");
    }

    // Recipient (max 20)
    if (inputs.recipient === "flagged") {
        breakdown.recipient = 20;
        reasons.push("recipient_flagged");
    } else if (inputs.recipient === "new") {
        breakdown.recipient = 10;
        reasons.push("new_recipient");
    }

    // VPN adds to device
    if (inputs.vpn) {
        breakdown.device = Math.min(breakdown.device + 12, 35);
        reasons.push("vpn_detected");
    }

    score = breakdown.device + breakdown.behavioral + breakdown.velocity + breakdown.recipient;
    score = Math.min(score, 100);

    return { score, reasons, breakdown };
}

function getDecision(score: number) {
    if (score >= 80) return "BLOCK";
    if (score >= 50) return "FLAG";
    return "ALLOW";
}

function getDecisionColor(decision: string) {
    if (decision === "BLOCK") return "#EF4444";
    if (decision === "FLAG") return "#F59E0B";
    return "#22C55E";
}

function getScoreColor(score: number) {
    if (score >= 80) return "#EF4444";
    if (score >= 50) return "#F59E0B";
    return "#22C55E";
}

function generateSummary(inputs: Inputs, score: number, decision: string): string {
    const deviceLabel = inputs.device === "flagged" ? "Flagged device" : inputs.device === "new" ? "New device" : inputs.device === "known" ? "Recently added device" : "Trusted device";
    const timeStr = `${inputs.hour === 0 ? 12 : inputs.hour > 12 ? inputs.hour - 12 : inputs.hour}:00 ${inputs.hour >= 12 ? "PM" : "AM"}`;
    const amountStr = `Rs ${inputs.amount.toLocaleString("en-IN")}`;

    if (decision === "ALLOW") {
        return `Low risk: ${deviceLabel} attempting ${amountStr} transfer at ${timeStr}. Transaction proceeds without friction.`;
    }
    if (decision === "FLAG") {
        return `Moderate risk: ${deviceLabel} attempting ${amountStr} transfer at ${timeStr}. Step-up verification recommended.`;
    }
    return `High risk: ${deviceLabel} attempting ${amountStr} transfer at ${timeStr}. Transaction should be blocked pending review.`;
}

function SegmentedControl({
    options,
    value,
    onChange,
}: {
    options: string[];
    value: string;
    onChange: (v: string) => void;
}) {
    return (
        <div className="flex bg-bg-code rounded-lg p-1 gap-1">
            {options.map((opt) => (
                <button
                    key={opt}
                    onClick={() => onChange(opt.toLowerCase())}
                    className={`flex-1 px-3 py-2 rounded-md text-[13px] font-medium transition-all duration-150 capitalize cursor-pointer ${value === opt.toLowerCase()
                            ? "bg-bg-tertiary border border-border-hover text-text-primary"
                            : "text-text-tertiary hover:text-text-secondary border border-transparent"
                        }`}
                >
                    {opt}
                </button>
            ))}
        </div>
    );
}

function ScoreGauge({ score }: { score: number }) {
    const radius = 85;
    const circumference = 2 * Math.PI * radius;
    const progress = (score / 100) * circumference;
    const color = getScoreColor(score);
    const decision = getDecision(score);
    const decisionColor = getDecisionColor(decision);

    return (
        <div className="flex flex-col items-center">
            <svg width="200" height="200" viewBox="0 0 200 200">
                {/* Track */}
                <circle
                    cx="100" cy="100" r={radius}
                    fill="none" stroke="#27272A" strokeWidth="8"
                />
                {/* Fill */}
                <circle
                    cx="100" cy="100" r={radius}
                    fill="none" stroke={color} strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={circumference - progress}
                    transform="rotate(-90 100 100)"
                    style={{ transition: "stroke-dashoffset 0.5s ease, stroke 0.3s ease" }}
                />
                {/* Score */}
                <text x="100" y="95" textAnchor="middle" className="font-mono text-[48px] font-bold" fill="#F4F4F5">
                    {score}
                </text>
                <text x="100" y="120" textAnchor="middle" className="text-[16px]" fill="#71717A">
                    / 100
                </text>
            </svg>

            {/* Decision badge */}
            <div
                className="mt-4 px-5 py-2 rounded-full text-[14px] font-bold uppercase tracking-[0.08em]"
                style={{
                    backgroundColor: `${decisionColor}15`,
                    color: decisionColor,
                    transition: "all 0.3s ease",
                }}
            >
                {decision}
            </div>
        </div>
    );
}

function BreakdownBar({
    label,
    value,
    max,
}: {
    label: string;
    value: number;
    max: number;
}) {
    const pct = (value / max) * 100;
    const color = pct > 70 ? "#EF4444" : pct > 40 ? "#F59E0B" : "#22C55E";

    return (
        <div className="flex items-center gap-4">
            <span className="text-[14px] text-text-secondary w-[160px] shrink-0">
                {label}
            </span>
            <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full"
                    style={{
                        width: `${pct}%`,
                        backgroundColor: color,
                        transition: "width 0.4s ease, background-color 0.3s ease",
                    }}
                />
            </div>
            <span className="text-[14px] font-mono text-text-tertiary w-[50px] text-right shrink-0">
                {value}/{max}
            </span>
        </div>
    );
}

import { fadeUp } from "@/lib/animations";

export default function LiveDemo() {
    const [inputs, setInputs] = useState<Inputs>({
        amount: 5000,
        device: "trusted",
        hour: 14,
        velocity: 1,
        recipient: "known",
        vpn: false,
    });

    const { score, reasons, breakdown } = useMemo(() => calculateScore(inputs), [inputs]);
    const decision = getDecision(score);
    const summary = useMemo(() => generateSummary(inputs, score, decision), [inputs, score, decision]);

    const formatTime = (h: number) => {
        const ampm = h >= 12 ? "PM" : "AM";
        const display = h === 0 ? 12 : h > 12 ? h - 12 : h;
        return `${display}:00 ${ampm}`;
    };

    return (
        <section id="demo" className="py-24 md:py-40 bg-bg-primary">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.span {...fadeUp} className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6 text-center">
                    TRY IT
                </motion.span>
                <motion.h2 {...fadeUp} className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    Score a transaction. See the logic.
                </motion.h2>
                <motion.p {...fadeUp} className="mt-6 text-[17px] text-text-secondary text-center max-w-[640px] mx-auto leading-[1.6]">
                    Adjust the parameters below and watch how the risk score changes. This
                    is a simplified version of the scoring logic. The production engine
                    uses 50+ signals and per-user behavioral profiles.
                </motion.p>

                <motion.div
                    {...fadeUp}
                    className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-12"
                >
                    {/* Left - Inputs */}
                    <div className="space-y-8">
                        {/* Amount */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                                    Transaction Amount
                                </label>
                                <span className="text-[14px] font-mono text-text-primary">
                                    Rs {inputs.amount.toLocaleString("en-IN")}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={100}
                                max={100000}
                                step={100}
                                value={inputs.amount}
                                onChange={(e) => setInputs({ ...inputs, amount: parseInt(e.target.value) })}
                            />
                        </div>

                        {/* Device Status */}
                        <div>
                            <label className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-3">
                                Device Status
                            </label>
                            <SegmentedControl
                                options={["Trusted", "Known", "New", "Flagged"]}
                                value={inputs.device}
                                onChange={(v) => setInputs({ ...inputs, device: v })}
                            />
                        </div>

                        {/* Time */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                                    Time of Day
                                </label>
                                <span className="text-[14px] font-mono text-text-primary">
                                    {formatTime(inputs.hour)}
                                </span>
                            </div>
                            <input
                                type="range"
                                min={0}
                                max={23}
                                step={1}
                                value={inputs.hour}
                                onChange={(e) => setInputs({ ...inputs, hour: parseInt(e.target.value) })}
                            />
                        </div>

                        {/* Velocity */}
                        <div>
                            <div className="flex justify-between items-center mb-3">
                                <label className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                                    Transaction Velocity
                                </label>
                                <span className="text-[14px] font-mono text-text-primary">
                                    {inputs.velocity} tx/hr
                                </span>
                            </div>
                            <input
                                type="range"
                                min={1}
                                max={20}
                                step={1}
                                value={inputs.velocity}
                                onChange={(e) => setInputs({ ...inputs, velocity: parseInt(e.target.value) })}
                            />
                        </div>

                        {/* Recipient */}
                        <div>
                            <label className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-3">
                                Recipient
                            </label>
                            <SegmentedControl
                                options={["Known", "New", "Flagged"]}
                                value={inputs.recipient}
                                onChange={(v) => setInputs({ ...inputs, recipient: v })}
                            />
                        </div>

                        {/* VPN */}
                        <div className="flex items-center justify-between">
                            <label className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-tertiary">
                                VPN Detected
                            </label>
                            <div
                                className={`toggle-switch ${inputs.vpn ? "active" : ""}`}
                                onClick={() => setInputs({ ...inputs, vpn: !inputs.vpn })}
                            />
                        </div>
                    </div>

                    {/* Right - Result */}
                    <div className="flex flex-col items-center">
                        <ScoreGauge score={score} />

                        {/* Breakdown */}
                        <div className="w-full mt-10 space-y-4">
                            <BreakdownBar label="Device Assessment" value={breakdown.device} max={35} />
                            <BreakdownBar label="Behavioral Analysis" value={breakdown.behavioral} max={25} />
                            <BreakdownBar label="Velocity Check" value={breakdown.velocity} max={20} />
                            <BreakdownBar label="Recipient Risk" value={breakdown.recipient} max={20} />
                        </div>

                        {/* Reason tags */}
                        <div className="w-full mt-8 flex flex-wrap gap-2">
                            {reasons.map((reason) => (
                                <motion.span
                                    key={reason}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    className="bg-bg-tertiary border border-border-subtle rounded-md px-3 py-1.5 text-[12px] font-mono text-text-secondary"
                                >
                                    {reason}
                                </motion.span>
                            ))}
                        </div>

                        {/* Summary */}
                        <p className="w-full mt-6 text-[14px] text-text-secondary italic leading-[1.6]">
                            {summary}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
