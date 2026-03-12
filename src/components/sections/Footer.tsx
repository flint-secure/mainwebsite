"use client";

import Image from "next/image";
import { Reveal } from "../Reveal";

const productLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
];

const developerLinks = [
    { label: "GitHub", href: "https://github.com/flintsecure" },
    { label: "SDK Guide", href: "#integration" },
    { label: "Status", href: "#" },
    { label: "Security", href: "#" },
];

const companyLinks = [
    { label: "Blog", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "https://twitter.com/flintsecure" },
    { label: "Legal", href: "#" },
];

function FooterColumn({
    title,
    links,
}: {
    title: string;
    links: { label: string; href: string }[];
}) {
    return (
        <div>
            <p className="text-[12px] font-bold uppercase tracking-[0.15em] text-text-tertiary mb-6">
                {title}
            </p>
            <ul className="space-y-4">
                {links.map((link, i) => (
                    <li key={i}>
                        <a
                            href={link.href}
                            className="text-[14px] font-medium text-text-secondary hover:text-amber-500 transition-colors duration-200"
                        >
                            {link.label}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default function Footer() {
    return (
        <footer className="bg-[#050507] border-t border-border-subtle pt-24 pb-12">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
                <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <Image
                                src="/logo.png"
                                alt="Flint Logo"
                                width={32}
                                height={32}
                                className="rounded-lg"
                            />
                            <span className="text-text-primary font-bold text-2xl tracking-tight">flint</span>
                        </div>
                        <p className="text-[15px] text-text-tertiary max-w-[280px] leading-[1.7] mb-8">
                            High-fidelity fraud intelligence for the next generation of digital payments. Built for speed, accuracy, and trust.
                        </p>
                        <div className="flex flex-col gap-2">
                             <a
                                href="mailto:hello.flintsecure@gmail.com"
                                className="text-[14px] font-semibold text-text-secondary hover:text-amber-500 transition-colors"
                            >
                                hello.flintsecure@gmail.com
                            </a>
                        </div>
                    </div>

                    <FooterColumn title="Product" links={productLinks} />
                    <FooterColumn title="Developers" links={developerLinks} />
                    <FooterColumn title="Company" links={companyLinks} />
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-border-subtle flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-6">
                        <p className="text-[13px] text-text-tertiary">
                            © 2026 Flint Secure · All rights reserved
                        </p>
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green/10 border border-green/20">
                            <span className="text-[11px] font-bold text-green uppercase tracking-wider">All systems operational</span>
                        </div>
                    </div>
                    
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-[13px] font-medium text-text-tertiary hover:text-text-secondary transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="text-[13px] font-medium text-text-tertiary hover:text-text-secondary transition-colors">
                            Terms
                        </a>
                        <a href="#" className="text-[13px] font-medium text-text-tertiary hover:text-text-secondary transition-colors">
                            Cookies
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
