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
      
      {/* 🚀 EXPANDED WRAPPER STRUCTURE: Increased horizontal container bounds to max-w-5xl/4xl for wider presentation */}
      <div className={`mx-auto font-sans transition-all duration-500 w-full px-4 md:px-6 ${age ? 'max-w-7xl' : 'max-w-4xl'}`}>
        
        {/* 🔥 TOP HEADING POSITION: Shifted completely up without curated text blocks */}
        <div className="text-center mb-6 md:mb-8 mt-0 pt-1">
          <h1 className="text-3xl md:text-6xl font-black tracking-tight text-slate-800 leading-tight">
            Age Calculator <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-sm"> Online</span>
          </h1>
          <p className="text-slate-500 font-medium text-xs md:text-base max-w-2xl mx-auto mt-2 leading-relaxed">
            Calculate your exact age in years, months, days, hours, minutes, and live seconds instantly with accurate real-time results.
          </p>
        </div>

        {/* Responsive dual grid layouts */}
        <div className={`grid grid-cols-1 ${age ? 'lg:grid-cols-2 gap-6 lg:gap-10 items-start' : 'max-w-2xl mx-auto'}`}>
          
          {/* =========================================
              CARD 1: BROAD VIEW MAIN INPUT GRID (Left Side)
          ========================================= */}
          <div className="bg-white p-5 md:p-8 rounded-[2rem] shadow-[0_10px_35px_rgba(0,0,0,0.03)] w-full relative z-20 border border-slate-100">
            
            {/* FIELD 1: Date of Birth */}
            <div className="mb-4">
              <label className="block text-slate-700 font-bold mb-2 ml-1 text-xs md:text-sm uppercase tracking-wider">
                Date of Birth <span className="font-normal text-slate-400 lowercase">(dd/mm/yyyy)</span>
              </label>
              <input 
                type="text" 
                placeholder="DD/MM/YYYY"
                value={dobStr}
                onChange={(e) => handleInputChange(e, "dob")}
                className={`w-full text-center text-lg md:text-2xl tracking-[0.15em] font-bold text-slate-800 py-3 px-5 rounded-full border-2 transition-all outline-none ${error && dobStr.length !== 10 ? 'border-red-400 bg-red-50' : 'border-indigo-500 focus:ring-4 focus:ring-indigo-500/10'}`}
              />
            </div>

            {/* FIELD 2: Optional Target Current Date */}
            <div className="mb-5">
              <label className="block text-slate-700 font-bold mb-2 ml-1 text-xs md:text-sm uppercase tracking-wider">
                Age at the Date of <span className="font-normal text-slate-400 lowercase">(dd/mm/yyyy)</span>
              </label>
              <input 
                type="text" 
                placeholder="DD/MM/YYYY"
                value={currentDateStr}
                onChange={(e) => handleInputChange(e, "current")}
                className="w-full text-center text-lg md:text-2xl tracking-[0.15em] font-bold text-slate-800 py-3 px-5 rounded-full border-2 border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
              />
              {error && <p className="text-red-500 text-[11px] font-bold mt-2 text-center bg-red-50 py-1.5 rounded-xl border border-red-100">{error}</p>}
            </div>

            {/* COMPACT BUTTON LAYOUT */}
            <div className="space-y-2.5 mb-1">
              <button 
                type="button"
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-base py-3 rounded-full flex items-center justify-center gap-1.5 hover:shadow-lg transition-all active:scale-[0.98] shadow-sm"
              >
                <Sparkles size={18} className="text-yellow-300 fill-yellow-300" /> Calculate My Age
              </button>
              {age && (
                <button 
                  type="button"
                  onClick={handleReset}
                  className="w-full bg-white border border-slate-200 text-slate-500 font-bold text-xs py-2.5 rounded-full flex items-center justify-center gap-1 hover:bg-slate-50 transition-all active:scale-[0.98]"
                >
                  <RotateCcw size={14} /> Reset
                </button>
              )}
            </div>

            {age && (
              <div className="space-y-4 mt-5 animate-in fade-in slide-in-from-top-4 duration-500 pt-5 border-t border-slate-100">
                
                {/* TICKING SYSTEM RENDER ENGINE METRICS */}
                <div className="grid grid-cols-3 gap-2 md:gap-3">
                  {[
                    { value: age.years, label: "YEARS" },
                    { value: age.months, label: "MONTHS" },
                    { value: age.days, label: "DAYS" },
                    { value: liveData.hours.toString().padStart(2, '0'), label: "HOURS" },
                    { value: liveData.minutes.toString().padStart(2, '0'), label: "MINUTES" },
                    { value: liveData.seconds.toString().padStart(2, '0'), label: "SECONDS" },
                  ].map((item, index) => (
                    <div key={index} className="bg-[#f3f6ff] rounded-xl p-3 md:p-4 flex flex-col items-center justify-center border border-indigo-50/40">
                      <span className="text-lg md:text-2xl font-black text-indigo-900 mb-0.5 tabular-nums">{item.value}</span>
                      <span className="text-[9px] md:text-xs font-bold text-slate-400 tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-3 mt-3">
                  <div className="bg-[#fef9e6] rounded-xl p-2.5 flex items-center justify-between px-4 border border-amber-100">
                    <div className="flex items-center gap-2">
                      <BarChart2 size={16} className="text-amber-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-600">Total Weeks</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-amber-700">{liveData.totalWeeks.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#f0fdf4] rounded-xl p-2.5 flex items-center justify-between px-4 border border-emerald-100">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-emerald-500" />
                      <span className="text-xs sm:text-sm font-bold text-slate-600">Total Days</span>
                    </div>
                    <span className="text-sm sm:text-base font-black text-emerald-700">{liveData.totalDays.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#f5f3ff] rounded-xl p-2.5 flex items-center justify-between px-4 border border-purple-100">
                    <div className="flex items-center gap-2">
                      <Clock size={16} className="text-purple-500" />
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

                {/* SHARE ACTIONS */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-2">
                  <button 
                    type="button"
                    onClick={handleWhatsAppShare}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-[#25D366] text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-[#1ebd5a] transition-all active:scale-[0.98]"
                  >
                    <MessageCircle size={15} /> Share on WhatsApp
                  </button>
                  
                  <button 
                    type="button"
                    onClick={handleCopy}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 bg-slate-800 text-white px-5 py-2.5 rounded-full font-bold text-xs hover:bg-slate-700 transition-all active:scale-[0.98]"
                  >
                    {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />} 
                    {copied ? "Copied!" : "Copy Result"}
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* =========================================
              CARD 2: DYNAMIC BIRTHDAY COUNTDOWN WIDGET
          ========================================= */}
          {age && (
            <div className="bg-[#fcfaff] rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.02)] overflow-hidden border border-fuchsia-50 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 h-fit lg:sticky lg:top-32">
              
              <div className="bg-gradient-to-r from-[#fc238c] to-[#5951f8] p-4 flex items-center justify-center gap-2.5">
                <span className="text-xl drop-shadow-md">🎂</span>
                <h2 className="text-white font-black text-lg text-left leading-tight drop-shadow-sm">
                  Next Birthday <br/> Countdown
                </h2>
              </div>

              <div className="p-4 md:p-6 flex flex-col items-center">
                
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
                      <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                        <span className="text-xl font-black text-[#fc238c]">{bdayData.months}</span>
                        <span className="text-[9px] font-bold uppercase mt-0.5 text-slate-400 tracking-wider">Months</span>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                        <span className="text-xl font-black text-[#ab40ff]">{bdayData.days}</span>
                        <span className="text-[9px] font-bold uppercase mt-0.5 text-slate-400 tracking-wider">Days</span>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                        <span className="text-xl font-black text-[#5966ff]">{bdayData.hours}</span>
                        <span className="text-[9px] font-bold uppercase mt-0.5 text-slate-400 tracking-wider">Hours</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 w-full mb-4">
                      <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                        <span className="text-xl font-black text-slate-700">{bdayData.minutes.toString().padStart(2, '0')}</span>
                        <span className="text-[9px] font-bold uppercase mt-0.5 text-slate-400 tracking-wider">Minutes</span>
                      </div>
                      <div className="bg-white rounded-xl p-2.5 flex flex-col items-center justify-center border border-slate-100 shadow-sm">
                        <span className="text-xl font-black text-slate-700">{bdayData.seconds.toString().padStart(2, '0')}</span>
                        <span className="text-[9px] font-bold uppercase mt-0.5 text-slate-400 tracking-wider">Seconds</span>
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

        {/* =========================================================================
            🚀 WIDE BOX TEXTUAL LAYOUT: Expanded width constraints per image_e5935e.png marks
           ========================================================================= */}
        <div className="mt-10 bg-white p-6 md:p-12 rounded-[2rem] shadow-[0_12px_45px_rgba(0,0,0,0.03)] border border-slate-100 w-full max-w-5xl mx-auto mb-12">
          <div className="prose prose-slate max-w-none">
            
            <section className="mb-8">
              <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4 tracking-tight flex items-center gap-2">
                <Sparkles size={22} className="text-[#00a63e] fill-[#00a63e]" /> Premium Age Calculator Online
              </h2>
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed mb-4">
                Welcome to the ultimate **Exact Age Calculator Box**, your standard engineering platform for tracking chronological time matrices. Whether you are validating official data fields for competitive exams, job applications, birth certificate logs, school admissions, or simply exploring your lifecycle parameters down to the exact millisecond index, our tool handles raw inputs seamlessly. 
              </p>
              <p className="text-slate-600 font-medium text-sm md:text-base leading-relaxed">
                Unlike primitive evaluation scripts that approximate data intervals by dividing raw timestamps uniformly into 365 days, our high-density computational core processes localized date transitions, calendar offsets, dynamic Leap Year exceptions, and variable month indexes ($28$, $29$, $30$, or $31$ days) to return an absolute precision profile.
              </p>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 pt-2">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <h4 className="font-black text-indigo-900 text-base mb-3 uppercase tracking-wider">Advanced Engine Tracking Metrics</h4>
                <ul className="list-disc pl-5 text-slate-600 font-medium text-sm space-y-2">
                  <li><strong className="text-slate-800">Dynamic Live Ticker:</strong> Synchronizes with your device's native hardware clock for continuous real-time execution.</li>
                  <li><strong className="text-slate-800">Leap Year Adjustments:</strong> Accounts for historical and upcoming inter-calary cycles flawlessly.</li>
                  <li><strong className="text-slate-800">Milestone Framework Matrix:</strong> Automatic remaining distance trackers for ages $18$, $50$, and $80$ years.</li>
                  <li><strong className="text-slate-800">Aggregate Meta Data:</strong> Translates lifecycle spans into aggregate configurations of total weeks, days, and net hours.</li>
                </ul>
              </div>

              <div className="bg-[#f0fdf4]/50 p-6 rounded-2xl border border-emerald-100 shadow-sm">
                <h4 className="font-black text-emerald-900 text-base mb-3 uppercase tracking-wider">Strict Client-Side Privacy Sandboxing</h4>
                <p className="text-slate-600 font-medium text-sm leading-relaxed mb-3">
                  Security is integrated directly into our platform architecture. All raw input entries, localized timestamps, and identity configurations are computed entirely within your local browser's client-side sandbox environment.
                </p>
                <p className="text-slate-600 font-bold text-xs text-[#00a63e] flex items-center gap-1">
                  🚀 No database logging, server transmission, or analytical tracking triggers are present.
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h3 className="text-xl font-black text-slate-800 mb-3 tracking-tight">Step-by-Step Execution Guide</h3>
              <p className="text-slate-600 font-medium text-sm mb-3">To calculate your precise chronological age array, process the fields sequentially:</p>
              <ol className="list-decimal pl-5 text-slate-600 font-medium text-sm space-y-2">
                <li>
                  <strong className="text-slate-800">Input Origin Point:</strong> Populate your formal date of birth inside the designated form field using the standard <code className="bg-slate-100 px-1.5 py-0.5 rounded text-indigo-600 font-bold">DD/MM/YYYY</code> format framework.
                </li>
                <li>
                  <strong className="text-slate-800">Configure Target Point:</strong> By default, the input block auto-fills today's active live system timestamp. If you wish to calculate your age profile on an historical occasion or upcoming landmark event, modify the parameters inside the <em className="text-slate-700 font-bold">"Age at the Date of"</em> field.
                </li>
                <li>
                  <strong className="text-slate-800">Execute Mathematical Loop:</strong> Trigger the interactive <span className="font-bold text-purple-600">Calculate My Age</span> CTA layout button to display your dynamic analytics dashboard output array immediately.
                </li>
              </ol>
            </section>

            <div className="bg-amber-50/70 p-6 rounded-2xl border border-amber-200/70 mb-8">
              <h4 className="font-bold text-amber-900 text-sm mb-2 uppercase tracking-wide">Validation Notice: Preventing Common Arithmetic Errors</h4>
              <p className="text-slate-600 font-medium text-sm leading-relaxed">
                Manual calculations often fail to estimate age variations accurately due to shifting monthly benchmarks. For instance, entering single digits without padding zeros (e.g., <span className="text-red-500 font-bold">1/6/2000</span> instead of <span className="text-[#00a63e] font-bold">01/06/2000</span>) or misinterpreting the native <code className="text-xs bg-white border px-1 rounded">MM/DD/YYYY</code> format index can throw incorrect warnings. Our input mask standardizes strings automatically to remove syntax structural inconsistencies.
              </p>
            </div>

            {/* =========================================================
                🔥 EXTRA HIGH-DENSITY FAQ ACCORDION FOR ADSENSE VALIDATION
               ========================================================= */}
            <div className="mt-8 pt-8 border-t border-slate-100">
              <h3 className="text-lg md:text-xl font-black text-slate-800 mb-5 flex items-center gap-1.5">
                <Sparkles size={18} className="text-[#00a63e] fill-[#00a63e]" /> Frequently Asked Questions (FAQs)
              </h3>
              
              <div className="space-y-4">
                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                  <h4 className="font-bold text-slate-800 text-sm">Q1. How accurate is this online chronological age calculator box?</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Our exact age calculator tool is highly accurate and utilizes standard calendar algorithms. It precisely computes the differences down to the exact years, months, days, hours, minutes, and real-time seconds by checking the dynamic time interval between your origin date of birth and the targeted current date matrix configuration.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                  <h4 className="font-bold text-slate-800 text-sm">Q2. Does this online tool consider leap years for age calculations?</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Yes, absolutely. The system automatically accounts for leap years (years with 366 days containing February 29th) as well as the varying number of days in each specific calendar month (28, 30, or 31 days). This eliminates any manual errors and guarantees a precise chronological timeline result across all years.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                  <h4 className="font-bold text-slate-800 text-sm">Q3. Why does my age result display dynamic moving numbers?</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    When you leave the target date field set to today's date, our calculator runs a live engine interval ticker that continuously synchronizes with your device's native system clock. This allows you to track your lifecycle progress counter dynamically updating in real-time hours, minutes, and live seconds seamlessly.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                  <h4 className="font-bold text-slate-800 text-sm">Q4. Can I use this portal to check my exact age on a future date?</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Yes, you can simulate your future age easily. By customizing the 'Age at the Date of' field to any upcoming milestone event target date, the engine locks the calculation loop to that specific timestamp, showing you exactly how old you will be in years, months, and days on that particular day.
                  </p>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                  <h4 className="font-bold text-slate-800 text-sm">Q5. Is my personal birth date data secure on this platform?</h4>
                  <p className="text-slate-500 text-xs md:text-sm mt-1 leading-relaxed">
                    Data privacy is our top priority. All age calculations are performed entirely on the client-side within your local browser sandbox wrapper environment. We do not transmit, track, or save any personal dates or identity configurations on external cloud servers, making it 100% safe, fast, and secure.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
        
      </div>
    </CalcShell>
  );
}