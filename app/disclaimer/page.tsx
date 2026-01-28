'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle } from 'lucide-react';

export default function DisclaimerPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans selection:bg-secondary selection:text-white">
            {/* Header */}
            <nav className="glass-strong py-6 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center space-x-2 text-primary hover:text-secondary transition-colors group">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-bold uppercase tracking-widest text-xs">Back to Home</span>
                        </Link>
                    </div>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="bg-white p-12 md:p-16 rounded-sm shadow-xl border border-slate-100">
                    <h1 className="text-4xl md:text-5xl font-serif text-primary mb-12 border-b border-slate-100 pb-8">
                        Earnings & Legal Disclaimer
                    </h1>

                    <div className="prose prose-slate lg:prose-lg max-w-none">
                        <div className="flex items-center space-x-4 mb-8 p-6 bg-slate-50 border-l-4 border-secondary rounded-r-sm">
                            <Shield className="w-8 h-8 text-secondary shrink-0" />
                            <p className="m-0 font-medium text-slate-700">
                                Transparency is at the core of our partnerships. Please review this disclaimer carefully.
                            </p>
                        </div>

                        <section className="mb-12">
                            <h2 className="text-2xl font-serif text-primary mb-6 flex items-center gap-3">
                                <AlertTriangle className="w-6 h-6 text-secondary" />
                                Hyper-Growth & Results Policy
                            </h2>
                            <p className="text-slate-600 leading-relaxed font-medium mb-6">
                                All claims, projections, and case studies presented on this website (and in any associated marketing materials) are provided for illustrative and educational purposes only. They are intended to demonstrate what is possible within the Client Solver framework.
                            </p>
                            <p className="text-slate-900 font-bold bg-yellow-50 p-4 border border-yellow-100 italic leading-relaxed">
                                In essence: While we strive for excellence, we strictly disclaim any guarantee of specific financial outcomes. Individual results will vary significantly based on market conditions, professional competence, and external factors beyond our control.
                            </p>
                        </section>

                        <hr className="my-12 border-slate-100" />

                        <section className="mb-12">
                            <h2 className="text-xl font-serif text-primary mb-6">No Professional Advice</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                The information provided by Client Solver is for informational purposes only. It is not intended to be, and does not constitute, legal, financial, or tax advice. You should consult with professional advisors before making significant business decisions.
                            </p>
                        </section>

                        <section className="mb-12">
                            <h2 className="text-xl font-serif text-primary mb-6">Third-Party Interactions</h2>
                            <p className="text-slate-600 leading-relaxed mb-6">
                                We provide a platform for outreach and scheduling. Client Solver is not responsible for the ultimate actions, communications, or transactions that occur between our partners and third-party leads.
                            </p>
                        </section>

                        <div className="mt-16 pt-8 border-t border-slate-100 text-sm text-slate-400">
                            <p>Last Updated: January 2026<br />&copy; 2026 Client Solver Inc. All Rights Reserved.</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
