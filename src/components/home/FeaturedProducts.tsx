"use client";

import React from 'react';
import { ShoppingCart, Star, Sparkles, TrendingUp, Headphones, Mouse, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

// Admin panel (Firestore/Database) se aane wala data
const featuredProducts = [
  {
    id: "prod_1",
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    price: "₹29,990",
    originalPrice: "₹34,990",
    desc: "Industry-leading noise cancellation with auto noise canceling optimizer and 30-hour battery life.",
    affiliateLink: "https://amazon.in/",
    tag: "Top Rated",
    icon: <Headphones size={90} className="text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" />,
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    shadow: "shadow-[0_20px_40px_rgba(99,102,241,0.2)]",
    rating: 4.8,
    reviews: "12k+"
  },
  {
    id: "prod_2",
    name: "Logitech MX Master 3S Wireless Mouse",
    price: "₹8,995",
    originalPrice: "₹10,995",
    desc: "Ultra-fast scrolling, ergonomic design, and 8K DPI any-surface tracking for developers and creators.",
    affiliateLink: "https://amazon.in/",
    tag: "Best Seller",
    icon: <Mouse size={90} className="text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" />,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    shadow: "shadow-[0_20px_40px_rgba(20,184,166,0.2)]",
    rating: 4.7,
    reviews: "8.5k+"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-[#f8fafc] relative overflow-hidden">
      
      {/* Soft Pastel Background Orbs for Premium Light Theme */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-[20%] left-[-10%] w-[600px] h-[600px] bg-emerald-400/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] right-[20%] w-[400px] h-[400px] bg-orange-400/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left space-y-4">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
              <Sparkles size={16} className="text-[#00a63e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-teal-500">
                Marketplace
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
              Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-md">Offers.</span>
            </h2>
            <p className="text-slate-500 font-medium max-w-md text-sm md:text-base">
              Handpicked tech deals curated by CodeWebX to fuel your digital growth.
            </p>
          </div>
          
          {/* Elevated View All Link */}
          <Link href="/shop" className="group flex items-center gap-3 bg-white border border-slate-100 px-6 py-3.5 rounded-2xl text-sm font-black text-slate-800 shadow-[0_10px_20px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.08)] hover:-translate-y-1 transition-all active:scale-95">
            View All Deals 
            <ArrowRight size={18} className="text-[#00a63e] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Ultra-Premium Dynamic Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:bg-white flex flex-col"
            >
              
              {/* Vibrant 3D Product Visual Container */}
              <div className={`relative w-full h-72 rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-br ${product.gradient} ${product.shadow} shadow-inner`}>
                
                {/* Abstract Pattern Overlay for Premium Feel */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                
                {/* Floating Product Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  {product.icon}
                </div>
                
                {/* Glassmorphic Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/40 text-white px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-20">
                  {product.id === "prod_2" ? <TrendingUp size={12} className="text-white" /> : <Star size={12} className="text-white" />} 
                  {product.tag}
                </div>

                {/* "Verified" subtle badge on bottom right */}
                <div className="absolute bottom-4 right-4 bg-black/10 backdrop-blur-sm p-1.5 rounded-full text-white/80 z-20">
                  <CheckCircle2 size={16} />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-grow px-3">
                {/* Ratings */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-amber-400 drop-shadow-sm">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" className="opacity-40" />
                  </div>
                  <span className="text-xs font-bold text-slate-400">{product.rating} ({product.reviews})</span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl md:text-2xl font-black text-slate-800 mb-2 tracking-tight group-hover:text-[#00a63e] transition-colors line-clamp-2 leading-tight">
                  {product.name}
                </h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6 text-xs md:text-sm line-clamp-3">
                  {product.desc}
                </p>
              </div>

              {/* Footer: Price & Amazon Button */}
              <div className="mt-auto pt-5 border-t border-slate-100 flex items-center justify-between px-3 gap-4">
                
                {/* High-Contrast Pricing */}
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tighter tabular-nums leading-none drop-shadow-sm">
                    {product.price}
                  </span>
                  <span className="text-[11px] font-bold text-slate-400 line-through mt-1.5 decoration-slate-300">
                    {product.originalPrice}
                  </span>
                </div>

                {/* Elevated Action Button */}
                <a 
                  href={product.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative overflow-hidden bg-[#ff9900] text-gray-900 px-6 py-3.5 rounded-[1.2rem] font-black text-xs flex items-center justify-center gap-2 group/btn shadow-[0_8px_20px_rgba(255,153,0,0.3)] hover:shadow-[0_12px_25px_rgba(255,153,0,0.4)] hover:-translate-y-0.5 transition-all active:scale-95 border border-[#ff9900]/50"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ShoppingCart size={16} /> Buy Now
                  </span>
                  {/* Subtle sweep effect for Amazon button */}
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-in-out"></div>
                </a>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedProducts;