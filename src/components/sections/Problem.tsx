const stats = [
    { metric: "Rs 50L+", label: "Lost to fraud annually by a single mid-size PSP" },
    { metric: "73%", label: "of fraud bypasses OTP-only protection" },
    { metric: "5-10x", label: "higher false positive rates with rule-based systems" },
];

export default function Problem() {
    return (
        <section id="problem" className="py-24 md:py-40 bg-bg-primary">
            <div className="max-w-[800px] mx-auto px-6 md:px-12">
                <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    OTP is not fraud detection.
                </h2>

                <div className="mt-12 space-y-8">
                    <p className="text-[17px] text-text-secondary leading-[1.7]">
                        Digital payments in South Asia are growing 40-50% year over year.
                        Fraud is growing faster. SIM swaps, social engineering, money mule
                        networks, authorized push payment fraud — attacks that OTP was never
                        designed to stop.
                    </p>

                    <p className="text-[17px] text-text-secondary leading-[1.7]">
                        OTP answers one question: <em>do you have this phone number?</em> It says
                        nothing about the device, the behavior, the timing, the recipient,
                        or the pattern. When an attacker swaps your SIM, OTP helps them.
                        When a victim is socially engineered into reading their OTP aloud,
                        OTP is irrelevant.
                    </p>

                    <p className="text-[17px] text-text-secondary leading-[1.7]">
                        Most payment companies rely on blanket rules — block everything
                        above a threshold, require OTP for every transaction, freeze
                        accounts after failed logins. These rules block legitimate users
                        as often as they block fraudsters.
                    </p>
                </div>

                {/* Stat Cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
                    {stats.map((stat, i) => (
                        <div
                            key={i}
                            className="bg-bg-secondary border border-border-subtle rounded-xl p-8 text-center hover:border-border-hover transition-all duration-200"
                        >
                            <p className="font-mono text-[36px] md:text-[48px] font-bold text-text-primary tracking-[-0.04em]">
                                {stat.metric}
                            </p>
                            <p className="text-[15px] text-text-secondary mt-3 max-w-[200px] mx-auto">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>

                <p className="mt-16 text-[18px] md:text-[20px] font-medium text-text-primary text-center max-w-[700px] mx-auto leading-[1.6]">
                    Flint replaces blanket rules with intelligent, per-transaction
                    decisions. 90% of users experience zero friction. Fraudsters get
                    blocked before money moves.
                </p>
            </div>
        </section>
    );
}
