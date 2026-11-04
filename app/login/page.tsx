"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { Droplet, Lock, Mail, ArrowRight, ShieldCheck, User } from "lucide-react";

export default function LoginPage() {
  const { language } = useLanguage();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  const handleDemoDonor = () => {
    setEmail("rahim.khan@roktherrajjho.org");
    setPassword("password123");
    setTimeout(() => {
      router.push("/dashboard");
    }, 400);
  };

  const handleDemoAdmin = () => {
    setEmail("admin@roktherrajjho.org");
    setPassword("admin123");
    setTimeout(() => {
      router.push("/admin");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mx-auto">
            <Droplet className="w-6 h-6 fill-brand-red" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            {language === "bn" ? "অ্যাকাউন্টে লগইন করুন" : "Sign In to Your Account"}
          </h1>
          <p className="text-xs text-slate-500">
            Rokther Rajjho - National Blood Donation Network
          </p>
        </div>

        {/* Demo Fast Login Pills */}
        <div className="bg-red-50/60 border border-red-100 p-4 rounded-3xl space-y-2 text-xs">
          <span className="font-bold text-brand-red block">
            ⚡ Quick Demo Access:
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleDemoDonor}
              className="flex-1 bg-white hover:bg-slate-50 text-brand-navy py-2 px-3 rounded-xl border border-slate-200 font-bold transition-all shadow-sm"
            >
              Donor (Md. Rahim)
            </button>
            <button
              onClick={handleDemoAdmin}
              className="flex-1 bg-brand-navy hover:bg-brand-navyDark text-white py-2 px-3 rounded-xl font-bold transition-all shadow-sm"
            >
              Admin Portal
            </button>
          </div>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4"
        >
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Email / Mobile
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                required
                placeholder="rahim.khan@roktherrajjho.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95"
            >
              <span>{language === "bn" ? "লগইন করুন" : "Sign In"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-center pt-2 text-xs text-slate-500">
            {language === "bn" ? "নতুন রক্তদাতা?" : "New here?"}{" "}
            <Link href="/register" className="font-bold text-brand-red hover:underline">
              {language === "bn" ? "নিবন্ধন করুন" : "Register as a donor"}
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
