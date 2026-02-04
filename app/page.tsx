'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BarChart,
  Calendar,
  Users,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Play,
  TrendingUp,
  Shield,
  Clock,
  ChevronRight,
  UserCheck,
  Star,
  Zap,
  Target,
  Mail,
  PieChart,
  Repeat,
  Linkedin,
  MapPin,
  ExternalLink,
  Instagram
} from 'lucide-react';
import ApplicationModal from '@/components/ApplicationModal';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    reveals.forEach(el => observer.observe(el));

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="antialiased selection:bg-secondary selection:text-white">
      {/* Application Modal */}
      <ApplicationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-strong py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 lg:h-24">
            <Link href="/" className="flex items-center space-x-3 group">
              <Image
                src="/assets/logo.png"
                alt="Client Solver"
                width={200}
                height={50}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
            <div className="hidden md:flex items-center space-x-10">
              <a href="#how-it-works" className="text-sm uppercase tracking-widest text-accent hover:text-primary transition-colors font-semibold">Method</a>
              <a href="#benefits" className="text-sm uppercase tracking-widest text-accent hover:text-primary transition-colors font-semibold">Benefits</a>
              <a href="#results" className="text-sm uppercase tracking-widest text-accent hover:text-primary transition-colors font-semibold">Results</a>
              <a href="#testimonials" className="text-sm uppercase tracking-widest text-accent hover:text-primary transition-colors font-semibold">Reviews</a>
            </div>
            <div className="hidden md:flex">
              <button onClick={() => setIsModalOpen(true)}
                className="btn-primary btn-shine bg-secondary text-white px-8 py-3 rounded-none font-sans font-semibold text-sm uppercase tracking-wider hover:bg-opacity-90 cursor-pointer shadow-lg hover:shadow-xl">
                Book Discovery Call
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="relative bg-primary">

        {/* HERO SECTION */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-dot-grid">
          <div className="absolute inset-0 z-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/10 rounded-full blur-[150px] opacity-20"></div>
            <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-[150px] opacity-10"></div>
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-900/10 rounded-full blur-[120px] opacity-30"></div>
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2670&auto=format&fit=crop')] bg-cover bg-center opacity-[0.05] mix-blend-overlay"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="flex flex-col items-center justify-center relative">
              <h1 className="reveal delay-100 text-5xl md:text-7xl lg:text-8xl font-serif font-medium text-white leading-tight mb-8 text-center drop-shadow-sm">
                Acquire <span className="text-gradient-gold italic">Exclusive</span><br />
                Listings Effortlessly
              </h1>
              <p className="reveal delay-200 text-lg md:text-xl text-slate-300 max-w-2xl mx-auto mb-10 font-medium leading-relaxed text-center">
                The premium growth partner for top-tier real estate professionals. We deliver 20-30 qualified appointments monthly, with zero ad spend through AI data organic outreach.
              </p>
              <div className="reveal delay-300 flex flex-col sm:flex-row gap-6 justify-center items-center">
                <button onClick={() => setIsModalOpen(true)}
                  className="btn-primary btn-shine bg-secondary text-white px-10 py-5 rounded-sm font-semibold text-sm uppercase tracking-widest hover:bg-opacity-90 w-full sm:w-auto cursor-pointer shadow-xl">
                  Book Discovery Call
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Realty Section */}
        <section className="section-padding relative bg-primary/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">The Reality of Modern Real Estate</h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium">The traditional methods of lead generation are broken. Top producers require a more sophisticated approach.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass p-10 rounded-sm reveal hover-lift group border border-slate-800 bg-slate-900/40 hover:border-red-400">
                <div className="w-14 h-14 bg-red-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-900/30 transition-colors">
                  <BarChart className="w-6 h-6 text-red-500 group-hover:text-red-400 transition-colors" />
                </div>
                <h3 className="text-xl font-serif text-white mb-4 font-bold">Inconsistent Revenue</h3>
                <p className="text-slate-400 font-medium leading-relaxed">Relying on expensive ads or referrals leads to unpredictable income streams that stifle growth.</p>
              </div>
              <div className="glass p-10 rounded-sm reveal delay-100 hover-lift group border border-slate-800 bg-slate-900/40 hover:border-orange-400">
                <div className="w-14 h-14 bg-orange-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-orange-900/30 transition-colors">
                  <Calendar className="w-6 h-6 text-orange-500 group-hover:text-orange-400 transition-colors" />
                </div>
                <h3 className="text-xl font-serif text-white mb-4 font-bold">Time Scarcity</h3>
                <p className="text-slate-400 font-medium leading-relaxed">Top agents shouldn't be cold calling. Your time is best spent closing deals, not chasing them.</p>
              </div>
              <div className="glass p-10 rounded-sm reveal delay-200 hover-lift group border border-slate-800 bg-slate-900/40 hover:border-secondary">
                <div className="w-14 h-14 bg-yellow-900/20 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-900/30 transition-colors">
                  <Users className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 transition-colors" />
                </div>
                <h3 className="text-xl font-serif text-white mb-4 font-bold">Low Quality Leads</h3>
                <p className="text-slate-400 font-medium leading-relaxed">Filtering through hundreds of unqualified internet leads is exhausting and demoralizing.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Methodology (The Process) */}
        <section id="how-it-works" className="section-padding bg-[#0A1A2B] relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-1 gap-20 items-center">
              <div className="reveal">
                <span className="text-secondary text-sm font-bold tracking-widest uppercase mb-4 block">The Process</span>
                <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 leading-tight">Precision Engineering for <span className="text-gradient-gold">Lead Generation</span></h2>
                <p className="text-slate-300 text-lg font-medium mb-12">Our proprietary system filters out the noise, connecting you only with high-intent sellers ready to transact.</p>

                <div className="space-y-12">
                  <div className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 border-l-2 border-secondary/30 flex items-center justify-center text-3xl font-serif text-secondary/50 group-hover:text-secondary group-hover:border-secondary transition-all pl-4">01</div>
                    <div>
                      <h3 className="text-xl font-serif text-white mb-2 font-bold">Market Identification</h3>
                      <p className="text-slate-400 font-medium">We leverage data analytics to identify property owners in your specific market exhibiting high-intent selling signals.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 border-l-2 border-secondary/30 flex items-center justify-center text-3xl font-serif text-secondary/50 group-hover:text-secondary group-hover:border-secondary transition-all pl-4">02</div>
                    <div>
                      <h3 className="text-xl font-serif text-white mb-2 font-bold">Bespoke Outreach</h3>
                      <p className="text-slate-400 font-medium">Our copywriters craft personalized, multi-channel campaigns that resonate with affluent homeowners rather than annoying them.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-6 group">
                    <div className="w-12 h-12 border-l-2 border-secondary/30 flex items-center justify-center text-3xl font-serif text-secondary/50 group-hover:text-secondary group-hover:border-secondary transition-all pl-4">03</div>
                    <div>
                      <h3 className="text-xl font-serif text-white mb-2 font-bold">Executive Booking</h3>
                      <p className="text-slate-400 font-medium">We handle the scheduling. You simply receive a calendar notification with a qualified prospect ready to list.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Advantage (Benefits) */}
        <section id="benefits" className="section-padding relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20 reveal">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">The Competitive Advantage</h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium">Why industry leaders exclusively partner with Client Solver to scale their operations.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Zero Ad Spend", icon: Zap, desc: "Eliminate the erratic costs of PPC. Our organic outreach infrastructure operates independent of algorithm changes." },
                { title: "Pre-Vetted Appointments", icon: CheckCircle, desc: "We don't sell 'leads.' We deliver confirmed meetings with homeowners who have verified selling intent." },
                { title: "20+ Hours Reclaimed", icon: Clock, desc: "Delegate the entire prospecting arm of your business. Focus solely on the high-value activity of closing." },
                { title: "Scalable Architecture", icon: TrendingUp, desc: "Predictable volume allows you to plan your growth. Dial up the volume as you expand your team." },
                { title: "Concierge Service", icon: UserCheck, desc: "A dedicated success manager optimizes your campaigns weekly, ensuring maximum market penetration." },
                { title: "Transparent Analytics", icon: PieChart, desc: "Total visibility into your pipeline. Track open rates, response rates, and booking conversion in real-time." }
              ].map((benefit, i) => (
                <div key={i} className="glass p-8 rounded-sm border border-slate-800 reveal hover-lift group bg-slate-900/40">
                  <div className="w-12 h-12 bg-secondary/10 rounded-sm flex items-center justify-center mb-6 border border-secondary/20 group-hover:border-secondary transition-colors">
                    <benefit.icon className="w-6 h-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-serif text-white mb-3 font-bold">{benefit.title}</h3>
                  <p className="text-slate-400 font-medium text-sm leading-relaxed">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Video Call Section */}
        <section className="section-padding relative bg-primary/20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="reveal relative">
              <div className="absolute inset-0 bg-secondary/10 blur-[100px] rounded-full opacity-20"></div>
              <div className="relative glass p-4 rounded-xl border border-white/10 shadow-2xl bg-slate-900/60 min-h-[400px] flex flex-col items-center justify-center text-center overflow-hidden">
                <Image
                  src="https://images.pexels.com/photos/3584994/pexels-photo-3584994.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Professional Virtual Meeting"
                  width={600}
                  height={400}
                  className="w-full h-auto rounded-lg opacity-95 hover:opacity-100 transition-opacity duration-700 object-cover"
                />
              </div>
            </div>
            <div className="text-center mt-12 reveal delay-100">
              <button onClick={() => setIsModalOpen(true)}
                className="btn-primary btn-shine bg-secondary text-white px-10 py-5 rounded-sm font-semibold text-sm uppercase tracking-widest hover:bg-opacity-90 cursor-pointer shadow-xl">
                Book Discovery Call
              </button>
            </div>
          </div>
        </section>

        {/* Results Section */}
        <section id="results" className="py-24 bg-primary/30 relative border-y border-white/5 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-12 divide-y md:divide-y-0 md:divide-x divide-white/10">
              <div className="text-center reveal delay-100 p-4 group">
                <div className="text-5xl lg:text-6xl font-serif font-medium text-gradient-gold mb-4 animate-pulse-soft delay-100 drop-shadow-sm">5000+</div>
                <div className="text-slate-400 text-sm tracking-widest uppercase group-hover:text-white transition-colors font-bold">Booked Meetings</div>
              </div>
              <div className="text-center reveal delay-200 p-4 group">
                <div className="text-5xl lg:text-6xl font-serif font-medium text-gradient-gold mb-4 animate-pulse-soft delay-200 drop-shadow-sm">400-500%+</div>
                <div className="text-slate-400 text-sm tracking-widest uppercase group-hover:text-white transition-colors font-bold">Average ROI</div>
              </div>
              <div className="text-center reveal delay-300 p-4 group">
                <div className="text-5xl lg:text-6xl font-serif font-medium text-gradient-gold mb-4 animate-pulse-soft delay-300 drop-shadow-sm">93%</div>
                <div className="text-slate-400 text-sm tracking-widest uppercase group-hover:text-white transition-colors font-bold">Retention Rate</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="section-padding relative bg-[#051423]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 reveal">
              <h2 className="text-3xl md:text-5xl font-serif text-white mb-6">Trusted by over 250+ Independent Brokerages</h2>
              <p className="text-slate-400 max-w-2xl mx-auto font-medium">Join 250+ Lead Brokers and 5,000+ Agents nationwide who have systematized their growth with Client Solver.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: "Michael Rodriguez", role: "Independent Broker, Miami", text: "Client Solver transformed my business. I went from inconsistent leads to 25+ qualified appointments monthly. The ROI is undeniable.", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop" },
                { name: "Sarah Chen", role: "Independent Broker, Georgia", text: "The quality of appointments is outstanding—ready to transact, not tire-kickers. It's the only system I trust for consistent volume.", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
                { name: "James Patterson", role: "Independent Broker, Seattle WA", text: "32 appointments in 30 days. Closed 4 deals immediately. If you want to scale without the headache of ad management, this is it.", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" }
              ].map((t, i) => (
                <div key={i} className="glass p-10 rounded-sm border border-slate-800 reveal hover-lift group bg-slate-900/40">
                  <div className="flex items-center mb-6 space-x-1">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 text-secondary fill-secondary" />)}
                  </div>
                  <blockquote className="text-slate-300 mb-8 font-medium italic leading-relaxed">"{t.text}"</blockquote>
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full mr-4 bg-slate-800 flex items-center justify-center text-[10px] text-slate-500 border border-slate-700">IMAGE</div>
                    <div>
                      <div className="font-serif text-white font-bold">{t.name}</div>
                      <div className="text-xs text-secondary uppercase tracking-widest font-bold">{t.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Invitation Section (Final CTA) */}
        <section className="section-padding relative overflow-hidden bg-primary/20">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-secondary/5 blur-[150px] pointer-events-none"></div>
          <div className="absolute left-0 bottom-0 w-1/3 h-1/2 bg-blue-900/10 blur-[120px] pointer-events-none"></div>

          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-12 reveal">
              <Image
                src="/assets/1cropped_download.png"
                alt="Professional Handshake"
                width={600}
                height={400}
                className="w-full max-w-2xl mx-auto h-auto rounded-xl shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-700 object-cover"
              />
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 reveal leading-tight">Elevate Your Real Estate Brokerage</h2>
            <p className="text-xl text-slate-300 mb-12 reveal delay-100 font-medium max-w-3xl mx-auto leading-relaxed">
              We accept a limited number of new partners each month to ensure service quality.
              <span className="text-secondary font-bold block mt-2 italic">Secure your market exclusivity today.</span>
            </p>
            <div className="reveal delay-200">
              <button onClick={() => setIsModalOpen(true)}
                className="btn-primary btn-shine bg-secondary text-white px-12 py-5 rounded-sm font-semibold text-lg uppercase tracking-widest hover:bg-opacity-90 min-w-[300px] cursor-pointer shadow-xl">
                Book Discovery Call
              </button>
              <p className="mt-6 text-xs text-slate-500 font-bold uppercase tracking-widest flex items-center justify-center space-x-2">
                <Shield className="w-3 h-3 text-secondary" />
                <span>Limited exclusive slots available for Q1 2026</span>
              </p>
            </div>
            <div className="mt-20 max-w-2xl mx-auto">
              <Image
                src="https://images.pexels.com/photos/3769714/pexels-photo-3769714.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Real Estate Professional Meeting"
                width={600}
                height={400}
                className="w-full h-auto rounded-xl shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-700 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Concierge Contact Line */}
        <section className="py-24 bg-[#051423] border-y border-white/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-serif text-white mb-4 reveal font-bold">Concierge Direct Line</h2>
            <p className="text-slate-400 mb-12 font-medium">Looking for team or enterprise-level solutions? Reach out directly.</p>
            <div className="flex justify-center reveal delay-100">
              <a href="mailto:partnerships@clientsolver.com" className="flex items-center space-x-8 glass p-8 rounded-2xl border border-white/10 hover:border-secondary transition-all group bg-slate-900/40 shadow-sm pr-12">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center group-hover:bg-secondary transition-colors">
                  <Mail className="w-8 h-8 text-secondary group-hover:text-white" />
                </div>
                <div className="text-left">
                  <div className="text-xs text-slate-500 uppercase tracking-widest mb-1 font-bold">Strategic Partnerships</div>
                  <div className="text-2xl text-white font-serif font-bold group-hover:text-secondary transition-colors">partnerships@clientsolver.com</div>
                </div>
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER - REDESIGNED PREMIUM FOOTER */}
      <footer className="bg-primary text-white pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
            {/* Brand Column */}
            <div className="space-y-6">
              <Image
                src="/assets/logo.png"
                alt="Client Solver"
                width={180}
                height={45}
                className="opacity-90 [filter:brightness(0)_invert(1)]"
              />
              <p className="text-slate-400 text-sm leading-relaxed font-medium">
                The gold standard in real estate lead generation. We engineer consistent growth for top producers and brokerages through AI organic data outreach.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                  <Linkedin className="w-5 h-5" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="mailto:partnerships@clientsolver.com" className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center hover:bg-secondary hover:border-secondary transition-all">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation Column */}
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Outreach Methodology</a></li>
                <li><a href="#benefits" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Competitive Advantage</a></li>
                <li><a href="#results" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Case Performance</a></li>
                <li><Link href="/admin" className="text-slate-400 hover:text-white transition-colors text-sm font-medium">Command Center</Link></li>
              </ul>
            </div>


            {/* Inquiries Column */}
            <div className="space-y-6">
              <h4 className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">Inquiries</h4>
              <div className="space-y-4">
                <p className="text-slate-400 text-sm font-medium">Remote Headquarters</p>
                <button onClick={() => setIsModalOpen(true)} className="flex items-center space-x-2 text-white font-bold text-sm bg-slate-800 px-4 py-2 rounded transition-all hover:bg-slate-700">
                  <span>Book Discovery Call</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          <div className="pt-10 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest font-bold text-slate-500">
            <div className="flex space-x-8 mb-4 md:mb-0">
              <span>&copy; 2026 Client Solver Inc.</span>
              <a href="#" className="hover:text-slate-300">Terms of Service</a>
              <a href="#" className="hover:text-slate-300">Privacy Policy</a>
              <Link href="/disclaimer" className="hover:text-slate-300">Earnings Disclaimer</Link>
              <Link href="/admin" className="hover:text-slate-300">Admin</Link>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span>Platform Systems Operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div >
  );
}
