"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ShieldCheck, Zap, X } from 'lucide-react';
import Image from 'next/image';

const Footer = () => {
  // Modal State Management
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [activeModal]);

  // Dummy Content for Legal Popups
  const popupContent: Record<string, { title: string; content: React.ReactNode }> = {
    privacy: {
      title: "Privacy Policy",
      content: (
        <div className="space-y-4">
          <p>At Age Calculator Box, we take your privacy seriously. This Privacy Policy outlines how we handle information when you use our tools.</p>
          <h4 className="font-bold text-white">1. Zero Data Storage</h4>
          <p>We operate on a strict zero-data storage policy. Any dates or information you enter into our calculators are processed locally in your browser. We do not store, track, or save your personal chronological data on our servers.</p>
          <h4 className="font-bold text-white">2. Analytics</h4>
          <p>We may use basic, anonymized analytics to understand website traffic and improve our user interface, but this data cannot be tied back to any individual user.</p>
        </div>
      )
    },
    disclaimer: {
      title: "Disclaimer",
      content: (
        <div className="space-y-4">
          <p>The tools provided on Age Calculator Box are for informational and utility purposes only.</p>
          <h4 className="font-bold text-white">Accuracy</h4>
          <p>While we strive for absolute chronological precision, variations may occur due to leap years, timezone differences, or browser settings. We do not guarantee 100% accuracy for legal or official documentation purposes.</p>
          <p>Please rely on official legal documents (like birth certificates) for formal age verification.</p>
        </div>
      )
    },
    terms: {
      title: "Terms and Conditions",
      content: (
        <div className="space-y-4">
          <p>By accessing and using Age Calculator Box, you accept and agree to be bound by these Terms and Conditions.</p>
          <h4 className="font-bold text-white">Use of Service</h4>
          <p>Our calculators are provided free of charge for personal use. You agree not to misuse the service, attempt to disrupt our servers, or use our tools for any illegal activities.</p>
          <h4 className="font-bold text-white">Modifications</h4>
          <p>We reserve the right to modify or discontinue any tool or service without prior notice. These terms may also be updated periodically.</p>
        </div>
      )
    }
  };

  return (
    <>
      <footer className="bg-[#0a0a0a] text-gray-400 pt-16 md:pt-24 pb-32 md:pb-12 border-t border-white/5 relative overflow-hidden">
        
        {/* Premium Graphical Background Elements */}
        <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-[#00a63e]/10 blur-[100px] md:blur-[120px] rounded-full -mr-20 md:-mr-40 -mt-20 md:-mt-40 opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[200px] md:w-[300px] h-[200px] md:h-[300px] bg-[#00a63e]/5 blur-[80px] md:blur-[100px] rounded-full -ml-10 md:-ml-20 -mb-10 md:-mb-20 opacity-30 pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-8 mb-16 md:mb-20">
            
            {/* Brand Identity Section */}
            <div className="md:col-span-7 lg:col-span-8 space-y-6 md:space-y-8">
              <Link href="/" className="group flex flex-col gap-2 w-fit">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 overflow-hidden rounded-xl shadow-[0_0_20px_rgba(0,166,62,0.3)] group-hover:scale-110 transition-transform duration-500 bg-white">
                    <Image src="/logo.webp" alt="Logo" fill className="object-cover p-0.5" />
                  </div>
                  <span className="font-black text-2xl md:text-3xl tracking-tighter text-white">
                    Age Calculator <span className="text-[#00a63e]">Box</span>
                  </span>
                </div>
              </Link>
              
              <p className="text-sm md:text-base leading-relaxed max-w-sm text-gray-400 font-medium">
                A simple and accurate platform to calculate age, compare age differences, and predict future age instantly with a fast and mobile-friendly experience.
              </p>

              {/* Graphical Trust Tokens */}
              <div className="flex flex-wrap gap-3 md:gap-4 pt-2 md:pt-4">
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/10">
                  <ShieldCheck size={14} className="text-[#00a63e]" /> 🔒 100% Private
                </div>
                <div className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-white/70 bg-white/5 px-3 md:px-4 py-2 rounded-full border border-white/10">
                  <Zap size={14} className="text-[#00a63e]" /> ⚡ Instant Results
                </div>
              </div>
            </div>

            {/* Quick & Legal Links */}
            <div className="md:col-span-5 lg:col-span-4 flex flex-col sm:flex-row gap-10 sm:gap-16 md:justify-end">
              
              {/* Pages */}
              <div>
                <h4 className="text-white font-black mb-6 md:mb-8 text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-50">Explore</h4>
                <ul className="space-y-4">
                  {/* --- YAHAN HOME BUTTON ADD KIYA HAI --- */}
                  <li>
                    <Link href="/" className="group flex items-center gap-2 hover:text-[#00a63e] transition-all duration-300 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00a63e] transition-colors"></div>
                      <span className="text-sm font-semibold tracking-wide">Home</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="group flex items-center gap-2 hover:text-[#00a63e] transition-all duration-300 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00a63e] transition-colors"></div>
                      <span className="text-sm font-semibold tracking-wide">About Us</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="group flex items-center gap-2 hover:text-[#00a63e] transition-all duration-300 w-fit">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00a63e] transition-colors"></div>
                      <span className="text-sm font-semibold tracking-wide">Contact Us</span>
                      <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="text-white font-black mb-6 md:mb-8 text-[10px] md:text-xs uppercase tracking-[0.3em] opacity-50">Legal</h4>
                <ul className="space-y-4">
                  <li>
                    <button onClick={() => setActiveModal('privacy')} className="group flex items-center gap-2 hover:text-[#00a63e] transition-all duration-300 w-fit text-left">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00a63e] transition-colors"></div>
                      <span className="text-sm font-semibold tracking-wide">Privacy Policy</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveModal('disclaimer')} className="group flex items-center gap-2 hover:text-[#00a63e] transition-all duration-300 w-fit text-left">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00a63e] transition-colors"></div>
                      <span className="text-sm font-semibold tracking-wide">Disclaimer</span>
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveModal('terms')} className="group flex items-center gap-2 hover:text-[#00a63e] transition-all duration-300 w-fit text-left">
                      <div className="w-1.5 h-1.5 rounded-full bg-white/10 group-hover:bg-[#00a63e] transition-colors"></div>
                      <span className="text-sm font-semibold tracking-wide">Terms & Conditions</span>
                    </button>
                  </li>
                </ul>
              </div>

            </div>
          </div>

          {/* Final Graphical Bottom Bar */}
          <div className="pt-8 md:pt-10 border-t border-white/5 flex items-center justify-center text-center">
            <p className="text-[10px] sm:text-xs font-bold text-gray-500 tracking-[0.1em] uppercase">
              © 2026 Age Calculator Box. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* =========================================
          POPUP MODAL (Mobile Friendly)
      ========================================= */}
      {activeModal && popupContent[activeModal] && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
            onClick={() => setActiveModal(null)}
          ></div>
          
          {/* Modal Box */}
          <div className="bg-[#111] border border-white/10 w-full max-w-lg rounded-2xl md:rounded-[2rem] shadow-2xl relative z-10 flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-300">
            
            {/* Header */}
            <div className="flex items-center justify-between p-5 md:p-6 border-b border-white/5">
              <h3 className="text-lg md:text-xl font-black text-white tracking-tight">
                {popupContent[activeModal].title}
              </h3>
              <button 
                onClick={() => setActiveModal(null)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-[#00a63e] hover:text-white text-gray-400 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            {/* Scrollable Content */}
            <div className="p-5 md:p-6 overflow-y-auto text-sm md:text-base text-gray-400 font-medium custom-scrollbar">
              {popupContent[activeModal].content}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default Footer;