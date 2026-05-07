"use client";

import React from 'react';
import { Sparkles, ShieldCheck, Zap, Code2, Globe } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <section className="bg-[#f8fafc] min-h-screen py-24 md:py-32 relative overflow-hidden z-0">
      
      {/* Soft Pastel Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00a63e]/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
            <Sparkles size={16} className="text-[#00a63e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-teal-500">
              Our Story
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-md">Us.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-2xl mx-auto text-lg leading-relaxed">
            We build high-performance, precision-based digital utilities. Our mission is to provide accurate calculations without compromising your privacy.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-20">
          
          {/* Mission Box */}
          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2.5rem] p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all">
            <div className="w-16 h-16 bg-[#00a63e]/10 rounded-2xl flex items-center justify-center text-[#00a63e] mb-6 shadow-inner">
              <Globe size={32} />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight">Global Digital Tools</h2>
            <p className="text-slate-500 leading-relaxed font-medium">
              Age Calculator Box was engineered to be the fastest and most reliable chronological engine on the web. Whether you are calculating age differences, planning retirement, or finding a future date, our tools are built for speed and zero-friction.
            </p>
          </div>

          {/* Engine Box (CodeWebX Reference) */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl rounded-[2.5rem] p-10 hover:-translate-y-1 transition-transform relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a63e]/20 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-6 border border-white/10 shadow-inner">
              <Code2 size={32} />
            </div>
            <h2 className="text-3xl font-black text-white mb-4 tracking-tight">Powered by CodeWebX</h2>
            <p className="text-slate-300 leading-relaxed font-medium mb-6">
              Our entire utility suite is designed, developed, and maintained by the premium tech agency, CodeWebX. Engineered for perfection.
            </p>
            <a href="https://www.codewebx.in/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#00a63e] hover:text-white transition-colors">
              Visit Agency Website &rarr;
            </a>
          </div>

        </div>

        {/* Core Values Grid */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-slate-400">Core Principles</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <ShieldCheck size={24} />, title: "100% Private", desc: "Zero data storage policy. Your dates and calculations never leave your browser.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { icon: <Zap size={24} />, title: "Instant Logic", desc: "No loading screens. Complex time and date algorithms resolved in milliseconds.", color: "text-amber-500", bg: "bg-amber-500/10" },
              { icon: <Sparkles size={24} />, title: "Premium UI", desc: "Designed with modern glassmorphism to provide a beautiful and clutter-free experience.", color: "text-blue-500", bg: "bg-blue-500/10" },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-3xl p-8 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${feature.bg} ${feature.color} mb-5 shadow-inner`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-2">{feature.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}