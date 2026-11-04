"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { DIVISIONS } from "@/lib/bangladesh-data";
import { Heart, ShieldCheck, PhoneCall, Mail, MapPin, Droplet } from "lucide-react";

export default function Footer() {
  const { language } = useLanguage();

  return (
    <footer className="bg-brand-navy text-slate-300 pt-16 pb-8 border-t-4 border-brand-red">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white rounded-xl p-1.5 shadow-md flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="Rokther Rajjho"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Rokther Rajjho
                </span>
                <span className="block text-sm font-bold text-brand-red">
                  রক্তের রাজ্য
                </span>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed pr-4">
              {language === "bn"
                ? "বাংলাদেশের ৬৪টি জেলা ও সকল উপজেলায় জরুরি রক্তের চাহিদা মেটাতে ও রক্তদাতাদের এক সুতোয় বাঁধতে নির্মিত সর্বাধুনিক উন্মুক্ত জাতীয় রক্তদান নেটওয়ার্ক।"
                : "The advanced open national blood donation network connecting verified voluntary life-savers across all 64 districts and upazilas of Bangladesh."}
            </p>

            <div className="bg-brand-navyDark/80 p-4 rounded-xl border border-slate-700 space-y-2">
              <div className="text-xs uppercase tracking-wider text-amber-400 font-bold flex items-center gap-1.5">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>{language === "bn" ? "জাতীয় জরুরি সহায়তা" : "National Emergency Hotlines"}</span>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="bg-red-500/20 text-red-300 px-2.5 py-1 rounded font-semibold border border-red-500/30">
                  ৯৯৯ (জাতীয় জরুরি সেবা)
                </span>
                <span className="bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded font-semibold border border-emerald-500/30">
                  ১৬২৬৩ (স্বাস্থ্য বাতায়ন)
                </span>
                <span className="bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded font-semibold border border-amber-500/30">
                  ১০৬ (দুদক হেল্পলাইন)
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-l-2 border-brand-red pl-3">
              {language === "bn" ? "প্রয়োজনীয় লিংক" : "Quick Links"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/donors" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-brand-red">•</span>
                  {language === "bn" ? "রক্তদাতা খুঁজুন" : "Find Blood Donor"}
                </Link>
              </li>
              <li>
                <Link href="/request" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-brand-red">•</span>
                  {language === "bn" ? "জরুরি রক্তের আবেদন" : "Emergency Blood Request"}
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-brand-red">•</span>
                  {language === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন" : "Become a Donor"}
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-brand-red">•</span>
                  {language === "bn" ? "সেরা রক্তদাতা তালিকা" : "National Leaderboard"}
                </Link>
              </li>
              <li>
                <Link href="/organizations" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-brand-red">•</span>
                  {language === "bn" ? "স্বীকৃত সংগঠনসমূহ" : "Verified Organizations"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Verification & Features */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-l-2 border-brand-red pl-3">
              {language === "bn" ? "নিরাপত্তা ও সেবা" : "Security & Policy"}
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/verify/RR-BD-2026-000125" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-emerald-400">•</span>
                  {language === "bn" ? "ডিজিটাল আইডি ভেরিফিকেশন" : "Digital ID QR Verification"}
                </Link>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">•</span>
                  {language === "bn" ? "স্বয়ংক্রিয় ৩ মাসের বিরতি নীতি" : "Automated 90-Day Cooldown"}
                </span>
              </li>
              <li>
                <span className="text-slate-400 flex items-center gap-2">
                  <span className="text-emerald-400">•</span>
                  {language === "bn" ? "ব্যক্তিগত ফোন নম্বর সুরক্ষা" : "Donor Privacy Protection"}
                </span>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors flex items-center gap-2">
                  <span className="text-emerald-400">•</span>
                  {language === "bn" ? "অ্যাডমিন সুপারভাইজরি প্যানেল" : "Admin Portal"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Nationwide Coverage */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide border-l-2 border-brand-red pl-3">
              {language === "bn" ? "৮টি প্রশাসনিক বিভাগ" : "Divisions Covered"}
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {DIVISIONS.map((div) => (
                <Link
                  key={div.id}
                  href={`/donors?division=${div.id}`}
                  className="bg-brand-navyDark/60 hover:bg-brand-red hover:text-white p-2 rounded text-slate-300 font-medium transition-all text-center border border-slate-700/50"
                >
                  {language === "bn" ? div.bnName : div.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="text-brand-red font-bold text-sm">রক্তের বন্ধনে, জীবনের প্রয়োজনে।</span>
            <span className="hidden sm:inline">|</span>
            <span>Together for a Healthier Bangladesh</span>
          </div>

          <div className="flex items-center gap-4 text-center md:text-right">
            <span>© 2026 Rokther Rajjho (রক্তের রাজ্য). All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
