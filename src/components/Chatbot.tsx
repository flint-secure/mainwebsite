"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, Mail } from "lucide-react";

interface Message {
    id: number;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            text: "Hi there! 👋 How can we help you today?",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        if (!message.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            text: message,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setMessage("");

        // Mock bot response
        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now() + 1,
                text: "Thanks for reaching out! One of our team members will get back to you shortly. In the meantime, feel free to check our documentation.",
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
        }, 1000);
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-50 bg-amber-500 text-bg-primary p-4 rounded-full shadow-2xl cursor-pointer group flex items-center gap-3"
            >
                <div className="hidden group-hover:block pl-2 font-bold text-sm whitespace-nowrap overflow-hidden max-w-0 group-hover:max-w-[200px] transition-all duration-300">
                    Get in contact with us
                </div>
                <MessageCircle size={24} />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-bg-primary rounded-full animate-pulse"></span>
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[380px] h-[520px] bg-bg-secondary border border-border-subtle rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 bg-bg-tertiary border-b border-border-subtle flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-500/10 rounded-full flex items-center justify-center text-amber-500">
                                    <Bot size={22} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-text-primary">Flint Support</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                                        <span className="text-[10px] text-text-tertiary uppercase font-bold tracking-wider">Online</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-text-tertiary hover:text-text-primary transition-colors p-1"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Contact Quick Info */}
                        <div className="px-4 py-2 bg-amber-500/5 flex justify-center text-[11px] font-medium text-text-secondary border-b border-border-subtle">
                             <div className="flex items-center gap-1.5">
                                <Mail size={12} className="text-amber-500" />
                                <span>hello.flintsecure@gmail.com</span>
                             </div>
                        </div>

                        {/* Messages Area */}
                        <div
                            ref={scrollRef}
                            className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth"
                        >
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                                            msg.sender === "user"
                                                ? "bg-amber-500 text-bg-primary rounded-tr-none"
                                                : "bg-bg-tertiary text-text-primary border border-border-subtle rounded-tl-none"
                                        }`}
                                    >
                                        {msg.text}
                                        <div className={`text-[10px] mt-1 opacity-60 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <form
                            onSubmit={handleSend}
                            className="p-4 bg-bg-tertiary border-t border-border-subtle flex items-center gap-2"
                        >
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="flex-1 bg-bg-primary border border-border-subtle rounded-lg py-2 px-3 text-sm text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-amber-500/50 transition-colors"
                            />
                            <button
                                type="submit"
                                className="bg-amber-500 text-bg-primary p-2 rounded-lg hover:bg-amber-400 transition-colors cursor-pointer"
                            >
                                <Send size={18} />
                            </button>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
