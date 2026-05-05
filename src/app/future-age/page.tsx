"use client";

import React, { useState, useEffect } from "react";
import { 
  CalendarDays, 
  Rocket, 
  Sparkles, 
  AlertCircle, 
  CalendarClock, 
  Hourglass
} from 'lucide-react';
import CalcShell from "@/components/calculators/CalcShell";

export default function FutureAge() {
  const [dob, setDob] = useState("");
  const [futureDate, setFutureDate] = useState("");
  const [error, setError] = useState("");
  
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    daysToWait: number;
    isPast: boolean;
  } | null>(null);

  // Deep Calculation Logic - Timezone Bulletproofed
  useEffect(() => {
    if (!dob || !futureDate) {
      setResult(null);
      setError("");
      return;
    }

    const calculateFutureAge = () => {
      // Bypass timezone issues by splitting standard YYYY-MM-DD input
      const [bYear, bMonth, bDay] = dob.split('-').map(Number);
      const [fYear, fMonth, fDay] = futureDate.split('-').map(Number);

      const birthDate = new Date(bYear, bMonth - 1, bDay);
      const targetDate = new Date(fYear, fMonth - 1, fDay);
      const now = new Date();

      // Validation: Target date cannot be before Date of Birth
      if (targetDate < birthDate) {
        setError("Target date cannot be before your Date of Birth.");
        setResult(null);
        return;
      }
      
      setError("");

      // Calculate Exact Age on that Future Date
      let y = targetDate.getFullYear() - birthDate.getFullYear();
      let m = targetDate.getMonth() - birthDate.getMonth();
      let d = targetDate.getDate() - birthDate.getDate();

      if (d < 0) {
        m--;
        // Precise days in the previous month of the target date
        const prevMonth = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
        d += prevMonth.getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }

      // Calculate how many days user has to wait from TODAY
      // Resetting 'now' hours to strictly compare dates
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const diffMsFromToday = targetDate.getTime() - today.getTime();
      const daysToWait = Math.ceil(diffMsFromToday / (1000 * 60 * 60 * 24));

      setResult({
        years: y,
        months: m,
        days: d,
        daysToWait: daysToWait,
        isPast: daysToWait < 0 // Tells if the target date has already passed
      });
    };

    calculateFutureAge();
  }, [dob, futureDate]);

  return (
    <CalcShell 
      title="Future Age Predictor" 
      description="Find out exactly how old you will be at any point in the future or on a specific milestone date."
    >
      <div className="space-y-8">
        
        {/* --- INPUT SECTION --- */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-[#00a63e]/5 blur-3xl rounded-full"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 relative z-10">
            
            {/* Current DOB Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                <CalendarDays size={16} className="text-[#00a63e]" />
                Your Date of Birth
              </label>
              <input 
                type="date" 
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#00a63e] focus:bg-white focus:ring-4 focus:ring-[#00a63e]/10 text-gray-900 text-lg font-bold outline-none transition-all uppercase"
              />
            </div>

            {/* Target Future Date Input */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-500 ml-1">
                <Rocket size={16} className="text-blue-500" />
                Target Future Date
              </label>
              <input 
                type="date" 
                value={futureDate}
                onChange={(e) => setFutureDate(e.target.value)}
                className="w-full p-4 bg-blue-50/30 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 text-gray-900 text-lg font-bold outline-none transition-all uppercase"
              />
            </div>

          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 flex items-center justify-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm font-bold animate-in fade-in">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </div>

        {/* --- RESULTS SECTION --- */}
        <div className="transition-all duration-700">
          {!result && !error ? (
            /* Empty State */
            <div className="bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center h-64">
              <Rocket size={40} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Time Machine Ready</h3>
              <p className="text-sm font-medium text-gray-500 mt-2 max-w-xs">
                Enter your DOB and a future date to simulate your age.
              </p>
            </div>
          ) : result && !error ? (
            /* Result Dashboard */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Main Age Card */}
              <div className="bg-[#121826] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00a63e]/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="text-center mb-10 relative z-10">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <Sparkles size={12} /> Projected Age
                  </span>
                  <h2 className="text-xl md:text-3xl font-bold text-white tracking-tight">
                    On that date, you will be:
                  </h2>
                </div>

                {/* Big Numbers Grid */}
                <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-end relative z-10">
                  <div className="flex flex-col items-center">
                    <span className="text-6xl md:text-8xl font-black text-white tracking-tighter tabular-nums leading-none drop-shadow-lg">{result.years}</span>
                    <span className="text-xs font-bold text-[#00a63e] uppercase tracking-widest mt-3">Years</span>
                  </div>
                  <span className="text-4xl text-white/10 mb-6 font-light hidden sm:block">/</span>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums leading-none drop-shadow-lg">{result.months}</span>
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest mt-3">Months</span>
                  </div>
                  <span className="text-4xl text-white/10 mb-6 font-light hidden sm:block">/</span>
                  <div className="flex flex-col items-center">
                    <span className="text-5xl md:text-7xl font-black text-white tracking-tighter tabular-nums leading-none drop-shadow-lg">{result.days}</span>
                    <span className="text-xs font-bold text-white/50 uppercase tracking-widest mt-3">Days</span>
                  </div>
                </div>
              </div>

              {/* Countdown / Wait Time Card */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-6 md:p-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className={`p-4 rounded-2xl ${result.isPast ? 'bg-gray-100 text-gray-500' : 'bg-[#00a63e]/10 text-[#00a63e]'}`}>
                    {result.isPast ? <CalendarClock size={28} /> : <Hourglass size={28} className="animate-pulse" />}
                  </div>
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400">
                      {result.isPast ? "Time Elapsed" : "Waiting Period"}
                    </h3>
                    <p className="text-gray-900 font-bold mt-1">
                      {result.isPast 
                        ? "This date has already passed in real-time." 
                        : "Days remaining from today to reach this age."}
                    </p>
                  </div>
                </div>
                
                <div className="text-center md:text-right bg-gray-50 md:bg-transparent w-full md:w-auto p-4 md:p-0 rounded-2xl">
                  <span className="text-4xl font-black text-gray-900 tracking-tighter tabular-nums">
                    {Math.abs(result.daysToWait).toLocaleString()}
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                    {result.isPast ? "Days Ago" : "Days to Go"}
                  </span>
                </div>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </CalcShell>
  );
}