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

  // FIX: Removed md:size to prevent JSX Namespace error. Fixed size={20} works perfectly.
  const navLinks = [
    { name: 'Home', href: '/', icon: <Home size={20} /> },
    { name: 'Age', href: '/age-calculator', icon: <Calendar size={20} /> },
    { name: 'Diff', href: '/age-difference', icon: <UserPlus size={20} /> },
    { name: 'Future', href: '/future-age', icon: <FastForward size={20} /> },
    { name: 'Retire', href: '/retirement', icon: <Briefcase size={20} /> },
  ];

  return (
    <>
      {/* --- TOP NAVBAR: Anti-Overflow & Floating Glass --- */}
      <nav className={`fixed top-0 w-full z-[100] transition-all duration-700 ease-in-out flex justify-center ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0 md:translate-y-0 md:opacity-100"
      }`}>
        <div className={`transition-all duration-500 ${
          scrolled 
          ? "w-[92%] md:max-w-5xl mt-3 md:mt-4 px-4 md:px-6 py-2.5 md:py-3 bg-white/80 backdrop-blur-xl border border-white/20 shadow-[0_20px_40px_rgba(0,0,0,0.05)] rounded-2xl md:rounded-[2rem]" 
          : "w-full max-w-7xl px-5 md:px-8 py-5 md:py-6 bg-transparent"
        }`}>
          <div className="flex justify-between items-center w-full">
            
            {/* Logo with Responsive Text */}
            <Link href="/" className="group flex items-center gap-2.5 md:gap-3 shrink-0">
              <div className="relative w-8 h-8 md:w-10 md:h-10 overflow-hidden rounded-xl md:rounded-2xl shadow-inner group-hover:shadow-[0_0_20px_rgba(0,166,62,0.3)] transition-all duration-500">
                <Image src="/logo.webp" alt="Logo" fill className="object-cover group-hover:scale-110 transition-transform" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-[15px] sm:text-lg md:text-xl tracking-tighter text-gray-900 leading-none mb-1 md:mb-0.5">
                  Age Calculator <span className="text-[#00a63e] relative">Box
                    <span className="absolute -top-1.5 -right-5 text-[6px] md:text-[8px] bg-[#00a63e] text-white px-1 rounded-full animate-pulse">PRO</span>
                  </span>
                </span>
                <span className="text-[6px] md:text-[8px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-gray-400 leading-none">By CodeWebX</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-1 shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-black transition-all relative group flex items-center gap-2 ${
                    pathname === link.href ? "text-[#00a63e]" : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-[#00a63e] transition-all duration-500 ${
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  }`}></span>
                </Link>
              ))}
              <div className="pl-6 ml-4 border-l border-gray-100">
                <Link href="/shop" className="relative group overflow-hidden bg-gray-900 text-white px-6 py-3 rounded-2xl font-black text-xs transition-all hover:shadow-[0_10px_25px_rgba(0,0,0,0.2)] flex items-center gap-2">
                  <span className="relative z-10 flex items-center gap-2">
                    <Sparkles size={14} className="text-[#00a63e]" /> PRODUCTS
                  </span>
                  <div className="absolute inset-0 bg-[#00a63e] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                </Link>
              </div>
            </div>

            {/* Mobile Tool Icon */}
            <Link href="/shop" className="md:hidden relative p-2 md:p-3 bg-gray-900 rounded-xl text-white shadow-lg shrink-0">
              <ShoppingBag size={18} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#00a63e] border-2 border-white rounded-full"></span>
            </Link>
          </div>
        </div>
      </nav>

      {/* --- MOBILE BOTTOM DOCK: Floating App Style --- */}
      <div className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] z-[100]">
        <div className="bg-gray-900/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] px-3 py-2.5 flex items-center justify-around shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex flex-col items-center justify-center gap-1 transition-all duration-500 ${
                  isActive ? "text-[#00a63e] scale-110" : "text-gray-500 hover:text-gray-300"
                }`}
              >
                <div className={`p-1.5 rounded-xl transition-all ${
                  isActive ? "bg-[#00a63e]/10 shadow-[0_0_15px_rgba(0,166,62,0.2)]" : ""
                }`}>
                  {link.icon}
                </div>
                <span className={`text-[7px] font-black uppercase tracking-widest ${
                  isActive ? "opacity-100" : "opacity-60"
                }`}>
                  {link.name}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Navbar;