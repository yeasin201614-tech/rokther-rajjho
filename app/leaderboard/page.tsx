"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import Leaderboard from "@/components/Leaderboard";
import {
  Trophy,
  Award,
  Medal,
  Star,
  Heart,
  Droplet,
  Users,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function LeaderboardPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === "bn" ? "জাতীয় বীরত্ব ও জীবনদাতা সম্মাননা" : "National Hall of Fame"}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy">
            {language === "bn" ? "জাতীয় সেরা রক্তদাতা তালিকা" : "National Blood Donation Leaderboard"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
            {language === "bn"
              ? "যাঁরা নিজের মূল্যবান রক্ত দিয়ে শত শত মানুষের জীবন বাঁচিয়ে চলেছেন, তাঁদের প্রতি সশ্রদ্ধ সালাম ও কৃতজ্ঞতা।"
              : "Honoring our selfless national champions who consistently donate blood to rescue human lives across Bangladesh."}
          </p>
        </div>

        {/* Podium for Top 3 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
          {/* 2nd Place */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-between shadow-sm order-2 sm:order-1">
            <div className="w-12 h-12 rounded-full bg-slate-400 text-white font-black text-lg flex items-center justify-center shadow-md mb-2">
              2
            </div>
            <h3 className="font-extrabold text-base text-brand-navy">
              Ayesha Siddika
            </h3>
            <span className="text-xs text-brand-red font-bold">AB+ Positive</span>
            <span className="text-xs text-slate-500 mt-1">Chattogram</span>
            <div className="mt-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-black text-brand-navy">
              22 Donations
            </div>
          </div>

          {/* 1st Place (Champion) */}
          <div className="bg-gradient-to-b from-amber-50 to-white p-8 rounded-3xl border-2 border-amber-400 text-center flex flex-col items-center justify-between shadow-lg order-1 sm:order-2 sm:-mt-4">
            <div className="w-16 h-16 rounded-full bg-amber-500 text-white font-black text-2xl flex items-center justify-center shadow-xl ring-4 ring-amber-100 mb-2">
              👑
            </div>
            <div className="inline-block bg-amber-500 text-slate-900 text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1">
              Top Life Saver
            </div>
            <h3 className="font-black text-lg text-brand-navy">
              Md. Rahim Khan
            </h3>
            <span className="text-xs text-brand-red font-bold">O+ Positive</span>
            <span className="text-xs text-slate-500 mt-1">Dhaka</span>
            <div className="mt-3 bg-amber-100 text-amber-900 px-4 py-2 rounded-xl text-sm font-black">
              25 Donations
            </div>
          </div>

          {/* 3rd Place */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 text-center flex flex-col items-center justify-between shadow-sm order-3">
            <div className="w-12 h-12 rounded-full bg-amber-700 text-white font-black text-lg flex items-center justify-center shadow-md mb-2">
              3
            </div>
            <h3 className="font-extrabold text-base text-brand-navy">
              Tanvir Hasan
            </h3>
            <span className="text-xs text-brand-red font-bold">A+ Positive</span>
            <span className="text-xs text-slate-500 mt-1">Dhaka</span>
            <div className="mt-3 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100 text-xs font-black text-brand-navy">
              20 Donations
            </div>
          </div>
        </div>

        {/* Detailed Leaderboard Component */}
        <Leaderboard />

        {/* Motivation CTA */}
        <div className="bg-brand-navy text-white rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl sm:text-2xl font-black">
            {language === "bn"
              ? "আপনিও হতে পারেন আগামীর জাতীয় জীবন রক্ষাকারী বীর"
              : "You Too Can Become a Life-Saving Champion"}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {language === "bn"
              ? "আজই রক্তদাতা হিসেবে নিবন্ধন করুন এবং প্রতি ৩ মাস পর পর রক্ত দিয়ে নতুন জীবনের আশা জাগিয়ে তুলুন।"
              : "Register as a verified voluntary blood donor today and save precious lives."}
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 bg-brand-red hover:bg-brand-redDark text-white py-3 px-6 rounded-2xl font-black text-xs shadow-lg transition-all active:scale-95"
            >
              <span>{language === "bn" ? "রক্তদাতা হিসেবে যুক্ত হোন" : "Become a Donor Today"}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
