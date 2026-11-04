"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import {
  Droplet,
  Heart,
  PhoneCall,
  Menu,
  X,
  Search,
  User,
  ShieldCheck,
  Award,
  Building2,
  Calendar,
  AlertCircle,
  QrCode,
  Globe,
} from "lucide-react";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleLanguage = () => {
    setLanguage(language === "bn" ? "en" : "bn");
  };

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/donors", label: t.nav.findDonor },
    { href: "/request", label: t.nav.bloodRequest },
    { href: "/register", label: t.nav.becomeDonor },
    { href: "/organizations", label: t.nav.organizations },
    { href: "/campaigns", label: t.nav.events },
    { href: "/leaderboard", label: t.nav.leaderboard },
    { href: "/dashboard", label: t.nav.dashboard },
    { href: "/admin", label: t.nav.admin },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow-sm">
      {/* Top Emergency Ticker Bar */}
      <div className="bg-brand-navy text-white text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red"></span>
            </span>
            <span className="font-medium text-amber-300">
              {language === "bn" ? "জরুরি হটলাইন:" : "Emergency Hotline:"}
            </span>
            <span className="truncate">
              {language === "bn"
                ? "৯৯৯ / ১৬২৬৩ (স্বাস্থ্য বাতায়ন) | সারা দেশে ৬৪ জেলায় জাতীয় রক্তদান নেটওয়ার্ক"
                : "999 / 16263 (National Health) | 24/7 Blood Network Across All 64 Districts"}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs shrink-0">
            <Link
              href="/request"
              className="hidden sm:flex items-center gap-1 text-red-300 hover:text-white font-semibold transition-colors"
            >
              <Droplet className="w-3.5 h-3.5 fill-brand-red text-brand-red" />
              <span>{language === "bn" ? "জরুরি রক্ত লাগবে?" : "Need Blood Urgently?"}</span>
            </Link>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-brand-navyLight hover:bg-slate-700 px-2 py-0.5 rounded border border-slate-600 transition-all font-medium text-white"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === "bn" ? "English" : "বাংলা"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="glass-nav border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Brand */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 flex-shrink-0">
                <Image
                  src="/logo.png"
                  alt="Rokther Rajjho"
                  width={48}
                  height={48}
                  className="object-contain group-hover:scale-105 transition-transform drop-shadow"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-xl sm:text-2xl font-black text-brand-navy tracking-tight group-hover:text-brand-red transition-colors">
                    Rokther Rajjho
                  </span>
                </div>
                <span className="text-xs font-bold text-brand-red -mt-1 tracking-wide">
                  রক্তের রাজ্য
                </span>
                <span className="text-[10px] text-slate-500 font-medium hidden sm:inline-block">
                  রক্তের বন্ধনে, জীবনের প্রয়োজনে।
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-1 xl:gap-2">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      isActive
                        ? "text-brand-red bg-red-50 border border-red-100"
                        : "text-slate-700 hover:text-brand-red hover:bg-slate-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            {/* Header Right Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/request"
                className="urgent-pulse inline-flex items-center gap-2 bg-brand-red hover:bg-brand-redDark text-white px-4 py-2.5 rounded-full text-sm font-bold shadow-md transition-all active:scale-95"
              >
                <Droplet className="w-4 h-4 fill-white" />
                <span>{t.hero.requestBloodBtn}</span>
              </Link>

              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 bg-brand-navy hover:bg-brand-navyDark text-white px-4 py-2.5 rounded-full text-sm font-bold shadow-sm transition-all"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span>Md. Rahim</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/request"
                className="bg-brand-red text-white p-2 rounded-lg"
                title="Emergency Request"
              >
                <Droplet className="w-5 h-5 fill-white" />
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:text-brand-red hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-2 shadow-xl animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-semibold ${
                  pathname === link.href
                    ? "bg-red-50 text-brand-red font-bold"
                    : "text-slate-800 hover:bg-slate-50 hover:text-brand-red"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 bg-brand-navy text-white py-2.5 rounded-lg font-bold text-sm shadow"
              >
                <User className="w-4 h-4 text-emerald-400" />
                <span>{language === "bn" ? "আমার ড্যাশবোর্ড" : "My Dashboard"}</span>
              </Link>
              <button
                onClick={toggleLanguage}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 text-slate-800 py-2 rounded-lg font-semibold text-sm border border-slate-200"
              >
                <Globe className="w-4 h-4 text-brand-red" />
                <span>{language === "bn" ? "Switch to English" : "বাংলা ভাষায় পরিবর্তন"}</span>
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
