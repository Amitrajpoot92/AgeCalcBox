"use client";

import React, { useState, useEffect } from "react";
import { 
  Calendar, 
  Clock, 
  HeartPulse, 
  Target, 
  Activity,
  CalendarDays,
  Sparkles,
  CheckCircle2
} from "lucide-react";

import CalcShell from "@/components/calculators/CalcShell";

export default function AgeCalc() {
  const [dob, setDob] = useState<string>("");
  const [parsedDateText, setParsedDateText] = useState<string>("");
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  const [liveData, setLiveData] = useState({
    totalMonths: 0,
    totalWeeks: 0,
    totalDays: 0,
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
  });
  const [nextBdayDays, setNextBdayDays] = useState<number | null>(null);

  // Deep Calculation Logic - Timezone Bulletproofed
  useEffect(() => {
    if (!dob) {
      setAge(null);
      setParsedDateText("");
      return;
    }

    const calculateExactAge = () => {
      // FIX: Splitting string to bypass UTC/Local timezone bugs
      const [year, month, day] = dob.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const now = new Date();

      if (birthDate > now) {
        setAge(null); // Invalid future date
        setParsedDateText("Invalid Future Date");
        return;
      }

      // Display what date the engine actually locked onto
      setParsedDateText(birthDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }));

      // Exact Age Calculation (Years, Months, Days)
      let y = now.getFullYear() - birthDate.getFullYear();
      let m = now.getMonth() - birthDate.getMonth();
      let d = now.getDate() - birthDate.getDate();

      if (d < 0) {
        m--;
        // Get precise days in the previous month
        const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
        d += prevMonth.getDate();
      }
      if (m < 0) {
        y--;
        m += 12;
      }
      setAge({ years: y, months: m, days: d });

      // Next Birthday Calculation
      let nextBday = new Date(now.getFullYear(), birthDate.getMonth(), birthDate.getDate());
      if (now > nextBday) {
        nextBday.setFullYear(now.getFullYear() + 1);
      }
      const diffTimeBday = Math.abs(nextBday.getTime() - now.getTime());
      setNextBdayDays(Math.ceil(diffTimeBday / (1000 * 60 * 60 * 24)));
    };

    calculateExactAge();
  }, [dob]);

  // Live Ticker Logic (Runs every second)
  useEffect(() => {
    if (!dob) return;
    
    const updateLiveStats = () => {
      const [year, month, day] = dob.split('-').map(Number);
      const birthDate = new Date(year, month - 1, day);
      const now = new Date();
      
      if (birthDate > now) return;

      const diffMs = now.getTime() - birthDate.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      setLiveData({
        totalMonths: (now.getFullYear() - birthDate.getFullYear()) * 12 + (now.getMonth() - birthDate.getMonth()),
        totalWeeks: Math.floor(totalDays / 7),
        totalDays: totalDays,
        totalHours: Math.floor(diffMs / (1000 * 60 * 60)),
        totalMinutes: Math.floor(diffMs / (1000 * 60)),
        totalSeconds: Math.floor(diffMs / 1000),
      });
    };

    updateLiveStats(); // Initial call
    const timer = setInterval(updateLiveStats, 1000);

    return () => clearInterval(timer);
  }, [dob]);

  return (
    <CalcShell 
      title="Age Calculator" 
      description="Calculate your exact age down to the second with our high-precision live engine."
    >
      <div className="space-y-8">
        
        {/* --- 1. INPUT SECTION --- */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00a63e]/5 blur-3xl rounded-full"></div>
          <label className="block text-sm font-black uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
            <Calendar size={16} className="text-[#00a63e]" />
            Enter Date of Birth
          </label>
          <div className="relative z-10">
            <input 
              type="date" 
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="w-full bg-gray-50 border-2 border-transparent hover:border-[#00a63e]/30 focus:border-[#00a63e] focus:bg-white focus:ring-4 focus:ring-[#00a63e]/10 text-gray-900 text-xl font-bold py-4 px-6 rounded-2xl transition-all outline-none"
            />
            
            {/* NEW: Date Confirmation Helper so user knows what month was parsed */}
            {parsedDateText && age && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#00a63e]/10 border border-[#00a63e]/20 text-[#00a63e] rounded-xl text-xs font-bold tracking-wide">
                <CheckCircle2 size={16} />
                Engine Locked: {parsedDateText}
              </div>
            )}
          </div>
        </div>

        {/* --- 2. RESULTS SECTION --- */}
        {age ? (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Main Age Result Card */}
            <div className="bg-gray-900 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden text-center shadow-2xl">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#00a63e]/20 blur-[80px] rounded-full pointer-events-none"></div>
              
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full mb-8">
                <div className="w-2 h-2 rounded-full bg-[#00a63e] animate-pulse"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Exact Age</span>
              </div>

              <div className="flex flex-wrap justify-center gap-4 md:gap-8 items-end relative z-10">
                <div className="flex flex-col">
                  <span className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">{age.years}</span>
                  <span className="text-sm font-bold text-[#00a63e] uppercase tracking-widest mt-2">Years</span>
                </div>
                <span className="text-4xl text-white/20 mb-6 font-light">/</span>
                <div className="flex flex-col">
                  <span className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">{age.months}</span>
                  <span className="text-sm font-bold text-white/60 uppercase tracking-widest mt-2">Months</span>
                </div>
                <span className="text-4xl text-white/20 mb-6 font-light">/</span>
                <div className="flex flex-col">
                  <span className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none">{age.days}</span>
                  <span className="text-sm font-bold text-white/60 uppercase tracking-widest mt-2">Days</span>
                </div>
              </div>
            </div>

            {/* Live Ticker & Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Live Seconds Counter */}
              <div className="bg-[#00a63e] rounded-[2rem] p-8 text-white relative overflow-hidden group hover:shadow-[0_20px_40px_rgba(0,166,62,0.3)] transition-all duration-500">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div className="flex items-center gap-2 mb-6">
                    <Clock size={20} className="animate-spin-slow" />
                    <span className="text-xs font-black uppercase tracking-widest text-white/80">Live Seconds</span>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-black tracking-tighter tabular-nums">
                      {liveData.totalSeconds.toLocaleString()}
                    </div>
                    <p className="text-sm font-medium text-white/80 mt-2">Breaths taken & moments lived.</p>
                  </div>
                </div>
              </div>

              {/* Next Birthday Countdown */}
              <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm group hover:border-[#00a63e]/30 transition-all duration-500 flex flex-col justify-between">
                <div className="flex items-center gap-2 mb-6">
                  <Target size={20} className="text-[#00a63e]" />
                  <span className="text-xs font-black uppercase tracking-widest text-gray-400">Next Birthday</span>
                </div>
                <div>
                  <div className="flex items-end gap-2">
                    <span className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter">
                      {nextBdayDays}
                    </span>
                    <span className="text-lg font-bold text-gray-400 mb-1">Days</span>
                  </div>
                  {/* Progress bar towards next birthday */}
                  <div className="w-full bg-gray-100 h-2 rounded-full mt-4 overflow-hidden">
                    <div 
                      className="bg-[#00a63e] h-full rounded-full transition-all duration-1000"
                      style={{ width: `${Math.max(0, 100 - ((nextBdayDays || 0) / 365) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Total Milestones Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: "Total Months", value: liveData.totalMonths, icon: <CalendarDays size={16} /> },
                { label: "Total Weeks", value: liveData.totalWeeks, icon: <Activity size={16} /> },
                { label: "Total Days", value: liveData.totalDays, icon: <Sparkles size={16} /> },
                { label: "Total Hours", value: liveData.totalHours, icon: <HeartPulse size={16} /> },
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 border border-gray-100 rounded-2xl p-5 hover:bg-white hover:shadow-lg transition-all">
                  <div className="text-gray-400 mb-3">{item.icon}</div>
                  <div className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter tabular-nums">
                    {item.value.toLocaleString()}
                  </div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mt-1">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          /* --- EMPTY STATE --- */
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2.5rem] text-gray-400 bg-gray-50/50">
            <Clock size={40} className="text-gray-300 mb-4" />
            <p className="font-bold text-gray-500">Waiting for your Date of Birth</p>
            <p className="text-sm font-medium mt-1">Our live engine is ready.</p>
          </div>
        )}
      </div>
    </CalcShell>
  );
}