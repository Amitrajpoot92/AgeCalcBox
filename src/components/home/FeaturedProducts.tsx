import React from 'react';
import { ExternalLink, ShoppingCart, ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Maan lijiye ye data admin panel (Firestore/Database) se fetch ho raha hai
const productsFromAdmin = [
  {
    id: "prod_1",
    name: "High-Performance Hosting",
    price: "149", 
    currency: "₹",
    period: "/mo",
    desc: "Speed up your tools with our recommended high-speed plans for developers.",
    affiliateLink: "https://hostinger.in/",
    image: "/hosting-offer.webp", // Admin se aane wali image
    badge: "Top Choice",
    storeName: "Hostinger"
  },
  {
    id: "prod_2",
    name: "Premium Domain Names",
    price: "499",
    currency: "₹",
    period: "",
    desc: "Get the perfect .com or .in domain for your next big project and brand.",
    affiliateLink: "https://godaddy.com/",
    image: "/domain-offer.webp", 
    badge: "Limited Offer",
    storeName: "GoDaddy"
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
            <p className="text-gray-500 font-medium max-w-md">Handpicked deals curated by CodeWebX to fuel your digital growth.</p>
          </div>
          <Link href="/shop" className="group flex items-center gap-3 bg-white border border-gray-100 px-6 py-3 rounded-2xl text-sm font-black text-gray-900 shadow-sm hover:shadow-md transition-all">
            View All Deals 
            <ArrowRight size={18} className="text-[#00a63e] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Dynamic Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {productsFromAdmin.map((product) => (
            <div 
              key={product.id} 
              className="group relative bg-white rounded-[2.5rem] border border-gray-100 p-2 hover:shadow-3xl hover:shadow-[#00a63e]/5 transition-all duration-500"
            >
              <div className="flex flex-col lg:flex-row h-full">
                
                {/* 1. IMAGE SECTION - Left side on Desktop */}
                <div className="relative w-full lg:w-48 h-48 lg:h-auto rounded-[2rem] overflow-hidden bg-gray-50 m-2">
                  <Image 
                    src={product.image} 
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-md text-[#00a63e] px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter shadow-sm border border-white/20">
                      {product.badge}
                    </span>
                  </div>
                </div>

                {/* 2. CONTENT SECTION */}
                <div className="flex-1 p-6 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-black text-gray-900 tracking-tight leading-tight group-hover:text-[#00a63e] transition-colors">
                        {product.name}
                      </h3>
                      <ShoppingCart size={18} className="text-gray-200 group-hover:text-[#00a63e] transition-colors" />
                    </div>
                    <p className="text-gray-400 text-xs font-bold leading-relaxed line-clamp-2">
                      {product.desc}
                    </p>
                  </div>

                  {/* 3. PRICE & BUTTON */}
                  <div className="mt-8 pt-5 border-t border-gray-50 flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-black text-gray-900">
                        {product.currency}{product.price}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 ml-1">{product.period}</span>
                    </div>

                    {/* REDIRECT LINK: Admin panel se aane wala 'affiliateLink' hamesha '_blank' mein khulega */}
                    <a 
                      href={product.affiliateLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#121826] text-white px-5 py-3 rounded-xl text-xs font-black flex items-center gap-2 hover:bg-[#00a63e] hover:shadow-lg hover:shadow-[#00a63e]/20 transition-all active:scale-95"
                    >
                      GET DEAL <ExternalLink size={14} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;