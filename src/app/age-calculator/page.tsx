"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  RotateCcw, 
  BarChart2, 
  TrendingUp,
  CalendarDays,
  Clock,
  Timer
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

export default function AgeCalc() {
  const [dobStr, setDobStr] = useState("");
  const [lockedDate, setLockedDate] = useState<Date | null>(null);
  const [error, setError] = useState("");
  
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  
  const [liveData, setLiveData] = useState({
    totalWeeks: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // New State for Birthday Countdown
  const [bdayData, setBdayData] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    nextDateStr: "",
    isToday: false
  });

  // Auto-format input to DD/MM/YYYY
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, ''); 
    if (val.length > 8) val = val.slice(0, 8); 
    
    if (val.length >= 5) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4, 8)}`;
    } else if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    setDobStr(val);
  };

  const handleCalculate = () => {
    if (dobStr.length !== 10) {
      setError("Please enter a complete date (DD/MM/YYYY)");
      return;
    }

    const [day, month, year] = dobStr.split('/').map(Number);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      setError("Please enter a valid date.");
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    const now = new Date();

    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1) {
      setError("This calendar date doesn't exist.");
      return;
    }

    if (birthDate > now) {
      setError("Date of birth cannot be in the future.");
      return;
    }

    setError("");
    setLockedDate(birthDate);

    // Initial Static Age Calculation
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
  };

  // Live Ticker Engine for Age AND Birthday Countdown
  useEffect(() => {
    if (!lockedDate || !age) return;

    const updateLiveStats = () => {
      const now = new Date();
      const diffMs = now.getTime() - lockedDate.getTime();
      const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      setLiveData({
        totalWeeks: Math.floor(totalDays / 7),
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      });

      // --- NEXT BIRTHDAY LOGIC ---
      const birthMonth = lockedDate.getMonth();
      const birthDay = lockedDate.getDate();
      let nextBday = new Date(now.getFullYear(), birthMonth, birthDay);

      const isBirthdayToday = (now.getMonth() === birthMonth && now.getDate() === birthDay);

      if (now > nextBday && !isBirthdayToday) {
        nextBday.setFullYear(now.getFullYear() + 1);
      }

      const nextDateStr = `${nextBday.getDate().toString().padStart(2, '0')}/${(nextBday.getMonth() + 1).toString().padStart(2, '0')}/${nextBday.getFullYear()}`;

      let bMonths = 0, bDays = 0, bHours = 0, bMins = 0, bSecs = 0;

      if (!isBirthdayToday) {
        bMonths = nextBday.getMonth() - now.getMonth();
        bDays = nextBday.getDate() - now.getDate();
        if (bDays < 0) {
          bMonths--;
          const prevMonth = new Date(nextBday.getFullYear(), nextBday.getMonth(), 0);
          bDays += prevMonth.getDate();
        }
        if (bMonths < 0) {
          bMonths += 12;
        }
        bHours = 23 - now.getHours();
        bMins = 59 - now.getMinutes();
        bSecs = 59 - now.getSeconds();
      }

      setBdayData({
        months: bMonths,
        days: bDays,
        hours: bHours,
        minutes: bMins,
        seconds: bSecs,
        nextDateStr,
        isToday: isBirthdayToday
      });
    };

    updateLiveStats();
    const timer = setInterval(updateLiveStats, 1000);
    return () => clearInterval(timer);
  }, [lockedDate, age]);

  const handleReset = () => {
    setDobStr("");
    setLockedDate(null);
    setAge(null);
    setError("");
  };

  const exactPercentage = age ? Number((((age.years * 365 + age.months * 30 + age.days) / (80 * 365)) * 100).toFixed(1)) : 0;
  const lifePercentage = Math.min(exactPercentage, 100);

  return (
    <CalcShell 
      title="Exact Age Calculator" 
      description="Calculate your precise chronological age, track life progress, and get a live countdown to your next birthday."
    >
      
      <div className="space-y-8 max-w-[600px] mx-auto font-sans">
        
        {/* =========================================
            CARD 1: MAIN INPUT & AGE CALCULATOR
        ========================================= */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] max-w-[400px] mx-auto relative z-20">
          
          <div className="mb-6">
            <label className="block text-slate-700 font-bold mb-2 ml-1 text-[15px]">
              Date of Birth <span className="font-normal text-slate-500">(DD/MM/YYYY)</span>
            </label>
            <input 
              type="text" 
              placeholder="DD/MM/YYYY"
              value={dobStr}
              onChange={handleInputChange}
              className={`w-full text-center text-xl tracking-[0.2em] font-medium text-slate-800 py-3.5 px-6 rounded-full border-2 transition-all outline-none ${error ? 'border-red-400 bg-red-50' : 'border-indigo-500 focus:ring-4 focus:ring-indigo-500/20'}`}
            />
            {error && <p className="text-red-500 text-xs font-bold mt-2 text-center">{error}</p>}
          </div>

          <div className="space-y-3 mb-2">
            <button 
              onClick={handleCalculate}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg py-3.5 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
            >
              <Sparkles size={20} className="text-yellow-300 fill-yellow-300" /> Calculate My Age
            </button>
            <button 
              onClick={handleReset}
              className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-[15px] py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>

          {age && (
            <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-top-4 duration-500 pt-6 border-t border-slate-100">
              <div className="grid grid-cols-3 gap-3">
                {[
                  { value: age.years, label: "YEARS" },
                  { value: age.months, label: "MONTHS" },
                  { value: age.days, label: "DAYS" },
                  { value: liveData.hours.toString().padStart(2, '0'), label: "HOURS" },
                  { value: liveData.minutes.toString().padStart(2, '0'), label: "MINUTES" },
                  { value: liveData.seconds.toString().padStart(2, '0'), label: "SECONDS" },
                ].map((item, index) => (
                  <div key={index} className="bg-[#f3f6ff] rounded-2xl p-4 flex flex-col items-center justify-center border border-indigo-50/50">
                    <span className="text-2xl font-bold text-indigo-900 mb-0.5 tabular-nums">{item.value}</span>
                    <span className="text-[10px] font-medium text-slate-500 tracking-wider">{item.label}</span>
                  </div>
                ))}
              </div>

              <div className="bg-[#fef9e6] rounded-2xl p-4 flex items-center justify-center gap-3">
                <BarChart2 size={20} className="text-emerald-500" />
                <span className="text-[17px] font-bold text-slate-800">
                  Total Weeks: <span className="text-amber-700">{liveData.totalWeeks.toLocaleString()}</span>
                </span>
              </div>

              <div className="pt-2">
                <div className="flex items-center gap-2 text-slate-800 font-bold mb-6">
                  <TrendingUp size={20} className="text-red-400" /> Life Progress <span className="text-slate-500 font-normal text-[13px]">(based on 80 years)</span>
                </div>
                <div className="relative mb-8">
                  <div className="w-full h-3.5 rounded-full flex overflow-hidden">
                    <div className="w-[30%] bg-[#00c853]"></div>
                    <div className="w-[40%] bg-[#ff9100]"></div>
                    <div className="w-[30%] bg-[#ff1744]"></div>
                  </div>
                  <div className="absolute top-1/2 -translate-y-1/2 -ml-5 flex items-center justify-center transition-all duration-1000 ease-out" style={{ left: `${lifePercentage}%` }}>
                    <div className="bg-white border-[3px] border-[#ffb300] text-amber-500 text-[10px] font-black w-10 h-10 rounded-full flex items-center justify-center shadow-md">
                      {Math.floor(lifePercentage)}%
                    </div>
                  </div>
                </div>
                <div className="flex justify-between items-center text-[11px] text-slate-500 mb-6 px-1">
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#7cb342]"></div>0 yrs</span>
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#ffb300]"></div>24 yrs</span>
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-[#e53935]"></div>56 yrs</span>
                  <span className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-slate-700"></div>80 yrs</span>
                </div>
                <div className="text-center pb-2">
                  <h3 className="text-xl font-bold text-slate-800 tracking-tight">Life Lived: {exactPercentage}% of 80 years</h3>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* =========================================
            EMPTY STATE: SEO & FEATURE EXPLANATION
            (This completely hides once a date is calculated)
        ========================================= */}
        {!age && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-center px-4 relative z-10 pt-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-4">
              More Than Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Date of Birth Calculator</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 max-w-xl mx-auto">
              Enter your date of birth above to unlock a personalized chronological dashboard. Our exact age calculator goes beyond simple years and months, giving you real-time insights into your life's journey instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              
              <div className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-[14px] flex items-center justify-center">
                  <Timer size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Live Age Ticker</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Track your exact chronological age in hours, minutes, and live ticking seconds.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-[14px] flex items-center justify-center text-2xl">
                  🎂
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Birthday Countdown</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Get a vibrant, real-time timer tracking exact months and days to your next birthday.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-[14px] flex items-center justify-center">
                  <TrendingUp size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Life Progress</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Visualize your life journey with our intuitive 80-year graphical milestone tracker.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* =========================================
            CARD 2: CLIENT'S NEXT BIRTHDAY WIDGET
        ========================================= */}
        {age && (
          <div className="bg-[#fcfaff] rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-fuchsia-50 max-w-[400px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
            
            {/* Header (Vibrant Gradient) */}
            <div className="bg-gradient-to-r from-[#fc238c] to-[#5951f8] p-5 flex items-center relative">
              <span className="absolute left-6 text-3xl drop-shadow-md">🎂</span>
              <h2 className="text-white font-bold text-2xl text-center w-full leading-tight drop-shadow-sm">
                Next Birthday <br/> Countdown
              </h2>
            </div>

            {/* Body */}
            <div className="p-6 flex flex-col items-center">
              
              {bdayData.isToday ? (
                 <div className="text-center space-y-3 py-6">
                    <div className="text-5xl animate-bounce">🎉🎂✨</div>
                    <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Happy Birthday!</h3>
                    <p className="text-slate-600 font-bold text-lg">Have a wonderful celebration today!</p>
                 </div>
              ) : (
                <>
                  <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-3 mb-6">
                    <CalendarDays size={22} className="text-purple-600" />
                    <span className="text-[#2d3748] font-black text-xl tracking-wide">
                      {bdayData.nextDateStr}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-[#2d3748] font-bold text-[15px] mb-4">
                    <Clock size={18} className="text-[#ff509e]" /> Live Countdown
                  </div>

                  <div className="grid grid-cols-3 gap-3 w-full mb-3">
                    <div className="bg-gradient-to-b from-[#fc238c] to-[#f80860] rounded-2xl p-4 flex flex-col items-center text-white shadow-lg shadow-pink-500/20">
                      <span className="text-4xl font-black tabular-nums tracking-tighter drop-shadow-sm">{bdayData.months}</span>
                      <span className="text-[10px] font-bold uppercase mt-1 tracking-wider opacity-90">Months</span>
                    </div>
                    <div className="bg-gradient-to-b from-[#ab40ff] to-[#9226f3] rounded-2xl p-4 flex flex-col items-center text-white shadow-lg shadow-purple-500/20">
                      <span className="text-4xl font-black tabular-nums tracking-tighter drop-shadow-sm">{bdayData.days}</span>
                      <span className="text-[10px] font-bold uppercase mt-1 tracking-wider opacity-90">Days</span>
                    </div>
                    <div className="bg-gradient-to-b from-[#5966ff] to-[#424ff5] rounded-2xl p-4 flex flex-col items-center text-white shadow-lg shadow-indigo-500/20">
                      <span className="text-4xl font-black tabular-nums tracking-tighter drop-shadow-sm">{bdayData.hours}</span>
                      <span className="text-[10px] font-bold uppercase mt-1 tracking-wider opacity-90">Hours</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 w-full mb-6">
                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-[#2d3748] shadow-sm border border-slate-100">
                      <span className="text-4xl font-black tabular-nums tracking-tighter">{bdayData.minutes}</span>
                      <span className="text-[11px] font-bold uppercase mt-1 tracking-wider text-slate-500">Minutes</span>
                    </div>
                    <div className="bg-white rounded-2xl p-4 flex flex-col items-center text-[#2d3748] shadow-sm border border-slate-100">
                      <span className="text-4xl font-black tabular-nums tracking-tighter">{bdayData.seconds}</span>
                      <span className="text-[11px] font-bold uppercase mt-1 tracking-wider text-slate-500">Seconds</span>
                    </div>
                  </div>

                  <div className="bg-white w-full py-4 px-2 rounded-2xl shadow-sm border border-slate-100 text-center text-[14px] font-medium text-[#2d3748]">
                    That's exactly <span className="text-[#fc238c] font-bold">{bdayData.months} months</span>, <span className="text-[#fc238c] font-bold">{bdayData.days} days</span>, and <span className="text-[#fc238c] font-bold">{bdayData.hours} hours</span> away!
                  </div>
                </>
              )}
            </div>

          </div>
        )}
      </div>
    </CalcShell>
  );
}