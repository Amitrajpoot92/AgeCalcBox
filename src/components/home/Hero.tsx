"use client";
import React from 'react';
import { ArrowRight, Zap, ShieldCheck, LayoutGrid, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  const tools = [
    { name: 'Age Tracker', href: '/age-calculator' },
    { name: 'Compare Lives', href: '/age-difference' },
    { name: 'Future Plan', href: '/future-age' },
    { name: 'Retirement', href: '/retirement' },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-12 px-4 md:px-8 overflow-hidden bg-[#fafafa]">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#00a63e]/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
        
        {/* LEFT CONTENT: Text & CTA */}
        <div className="text-center lg:text-left space-y-6 md:space-y-8 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-100 shadow-sm">
            <LayoutGrid size={12} className="text-[#00a63e]" />
            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
              Calculator Box <span className="text-[#00a63e]">v3.5</span>
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter leading-none">
            Precision <br />
            <span className="text-[#00a63e]">In Motion.</span>
          </h1>

          <p className="max-w-md mx-auto lg:mx-0 text-gray-500 font-medium text-sm md:text-lg">
            High-performance tools with <span className="text-gray-900 font-bold tracking-tight">ZERO-DATA STORAGE</span> policy. 
            Experience absolute speed by CodeWebX.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-6">
            {/* LINK UPDATED FOR SMOOTH SCROLL */}
            <Link 
              href="#calculators-section" 
              className="w-full sm:w-auto bg-[#00a63e] text-white px-10 py-4 rounded-2xl font-black text-lg shadow-[0_15px_30px_rgba(0,166,62,0.25)] hover:bg-[#008a34] transition-all flex items-center justify-center gap-3"
            >
              Start Calculating
              <ArrowRight size={20} />
            </Link>
            <div className="flex items-center gap-2 text-xs font-black text-gray-400">
              <ShieldCheck size={18} className="text-[#00a63e]" />
              Secure Protocol
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: Video Frame */}
        <div className="relative order-1 lg:order-2 w-full max-w-[550px] mx-auto">
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white shadow-2xl border-[5px] md:border-[10px] border-white group">
            <video autoPlay loop muted playsInline className="w-full aspect-[4/3] object-cover">
              <source src="/herovideo.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-y-0 right-0 w-[48%] md:w-[42%] flex flex-col justify-center p-2 md:p-5 gap-2 md:gap-3 z-20">
              {tools.map((item, i) => (
                <Link 
                  key={i} 
                  href={item.href}
                  className="bg-gray-900/90 backdrop-blur-xl border border-[#00a63e]/30 p-2.5 md:p-4 rounded-xl md:rounded-2xl flex items-center justify-between group/item hover:bg-[#00a63e] hover:border-[#00a63e] transition-all"
                >
                  <span className="text-white text-[8px] md:text-[10px] lg:text-[11px] font-black uppercase tracking-widest truncate pr-1">
                    {item.name}
                  </span>
                  <ChevronRight size={12} className="text-[#00a63e] group-hover/item:text-white transition-colors shrink-0" />
                </Link>
              ))}
            </div>

            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-gray-900/80 backdrop-blur-md px-3 md:px-4 py-1 rounded-full border border-white/10">
              <span className="text-[7px] md:text-[8px] font-black text-white uppercase tracking-[0.2em]">Live Engine</span>
            </div>
          </div>
          <div className="absolute -z-10 -inset-6 bg-[#00a63e]/10 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;