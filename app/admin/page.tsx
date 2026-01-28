'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Shield, LogOut, Download, Mail, Phone, Calendar as CalendarIcon, RefreshCcw } from 'lucide-react';

interface Lead {
    id: string;
    email: string;
    phone: string;
    date: string;
    status: string;
}

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [leads, setLeads] = useState<Lead[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLeads = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/leads');
            const data = await res.json();
            if (data.success) {
                setLeads(data.leads);
            }
        } catch (e) {
            console.error('Failed to fetch leads', e);
        }
        setLoading(false);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === '123') {
            setIsAuthenticated(true);
            fetchLeads();
        } else {
            alert('Invalid Password');
        }
    };

    const exportToCSV = () => {
        if (leads.length === 0) return;
        const headers = ['ID', 'Email', 'Phone', 'Date', 'Status'];
        const csvContent = [
            headers.join(','),
            ...leads.map(lead => [
                lead.id,
                lead.email,
                lead.phone,
                new Date(lead.date).toLocaleString(),
                lead.status
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `client_solver_leads_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 font-sans">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white p-10 rounded-2xl w-full max-w-md border border-slate-200 shadow-xl text-center"
                >
                    <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Shield className="text-secondary w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-serif text-primary font-bold mb-2">Admin Access</h2>
                    <p className="text-accent mb-8 font-medium">Please enter your credentials</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            autoFocus
                            placeholder="Enter Password"
                            className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-center text-xl tracking-widest outline-none focus:border-secondary transition-all"
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
        <div className="min-h-screen bg-white font-sans text-primary">
            {/* Nav */}
            <nav className="border-b border-slate-100 bg-white sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-secondary rounded-lg flex items-center justify-center text-white font-bold">CS</div>
                        <span className="font-serif text-xl font-bold tracking-tight">Admin Intelligence</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={fetchLeads}
                            disabled={loading}
                            className="p-2 text-accent hover:text-secondary hover:bg-secondary/5 rounded-lg transition-all"
                        >
                            <RefreshCcw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                        </button>
                        <button
                            onClick={exportToCSV}
                            className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-200 transition-all"
                        >
                            <Download className="w-4 h-4" />
                            <span>Export CSV</span>
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="text-red-500 p-2 hover:bg-red-50 rounded-lg transition-all"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-10 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">Inbound Prospects</h1>
                        <p className="text-accent mt-2 font-medium">Showing {leads.length} live lead records</p>
                    </div>
                </div>

                {/* Sheets-style Table */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-200 text-[10px] uppercase font-bold tracking-widest text-accent">
                                    <th className="px-6 py-4 border-r border-slate-200">Date Received</th>
                                    <th className="px-6 py-4 border-r border-slate-200 text-primary flex items-center gap-2">
                                        <Mail className="w-3 h-3 text-secondary" /> Email Address
                                    </th>
                                    <th className="px-6 py-4 border-r border-slate-200 text-primary flex items-center gap-2">
                                        <Phone className="w-3 h-3 text-secondary" /> Phone
                                    </th>
                                    <th className="px-6 py-4">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {leads.length > 0 ? (
                                    leads.map((lead) => (
                                        <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                            <td className="px-6 py-4 border-r border-slate-100 whitespace-nowrap text-sm text-slate-500 font-medium">
                                                {new Date(lead.date).toLocaleString('en-US', {
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-100 font-bold text-primary">
                                                {lead.email}
                                            </td>
                                            <td className="px-6 py-4 border-r border-slate-100 font-medium text-slate-700">
                                                {lead.phone}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-[10px] font-bold uppercase tracking-wider border border-green-100">
                                                    {lead.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={4} className="px-6 py-20 text-center text-slate-400 font-medium italic">
                                            No leads captured yet.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </div>
    );
}
