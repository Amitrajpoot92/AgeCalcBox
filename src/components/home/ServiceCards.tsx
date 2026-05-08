"use client";
import React from 'react';
import Link from 'next/link';
import { 
  ArrowUpRight, 
  Sparkles, 
  Calculator, 
  Users, 
  FastForward 
} from 'lucide-react';

const tools = [
  {
    title: "Age Calculator",
    desc: "Calculate your exact age in years, months, and days with a live second counter.",
    href: "/age-calculator",
    actionText: "Calculate Age",
    icon: <Calculator size={22} className="text-white" />,
    theme: {
      cardBg: "bg-gradient-to-br from-emerald-50/80 to-teal-100/50",
      iconBg: "bg-gradient-to-br from-emerald-400 to-teal-500",
      solid: "bg-emerald-500",
      glow: "bg-emerald-500/30",
      aura: "from-emerald-400/40 to-teal-400/40",
      hoverText: "group-hover:text-emerald-600",
      border: "border-emerald-200/60"
    }
  },
  {
    title: "Age Difference",
    desc: "Find the exact age gap between two people with custom relationship labels.",
    href: "/age-difference",
    actionText: "Compare Ages",
    icon: <Users size={22} className="text-white" />,
    theme: {
      cardBg: "bg-gradient-to-br from-indigo-50/80 to-purple-100/50",
      iconBg: "bg-gradient-to-br from-indigo-400 to-purple-500",
      solid: "bg-indigo-500",
      glow: "bg-indigo-500/30",
      aura: "from-indigo-400/40 to-purple-400/40",
      hoverText: "group-hover:text-indigo-600",
      border: "border-indigo-200/60"
    }
  },
  {
    title: "Future Age",
    desc: "Predict how old you will be on any specific date in the future with milestones.",
    href: "/future-age",
    actionText: "Predict Future",
    icon: <FastForward size={22} className="text-white" />,
    theme: {
      cardBg: "bg-gradient-to-br from-orange-50/80 to-rose-100/50",
      iconBg: "bg-gradient-to-br from-orange-400 to-rose-500",
      solid: "bg-orange-500",
      glow: "bg-orange-500/30",
      aura: "from-orange-400/40 to-rose-400/40",
      hoverText: "group-hover:text-orange-600",
      border: "border-orange-200/60"
    }
  }
];

const ServiceCards = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-visible z-0">
      
      {/* Super Colorful Background Ambience */}
      <div className="absolute inset-0 bg-[#f8fafc] -z-20 pointer-events-none"></div>
      
      {/* Animated Glowing Orbs */}
      <div className="absolute top-[10%] left-[-5%] w-[400px] h-[400px] bg-fuchsia-400/10 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[20%] right-[-5%] w-[500px] h-[500px] bg-cyan-400/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-emerald-400/10 blur-[100px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="mb-24 text-center space-y-4">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100">
            <Sparkles size={16} className="text-violet-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-fuchsia-600">
              Smart Intelligence
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
            Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d]">Simplified.</span>
          </h2>
        </div>

        {/* 3-Column Perfect Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 max-w-5xl mx-auto">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              href={tool.href}
              className="group relative block transition-all duration-500 hover:-translate-y-2"
            >
              
              {/* --- 1. HOVER GLOW AURA --- */}
              <div className={`absolute inset-0 rounded-[2.5rem] bg-gradient-to-br ${tool.theme.aura} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 transform group-hover:scale-105`}></div>

              {/* --- 2. VIBRANT CARD BODY (Tinted Glassmorphism without Images) --- */}
              <div className={`relative h-full z-10 ${tool.theme.cardBg} backdrop-blur-md rounded-[2.4rem] p-8 md:p-10 flex flex-col border ${tool.theme.border} shadow-[0_15px_40px_rgba(0,0,0,0.05)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.1)] transition-all overflow-hidden`}>
                
                {/* --- 3. CONTENT AREA --- */}
                <div className="relative z-30 flex-grow space-y-6"> 
                  {/* Vibrant Solid Icon Box */}
                  <div className={`inline-flex p-4 rounded-[1.2rem] ${tool.theme.iconBg} shadow-lg shadow-${tool.theme.solid}/30 transition-transform group-hover:scale-110 duration-300`}>
                    {tool.icon}
                  </div>
                  
                  <div className="space-y-3">
                    <h3 className={`text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight ${tool.theme.hoverText} transition-colors duration-300`}>
                      {tool.title}
                    </h3>
                    <p className="text-slate-600 text-sm font-semibold leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                {/* --- 4. DYNAMIC ACTION FOOTER --- */}
                <div className={`relative z-30 mt-10 pt-6 border-t ${tool.theme.border} flex items-center justify-between`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${tool.theme.solid} animate-pulse shadow-sm`}></div>
                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${tool.theme.hoverText} text-slate-500 transition-colors`}>
                      {tool.actionText}
                    </span>
                  </div>
                  
                  {/* Action Arrow Button */}
                  <div className={`p-3 rounded-full bg-white text-slate-400 border ${tool.theme.border} group-hover:${tool.theme.solid} group-hover:bg-opacity-10 transition-all transform group-hover:rotate-45 shadow-sm`}>
                    <ArrowUpRight size={20} className={tool.theme.hoverText} />
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;