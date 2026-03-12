"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import WaitlistModal from "./WaitlistModal";

const navLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Integration", href: "#integration" },
    { label: "Pricing", href: "#pricing" },
];

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState("");
    const [modalOpen, setModalOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection("#" + entry.target.id);
                    }
                });
            },
            { rootMargin: "-40% 0px -50% 0px" }
        );

        const sections = document.querySelectorAll("section[id]");
        sections.forEach((s) => observer.observe(s));
        return () => observer.disconnect();
    }, []);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 h-20 flex items-center transition-all duration-500 ${scrolled
                        ? "bg-bg-primary/80 backdrop-blur-xl border-b border-border-subtle h-16"
                        : "bg-transparent h-20"
                    }`}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-text-primary font-bold text-2xl tracking-[-0.04em] flex items-center gap-2 group"
                    >
                        <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                           <div className="w-4 h-4 bg-bg-primary rounded-sm" />
                        </div>
                        flint
                    </Link>

                    {/* Center Nav - Desktop */}
                    <div className="hidden lg:flex items-center gap-10">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`relative text-[14px] font-semibold tracking-tight transition-all duration-300 ${activeSection === link.href
                                        ? "text-amber-500"
                                        : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                {link.label}
                                {activeSection === link.href && (
                                    <motion.span
                                        layoutId="nav-underline"
                                        className="absolute -bottom-1 left-0 w-full h-[2px] bg-amber-500"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Right Buttons - Desktop */}
                    <div className="hidden lg:flex items-center gap-6">
                        <a
                            href="#"
                            className="text-[14px] font-semibold text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Docs
                        </a>
                        <Link
                            href="/login"
                            className="text-[14px] font-bold bg-amber-500 text-bg-primary px-6 py-2.5 rounded-xl hover:bg-amber-400 transition-all duration-200 hover:scale-[1.05] shadow-lg shadow-amber-500/20 cursor-pointer"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden text-text-primary cursor-pointer p-2"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0, x: '100%' }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: '100%' }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-bg-primary flex flex-col p-8"
                    >
                        <div className="flex justify-between items-center mb-12">
                            <span className="text-2xl font-bold tracking-tighter text-text-primary">flint</span>
                            <button onClick={() => setMobileOpen(false)} className="text-text-primary p-2">
                                <X size={32} />
                            </button>
                        </div>
                        
                        <div className="flex flex-col gap-8">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.href}
                                    href={link.href}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-3xl font-bold text-text-secondary hover:text-amber-500 transition-colors"
                                >
                                    {link.label}
                                </motion.a>
                            ))}
                        </div>
                        
                        <div className="mt-auto flex flex-col gap-4">
                             <Link
                                href="/login"
                                onClick={() => setMobileOpen(false)}
                                className="w-full text-center text-[18px] font-bold bg-amber-500 text-bg-primary py-5 rounded-2xl"
                            >
                                Login
                            </Link>
                            <button
                                onClick={() => {
                                    setMobileOpen(false);
                                    setModalOpen(true);
                                }}
                                className="w-full text-center text-[18px] font-bold border border-border-subtle text-text-primary py-5 rounded-2xl"
                            >
                                Start Free Trial
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}
