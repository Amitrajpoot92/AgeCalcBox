"use client";

import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  RotateCcw, 
  BarChart2, 
  TrendingUp,
  CalendarDays,
  Clock,
  Timer,
  Target,
  MessageCircle,
  Copy,
  Check
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

export default function AgeCalc() {
  const [dobStr, setDobStr] = useState("");
  const [currentDateStr, setCurrentDateStr] = useState(""); // Naya State: Optional Target Date ke liye
  const [lockedDate, setLockedDate] = useState<Date | null>(null);
  const [customNowDate, setCustomNowDate] = useState<Date | null>(null); // Naya State: Target date lock karne ke liye
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  
  const [age, setAge] = useState<{ years: number; months: number; days: number } | null>(null);
  
  const [liveData, setLiveData] = useState({
    totalWeeks: 0,
    totalDays: 0,
    totalHours: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [bdayData, setBdayData] = useState({
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    nextDateStr: "",
    isToday: false
  });

  // STATE FOR MILESTONE
  const [milestoneData, setMilestoneData] = useState({
    targetAge: 0,
    years: 0,
    months: 0,
    days: 0,
    isReached: false
  });

  // NAYA EFFECT: Initial render par reference image ke mutabik real current date auto-fill karne ke liye 🚀
  useEffect(() => {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    setCurrentDateStr(`${dd}/${mm}/${yyyy}`);
  }, []);

  // Auto-format input to DD/MM/YYYY
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: "dob" | "current") => {
    let val = e.target.value.replace(/\D/g, ''); 
    if (val.length > 8) val = val.slice(0, 8); 
    
    if (val.length >= 5) {
      val = `${val.slice(0, 2)}/${val.slice(2, 4)}/${val.slice(4, 8)}`;
    } else if (val.length >= 3) {
      val = `${val.slice(0, 2)}/${val.slice(2)}`;
    }
    
    if (type === "dob") {
      setDobStr(val);
    } else {
      setCurrentDateStr(val);
    }
  };

  const handleCalculate = () => {
    if (dobStr.length !== 10) {
      setError("Please enter a complete Date of Birth (DD/MM/YYYY)");
      return;
    }

    const [day, month, year] = dobStr.split('/').map(Number);

    if (day < 1 || day > 31 || month < 1 || month > 12 || year < 1900 || year > 2100) {
      setError("Please enter a valid Date of Birth.");
      return;
    }

    const birthDate = new Date(year, month - 1, day);
    
    // --- Naya Optional Current Date Logic ---
    let targetNow = new Date(); 
    if (currentDateStr.trim().length > 0) {
      if (currentDateStr.length !== 10) {
        setError("Please enter a complete Current Date (DD/MM/YYYY) or leave it empty.");
        return;
      }
      const [cDay, cMonth, cYear] = currentDateStr.split('/').map(Number);
      if (cDay < 1 || cDay > 31 || cMonth < 1 || cMonth > 12 || cYear < 1900 || cYear > 2100) {
        setError("Please enter a valid Current Target Date.");
        return;
      }
      // Agar custom date target aaj ka hi din h toh current real time hours save rkhein taaki loop dynamic chalta rhe 🚀
      const todayCheck = new Date();
      if (cDay === todayCheck.getDate() && (cMonth - 1) === todayCheck.getMonth() && cYear === todayCheck.getFullYear()) {
        targetNow = todayCheck;
      } else {
        targetNow = new Date(cYear, cMonth - 1, cDay, 23, 59, 59); // Custom static target end point
      }
    }

    if (birthDate.getDate() !== day || birthDate.getMonth() !== month - 1) {
      setError("This calendar date doesn't exist.");
      return;
    }

    if (birthDate > targetNow) {
      setError("Date of birth cannot be in the future relative to the target current date.");
      return;
    }

    setError("");
    setLockedDate(birthDate);
    // Custom target input check alignment
    const isCustomActive = currentDateStr.trim().length > 0;
    const todayCheck = new Date();
    const [cDay, cMonth, cYear] = isCustomActive ? currentDateStr.split('/').map(Number) : [0,0,0];
    const isTodayCustom = isCustomActive && cDay === todayCheck.getDate() && (cMonth - 1) === todayCheck.getMonth() && cYear === todayCheck.getFullYear();

    setCustomNowDate(isCustomActive && !isTodayCustom ? targetNow : null);
    setCopied(false);

    // Initial Static Age Calculation
    let calcY = targetNow.getFullYear() - birthDate.getFullYear();
    let calcM = targetNow.getMonth() - birthDate.getMonth();
    let calcD = targetNow.getDate() - birthDate.getDate();

    if (calcD < 0) {
      calcM--;
      const prevMonth = new Date(targetNow.getFullYear(), targetNow.getMonth(), 0);
      calcD += prevMonth.getDate();
    }
    if (calcM < 0) {
      calcY--;
      calcM += 12;
    }
    setAge({ years: calcY, months: calcM, days: calcD });
  };

  // Live Ticker Engine for Age AND Birthday Countdown AND Milestone
  useEffect(() => {
    if (!lockedDate || !age) return;

    const updateLiveStats = () => {
      // Live dynamic execution loop alignment 🚀
      const now = customNowDate ? new Date(customNowDate) : new Date();
      const diffMs = now.getTime() - lockedDate.getTime();
      
      const totalDaysCalc = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      const totalHoursCalc = Math.floor(diffMs / (1000 * 60 * 60));
      
      setLiveData({
        totalWeeks: Math.floor(totalDaysCalc / 7),
        totalDays: totalDaysCalc,
        totalHours: totalHoursCalc,
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

      // --- FIXED MILESTONE LOGIC (Years, Months, Days) ---
      let targetAge = age.years < 18 ? 18 : age.years < 50 ? 50 : 80;
      const targetDate = new Date(lockedDate.getFullYear() + targetAge, lockedDate.getMonth(), lockedDate.getDate());

      if (now < targetDate) {
        let mYears = targetDate.getFullYear() - now.getFullYear();
        let mMonths = targetDate.getMonth() - now.getMonth();
        let mDays = targetDate.getDate() - now.getDate();

        if (mDays < 0) {
          mMonths--;
          const prevTemp = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
          mDays += prevTemp.getDate();
        }
        if (mMonths < 0) {
          mYears--;
          mMonths += 12;
        }

        setMilestoneData({
          targetAge,
          years: mYears,
          months: mMonths,
          days: mDays,
          isReached: false
        });
      } else {
        setMilestoneData({ targetAge, years: 0, months: 0, days: 0, isReached: true });
      }
    };

    updateLiveStats();
    // Live countdown update engine alignment loop
    const timer = !customNowDate ? setInterval(updateLiveStats, 1000) : undefined;
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [lockedDate, age, customNowDate]);

  const handleReset = () => {
    setDobStr("");
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    setCurrentDateStr(`${dd}/${mm}/${yyyy}`);
    setLockedDate(null);
    setCustomNowDate(null);
    setAge(null);
    setError("");
    setCopied(false);
  };

  // SHARE & COPY LOGIC
  const generateShareText = () => {
    if (!age) return "";
    
    let text = `*My Exact Age Details* 🎂\n\n`;
    text += `Current Age: ${age.years} Years, ${age.months} Months, ${age.days} Days\n`;
    text += `Total Time: ${liveData.totalWeeks.toLocaleString()} Weeks | ${liveData.totalDays.toLocaleString()} Days\n\n`;
    
    if (!milestoneData.isReached) {
      text += `🎯 Road to ${milestoneData.targetAge} Years:\n`;
      text += `${milestoneData.years > 0 ? milestoneData.years + ' Years, ' : ''}${milestoneData.months} Months, ${milestoneData.days} Days to go!\n\n`;
    }
    
    text += `🎈 Next Birthday:\n`;
    if (bdayData.isToday) {
      text += `It's my birthday today! 🎉\n\n`;
    } else {
      text += `${bdayData.nextDateStr} (in ${bdayData.months}M, ${bdayData.days}D)\n\n`;
    }
    
    text += `Calculate yours instantly at Age Calculator Box: https://agecalculatorbox.com/age-calculator-online`;
    return text;
  };

  const handleWhatsAppShare = () => {
    const text = generateShareText();
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleCopy = () => {
    const text = generateShareText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const exactPercentage = age ? Number((((age.years * 365 + age.months * 30 + age.days) / (80 * 365)) * 100).toFixed(1)) : 0;
  const lifePercentage = Math.min(exactPercentage, 100);

  return (
    <CalcShell 
      title="" 
      description=""
    >
      
      {/* COMPACTED RESPONSIVE WRAPPER: Vertical heights squeezed to fix single mobile viewport layout */}
      <div className={`mx-auto font-sans transition-all duration-500 w-full px-2 md:px-4 lg:px-8 ${age ? 'max-w-6xl' : 'max-w-[460px]'}`}>
        
        {/* PREMIUM GRADIENT HEADLINE SECTION */}
        <div className="text-center mb-4 md:mb-6 mt-0.5">
          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-100 shadow-sm px-2.5 py-0.5 rounded-full text-[10px] font-bold text-[#00a63e] tracking-wide mb-2">
            <Sparkles size={11} className="fill-[#00a63e]" /> CURATED MARKETPLACE
          </div>
          <h1 className="text-2xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
            Age Calculator<span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-sm"> online.</span>
          </h1>
          <p className="text-slate-500 font-medium text-[11px] md:text-base max-w-xl mx-auto mt-1 leading-relaxed">
            Calculate your exact age in years, months, days, hours, minutes, and live seconds instantly with accurate real-time results.
          </p>
        </div>

        {/* Simple 2-column grid layout */}
        <div className={`grid grid-cols-1 ${age ? 'lg:grid-cols-2 gap-5 lg:gap-10 items-start' : 'gap-5'}`}>
          
          {/* =========================================
              CARD 1: COMPACT MAIN INPUT & AGE CALCULATOR (Left Side)
          ========================================= */}
          <div className="bg-white p-3.5 md:p-7 rounded-[1.5rem] shadow-[0_8px_30px_rgba(0,0,0,0.02)] w-full relative z-20 border border-slate-50">
            
            {/* FIELD 1: Date of Birth */}
            <div className="mb-3">
              <label className="block text-slate-700 font-bold mb-1 ml-0.5 text-xs">
                DATE OF BIRTH <span className="font-normal text-slate-400">(DD/MM/YYYY)</span>
              </label>
              <input 
                type="text" 
                placeholder="DD/MM/YYYY"
                value={dobStr}
                onChange={(e) => handleInputChange(e, "dob")}
                className={`w-full text-center text-base tracking-[0.12em] font-bold text-slate-800 py-2 rounded-full border-2 transition-all outline-none ${error && dobStr.length !== 10 ? 'border-red-400 bg-red-50' : 'border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
              />
            </div>

            {/* FIELD 2: Optional Target Current Date */}
            <div className="mb-4">
              <label className="block text-slate-700 font-bold mb-1 ml-0.5 text-xs">
                AGE AT THE DATE OF<span className="font-normal text-slate-400">(DD/MM/YYYY)</span>
              </label>
              <input 
                type="text" 
                placeholder="DD/MM/YYYY"
                value={currentDateStr}
                onChange={(e) => handleInputChange(e, "current")}
                className="w-full text-center text-base tracking-[0.12em] font-bold text-slate-800 py-2 rounded-full border-2 border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none"
              />
              {error && <p className="text-red-500 text-[11px] font-bold mt-2 text-center bg-red-50 py-1 rounded-xl border border-red-100">{error}</p>}
            </div>

            {/* COMPACT BUTTON LAYOUT: Fits input controls and CTA button in one single frame view */}
            <div className="space-y-2 mb-0.5">
              <button 
                type="button"
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:shadow-md transition-all active:scale-[0.98] shadow-sm"
              >
                <Sparkles size={16} className="text-yellow-300 fill-yellow-300" /> Calculate My Age
              </button>
              {age && (
                <button 
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-white border border-slate-200 text-slate-500 font-bold text-xs py-2 rounded-full flex items-center justify-center gap-1 hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  <RotateCcw size={12} /> Reset
                </button>
              )}
            </div>

            {age && (
              <div className="space-y-4 mt-5 animate-in fade-in slide-in-from-top-4 duration-500 pt-5 border-t border-slate-100">
                
                {/* 🚀 REAL-TIME COUNTDOWN BREAKDOWN: Grid outputs ticking dynamic time sync values properly */}
                <div className="grid grid-cols-3 gap-2 md:gap-4">
                  {[
                    { value: age.years, label: "YEARS" },
                    { value: age.months, label: "MONTHS" },
                    { value: age.days, label: "DAYS" },
                    { value: liveData.hours.toString().padStart(2, '0'), label: "HOURS" },
                    { value: liveData.minutes.toString().padStart(2, '0'), label: "MINUTES" },
                    { value: liveData.seconds.toString().padStart(2, '0'), label: "SECONDS" },
                  ].map((item, index) => (
                    <div key={index} className="bg-[#f3f6ff] rounded-xl p-2.5 md:p-5 flex flex-col items-center justify-center border border-indigo-50/40">
                      <span className="text-lg md:text-3xl font-black text-indigo-900 mb-0.5 tabular-nums">{item.value}</span>
                      <span className="text-[9px] md:text-xs font-bold text-slate-400 tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-3 mt-3">
                  <div className="bg-[#fef9e6] rounded-xl p-2.5 flex items-center justify-between px-4 border border-amber-100">
                    <div className="flex items-center gap-2">
                      <BarChart2 size={15} className="text-amber-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-600">Total Weeks</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-amber-700">{liveData.totalWeeks.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#f0fdf4] rounded-xl p-2.5 flex items-center justify-between px-4 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={15} className="text-emerald-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-600">Total Days</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-emerald-700">{liveData.totalDays.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#f5f3ff] rounded-xl p-2.5 flex items-center justify-between px-4 border border-purple-100">
                    <div className="flex items-center gap-2">
                      <Clock size={15} className="text-purple-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-600">Total Hours</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-purple-700">{liveData.totalHours.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-1.5">
                  <div className="flex items-center gap-2 text-slate-800 font-bold mb-3 text-sm">
                    <TrendingUp size={16} className="text-red-400" /> Life Journey Progress <span className="text-slate-400 font-normal text-[11px]">(based on 80 years)</span>
                  </div>
                  <div className="relative mb-6">
                    <div className="w-full h-2.5 rounded-full flex overflow-hidden">
                      <div className="w-[30%] bg-[#00c853]"></div>
                      <div className="w-[40%] bg-[#ff9100]"></div>
                      <div className="w-[30%] bg-[#ff1744]"></div>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -ml-3.5 flex items-center justify-center transition-all duration-1000 ease-out" style={{ left: `${lifePercentage}%` }}>
                      <div className="bg-white border-2 border-[#ffb300] text-amber-500 text-[9px] font-black w-7 h-7 rounded-full flex items-center justify-center shadow-sm">
                        {Math.floor(lifePercentage)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-[9px] text-slate-400 mb-5 px-0.5 font-bold">
                    <span className="flex items-center gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-[#7cb342]"></div>0 yrs</span>
                    <span className="flex items-center gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-[#ffb300]"></div>24 yrs</span>
                    <span className="flex items-center gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-[#e53935]"></div>56 yrs</span>
                    <span className="flex items-center gap-0.5"><div className="w-1.5 h-1.5 rounded-full bg-slate-700"></div>80 yrs</span>
                  </div>
                  
                  {/* MILESTONE TRACKER */}
                  {!milestoneData.isReached && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-xl p-3 flex items-center justify-between shadow-sm mt-3">
                      <div>
                        <h4 className="text-xs sm:text-sm font-black text-blue-900 tracking-tight">Road to {milestoneData.targetAge} Years</h4>
                        <p className="text-[11px] font-bold text-blue-600 mt-0.5">
                          {milestoneData.years > 0 && `${milestoneData.years} Years, `} 
                          {milestoneData.months} Months, {milestoneData.days} Days to go!
                        </p>
                      </div>
                      <div className="w-8 h-8 shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                        <Target size={15} />
                      </div>
                    </div>
                  )}

                </div>

                {/* SHARE & COPY ACTION BUTTONS */}
                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-2.5">
                  <button 
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#25D366] text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-[#1ebd5a] transition-all active:scale-[0.98]"
                  >
                    <MessageCircle size={15} /> Share on WhatsApp
                  </button>
                  
                  <button 
                    type="button"
                    onClick={handleCopy}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-800 text-white px-5 py-2 rounded-full font-bold text-xs hover:bg-slate-700 transition-all active:scale-[0.98]"
                  >
                    {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />} 
                    {copied ? "Copied!" : "Copy Result"}
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* =========================================
              CARD 2: CLIENT'S NEXT BIRTHDAY WIDGET
          ========================================= */}
          {age && (
            <div className="bg-[#fcfaff] rounded-[1.5rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden border border-fuchsia-50 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 h-fit lg:sticky lg:top-32">
              
              <div className="bg-gradient-to-r from-[#fc238c] to-[#5951f8] p-3.5 flex items-center justify-center gap-2.5">
                <span className="text-xl drop-shadow-md">🎂</span>
                <h2 className="text-white font-black text-lg text-left leading-tight drop-shadow-sm">
                  Next Birthday <br/> Countdown
                </h2>
              </div>

              <div className="p-3.5 md:p-6 flex flex-col items-center">
                
                {bdayData.isToday ? (
                   <div className="text-center space-y-2.5 py-5">
                      <div className="text-4xl animate-bounce">🎉🎂✨</div>
                      <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Happy Birthday!</h3>
                      <p className="text-slate-500 font-bold text-xs">Have a wonderful celebration today!</p>
                   </div>
                ) : (
                  <>
                    <div className="bg-white w-full py-2.5 rounded-xl shadow-sm border border-slate-100 flex items-center justify-center gap-2 mb-4">
                      <CalendarDays size={16} className="text-purple-600" />
                      <span className="text-[#2d3748] font-black text-base tracking-wide">
                        {bdayData.nextDateStr}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#2d3748] font-bold text-[11px] mb-2.5">
                      <Clock size={14} className="text-[#ff509e]" /> Live Countdown
                    </div>

                    <div className="grid grid-cols-3 gap-2 w-full mb-3">
                      <div className="bg-gradient-to-b from-[#fc238c] to-[#f80860] rounded-xl p-2.5 flex flex-col items-center justify-center text-white shadow-sm">
                        <span className="text-xl font-black tabular-nums tracking-tighter">{bdayData.months}</span>
                        <span className="text-[8px] font-bold uppercase mt-0.5 tracking-wider opacity-90">Months</span>
                      </div>
                      <div className="bg-gradient-to-b from-[#ab40ff] to-[#9226f3] rounded-xl p-2.5 flex flex-col items-center justify-center text-white shadow-sm">
                        <span className="text-xl font-black tabular-nums tracking-tighter">{bdayData.days}</span>
                        <span className="text-[8px] font-bold uppercase mt-0.5 tracking-wider opacity-90">Days</span>
                      </div>
                      <div className="bg-gradient-to-b from-[#5966ff] to-[#424ff5] rounded-xl p-2.5 flex flex-col items-center justify-center text-white shadow-sm">
                        <span className="text-xl font-black tabular-nums tracking-tighter">{bdayData.hours}</span>
                        <span className="text-[8px] font-bold uppercase mt-0.5 tracking-wider opacity-90">Hours</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full mb-4">
                      <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-[#2d3748] shadow-sm border border-slate-100">
                        <span className="text-xl font-black tabular-nums tracking-tighter">{bdayData.minutes.toString().padStart(2, '0')}</span>
                        <span className="text-[8px] font-bold uppercase mt-0.5 tracking-wider text-slate-400">Minutes</span>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center text-[#2d3748] shadow-sm border border-slate-100">
                        <span className="text-xl font-black tabular-nums tracking-tighter">{bdayData.seconds.toString().padStart(2, '0')}</span>
                        <span className="text-[8px] font-bold uppercase mt-0.5 tracking-wider text-slate-400">Seconds</span>
                      </div>
                    </div>

                    <div className="bg-white w-full py-2.5 px-3 rounded-xl shadow-sm border border-slate-100 text-center text-[11px] font-medium text-[#2d3748]">
                      That's exactly <span className="text-[#fc238c] font-black">{bdayData.months} months</span>, <span className="text-[#fc238c] font-black">{bdayData.days} days</span>, and <span className="text-[#fc238c] font-black">{bdayData.hours} hours</span> away!
                    </div>
                  </>
                )}
              </div>

            </div>
          )}

        </div>

        {/* SEO CONTENT SECTION */}
        <div className="mt-12 bg-white p-5 md:p-9 rounded-[1.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-slate-100 max-w-4xl mx-auto mb-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-black text-slate-800 mb-3">Exact Age Calculator</h2>
            <p className="text-slate-600 font-medium text-xs leading-relaxed mb-6">
              Want to know your exact age in years, months, days, hours, and even seconds? Our Exact Age Calculator helps you calculate age online instantly with accurate results. Just enter your date of birth and get your real age along with total days lived, next birthday countdown, and life progress details. This free online age calculator is simple, fast, mobile-friendly, and perfect for students, job forms, school admission, government documents, retirement planning, and personal use.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mb-2">How to Use the Age Calculator</h3>
            <p className="text-slate-600 font-medium text-xs mb-2">Using this online age calculator is very easy. Follow these simple steps:</p>
            <ul className="list-decimal pl-5 text-slate-600 font-medium text-xs mb-5 space-y-1">
              <li>Open the age calculator tool.</li>
              <li>Enter your Date of Birth in DD/MM/YYYY format.</li>
              <li>Click on the <strong>Calculate My Age</strong> button.</li>
            </ul>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mb-6">
              <h4 className="font-bold text-slate-800 text-xs mb-1.5">Instantly see your exact age result. You will get:</h4>
              <ul className="list-disc pl-5 text-slate-600 font-medium text-[11px] space-y-1">
                <li>Age in years, months, days, hours, minutes, and even seconds</li>
                <li>Total Days Lived, Weeks, and Hours</li>
                <li>Live Seconds Counter</li>
                <li>Next Birthday Countdown & Life Journey Progress</li>
                <li>Road to 18 and 50 Years Tracker</li>
                <li>Copy or share your result on WhatsApp easily</li>
              </ul>
              <p className="text-[11px] text-[#00a63e] font-bold mt-2">The tool works instantly without signup or download.</p>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2">How Age is Calculated</h3>
            <p className="text-slate-600 font-medium text-xs mb-2">
              The age calculator checks the difference between your birth date and today’s current date. The formula is simple: <strong>Current Date − Date of Birth = Exact Age</strong>.
            </p>
            <p className="text-slate-600 font-medium text-xs mb-6">
              For better accuracy, the calculator also considers leap years, month differences, total days in each month, and current time/timezone. This helps provide a precise age result without manual calculation mistakes.
            </p>

            <h3 className="text-lg font-bold text-slate-800 mb-2">Common Mistakes While Calculating Age</h3>
            <p className="text-slate-600 font-medium text-xs mb-3">Many people calculate age incorrectly because of small mistakes. Here are common errors:</p>
            <div className="space-y-3">
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 text-xs">1. Wrong Date Format</h4>
                <p className="text-slate-600 text-[11px] mt-0.5">Entering MM/DD/YYYY instead of DD/MM/YYYY can give incorrect results.</p>
              </div>
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 text-xs">2. Not Adding 0 Before Single Digit Date/Month</h4>
                <p className="text-slate-600 text-[11px] mt-0.5">One common mistake is entering single-digit dates or months without adding 0 in front.</p>
                <p className="text-xs mt-1.5"><span className="font-bold text-red-500">Wrong:</span> 1/6/2000 | <span className="font-bold text-[#00a63e]">Correct:</span> 01/06/2000</p>
              </div>
            </div>
            <p className="text-slate-600 font-medium mt-3 text-[11px]">
              Always use proper DD/MM/YYYY format while entering your date of birth. Adding 0 before single-digit dates and months helps avoid confusion and ensures accurate age calculation.
            </p>
          </div>
          
          {/* =========================================================
              🔥 EXTRA HIGH-DENSITY CONTENT FOR ADSENSE APPROVAL
             ========================================================= */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-base font-black text-slate-800 mb-4 flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#00a63e] fill-[#00a63e]" /> Frequently Asked Questions (FAQs)
            </h3>
            
            <div className="space-y-3.5">
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q1. How accurate is this online chronological age calculator?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Our exact age calculator tool is highly accurate and utilizes standard calendar algorithms. It precisely computes the difference down to the exact years, months, days, hours, minutes, and real-time seconds by checking the dynamic time interval between your origin date of birth and the targeted current date.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q2. Does this online tool consider leap years for age calculations?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Yes, absolutely. The system automatically accounts for leap years (years with 366 days containing February 29th) as well as the varying number of days in each specific calendar month (28, 30, or 31 days). This eliminates any manual errors and guarantees a precise chronological timeline result.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q3. Why does my age result display dynamic moving numbers?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  When you leave the target date field set to today's date, our calculator runs a live engine interval ticker that continuously synchronizes with your device's native system clock. This allows you to track your lifecycle progress counter dynamically updating in real-time hours, minutes, and live seconds.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q4. Can I use this portal to check my exact age on a future date?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Yes, you can simulate your future age easily. By customizing the 'Age at the Date of' field to any upcoming milestone event target date, the engine locks the calculation loop to that specific timestamp, showing you exactly how old you will be in years, months, and days on that particular upcoming day.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q5. Is my personal birth date data secure on this platform?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Data privacy is our top priority. All age calculations are performed entirely on the client-side within your local browser sandbox wrapper environment. We do not transmit, track, or save any personal dates or identity configurations on external cloud servers, making it 100% safe and secure.
                </p>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </CalcShell>
  );
}