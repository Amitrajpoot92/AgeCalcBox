"use client";

import React, { useState, useEffect, useRef } from "react";
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
  Sun
} from 'lucide-react';
import CalcShell from "@/components/calculators/CalcShell";

export default function FutureAge() {
  // Smart Input States (DD/MM/YYYY) for DOB
  const [bDay, setBDay] = useState("");
  const [bMonth, setBMonth] = useState("");
  const [bYear, setBYear] = useState("");
  
  const bdRef = useRef<HTMLInputElement>(null);
  const bmRef = useRef<HTMLInputElement>(null);
  const byRef = useRef<HTMLInputElement>(null);

  // Smart Input States (DD/MM/YYYY) for Future Target Date
  const [fDay, setFDay] = useState("");
  const [fMonth, setFMonth] = useState("");
  const [fYear, setFYear] = useState("");

  const fdRef = useRef<HTMLInputElement>(null);
  const fmRef = useRef<HTMLInputElement>(null);
  const fyRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    daysToWait: number;
    isPast: boolean;
  } | null>(null);

  // Smart Input Handlers for DOB
  const handleBD = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setBDay(val);
    if (val.length === 2) bmRef.current?.focus();
  };
  const handleBM = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setBMonth(val);
    if (val.length === 2) byRef.current?.focus();
  };
  const handleBY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4); setBYear(val);
    if (val.length === 4) fdRef.current?.focus(); // Jump to Target Date
  };

  // Smart Input Handlers for Future Date
  const handleFD = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setFDay(val);
    if (val.length === 2) fmRef.current?.focus();
  };
  const handleFM = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setFMonth(val);
    if (val.length === 2) fyRef.current?.focus();
  };
  const handleFY = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4); setFYear(val);
  };

  // Backspace Handling
  const handleKD = (e: React.KeyboardEvent<HTMLInputElement>, field: string) => {
    if (e.key === 'Backspace') {
      if (field === 'bm' && bMonth === '') bdRef.current?.focus();
      if (field === 'by' && bYear === '') bmRef.current?.focus();
      if (field === 'fd' && fDay === '') byRef.current?.focus();
      if (field === 'fm' && fMonth === '') fdRef.current?.focus();
      if (field === 'fy' && fYear === '') fmRef.current?.focus();
    }
  };

  // Auto-Calculate Engine
  useEffect(() => {
    if (bDay.length === 2 && bMonth.length === 2 && bYear.length === 4 && fDay.length === 2 && fMonth.length === 2 && fYear.length === 4) {
      
      const p1d = parseInt(bDay), p1m = parseInt(bMonth), p1y = parseInt(bYear);
      const p2d = parseInt(fDay), p2m = parseInt(fMonth), p2y = parseInt(fYear);

      if (p1d < 1 || p1d > 31 || p1m < 1 || p1m > 12 || p2d < 1 || p2d > 31 || p2m < 1 || p2m > 12) {
        setError("Invalid date parameters detected."); setResult(null); return;
      }

      const birthDate = new Date(p1y, p1m - 1, p1d);
      const targetDate = new Date(p2y, p2m - 1, p2d);
      const now = new Date();

      if (birthDate.getDate() !== p1d || targetDate.getDate() !== p2d) {
        setError("A date entered doesn't exist (e.g., 31 Feb)."); setResult(null); return;
      }

      if (targetDate < birthDate) {
        setError("Target date cannot be before your birth date."); setResult(null); return;
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
    } else {
      setResult(null); setError("");
    }
  }, [bDay, bMonth, bYear, fDay, fMonth, fYear]);

  const handleReset = () => {
    setBDay(""); setBMonth(""); setBYear("");
    setFDay(""); setFMonth(""); setFYear("");
    setResult(null); setError("");
    bdRef.current?.focus();
  };

  return (
    <CalcShell 
      title="Future Age Predictor" 
      description="Time-travel to any date and simulate exactly how old you will be."
    >
      {/* Ultra-Premium 3D Elevated Container */}
      <div className="max-w-2xl mx-auto bg-gradient-to-b from-[#131c2f] to-[#0b1120] p-6 md:p-10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(59,130,246,0.15)] border border-slate-700/60 border-t-blue-500/40 relative overflow-hidden group">
        
        {/* Animated Cyber Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-emerald-600/20 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>

        {/* --- DUAL CYBER INPUT SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
          
          {/* Middle Rocket Icon (Desktop) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#0f172a] rounded-full items-center justify-center border border-slate-700/50 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <Rocket size={20} className="text-blue-400" />
          </div>

          {/* DOB Input Box */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20"><CalendarDays size={16} /></div>
              <span className="font-black uppercase tracking-widest text-sm text-emerald-400">Date of Birth</span>
            </div>
            <div className="flex items-center justify-between p-1 bg-black/40 rounded-xl border border-slate-700/50 focus-within:border-emerald-500/50 transition-all shadow-inner">
              <input ref={bdRef} type="text" placeholder="DD" value={bDay} onChange={handleBD} className="w-full text-center text-2xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-3" />
              <span className="text-2xl font-light text-slate-700">/</span>
              <input ref={bmRef} type="text" placeholder="MM" value={bMonth} onChange={handleBM} onKeyDown={(e)=>handleKD(e,'bm')} className="w-full text-center text-2xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-3" />
              <span className="text-2xl font-light text-slate-700">/</span>
              <input ref={byRef} type="text" placeholder="YYYY" value={bYear} onChange={handleBY} onKeyDown={(e)=>handleKD(e,'by')} className="w-full text-center text-2xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-3" />
            </div>
          </div>

          {/* Target Future Date Input Box */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20"><Rocket size={16} /></div>
              <span className="font-black uppercase tracking-widest text-sm text-blue-400">Target Date</span>
            </div>
            <div className="flex items-center justify-between p-1 bg-black/40 rounded-xl border border-slate-700/50 focus-within:border-blue-500/50 transition-all shadow-inner">
              <input ref={fdRef} type="text" placeholder="DD" value={fDay} onChange={handleFD} onKeyDown={(e)=>handleKD(e,'fd')} className="w-full text-center text-2xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-3" />
              <span className="text-2xl font-light text-slate-700">/</span>
              <input ref={fmRef} type="text" placeholder="MM" value={fMonth} onChange={handleFM} onKeyDown={(e)=>handleKD(e,'fm')} className="w-full text-center text-2xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-3" />
              <span className="text-2xl font-light text-slate-700">/</span>
              <input ref={fyRef} type="text" placeholder="YYYY" value={fYear} onChange={handleFY} onKeyDown={(e)=>handleKD(e,'fy')} className="w-full text-center text-2xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-3" />
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 text-center text-sm font-bold mb-6 animate-pulse bg-red-500/10 py-2 rounded-lg border border-red-500/20"><AlertCircle size={14} className="inline mr-1"/> {error}</p>}

        {/* --- RESET BUTTON --- */}
        {(bDay || bMonth || bYear || fDay || fMonth || fYear) && !result && (
          <button onClick={handleReset} className="w-full max-w-xs mx-auto mb-6 bg-slate-800/50 border border-slate-700/50 text-slate-400 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700/80 hover:text-white transition-all active:scale-95 relative z-10">
            <RotateCcw size={16} /> Abort Time Travel
          </button>
        )}

        {/* --- VIBRANT CYBER DASHBOARD --- */}
        <div className="transition-all duration-700 relative z-10">
          {!result && !error ? (
            /* Sci-Fi Empty State */
            <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-3xl bg-black/20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] mt-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 group-hover:opacity-30 transition-opacity animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                    <Rocket size={40} className="text-blue-500/50 mb-3 animate-bounce" />
                    <p className="text-lg font-black tracking-tight text-slate-400">Awaiting Coordinates</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Enter dates to initialize jump.</p>
                </div>
            </div>
          ) : result && !error ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 border-t border-slate-800/50 pt-8 mt-4">
              
              <div className="text-center mb-6">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                  <Sparkles size={12} /> Projection Locked
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-300 tracking-tight">
                  On that date, you will exactly be:
                </h2>
              </div>

              {/* Main 3-Block Grid (Years, Months, Days) */}
              <div className="grid grid-cols-3 gap-3 md:gap-6">
                {[
                  { value: result.years, label: "YEARS", icon: <Star size={16}/>, border: "border-blue-500/30", bg: "bg-blue-500/10", text: "from-blue-300 to-indigo-500", glow: "shadow-[0_10px_20px_rgba(59,130,246,0.15)]" },
                  { value: result.months, label: "MONTHS", icon: <Moon size={16}/>, border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10", text: "from-fuchsia-300 to-pink-500", glow: "shadow-[0_10px_20px_rgba(217,70,239,0.15)]" },
                  { value: result.days, label: "DAYS", icon: <Sun size={16}/>, border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "from-emerald-300 to-teal-500", glow: "shadow-[0_10px_20px_rgba(16,185,129,0.15)]" },
                ].map((item, index) => (
                  <div key={index} className={`${item.bg} ${item.border} ${item.glow} rounded-[1.5rem] p-4 md:p-6 flex flex-col items-center justify-center border relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
                    <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="text-white/40 mb-2 group-hover:text-white transition-colors">{item.icon}</div>
                    <span className={`text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b ${item.text} mb-1 tabular-nums drop-shadow-lg leading-none`}>
                      {item.value}
                    </span>
                    <span className="text-[10px] md:text-xs font-black text-white/50 tracking-[0.2em] uppercase mt-2">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Glowing Wait Time / Radar Box */}
              <div className="bg-[#0f172a] rounded-[1.5rem] p-5 md:p-8 border border-white/5 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
                {/* Radar Sweep Effect */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,rgba(59,130,246,0)_0%,rgba(59,130,246,0.1)_50%,rgba(59,130,246,0)_100%)] animate-spin-slow opacity-50 pointer-events-none"></div>

                <div className="flex items-center gap-5 relative z-10">
                  <div className={`p-4 rounded-2xl border ${result.isPast ? 'bg-slate-800/50 border-slate-700/50 text-slate-500' : 'bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)]'}`}>
                    {result.isPast ? <CalendarClock size={28} /> : <Hourglass size={28} className="animate-pulse" />}
                  </div>
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                      {result.isPast ? "Status: Time Elapsed" : "Status: Approaching"}
                    </h3>
                    <p className="text-slate-300 font-bold mt-1 text-sm md:text-base">
                      {result.isPast 
                        ? "This date has already passed in real-time." 
                        : "Distance in days to reach this target age."}
                    </p>
                  </div>
                </div>
                
                <div className="text-center md:text-right w-full md:w-auto relative z-10">
                  <span className={`text-4xl md:text-5xl font-black tracking-tighter tabular-nums drop-shadow-lg ${result.isPast ? 'text-slate-500' : 'text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-indigo-500'}`}>
                    {Math.abs(result.daysToWait).toLocaleString()}
                  </span>
                  <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mt-2">
                    {result.isPast ? "Days Ago" : "Days to Go"}
                  </span>
                </div>
              </div>

              {/* Reset Tool */}
              <div className="pt-2 flex justify-center">
                  <button onClick={handleReset} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                    <RotateCcw size={12} /> Jump to new date
                  </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </CalcShell>
  );
}