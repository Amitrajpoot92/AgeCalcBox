"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ArrowUpRight, 
  Sparkles, 
  Calculator, 
  Users, 
  FastForward, 
  Palmtree 
} from 'lucide-react';

const tools = [
  {
    title: "Age Calculator",
    desc: "Calculate your exact age in years, months, and days with a live second counter.",
    image: "/service2.webp",
    href: "/age-calculator",
    icon: <Calculator className="text-white" size={18} />,
  },
  {
    title: "Age Difference",
    desc: "Find the exact age gap between two people with custom relationship labels.",
    image: "/service3.webp",
    href: "/age-difference",
    icon: <Users className="text-white" size={18} />,
  },
  {
    title: "Future Age",
    desc: "Predict how old you will be on any specific date in the future with milestones.",
    image: "/service4.webp",
    href: "/future-age",
    icon: <FastForward className="text-white" size={18} />,
  },
  {
    title: "Retirement Calc",
    desc: "Plan your golden years by calculating exactly when you will retire.",
    image: "/service1.webp",
    href: "/retirement",
    icon: <Palmtree className="text-white" size={18} />,
  }
];

const ServiceCards = () => {
  return (
    <section className="py-24 md:py-32 bg-white relative overflow-visible">
      
      {/* Background Ambience */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-gray-50 to-transparent pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-24 text-center space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Sparkles size={18} className="text-[#00a63e]" />
            <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#00a63e]">Smart Intelligence</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-gray-900 tracking-tighter">
            Precision <span className="text-[#00a63e]">Simplified.</span>
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-20">
          {tools.map((tool, index) => (
            <Link 
              key={index} 
              href={tool.href}
              className="group relative block transition-all duration-500 hover:-translate-y-2"
            >
              
              {/* --- 1. CONTINUOUS ROTATING BORDER LIGHT --- */}
              <div className="absolute inset-[-1.5px] rounded-[2.5rem] overflow-hidden p-[1.5px] z-0">
                <div className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_150deg,#00a63e_180deg,transparent_210deg,transparent_360deg)] animate-[spin_4s_linear_infinite]"></div>
              </div>

              {/* --- 2. DARK CARD BODY --- */}
              <div className="relative h-full z-10 bg-[#121826] rounded-[2.4rem] p-7 pt-10 flex flex-col min-h-[280px] border border-white/5 overflow-visible">
                
                {/* --- 3. CHARACTER IMAGE (Right Side & Pop-out) --- */}
                {/* Changed z-index to 20 so text (z-30) can stay above the image */}
                <div className="absolute -top-16 -right-2 w-36 h-48 z-20 pointer-events-none transition-transform duration-700 group-hover:scale-110 group-hover:-translate-y-2">
                  {/* Neon Light Effect (Always On) */}
                  <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-24 h-12 bg-[#00a63e]/40 blur-[35px] rounded-full"></div>
                  
                  <Image 
                    src={tool.image} 
                    alt={tool.title} 
                    fill
                    className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                    style={{ objectPosition: 'bottom' }}
                  />
                </div>

                {/* 4. CONTENT AREA (Now above the image) */}
                {/* Changed z-index to 30, adjusted padding, and added dark drop-shadow for readability */}
                <div className="relative z-30 flex-grow space-y-4 pr-2"> 
                  <div className="inline-flex p-2.5 bg-[#00a63e] rounded-xl shadow-lg shadow-[#00a63e]/20">
                    {tool.icon}
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-white tracking-tight uppercase leading-tight drop-shadow-[0_4px_6px_rgba(0,0,0,0.9)]">
                      {tool.title}
                    </h3>
                    <p className="text-gray-300 text-[12px] font-bold leading-relaxed line-clamp-3 drop-shadow-[0_2px_4px_rgba(0,0,0,1)]">
                      {tool.desc}
                    </p>
                  </div>
                </div>

                {/* 5. FOOTER */}
                {/* Added relative z-30 to ensure footer is also clickable and above the image */}
                <div className="relative z-30 mt-8 pt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#00a63e] animate-pulse"></div>
                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Live Engine</span>
                  </div>
                  <div className="bg-white/5 p-2 rounded-full text-white/40 border border-white/10 group-hover:bg-[#00a63e] group-hover:text-white transition-all transform group-hover:rotate-45">
                    <ArrowUpRight size={16} />
                  </div>
                </div>

                {/* Subtle Inner Glow (Always On) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#00a63e]/5 to-transparent pointer-events-none rounded-[2.4rem]"></div>
              </div>

              {/* Bottom Shadow for White Background */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-[#00a63e]/10 blur-2xl -z-10 transition-opacity opacity-50 group-hover:opacity-100"></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCards;