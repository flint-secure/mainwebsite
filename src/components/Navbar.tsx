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
            setScrolled(window.scrollY > 100);
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
                className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center transition-all duration-300 border-b ${scrolled
                        ? "bg-bg-primary/95 backdrop-blur-xl border-border-subtle"
                        : "bg-bg-primary/80 backdrop-blur-md border-transparent"
                    }`}
            >
                <div className="w-full max-w-[1400px] mx-auto px-6 md:px-12 lg:px-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link
                        href="/"
                        className="text-text-primary font-bold text-xl tracking-[0.05em]"
                    >
                        flint
                    </Link>

                    {/* Center Nav - Desktop */}
                    <div className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className={`relative text-sm font-medium transition-colors duration-200 ${activeSection === link.href
                                        ? "text-text-primary"
                                        : "text-text-secondary hover:text-text-primary"
                                    }`}
                            >
                                {link.label}
                                {activeSection === link.href && (
                                    <motion.span
                                        layoutId="nav-dot"
                                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-amber-500"
                                    />
                                )}
                            </a>
                        ))}
                    </div>

                    {/* Right Buttons - Desktop */}
                    <div className="hidden lg:flex items-center gap-4">
                        <a
                            href="#"
                            className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
                        >
                            Documentation
                        </a>
                        <Link
                            href="/login"
                            className="text-sm font-semibold bg-amber-500 text-bg-primary px-5 py-2 rounded-lg hover:bg-amber-400 transition-all duration-150 hover:scale-[1.02] cursor-pointer"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Mobile hamburger */}
                    <button
                        className="lg:hidden text-text-primary cursor-pointer"
                        onClick={() => setMobileOpen(!mobileOpen)}
                    >
                        {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 bg-bg-primary/98 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
                    >
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                className="text-2xl font-medium text-text-secondary hover:text-text-primary transition-colors"
                            >
                                {link.label}
                            </a>
                        ))}
                        <Link
                            href="/login"
                            onClick={() => {
                                setMobileOpen(false);
                            }}
                            className="mt-4 text-base font-semibold bg-amber-500 text-bg-primary px-8 py-3 rounded-lg cursor-pointer"
                        >
                            Login
                        </Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <WaitlistModal open={modalOpen} onClose={() => setModalOpen(false)} />
        </>
    );
}
