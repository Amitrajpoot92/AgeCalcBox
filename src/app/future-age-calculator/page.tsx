"use client";

import React, { useState } from "react";
import { 
  Rocket, 
  Sparkles, 
  AlertCircle, 
  CalendarClock, 
  Hourglass,
  CalendarDays,
  RotateCcw,
  ArrowRightLeft,
  Timer,
  FastForward,
  MessageCircle,
  Copy,
  Check
} from 'lucide-react';
import CalcShell from "@/components/calculators/CalcShell";

export default function FutureAge() {
  const [dobStr, setDobStr] = useState("");
  const [targetStr, setTargetStr] = useState("");
  
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
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
    setCopied(false);

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
    setCopied(false);
  };

  // SHARE & COPY LOGIC
  const generateShareText = () => {
    if (!result) return "";
    
    let text = `*My Future Age Projection* 🚀\n\n`;
    text += `Target Date: ${targetStr}\n`;
    text += `Projected Age: ${result.years} Years, ${result.months} Months, and ${result.days} Days.\n\n`;
    
    if (result.isPast) {
      text += `Status: ${Math.abs(result.daysToWait).toLocaleString()} Days Ago ⏳\n\n`;
    } else {
      text += `Status: ${result.daysToWait.toLocaleString()} Days to go! ✨\n\n`;
    }
    
    text += `Calculate yours instantly at Age Calculator Box: https://agecalculatorbox.com/future-age-calculator`;
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

  return (
    <CalcShell 
      title="" 
      description=""
    >
      {/* RESPONSIVE WRAPPER: Matches compacted grid framework across sibling viewports */}
      <div className="mx-auto font-sans w-full px-2 md:px-4 lg:px-8 max-w-4xl space-y-5 md:space-y-6">
        
        {/* PREMIUM GRADIENT HEADLINE SECTION (MATCHING MAIN PAGES) 🚀 */}
        <div className="text-center mb-6 mt-1">
          <div className="inline-flex items-center gap-1.5 bg-white border border-slate-100 shadow-sm px-3 py-1 rounded-full text-[11px] font-bold text-[#00a63e] tracking-wide mb-2.5">
            <Sparkles size={12} className="fill-[#00a63e]" /> CURATED MARKETPLACE
          </div>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
            Future Age <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-sm">Calculator.</span>
          </h1>
          <p className="text-slate-500 font-medium text-xs md:text-base max-w-2xl mx-auto mt-1.5 leading-relaxed">
            Calculate your future age instantly in years, months, and days. Check how old you will be on any upcoming date with accurate results.
          </p>
        </div>
        
        {/* =========================================
            COMPACT DUAL INPUT WIDGET
        ========================================= */}
        <div className="bg-white p-4 md:p-6 rounded-[1.75rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative z-20 border border-slate-50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10 mb-5">
            
            {/* Middle Decorative Icon (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full items-center justify-center border border-blue-100 shadow-md text-blue-500">
              <ArrowRightLeft size={16} />
            </div>

            {/* DOB INPUT */}
            <div className="bg-gradient-to-br from-emerald-50/40 to-teal-50/20 p-4 rounded-2xl border border-emerald-50/60 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-emerald-500/5 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="p-2 bg-white text-emerald-500 rounded-lg shadow-sm border border-emerald-100"><CalendarDays size={14} /></div>
                <span className="font-black uppercase tracking-widest text-[10px] text-emerald-600">Origin Point</span>
              </div>
              
              <div className="space-y-1.5 relative z-10">
                <label className="block text-slate-500 font-bold mb-1 ml-0.5 text-[10px] uppercase tracking-widest">Your Date of Birth</label>
                <input 
                  type="text" placeholder="DD/MM/YYYY" value={dobStr} onChange={(e) => setDobStr(formatInput(e.target.value))}
                  className="w-full text-center text-lg tracking-[0.12em] font-bold text-slate-800 py-2.5 px-4 rounded-xl border-2 border-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none bg-white/80"
                />
              </div>
            </div>

            {/* TARGET DATE INPUT */}
            <div className="bg-gradient-to-br from-blue-50/40 to-indigo-50/20 p-4 rounded-2xl border border-blue-50/60 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/5 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="p-2 bg-white text-blue-500 rounded-lg shadow-sm border border-blue-100"><Rocket size={14} /></div>
                <span className="font-black uppercase tracking-widest text-[10px] text-blue-600">Target Point</span>
              </div>
              
              <div className="space-y-1.5 relative z-10">
                <label className="block text-slate-500 font-bold mb-1 ml-0.5 text-[10px] uppercase tracking-widest">Future Target Date</label>
                <input 
                  type="text" placeholder="DD/MM/YYYY" value={targetStr} onChange={(e) => setTargetStr(formatInput(e.target.value))}
                  className="w-full text-center text-lg tracking-[0.12em] font-bold text-slate-800 py-2.5 px-4 rounded-xl border-2 border-white focus:border-blue-300 focus:ring-4 focus:ring-blue-500/5 transition-all outline-none bg-white/80"
                />
              </div>
            </div>

          </div>

          {error && <p className="text-red-500 text-xs font-bold mb-4 text-center bg-red-50 py-1.5 rounded-xl border border-red-100"><AlertCircle size={12} className="inline mr-1"/> {error}</p>}

          {/* --- COMPACT ACTION BUTTONS FRAME --- */}
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-[460px] mx-auto">
            <button 
              onClick={handleCalculate}
              className="w-full sm:w-2/3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-sm py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/20 transition-all active:scale-[0.98]"
            >
              <Sparkles size={16} className="text-yellow-300 fill-yellow-300" /> Initialize Time Travel
            </button>
            <button 
              onClick={handleReset}
              className="w-full sm:w-1/3 bg-white border-2 border-slate-100 text-slate-500 font-bold text-sm py-2.5 rounded-full flex items-center justify-center gap-1.5 hover:bg-slate-50 transition-all active:scale-[0.98]"
            >
              <RotateCcw size={14} /> Reset
            </button>
          </div>
        </div>

        {/* =========================================
            VIBRANT RESULTS SECTION
        ========================================= */}
        {result && (
          <div className="bg-white p-4 md:p-6 rounded-[1.75rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[800px] mx-auto border border-slate-50/80">
            
            {/* Projection Logic Card */}
            <div className="text-center mb-6 bg-gradient-to-br from-blue-50/60 to-indigo-50/60 p-4 rounded-2xl border border-blue-100/70">
              <div className="inline-block px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 text-blue-500 text-[9px] font-black uppercase tracking-widest mb-3">
                Projection Locked
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-slate-600 tracking-tight leading-normal">
                On that target date, you will exactly be:
              </h2>
            </div>

            {/* Main 3-Block Grid (Years, Months, Days) */}
            <div className="grid grid-cols-3 gap-2.5 md:gap-4 mb-5">
              {[
                { value: result.years, label: "YEARS", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100/60" },
                { value: result.months, label: "MONTHS", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100/60" },
                { value: result.days, label: "DAYS", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100/60" },
              ].map((item, index) => (
                <div key={index} className={`${item.bg} rounded-xl p-3 md:p-6 flex flex-col items-center justify-center border ${item.border}`}>
                  <span className={`text-2xl md:text-4xl font-black ${item.color} mb-0.5 tabular-nums tracking-tighter drop-shadow-sm`}>
                    {item.value}
                  </span>
                  <span className="text-[9px] md:text-xs font-bold text-slate-400 tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Wait Time / Distance Tracker Box */}
            <div className={`rounded-xl p-4 border shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 relative overflow-hidden group ${result.isPast ? 'bg-slate-50 border-slate-200' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
              
              <div className="flex items-center gap-4 relative z-10">
                <div className={`p-3 rounded-xl border bg-white shadow-sm ${result.isPast ? 'text-slate-400 border-slate-200' : 'text-blue-500 border-blue-100'}`}>
                  {result.isPast ? <CalendarClock size={22} /> : <Hourglass size={22} className="animate-pulse" />}
                </div>
                <div>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
                    {result.isPast ? "Status: Time Elapsed" : "Status: Approaching"}
                  </h3>
                  <p className="text-slate-600 font-bold mt-0.5 text-xs md:text-sm">
                    {result.isPast 
                      ? "This date has already passed in real-time." 
                      : "Distance in days to reach this target age."}
                  </p>
                </div>
              </div>
              
              <div className="text-center sm:text-right w-full sm:w-auto relative z-10 bg-white sm:bg-transparent p-3 sm:p-0 rounded-xl border sm:border-none border-slate-100/80">
                <span className={`text-3xl md:text-4xl font-black tracking-tighter tabular-nums ${result.isPast ? 'text-slate-500' : 'text-blue-600'}`}>
                  {Math.family = Math.abs(result.daysToWait).toLocaleString()}
                </span>
                <span className="block text-[8px] font-black uppercase tracking-[0.2em] text-slate-400 mt-1">
                  {result.isPast ? "Days Ago" : "Days to Go"}
                </span>
              </div>
            </div>

            {/* SHARE & COPY ACTION BUTTONS */}
            <div className="mt-6 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button 
                onClick={handleWhatsAppShare}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-full font-bold text-xs hover:bg-[#1ebd5a] transition-all active:scale-[0.98]"
              >
                <MessageCircle size={16} /> Share on WhatsApp
              </button>
              
              <button 
                onClick={handleCopy}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-800 text-white px-6 py-3 rounded-full font-bold text-xs hover:bg-slate-700 transition-all active:scale-[0.98]"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />} 
                {copied ? "Copied!" : "Copy Result"}
              </button>
            </div>

          </div>
        )}

        {/* SEO CONTENT SECTION */}
        <div className="mt-12 bg-white p-5 md:p-9 rounded-[1.75rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 max-w-4xl mx-auto mb-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-black text-slate-800 mb-3">What is Future Age Calculator?</h2>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
              A Future Age Calculator is an online tool that calculates how old you will be on a selected future date. The tool gives instant and accurate results without manual calculations.
            </p>
            
            <div className="bg-indigo-50/40 p-4 rounded-xl border border-indigo-100/70 mb-6 flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <h4 className="font-bold text-indigo-900 text-sm mb-1.5">The calculator compares:</h4>
                <ul className="list-disc pl-5 text-indigo-800/80 font-medium text-xs space-y-0.5">
                  <li>Your Date of Birth</li>
                  <li>Selected Future Date</li>
                </ul>
              </div>
              <div className="flex-1">
                <h4 className="font-bold text-indigo-900 text-sm mb-1.5">After calculation, it shows:</h4>
                <ul className="list-disc pl-5 text-indigo-800/80 font-medium text-xs space-y-0.5">
                  <li>Future age in years, months, and days</li>
                  <li>Total remaining days to reach that age</li>
                </ul>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2">How to Use the Future Age Calculator</h3>
            <p className="text-slate-600 font-medium text-sm mb-2">Using this tool is very simple and beginner friendly. Steps to use:</p>
            <ul className="list-decimal pl-5 text-slate-600 font-medium text-sm mb-6 space-y-1">
              <li>Enter your Date of Birth.</li>
              <li>Select a future target date.</li>
              <li>Click on the <strong>Initialize Time Travel</strong> button.</li>
              <li>Instantly view your exact future age result.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mb-2">Common Mistakes While Calculating Future Age</h3>
            <p className="text-slate-600 font-medium text-sm mb-3">Many people calculate age incorrectly because of small mistakes. Here are common errors:</p>
            <div className="space-y-3">
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 text-sm">1. Wrong Date Format</h4>
                <p className="text-slate-600 text-xs mt-0.5">Entering MM/DD/YYYY instead of DD/MM/YYYY can give incorrect results.</p>
              </div>
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 text-sm">2. Not Adding 0 Before Single Digit Date/Month</h4>
                <p className="text-slate-600 text-xs mt-0.5">One common mistake is entering single-digit dates or months without adding 0 in front.</p>
                <p className="text-xs mt-1.5"><span className="font-bold text-red-500">Wrong:</span> 1/6/2000 | <span className="font-bold text-[#00a63e]">Correct:</span> 01/06/2000</p>
              </div>
            </div>
            <p className="text-slate-600 font-medium mt-3 text-xs">
              Always use proper DD/MM/YYYY format while entering your date of birth. Adding 0 before single-digit dates and months helps avoid confusion and ensures accurate age calculation.
            </p>
          </div>
          
          {/* =========================================================
              🔥 EXTRA HIGH-DENSITY FAQ CONTENT FOR ADSENSE APPROVAL
             ========================================================= */}
          <div className="mt-8 pt-8 border-t border-slate-100">
            <h3 className="text-lg font-black text-slate-800 mb-4 flex items-center gap-1.5">
              <Sparkles size={16} className="text-[#00a63e] fill-[#00a63e]" /> Frequently Asked Questions (FAQs)
            </h3>
            
            <div className="space-y-3.5">
              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q1. Can this tool predict my future age on a leap year date?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Yes, the calendar index script seamlessly evaluates future milestone horizons containing February 29 intercalary segments. The system scales the day offsets properly to deliver an absolute age estimation report.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q2. What does the countdown metric 'Days to Go' indicate?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  The metric calculates the integer threshold between today's actual system timestamp and your chosen target date parameter. It shows the net balance of days remaining until that future projection becomes reality.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q3. Does typing a previous date break the computation script?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  No, the application features an adaptive state validation structure. If you input a historical target timestamp that falls before today's real date, the dashboard dynamically transitions into an elapsed history layout seamlessly.
                </p>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </CalcShell>
  );
}