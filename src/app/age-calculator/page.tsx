"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  RotateCcw, 
  BarChart2, 
  TrendingUp, 
  CalendarDays,
  Clock,
  Zap,
  Moon,
  Sun,
  Hourglass,
  Star
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

export default function AgeCalc() {
  // Smart Input States (DD/MM/YYYY)
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const dayRef = useRef<HTMLInputElement>(null);
  const monthRef = useRef<HTMLInputElement>(null);
  const yearRef = useRef<HTMLInputElement>(null);

  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [error, setError] = useState("");
  
  const [liveData, setLiveData] = useState({
    totalWeeks: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(val);
    if (val.length === 2) monthRef.current?.focus();
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(val);
    if (val.length === 2) yearRef.current?.focus();
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, field: 'month' | 'year') => {
    if (e.key === 'Backspace') {
      if (field === 'month' && month === '') dayRef.current?.focus();
      if (field === 'year' && year === '') monthRef.current?.focus();
    }
  };

  // Auto Calculate Engine
  useEffect(() => {
    if (day.length === 2 && month.length === 2 && year.length === 4) {
      const d = parseInt(day);
      const m = parseInt(month);
      const y = parseInt(year);

      if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) {
        setError("Invalid date parameters.");
        setAge(null);
        return;
      }

      const birthDate = new Date(y, m - 1, d);
      const now = new Date();

      if (birthDate.getDate() !== d || birthDate.getMonth() !== m - 1) {
        setError("This date doesn't exist.");
        setAge(null);
        return;
      }

      if (birthDate > now) {
        setError("Date cannot be in the future.");
        setAge(null);
        return;
      }

      setError("");

      let calcY = now.getFullYear() - birthDate.getFullYear();
      let calcM = now.getMonth() - birthDate.getMonth();
      let calcD = now.getDate() - birthDate.getDate();

      if (calcD < 0) {
        calcM--;
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        calcD += prevMonth.getDate();
      }
      if (calcM < 0) {
        calcY--;
        calcM += 12;
      }
      setAge({ years: calcY, months: calcM, days: calcD });
    } else {
      setAge(null);
      setError("");
    }
  }, [day, month, year]);

  // Live Engine Update
  useEffect(() => {
    if (!age || day.length !== 2 || month.length !== 2 || year.length !== 4) return;

    const updateLiveStats = () => {
      const birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const now = new Date();
      
      const diffMs = now.getTime() - birthDate.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      setLiveData({
        totalWeeks: Math.floor(totalDays / 7),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });
    };

    updateLiveStats();
    const timer = setInterval(updateLiveStats, 1000);
    return () => clearInterval(timer);
  }, [age, day, month, year]);

  const handleReset = () => {
    setDay("");
    setMonth("");
    setYear("");
    setAge(null);
    setError("");
    dayRef.current?.focus();
  };

  // FIX: Converted the string from .toFixed() back to a Number so Math.min doesn't crash
  const lifePercentage = age ? Math.min(Number(((age.years / 80) * 100).toFixed(1)), 100) : 0;

  return (
    <CalcShell 
      title="Age Calculator" 
      description="Experience your exact age in real-time with our premium live engine."
    >
      <div className="max-w-md mx-auto bg-gradient-to-b from-[#131c2f] to-[#0b1120] p-6 md:p-8 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(6,182,212,0.15)] border border-slate-700/60 border-t-cyan-500/40 relative overflow-hidden group">
        
        {/* Animated Neon Background Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-64 h-64 bg-fuchsia-600/20 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-64 h-64 bg-cyan-600/20 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute top-[40%] left-[30%] w-32 h-32 bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* --- SMART CYBER INPUT --- */}
        <div className="relative z-10 mb-6">
          <div className="flex items-center justify-between mb-3">
            <label className="flex items-center gap-2 text-sm font-black tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              <CalendarDays size={18} className="text-cyan-400" />
              Birth Date
            </label>
            <span className="text-[10px] font-black text-cyan-200/50 bg-cyan-900/30 border border-cyan-500/20 px-2.5 py-1 rounded-full uppercase tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.2)]">
              Auto-Calc
            </span>
          </div>
          
          <div className={`relative flex items-center justify-between p-1.5 bg-black/40 rounded-2xl transition-all shadow-[inset_0_4px_10px_rgba(0,0,0,0.6)] overflow-hidden ${error ? 'border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2),inset_0_4px_10px_rgba(0,0,0,0.6)]' : 'border border-slate-700/50 focus-within:border-cyan-500/50 focus-within:shadow-[0_0_25px_rgba(6,182,212,0.2),inset_0_4px_10px_rgba(0,0,0,0.6)]'}`}>
            <input 
              ref={dayRef} type="text" placeholder="DD" value={day} onChange={handleDayChange}
              className="w-full text-center text-3xl font-black text-white bg-transparent outline-none placeholder:text-slate-600 py-3"
            />
            <span className="text-4xl font-light text-slate-700">/</span>
            <input 
              ref={monthRef} type="text" placeholder="MM" value={month} onChange={handleMonthChange} onKeyDown={(e) => handleKeyDown(e, 'month')}
              className="w-full text-center text-3xl font-black text-white bg-transparent outline-none placeholder:text-slate-600 py-3"
            />
            <span className="text-4xl font-light text-slate-700">/</span>
            <input 
              ref={yearRef} type="text" placeholder="YYYY" value={year} onChange={handleYearChange} onKeyDown={(e) => handleKeyDown(e, 'year')}
              className="w-full text-center text-3xl font-black text-white bg-transparent outline-none placeholder:text-slate-600 py-3"
            />
          </div>
          {error && <p className="text-red-400 text-[11px] font-bold mt-3 ml-2 flex items-center gap-1.5 animate-pulse"><RotateCcw size={12}/> {error}</p>}
        </div>

        {/* --- RESET BUTTON --- */}
        {(day || month || year) && !age && (
          <button 
            onClick={handleReset}
            className="w-full mb-6 bg-slate-800/50 border border-slate-700/50 text-slate-300 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700/80 hover:text-white hover:shadow-lg transition-all active:scale-95 relative z-10"
          >
            <RotateCcw size={16} /> Clear Fields
          </button>
        )}

        {/* --- VIBRANT RESULTS SECTION --- */}
        {age && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-500 relative z-10">
            
            {/* Colorful 6-Block Grid with Icons & Gradients */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: age.years, label: "YEARS", icon: <Star size={14}/>, border: "border-fuchsia-500/30", bg: "bg-fuchsia-500/10", text: "from-fuchsia-300 to-pink-500", glow: "shadow-[0_10px_20px_rgba(217,70,239,0.15)]" },
                { value: age.months, label: "MONTHS", icon: <Moon size={14}/>, border: "border-indigo-500/30", bg: "bg-indigo-500/10", text: "from-indigo-300 to-blue-500", glow: "shadow-[0_10px_20px_rgba(99,102,241,0.15)]" },
                { value: age.days, label: "DAYS", icon: <Sun size={14}/>, border: "border-emerald-500/30", bg: "bg-emerald-500/10", text: "from-emerald-300 to-teal-500", glow: "shadow-[0_10px_20px_rgba(16,185,129,0.15)]" },
                { value: liveData.hours.toString().padStart(2, '0'), label: "HOURS", icon: <Hourglass size={14}/>, border: "border-amber-500/30", bg: "bg-amber-500/10", text: "from-amber-300 to-orange-500", glow: "shadow-[0_10px_20px_rgba(245,158,11,0.15)]" },
                { value: liveData.minutes.toString().padStart(2, '0'), label: "MINUTES", icon: <Clock size={14}/>, border: "border-violet-500/30", bg: "bg-violet-500/10", text: "from-violet-300 to-purple-500", glow: "shadow-[0_10px_20px_rgba(139,92,246,0.15)]" },
                { value: liveData.seconds.toString().padStart(2, '0'), label: "SECONDS", icon: <Zap size={14}/>, border: "border-cyan-500/30", bg: "bg-cyan-500/10", text: "from-cyan-300 to-blue-500", glow: "shadow-[0_10px_20px_rgba(6,182,212,0.15)]" },
              ].map((item, index) => (
                <div key={index} className={`${item.bg} ${item.border} ${item.glow} rounded-[1.5rem] p-3 md:p-4 flex flex-col items-center justify-center border relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300`}>
                  <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className={`text-white/40 mb-1.5 group-hover:text-white transition-colors`}>{item.icon}</div>
                  <span className={`text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b ${item.text} mb-1 tabular-nums drop-shadow-md leading-none`}>
                    {item.value}
                  </span>
                  <span className="text-[8px] md:text-[10px] font-black text-white/50 tracking-[0.2em] uppercase mt-1">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Glowing Total Weeks Block */}
            <div className="bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-rose-500/20 rounded-[1.5rem] p-4 flex items-center justify-center gap-3 border border-amber-500/40 shadow-[0_10px_30px_rgba(245,158,11,0.2)] relative overflow-hidden group hover:scale-[1.02] transition-transform">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
              <div className="bg-black/40 p-2.5 rounded-xl border border-amber-500/30 shadow-inner relative z-10"><BarChart2 size={20} className="text-amber-400" /></div>
              <span className="relative z-10 text-lg font-bold text-amber-100/90">
                Total Weeks: <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 font-black text-2xl tracking-tight ml-1 drop-shadow-md">{liveData.totalWeeks.toLocaleString()}</span>
              </span>
            </div>

            {/* Neon Life Progress Bar Section */}
            <div className="pt-2 space-y-4 bg-black/30 backdrop-blur-xl p-5 rounded-[1.5rem] border border-white/10 relative overflow-hidden shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl rounded-full"></div>
              
              <div className="flex items-center justify-between text-slate-300 font-bold relative z-10">
                <div className="flex items-center gap-2">
                  <TrendingUp size={18} className="text-cyan-400" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-400 font-black uppercase tracking-widest text-sm drop-shadow-sm">Life Progress</span>
                </div>
                <span className="text-cyan-200/60 font-black text-[10px] bg-cyan-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30 uppercase tracking-widest shadow-[0_0_10px_rgba(6,182,212,0.2)]">80 Yrs Max</span>
              </div>
              
              <div className="relative pt-6 pb-2 z-10">
                {/* Background Segmented Bar */}
                <div className="w-full h-3.5 rounded-full flex overflow-hidden bg-black border border-slate-700 shadow-[inset_0_4px_6px_rgba(0,0,0,0.8)]">
                  <div className="w-[30%] bg-gradient-to-r from-emerald-600 to-emerald-400 border-r border-slate-900"></div>
                  <div className="w-[40%] bg-gradient-to-r from-amber-600 to-amber-400 border-r border-slate-900"></div>
                  <div className="w-[30%] bg-gradient-to-r from-red-600 to-rose-400"></div>
                </div>

                {/* Progress Indicator Marker */}
                <div 
                  className="absolute top-0 -ml-5 flex flex-col items-center transition-all duration-1000 ease-out z-20"
                  style={{ left: `${lifePercentage}%` }}
                >
                  <div className="bg-[#0f172a] text-cyan-400 text-[11px] font-black px-3 py-1 rounded-lg shadow-[0_10px_25px_rgba(6,182,212,0.8)] mb-1 border border-cyan-400 relative flex items-center justify-center">
                    {lifePercentage}%
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[5px] border-r-[5px] border-t-[6px] border-transparent border-t-cyan-400"></div>
                  </div>
                </div>

                {/* Stylish Legend */}
                <div className="flex justify-between items-center text-[9px] text-slate-400 font-black mt-4 px-1 uppercase tracking-widest">
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>0</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.5)]"></div>24</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]"></div>56</span>
                  <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-slate-500"></div>80</span>
                </div>
              </div>
            </div>

            {/* Minimalist Reset Option Below Results */}
            <div className="pt-2 flex justify-center relative z-10">
               <button 
                onClick={handleReset}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-cyan-400 flex items-center gap-1.5 transition-colors"
               >
                 <RotateCcw size={12} /> Calculate New Date
               </button>
            </div>

          </div>
        )}

        {/* Graphical Empty State */}
        {!age && !error && (
            <div className="h-40 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-3xl bg-black/20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] mt-6 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cyber-pattern.png')] opacity-5 group-hover:opacity-10 transition-opacity"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                    <Clock size={32} className="text-slate-600 mb-3 animate-pulse" />
                    <p className="text-sm font-bold text-slate-500">Waiting for your birth date</p>
                    <p className="text-xs text-slate-600 mt-1">Live engine will start instantly.</p>
                </div>
            </div>
        )}
      </div>
    </CalcShell>
  );
}