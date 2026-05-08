"use client";

import React from 'react';
import { 
  ShieldCheck, 
  Unlock, 
  Target, 
  UserMinus, 
  Info, 
  Lightbulb, 
  Layers, 
  Sparkles 
} from 'lucide-react';

export default function TrustAndInfo() {
  return (
    <section className="relative py-24 overflow-hidden z-0 bg-slate-50">
      
      {/* =========================================
          AURORA COLORFUL BACKGROUND
      ========================================= */}
      <div className="absolute inset-0 w-full h-full bg-slate-50 z-[-2]"></div>
      {/* Massive Glowing Orbs for the Aurora Effect */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-fuchsia-400/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none z-[-1] animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-[500px] h-[500px] bg-cyan-400/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none z-[-1]"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-emerald-400/10 blur-[150px] rounded-full mix-blend-multiply pointer-events-none z-[-1]"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* =========================================
            1. FLOATING TRUST BAR
        ========================================= */}
        <div className="mb-20">
          <div className="bg-white/60 backdrop-blur-2xl border border-white rounded-[2.5rem] p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-200/50">
            
            {[
              { title: "100% Free", desc: "No hidden charges", icon: <Unlock size={20} />, color: "text-blue-500", bg: "bg-blue-500/10" },
              { title: "Zero Data", desc: "Absolute privacy", icon: <ShieldCheck size={20} />, color: "text-emerald-500", bg: "bg-emerald-500/10" },
              { title: "High Precision", desc: "Exact accuracy", icon: <Target size={20} />, color: "text-orange-500", bg: "bg-orange-500/10" },
              { title: "No Signup", desc: "Instant access", icon: <UserMinus size={20} />, color: "text-fuchsia-500", bg: "bg-fuchsia-500/10" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 px-6 py-4 md:py-2 w-full md:w-auto hover:scale-105 transition-transform duration-300 cursor-default group">
                <div className={`w-12 h-12 rounded-[1rem] flex items-center justify-center shrink-0 ${item.bg} ${item.color} shadow-inner group-hover:shadow-md transition-all`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 tracking-tight">{item.title}</h3>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>

        {/* =========================================
            2. COLORFUL BENTO GRID (INFO SECTION)
        ========================================= */}
        <div className="space-y-6">
          
          <div className="text-center mb-10 space-y-4">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm border border-white">
              <Sparkles size={16} className="text-violet-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
                Discover The Engine
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter leading-tight">
              Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">Know.</span>
            </h2>
          </div>

          {/* Bento Box Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Bento 1: Massive Blue/Purple Gradient Box (Span 2 Columns) */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-700 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(79,70,229,0.3)] group hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-white/10 blur-3xl rounded-full"></div>
              
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-white mb-8 shadow-inner group-hover:scale-110 transition-transform">
                  <Info size={28} />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight drop-shadow-md">What is Age Calculator Box?</h3>
                <p className="text-blue-100 font-medium leading-relaxed max-w-xl text-sm md:text-base">
                  A premium suite of digital utility tools engineered to calculate chronological data with absolute precision. From finding your exact age down to the second, to projecting future milestones, our engine handles complex date math instantly without storing your personal information.
                </p>
              </div>
            </div>

            {/* Bento 2: Vibrant Orange/Rose Box */}
            <div className="lg:col-span-1 bg-gradient-to-br from-rose-500 to-orange-500 rounded-[2.5rem] p-10 relative overflow-hidden shadow-[0_20px_50px_rgba(244,63,94,0.3)] group hover:-translate-y-1 transition-transform duration-500">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 blur-2xl rounded-full"></div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center text-white mb-8 shadow-inner group-hover:rotate-12 transition-transform">
                  <Lightbulb size={28} />
                </div>
                <h3 className="text-2xl font-black text-white mb-4 tracking-tight drop-shadow-md">Why is this useful?</h3>
                <p className="text-rose-100 font-medium leading-relaxed text-sm">
                  Manual date math is frustrating and prone to errors. Whether you're tracking a baby's age or planning for retirement, we eliminate the guesswork with timezone-aware, instant computations.
                </p>
              </div>
            </div>

            {/* Bento 3: Wide Emerald Green Box (Full Width) */}
            <div className="lg:col-span-3 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2.5rem] p-10 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(16,185,129,0.3)] group hover:-translate-y-1 transition-transform duration-500 flex flex-col md:flex-row items-center gap-8 md:gap-12">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0)_50%,rgba(255,255,255,0.1)_100%)] animate-spin-slow pointer-events-none"></div>
              
              <div className="relative z-10 shrink-0">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-[1.5rem] border border-white/30 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                  <Layers size={40} />
                </div>
              </div>
              
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 tracking-tight drop-shadow-md">What do we offer?</h3>
                <p className="text-emerald-50 font-medium leading-relaxed text-sm md:text-base max-w-3xl">
                  A growing ecosystem of high-end calculators. Experience Exact Age tracking, chronological Age Differences, Future Projections, and a dedicated —all wrapped in a seamless, zero-friction interface designed by CodeWebX.
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}