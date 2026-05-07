"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  RotateCcw, 
  BarChart2, 
  TrendingUp, 
  CalendarDays,
  Target,
  Clock,
  Sparkles,
  Zap,
  Moon,
  Sun,
  Hourglass,
  Star,
  User,
  Users,
  ArrowRightLeft
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

export default function AgeDifference() {
  // States for Person A
  const [p1Name, setP1Name] = useState("");
  const [d1, setD1] = useState("");
  const [m1, setM1] = useState("");
  const [y1, setY1] = useState("");
  
  const d1Ref = useRef<HTMLInputElement>(null);
  const m1Ref = useRef<HTMLInputElement>(null);
  const y1Ref = useRef<HTMLInputElement>(null);

  // States for Person B
  const [p2Name, setP2Name] = useState("");
  const [d2, setD2] = useState("");
  const [m2, setM2] = useState("");
  const [y2, setY2] = useState("");

  const d2Ref = useRef<HTMLInputElement>(null);
  const m2Ref = useRef<HTMLInputElement>(null);
  const y2Ref = useRef<HTMLInputElement>(null);

  // Result States
  const [error, setError] = useState("");
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
    totalHours?: number;
    totalMinutes?: number;
    totalSeconds?: number;
    gapPercentage?: number; // Visual timeline representation
  } | null>(null);

  // Smart Input Handlers for P1
  const handleD1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setD1(val);
    if (val.length === 2) m1Ref.current?.focus();
  };
  const handleM1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setM1(val);
    if (val.length === 2) y1Ref.current?.focus();
  };
  const handleY1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4); setY1(val);
    if (val.length === 4) d2Ref.current?.focus(); // Jump to Person B
  };

  // Smart Input Handlers for P2
  const handleD2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setD2(val);
    if (val.length === 2) m2Ref.current?.focus();
  };
  const handleM2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2); setM2(val);
    if (val.length === 2) y2Ref.current?.focus();
  };
  const handleY2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4); setY2(val);
  };

  // Backspace Logic
  const handleKD = (e: React.KeyboardEvent<HTMLInputElement>, field: string) => {
    if (e.key === 'Backspace') {
      if (field === 'm1' && m1 === '') d1Ref.current?.focus();
      if (field === 'y1' && y1 === '') m1Ref.current?.focus();
      if (field === 'd2' && d2 === '') y1Ref.current?.focus();
      if (field === 'm2' && m2 === '') d2Ref.current?.focus();
      if (field === 'y2' && y2 === '') m2Ref.current?.focus();
    }
  };

  // Core Calculation Engine (Runs when both dates are fully entered)
  useEffect(() => {
    if (d1.length === 2 && m1.length === 2 && y1.length === 4 && d2.length === 2 && m2.length === 2 && y2.length === 4) {
      
      const p1d = parseInt(d1), p1m = parseInt(m1), p1y = parseInt(y1);
      const p2d = parseInt(d2), p2m = parseInt(m2), p2y = parseInt(y2);

      // Validation
      if (p1d < 1 || p1d > 31 || p1m < 1 || p1m > 12 || p2d < 1 || p2d > 31 || p2m < 1 || p2m > 12) {
        setError("Invalid date parameters detected."); setResult(null); return;
      }

      const date1 = new Date(p1y, p1m - 1, p1d);
      const date2 = new Date(p2y, p2m - 1, p2d);

      if (date1.getDate() !== p1d || date2.getDate() !== p2d) {
        setError("A date entered doesn't exist (e.g., 31 Feb)."); setResult(null); return;
      }

      setError("");
      let older, younger, olderName, youngerName;

      // Determine Older/Younger
      if (date1.getTime() < date2.getTime()) {
        older = date1; younger = date2;
        olderName = p1Name.trim() || "Person A";
        youngerName = p2Name.trim() || "Person B";
      } else if (date2.getTime() < date1.getTime()) {
        older = date2; younger = date1;
        olderName = p2Name.trim() || "Person B";
        youngerName = p1Name.trim() || "Person A";
      } else {
        setResult({ sameAge: true }); return;
      }

      // Calculate Gap
      let y = younger.getFullYear() - older.getFullYear();
      let m = younger.getMonth() - older.getMonth();
      let d = younger.getDate() - older.getDate();

      if (d < 0) {
        m--;
        const prevMonth = new Date(younger.getFullYear(), younger.getMonth(), 0);
        d += prevMonth.getDate();
      }
      if (m < 0) { y--; m += 12; }

      // Extensive Data Calculation
      const diffMs = younger.getTime() - older.getTime();
      const tDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      // Calculate max possible gap (say 100 years = 36500 days) for progress bar
      const gapPercentage = Math.min((tDays / 36500) * 100, 100);

      setResult({
        sameAge: false,
        olderName,
        youngerName,
        years: y, months: m, days: d,
        totalDays: tDays,
        totalWeeks: Math.floor(tDays / 7),
        totalMonths: (y * 12) + m,
        totalHours: tDays * 24,
        totalMinutes: tDays * 24 * 60,
        totalSeconds: tDays * 24 * 60 * 60,
        gapPercentage
      });
    } else {
      setResult(null); setError("");
    }
  }, [d1, m1, y1, d2, m2, y2, p1Name, p2Name]);

  const handleReset = () => {
    setD1(""); setM1(""); setY1(""); setP1Name("");
    setD2(""); setM2(""); setY2(""); setP2Name("");
    setResult(null); setError("");
    d1Ref.current?.focus();
  };

  return (
    <CalcShell 
      title="Age Difference Engine" 
      description="Compare life timelines and discover the exact chronological gap between two individuals."
    >
      {/* Ultra-Premium Container */}
      <div className="max-w-3xl mx-auto bg-gradient-to-b from-[#131c2f] to-[#0b1120] p-6 md:p-10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] border border-slate-700/60 border-t-cyan-500/40 relative overflow-hidden group">
        
        {/* Animated Background Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>

        {/* --- DUAL INPUT SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
          
          {/* Middle Decorative Icon */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-[#0f172a] rounded-full items-center justify-center border border-slate-700/50 shadow-[0_0_20px_rgba(0,0,0,0.8)]">
            <ArrowRightLeft size={20} className="text-cyan-400" />
          </div>

          {/* PERSON A */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/10 text-emerald-400 rounded-lg border border-emerald-500/20"><User size={16} /></div>
                <span className="font-black uppercase tracking-widest text-sm text-emerald-400">Person A</span>
              </div>
            </div>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Name (Optional)" value={p1Name} onChange={(e) => setP1Name(e.target.value)}
                className="w-full bg-black/40 border border-slate-700/50 focus:border-emerald-500/50 text-white font-bold py-3 px-4 rounded-xl outline-none placeholder:text-slate-600 transition-all shadow-inner"
              />
              <div className="flex items-center justify-between p-1 bg-black/40 rounded-xl border border-slate-700/50 focus-within:border-emerald-500/50 transition-all shadow-inner">
                <input ref={d1Ref} type="text" placeholder="DD" value={d1} onChange={handleD1} className="w-full text-center text-xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-2" />
                <span className="text-slate-700">/</span>
                <input ref={m1Ref} type="text" placeholder="MM" value={m1} onChange={handleM1} onKeyDown={(e)=>handleKD(e,'m1')} className="w-full text-center text-xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-2" />
                <span className="text-slate-700">/</span>
                <input ref={y1Ref} type="text" placeholder="YYYY" value={y1} onChange={handleY1} onKeyDown={(e)=>handleKD(e,'y1')} className="w-full text-center text-xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-2" />
              </div>
            </div>
          </div>

          {/* PERSON B */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-6 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)]">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20"><Users size={16} /></div>
                <span className="font-black uppercase tracking-widest text-sm text-blue-400">Person B</span>
              </div>
            </div>
            <div className="space-y-4">
              <input 
                type="text" placeholder="Name (Optional)" value={p2Name} onChange={(e) => setP2Name(e.target.value)}
                className="w-full bg-black/40 border border-slate-700/50 focus:border-blue-500/50 text-white font-bold py-3 px-4 rounded-xl outline-none placeholder:text-slate-600 transition-all shadow-inner"
              />
              <div className="flex items-center justify-between p-1 bg-black/40 rounded-xl border border-slate-700/50 focus-within:border-blue-500/50 transition-all shadow-inner">
                <input ref={d2Ref} type="text" placeholder="DD" value={d2} onChange={handleD2} onKeyDown={(e)=>handleKD(e,'d2')} className="w-full text-center text-xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-2" />
                <span className="text-slate-700">/</span>
                <input ref={m2Ref} type="text" placeholder="MM" value={m2} onChange={handleM2} onKeyDown={(e)=>handleKD(e,'m2')} className="w-full text-center text-xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-2" />
                <span className="text-slate-700">/</span>
                <input ref={y2Ref} type="text" placeholder="YYYY" value={y2} onChange={handleY2} onKeyDown={(e)=>handleKD(e,'y2')} className="w-full text-center text-xl font-black text-white bg-transparent outline-none placeholder:text-slate-700 py-2" />
              </div>
            </div>
          </div>

        </div>

        {error && <p className="text-red-400 text-center text-sm font-bold mb-6 animate-pulse bg-red-500/10 py-2 rounded-lg border border-red-500/20">{error}</p>}

        {/* --- RESET BUTTON --- */}
        {(d1 || m1 || y1 || d2 || m2 || y2) && !result && (
          <button onClick={handleReset} className="w-full max-w-xs mx-auto mb-6 bg-slate-800/50 border border-slate-700/50 text-slate-400 py-3 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700/80 hover:text-white transition-all active:scale-95 relative z-10">
            <RotateCcw size={16} /> Reset Engine
          </button>
        )}

        {/* --- VIBRANT RESULTS SECTION --- */}
        {result && (
          <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 relative z-10 border-t border-slate-800/50 pt-8">
            
            {result.sameAge ? (
              <div className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 p-8 rounded-3xl text-center border border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Target size={40} className="text-emerald-400 mx-auto mb-4 animate-bounce" />
                <h2 className="text-3xl font-black text-white tracking-tight">Perfect Match!</h2>
                <p className="text-emerald-200/70 mt-2">Both individuals share the exact same timeline.</p>
              </div>
            ) : (
              <>
                {/* Winner Logic Card */}
                <div className="text-center mb-8 bg-[#0f172a] p-6 rounded-3xl border border-white/5 shadow-inner">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-[10px] font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                    Calculation Locked
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-300 tracking-tight leading-relaxed">
                    <span className="text-emerald-400 font-black drop-shadow-md border-b-2 border-emerald-500/30 pb-0.5">{result.olderName}</span> 
                    {" is older than "} 
                    <span className="text-blue-400 font-black drop-shadow-md border-b-2 border-blue-500/30 pb-0.5">{result.youngerName}</span> 
                    {" by:"}
                  </h2>
                </div>

                {/* Main 3-Block Grid (Years, Months, Days) */}
                <div className="grid grid-cols-3 gap-3 md:gap-6">
                  {[
                    { value: result.years, label: "YEARS", icon: <Star size={16}/>, border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10", text: "from-fuchsia-300 to-pink-500", glow: "shadow-[0_10px_20px_rgba(217,70,239,0.15)]" },
                    { value: result.months, label: "MONTHS", icon: <Moon size={16}/>, border: "border-indigo-500/30", bg: "bg-indigo-500/10", text: "from-indigo-300 to-blue-500", glow: "shadow-[0_10px_20px_rgba(99,102,241,0.15)]" },
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

                {/* Extensive Data Grid (Total Months, Weeks, Days, etc.) */}
                <div className="pt-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 flex items-center gap-2 ml-2">
                    <BarChart2 size={14} /> Total Chronological Gap
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[
                      { label: "Total Months", value: result.totalMonths, color: "text-pink-400" },
                      { label: "Total Weeks", value: result.totalWeeks, color: "text-blue-400" },
                      { label: "Total Days", value: result.totalDays, color: "text-emerald-400" },
                      { label: "Total Hours", value: result.totalHours, color: "text-amber-400" },
                      { label: "Total Mins", value: result.totalMinutes, color: "text-violet-400" },
                      { label: "Total Secs", value: result.totalSeconds, color: "text-cyan-400" },
                    ].map((item, i) => (
                      <div key={i} className="bg-black/30 border border-white/5 rounded-2xl p-4 flex flex-col items-center justify-center shadow-inner group hover:bg-black/50 transition-colors">
                        <span className={`text-xl font-black ${item.color} tabular-nums mb-1`}>{item.value?.toLocaleString()}</span>
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline Progress Bar representing the Gap */}
                <div className="bg-[#0f172a] p-6 rounded-3xl border border-white/5 shadow-inner mt-4">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-xs font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                      <TrendingUp size={14} className="text-amber-400" /> Timeline Gap
                    </span>
                  </div>
                  <div className="w-full h-3 bg-black rounded-full overflow-hidden border border-slate-800 shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-orange-500 relative"
                      style={{ width: `${result.gapPercentage}%` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full bg-white/20 animate-pulse"></div>
                    </div>
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-500 mt-3 tracking-wide">
                    Visual representation of the age difference span.
                  </p>
                </div>

                {/* Reset Button */}
                <div className="pt-4 flex justify-center">
                  <button onClick={handleReset} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 flex items-center gap-1.5 transition-colors">
                    <RotateCcw size={12} /> Compare New Dates
                  </button>
                </div>

              </>
            )}
          </div>
        )}

      </div>
    </CalcShell>
  );
}