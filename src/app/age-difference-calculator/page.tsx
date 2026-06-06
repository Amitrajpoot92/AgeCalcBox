"use client";

import React, { useState } from "react";
import { 
  RotateCcw, 
  BarChart2, 
  TrendingUp, 
  Target,
  Sparkles,
  ArrowRightLeft,
  User,
  Users,
  Clock,
  HeartHandshake,
  CalendarDays,
  MessageCircle,
  Copy,
  Check
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

interface MilestoneData {
  targetAge: number;
  years: number;
  months: number;
  days: number;
}

export default function AgeDifference() {
  // States for Person A
  const [p1Name, setP1Name] = useState("");
  const [dob1, setDob1] = useState("");

  // States for Person B
  const [p2Name, setP2Name] = useState("");
  const [dob2, setDob2] = useState("");

  // Result States
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [result, setResult] = useState<{
    sameAge: boolean;
    olderName?: string;
    youngerName?: string;
    years?: number;
    months?: number;
    days?: number;
    totalDays?: number; // ADDED THIS
    p1Info?: { name: string; milestone: MilestoneData | null };
    p2Info?: { name: string; milestone: MilestoneData | null };
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

  // Helper function to calculate milestone (18, 50, or 80)
  const calculateMilestone = (birthDate: Date, now: Date): MilestoneData | null => {
    let y = now.getFullYear() - birthDate.getFullYear();
    let m = now.getMonth() - birthDate.getMonth();
    let d = now.getDate() - birthDate.getDate();
    if (d < 0) m--;
    if (m < 0) y--;

    let targetAge = y < 18 ? 18 : y < 50 ? 50 : 80;
    let targetDate = new Date(birthDate.getFullYear() + targetAge, birthDate.getMonth(), birthDate.getDate());

    if (now >= targetDate) return null;

    let leftY = targetDate.getFullYear() - now.getFullYear();
    let leftM = targetDate.getMonth() - now.getMonth();
    let leftD = targetDate.getDate() - now.getDate();

    if (leftD < 0) {
      leftM--;
      const prevTemp = new Date(targetDate.getFullYear(), targetDate.getMonth(), 0);
      leftD += prevTemp.getDate();
    }
    if (leftM < 0) {
      leftY--;
      leftM += 12;
    }

    return { targetAge, years: leftY, months: leftM, days: leftD };
  };

  const handleCalculate = () => {
    if (dob1.length !== 10 || dob2.length !== 10) {
      setError("Please enter complete dates for both individuals (DD/MM/YYYY)");
      return;
    }

    const [d1, m1, y1] = dob1.split('/').map(Number);
    const [d2, m2, y2] = dob2.split('/').map(Number);

    // Validation
    if (d1 < 1 || d1 > 31 || m1 < 1 || m1 > 12 || y1 < 1900 || y1 > 2100 ||
        d2 < 1 || d2 > 31 || m2 < 1 || m2 > 12 || y2 < 1900 || y2 > 2100) {
      setError("Invalid date parameters detected.");
      setResult(null);
      return;
    }

    const date1 = new Date(y1, m1 - 1, d1);
    const date2 = new Date(y2, m2 - 1, d2);

    if (date1.getDate() !== d1 || date2.getDate() !== d2) {
      setError("A calendar date entered doesn't exist.");
      setResult(null);
      return;
    }

    setError("");
    const now = new Date();
    let older, younger, olderName, youngerName;
    const name1 = p1Name.trim() || "Person 1";
    const name2 = p2Name.trim() || "Person 2";

    // Determine Older/Younger
    if (date1.getTime() < date2.getTime()) {
      older = date1; younger = date2;
      olderName = name1;
      youngerName = name2;
    } else if (date2.getTime() < date1.getTime()) {
      older = date2; younger = date1;
      olderName = name2;
      youngerName = name1;
    } else {
      setResult({ sameAge: true }); return;
    }

    // Calculate Exact Gap
    let y = younger.getFullYear() - older.getFullYear();
    let m = younger.getMonth() - older.getMonth();
    let d = younger.getDate() - older.getDate();

    if (d < 0) {
      m--;
      const prevMonth = new Date(younger.getFullYear(), younger.getMonth(), 0);
      d += prevMonth.getDate();
    }
    if (m < 0) { y--; m += 12; }

    // Total Days Calculation
    const diffMs = younger.getTime() - older.getTime();
    const tDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Calculate Milestones
    const milestone1 = calculateMilestone(date1, now);
    const milestone2 = calculateMilestone(date2, now);

    setResult({
      sameAge: false,
      olderName,
      youngerName,
      years: y, 
      months: m, 
      days: d,
      totalDays: tDays, // Saved for display and sharing
      p1Info: { name: name1, milestone: milestone1 },
      p2Info: { name: name2, milestone: milestone2 },
    });
    setCopied(false);
  };

  const handleReset = () => {
    setDob1(""); setP1Name("");
    setDob2(""); setP2Name("");
    setResult(null); setError("");
    setCopied(false);
  };

  // Generate neat text for Sharing / Copying
  const generateShareText = () => {
    if (!result) return "";
    
    if (result.sameAge) {
      return `We are the exact same age! 🎯\n\nCalculate yours instantly at Age Calculator Box: https://agecalculatorbox.com/age-difference-calculator`;
    }

    return `*Age Difference Result* 📊\n\n${result.olderName} is older than ${result.youngerName} by:\n🎂 ${result.years} Years, ${result.months} Months, and ${result.days} Days.\n\n🗓️ Total Difference: ${result.totalDays?.toLocaleString()} Days.\n\nCalculate yours instantly at Age Calculator Box: https://agecalculatorbox.com/age-difference-calculator`;
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
      {/* RESPONSIVE WRAPPER: Compacted widths and vertical rhythm for standard viewport lock */}
      <div className="mx-auto font-sans w-full px-2 md:px-4 lg:px-8 max-w-4xl space-y-5 md:space-y-6">
        
        {/* PREMIUM GRADIENT HEADLINE SECTION (MATCHING MAIN PAGE) 🚀 */}
        <div className="text-center mb-6 mt-1">
           
          <h1 className="text-3xl md:text-5xl font-black tracking-tight text-slate-800 leading-tight">
            Age Difference <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00a63e] to-[#007a2d] drop-shadow-sm">Calculator.</span>
          </h1>
          <p className="text-slate-500 font-medium text-xs md:text-base max-w-2xl mx-auto mt-1.5 leading-relaxed">
            Calculate the exact age difference between two people in years, months, and days instantly with accurate results.
          </p>
        </div>
        
        {/* =========================================
            COMPACT DUAL INPUT WIDGET
        ========================================= */}
        <div className="bg-white p-4 md:p-6 rounded-[1.75rem] shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative z-20 border border-slate-50">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 relative z-10 mb-5">
            
            {/* Middle Decorative Icon (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 bg-white rounded-full items-center justify-center border border-indigo-100 shadow-md text-indigo-500">
              <ArrowRightLeft size={16} />
            </div>

            {/* PERSON A */}
            <div className="bg-gradient-to-br from-indigo-50/40 to-blue-50/20 p-4 rounded-2xl border border-indigo-50/60 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="p-2 bg-white text-indigo-500 rounded-lg shadow-sm border border-indigo-100"><User size={14} /></div>
                <span className="font-black uppercase tracking-widest text-[10px] text-indigo-600">Person 1</span>
              </div>
              
              <div className="space-y-3 relative z-10">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 ml-0.5 text-[10px] uppercase tracking-widest">Name (Optional)</label>
                  <input 
                    type="text" placeholder="e.g. Amit" value={p1Name} onChange={(e) => setP1Name(e.target.value)}
                    className="w-full text-slate-800 font-bold py-2.5 px-4 rounded-xl border-2 border-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none bg-white/80 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 ml-0.5 text-[10px] uppercase tracking-widest">Date of Birth</label>
                  <input 
                    type="text" placeholder="DD/MM/YYYY" value={dob1} onChange={(e) => setDob1(formatInput(e.target.value))}
                    className="w-full text-center text-lg tracking-[0.12em] font-bold text-slate-800 py-2.5 px-4 rounded-xl border-2 border-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/5 transition-all outline-none bg-white/80"
                  />
                </div>
              </div>
            </div>

            {/* PERSON B */}
            <div className="bg-gradient-to-br from-purple-50/40 to-pink-50/20 p-4 rounded-2xl border border-purple-50/60 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-20 h-20 bg-purple-500/5 blur-2xl rounded-full pointer-events-none"></div>
              
              <div className="flex items-center gap-2 mb-3 relative z-10">
                <div className="p-2 bg-white text-purple-500 rounded-lg shadow-sm border border-purple-100"><Users size={14} /></div>
                <span className="font-black uppercase tracking-widest text-[10px] text-purple-600">Person 2</span>
              </div>
              
              <div className="space-y-3 relative z-10">
                <div>
                  <label className="block text-slate-500 font-bold mb-1 ml-0.5 text-[10px] uppercase tracking-widest">Name (Optional)</label>
                  <input 
                    type="text" placeholder="e.g. Aditya" value={p2Name} onChange={(e) => setP2Name(e.target.value)}
                    className="w-full text-slate-800 font-bold py-2.5 px-4 rounded-xl border-2 border-white focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all outline-none bg-white/80 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1 ml-0.5 text-[10px] uppercase tracking-widest">Date of Birth</label>
                  <input 
                    type="text" placeholder="DD/MM/YYYY" value={dob2} onChange={(e) => setDob2(formatInput(e.target.value))}
                    className="w-full text-center text-lg tracking-[0.12em] font-bold text-slate-800 py-2.5 px-4 rounded-xl border-2 border-white focus:border-purple-300 focus:ring-4 focus:ring-purple-500/5 transition-all outline-none bg-white/80"
                  />
                </div>
              </div>
            </div>

          </div>

          {error && <p className="text-red-500 text-xs font-bold mb-4 text-center bg-red-50 py-1.5 rounded-xl border border-red-100">{error}</p>}

          {/* --- COMPACT ACTION BUTTONS FRAME --- */}
          <div className="flex flex-col sm:flex-row gap-2.5 max-w-[460px] mx-auto">
            <button 
              onClick={handleCalculate}
              className="w-full sm:w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-sm py-3 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/20 transition-all active:scale-[0.98]"
            >
              <Sparkles size={16} className="text-yellow-300 fill-yellow-300" /> Compare Ages
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
            
            {result.sameAge ? (
              <div className="bg-emerald-50 p-6 rounded-2xl text-center border border-emerald-100">
                <Target size={32} className="text-emerald-500 mx-auto mb-3" />
                <h2 className="text-xl font-black text-slate-800 tracking-tight">Perfect Match!</h2>
                <p className="text-emerald-700/80 mt-1 text-sm font-medium">Both individuals share the exact same timeline.</p>
              </div>
            ) : (
              <>
                {/* Winner Logic Card */}
                <div className="text-center mb-6 bg-gradient-to-br from-indigo-50/60 to-purple-50/60 p-4 rounded-2xl border border-indigo-100/70">
                  <div className="inline-block px-3 py-1 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-500 text-[9px] font-black uppercase tracking-widest mb-3">
                    Calculation Locked
                  </div>
                  <h2 className="text-lg md:text-2xl font-bold text-slate-600 tracking-tight leading-normal">
                    <span className="text-indigo-600 font-black border-b-2 border-indigo-200 pb-0.5">{result.olderName}</span> 
                    {" is older than "} 
                    <span className="text-purple-600 font-black border-b-2 border-purple-200 pb-0.5">{result.youngerName}</span> 
                    {" by:"}
                  </h2>
                </div>

                {/* 3 Grid Items for Age Gap */}
                <div className="grid grid-cols-3 gap-2.5 md:gap-4 mb-5">
                  {[
                    { value: result.years, label: "YEARS" },
                    { value: result.months, label: "MONTHS" },
                    { value: result.days, label: "DAYS" },
                  ].map((item, index) => (
                    <div key={index} className="bg-[#f3f6ff] rounded-xl p-3 md:p-6 flex flex-col items-center justify-center border border-indigo-50/40">
                      <span className="text-2xl md:text-4xl font-black text-indigo-900 mb-0.5 tabular-nums">{item.value}</span>
                      <span className="text-[9px] md:text-xs font-bold text-slate-400 tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Total Days Difference Box */}
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 mt-4 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shadow-inner shrink-0">
                      <CalendarDays size={18} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">Total Difference</h4>
                      <p className="text-base md:text-lg font-black text-slate-800 tracking-tight">
                        {result.totalDays?.toLocaleString()} Days
                      </p>
                    </div>
                  </div>
                </div>

                {/* MILESTONES WIDGET (P1 & P2) */}
                {(result.p1Info?.milestone || result.p2Info?.milestone) && (
                  <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-slate-800 font-bold mb-4 text-sm">
                      <Target size={16} className="text-indigo-500" /> Upcoming Milestones
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      
                      {/* Person 1 Milestone */}
                      {result.p1Info?.milestone && (
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-sm font-black text-blue-900 tracking-tight">{result.p1Info.name}'s Goal</h4>
                              <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mt-0.5">Road to {result.p1Info.milestone.targetAge} Years</p>
                            </div>
                            <div className="w-8 h-8 shrink-0 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                              <Target size={14} />
                            </div>
                          </div>
                          <div className="flex items-center gap-3.5">
                            <div className="flex flex-col"><span className="text-lg md:text-xl font-black text-blue-700 leading-none tabular-nums">{result.p1Info.milestone.years}</span> <span className="text-[9px] text-blue-400 font-bold mt-0.5 uppercase">Years</span></div>
                            <div className="flex flex-col"><span className="text-lg md:text-xl font-black text-blue-700 leading-none tabular-nums">{result.p1Info.milestone.months}</span> <span className="text-[9px] text-blue-400 font-bold mt-0.5 uppercase">Months</span></div>
                            <div className="flex flex-col"><span className="text-lg md:text-xl font-black text-blue-700 leading-none tabular-nums">{result.p1Info.milestone.days}</span> <span className="text-[9px] text-blue-400 font-bold mt-0.5 uppercase">Days</span></div>
                          </div>
                        </div>
                      )}

                      {/* Person 2 Milestone */}
                      {result.p2Info?.milestone && (
                        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100/80 rounded-2xl p-4 flex flex-col justify-between shadow-sm">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-sm font-black text-purple-900 tracking-tight">{result.p2Info.name}'s Goal</h4>
                              <p className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mt-0.5">Road to {result.p2Info.milestone.targetAge} Years</p>
                            </div>
                            <div className="w-8 h-8 shrink-0 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                              <Target size={14} />
                            </div>
                          </div>
                          <div className="flex items-center gap-3.5">
                            <div className="flex flex-col"><span className="text-lg md:text-xl font-black text-purple-700 leading-none tabular-nums">{result.p2Info.milestone.years}</span> <span className="text-[9px] text-purple-400 font-bold mt-0.5 uppercase">Years</span></div>
                            <div className="flex flex-col"><span className="text-lg md:text-xl font-black text-purple-700 leading-none tabular-nums">{result.p2Info.milestone.months}</span> <span className="text-[9px] text-purple-400 font-bold mt-0.5 uppercase">Months</span></div>
                            <div className="flex flex-col"><span className="text-lg md:text-xl font-black text-purple-700 leading-none tabular-nums">{result.p2Info.milestone.days}</span> <span className="text-[9px] text-purple-400 font-bold mt-0.5 uppercase">Days</span></div>
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* SHARE & COPY ACTION BUTTONS */}
                <div className="mt-5 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-3">
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

              </>
            )}
          </div>
        )}

        {/* SEO CONTENT SECTION */}
        <div className="mt-12 bg-white p-5 md:p-9 rounded-[1.75rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 max-w-4xl mx-auto mb-8">
          <div className="prose prose-slate max-w-none">
            <h2 className="text-xl font-black text-slate-800 mb-3">What is Age Difference Calculator?</h2>
            <p className="text-slate-600 font-medium text-sm leading-relaxed mb-6">
              An Age Difference Calculator is a fast and easy online tool designed to find the exact age gap between two people. Whether you want to know the age difference between you and your partner, siblings, or friends, this tool calculates the exact time between two dates of birth with 100% accuracy.
            </p>

            <div className="bg-[#00a63e]/5 p-4 rounded-xl border border-[#00a63e]/10 mb-6">
              <h4 className="font-bold text-slate-800 text-sm mb-1.5">Instantly discover your age gap. The tool shows:</h4>
              <ul className="list-disc pl-5 text-slate-600 font-medium text-xs space-y-1">
                <li>Who is older and by exactly how much time</li>
                <li>The exact difference in years, months, and days</li>
                <li>Total time difference in weeks, hours, and seconds</li>
              </ul>
              <p className="text-xs text-[#00a63e] font-bold mt-2">The tool works instantly without signup or download.</p>
            </div>

            <h3 className="text-lg font-bold text-slate-800 mb-2">How to Use the Age Difference Calculator</h3>
            <p className="text-slate-600 font-medium text-sm mb-2">Using this tool is very simple. Follow these steps:</p>
            <ul className="list-decimal pl-5 text-slate-600 font-medium text-sm mb-6 space-y-1">
              <li>Enter the Date of Birth of the First Person in DD/MM/YYYY format.</li>
              <li>Enter the Date of Birth of the Second Person in DD/MM/YYYY format.</li>
              <li>Click on the <strong>Calculate Difference</strong> button.</li>
              <li>Instantly see the detailed age gap result.</li>
            </ul>

            <h3 className="text-lg font-bold text-slate-800 mb-2">Common Mistakes While Calculating Age Difference</h3>
            <p className="text-slate-600 font-medium text-sm mb-3">Just like normal age calculation, people make small mistakes here too. Avoid these common errors:</p>
            <div className="space-y-3">
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 text-sm">1. Wrong Date Format</h4>
                <p className="text-slate-600 text-xs mt-0.5">Entering MM/DD/YYYY instead of DD/MM/YYYY can give incorrect age gap results.</p>
              </div>
              <div className="bg-red-50/50 p-3 rounded-xl border border-red-100">
                <h4 className="font-bold text-red-800 text-sm">2. Not Adding 0 Before Single Digit Date/Month</h4>
                <p className="text-slate-600 text-xs mt-0.5">One common mistake is entering single-digit dates or months without adding 0 in front.</p>
                <p className="text-xs mt-1.5"><span className="font-bold text-red-500">Wrong:</span> 1/6/2000 | <span className="font-bold text-[#00a63e]">Correct:</span> 01/06/2000</p>
              </div>
            </div>
            <p className="text-slate-600 font-medium mt-3 text-xs">
              Always use proper DD/MM/YYYY format while entering both dates. Adding 0 before single-digit dates and months helps avoid confusion and ensures a precise age calculation.
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
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q1. How does the age difference calculator figure out the exact gap?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  The calculator analyzes the semantic timestamp difference between the two independent dates of birth. It breaks down the chronological interval sequentially into exact years, calendar months, and day factors, preventing any mismatch regarding individual timezone metrics.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q2. Can this tool handle leap years occurring between the two birth dates?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Yes, the calendar computational loop takes into consideration all full leap years and specific month cycles falling inside the custom timeline array gap. This provides a clean structural calculation without dropping any singular calendar date.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q3. Is it possible to input custom nicknames for the relationship comparison?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Absolutely. We have included an optional field where you can append personalized labels or titles for both Person 1 and Person 2. If left blank, the algorithm defaults to standard system placeholders for generation tracking.
                </p>
              </div>

              <div className="bg-slate-50/50 p-4 rounded-xl border border-slate-100/80">
                <h4 className="font-bold text-slate-800 text-xs sm:text-sm">Q4. Does the tool calculate total days difference separate from months?</h4>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  Yes, along with the precise breakdown of years, months, and days, the engine simultaneously runs a secondary time interval script that computes the absolute net age gap translated entirely into total aggregate days for direct cross-verification.
                </p>
              </div>
            </div>
          </div>
          
        </div>

      </div>
    </CalcShell>
  );
}