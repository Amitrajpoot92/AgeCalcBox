"use client";

import React from 'react';
import { ExternalLink, ShoppingCart, ArrowRight, Sparkles, Star, TrendingUp, Headphones, Mouse } from 'lucide-react';
import Link from 'next/link';

// Admin panel (Firestore/Database) se aane wala data (Physical Gadgets)
const featuredProducts = [
  {
    id: "prod_1",
    name: "Sony WH-1000XM5 Wireless ANC Headphones",
    price: "₹29,990",
    originalPrice: "₹34,990",
    desc: "Industry-leading noise cancellation with auto noise canceling optimizer and 30-hour battery life.",
    affiliateLink: "https://amazon.in/",
    tag: "Top Rated",
    icon: <Headphones size={80} className="text-white/90 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />,
    gradient: "from-blue-600 to-indigo-800",
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
    icon: <Mouse size={80} className="text-white/90 drop-shadow-xl group-hover:scale-110 transition-transform duration-500" />,
    gradient: "from-emerald-500 to-teal-700",
    rating: 4.7,
    reviews: "8.5k+"
  }
];

const FeaturedProducts = () => {
  return (
    <section className="py-24 bg-[#fafafa] relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#00a63e]/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-6">
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Sparkles size={16} className="text-[#00a63e]" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#00a63e]">Marketplace</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tighter leading-tight">
              Exclusive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d]">Offers.</span>
            </h2>
            <p className="text-gray-500 font-medium max-w-md">Handpicked tech deals curated by CodeWebX to fuel your digital growth.</p>
          </div>
          
          <Link href="/shop" className="group flex items-center gap-3 bg-white border border-gray-100 px-6 py-3 rounded-2xl text-sm font-black text-gray-900 shadow-sm hover:shadow-md transition-all active:scale-95">
            View All Deals 
            <ArrowRight size={18} className="text-[#00a63e] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Products Grid (Matched with Shop Page Style) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {featuredProducts.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white border border-gray-100 rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_30px_60px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:border-[#00a63e]/20 flex flex-col"
            >
              
              {/* Product Visual Container (No Images, Only Gradients & Icons) */}
              <div className={`relative w-full h-64 rounded-2xl overflow-hidden mb-6 flex items-center justify-center bg-gradient-to-br ${product.gradient} shadow-inner`}>
                
                {/* Abstract Pattern Overlay for Premium Feel */}
                <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay"></div>
                
                {/* Product Icon */}
                <div className="relative z-10">
                  {product.icon}
                </div>
                
                {/* Floating Tag */}
                <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-lg border border-white/20 z-20">
                  {product.id === "prod_2" ? <TrendingUp size={12} className="text-white" /> : <Star size={12} className="text-white" />} 
                  {product.tag}
                </div>
              </div>

              {/* Product Details */}
              <div className="flex-grow px-2">
                {/* Ratings */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center text-orange-400">
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" />
                    <Star size={14} fill="currentColor" className="opacity-50" />
                  </div>
                  <span className="text-xs font-bold text-gray-400">{product.rating} ({product.reviews})</span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-xl font-black text-gray-900 mb-2 tracking-tight group-hover:text-[#00a63e] transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-6 text-xs line-clamp-3">
                  {product.desc}
                </p>
              </div>

              {/* Footer: Price & Amazon Button */}
              <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between px-2 gap-4">
                
                {/* Pricing */}
                <div className="flex flex-col">
                  <span className="text-2xl font-black text-gray-900 tracking-tighter tabular-nums leading-none">
                    {product.price}
                  </span>
                  <span className="text-[10px] font-bold text-gray-400 line-through mt-1">
                    {product.originalPrice}
                  </span>
                </div>

                {/* Action Button */}
                <a 
                  href={product.affiliateLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="relative overflow-hidden bg-[#ff9900] text-gray-900 px-5 py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 group/btn hover:shadow-[0_10px_20px_rgba(255,153,0,0.2)] transition-all active:scale-95"
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