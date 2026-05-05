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
  Info
} from "lucide-react";
import CalcShell from "@/components/calculators/CalcShell";

export default function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState<number | "">(25);
  const [retireAge, setRetireAge] = useState<number | "">(60);
  const [monthlyExpense, setMonthlyExpense] = useState<number | "">(50000);
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
      setError("Retirement age must be greater than your current age.");
      setResult(null);
      return;
    }
    
    if (cAge <= 0 || rAge <= 0 || mExpense < 0 || infRate < 0) {
      setError("Please enter valid positive numbers.");
      setResult(null);
      return;
    }

    setError("");

    // Calculate Years Left
    const yearsLeft = rAge - cAge;

    // Calculate Future Monthly Expense due to Inflation
    // Formula: Future Value = Present Value * (1 + inflationRate)^years
    const futureMonthlyExpense = mExpense * Math.pow(1 + infRate / 100, yearsLeft);

    // Calculate Target Corpus using the 4% Rule (Annual Expense * 25)
    const futureAnnualExpense = futureMonthlyExpense * 12;
    const targetCorpus = futureAnnualExpense * 25;

    setResult({
      yearsLeft,
      futureMonthlyExpense,
      targetCorpus
    });

  }, [currentAge, retireAge, monthlyExpense, inflation]);

  // Utility to format currency smartly (Indian Format for local feel)
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
      description="Plan your golden years. Calculate your exact retirement timeline and inflation-adjusted financial targets."
    >
      <div className="space-y-8">
        
        {/* --- INPUT SECTION --- */}
        <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-sm border border-gray-100 relative overflow-hidden">
          {/* Subtle Golden Glow */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/5 blur-3xl rounded-full"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            
            {/* Input 1: Current Age */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                <CalendarClock size={14} className="text-orange-500" />
                Current Age
              </label>
              <input 
                type="number" 
                value={currentAge}
                onChange={(e) => setCurrentAge(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-500/10 text-gray-900 text-lg font-bold outline-none transition-all"
                placeholder="e.g. 25"
              />
            </div>

            {/* Input 2: Retirement Age */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                <Palmtree size={14} className="text-[#00a63e]" />
                Retirement Age
              </label>
              <input 
                type="number" 
                value={retireAge}
                onChange={(e) => setRetireAge(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#00a63e] focus:bg-white focus:ring-4 focus:ring-[#00a63e]/10 text-gray-900 text-lg font-bold outline-none transition-all"
                placeholder="e.g. 60"
              />
            </div>

            {/* Input 3: Current Monthly Expense */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                <Coins size={14} className="text-blue-500" />
                Today's Monthly Exp.
              </label>
              <input 
                type="number" 
                value={monthlyExpense}
                onChange={(e) => setMonthlyExpense(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-4 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 text-gray-900 text-lg font-bold outline-none transition-all"
                placeholder="₹ 50000"
              />
            </div>

            {/* Input 4: Expected Inflation Rate */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-gray-500 ml-1">
                <TrendingUp size={14} className="text-red-500" />
                Inflation Rate (%)
              </label>
              <div className="relative">
                <input 
                  type="number" 
                  value={inflation}
                  onChange={(e) => setInflation(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-4 pr-10 bg-gray-50 rounded-2xl border-2 border-transparent focus:border-red-500 focus:bg-white focus:ring-4 focus:ring-red-500/10 text-gray-900 text-lg font-bold outline-none transition-all"
                  placeholder="6"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 font-black text-gray-300">%</span>
              </div>
            </div>

          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 flex items-center justify-center gap-2 text-red-500 bg-red-50 p-4 rounded-xl text-sm font-bold animate-in fade-in">
              <AlertCircle size={18} />
              {error}
            </div>
          )}
        </div>

        {/* --- RESULTS SECTION --- */}
        <div className="transition-all duration-700">
          {!result && !error ? (
            /* Empty State */
            <div className="bg-gray-50/50 border-2 border-dashed border-gray-200 rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center h-64">
              <PiggyBank size={40} className="text-gray-300 mb-4" />
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Set Your Targets</h3>
              <p className="text-sm font-medium text-gray-500 mt-2 max-w-sm">
                Enter your details above to calculate the wealth needed for a peaceful retirement.
              </p>
            </div>
          ) : result && !error ? (
            /* Result Dashboard */
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
              
              {/* Main Financial Target Card */}
              <div className="bg-[#121826] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden shadow-2xl group">
                <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 blur-[100px] rounded-full pointer-events-none transition-all duration-700 group-hover:bg-orange-500/20"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00a63e]/10 blur-[80px] rounded-full pointer-events-none"></div>
                
                <div className="text-center mb-8 relative z-10">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-[10px] font-black uppercase tracking-widest mb-4">
                    <Sparkles size={12} /> Target Corpus
                  </span>
                  <h2 className="text-lg md:text-xl font-bold text-gray-400 tracking-tight">
                    To maintain your lifestyle, you will need to save:
                  </h2>
                </div>

                {/* Big Number (Target Corpus) */}
                <div className="text-center relative z-10 mb-8">
                  <span className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-400 tracking-tighter drop-shadow-2xl tabular-nums">
                    {formatCurrency(result.targetCorpus)}
                  </span>
                </div>

                {/* Info Note on 4% Rule */}
                <div className="relative z-10 max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-4 flex gap-3 text-left">
                  <Info size={24} className="text-orange-400 shrink-0" />
                  <p className="text-xs font-medium text-gray-400 leading-relaxed">
                    This logic uses the <strong className="text-white">Safe Withdrawal Rate (4% Rule)</strong>. It calculates that you need a corpus equal to 25 times your future annual expenses so you never run out of money.
                  </p>
                </div>
              </div>

              {/* Sub-Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Time Left Metric */}
                <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:border-[#00a63e]/30 transition-all duration-500 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-gray-400 flex items-center gap-2 mb-1">
                      <CalendarClock size={16} className="text-[#00a63e]" />
                      Time to Build
                    </h3>
                    <p className="text-gray-900 font-bold text-sm">Years left until retirement.</p>
                  </div>
                  <div className="flex items-end gap-1">
                    <span className="text-5xl font-black text-gray-900 tracking-tighter">{result.yearsLeft}</span>
                    <span className="text-sm font-bold text-gray-400 mb-1.5 uppercase">YRS</span>
                  </div>
                </div>

                {/* Inflation Impact Metric */}
                <div className="bg-red-50/50 border border-red-100 rounded-[2rem] p-8 shadow-sm hover:border-red-200 transition-all duration-500 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-red-400 flex items-center gap-2 mb-1">
                      <TrendingUp size={16} className="text-red-500" />
                      Inflation Impact
                    </h3>
                    <p className="text-red-900/60 font-bold text-[11px] leading-tight max-w-[150px]">
                      Your current ₹{monthlyExpense} monthly expense will cost this much at age {retireAge}.
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl md:text-4xl font-black text-red-600 tracking-tighter tabular-nums block">
                      {formatCurrency(result.futureMonthlyExpense)}
                    </span>
                    <span className="text-[10px] font-bold text-red-400 uppercase tracking-widest">Per Month</span>
                  </div>
                </div>

              </div>
            </div>
          ) : null}
        </div>

      </div>
    </CalcShell>
  );
}