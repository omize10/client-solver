'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronRight, CheckCircle, Loader2, Calendar, Shield } from 'lucide-react';

interface ApplicationModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function ApplicationModal({ isOpen, onClose }: ApplicationModalProps) {
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        phone: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const nextStep = () => setStep(step + 1);

    const submitLead = async () => {
        setLoading(true);
        try {
            await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            setStep(3);
        } catch (e) {
            console.error('Lead capture failed', e);
            setStep(3); // Still proceed so they can book
        }
        setLoading(false);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto md:overflow-hidden">
                {/* Backdrop - Reduced blur for clarity */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/60 backdrop-blur-md"
                />

                {/* Modal Content - Optimized for mobile */}
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="relative w-full max-w-lg bg-slate-900/80 border border-slate-700 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col my-auto mx-auto max-h-[90vh] md:max-h-none"
                >
                    {/* Header */}
                    <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-900/60 flex-shrink-0">
                        <div>
                            <h2 className="text-xl font-serif text-white font-bold">Discovery Application</h2>
                            <p className="text-[10px] text-slate-400 mt-1 font-bold uppercase tracking-widest opacity-80">Step {step} of 3</p>
                        </div>
                        <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 sm:p-10 overflow-y-auto flex-1">
                        {step === 1 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                <h3 className="text-2xl text-white font-serif font-bold">What is your work email?</h3>
                                <p className="text-slate-400 text-sm font-medium">We'll use this to send you a follow-up summary of our call.</p>
                                <div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        autoFocus
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-white text-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-500"
                                        placeholder="email@company.com"
                                    />
                                </div>
                                <button
                                    onClick={nextStep}
                                    disabled={!formData.email.includes('@')}
                                    className="w-full bg-secondary text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all shadow-lg"
                                >
                                    <span>Continue</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </motion.div>
                        )}

                        {step === 2 && (
                            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
                                <h3 className="text-2xl text-white font-serif font-bold">What's your phone number?</h3>
                                <p className="text-slate-400 text-sm font-medium">To confirm your appointment and provide market exclusivity updates.</p>
                                <div>
                                    <input
                                        name="phone"
                                        type="tel"
                                        required
                                        autoFocus
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-white text-lg focus:border-secondary focus:ring-1 focus:ring-secondary outline-none transition-all placeholder:text-slate-500"
                                        placeholder="(555) 000-0000"
                                    />
                                </div>
                                <button
                                    onClick={submitLead}
                                    disabled={loading || formData.phone.length < 10}
                                    className="w-full bg-secondary text-white py-5 rounded-xl font-bold uppercase tracking-widest hover:bg-opacity-90 flex items-center justify-center space-x-2 disabled:opacity-50 transition-all shadow-lg"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <><span>Continue to Booking</span><ChevronRight className="w-4 h-4" /></>}
                                </button>
                                <button onClick={() => setStep(1)} className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors">
                                    Go Back
                                </button>
                            </motion.div>
                        )}

                        {step === 3 && (
                            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
                                <div className="inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-900/30 mb-8 border border-green-700/50">
                                    <CheckCircle className="h-10 w-10 text-green-400" />
                                </div>
                                <h3 className="text-3xl text-white font-serif font-bold mb-4">You're Approved</h3>
                                <p className="text-slate-400 font-medium mb-10 max-w-sm mx-auto leading-relaxed">Click below to select a time for your discovery call on our Calendly.</p>

                                <a
                                    href="https://calendly.com/partnerships-clientsolver"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-secondary text-white py-6 rounded-xl font-black uppercase tracking-[0.15em] hover:bg-opacity-90 flex items-center justify-center space-x-3 shadow-2xl transition-all hover:scale-[1.02] text-sm"
                                >
                                    <Calendar className="w-5 h-5" />
                                    <span>Schedule with Calendly</span>
                                </a>

                                <p className="mt-8 text-[10px] text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
                                    <Shield className="w-3 h-3" />
                                    <span>Encrypted & Restricted Access</span>
                                </p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
