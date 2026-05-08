"use client";
import React from 'react';
import { ArrowRight, ShieldCheck, LayoutGrid } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    // Yahan pt-32 aur md:pt-40 add kiya hai taaki floating navbar ke liye upar space bach jaye
    <section className="relative min-h-[80vh] flex items-center pt-32 md:pt-40 pb-10 px-4 md:px-8 overflow-hidden bg-[#fafafa]">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-[#00a63e]/5 blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center relative z-10">
        
        {/* LEFT CONTENT: Text & CTA */}
        <div className="text-center lg:text-left space-y-4 md:space-y-6 order-2 lg:order-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-gray-100 shadow-sm">
            <LayoutGrid size={12} className="text-[#00a63e]" />
            <span className="text-[10px] font-black text-gray-900 uppercase tracking-widest">
              Calculator Box <span className="text-[#00a63e]">v3.5</span>
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
            <span className="text-[#00a63e]">All Age Calculators</span> <br />
            in One Place.
          </h1>

          <p className="max-w-md mx-auto lg:mx-0 text-gray-500 font-medium text-sm md:text-base">
            High-performance tools with <span className="text-gray-900 font-bold tracking-tight">ZERO-DATA STORAGE</span> policy. 
            Instant calculations. Absolute privacy ever.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 md:gap-5">
            <Link 
              href="/age-calculator" 
              className="w-full sm:w-auto bg-[#00a63e] text-white px-8 py-3.5 rounded-2xl font-black text-base shadow-[0_12px_25px_rgba(0,166,62,0.2)] hover:bg-[#008a34] transition-all flex items-center justify-center gap-2.5"
            >
              Start Calculating
              <ArrowRight size={18} />
            </Link>
            <div className="flex items-center gap-1.5 text-xs font-black text-gray-400">
              <ShieldCheck size={16} className="text-[#00a63e]" />
              Secure Protocol
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT: Clean Video Frame */}
        <div className="relative order-1 lg:order-2 w-full max-w-[500px] mx-auto">
          <div className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-white shadow-xl border-[4px] md:border-[8px] border-white group aspect-[4/3]">
            <video autoPlay loop muted playsInline className="w-full h-full object-cover">
              <source src="/herovideo.mp4" type="video/mp4" />
            </video>
          </div>
          <div className="absolute -z-10 -inset-6 bg-[#00a63e]/10 blur-3xl rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;