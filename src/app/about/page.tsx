"use client";

import React from 'react';
import { Sparkles, ShieldCheck, Zap, Code2, LayoutGrid, CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
  return (
    // Reduced vertical padding for mobile (py-12)
    <section className="bg-[#f8fafc] min-h-screen py-12 md:py-24 relative overflow-hidden z-0">
      
      {/* Soft Pastel Background Orbs */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-[#00a63e]/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-20 space-y-4 mt-8 md:mt-0">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
            <Sparkles size={16} className="text-[#00a63e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-teal-500">
              Our Story
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-md">Us.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-3xl mx-auto text-sm md:text-lg leading-relaxed px-2">
            Welcome to Age Calculator Box — a simple and easy-to-use platform made for accurate age calculations online. Our goal is to help users calculate age quickly without complicated steps or confusing tools.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 max-w-5xl mx-auto mb-16 md:mb-20">
          
          {/* Light Box: What We Offer */}
          <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] transition-all">
            <div className="w-14 h-14 md:w-16 md:h-16 bg-[#00a63e]/10 rounded-2xl flex items-center justify-center text-[#00a63e] mb-5 md:mb-6 shadow-inner">
              <LayoutGrid size={28} className="md:w-8 md:h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-4 tracking-tight">What We Offer</h2>
            <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base mb-5">
              We provide multiple free online age calculation tools designed for students, professionals, parents, and anyone who needs quick age-related calculations:
            </p>
            <ul className="space-y-3">
              {[
                "Age Calculator",
                "Age Difference Calculator",
                "Future Age Calculator",
                "Birthday Countdown Features",
                "Live Age Tracking (Years to Seconds)"
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-sm md:text-base font-bold text-slate-700">
                  <CheckCircle2 size={18} className="text-[#00a63e] mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Dark Box: Privacy & Commitment */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700 shadow-2xl rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 hover:-translate-y-1 transition-transform relative overflow-hidden flex flex-col justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a63e]/20 blur-[50px] rounded-full pointer-events-none"></div>
            <div className="w-14 h-14 md:w-16 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-5 md:mb-6 border border-white/10 shadow-inner relative z-10">
              <ShieldCheck size={28} className="md:w-8 md:h-8" />
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-4 tracking-tight relative z-10">Privacy & Commitment</h2>
            <div className="text-slate-300 leading-relaxed font-medium text-sm md:text-base space-y-4 relative z-10">
              <p>
                User privacy is important to us. We do not store personal age calculation data entered by users during calculations. Our website is designed to provide a secure and smooth browsing experience.
              </p>
              <p>
                We continue improving our tools regularly to provide better performance, accuracy, and usability. Thank you for visiting Age Calculator Box!
              </p>
            </div>
          </div>

        </div>

        {/* Core Values Grid based on Client's Mission */}
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <h3 className="text-[11px] md:text-sm font-black uppercase tracking-[0.3em] text-slate-400">Our Core Mission</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {[
              { 
                icon: <Zap size={24} />, 
                title: "Fast & Accurate", 
                desc: "Instead of calculating dates manually, get accurate age results instantly for school forms, job applications, or event planning.", 
                color: "text-amber-500", 
                bg: "bg-amber-500/10" 
              },
              { 
                icon: <Code2 size={24} />, 
                title: "Simple & Mobile Friendly", 
                desc: "Free to use, easy to understand, and designed with a lightweight performance for users across all devices.", 
                color: "text-blue-500", 
                bg: "bg-blue-500/10" 
              },
              { 
                icon: <ShieldCheck size={24} />, 
                title: "100% Privacy Focused", 
                desc: "At Age Calculator Box, we do not ask users to create accounts or share any unnecessary personal information.", 
                color: "text-emerald-500", 
                bg: "bg-emerald-500/10" 
              },
            ].map((feature, idx) => (
              <div key={idx} className="bg-white/60 backdrop-blur-md border border-white shadow-sm rounded-3xl p-6 md:p-8 text-center hover:bg-white hover:shadow-lg transition-all duration-300">
                <div className={`w-14 h-14 mx-auto rounded-2xl flex items-center justify-center ${feature.bg} ${feature.color} mb-4 md:mb-5 shadow-inner`}>
                  {feature.icon}
                </div>
                <h4 className="text-lg font-black text-slate-800 mb-2 tracking-tight">{feature.title}</h4>
                <p className="text-[13px] md:text-sm text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}