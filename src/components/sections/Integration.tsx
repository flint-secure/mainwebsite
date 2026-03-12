"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Shield, Server } from "lucide-react";

const tabs = ["JavaScript", "Python", "Go", "Java", "PHP", "cURL"];



// Full code strings for clean rendering
const fullCode: Record<string, string> = {
    JavaScript: `// 1. Add SDK to your app (one time)
// <script src="https://cdn.flintsecure.app/v1/fp.js"></script>

// 2. Get device fingerprint
const fp = await FlintFP.load({ apiKey: 'YOUR_KEY' })
const { fingerprint } = await fp.get()

// 3. Score transaction before processing
const response = await fetch('https://api.flintsecure.app/v1/score', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    sender_id: user.id,
    amount: 5000,
    device_fingerprint: fingerprint,
    receiver_id: recipient.id
  })
})

const { decision } = await response.json()

// 4. Act on the decision
if (decision === 'ALLOW') processPayment()
if (decision === 'FLAG')  requestOTP()
if (decision === 'BLOCK') rejectTransaction()`,

    Python: `import requests

response = requests.post(
    "https://api.flintsecure.app/v1/score",
    headers={"Authorization": "Bearer YOUR_API_KEY"},
    json={
        "sender_id": user_id,
        "amount": 5000,
        "device_fingerprint": fingerprint,
        "receiver_id": recipient_id,
    },
    timeout=0.15  # 150ms timeout, fail-open
)

decision = response.json()["decision"]

if decision == "ALLOW":
    process_payment()
elif decision == "FLAG":
    request_otp()
elif decision == "BLOCK":
    reject_transaction()`,

    Go: `ctx, cancel := context.WithTimeout(ctx, 150*time.Millisecond)
defer cancel()

score, err := flint.Score(ctx, &flint.Transaction{
    SenderID:          userID,
    Amount:            5000,
    DeviceFingerprint: fingerprint,
    ReceiverID:        recipientID,
})

if err != nil {
    processPayment() // fail-open
    return
}

switch score.Decision {
case "ALLOW": processPayment()
case "FLAG":  requestOTP()
case "BLOCK": rejectTransaction()
}`,

    Java: `FlintClient flint = new FlintClient("YOUR_API_KEY");

ScoreRequest request = ScoreRequest.builder()
    .senderId(userId)
    .amount(5000)
    .deviceFingerprint(fingerprint)
    .receiverId(recipientId)
    .build();

try {
    ScoreResponse response = flint.score(request)
        .timeout(Duration.ofMillis(150));
    
    switch (response.getDecision()) {
        case ALLOW -> processPayment();
        case FLAG  -> requestOTP();
        case BLOCK -> rejectTransaction();
    }
} catch (TimeoutException e) {
    processPayment(); // fail-open
}`,

    PHP: `$flint = new FlintClient('YOUR_API_KEY');

$response = $flint->score([
    'sender_id' => $userId,
    'amount' => 5000,
    'device_fingerprint' => $fingerprint,
    'receiver_id' => $recipientId,
], timeout: 0.15);

match ($response->decision) {
    'ALLOW' => processPayment(),
    'FLAG'  => requestOTP(),
    'BLOCK' => rejectTransaction(),
};`,

    cURL: `curl -X POST https://api.flintsecure.app/v1/score \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "sender_id": "user_2847",
    "amount": 5000,
    "device_fingerprint": "fp_3f8a...c91d",
    "receiver_id": "acc_0192"
  }'

# Response:
# {
#   "decision": "ALLOW",
#   "risk_score": 12,
#   "processing_time_ms": 8
# }`,
};



export default function Integration() {
    const [activeTab, setActiveTab] = useState("JavaScript");

    return (
        <section id="integration" className="py-24 md:py-40 bg-bg-tertiary">
            <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">
                <h2 className="text-[32px] md:text-[48px] font-bold leading-[1.15] tracking-[-0.025em] text-text-primary text-center">
                    Drop it into your stack
                </h2>
                <p className="mt-6 text-[17px] text-text-secondary text-center max-w-[640px] mx-auto leading-[1.6]">
                    Add our SDK to your app, add one API call to your backend. If Flint
                    disappears tomorrow, your system works exactly as before. Device
                    fingerprinting SDKs are open source under the MIT license — <a href="https://github.com/flintsecure" className="text-text-primary underline underline-offset-2 hover:text-amber-500 transition-colors">read every line on GitHub</a>.
                </p>

                {/* Tabbed code block */}
                <div className="mt-12 max-w-[800px] mx-auto">
                    {/* Tabs */}
                    <div className="flex gap-1 overflow-x-auto border-b border-border-subtle">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-4 py-3 text-[14px] font-medium whitespace-nowrap transition-colors cursor-pointer relative ${activeTab === tab
                                        ? "text-text-primary"
                                        : "text-text-tertiary hover:text-text-secondary"
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <motion.span
                                        layoutId="integration-tab"
                                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-amber-500"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Code */}
                    <div className="bg-bg-code border border-border-subtle border-t-0 rounded-b-lg overflow-x-auto">
                        <div className="flex">
                            {/* Line numbers */}
                            <div className="py-6 pl-4 pr-3 border-r border-border-subtle select-none shrink-0">
                                {fullCode[activeTab].split("\n").map((_, i) => (
                                    <div key={i} className="text-[13px] font-mono text-text-tertiary leading-[1.6] text-right">
                                        {i + 1}
                                    </div>
                                ))}
                            </div>
                            {/* Code content */}
                            <div className="py-6 px-6 overflow-x-auto">
                                <pre className="font-mono text-[13px] leading-[1.6]">
                                    {fullCode[activeTab]}
                                </pre>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Two cards */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[800px] mx-auto">
                    <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 hover:border-border-hover transition-colors duration-200">
                        <Shield className="w-8 h-8 text-green mb-4" />
                        <h3 className="text-[18px] font-bold text-text-primary">
                            Fail-Open by Design
                        </h3>
                        <p className="mt-3 text-[14px] text-text-secondary leading-[1.7]">
                            If Flint is slow or down, your transactions proceed normally. We
                            set a 150ms timeout. If we don&apos;t respond, your system continues
                            as if Flint doesn&apos;t exist. Flint can never cause a payment to
                            fail.
                        </p>
                    </div>

                    <div className="bg-bg-secondary border border-border-subtle rounded-xl p-8 hover:border-border-hover transition-colors duration-200">
                        <Server className="w-8 h-8 text-text-secondary mb-4" />
                        <h3 className="text-[18px] font-bold text-text-primary">
                            Zero Infrastructure Change
                        </h3>
                        <p className="mt-3 text-[14px] text-text-secondary leading-[1.7]">
                            No database changes. No code rewrites. No infrastructure to
                            manage. Add a few lines of code to your app and backend.
                            Everything runs on Flint&apos;s infrastructure. Remove it anytime.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
