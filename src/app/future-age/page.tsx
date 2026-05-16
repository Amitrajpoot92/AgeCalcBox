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
    
    text += `Calculate yours instantly at Age Calculator Box: https://agecalculatorbox.com/future-age`;
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
      title="Future Age Predictor" 
      description="Time-travel to any date and simulate exactly how old you will be with high precision."
    >
      <div className="max-w-[800px] mx-auto font-sans space-y-8">
        
        {/* =========================================
            MAIN DUAL INPUT WIDGET
        ========================================= */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
            
            {/* Middle Decorative Icon (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full items-center justify-center border border-blue-100 shadow-md text-blue-500">
              <ArrowRightLeft size={20} />
            </div>

            {/* DOB INPUT */}
            <div className="bg-gradient-to-br from-emerald-50/50 to-teal-50/30 p-5 rounded-3xl border border-emerald-50 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-2.5 bg-white text-emerald-500 rounded-xl shadow-sm border border-emerald-100"><CalendarDays size={18} /></div>
                <span className="font-black uppercase tracking-widest text-xs text-emerald-600">Origin Point</span>
              </div>
              
              <div className="space-y-2 relative z-10">
                <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Your Date of Birth</label>
                <input 
                  type="text" placeholder="DD/MM/YYYY" value={dobStr} onChange={(e) => setDobStr(formatInput(e.target.value))}
                  className="w-full text-center text-xl tracking-[0.15em] font-black text-slate-800 py-3.5 px-5 rounded-2xl border-2 border-white focus:border-emerald-300 focus:ring-4 focus:ring-emerald-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* TARGET DATE INPUT */}
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 p-5 rounded-3xl border border-blue-50 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-2.5 bg-white text-blue-500 rounded-xl shadow-sm border border-blue-100"><Rocket size={18} /></div>
                <span className="font-black uppercase tracking-widest text-xs text-blue-600">Target Point</span>
              </div>
              
              <div className="space-y-2 relative z-10">
                <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Future Target Date</label>
                <input 
                  type="text" placeholder="DD/MM/YYYY" value={targetStr} onChange={(e) => setTargetStr(formatInput(e.target.value))}
                  className="w-full text-center text-xl tracking-[0.15em] font-black text-slate-800 py-3.5 px-5 rounded-2xl border-2 border-white focus:border-blue-300 focus:ring-4 focus:ring-blue-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                />
              </div>
            </div>

          </div>

          {error && <p className="text-red-500 text-xs font-bold mb-6 text-center bg-red-50 py-2 rounded-xl border border-red-100"><AlertCircle size={14} className="inline mr-1"/> {error}</p>}

          {/* --- BUTTONS --- */}
          <div className="flex flex-col md:flex-row gap-3 max-w-[500px] mx-auto">
            <button 
              onClick={handleCalculate}
              className="w-full md:w-2/3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold text-[16px] py-4 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/30 transition-all active:scale-95"
            >
              <Sparkles size={18} className="text-yellow-300 fill-yellow-300" /> Initialize Time Travel
            </button>
            <button 
              onClick={handleReset}
              className="w-full md:w-1/3 bg-white border-2 border-slate-100 text-slate-600 font-bold text-[15px] py-4 rounded-full flex items-center justify-center gap-2 hover:bg-slate-50 transition-all active:scale-95"
            >
              <RotateCcw size={16} /> Reset
            </button>
          </div>
        </div>

        {/* =========================================
            EMPTY STATE: SEO & FEATURE EXPLANATION
        ========================================= */}
        {!result && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 text-center px-4 relative z-10 pt-4">
            <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-4">
              The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Future Age Predictor</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
              Want to know exactly how old you will be in 2050? Or maybe you want to calculate your age on a specific upcoming milestone. Simply enter your birth date and any future date to simulate your exact chronological age instantly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[800px] mx-auto">
              
              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-blue-50 text-blue-500 rounded-[14px] flex items-center justify-center border border-blue-100">
                  <Rocket size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Time Travel Math</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Project your age decades into the future with absolute timezone-aware precision.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-purple-50 text-purple-500 rounded-[14px] flex items-center justify-center border border-purple-100">
                  <FastForward size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Milestone Projection</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Get a deep breakdown of your future age translated into exact years, months, and days.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-[14px] flex items-center justify-center border border-emerald-100">
                  <Timer size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Distance Tracker</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Instantly see how many exact days are left until you reach that future milestone from today.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* =========================================
            VIBRANT RESULTS SECTION
        ========================================= */}
        {result && (
          <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[800px] mx-auto border border-slate-50">
            
            {/* Projection Logic Card */}
            <div className="text-center mb-8 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 p-6 rounded-3xl border border-blue-100">
              <div className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-blue-500 text-[10px] font-black uppercase tracking-widest mb-4">
                Projection Locked
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-slate-600 tracking-tight leading-relaxed">
                On that target date, you will exactly be:
              </h2>
            </div>

            {/* Main 3-Block Grid (Years, Months, Days) */}
            <div className="grid grid-cols-3 gap-3 md:gap-5 mb-8">
              {[
                { value: result.years, label: "YEARS", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
                { value: result.months, label: "MONTHS", color: "text-purple-600", bg: "bg-purple-50", border: "border-purple-100" },
                { value: result.days, label: "DAYS", color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
              ].map((item, index) => (
                <div key={index} className={`${item.bg} rounded-3xl p-5 md:p-8 flex flex-col items-center justify-center border ${item.border} shadow-sm transition-transform hover:-translate-y-1`}>
                  <span className={`text-4xl md:text-6xl font-black ${item.color} mb-2 tabular-nums tracking-tighter drop-shadow-sm`}>
                    {item.value}
                  </span>
                  <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-widest">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Wait Time / Distance Tracker Box */}
            <div className={`rounded-[1.5rem] p-6 md:p-8 border shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group ${result.isPast ? 'bg-slate-50 border-slate-200' : 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100'}`}>
              
              <div className="flex items-center gap-5 relative z-10">
                <div className={`p-4 rounded-2xl border bg-white shadow-sm ${result.isPast ? 'text-slate-400 border-slate-200' : 'text-blue-500 border-blue-100'}`}>
                  {result.isPast ? <CalendarClock size={28} /> : <Hourglass size={28} className="animate-pulse" />}
                </div>
                <div>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">
                    {result.isPast ? "Status: Time Elapsed" : "Status: Approaching"}
                  </h3>
                  <p className="text-slate-700 font-bold mt-1 text-sm md:text-base">
                    {result.isPast 
                      ? "This date has already passed in real-time." 
                      : "Distance in days to reach this target age."}
                  </p>
                </div>
              </div>
              
              <div className="text-center md:text-right w-full md:w-auto relative z-10 bg-white md:bg-transparent p-4 md:p-0 rounded-2xl border md:border-none border-slate-100">
                <span className={`text-4xl md:text-5xl font-black tracking-tighter tabular-nums drop-shadow-sm ${result.isPast ? 'text-slate-500' : 'text-blue-600'}`}>
                  {Math.abs(result.daysToWait).toLocaleString()}
                </span>
                <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">
                  {result.isPast ? "Days Ago" : "Days to Go"}
                </span>
              </div>
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

        {/* SEO CONTENT SECTION - JUST PASTE AT THE BOTTOM */}
<div className="mt-16 bg-white p-6 md:p-10 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 max-w-4xl mx-auto mb-12">
  <div className="prose prose-slate max-w-none">
    <h2 className="text-2xl font-black text-slate-800 mb-4">What is Future Age Calculator?</h2>
    <p className="text-slate-600 font-medium leading-relaxed mb-6">
      A Future Age Calculator is an online tool that calculates how old you will be on a selected future date. The tool gives instant and accurate results without manual calculations.
    </p>
    
    <div className="bg-indigo-50/50 p-5 rounded-2xl border border-indigo-100 mb-8 flex flex-col sm:flex-row gap-6">
      <div className="flex-1">
        <h4 className="font-bold text-indigo-900 mb-2">The calculator compares:</h4>
        <ul className="list-disc pl-5 text-indigo-800/80 font-medium space-y-1">
          <li>Your Date of Birth</li>
          <li>Selected Future Date</li>
        </ul>
      </div>
      <div className="flex-1">
        <h4 className="font-bold text-indigo-900 mb-2">After calculation, it shows:</h4>
        <ul className="list-disc pl-5 text-indigo-800/80 font-medium space-y-1">
          <li>Future age in years, months, and days</li>
          <li>Total remaining days to reach that age</li>
        </ul>
      </div>
    </div>

    <h3 className="text-xl font-bold text-slate-800 mb-3">How to Use the Future Age Calculator</h3>
    <p className="text-slate-600 font-medium mb-3">Using this tool is very simple and beginner friendly. Steps to use:</p>
    <ul className="list-decimal pl-5 text-slate-600 font-medium mb-8 space-y-2">
      <li>Enter your Date of Birth.</li>
      <li>Select a future target date.</li>
      <li>Click on the <strong>Initialize Time Travel</strong> button.</li>
      <li>Instantly view your exact future age result.</li>
    </ul>

    <h3 className="text-xl font-bold text-slate-800 mb-3">Common Mistakes While Calculating Future Age</h3>
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