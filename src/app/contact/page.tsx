"use client";

import React from 'react';
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react';

export default function ContactPage() {
  return (
    <section className="bg-[#f8fafc] min-h-screen py-24 md:py-32 relative overflow-hidden z-0">
      
      {/* Soft Pastel Background Orbs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#00a63e]/10 blur-[120px] rounded-full pointer-events-none -z-10 animate-pulse"></div>
      <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-blue-400/10 blur-[120px] rounded-full pointer-events-none -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100">
            <Sparkles size={16} className="text-[#00a63e]" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-teal-500">
              Get In Touch
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-800 tracking-tighter leading-tight drop-shadow-sm">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-md">Us.</span>
          </h1>
          <p className="mt-4 text-slate-500 font-medium max-w-xl mx-auto text-lg">
            Have a question or want to collaborate? We'd love to hear from you. Drop us a message below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
          
          {/* Contact Information (Left Side) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2rem] p-8 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)] h-full flex flex-col justify-center">
              <h3 className="text-2xl font-black text-slate-800 mb-8">Contact Info</h3>
              
              <div className="space-y-8">
                <a href="mailto:info@agecalculatorbox.com" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-[#00a63e]/10 rounded-2xl flex items-center justify-center text-[#00a63e] group-hover:bg-[#00a63e] group-hover:text-white transition-all duration-300 shadow-inner">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Us</p>
                    <p className="text-slate-700 font-bold group-hover:text-[#00a63e] transition-colors">info@agecalculatorbox.com</p>
                  </div>
                </a>

                <a href="tel:+918103420637" className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-inner">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Call Us</p>
                    <p className="text-slate-700 font-bold group-hover:text-blue-500 transition-colors">+91 81034 20637</p>
                  </div>
                </a>

                <div className="flex items-center gap-5 group">
                  <div className="w-14 h-14 bg-orange-500/10 rounded-2xl flex items-center justify-center text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-inner">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Location</p>
                    <p className="text-slate-700 font-bold">Raipur Region, Chhattisgarh</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form (Right Side) */}
          <div className="lg:col-span-7">
            <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-[2rem] p-8 md:p-10 transition-all hover:shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Your Name</label>
                    <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00a63e] focus:bg-white text-slate-800 font-bold px-5 py-4 rounded-2xl outline-none transition-all" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                    <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00a63e] focus:bg-white text-slate-800 font-bold px-5 py-4 rounded-2xl outline-none transition-all" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Subject</label>
                  <input type="text" placeholder="How can we help?" className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00a63e] focus:bg-white text-slate-800 font-bold px-5 py-4 rounded-2xl outline-none transition-all" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-500 ml-1">Message</label>
                  <textarea rows={4} placeholder="Write your message here..." className="w-full bg-slate-50 border-2 border-transparent focus:border-[#00a63e] focus:bg-white text-slate-800 font-bold px-5 py-4 rounded-2xl outline-none transition-all resize-none"></textarea>
                </div>

                <button type="submit" className="w-full bg-slate-900 text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-[#00a63e] hover:shadow-[0_10px_20px_rgba(0,166,62,0.3)] transition-all duration-300 active:scale-95 group">
                  Send Message <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}