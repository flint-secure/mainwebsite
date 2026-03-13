"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Send, Bot, Mail, User, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Clarity from "@microsoft/clarity";
import { db, ai } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, doc, getDoc, setDoc, increment } from "firebase/firestore";
import { getTemplateGenerativeModel } from "firebase/ai";

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const MAX_MESSAGES = 5;

export default function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [showBubble, setShowBubble] = useState(false);
    const [step, setStep] = useState<'info' | 'chat'>('info');
    const [userInfo, setUserInfo] = useState({ name: "", email: "" });
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: "Hi! I'm Flint's AI assistant. To better assist you, could you please provide your name and email?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const [messageCount, setMessageCount] = useState(0);
    const [sessionId, setSessionId] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, []);

    // Initialize Session and Load Count
    useEffect(() => {
        let sid = localStorage.getItem("flint_chat_session");
        if (!sid) {
            sid = Math.random().toString(36).substring(7);
            localStorage.setItem("flint_chat_session", sid);
        }
        setSessionId(sid);

        const loadSession = async () => {
            try {
                const sessionDoc = await getDoc(doc(db, "chat_sessions", sid));
                if (sessionDoc.exists()) {
                    const data = sessionDoc.data();
                    setMessageCount(data.count || 0);
                    
                    if (data.name && data.email) {
                        setUserInfo({ name: data.name, email: data.email });
                        setStep('chat');
                        // Replace initial message with a personalized welcome for restored session
                        setMessages([
                            {
                                id: 'welcome-restored',
                                text: `Welcome back, ${data.name}! How can I help you today?`,
                                sender: 'bot',
                                timestamp: new Date()
                            }
                        ]);
                    }
                }
            } catch (e) {
                console.error("Error loading session:", e);
            }
        };
        loadSession();
    }, []);

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen, scrollToBottom]);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isOpen) setShowBubble(true);
        }, 5000);
        return () => clearTimeout(timer);
    }, [isOpen]);

    const handleInfoSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInfo.name || !userInfo.email) return;

        setStep('chat');
        const welcomeMsg: Message = {
            id: 'welcome',
            text: `Thanks, ${userInfo.name}! How can I help you with Flint today?`,
            sender: 'bot',
            timestamp: new Date()
        };
        setMessages([welcomeMsg]); // Clear the info-request message and show welcome

        try {
            await addDoc(collection(db, "leads"), {
                ...userInfo,
                sessionId,
                timestamp: serverTimestamp(),
                source: 'chatbot_info'
            });
            // Save info to session doc too
            await setDoc(doc(db, "chat_sessions", sessionId), {
                ...userInfo,
                lastActive: serverTimestamp()
            }, { merge: true });
        } catch (e) {
            console.error("Error logging lead:", e);
        }
    };

    const handleSend = async () => {
        if (!inputValue.trim() || messageCount >= MAX_MESSAGES) return;

        const text = inputValue.trim();
        const userMsg: Message = {
            id: Date.now().toString(),
            text: text,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);
        Clarity.setTag("action", "chatbot_message_sent");

        try {
            // Update session count
            const sessionRef = doc(db, "chat_sessions", sessionId);
            await setDoc(sessionRef, { 
                count: increment(1),
                lastActive: serverTimestamp() 
            }, { merge: true });
            
            setMessageCount(prev => prev + 1);

            // Save user message to history
            await addDoc(collection(db, "chats"), {
                sessionId,
                ...userInfo,
                text: text,
                sender: 'user',
                timestamp: serverTimestamp(),
            });

            // AI Logic using the Template
            const model = getTemplateGenerativeModel(ai);
            const result = await model.generateContent("input-system-instructions", {
                userName: userInfo.name,
                userEmail: userInfo.email,
                userMessage: text
            }, {
                // @ts-expect-error - The property exists in newer versions or via the provided reference but might not be in local typings yet
                isAppCheckTokenRequired: true
            });

            const responseText = result.response.text();

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: responseText,
                sender: 'bot',
                timestamp: new Date()
            };

            setMessages(prev => [...prev, botMsg]);

            // Save bot response to history
            await addDoc(collection(db, "chats"), {
                sessionId,
                ...userInfo,
                text: responseText,
                sender: 'bot',
                timestamp: serverTimestamp(),
            });

        } catch (error) {
            console.error("Chat error:", error);
            const errorMsg: Message = {
                id: 'error-' + Date.now(),
                text: "Sorry, I'm having trouble connecting. One of our representatives will get back to you at your email shortly.",
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <>
            {/* Toggle Button */}
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
                                onClick={(e) => { e.stopPropagation(); setShowBubble(false); }}
                                className="absolute -top-2 -right-2 w-5 h-5 bg-bg-tertiary border border-border-subtle rounded-full flex items-center justify-center text-text-tertiary hover:text-text-primary transition-colors"
                            >
                                <X size={10} />
                            </button>
                            <p className="leading-tight">Need help? <span className="text-amber-500 font-bold block mt-0.5">Chat with us →</span></p>
                            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-bg-secondary/80 border-r border-b border-amber-500/20 rotate-45" />
                        </motion.div>
                    )}
                </AnimatePresence>

                <motion.button
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, y: [0, -8, 0] }}
                    transition={{ y: { duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }, scale: { duration: 0.3 } }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                        setIsOpen(!isOpen);
                        if (!isOpen) {
                            Clarity.setTag("action", "chatbot_opened");
                            setShowBubble(false);
                        }
                    }}
                    className="w-14 h-14 bg-amber-500 text-bg-primary rounded-full shadow-2xl flex items-center justify-center cursor-pointer border-2 border-bg-primary relative overflow-hidden"
                >
                    <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0, 0.1] }} transition={{ duration: 2, repeat: Infinity }} className="absolute inset-0 bg-white" />
                    <AnimatePresence mode="wait">
                        {isOpen ? <X key="close" size={24} /> : <MessageCircle key="chat" size={24} />}
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
                        className="fixed bottom-24 right-6 z-50 w-[360px] max-w-[calc(100vw-3rem)] h-[500px] bg-bg-secondary border border-border-subtle rounded-2xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="p-4 border-b border-border-subtle bg-bg-tertiary flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <Bot size={18} />
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-text-primary">Flint AI</h3>
                                    <p className="text-[10px] text-text-tertiary">
                                        {messageCount}/{MAX_MESSAGES} messages used
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-text-tertiary hover:text-text-primary"><X size={18} /></button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
                            {messages.map((msg) => (
                                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-3 rounded-2xl text-[13px] leading-relaxed ${msg.sender === 'user' ? 'bg-amber-500 text-bg-primary rounded-tr-none font-medium' : 'bg-bg-tertiary text-text-secondary border border-border-subtle rounded-tl-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {messageCount >= MAX_MESSAGES && (
                                <div className="flex justify-center py-2">
                                    <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 flex items-start gap-3 max-w-[90%]">
                                        <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                                        <p className="text-[12px] text-text-secondary leading-tight">
                                            You&apos;ve reached the message limit for this session. Our representative will contact you at <strong>{userInfo.email}</strong> to continue.
                                        </p>
                                    </div>
                                </div>
                            )}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-bg-tertiary border border-border-subtle p-3 rounded-2xl rounded-tl-none flex gap-1">
                                        <span className="w-1 h-1 rounded-full bg-text-tertiary animate-bounce" />
                                        <span className="w-1 h-1 rounded-full bg-text-tertiary animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1 h-1 rounded-full bg-text-tertiary animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {step === 'info' ? (
                            <div className="p-4 bg-bg-secondary border-t border-border-subtle space-y-3">
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={14} />
                                    <input 
                                        required 
                                        defaultValue={userInfo.name}
                                        onBlur={e => setUserInfo(prev => ({ ...prev, name: e.target.value }))}
                                        placeholder="Full Name" 
                                        className="w-full bg-bg-tertiary border border-border-subtle rounded-lg py-2.5 pl-9 pr-4 text-[13px] text-text-primary focus:outline-none focus:border-amber-500 transition-colors" 
                                    />
                                </div>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={14} />
                                    <input 
                                        required 
                                        type="email" 
                                        defaultValue={userInfo.email}
                                        onBlur={e => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                                        placeholder="Email Address" 
                                        className="w-full bg-bg-tertiary border border-border-subtle rounded-lg py-2.5 pl-9 pr-4 text-[13px] text-text-primary focus:outline-none focus:border-amber-500 transition-colors" 
                                    />
                                </div>
                                <button 
                                    type="button"
                                    onClick={(e) => {
                                        const form = e.currentTarget.closest('div');
                                        const nameInput = form?.querySelector('input[placeholder="Full Name"]') as HTMLInputElement;
                                        const emailInput = form?.querySelector('input[type="email"]') as HTMLInputElement;
                                        
                                        if (nameInput?.value && emailInput?.checkValidity()) {
                                            setUserInfo({ name: nameInput.value, email: emailInput.value });
                                            // Trigger the submission logic
                                            setTimeout(() => {
                                                const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                                                handleInfoSubmit(fakeEvent);
                                            }, 0);
                                        }
                                    }}
                                    className="w-full bg-amber-500 text-bg-primary font-bold py-2.5 rounded-lg text-[13px] hover:bg-amber-400 transition-colors cursor-pointer"
                                >
                                    Start Chat
                                </button>
                            </div>
                        ) : (
                            <div className="p-4 border-t border-border-subtle bg-bg-secondary">
                                <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative">
                                    <input 
                                        type="text" 
                                        value={inputValue} 
                                        onChange={e => setInputValue(e.target.value)} 
                                        disabled={messageCount >= MAX_MESSAGES}
                                        placeholder={messageCount >= MAX_MESSAGES ? "Limit reached" : "Type your message..."}
                                        className="w-full bg-bg-tertiary border border-border-subtle rounded-xl py-2.5 pl-4 pr-10 text-[13px] text-text-primary focus:outline-none focus:border-amber-500/50 disabled:opacity-50" 
                                    />
                                    <button 
                                        type="submit" 
                                        disabled={!inputValue.trim() || isTyping || messageCount >= MAX_MESSAGES} 
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-amber-500 disabled:text-text-tertiary transition-colors"
                                    >
                                        <Send size={18} />
                                    </button>
                                </form>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
