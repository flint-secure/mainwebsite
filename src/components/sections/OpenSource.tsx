"use client";

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

const repos = [
    {
        name: "fingerprint-js",
        description:
            "Browser device fingerprinting. 50+ signals. Canvas, audio, WebGL, fonts. Pure JavaScript, zero dependencies. Under 20KB gzipped.",
        lang: "JavaScript",
        langColor: "#F7DF1E",
    },
    {
        name: "fingerprint-android",
        description:
            "Android device fingerprinting. Hardware signals, root detection, emulator detection. Kotlin, minSdk 21.",
        lang: "Kotlin",
        langColor: "#A97BFF",
    },
    {
        name: "fingerprint-ios",
        description:
            "iOS device fingerprinting. Metal GPU signals, font enumeration, jailbreak detection. Swift 5.0+, iOS 14+.",
        lang: "Swift",
        langColor: "#F05138",
    },
];

import { fadeUp } from "@/lib/animations";

export default function OpenSource() {
    return (
        <section id="open-source" className="py-24 md:py-40 bg-bg-tertiary">
            <div className="max-w-[1000px] mx-auto px-6 md:px-12 lg:px-16">
                <motion.span {...fadeUp} className="block text-[13px] font-semibold uppercase tracking-[0.08em] text-amber-500 mb-6 text-center">
                    OPEN SOURCE
                </motion.span>
                <motion.h2 {...fadeUp} className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    The SDK is open source. Read every line.
                </motion.h2>
                <motion.p {...fadeUp} className="mt-6 text-[17px] text-text-secondary text-center max-w-[640px] mx-auto leading-[1.6]">
                    Payment companies need to trust what runs on their systems. Our device
                    fingerprinting SDKs are open source under the MIT license. Inspect the
                    code, audit the signals, contribute improvements.
                </motion.p>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {repos.map((repo, i) => (
                        <motion.a
                            key={i}
                            href="#"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="block bg-bg-secondary border border-border-subtle rounded-xl p-7 hover:border-border-hover transition-all duration-200 group"
                        >
                            <div className="flex items-start justify-between">
                                <p className="font-mono text-[16px] font-semibold">
                                    <span className="text-text-tertiary">flintsecure/</span>
                                    <span className="text-text-primary">{repo.name}</span>
                                </p>
                                <ExternalLink className="w-4 h-4 text-text-tertiary group-hover:text-text-secondary transition-colors shrink-0 mt-1" />
                            </div>
                            <p className="mt-3 text-[14px] text-text-secondary leading-[1.6]">
                                {repo.description}
                            </p>
                            <div className="mt-5 flex items-center gap-4 text-[13px] text-text-tertiary">
                                <span className="flex items-center gap-1.5">
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{ backgroundColor: repo.langColor }}
                                    />
                                    {repo.lang}
                                </span>
                                <span className="bg-bg-tertiary px-2 py-0.5 rounded text-[11px]">
                                    MIT
                                </span>
                            </div>
                        </motion.a>
                    ))}
                </div>

                <motion.p {...fadeUp} className="mt-12 text-[14px] text-text-tertiary text-center max-w-[600px] mx-auto leading-[1.6]">
                    The scoring engine, network intelligence, and behavioral analysis are
                    proprietary. Open source brings developers in. The platform is the
                    business.
                </motion.p>
            </div>
        </section>
    );
}
