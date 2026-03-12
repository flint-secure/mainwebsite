"use client";

import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Bot, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Clarity from "@microsoft/clarity";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Flint's AI assistant. How can I help you today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setShowBubble(false);
        }
    }, [messages, isOpen]);

    // Show bubble after a delay
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowBubble(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);
        Clarity.setTag("action", "chatbot_message_sent");

        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: "Thanks for your message! Our team typically responds in under an hour. For urgent support, email us at hello.flintsecure@gmail.com",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <>
            {/* Toggle Button & Notification Bubble */}
            <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
                <AnimatePresence>
                    {showBubble && !isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            className="bg-bg-secondary/80 backdrop-blur-md border border-amber-500/20 text-text-primary px-4 py-3 rounded-2xl text-[13px] font-medium shadow-2xl whitespace-nowrap relative mr-2 max-w-[200px]"
                        >
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setShowBubble(false);
                                }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-bg-tertiary border border-border-subtle rounded-full flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
                            >
                                <X size={10} />
                            </button>
                            <p className="leading-tight">Need help with our API? <span className="text-amber-500 font-bold block mt-0.5">Chat with us →</span></p>
                            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-bg-secondary/80 border-r border-b border-amber-500/20 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ 
                        scale: 1,
                        y: [0, -8, 0] 
                    }}
                    transition={{
                        y: {
                            duration: 2,
                            repeat: Infinity,
                            repeatDelay: 3,
                            ease: "easeInOut"
                        },
                        scale: { duration: 0.3 }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        const newOpenState = !isOpen;
                        setIsOpen(newOpenState);
                        if (newOpenState) {
                            Clarity.setTag("action", "chatbot_opened");
                        }
                    }}
                    className="w-14 h-14 bg-amber-500 text-bg-primary rounded-full shadow-[0_8px_30px_rgb(245,158,11,0.3)] flex items-center justify-center cursor-pointer border-2 border-bg-primary relative overflow-hidden group"
                >
                    {/* Animated background pulse */}
                    <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-white"
                    />
                    
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <X size={24} />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                className="relative"
                            >
                                <MessageCircle size={24} />
                                {/* Unread indicator */}
                                {showBubble && (
                                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red border-2 border-amber-500 rounded-full" />
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] max-h-[calc(100vh-8rem)] bg-bg-secondary border border-border-subtle rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border-subtle bg-bg-tertiary flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-text-primary">Flint Support</h3>
                                    <div className="flex items-center gap-1.5">
                                        <span className="text-[11px] font-bold text-green uppercase tracking-tighter">Live</span>
                                        <span className="text-text-tertiary text-[10px]">·</span>
                                        <span className="text-[11px] text-text-tertiary">AI Assistant Online</span>
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={() => setIsOpen(false)}
                                className="text-text-tertiary hover:text-text-primary p-1"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                            {messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div
                                        className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed ${
                                            msg.sender === 'user'
                                                ? 'bg-amber-500 text-bg-primary rounded-tr-none font-medium'
                                                : 'bg-bg-tertiary text-text-secondary border border-border-subtle rounded-tl-none'
                                        }`}
                                    >
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-bg-tertiary border border-border-subtle p-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <span className="w-1 h-1 rounded-full bg-text-tertiary animate-bounce [animation-delay:-0.3s]" />
                                            <span className="w-1 h-1 rounded-full bg-text-tertiary animate-bounce [animation-delay:-0.15s]" />
                                            <span className="w-1 h-1 rounded-full bg-text-tertiary animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Footer / Input */}
                        <div className="p-4 border-t border-border-subtle bg-bg-secondary">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="relative"
                            >
                                <input
                                    type="text"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Ask about API or integration..."
                                    className="w-full bg-bg-tertiary border border-border-subtle rounded-xl py-2.5 pl-4 pr-10 text-[13px] text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-amber-500/50 transition-colors"
                                />
                                <button
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-amber-500 disabled:text-text-tertiary transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </form>
                            <div className="mt-3 flex items-center justify-center gap-4">
                                <a
                                    href="mailto:hello.flintsecure@gmail.com"
                                    className="text-[11px] text-text-tertiary hover:text-text-secondary flex items-center gap-1.5 transition-colors"
                                >
                                    <Mail size={12} />
                                    Email Support
                                </a>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
