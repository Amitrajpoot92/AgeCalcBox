"use client";
import React from 'react';
import Link from 'next/link';
import { Mail, Phone, ArrowUpRight, Globe, Zap, ShieldCheck, Code2 } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Connected Navigation Links
  const footerLinks = [
    { name: 'Age Calculator', href: '/age-calculator' },
    { name: 'Age Difference', href: '/age-difference' },
    { name: 'Future Age Predictor', href: '/future-age' },
    { name: 'Retirement Planner', href: '/retirement' },
    { name: 'Premium Offers', href: '/shop' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    // Notice pb-32 on mobile to prevent content hiding behind the bottom navbar dock
    <footer className="bg-[#0a0a0a] text-gray-400 pt-16 md:pt-24 pb-32 md:pb-12 border-t border-white/5 relative overflow-hidden">
      
      {/* Premium Graphical Background Elements */}
      <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00a63e]/10 blur-[100px] md:blur-[120px] rounded-full -mr-20 md:-mr-40 -mt-20 md:-mt-40 opacity-50 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#00a63e]/5 blur-[80px] md:blur-[100px] rounded-full -ml-10 md:-ml-20 -mb-10 md:-mb-20 opacity-30 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16 md:mb-20">
          
          {/* Brand Identity Section (Client Focused) */}
          <div className="lg:col-span-5 space-y-6 md:space-y-8">
            <Link href="/" className="group flex flex-col gap-2 w-fit">
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-[0_0_20px_rgba(0,166,62,0.3)] group-hover:scale-110 transition-transform duration-500 bg-white">
                  <Image src="/logo.webp" alt="Logo" fill className="object-cover p-0.5" />
                </div>
                <span className="font-black text-2xl md:text-3xl tracking-tighter text-white">
                  Age Calculator <span className="text-[#00a63e]">Box</span>
                </span>
              </div>
              <div className="flex items-center gap-1.5 ml-1">
                <Code2 size={12} className="text-[#00a63e]" />
                <p className="text-[10px] md:text-xs font-bold text-gray-500 tracking-[0.2em] uppercase">
                  Powered by <span className="text-[#00a63e]/80">CodeWebX</span> Engine
                </p>
              </div>
            </Link>
            
            <p className="text-sm md:text-base leading-relaxed max-w-sm text-gray-400 font-medium">
              A high-performance, mobile-first utility tool with a strict zero-data storage policy. Experience digital precision at its finest.
            </p>

            {/* Graphical Trust Tokens */}
            <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/10">
                <ShieldCheck size={14} className="text-[#00a63e]" /> 100% Private
              </div>
              <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/10">
                <Zap size={14} className="text-[#00a63e]" /> Instant Logic
              </div>
            </div>
          </div>

          {/* Smart Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-black mb-6 md:mb-10 text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-50">Navigation</h4>
            <ul className="space-y-4">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="group flex items-center gap-2 hover:text-[#00a63e] transition-all duration-300 w-fit">
                    <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00a63e] transition-colors shadow-[0_0_10px_rgba(0,166,62,0)] group-hover:shadow-[0_0_10px_rgba(0,166,62,0.8)]"></div>
                    <span className="text-sm font-semibold tracking-wide">{link.name}</span>
                    <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Support (Client's Info) */}
          <div className="lg:col-span-4">
            <h4 className="text-white font-black mb-6 md:mb-10 text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-50">Support & Connect</h4>
            <div className="space-y-4">
              
              {/* Email Block */}
              <a href="mailto:info@agecalculatorbox.com" className="block group p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent border border-white/5 hover:border-[#00a63e]/40 hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="p-2.5 md:p-3 bg-[#00a63e]/10 rounded-xl text-[#00a63e] group-hover:bg-[#00a63e] group-hover:text-white transition-all shadow-inner">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] uppercase font-black text-gray-500 tracking-widest mb-0.5">Business & Support</p>
                    <p className="text-white font-bold text-sm md:text-base break-all">info@agecalculatorbox.com</p>
                  </div>
                </div>
              </a>
              
              {/* Phone Block */}
              <a href="tel:+918103420637" className="flex items-center gap-3 px-4 md:px-5 py-2 hover:bg-white/5 w-fit rounded-xl transition-all">
                <Phone size={16} className="text-[#00a63e]" />
                <span className="text-sm font-bold text-gray-300">+91 81034 20637</span>
              </a>
            </div>
          </div>
        </div>

        {/* Final Graphical Bottom Bar */}
        <div className="pt-8 md:pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase flex items-center gap-2">
              © {currentYear} Age Calculator Box
            </p>
            
            {/* Highlighted CodeWebX Link */}
            <a 
              href="https://www.codewebx.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex items-center gap-2 bg-white/5 hover:bg-[#00a63e]/10 border border-white/10 hover:border-[#00a63e]/30 px-4 py-2 rounded-xl transition-all duration-300 w-fit"
            >
              <Code2 size={14} className="text-gray-500 group-hover:text-[#00a63e] transition-colors" />
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                Designed & Developed by <span className="text-white group-hover:text-[#00a63e] transition-colors">CodeWebX</span>
              </span>
              <ArrowUpRight size={12} className="text-gray-500 opacity-50 group-hover:opacity-100 group-hover:text-[#00a63e] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
            </a>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-[#00a63e]/5 rounded-xl border border-[#00a63e]/10">
              <Globe size={12} className="text-[#00a63e] animate-spin-slow" />
              <span className="text-[9px] md:text-[10px] font-bold text-white/60 tracking-widest uppercase">Global Tool</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;