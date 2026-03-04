"use client";

const productLinks = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Capabilities", href: "#capabilities" },
    { label: "Pricing", href: "#pricing" },
    { label: "Documentation", href: "#" },
    { label: "API Reference", href: "#" },
    { label: "Status Page", href: "#" },
];

const developerLinks = [
    { label: "GitHub", href: "#" },
    { label: "fingerprint-js", href: "#" },
    { label: "fingerprint-android", href: "#" },
    { label: "fingerprint-ios", href: "#" },
    { label: "Examples", href: "#" },
    { label: "Integration Guide", href: "#integration" },
];

const companyLinks = [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "LinkedIn", href: "#" },
    { label: "Twitter", href: "#" },
    { label: "Contact", href: "mailto:hello.flintsecure@gmail.com" },
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
            <p className="text-[13px] font-semibold uppercase tracking-[0.08em] text-text-tertiary mb-4">
                {title}
            </p>
            <ul className="space-y-3">
                {links.map((link, i) => (
                    <li key={i}>
                        <a
                            href={link.href}
                            className="text-[14px] text-text-secondary hover:text-text-primary transition-colors duration-200"
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
        <footer className="bg-bg-primary border-t border-border-subtle">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 py-16">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-2 md:col-span-1">
                        <p className="text-text-primary font-bold text-[18px] tracking-[0.05em]">
                            FLINT
                        </p>
                        <p className="mt-3 text-[14px] text-text-tertiary max-w-[240px] leading-[1.6]">
                            Real-time fraud intelligence for digital payments.
                        </p>
                        <a
                            href="mailto:hello@flintsecure.com"
                            className="inline-block mt-4 text-[14px] text-amber-500 hover:text-amber-400 transition-colors"
                        >
                            hello@flintsecure.com
                        </a>
                    </div>

                    <FooterColumn title="Product" links={productLinks} />
                    <FooterColumn title="Developers" links={developerLinks} />
                    <FooterColumn title="Company" links={companyLinks} />
                </div>

                {/* Bottom bar */}
                <div className="mt-12 pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-[13px] text-text-tertiary">
                        © 2025 Flint Secure
                    </p>
                    <div className="text-[13px] text-text-tertiary flex gap-4">
                        <a href="#" className="hover:text-text-secondary transition-colors">
                            Privacy Policy
                        </a>
                        <span>·</span>
                        <a href="#" className="hover:text-text-secondary transition-colors">
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
