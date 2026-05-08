"use client";

import React, { useState, useEffect } from "react";
import { 
  Rocket, 
  Sparkles, 
  AlertCircle, 
  CalendarClock, 
  Hourglass,
  CalendarDays,
  RotateCcw,
  Star,
  Moon,
  Sun,
  ArrowRightLeft,
  Timer,
  FastForward
} from 'lucide-react';
import CalcShell from "@/components/calculators/CalcShell";

export default function FutureAge() {
  const [dobStr, setDobStr] = useState("");
  const [targetStr, setTargetStr] = useState("");
  
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    daysToWait: number;
    isPast: boolean;
  } | null>(null);

  // Auto-format input to DD/MM/YYYY
  const formatInput = (val: string) => {
    let v = val.replace(/\D/g, ''); 
    if (v.length > 8) v = v.slice(0, 8); 
    
    if (v.length >= 5) {
      return `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4, 8)}`;
    } else if (v.length >= 3) {
      return `${v.slice(0, 2)}/${v.slice(2)}`;
    }
    return v;
  };

  // Auto-Calculate Engine
  const handleCalculate = () => {
    if (dobStr.length !== 10 || targetStr.length !== 10) {
      setError("Please enter complete dates for both fields (DD/MM/YYYY)");
      return;
    }

    const [bDay, bMonth, bYear] = dobStr.split('/').map(Number);
    const [fDay, fMonth, fYear] = targetStr.split('/').map(Number);

    // Validation
    if (bDay < 1 || bDay > 31 || bMonth < 1 || bMonth > 12 || bYear < 1900 || bYear > 2100 ||
        fDay < 1 || fDay > 31 || fMonth < 1 || fMonth > 12 || fYear < 1900 || fYear > 2100) {
      setError("Invalid date parameters detected.");
      setResult(null); 
      return;
    }

    const birthDate = new Date(bYear, bMonth - 1, bDay);
    const targetDate = new Date(fYear, fMonth - 1, fDay);
    const now = new Date();

    if (birthDate.getDate() !== bDay || targetDate.getDate() !== fDay) {
      setError("A calendar date entered doesn't exist.");
      setResult(null); 
      return;
    }

    if (targetDate < birthDate) {
      setError("Target date cannot be before your birth date.");
      setResult(null); 
      return;
    }

    setError("");

    let y = targetDate.getFullYear() - birthDate.getFullYear();
    let m = targetDate.getMonth() - birthDate.getMonth();
    let d = targetDate.getDate() - birthDate.getDate();

    if (d < 0) {
      m--;
      const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      d += prevMonth.getDate();
    }
    if (m < 0) { y--; m += 12; }

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffMsFromToday = targetDate.getTime() - today.getTime();
    const daysToWait = Math.ceil(diffMsFromToday / (1000 * 60 * 60 * 24));

    setResult({
      years: y, months: m, days: d,
      daysToWait: daysToWait,
      isPast: daysToWait < 0
    });
  };

  const handleReset = () => {
    setDobStr(""); 
    setTargetStr("");
    setResult(null); 
    setError("");
  };

  return (
    <CalcShell 
      title="Future Age Predictor" 
      description="Time-travel to any date and simulate exactly how old you will be with high precision."
    >
      <div className="max-w-[800px] mx-auto font-sans space-y-8">
        
        {/* =========================================
            MAIN DUAL INPUT WIDGET
        ========================================= */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
            
            {/* Middle Decorative Icon (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full items-center justify-center border border-blue-100 shadow-md text-blue-500">
              <ArrowRightLeft size={20} />
            </div>

            {/* DOB INPUT */}
            <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 p-5 rounded-3xl border border-emerald-50 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-2.5 bg-white text-emerald-500 rounded-xl shadow-sm border border-emerald-100"><CalendarDays size={18} /></div>
                <span className="font-black uppercase tracking-widest text-xs text-emerald-600">Origin Point</span>
              </div>
              
              <div className="space-y-2 relative z-10">
                <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Your Date of Birth</label>
                <input 
                  type="text" placeholder="DD/MM/YYYY" value={dobStr} onChange={(e) => setDobStr(formatInput(e.target.value))}
                  className="w-full text-center text-xl tracking-[0.15em] font-black text-slate-800 py-3.5 px-5 rounded-2xl border-2 border-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* TARGET DATE INPUT */}
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-5 rounded-3xl border border-blue-50 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-2.5 bg-white text-blue-500 rounded-xl shadow-sm border border-blue-100"><Rocket size={18} /></div>
                <span className="font-black uppercase tracking-widest text-xs text-blue-600">Target Point</span>
              </div>
              
              <div className="space-y-2 relative z-10">
                <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Future Target Date</label>
                <input 
                  type="text" placeholder="DD/MM/YYYY" value={targetStr} onChange={(e) => setTargetStr(formatInput(e.target.value))}
                  className="w-full text-center text-xl tracking-[0.15em] font-black text-slate-800 py-3.5 px-5 rounded-2xl border-2 border-white focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

          </div>

          {error && <p className="text-red-500 text-xs font-bold mb-6 text-center bg-red-50 py-2 rounded-xl border border-red-100"><AlertCircle size={14} className="inline mr-1"/> {error}</p>}

          {/* --- BUTTONS --- */}
          <div className="flex flex-col md:flex-row gap-3 max-w-[500px] mx-auto">
            <button 
              onClick={handleCalculate}
              className="w-full md:w-2/3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-[16px] py-4 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              <Sparkles size={18} className="text-yellow-300 fill-yellow-300" /> Initialize Time Travel
            </button>
            <button 
              onClick={handleReset}
              className="w-full md:w-1/3 bg-white border-2 border-slate-100 text-slate-600 font-bold text-[15px] py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* =========================================
            EMPTY STATE: SEO & FEATURE EXPLANATION
        ========================================= */}
        {!result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-center px-4 relative z-10 pt-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-4">
              The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Future Age Predictor</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
              Want to know exactly how old you will be in 2050? Or maybe you want to calculate your age on a specific upcoming milestone. Simply enter your birth date and any future date to simulate your exact chronological age instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[800px] mx-auto">
              
              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-[14px] flex items-center justify-center border border-blue-100">
                  <Rocket size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Time Travel Math</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Project your age decades into the future with absolute timezone-aware precision.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-[14px] flex items-center justify-center border border-purple-100">
                  <FastForward size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Milestone Projection</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Get a deep breakdown of your future age translated into exact years, months, and days.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-[14px] flex items-center justify-center border border-emerald-100">
                  <Timer size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Distance Tracker</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Instantly see how many exact days are left until you reach that future milestone from today.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* =========================================
            VIBRANT RESULTS SECTION
        ========================================= */}
        {result && (
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[800px] mx-auto border border-slate-50">
            
            {/* Projection Logic Card */}
            <div className="text-center mb-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-6 rounded-3xl border border-blue-100">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
                Projection Locked
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-slate-600 tracking-tight leading-relaxed">
                On that target date, you will exactly be:
              </h2>
            </div>

            {/* Main 3-Block Grid (Years, Months, Days) */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8">
              {[
                { value: result.years, label: "YEARS", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                { value: result.months, label: "MONTHS", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
                { value: result.days, label: "DAYS", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
              ].map((item, index) => (
                <div key={index} className={`${item.bg} rounded-3xl p-5 md:p-8 flex flex-col items-center justify-center border ${item.border} shadow-sm transition-transform hover:-translate-y-1`}>
                  <span className={`text-4xl md:text-6xl font-black ${item.color} mb-2 tabular-nums tracking-tighter drop-shadow-sm`}>
                    {item.value}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Wait Time / Distance Tracker Box */}
            <div className={`rounded-[1.5rem] p-6 md:p-8 border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group ${result.isPast ? 'bg-slate-50 border-slate-200' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className={`p-4 rounded-2xl border bg-white shadow-sm ${result.isPast ? 'text-slate-400 border-slate-200' : 'text-blue-500 border-blue-100'}`}>
                  {result.isPast ? <CalendarClock size={28} /> : <Hourglass size={28} className="animate-pulse" />}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                    {result.isPast ? "Status: Time Elapsed" : "Status: Approaching"}
                  </h3>
                  <p className="text-slate-700 font-bold mt-1 text-sm md:text-base">
                    {result.isPast 
                      ? "This date has already passed in real-time." 
                      : "Distance in days to reach this target age."}
                  </p>
                </div>
              </div>
              
              <div className="text-center md:text-right w-full md:w-auto relative z-10 bg-white md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-none border-slate-100">
                <span className={`text-4xl md:text-5xl font-black tracking-tighter tabular-nums drop-shadow-sm ${result.isPast ? 'text-slate-500' : 'text-blue-600'}`}>
                  {Math.abs(result.daysToWait).toLocaleString()}
                </span>
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">
                  {result.isPast ? "Days Ago" : "Days to Go"}
                </span>
              </div>
            </div>

          </div>
        )}

      </div>
    </CalcShell>
  );
}