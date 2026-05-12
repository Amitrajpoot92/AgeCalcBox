"use client";
import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const Hero = () => {
  return (
    // min-height aur items-center hata diya taaki vertical stretching na ho. 
    // pt-24 lagaya taaki floating navbar ke theek niche se start ho aur extra gap na bache.
    <section className="relative pt-24 md:pt-28 pb-8 px-4 md:px-8 overflow-hidden bg-[#fafafa]">
      
      {/* Background Decorative Glow (Centered) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-[#00a63e]/5 blur-[100px] pointer-events-none"></div>

      {/* Centered Content Wrapper: space-y-4 md:space-y-6 lagaya taaki gap compact rahe */}
      <div className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
        
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 tracking-tighter leading-tight">
          <span className="text-[#00a63e]">All Age Calculators</span> <br />
          in One Place.
        </h1>

        <p className="max-w-xl text-gray-500 font-medium text-base md:text-lg">
          High-performance tools with <span className="text-gray-900 font-bold tracking-tight">ZERO-DATA STORAGE</span> policy. 
          Instant calculations. Absolute privacy ever.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-5 pt-2">
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
    </section>
  );
};

export default Hero;