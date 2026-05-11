"use client";
import React, { useState } from 'react';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/admin/dashboard'); 
    } catch (err: any) {
      console.log("Firebase Auth Error:", err.code);
      setError('Invalid Credentials. Please try again.');
    }
  };

  return (
    // yahan pt-36 md:pt-40 add kiya gaya hai navbar overlap hatane ke liye
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 pt-36 md:pt-40 pb-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 h-fit">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-[#00a63e]/10 rounded-2xl flex items-center justify-center text-[#00a63e] mb-4 shadow-inner">
            <ShieldCheck size={32} />
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Sign in to manage your website</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Email Address</label>
            <input 
              type="email" 
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-[#00a63e] focus:ring-4 focus:ring-[#00a63e]/10 transition-all font-medium text-slate-800"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-black uppercase tracking-widest text-slate-400 mb-2 ml-1">Password</label>
            <input 
              type="password" 
              className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 outline-none focus:border-[#00a63e] focus:ring-4 focus:ring-[#00a63e]/10 transition-all font-medium text-slate-800"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {/* Error Message */}
          {error && (
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 py-2 rounded-xl border border-red-100">
              {error}
            </p>
          )}

          <button 
            type="submit"
            className="w-full bg-[#00a63e] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#008a34] shadow-[0_10px_20px_rgba(0,166,62,0.2)] hover:shadow-[0_15px_30px_rgba(0,166,62,0.3)] transition-all flex items-center justify-center gap-3 active:scale-95"
          >
            <Lock size={18} /> Access Dashboard
          </button>
        </form>

      </div>
    </div>
  );
}