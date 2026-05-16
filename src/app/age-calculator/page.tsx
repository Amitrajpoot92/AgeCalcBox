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
  const [lockedDate, setLockedDate] = useState<Date | null>(null);
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
    setCopied(false);

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

  // Live Ticker Engine for Age AND Birthday Countdown AND Milestone
  useEffect(() => {
    if (!lockedDate || !age) return;

    const updateLiveStats = () => {
      const now = new Date();
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
    const timer = setInterval(updateLiveStats, 1000);
    return () => clearInterval(timer);
  }, [lockedDate, age]);

  const handleReset = () => {
    setDobStr("");
    setLockedDate(null);
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
    
    text += `Calculate yours instantly at Age Calculator Box: https://agecalculatorbox.com/age-calculator`;
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
      title="Exact Age Calculator" 
      description="Calculate your precise chronological age, track life progress, and get a live countdown to your next birthday."
    >
      
      {/* FIXED RESPONSIVE WRAPPER: Back to a stable, wide max-w-6xl instead of breaking at 1500px */}
      <div className={`mx-auto font-sans transition-all duration-500 w-full px-2 md:px-4 lg:px-8 ${age ? 'max-w-6xl' : 'max-w-[500px]'}`}>
        
        {/* Simple 2-column grid layout (Prevents squishing) */}
        <div className={`grid grid-cols-1 ${age ? 'lg:grid-cols-2 gap-8 lg:gap-12 items-start' : 'gap-8'}`}>
          
          {/* =========================================
              CARD 1: MAIN INPUT & AGE CALCULATOR (Left Side)
          ========================================= */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] w-full relative z-20">
            
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

            {/* FIXED BUTTON LAYOUT: Simple vertical stack */}
            <div className="space-y-3 mb-2">
              <button 
                onClick={handleCalculate}
                className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-lg py-3.5 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
              >
                <Sparkles size={20} className="text-yellow-300 fill-yellow-300" /> Calculate My Age
              </button>
              {age && (
                <button 
                  onClick={handleReset}
                  className="w-full bg-white border border-slate-200 text-slate-700 font-bold text-[15px] py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
                >
                  <RotateCcw size={16} /> Reset
                </button>
              )}
            </div>

            {age && (
              <div className="space-y-6 mt-8 animate-in fade-in slide-in-from-top-4 duration-500 pt-6 border-t border-slate-100">
                
                <div className="grid grid-cols-3 gap-3 md:gap-4">
                  {[
                    { value: age.years, label: "YEARS" },
                    { value: age.months, label: "MONTHS" },
                    { value: age.days, label: "DAYS" },
                    { value: liveData.hours.toString().padStart(2, '0'), label: "HOURS" },
                    { value: liveData.minutes.toString().padStart(2, '0'), label: "MINUTES" },
                    { value: liveData.seconds.toString().padStart(2, '0'), label: "SECONDS" },
                  ].map((item, index) => (
                    <div key={index} className="bg-[#f3f6ff] rounded-2xl p-4 md:p-5 flex flex-col items-center justify-center border border-indigo-50/50">
                      <span className="text-2xl md:text-3xl font-black text-indigo-900 mb-1 tabular-nums">{item.value}</span>
                      <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 md:space-y-4 mb-6 mt-6">
                  <div className="bg-[#fef9e6] rounded-xl p-4 flex items-center justify-between px-5 border border-amber-100">
                    <div className="flex items-center gap-3">
                      <BarChart2 size={18} className="text-amber-500" />
                      <span className="text-[15px] font-bold text-slate-800">Total Weeks</span>
                    </div>
                    <span className="text-lg font-black text-amber-700">{liveData.totalWeeks.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#f0fdf4] rounded-xl p-4 flex items-center justify-between px-5 border border-emerald-100">
                    <div className="flex items-center gap-3">
                      <CalendarDays size={18} className="text-emerald-500" />
                      <span className="text-[15px] font-bold text-slate-800">Total Days</span>
                    </div>
                    <span className="text-lg font-black text-emerald-700">{liveData.totalDays.toLocaleString()}</span>
                  </div>

                  <div className="bg-[#f5f3ff] rounded-xl p-4 flex items-center justify-between px-5 border border-purple-100">
                    <div className="flex items-center gap-3">
                      <Clock size={18} className="text-purple-500" />
                      <span className="text-[15px] font-bold text-slate-800">Total Hours</span>
                    </div>
                    <span className="text-lg font-black text-purple-700">{liveData.totalHours.toLocaleString()}</span>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="flex items-center gap-2 text-slate-800 font-bold mb-6 text-lg">
                    <TrendingUp size={20} className="text-red-400" /> Life Journey Progress <span className="text-slate-500 font-normal text-sm">(based on 80 years)</span>
                  </div>
                  <div className="relative mb-10">
                    <div className="w-full h-4 rounded-full flex overflow-hidden">
                      <div className="w-[30%] bg-[#00c853]"></div>
                      <div className="w-[40%] bg-[#ff9100]"></div>
                      <div className="w-[30%] bg-[#ff1744]"></div>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -ml-5 flex items-center justify-center transition-all duration-1000 ease-out" style={{ left: `${lifePercentage}%` }}>
                      <div className="bg-white border-4 border-[#ffb300] text-amber-500 text-xs md:text-sm font-black w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
                        {Math.floor(lifePercentage)}%
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500 mb-8 px-1 font-bold">
                    <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#7cb342]"></div>0 yrs</span>
                    <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#ffb300]"></div>24 yrs</span>
                    <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-[#e53935]"></div>56 yrs</span>
                    <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-slate-700"></div>80 yrs</span>
                  </div>
                  
                  {/* MILESTONE TRACKER */}
                  {!milestoneData.isReached && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-3xl p-5 md:p-6 flex items-center justify-between shadow-sm mt-6">
                      <div>
                        <h4 className="text-base md:text-lg font-black text-blue-900 tracking-tight">Road to {milestoneData.targetAge} Years</h4>
                        <p className="text-sm font-bold text-blue-600 mt-1.5">
                          {milestoneData.years > 0 && `${milestoneData.years} Years, `} 
                          {milestoneData.months} Months, {milestoneData.days} Days to go!
                        </p>
                      </div>
                      <div className="w-12 h-12 shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
                        <Target size={20} />
                      </div>
                    </div>
                  )}

                </div>

                {/* =========================================
                    SHARE & COPY ACTION BUTTONS
                ========================================= */}
                <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={handleWhatsAppShare}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-[#1ebd5a] hover:shadow-[0_10px_20px_rgba(37,211,102,0.3)] transition-all active:scale-95"
                  >
                    <MessageCircle size={18} /> Share on WhatsApp
                  </button>
                  
                  <button 
                    onClick={handleCopy}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 text-white px-8 py-3.5 rounded-full font-bold text-sm hover:bg-slate-700 hover:shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-all active:scale-95"
                  >
                    {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />} 
                    {copied ? "Copied!" : "Copy Result"}
                  </button>
                </div>

              </div>
            )}
          </div>

          {/* =========================================
              CARD 2: CLIENT'S NEXT BIRTHDAY WIDGET (Shows side-by-side on desktop)
          ========================================= */}
          {age && (
            <div className="bg-[#fcfaff] rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.05)] overflow-hidden border border-fuchsia-50 w-full animate-in fade-in slide-in-from-bottom-8 duration-700 h-fit lg:sticky lg:top-32">
              
              {/* FIXED CAKE HEADER: Used flex layout instead of absolute position so it never overlaps */}
              <div className="bg-gradient-to-r from-[#fc238c] to-[#5951f8] p-6 flex items-center justify-center gap-4">
                <span className="text-3xl md:text-4xl drop-shadow-md">🎂</span>
                <h2 className="text-white font-black text-2xl md:text-3xl text-left leading-tight drop-shadow-sm">
                  Next Birthday <br/> Countdown
                </h2>
              </div>

              <div className="p-6 md:p-8 flex flex-col items-center">
                
                {bdayData.isToday ? (
                   <div className="text-center space-y-4 py-10">
                      <div className="text-6xl animate-bounce">🎉🎂✨</div>
                      <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Happy Birthday!</h3>
                      <p className="text-slate-600 font-bold text-lg">Have a wonderful celebration today!</p>
                   </div>
                ) : (
                  <>
                    <div className="bg-white w-full py-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center gap-3 mb-8">
                      <CalendarDays size={22} className="text-purple-600" />
                      <span className="text-[#2d3748] font-black text-xl md:text-2xl tracking-wide">
                        {bdayData.nextDateStr}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[#2d3748] font-bold text-[15px] mb-4">
                      <Clock size={18} className="text-[#ff509e]" /> Live Countdown
                    </div>

                    {/* FIXED COUNTDOWN BOXES: Flex layout to ensure numbers stay inside */}
                    <div className="grid grid-cols-3 gap-3 w-full mb-4">
                      <div className="bg-gradient-to-b from-[#fc238c] to-[#f80860] rounded-2xl p-4 flex flex-col items-center justify-center text-white shadow-lg shadow-pink-500/20">
                        <span className="text-4xl font-black tabular-nums tracking-tighter drop-shadow-sm">{bdayData.months}</span>
                        <span className="text-[10px] md:text-xs font-bold uppercase mt-1 tracking-wider opacity-90">Months</span>
                      </div>
                      <div className="bg-gradient-to-b from-[#ab40ff] to-[#9226f3] rounded-2xl p-4 flex flex-col items-center justify-center text-white shadow-lg shadow-purple-500/20">
                        <span className="text-4xl font-black tabular-nums tracking-tighter drop-shadow-sm">{bdayData.days}</span>
                        <span className="text-[10px] md:text-xs font-bold uppercase mt-1 tracking-wider opacity-90">Days</span>
                      </div>
                      <div className="bg-gradient-to-b from-[#5966ff] to-[#424ff5] rounded-2xl p-4 flex flex-col items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                        <span className="text-4xl font-black tabular-nums tracking-tighter drop-shadow-sm">{bdayData.hours}</span>
                        <span className="text-[10px] md:text-xs font-bold uppercase mt-1 tracking-wider opacity-90">Hours</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 w-full mb-8">
                      <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-[#2d3748] shadow-sm border border-slate-100">
                        <span className="text-4xl font-black tabular-nums tracking-tighter">{bdayData.minutes}</span>
                        <span className="text-xs font-bold uppercase mt-1 tracking-wider text-slate-500">Minutes</span>
                      </div>
                      <div className="bg-white rounded-2xl p-4 flex flex-col items-center justify-center text-[#2d3748] shadow-sm border border-slate-100">
                        <span className="text-4xl font-black tabular-nums tracking-tighter">{bdayData.seconds}</span>
                        <span className="text-xs font-bold uppercase mt-1 tracking-wider text-slate-500">Seconds</span>
                      </div>
                    </div>

                    <div className="bg-white w-full py-4 px-4 rounded-2xl shadow-sm border border-slate-100 text-center text-sm md:text-[15px] font-medium text-[#2d3748]">
                      That's exactly <span className="text-[#fc238c] font-black">{bdayData.months} months</span>, <span className="text-[#fc238c] font-black">{bdayData.days} days</span>, and <span className="text-[#fc238c] font-black">{bdayData.hours} hours</span> away!
                    </div>
                  </>
                )}
              </div>

            </div>
          )}

        </div>

        {/* =========================================
            EMPTY STATE: SEO & FEATURE EXPLANATION (Only shows before calculating)
        ========================================= */}
        {!age && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-center px-4 relative z-10 pt-10 mt-6">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight mb-5">
              More Than Just a <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Date of Birth Calculator</span>
            </h2>
            <p className="text-slate-500 font-medium text-base md:text-lg leading-relaxed mb-10 max-w-3xl mx-auto">
              Enter your date of birth above to unlock a personalized chronological dashboard. Our exact age calculator goes beyond simple years and months, giving you real-time insights into your life's journey instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-indigo-50 text-indigo-500 rounded-2xl flex items-center justify-center">
                  <Timer size={26} />
                </div>
                <h3 className="text-lg font-black text-slate-800">Live Age Ticker</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Track your exact chronological age in hours, minutes, and live ticking seconds.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center text-3xl">
                  🎂
                </div>
                <h3 className="text-lg font-black text-slate-800">Birthday Countdown</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Get a vibrant, real-time timer tracking exact months and days to your next birthday.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[2rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp size={26} />
                </div>
                <h3 className="text-lg font-black text-slate-800">Life Progress</h3>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                  Visualize your life journey with our intuitive 80-year graphical milestone tracker.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* SEO CONTENT SECTION - JUST PASTE AT THE BOTTOM */}
<div className="mt-16 bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-4xl mx-auto mb-12">
  <div className="prose prose-slate max-w-none">
    <h2 className="text-2xl font-black text-slate-800 mb-4">Exact Age Calculator</h2>
    <p className="text-slate-600 font-medium leading-relaxed mb-8">
      Want to know your exact age in years, months, days, hours, and even seconds? Our Exact Age Calculator helps you calculate age online instantly with accurate results. Just enter your date of birth and get your real age along with total days lived, next birthday countdown, and life progress details. This free online age calculator is simple, fast, mobile-friendly, and perfect for students, job forms, school admission, government documents, retirement planning, and personal use.
    </p>

    <h3 className="text-xl font-bold text-slate-800 mb-3">How to Use the Age Calculator</h3>
    <p className="text-slate-600 font-medium mb-3">Using this online age calculator is very easy. Follow these simple steps:</p>
    <ul className="list-decimal pl-5 text-slate-600 font-medium mb-6 space-y-2">
      <li>Open the age calculator tool.</li>
      <li>Enter your Date of Birth in DD/MM/YYYY format.</li>
      <li>Click on the <strong>Calculate My Age</strong> button.</li>
    </ul>
    
    <div className="bg-slate-50 p-5 rounded-2xl border border-slate-100 mb-8">
      <h4 className="font-bold text-slate-800 mb-2">Instantly see your exact age result. You will get:</h4>
      <ul className="list-disc pl-5 text-slate-600 font-medium space-y-1">
        <li>Age in years, months, days, hours, minutes, and even seconds</li>
        <li>Total Days Lived, Weeks, and Hours</li>
        <li>Live Seconds Counter</li>
        <li>Next Birthday Countdown & Life Journey Progress</li>
        <li>Road to 18 and 50 Years Tracker</li>
        <li>Copy or share your result on WhatsApp easily</li>
      </ul>
      <p className="text-sm text-[#00a63e] font-bold mt-3">The tool works instantly without signup or download.</p>
    </div>

    <h3 className="text-xl font-bold text-slate-800 mb-3">How Age is Calculated</h3>
    <p className="text-slate-600 font-medium mb-4">
      The age calculator checks the difference between your birth date and today’s current date. The formula is simple: <strong>Current Date − Date of Birth = Exact Age</strong>.
    </p>
    <p className="text-slate-600 font-medium mb-8">
      For better accuracy, the calculator also considers leap years, month differences, total days in each month, and current time/timezone. This helps provide a precise age result without manual calculation mistakes.
    </p>

    <h3 className="text-xl font-bold text-slate-800 mb-3">Common Mistakes While Calculating Age</h3>
    <p className="text-slate-600 font-medium mb-4">Many people calculate age incorrectly because of small mistakes. Here are common errors:</p>
    <div className="space-y-4">
      <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
        <h4 className="font-bold text-red-800">1. Wrong Date Format</h4>
        <p className="text-slate-600 text-sm mt-1">Entering MM/DD/YYYY instead of DD/MM/YYYY can give incorrect results.</p>
      </div>
      <div className="bg-red-50/50 p-4 rounded-xl border border-red-100">
        <h4 className="font-bold text-red-800">2. Not Adding 0 Before Single Digit Date/Month</h4>
        <p className="text-slate-600 text-sm mt-1">One common mistake is entering single-digit dates or months without adding 0 in front.</p>
        <p className="text-sm mt-2"><span className="font-bold text-red-500">Wrong:</span> 1/6/2000 | <span className="font-bold text-[#00a63e]">Correct:</span> 01/06/2000</p>
      </div>
    </div>
    <p className="text-slate-600 font-medium mt-4 text-sm">
      Always use proper DD/MM/YYYY format while entering your date of birth. Adding 0 before single-digit dates and months helps avoid confusion and ensures accurate age calculation.
    </p>
  </div>
</div>

      </div>
    </CalcShell>
  );
}