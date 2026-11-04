"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import {
  DIVISIONS,
  DISTRICTS,
  BLOOD_GROUPS,
  toBnNumber,
} from "@/lib/bangladesh-data";
import {
  INITIAL_USER,
  INITIAL_DONORS,
  INITIAL_REQUESTS,
  INITIAL_ORGANIZATIONS,
} from "@/lib/store";
import DigitalIdCard from "@/components/DigitalIdCard";
import BloodRequestTimeline from "@/components/BloodRequestTimeline";
import Leaderboard from "@/components/Leaderboard";
import BangladeshMap from "@/components/BangladeshMap";
import DonorCard from "@/components/DonorCard";
import {
  Search,
  UserPlus,
  Droplet,
  Heart,
  ShieldCheck,
  PhoneCall,
  Clock,
  ArrowRight,
  Users,
  MapPin,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  QrCode,
  AlertTriangle,
} from "lucide-react";

export default function HomePage() {
  const { language, t } = useLanguage();
  const router = useRouter();

  // Search filter state
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");

  // Cascading districts based on selected division
  const filteredDistricts = selectedDivision
    ? DISTRICTS.filter((d) => d.divisionId === selectedDivision)
    : DISTRICTS;

  // Cascading upazilas based on selected district
  const activeDistrictObj = DISTRICTS.find((d) => d.id === selectedDistrict);
  const upazilaList = activeDistrictObj ? activeDistrictObj.upazilas : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (selectedBloodGroup) params.append("bloodGroup", selectedBloodGroup);
    if (selectedDivision) params.append("division", selectedDivision);
    if (selectedDistrict) params.append("district", selectedDistrict);
    if (selectedUpazila) params.append("upazila", selectedUpazila);

    router.push(`/donors?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-red-50/20 to-slate-50 pt-8 pb-16">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-red-100/50 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 -ml-20 w-80 h-80 rounded-full bg-blue-100/40 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* National Verified Badge */}
              <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200/80 px-3.5 py-1.5 rounded-full text-xs font-bold text-brand-red shadow-sm">
                <span className="flex h-2 w-2 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-red opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-red" />
                </span>
                <span>
                  {language === "bn"
                    ? "বাংলাদেশের ৬৪ জেলায় ডিজিটাল রক্ত সুরক্ষা নেটওয়ার্ক"
                    : "National Digital Blood Network of Bangladesh"}
                </span>
              </div>

              {/* Catchy Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-brand-navy tracking-tight leading-[1.15]">
                {language === "bn" ? (
                  <>
                    <span className="text-brand-red">এক ফোঁটা রক্ত,</span>
                    <br />
                    একটি নতুন জীবনের আশা
                  </>
                ) : (
                  <>
                    <span className="text-brand-red">A Single Drop,</span>
                    <br />
                    A New Hope For Life
                  </>
                )}
              </h1>

              {/* Tagline */}
              <p className="text-lg sm:text-xl font-bold text-slate-700">
                {language === "bn"
                  ? "রক্তের বন্ধনে, জীবনের প্রয়োজনে।"
                  : "In the bond of blood, in the need of life."}
              </p>

              {/* Primary 3 Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/donors"
                  className="flex items-center gap-2 bg-brand-red hover:bg-brand-redDark text-white px-5 py-3 rounded-xl font-extrabold text-sm shadow-lg shadow-red-500/25 transition-all active:scale-95"
                >
                  <Search className="w-4 h-4" />
                  <span>{t.hero.findDonorBtn}</span>
                </Link>

                <Link
                  href="/register"
                  className="flex items-center gap-2 bg-white hover:bg-slate-50 text-brand-navy px-5 py-3 rounded-xl font-extrabold text-sm border-2 border-slate-200 shadow-sm transition-all active:scale-95"
                >
                  <UserPlus className="w-4 h-4 text-brand-red" />
                  <span>{t.hero.becomeDonorBtn}</span>
                </Link>

                <Link
                  href="/request"
                  className="urgent-pulse flex items-center gap-2 bg-brand-navy hover:bg-brand-navyDark text-white px-5 py-3 rounded-xl font-extrabold text-sm shadow-md transition-all active:scale-95"
                >
                  <Droplet className="w-4 h-4 fill-brand-red text-brand-red" />
                  <span>{t.hero.requestBloodBtn}</span>
                </Link>
              </div>

              {/* Quick Search Bar Box */}
              <div className="bg-white p-5 rounded-2xl shadow-xl border border-slate-200/80 mt-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                  <h3 className="text-sm font-black text-brand-navy uppercase tracking-wider">
                    {t.hero.searchTitle}
                  </h3>
                </div>

                <form
                  onSubmit={handleSearchSubmit}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3"
                >
                  {/* Blood Group */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
                    </label>
                    <select
                      value={selectedBloodGroup}
                      onChange={(e) => setSelectedBloodGroup(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    >
                      <option value="">{t.hero.selectBloodGroup}</option>
                      {BLOOD_GROUPS.map((bg) => (
                        <option key={bg} value={bg}>
                          {bg}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Division */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      {language === "bn" ? "বিভাগ" : "Division"}
                    </label>
                    <select
                      value={selectedDivision}
                      onChange={(e) => {
                        setSelectedDivision(e.target.value);
                        setSelectedDistrict("");
                        setSelectedUpazila("");
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    >
                      <option value="">{t.hero.selectDivision}</option>
                      {DIVISIONS.map((div) => (
                        <option key={div.id} value={div.id}>
                          {language === "bn" ? div.bnName : div.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      {language === "bn" ? "জেলা" : "District"}
                    </label>
                    <select
                      value={selectedDistrict}
                      onChange={(e) => {
                        setSelectedDistrict(e.target.value);
                        setSelectedUpazila("");
                      }}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                    >
                      <option value="">{t.hero.selectDistrict}</option>
                      {filteredDistricts.map((d) => (
                        <option key={d.id} value={d.id}>
                          {language === "bn" ? d.bnName : d.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Upazila */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                      {language === "bn" ? "উপজেলা" : "Upazila"}
                    </label>
                    <select
                      value={selectedUpazila}
                      onChange={(e) => setSelectedUpazila(e.target.value)}
                      disabled={!selectedDistrict || upazilaList.length === 0}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30 disabled:opacity-50"
                    >
                      <option value="">{t.hero.selectUpazila}</option>
                      {upazilaList.map((up) => (
                        <option key={up.id} value={up.id}>
                          {language === "bn" ? up.bnName : up.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Button */}
                  <div className="flex items-end sm:col-span-2 md:col-span-4 lg:col-span-1">
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-1.5 bg-brand-red hover:bg-brand-redDark text-white py-2.5 px-4 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{t.hero.searchBtn}</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* 4 National Statistics Counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Droplet className="w-5 h-5 text-brand-red fill-brand-red" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-brand-navy block leading-tight">
                      +1M
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {t.stats.registeredDonors}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center shrink-0">
                    <Heart className="w-5 h-5 text-brand-red fill-brand-red" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-brand-navy block leading-tight">
                      +500K
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {t.stats.successfulDonations}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                    <Building2 className="w-5 h-5 text-brand-navy" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-brand-navy block leading-tight">
                      64
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {t.stats.districtsCovered}
                    </span>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
                    <PhoneCall className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xl font-black text-brand-navy block leading-tight">
                      24/7
                    </span>
                    <span className="text-[11px] text-slate-500 font-bold">
                      {t.stats.emergencySupport}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Digital ID Card & Brand Showcase */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="relative w-full max-w-[420px]">
                {/* Floating highlight badge */}
                <div className="absolute -top-3 -right-3 z-30 bg-amber-500 text-white text-[11px] font-black px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Instant QR Verification</span>
                </div>

                <DigitalIdCard donor={INITIAL_USER} showActions={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. EMERGENCY BANNER & HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20 w-full mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Emergency SOS Banner Card */}
          <div className="bg-gradient-to-r from-brand-red to-red-700 text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 bg-white/20 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </span>
                <span className="text-xs font-black uppercase tracking-wider text-red-200">
                  {t.emergency.criticalAlert}
                </span>
              </div>
              <h3 className="text-xl font-black mb-1">
                {t.emergency.bannerTitle}
              </h3>
              <p className="text-xs text-red-100 leading-relaxed mb-4">
                {t.emergency.bannerSub}
              </p>
            </div>

            <Link
              href="/request"
              className="inline-flex items-center justify-center gap-2 bg-white text-brand-red hover:bg-red-50 py-2.5 px-4 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 self-start"
            >
              <span>{t.emergency.actionBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* How It Works Steps */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-md flex flex-col justify-between">
            <h3 className="text-base font-extrabold text-brand-navy mb-4 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-brand-red" />
              <span>{t.howItWorks.title}</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-red-50 text-brand-red font-black text-xs flex items-center justify-center mb-1.5 shadow-sm">
                  1
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {language === "bn" ? "নিবন্ধন" : "Register"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {language === "bn" ? "সদস্য হন" : "Join Free"}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-brand-navy font-black text-xs flex items-center justify-center mb-1.5 shadow-sm">
                  2
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {language === "bn" ? "অনুসন্ধান" : "Find"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {language === "bn" ? "নিকটস্থ ডোনার" : "Nearby Donors"}
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 font-black text-xs flex items-center justify-center mb-1.5 shadow-sm">
                  3
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {language === "bn" ? "রক্তদান" : "Donate"}
                </span>
                <span className="text-[10px] text-slate-500 font-medium">
                  {language === "bn" ? "জীবন বাঁচান" : "Save a Life"}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">
                {language === "bn" ? "স্বয়ংক্রিয় ৩ মাসের বিরতি ট্র্যাকিং" : "Automated 90-Day Cooldown"}
              </span>
              <span className="text-emerald-600 font-bold">100% Safe</span>
            </div>
          </div>

          {/* Volunteer / Youth Network Card */}
          <div className="bg-gradient-to-br from-brand-navy to-brand-navyDark text-white p-6 rounded-3xl shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="p-2 bg-white/10 rounded-xl">
                  <Users className="w-6 h-6 text-amber-400" />
                </span>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {language === "bn" ? "যুব স্বেচ্ছাসেবক দল" : "Youth Volunteer Squad"}
                </span>
              </div>
              <h3 className="text-xl font-black mb-1">
                {t.volunteer.title}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                {t.volunteer.desc}
              </p>
            </div>

            <Link
              href="/register?role=volunteer"
              className="inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-900 py-2.5 px-4 rounded-xl font-black text-xs shadow-md transition-all active:scale-95 self-start"
            >
              <span>{t.volunteer.joinBtn}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. NATIONAL LIVE MAP & ADVANCED SEARCH */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <BangladeshMap />
      </section>

      {/* 4. RECENT EMERGENCY REQUESTS & ACTIVE DONORS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Donors List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-200">
              <div>
                <h3 className="text-lg font-black text-brand-navy flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-brand-red fill-brand-red" />
                  <span>{language === "bn" ? "নিকটবর্তী প্রস্তুত রক্তদাতাগণ" : "Available Blood Donors Nearby"}</span>
                </h3>
                <span className="text-xs text-slate-500 font-medium">
                  {language === "bn" ? "জাতীয়ভাবে স্বীকৃত ও ভেরিফাইড রক্তযোদ্ধা" : "Verified & Active Life Savers Across Districts"}
                </span>
              </div>

              <Link
                href="/donors"
                className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
              >
                <span>{language === "bn" ? "সবগুলো দেখুন" : "View All"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {INITIAL_DONORS.slice(0, 4).map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </div>
          </div>

          {/* Blood Request Tracking & Emergency Cases */}
          <div className="lg:col-span-5 space-y-6">
            <BloodRequestTimeline currentStatus="MATCHED" />

            {/* Verified Organization Card */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {language === "bn" ? "স্বীকৃত রক্তদান সংগঠন" : "Verified Organization"}
                </span>
                <span className="bg-emerald-50 text-emerald-600 text-xs font-bold px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  <span>Verified</span>
                </span>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl overflow-hidden relative border border-slate-200 bg-white shrink-0">
                  <Image
                    src={INITIAL_ORGANIZATIONS[0].logoUrl}
                    alt={INITIAL_ORGANIZATIONS[0].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-brand-navy">
                    {language === "bn"
                      ? INITIAL_ORGANIZATIONS[0].bengaliName
                      : INITIAL_ORGANIZATIONS[0].name}
                  </h4>
                  <span className="text-xs text-slate-500">
                    {INITIAL_ORGANIZATIONS[0].type}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 py-2 px-3 bg-slate-50 rounded-xl text-center mb-4 text-xs font-bold">
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === "bn" ? "সদস্য" : "Members"}
                  </span>
                  <span className="text-slate-800">
                    {INITIAL_ORGANIZATIONS[0].memberCount}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === "bn" ? "রক্তদান" : "Donations"}
                  </span>
                  <span className="text-brand-red">
                    {INITIAL_ORGANIZATIONS[0].totalDonations}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">
                    {language === "bn" ? "ক্যাম্পেইন" : "Campaigns"}
                  </span>
                  <span className="text-slate-800">
                    {INITIAL_ORGANIZATIONS[0].campaignsCount}
                  </span>
                </div>
              </div>

              <Link
                href="/organizations"
                className="w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 rounded-xl text-xs font-bold transition-all"
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>
                  {language === "bn" ? "সংগঠনসমূহ ব্রাউজ করুন" : "Browse Organizations"}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. NATIONAL LEADERBOARD PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-16">
        <Leaderboard />
      </section>
    </div>
  );
}
