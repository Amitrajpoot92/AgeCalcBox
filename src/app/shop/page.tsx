"use client";

import React, { useEffect, useState } from 'react';
import { ShoppingCart, Star, Sparkles, ShieldCheck, CheckCircle2, ShoppingBag } from 'lucide-react';
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  affiliateUrl: string;
}

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="bg-[#f8fafc] min-h-screen pt-32 md:pt-40 pb-20 relative overflow-hidden z-0">
      
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-emerald-400/10 blur-[150px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16 space-y-3">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-2">
            <Sparkles size={16} className="text-[#00a63e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-teal-500">
              Curated Marketplace
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
            Exclusive<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-md">Amazon Deals.</span>
          </h1>
        </div>

        {/* Dynamic E-Commerce Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((skeleton) => (
              <div key={skeleton} className="bg-white/50 backdrop-blur-md rounded-3xl p-4 border border-white animate-pulse">
                <div className="w-full h-48 bg-slate-200 rounded-2xl mb-4"></div>
                <div className="w-3/4 h-5 bg-slate-200 rounded-full mb-3"></div>
                <div className="w-full h-10 bg-slate-200 rounded-xl"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white shadow-sm">
            <ShoppingBag size={48} className="mx-auto text-slate-300 mb-4" />
            <h2 className="text-2xl font-black text-slate-700">No Gadgets Available</h2>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            {products.map((product) => {
              return (
                <div 
                  key={product.id} 
                  className="group relative bg-white/80 backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(0,0,0,0.05)] rounded-3xl p-4 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] hover:-translate-y-1.5 hover:bg-white flex flex-col"
                >
                  {/* Clean White Image Container */}
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-4 flex items-center justify-center bg-white border border-slate-100/50">
                    
                    <div className="relative z-10 flex items-center justify-center w-full h-full p-2">
                      {product.imageUrl ? (
                        <img 
                          src={product.imageUrl} 
                          alt={product.name} 
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" 
                        />
                      ) : (
                        <ShoppingBag size={50} className="text-slate-200 drop-shadow-sm" />
                      )}
                    </div>
                    
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm z-20">
                      <Star size={10} className="text-amber-500" /> Featured
                    </div>
                  </div>

                  <div className="flex-grow px-1 flex flex-col">
                    <div className="flex items-center gap-1.5 mb-2">
                      <div className="flex items-center text-amber-400">
                        <Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" /><Star size={12} fill="currentColor" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-400">5.0</span>
                    </div>

                    <h3 className="text-[15px] md:text-base font-black text-slate-800 mb-1.5 tracking-tight group-hover:text-[#00a63e] transition-colors line-clamp-2 leading-snug">
                      {product.name}
                    </h3>
                    
                    {/* Yahan par Description wapas add kar diya gaya hai */}
                    <p className="text-[11px] md:text-xs text-slate-500 font-medium line-clamp-2 leading-relaxed mb-1">
                      {product.description || "Premium recommended gear for daily productivity and enhancement."}
                    </p>
                  </div>

                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between px-1 gap-2">
                    <div className="flex flex-col">
                      <span className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-slate-700 tracking-tighter tabular-nums leading-none">
                        {product.price}
                      </span>
                    </div>

                    <a 
                      href={product.affiliateUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#ff9900] text-gray-900 px-4 py-2.5 rounded-xl font-black text-[11px] flex items-center justify-center gap-1.5 hover:shadow-lg transition-all active:scale-95 border border-[#ff9900]/50 shrink-0"
                    >
                      <ShoppingCart size={14} /> Buy
                    </a>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        <div className="mt-16 text-center flex flex-col items-center justify-center gap-2">
          <p className="text-[10px] font-bold text-slate-400 max-w-sm uppercase tracking-widest leading-relaxed">
            We are a participant in the Amazon Associates Program.
          </p>
        </div>

      </div>
    </section>
  );
}