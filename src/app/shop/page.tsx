"use client";

import React from 'react';
import { ShoppingCart, Star, Sparkles, TrendingUp, ShieldCheck, Headphones, Mouse, Speaker, CheckCircle2 } from 'lucide-react';

const products = [
  {
    id: 1,
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    price: "₹29,990",
    originalPrice: "₹34,990",
    desc: "Industry-leading noise cancellation with auto noise canceling optimizer and 30-hour battery life.",
    link: "https://amazon.in/",
    tag: "Top Rated",
    icon: <Headphones size={90} className="text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" />,
    gradient: "from-blue-500 via-indigo-500 to-purple-600",
    shadow: "shadow-[0_20px_40px_rgba(99,102,241,0.2)]",
    rating: 4.8,
    reviews: "12k+"
  },
  {
    id: 2,
    name: "Logitech MX Master 3S Wireless Mouse",
    price: "₹8,995",
    originalPrice: "₹10,995",
    desc: "Ultra-fast scrolling, ergonomic design, and 8K DPI any-surface tracking for developers and creators.",
    link: "https://amazon.in/",
    tag: "Best Seller",
    icon: <Mouse size={90} className="text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" />,
    gradient: "from-emerald-400 via-teal-500 to-cyan-600",
    shadow: "shadow-[0_20px_40px_rgba(20,184,166,0.2)]",
    rating: 4.7,
    reviews: "8.5k+"
  },
  {
    id: 3,
    name: "Echo Dot (5th Gen) Smart Speaker",
    price: "₹4,499",
    originalPrice: "₹5,499",
    desc: "Premium sound with Alexa. Control your smart home, set alarms, and play music hands-free.",
    link: "https://amazon.in/",
    tag: "Trending",
    icon: <Speaker size={90} className="text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)] group-hover:scale-110 group-hover:-translate-y-2 transition-transform duration-500" />,
    gradient: "from-amber-400 via-orange-500 to-rose-500",
    shadow: "shadow-[0_20px_40px_rgba(249,115,22,0.2)]",
    rating: 4.5,
    reviews: "45k+"
  }
];

export default function ShopPage() {
  return (
    <section className="bg-[#f8fafc] min-h-screen py-24 md:py-32 relative overflow-hidden z-0">
      
      {/* Soft Pastel Background Orbs for Premium Light Theme */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-400/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[400px] h-[400px] bg-orange-400/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-2">
            <Sparkles size={16} className="text-[#00a63e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-teal-500">
              Curated Marketplace
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
            Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-md">Gadgets.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-xl mx-auto text-lg">
            Our highly recommended tech gear and accessories. Handpicked from Amazon for developers and creators.
          </p>
        </div>

        {/* Ultra-Premium E-Commerce Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2.5rem] p-5 transition-all duration-500 hover:shadow-[0_25px_60px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:bg-white flex flex-col"
            >
              
              {/* Vibrant 3D Product Visual Container */}
              <div className={`relative w-full h-72 rounded-[2rem] overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-br ${product.gradient} ${product.shadow} shadow-inner`}>
                
                {/* Overlay Texture for Premium Feel */}
                <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                
                {/* Floating Product Icon */}
                <div className="relative z-10 flex items-center justify-center">
                  {product.icon}
                </div>
                
                {/* Glassmorphic Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/40 text-white px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg z-20">
                  {product.id === 2 ? <TrendingUp size={12} className="text-white" /> : <Star size={12} className="text-white" />} 
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
                  href={product.link} 
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

        {/* Elegant Affiliate Disclaimer */}
        <div className="mt-20 text-center flex flex-col items-center justify-center gap-3">
          <div className="p-3 bg-white rounded-full shadow-sm border border-gray-100">
             <ShieldCheck size={24} className="text-slate-300" />
          </div>
          <p className="text-[11px] font-bold text-slate-400 max-w-md uppercase tracking-widest leading-relaxed">
            We are a participant in the Amazon Associates Program. We may earn a small commission for purchases made through these links at no extra cost to you.
          </p>
        </div>

      </div>
    </section>
  );
}