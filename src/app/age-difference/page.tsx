"use client";

import React, { useState, useEffect } from "react";
import { User, Users, Calendar, ArrowRightLeft, Award, Clock, CalendarDays, Activity } from 'lucide-react';
import CalcShell from "@/components/calculators/CalcShell";

export default function AgeDifference() {
  // States for Person 1
  const [p1Name, setP1Name] = useState("");
  const [p1Date, setP1Date] = useState("");
  
  // States for Person 2
  const [p2Name, setP2Name] = useState("");
  const [p2Date, setP2Date] = useState("");

  // Result State
  const [result, setResult] = useState<{
    sameAge: boolean;
    olderName?: string;
    youngerName?: string;
    years?: number;
    months?: number;
    days?: number;
    totalDays?: number;
    totalWeeks?: number;
    totalMonths?: number;
  } | null>(null);

  // Deep Calculation Logic (Zero-Timezone Bug)
  useEffect(() => {
    if (!p1Date || !p2Date) {
      setResult(null);
      return;
    }

    const calculateDifference = () => {
      // Bypass timezone issues by splitting the standard YYYY-MM-DD input
      const [y1, m1, d1] = p1Date.split('-').map(Number);
      const [y2, m2, d2] = p2Date.split('-').map(Number);

      const date1 = new Date(y1, m1 - 1, d1);
      const date2 = new Date(y2, m2 - 1, d2);

      let older, younger, olderName, youngerName;

      // Determine who is older (The one born earlier has a smaller timestamp)
      if (date1.getTime() < date2.getTime()) {
        older = date1;
        younger = date2;
        olderName = p1Name.trim() || "First Person";
        youngerName = p2Name.trim() || "Second Person";
      } else if (date2.getTime() < date1.getTime()) {
        older = date2;
        younger = date1;
        olderName = p2Name.trim() || "Second Person";
        youngerName = p1Name.trim() || "First Person";
      } else {
        setResult({ sameAge: true });
        return;
      }

      // Calculate exact difference
      let y = younger.getFullYear() - older.getFullYear();
      let m = younger.getMonth() - older.getMonth();
      let d = younger.getDate() - older.getDate();

      if (d < 0) {
        m--;
        // Get precise days in the month before the younger's birth month
        const prevMonth = new Date(younger.getFullYear(), younger.getMonth(), 0);
        d += prevMonth.getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      // Calculate total milestones
      const diffMs = younger.getTime() - older.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

      setResult({
        sameAge: false,
        olderName,
        youngerName,
        years: y,
        months: m,
        days: d,
        totalDays: totalDays,
        totalWeeks: Math.floor(totalDays / 7),
        totalMonths: (y * 12) + m,
      });
    };

    calculateDifference();
  }, [p1Date, p2Date, p1Name, p2Name]);

  return (
    <CalcShell 
      title="Age Difference" 
      description="Compare the exact age gap between two people in years, months, and days with high precision."
    >
      <div className="space-y-8">
        
        {/* --- INPUT CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
          
          {/* Middle Decorative Icon (Desktop only) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full items-center justify-center shadow-[0_10px_20px_rgba(0,0,0,0.1)] border border-gray-100">
            <ArrowRightLeft size={20} className="text-gray-400" />
          </div>

          {/* Person 1 Input (CodeWebX Green Theme) */}
          <div className="p-6 md:p-8 bg-green-50/50 hover:bg-green-50 rounded-[2rem] border border-green-100/50 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-green-100 text-[#00a63e] rounded-xl">
                <User size={20} />
              </div>
              <span className="font-black uppercase tracking-widest text-sm text-[#00a63e]">Person A</span>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">Custom Label</label>
                <input 
                  type="text" 
                  value={p1Name}
                  onChange={(e) => setP1Name(e.target.value)}
                  placeholder="e.g., Amit" 
                  className="w-full bg-white border border-gray-100 focus:border-[#00a63e] focus:ring-2 focus:ring-[#00a63e]/10 text-gray-900 font-bold py-3.5 px-5 rounded-2xl transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">Date of Birth</label>
                <input 
                  type="date" 
                  value={p1Date}
                  onChange={(e) => setP1Date(e.target.value)}
                  className="w-full bg-white border border-gray-100 focus:border-[#00a63e] focus:ring-2 focus:ring-[#00a63e]/10 text-gray-900 font-bold py-3.5 px-5 rounded-2xl transition-all outline-none uppercase"
                />
              </div>
            </div>
          </div>

          {/* Person 2 Input (Blue Theme) */}
          <div className="p-6 md:p-8 bg-blue-50/50 hover:bg-blue-50 rounded-[2rem] border border-blue-100/50 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full pointer-events-none"></div>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                <Users size={20} />
              </div>
              <span className="font-black uppercase tracking-widest text-sm text-blue-600">Person B</span>
            </div>
            
            <div className="space-y-4 relative z-10">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">Custom Label</label>
                <input 
                  type="text" 
                  value={p2Name}
                  onChange={(e) => setP2Name(e.target.value)}
                  placeholder="e.g., Aditya" 
                  className="w-full bg-white border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-gray-900 font-bold py-3.5 px-5 rounded-2xl transition-all outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-2 mb-1 block">Date of Birth</label>
                <input 
                  type="date" 
                  value={p2Date}
                  onChange={(e) => setP2Date(e.target.value)}
                  className="w-full bg-white border border-gray-100 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 text-gray-900 font-bold py-3.5 px-5 rounded-2xl transition-all outline-none uppercase"
                />
              </div>
            </div>
          </div>

        </div>

        {/* --- RESULTS SECTION --- */}
        <div className="mt-8 transition-all duration-700">
          {!result ? (
            /* Empty State */
            <div className="bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center">
              <Calendar size={40} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Awaiting Dates</h3>
              <p className="text-sm font-medium text-gray-500 mt-2 max-w-sm">
                Enter dates for both individuals to calculate the exact chronological gap between their lives.
              </p>
            </div>
          ) : result.sameAge ? (
            /* Same Age State */
            <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[2.5rem] p-12 text-center text-white shadow-xl relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-4">
                  <Award size={32} />
                </div>
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter">Perfect Match!</h2>
                <p className="font-medium text-white/80 mt-2 text-lg">Both individuals share the exact same age.</p>
              </div>
            </div>
          ) : (
            /* Result State */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Main Comparison Card */}
              <div className="bg-[#121826] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-[#00a63e]/10 blur-[100px] rounded-full pointer-events-none"></div>
                
                {/* Winner Label */}
                <div className="text-center mb-10 relative z-10">
                  <span className="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#00a63e] text-[10px] font-black uppercase tracking-widest mb-4">
                    Result Logic
                  </span>
                  <h2 className="text-2xl md:text-4xl font-bold text-white tracking-tight">
                    <span className="text-[#00a63e] font-black">{result.olderName}</span> is older than <span className="text-blue-400 font-black">{result.youngerName}</span> by:
                  </h2>
                </div>

                {/* Big Numbers */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-10 items-end relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl md:text-8xl font-black text-white tracking-tighter tabular-nums leading-none">{result.years}</span>
                    <span className="text-xs font-bold text-[#00a63e] uppercase tracking-widest mt-3">Years</span>
                  </div>
                  <span className="text-4xl text-white/10 mb-6 font-light hidden sm:block">/</span>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums leading-none">{result.months}</span>
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest mt-3">Months</span>
                  </div>
                  <span className="text-4xl text-white/10 mb-6 font-light hidden sm:block">/</span>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums leading-none">{result.days}</span>
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest mt-3">Days</span>
                  </div>
                </div>
              </div>

              {/* Milestones Card */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm">
                <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                  <Clock size={16} /> Total Chronological Gap
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-2xl p-5 flex flex-col">
                    <CalendarDays size={20} className="text-blue-500 mb-3" />
                    <span className="text-2xl font-black text-gray-900 tracking-tighter tabular-nums">{result.totalMonths?.toLocaleString()}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Total Months</span>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 flex flex-col">
                    <Activity size={20} className="text-purple-500 mb-3" />
                    <span className="text-2xl font-black text-gray-900 tracking-tighter tabular-nums">{result.totalWeeks?.toLocaleString()}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Total Weeks</span>
                  </div>
                  <div className="bg-gray-50 rounded-2xl p-5 flex flex-col">
                    <Calendar size={20} className="text-[#00a63e] mb-3" />
                    <span className="text-2xl font-black text-gray-900 tracking-tighter tabular-nums">{result.totalDays?.toLocaleString()}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">Total Days</span>
                  </div>
                </div>
              </div>

            </div>
          )}
        </div>

      </div>
    </CalcShell>
  );
}