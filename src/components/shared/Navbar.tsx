"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Home, Calendar, UserPlus, FastForward, Briefcase, Sparkles } from 'lucide-react';
import Image from 'next/image';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Scroll hiding logic
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 80) { 
          setIsVisible(false); 
        } else {
          setIsVisible(true); 
        }
        setScrolled(window.scrollY > 20);
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'Age', href: '/age-calculator', icon: <Calendar size={20} /> },
    { name: 'Diff', href: '/age-difference', icon: <UserPlus size={20} /> },
    { name: 'Future', href: '/future-age', icon: <FastForward size={20} /> },
    { name: 'Contact', href: '/contact', icon: <Briefcase size={20} /> },
  ];

  return (
    <>
      {/* =========================================
          TOP NAVBAR: Guaranteed Centered & Bounded
      ========================================= */}
      {/* left-4 and right-4 forces the exact physical screen width minus margins */}
      <div className={`fixed top-4 md:top-6 left-4 right-4 mx-auto max-w-5xl z-[100] flex justify-center pointer-events-none transition-all duration-700 ease-in-out ${
        isVisible ? "translate-y-0" : "-translate-y-[150%] md:translate-y-0"
      }`}>
        
        {/* The actual Pill Container */}
        <nav className={`pointer-events-auto flex items-center justify-between bg-white/90 backdrop-blur-2xl shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-white/60 transition-all duration-500 w-full rounded-full p-2 md:py-2.5 md:px-3 ${
          scrolled ? "md:gap-10 shadow-[0_20px_50px_rgba(0,0,0,0.12)]" : ""
        }`}>
          
          {/* 1. Logo Section (With min-w-0 to prevent text stretching the box) */}
          <Link href="/" className="flex items-center gap-2 md:gap-3 shrink-0 ml-1 md:ml-3 min-w-0">
            <div className="relative w-8 h-8 md:w-10 md:h-10 shrink-0 overflow-hidden rounded-full shadow-sm border border-slate-100 transition-transform hover:rotate-12 duration-500">
              <Image src="/logo.webp" alt="Logo" fill className="object-cover p-0.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-black text-[13px] md:text-lg tracking-tighter text-slate-800 leading-none mb-[2px] truncate">
                Age Calculator <span className="text-[#00a63e]">Box</span>
              </span>
              <span className="text-[6px] md:text-[8px] font-black uppercase tracking-widest text-slate-400 leading-none truncate"></span>
            </div>
          </Link>

          {/* 2. Desktop Links (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-2 shrink-0">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-black rounded-full transition-all duration-300 ${
                    isActive 
                      ? "bg-[#00a63e]/10 text-[#00a63e]" 
                      : "text-slate-500 hover:text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* 3. Action Buttons */}
          <div className="flex items-center shrink-0">
            
            {/* Desktop Products Button */}
            <Link href="/shop" className="hidden md:flex items-center gap-2 bg-slate-900 text-white px-6 py-2.5 rounded-full font-black text-xs transition-all hover:bg-[#00a63e] hover:shadow-[0_10px_20px_rgba(0,166,62,0.3)] active:scale-95 ml-2">
              <Sparkles size={14} className="text-white/70" /> PRODUCTS
            </Link>

            {/* Mobile Circular Icon Button (Matches Reference Image) */}
            <Link href="/shop" className="md:hidden flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 shrink-0 bg-[#00a63e] rounded-full text-white shadow-[0_5px_15px_rgba(0,166,62,0.3)] active:scale-95 transition-transform mr-1">
              <ShoppingBag size={18} />
            </Link>

          </div>
        </nav>
      </div>

      {/* =========================================
          MOBILE BOTTOM DOCK: Floating Centered Pill
      ========================================= */}
      {/* Same bounded logic for the bottom dock */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 mx-auto max-w-[360px] z-[100] flex justify-center pointer-events-none">
        
        {/* Floating Pill Dock */}
        <nav className="pointer-events-auto w-full bg-white/95 backdrop-blur-xl border border-slate-100 rounded-full px-2 py-2 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center w-[18%] py-1.5 rounded-full transition-all duration-300 ${
                  isActive ? "bg-[#00a63e]/10 text-[#00a63e]" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <div className="mb-1 transition-transform duration-300">
                  {link.icon}
                </div>
                <span className="text-[6.5px] sm:text-[7px] font-black uppercase tracking-widest text-center truncate w-full px-1">
                  {link.name}
                </span>
              </Link>
            );
          })}
        </nav>
        
      </div>
    </>
  );
};

export default Navbar;