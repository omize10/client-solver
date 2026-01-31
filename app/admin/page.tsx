'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, LogOut, Mail, CheckCircle2, Info } from 'lucide-react';

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');

    // Email addresses from environment variables (shown as placeholders on client)
    const emailAddresses = [
        'altufebrahim@gmail.com',
        'omarkebrahim@gmail.com'
    ];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '123') {
            setIsAuthenticated(true);
        } else {
            alert('Invalid Password');
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#051423] font-sans">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-slate-900/60 backdrop-blur-xl p-10 rounded-2xl w-full max-w-md border border-slate-700 shadow-2xl text-center glass"
                >
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-secondary w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-serif text-white font-bold mb-2">Admin Access</h2>
                    <p className="text-slate-400 mb-8 font-medium">Please enter your credentials</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            autoFocus
                            placeholder="Enter Password"
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-4 text-center text-xl tracking-widest outline-none focus:border-secondary transition-all text-white placeholder-slate-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="w-full bg-secondary text-white py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 transition-all shadow-lg text-sm">
                            Login
                        </button>
                    </form>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#051423] font-sans text-white">
            {/* Nav */}
            <nav className="border-b border-slate-700 bg-slate-900/60 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-white font-bold">CS</div>
                        <span className="font-serif text-xl font-bold tracking-tight text-white">Admin Intelligence</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-red-500 p-2 hover:bg-red-500/10 rounded-lg transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-6 py-12">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-6"
                >
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className="text-4xl font-serif font-bold text-white mb-3">Lead Management System</h1>
                        <p className="text-slate-400 font-medium">Email-based lead capture system</p>
                    </div>

                    {/* Info Card */}
                    <div className="bg-blue-900/30 border border-blue-700/50 rounded-2xl p-8 mb-8 backdrop-blur-sm">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <Info className="w-8 h-8 text-blue-400" />
                            </div>
                            <div className="flex-1">
                                <h2 className="text-2xl font-serif font-bold text-blue-200 mb-3">
                                    Email-Only Lead Capture
                                </h2>
                                <p className="text-blue-300 mb-4 leading-relaxed">
                                    All lead submissions are automatically sent to your email inbox in real-time.
                                    No database storage is required - your email serves as the source of truth for all captured leads.
                                </p>
                                <p className="text-blue-400/80 text-sm">
                                    This architecture is optimized for Vercel's serverless environment and requires zero maintenance.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* How it Works */}
                    <div className="bg-slate-900/40 border border-slate-700 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                        <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            How Lead Capture Works
                        </h3>
                        <div className="space-y-4 text-slate-300">
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">1</div>
                                <p><strong className="text-white">User submits form</strong> - Prospect enters email and phone number on your landing page</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">2</div>
                                <p><strong className="text-white">Confirmation email sent</strong> - Prospect receives email with Calendly booking link</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">3</div>
                                <p><strong className="text-white">Team notification sent</strong> - Your team receives internal notification with lead details</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs font-bold">4</div>
                                <p><strong className="text-white">Prospect redirects to Calendly</strong> - User sees success screen with booking button</p>
                            </div>
                        </div>
                    </div>

                    {/* Email Recipients */}
                    <div className="bg-slate-900/40 border border-slate-700 rounded-2xl p-8 shadow-lg backdrop-blur-sm">
                        <h3 className="text-xl font-serif font-bold text-white mb-6 flex items-center gap-2">
                            <Mail className="w-6 h-6 text-secondary" />
                            Lead Notification Recipients
                        </h3>
                        <p className="text-slate-300 mb-4">
                            All new leads are automatically emailed to:
                        </p>
                        <div className="space-y-2">
                            {emailAddresses.map((email, idx) => (
                                <div key={idx} className="flex items-center space-x-3 bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3">
                                    <Mail className="w-4 h-4 text-secondary" />
                                    <span className="font-mono text-sm text-white font-medium">{email}</span>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-slate-500 mt-4">
                            These email addresses are configured via environment variables in Vercel.
                        </p>
                    </div>

                    {/* Benefits */}
                    <div className="bg-green-900/20 border border-green-700/50 rounded-2xl p-8 backdrop-blur-sm">
                        <h3 className="text-xl font-serif font-bold text-green-200 mb-4">
                            System Benefits
                        </h3>
                        <ul className="space-y-2 text-green-300">
                            <li className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>No database costs or maintenance required</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>Perfect for Vercel serverless deployment</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>All lead data searchable in your email inbox</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>Instant notifications - no polling or syncing needed</span>
                            </li>
                            <li className="flex items-start space-x-2">
                                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" />
                                <span>Simple, stateless architecture</span>
                            </li>
                        </ul>
                    </div>
                </motion.div>
            </main>
        </div>
    );
}
