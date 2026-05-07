"use client";

import React, { useState, useEffect } from "react";
import { 
  Palmtree, 
  TrendingUp, 
  PiggyBank, 
  Coins, 
  CalendarClock, 
  AlertCircle,
  Sparkles,
  Info,
  RotateCcw,
  Target,
  Banknote
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

export default function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState<number | "">("");
  const [retireAge, setRetireAge] = useState<number | "">("");
  const [monthlyExpense, setMonthlyExpense] = useState<number | "">("");
  const [inflation, setInflation] = useState<number | "">(6);
  const [error, setError] = useState("");

  const [result, setResult] = useState<{
    yearsLeft: number;
    futureMonthlyExpense: number;
    targetCorpus: number;
  } | null>(null);

  // Deep Financial Engine & Inflation Logic
  useEffect(() => {
    if (currentAge === "" || retireAge === "" || monthlyExpense === "" || inflation === "") {
      setResult(null);
      setError("");
      return;
    }

    const cAge = Number(currentAge);
    const rAge = Number(retireAge);
    const mExpense = Number(monthlyExpense);
    const infRate = Number(inflation);

    if (cAge >= rAge) {
      setError("Retirement age must be greater than current age.");
      setResult(null);
      return;
    }
    
    if (cAge <= 0 || rAge <= 0 || mExpense <= 0 || infRate < 0) {
      setError("Please enter valid positive numbers.");
      setResult(null);
      return;
    }

    if (rAge > 100 || cAge > 100) {
       setError("Please enter realistic age parameters.");
       setResult(null);
       return;
    }

    setError("");

    // Calculate Years Left
    const yearsLeft = rAge - cAge;

    // Future Monthly Expense due to Inflation: FV = PV * (1 + r)^n
    const futureMonthlyExpense = mExpense * Math.pow(1 + infRate / 100, yearsLeft);

    // Target Corpus using the 4% Rule (Annual Expense * 25)
    const futureAnnualExpense = futureMonthlyExpense * 12;
    const targetCorpus = futureAnnualExpense * 25;

    setResult({
      yearsLeft,
      futureMonthlyExpense,
      targetCorpus
    });

  }, [currentAge, retireAge, monthlyExpense, inflation]);

  const handleReset = () => {
    setCurrentAge("");
    setRetireAge("");
    setMonthlyExpense("");
    setInflation(6);
    setResult(null);
    setError("");
  };

  // Indian Currency Formatter
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <CalcShell 
      title="Retirement Planner" 
      description="Calculate your exact inflation-adjusted financial targets to build your golden years' wealth."
    >
      {/* Ultra-Premium 3D Elevated Container */}
      <div className="max-w-4xl mx-auto bg-gradient-to-b from-[#131c2f] to-[#0b1120] p-6 md:p-10 rounded-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(249,115,22,0.15)] border border-slate-700/60 border-t-orange-500/40 relative overflow-hidden group">
        
        {/* Animated Cyber Orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-72 h-72 bg-orange-600/20 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute bottom-[-10%] left-[-20%] w-72 h-72 bg-emerald-600/10 blur-[100px] rounded-full pointer-events-none transition-all duration-1000 group-hover:scale-110"></div>
        <div className="absolute top-[40%] left-[30%] w-40 h-40 bg-blue-500/10 blur-[80px] rounded-full pointer-events-none"></div>

        {/* --- DUAL CYBER INPUT GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10 mb-8">
          
          {/* Input Box 1: Current Age */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-5 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] flex flex-col justify-between focus-within:border-cyan-500/30 transition-all">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400 mb-3">
              <CalendarClock size={16} /> Current Age
            </label>
            <div className="relative">
              <input 
                type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-black/40 border border-slate-700/50 focus:border-cyan-500/50 text-white text-2xl font-black py-4 px-5 rounded-xl outline-none placeholder:text-slate-700 transition-all shadow-inner"
                placeholder="25"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-slate-700 uppercase text-xs tracking-widest">YRS</span>
            </div>
          </div>

          {/* Input Box 2: Retirement Age */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-5 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] flex flex-col justify-between focus-within:border-emerald-500/30 transition-all">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400 mb-3">
              <Palmtree size={16} /> Target Retire Age
            </label>
            <div className="relative">
              <input 
                type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-black/40 border border-slate-700/50 focus:border-emerald-500/50 text-white text-2xl font-black py-4 px-5 rounded-xl outline-none placeholder:text-slate-700 transition-all shadow-inner"
                placeholder="60"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-slate-700 uppercase text-xs tracking-widest">YRS</span>
            </div>
          </div>

          {/* Input Box 3: Monthly Expense */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-5 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] flex flex-col justify-between focus-within:border-orange-500/30 transition-all">
            <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-orange-400 mb-3">
              <Coins size={16} /> Today's Monthly Expense
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-5 font-black text-orange-500/50 text-2xl">₹</span>
              <input 
                type="number" value={monthlyExpense} onChange={(e) => setMonthlyExpense(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-black/40 border border-slate-700/50 focus:border-orange-500/50 text-white text-2xl font-black py-4 pl-12 pr-5 rounded-xl outline-none placeholder:text-slate-700 transition-all shadow-inner"
                placeholder="50000"
              />
            </div>
          </div>

          {/* Input Box 4: Inflation Rate */}
          <div className="bg-[#0f172a]/80 backdrop-blur-md p-5 rounded-3xl border border-white/5 shadow-[inset_0_4px_10px_rgba(0,0,0,0.4)] flex flex-col justify-between focus-within:border-red-500/30 transition-all">
            <div className="flex items-center justify-between mb-3">
              <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400">
                <TrendingUp size={16} /> Expected Inflation
              </label>
              <span className="text-[9px] font-black bg-red-500/10 text-red-400 px-2 py-0.5 rounded-full border border-red-500/20">India Avg: ~6%</span>
            </div>
            <div className="relative">
              <input 
                type="number" value={inflation} onChange={(e) => setInflation(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full bg-black/40 border border-slate-700/50 focus:border-red-500/50 text-white text-2xl font-black py-4 px-5 rounded-xl outline-none placeholder:text-slate-700 transition-all shadow-inner"
                placeholder="6"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 font-black text-red-500/50 text-2xl">%</span>
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 text-center text-sm font-bold mb-6 animate-pulse bg-red-500/10 py-3 rounded-xl border border-red-500/20"><AlertCircle size={14} className="inline mr-1"/> {error}</p>}

        {/* --- RESET BUTTON --- */}
        {(currentAge !== "" || retireAge !== "" || monthlyExpense !== "") && !result && (
          <button onClick={handleReset} className="w-full max-w-xs mx-auto mb-6 bg-slate-800/50 border border-slate-700/50 text-slate-400 py-3.5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-700/80 hover:text-white transition-all active:scale-95 relative z-10 shadow-lg">
            <RotateCcw size={16} /> Reset Parameters
          </button>
        )}

        {/* --- VIBRANT CYBER DASHBOARD (RESULTS) --- */}
        <div className="transition-all duration-700 relative z-10">
          {!result && !error ? (
            /* Sci-Fi Empty State */
            <div className="h-48 flex flex-col items-center justify-center border-2 border-dashed border-slate-700 rounded-3xl bg-black/20 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] mt-4 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 group-hover:opacity-30 transition-opacity animate-pulse"></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                    <PiggyBank size={40} className="text-orange-500/50 mb-3 animate-bounce" />
                    <p className="text-lg font-black tracking-tight text-slate-400">Awaiting Financial Parameters</p>
                    <p className="text-xs font-bold text-slate-500 mt-1 uppercase tracking-widest">Enter data to generate wealth projection.</p>
                </div>
            </div>
          ) : result && !error ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700 border-t border-slate-800/50 pt-8 mt-4">
              
              {/* Giant Target Corpus Card */}
              <div className="bg-[#0f172a]/90 backdrop-blur-xl rounded-[2rem] p-8 md:p-12 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-orange-500/20 group">
                {/* Radar Sweep Effect for wealth accumulation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(249,115,22,0)_0%,rgba(249,115,22,0.05)_50%,rgba(249,115,22,0)_100%)] animate-spin-slow pointer-events-none"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none transition-all group-hover:bg-orange-500/20"></div>
                
                <div className="text-center mb-6 relative z-10">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-4 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                    <Target size={12} /> Target Retirement Corpus
                  </span>
                  <h2 className="text-sm md:text-base font-bold text-slate-400 tracking-wide max-w-md mx-auto">
                    To maintain your current lifestyle without running out of money, you need to build a total wealth of:
                  </h2>
                </div>

                <div className="text-center relative z-10 mb-8">
                  <span className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-orange-400 to-red-500 tracking-tighter drop-shadow-[0_0_30px_rgba(249,115,22,0.3)] tabular-nums block">
                    {formatCurrency(result.targetCorpus)}
                  </span>
                </div>

                {/* Info Note on 4% Rule (Dark Styled) */}
                <div className="relative z-10 max-w-xl mx-auto bg-black/40 border border-white/5 rounded-2xl p-4 flex gap-3 text-left shadow-inner">
                  <Info size={20} className="text-cyan-400 shrink-0 mt-0.5" />
                  <p className="text-[11px] md:text-xs font-medium text-slate-400 leading-relaxed">
                    Based on the <strong className="text-cyan-400">Safe Withdrawal Rate (4% Rule)</strong>. This target is exactly 25x of your future annual expenses, ensuring your investments outlast inflation.
                  </p>
                </div>
              </div>

              {/* Sub-Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Time Left Metric */}
                <div className="bg-gradient-to-br from-[#0f172a] to-slate-900 border border-emerald-500/20 rounded-[1.5rem] p-6 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-emerald-400 flex items-center gap-2 mb-2">
                        <CalendarClock size={16} /> Time to Build
                      </h3>
                      <p className="text-slate-400 font-medium text-xs">Active years left to invest.</p>
                    </div>
                    <div className="flex items-baseline gap-1 text-right">
                      <span className="text-5xl font-black text-white tracking-tighter tabular-nums drop-shadow-md">{result.yearsLeft}</span>
                      <span className="text-[10px] font-black text-emerald-500/50 uppercase tracking-widest">YRS</span>
                    </div>
                  </div>
                </div>

                {/* Inflation Impact Metric */}
                <div className="bg-gradient-to-br from-[#0f172a] to-slate-900 border border-red-500/20 rounded-[1.5rem] p-6 shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none"></div>
                  <div className="relative z-10 flex items-center justify-between">
                    <div>
                      <h3 className="text-[11px] font-black uppercase tracking-widest text-red-400 flex items-center gap-2 mb-2">
                        <TrendingUp size={16} /> Inflation Impact
                      </h3>
                      <p className="text-slate-400 font-medium text-[10px] max-w-[130px] leading-tight">
                        Current ₹{monthlyExpense} will cost this much in {result.yearsLeft} years.
                      </p>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <span className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-rose-600 tracking-tighter tabular-nums block drop-shadow-lg">
                        {formatCurrency(result.futureMonthlyExpense)}
                      </span>
                      <span className="text-[9px] font-black text-red-500/50 uppercase tracking-[0.2em] mt-1">/ Month</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Reset Tool */}
              <div className="pt-2 flex justify-center">
                  <button onClick={handleReset} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-orange-400 flex items-center gap-1.5 transition-colors">
                    <RotateCcw size={12} /> Start New Calculation
                  </button>
              </div>

            </div>
          ) : null}
        </div>

      </div>
    </CalcShell>
  );
}