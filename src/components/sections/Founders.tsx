import Image from "next/image";
import { ExternalLink } from "lucide-react";

const founders = [
    {
        name: "Apil Khadka",
        role: "Founding Engineer",
        focus: "Backend systems, infrastructure, and security architecture. Previously built systems with Kotlin, Spring Boot, and PostgreSQL.",
        avatar: "https://avatars.githubusercontent.com/u/87198819?v=4",
        github: "https://github.com/apil-khadka",
        linkedin: "https://linkedin.com/in/apil-khadka",
    },
    {
        name: "Aaditya Binodya Yadav",
        role: "Founding Engineer",
        focus: "Full-stack and distributed systems. Builds the real-time scoring engine, ML pipelines, and fraud detection infrastructure.",
        avatar: "https://avatars.githubusercontent.com/u/150529501?v=4",
        github: "https://github.com/aadityabinodyadav",
        linkedin: null,
    },
];

export default function Founders() {
    return (
        <section id="team" className="py-24 md:py-40 bg-bg-tertiary">
            <div className="max-w-[800px] mx-auto px-6 md:px-12">
                <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    Who&apos;s building this
                </h2>
                <p className="mt-6 text-[17px] text-text-secondary text-center max-w-[560px] mx-auto leading-[1.6]">
                    Flint is built by engineers who believe fraud detection should be
                    fast, transparent, and accessible to every payment company — not
                    just the ones that can afford enterprise contracts.
                </p>

                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {founders.map((founder) => (
                        <div
                            key={founder.name}
                            className="flex flex-col items-center text-center p-8 rounded-xl border border-border-subtle bg-bg-secondary hover:border-border-hover transition-colors duration-200"
                        >
                            <Image
                                src={founder.avatar}
                                alt={founder.name}
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                            <h3 className="mt-4 text-[18px] font-bold text-text-primary">
                                {founder.name}
                            </h3>
                            <p className="text-[14px] text-text-tertiary font-medium">
                                {founder.role}
                            </p>
                            <p className="mt-3 text-[14px] text-text-secondary leading-[1.6]">
                                {founder.focus}
                            </p>
                            <div className="mt-4 flex items-center gap-4">
                                <a
                                    href={founder.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 text-[13px] text-text-tertiary hover:text-text-primary transition-colors"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" />
                                    GitHub
                                </a>
                                {founder.linkedin && (
                                    <a
                                        href={founder.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-[13px] text-text-tertiary hover:text-text-primary transition-colors"
                                    >
                                        <ExternalLink className="w-3.5 h-3.5" />
                                        LinkedIn
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
