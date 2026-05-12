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
  HeartHandshake
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

export default function AgeDifference() {
  // States for Person A
  const [p1Name, setP1Name] = useState("");
  const [dob1, setDob1] = useState("");

  // States for Person B
  const [p2Name, setP2Name] = useState("");
  const [dob2, setDob2] = useState("");

  // Result States
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    sameAge: boolean;
    olderName?: string;
    youngerName?: string;
    years?: number;
    months?: number;
    days?: number;
    gapPercentage?: number;
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
    let older, younger, olderName, youngerName;

    // Determine Older/Younger
    if (date1.getTime() < date2.getTime()) {
      older = date1; younger = date2;
      olderName = p1Name.trim() || "Person A";
      youngerName = p2Name.trim() || "Person B";
    } else if (date2.getTime() < date1.getTime()) {
      older = date2; younger = date1;
      olderName = p2Name.trim() || "Person B";
      youngerName = p1Name.trim() || "Person A";
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

    // Extensive Data Calculation
    const diffMs = younger.getTime() - older.getTime();
    const tDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const gapPercentage = Math.min((tDays / 36500) * 100, 100);

    setResult({
      sameAge: false,
      olderName,
      youngerName,
      years: y, 
      months: m, 
      days: d,
      gapPercentage
    });
  };

  const handleReset = () => {
    setDob1(""); setP1Name("");
    setDob2(""); setP2Name("");
    setResult(null); setError("");
  };

  return (
    <CalcShell 
      title="Age Difference Calculator" 
      description="Compare timelines and discover the exact chronological age gap between two individuals instantly."
    >
      <div className="max-w-[800px] mx-auto font-sans space-y-8">
        
        {/* =========================================
            MAIN DUAL INPUT WIDGET
        ========================================= */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative z-20">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 mb-8">
            
            {/* Middle Decorative Icon (Desktop) */}
            <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white rounded-full items-center justify-center border border-indigo-100 shadow-md text-indigo-500">
              <ArrowRightLeft size={20} />
            </div>

            {/* PERSON A */}
            <div className="bg-gradient-to-br from-indigo-50/50 to-blue-50/30 p-5 rounded-3xl border border-indigo-50 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-2.5 bg-white text-indigo-500 rounded-xl shadow-sm border border-indigo-100"><User size={18} /></div>
                <span className="font-black uppercase tracking-widest text-xs text-indigo-600">Person 1</span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Name (Optional)</label>
                  <input 
                    type="text" placeholder="e.g. Amit" value={p1Name} onChange={(e) => setP1Name(e.target.value)}
                    className="w-full text-slate-800 font-bold py-3.5 px-5 rounded-2xl border-2 border-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Date of Birth</label>
                  <input 
                    type="text" placeholder="DD/MM/YYYY" value={dob1} onChange={(e) => setDob1(formatInput(e.target.value))}
                    className="w-full text-center text-xl tracking-[0.15em] font-black text-slate-800 py-3.5 px-5 rounded-2xl border-2 border-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

            {/* PERSON B */}
            <div className="bg-gradient-to-br from-purple-50/50 to-pink-50/30 p-5 rounded-3xl border border-purple-50 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 blur-2xl rounded-full pointer-events-none transition-transform group-hover:scale-150 duration-500"></div>
              
              <div className="flex items-center gap-2 mb-4 relative z-10">
                <div className="p-2.5 bg-white text-purple-500 rounded-xl shadow-sm border border-purple-100"><Users size={18} /></div>
                <span className="font-black uppercase tracking-widest text-xs text-purple-600">Person 2</span>
              </div>
              
              <div className="space-y-4 relative z-10">
                <div>
                  <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Name (Optional)</label>
                  <input 
                    type="text" placeholder="e.g. Aditya" value={p2Name} onChange={(e) => setP2Name(e.target.value)}
                    className="w-full text-slate-800 font-bold py-3.5 px-5 rounded-2xl border-2 border-white focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 font-bold mb-1.5 ml-1 text-[11px] uppercase tracking-widest">Date of Birth</label>
                  <input 
                    type="text" placeholder="DD/MM/YYYY" value={dob2} onChange={(e) => setDob2(formatInput(e.target.value))}
                    className="w-full text-center text-xl tracking-[0.15em] font-black text-slate-800 py-3.5 px-5 rounded-2xl border-2 border-white focus:border-purple-300 focus:ring-4 focus:ring-purple-500/10 transition-all outline-none bg-white/80 backdrop-blur-sm"
                  />
                </div>
              </div>
            </div>

          </div>

          {error && <p className="text-red-500 text-xs font-bold mb-6 text-center bg-red-50 py-2 rounded-xl border border-red-100">{error}</p>}

          {/* --- BUTTONS --- */}
          <div className="flex flex-col md:flex-row gap-3 max-w-[500px] mx-auto">
            <button 
              onClick={handleCalculate}
              className="w-full md:w-2/3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold text-[16px] py-4 rounded-full flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-indigo-500/30 transition-all active:scale-95"
            >
              <Sparkles size={18} className="text-yellow-300 fill-yellow-300" /> Compare Ages
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
              The Ultimate <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-500">Age Gap Calculator</span>
            </h2>
            <p className="text-slate-500 font-medium text-sm leading-relaxed mb-8 max-w-2xl mx-auto">
              Curious about the exact age difference between you and your partner, sibling, or friend? Enter both dates of birth above to calculate the precise chronological gap in years, months, and days. No data stored, just instant math.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[800px] mx-auto">
              
              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-pink-50 text-pink-500 rounded-[14px] flex items-center justify-center border border-pink-100">
                  <HeartHandshake size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Relationship Gap</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Discover who is older and by exactly how many years, months, and days.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-[14px] flex items-center justify-center border border-indigo-100">
                  <Clock size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Chronological Math</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  Get a deep breakdown of the difference translated into a perfect timeframe.
                </p>
              </div>

              <div className="bg-white p-6 rounded-[1.5rem] shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-100 flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-[14px] flex items-center justify-center border border-emerald-100">
                  <BarChart2 size={22} />
                </div>
                <h3 className="text-[15px] font-bold text-slate-800">Visual Timeline</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">
                  See a visual percentage bar representing the age gap relative to a full century.
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
            
            {result.sameAge ? (
              <div className="bg-emerald-50 p-8 rounded-3xl text-center border border-emerald-100">
                <Target size={40} className="text-emerald-500 mx-auto mb-4" />
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Perfect Match!</h2>
                <p className="text-emerald-700/80 mt-2 font-medium">Both individuals share the exact same timeline.</p>
              </div>
            ) : (
              <>
                {/* Winner Logic Card */}
                <div className="text-center mb-8 bg-gradient-to-br from-indigo-50/80 to-purple-50/80 p-6 rounded-3xl border border-indigo-100">
                  <div className="inline-block px-4 py-1.5 rounded-full bg-white shadow-sm border border-slate-100 text-indigo-500 text-[10px] font-black uppercase tracking-widest mb-4">
                    Calculation Locked
                  </div>
                  <h2 className="text-xl md:text-3xl font-bold text-slate-600 tracking-tight leading-relaxed">
                    <span className="text-indigo-600 font-black border-b-2 border-indigo-200 pb-0.5">{result.olderName}</span> 
                    {" is older than "} 
                    <span className="text-purple-600 font-black border-b-2 border-purple-200 pb-0.5">{result.youngerName}</span> 
                    {" by:"}
                  </h2>
                </div>

                {/* 6 Grid Items for Age Gap (Just like Age Calculator) */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-4 lg:gap-5 mb-8">
                  {[
                    { value: result.years, label: "YEARS" },
                    { value: result.months, label: "MONTHS" },
                    { value: result.days, label: "DAYS" },
                    { value: "00", label: "HOURS" },
                    { value: "00", label: "MINUTES" },
                    { value: "00", label: "SECONDS" },
                  ].map((item, index) => (
                    <div key={index} className="bg-[#f3f6ff] rounded-2xl p-5 md:p-6 flex flex-col items-center justify-center border border-indigo-50/50 transition-transform hover:-translate-y-1">
                      <span className="text-3xl md:text-4xl font-black text-indigo-900 mb-1 tabular-nums drop-shadow-sm">{item.value}</span>
                      <span className="text-xs md:text-sm font-bold text-slate-500 tracking-wider">{item.label}</span>
                    </div>
                  ))}
                </div>

                {/* Timeline Progress Bar representing the Gap */}
                <div className="bg-slate-50 p-6 rounded-3xl border border-slate-100 mt-8 shadow-sm">
                  <div className="flex justify-between items-center mb-5">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
                      <TrendingUp size={16} className="text-indigo-400" /> Timeline Span
                    </span>
                  </div>
                  <div className="w-full h-4 bg-slate-200 rounded-full overflow-hidden shadow-inner">
                    <div 
                      className="h-full bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 relative transition-all duration-1000 ease-out"
                      style={{ width: `${result.gapPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-[10px] font-bold text-slate-400 mt-4 tracking-wide">
                    Visual representation of the age difference span relative to a century (100 Years).
                  </p>
                </div>

              </>
            )}
          </div>
        )}

      </div>
    </CalcShell>
  );
}