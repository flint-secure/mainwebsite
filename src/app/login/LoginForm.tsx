"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Lock, Mail, Github, Chrome } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import MouseEffect from "@/components/MouseEffect";

export default function LoginForm() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Mock login
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div 
            className="min-h-screen bg-bg-primary flex flex-col justify-center items-center px-6 py-12 relative"
            style={{
                background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 158, 11, 0.04), transparent 40%)`,
            }}
        >
            <MouseEffect />
            {/* Back to Home */}
            <Link 
                href="/" 
                className="absolute top-8 left-8 flex items-center gap-2 text-text-secondary hover:text-text-primary transition-colors group"
            >
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                <span className="text-sm font-medium">Back to Home</span>
            </Link>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                {/* Logo & Header */}
                <div className="text-center mb-10 flex flex-col items-center">
                    <Link href="/" className="group flex flex-col items-center gap-3">
                        <Image
                            src="/logo.png"
                            alt="Flint Logo"
                            width={48}
                            height={48}
                            className="rounded-xl shadow-xl group-hover:rotate-12 transition-transform duration-300"
                        />
                        <span className="text-text-primary font-bold text-3xl tracking-[0.05em]">
                            flint
                        </span>
                    </Link>
                    <h1 className="text-2xl font-bold text-text-primary mt-6 mb-2">Welcome Back</h1>
                    <p className="text-text-secondary">Enter your credentials to access your dashboard</p>
                </div>

                {/* Login Card */}
                <div className="bg-bg-secondary border border-border-subtle p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-primary mb-2">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                <input
                                    type="email"
                                    required
                                    className="w-full bg-bg-tertiary border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-amber-500/50 transition-colors"
                                    placeholder="name@company.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-sm font-medium text-text-primary">Password</label>
                                <a href="#" className="text-xs text-amber-500 hover:text-amber-400 transition-colors font-medium">Forgot Password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary" size={18} />
                                <input
                                    type="password"
                                    required
                                    className="w-full bg-bg-tertiary border border-border-subtle rounded-lg py-3 pl-10 pr-4 text-text-primary placeholder:text-text-tertiary focus:outline-none focus:border-amber-500/50 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-amber-500 hover:bg-amber-400 text-bg-primary font-bold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing in..." : "Sign In"}
                        </button>
                    </form>

                    <div className="relative my-8 text-center">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-border-subtle"></div>
                        </div>
                        <span className="relative px-4 bg-bg-secondary text-xs text-text-tertiary font-medium uppercase tracking-wider">Or continue with</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 bg-bg-tertiary border border-border-subtle hover:border-border-hover rounded-lg py-2.5 transition-all text-text-primary font-medium text-sm group">
                            <Github size={18} className="text-text-secondary group-hover:text-text-primary" />
                            GitHub
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-bg-tertiary border border-border-subtle hover:border-border-hover rounded-lg py-2.5 transition-all text-text-primary font-medium text-sm group">
                            <Chrome size={18} className="text-text-secondary group-hover:text-text-primary" />
                            Google
                        </button>
                    </div>
                </div>

                <p className="mt-8 text-center text-sm text-text-secondary">
                    Don&apos;t have an account?{" "}
                    <a 
                        href="mailto:hello.flintsecure@gmail.com?subject=Join%20Waitlist%20-%20Flint&body=Hi%20Flint%20Team%2C%0A%0AI%20would%20like%20to%20join%20the%20waitlist%20for%20Flint%20fraud%20detection.%20My%20company%20details%20are%20as%20follows%3A%0A%0ACompany%20Name%3A%20%0AWebsite%3A%20%0AApproximate%20Monthly%20Transactions%3A%20%0A%0ALooking%20forward%20to%20hearing%20from%20you!" 
                        className="text-amber-500 hover:text-amber-400 font-bold transition-colors"
                    >
                        Join Waitlist
                    </a>
                </p>
            </motion.div>
        </div>
    );
}
