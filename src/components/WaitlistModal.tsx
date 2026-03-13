"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Clarity from "@microsoft/clarity";

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

interface WaitlistModalProps {
    open: boolean;
    onClose: () => void;
}

export default function WaitlistModal({ open, onClose }: WaitlistModalProps) {
    const [form, setForm] = useState({ name: "", email: "", company: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addDoc(collection(db, "waitlist"), {
                ...form,
                timestamp: serverTimestamp(),
            });
            Clarity.setTag("action", "waitlist_signup");
            Clarity.setTag("company", form.company);
            setSubmitted(true);
        } catch (error) {
            console.error("Error adding to waitlist:", error);
            setSubmitted(true); // Still show success UI to user or handle error
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        onClose();
        setTimeout(() => {
            setSubmitted(false);
            setForm({ name: "", email: "", company: "" });
        }, 300);
    };

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
                    onClick={handleClose}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-bg-secondary border border-border-subtle rounded-xl p-8 w-full max-w-md relative"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleClose}
                            aria-label="Close waitlist modal"
                            className="absolute top-4 right-4 text-text-tertiary hover:text-text-primary transition-colors cursor-pointer"
                        >
                            <X size={20} />
                        </button>

                        {submitted ? (
                            <div className="text-center py-8">
                                <div className="w-12 h-12 rounded-full bg-green/10 flex items-center justify-center mx-auto mb-4">
                                    <span className="text-green text-2xl">✓</span>
                                </div>
                                <h3 className="text-xl font-bold text-text-primary mb-2">
                                    You&apos;re on the list.
                                </h3>
                                <p className="text-text-secondary text-sm">
                                    We&apos;ll be in touch with API access details.
                                </p>
                            </div>
                        ) : (
                            <>
                                <h3 className="text-xl font-bold text-text-primary mb-1">
                                    Request API Access
                                </h3>
                                <p className="text-sm text-text-tertiary mb-6">
                                    We&apos;ll send you credentials within 24 hours.
                                </p>
                                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                    <div>
                                        <label htmlFor="waitlist-name" className="block text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-2">
                                            Name
                                        </label>
                                        <input
                                            id="waitlist-name"
                                            type="text"
                                            required
                                            value={form.name}
                                            onChange={(e) =>
                                                setForm({ ...form, name: e.target.value })
                                            }
                                            className="w-full bg-bg-code border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber-500 transition-colors"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="waitlist-email" className="block text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-2">
                                            Email
                                        </label>
                                        <input
                                            id="waitlist-email"
                                            type="email"
                                            required
                                            value={form.email}
                                            onChange={(e) =>
                                                setForm({ ...form, email: e.target.value })
                                            }
                                            className="w-full bg-bg-code border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber-500 transition-colors"
                                            placeholder="you@company.com"
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="waitlist-company" className="block text-xs font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-2">
                                            Company
                                        </label>
                                        <input
                                            id="waitlist-company"
                                            type="text"
                                            required
                                            value={form.company}
                                            onChange={(e) =>
                                                setForm({ ...form, company: e.target.value })
                                            }
                                            className="w-full bg-bg-code border border-border-subtle rounded-lg px-4 py-2.5 text-sm text-text-primary focus:outline-none focus:border-amber-500 transition-colors"
                                            placeholder="Company name"
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="mt-2 w-full bg-amber-500 text-bg-primary font-semibold py-3 rounded-lg hover:bg-amber-400 transition-all duration-150 disabled:opacity-50 cursor-pointer"
                                    >
                                        {loading ? "Submitting..." : "Join Waitlist"}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
