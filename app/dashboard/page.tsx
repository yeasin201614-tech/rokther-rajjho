"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import confetti from "canvas-confetti";
import { useLanguage } from "@/lib/i18n";
import {
  INITIAL_USER,
  INITIAL_DONORS,
  INITIAL_REVIEWS,
  INITIAL_BADGES,
  INITIAL_NOTIFICATIONS,
  getStoredData,
  setStoredData,
} from "@/lib/store";
import { DonorProfile, DonationRecord } from "@/lib/types";
import { calculateEligibility, formatBnDate, toBnNumber } from "@/lib/bangladesh-data";
import DigitalIdCard from "@/components/DigitalIdCard";
import {
  User,
  Droplet,
  Star,
  ShieldCheck,
  Calendar,
  CheckCircle2,
  Clock,
  Award,
  History,
  MessageSquare,
  Bell,
  FileCheck2,
  Settings,
  PlusCircle,
  Phone,
  MapPin,
  Download,
  Printer,
  Sparkles,
  QrCode,
  AlertCircle,
  Share2,
} from "lucide-react";

export default function DashboardPage() {
  const { language, t } = useLanguage();

  const [activeTab, setActiveTab] = useState<
    | "overview"
    | "profile"
    | "idCard"
    | "badges"
    | "history"
    | "reviews"
    | "notifications"
    | "certificates"
    | "settings"
  >("overview");

  // User state
  const [user, setUser] = useState<DonorProfile>(() =>
    getStoredData("current_user", INITIAL_USER)
  );

  // Donation history records
  const [donations, setDonations] = useState<DonationRecord[]>([
    {
      id: "don-01",
      donorId: user.id,
      patientName: "Taslima Khatun (Surgery)",
      hospitalName: "Dhaka Medical College Hospital",
      donationDate: "2026-01-01",
      bloodGroup: user.bloodGroup,
      units: 1,
      certificateNumber: "RR-CERT-2026-0001",
      isVerified: true,
      verifiedBy: "Bangladesh Red Crescent Society",
    },
    {
      id: "don-02",
      donorId: user.id,
      patientName: "Abul Bashar (Accident)",
      hospitalName: "National Institute of Traumatology (NITOR)",
      donationDate: "2025-08-15",
      bloodGroup: user.bloodGroup,
      units: 1,
      certificateNumber: "RR-CERT-2025-0842",
      isVerified: true,
      verifiedBy: "Sandhani Blood Club",
    },
    {
      id: "don-03",
      donorId: user.id,
      patientName: "Baby of Sima (Premature Delivery)",
      hospitalName: "Bangabandhu Sheikh Mujib Medical University (BSMMU)",
      donationDate: "2025-03-20",
      bloodGroup: user.bloodGroup,
      units: 1,
      certificateNumber: "RR-CERT-2025-0219",
      isVerified: true,
      verifiedBy: "Badhan Blood Network",
    },
  ]);

  // Log donation modal state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [hospitalInput, setHospitalInput] = useState("");
  const [patientInput, setPatientInput] = useState("");
  const [dateInput, setDateInput] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [unitsInput, setUnitsInput] = useState(1);
  const [notesInput, setNotesInput] = useState("");

  // Sync user state to storage
  useEffect(() => {
    setStoredData("current_user", user);
  }, [user]);

  // Toggle availability manually
  const handleToggleAvailability = () => {
    setUser((prev) => ({
      ...prev,
      isAvailable: !prev.isAvailable,
    }));
  };

  // Handle Log new donation
  const handleLogDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hospitalInput || !dateInput) return;

    // Calculate new 90-day cooldown
    const eligibility = calculateEligibility(dateInput);

    const newRecord: DonationRecord = {
      id: `don-${Date.now()}`,
      donorId: user.id,
      patientName: patientInput || "Emergency Patient",
      hospitalName: hospitalInput,
      donationDate: dateInput,
      bloodGroup: user.bloodGroup,
      units: Number(unitsInput),
      certificateNumber: `RR-CERT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      isVerified: true,
      verifiedBy: "Verified Hospital Duty Doctor",
    };

    setDonations([newRecord, ...donations]);

    // Update user profile with cooldown and increased donation count
    setUser((prev) => ({
      ...prev,
      totalDonations: prev.totalDonations + Number(unitsInput),
      lastDonationDate: dateInput,
      nextEligibleDate: eligibility.nextEligibleDate,
      isAvailable: eligibility.isEligible,
    }));

    // Trigger celebration confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsLogModalOpen(false);
    setHospitalInput("");
    setPatientInput("");
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* TOP PROFILE HEADER CARD (Matches mockup design) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            {/* Left: Avatar & Identity */}
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-brand-red/30 shadow-md bg-slate-100 shrink-0">
                <Image
                  src={user.avatarUrl}
                  alt={user.fullName}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-brand-navy">
                    {user.fullName}
                  </h1>
                  {user.isVerified && (
                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 fill-emerald-500 text-white" />
                      <span>Verified</span>
                    </span>
                  )}
                </div>

                <div className="text-xs sm:text-sm text-slate-500 font-medium mt-0.5">
                  <span className="font-mono font-bold text-slate-700">
                    Donor ID: {user.donorId}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 mt-2">
                  <span className="bg-red-50 text-brand-red font-black text-xs px-2.5 py-0.5 rounded-md border border-red-200">
                    {user.bloodGroup}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span className="capitalize">{user.districtId}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Key Metric Cards (Matches Mockup) */}
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {/* Metric 1: Total Donations */}
              <div className="bg-red-50/60 border border-red-100 p-3 rounded-2xl text-center flex flex-col items-center justify-center">
                <Droplet className="w-5 h-5 text-brand-red fill-brand-red mb-1" />
                <span className="text-lg sm:text-xl font-black text-brand-navy">
                  {user.totalDonations < 10
                    ? `0${user.totalDonations}`
                    : user.totalDonations}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">
                  {language === "bn" ? "মোট রক্তদান" : "Total Donations"}
                </span>
              </div>

              {/* Metric 2: Rating */}
              <div className="bg-amber-50/60 border border-amber-100 p-3 rounded-2xl text-center flex flex-col items-center justify-center">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400 mb-1" />
                <span className="text-lg sm:text-xl font-black text-brand-navy">
                  {user.rating}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">
                  {language === "bn" ? "রেটিং" : "Rating"}
                </span>
              </div>

              {/* Metric 3: Verified Badges */}
              <div className="bg-blue-50/60 border border-blue-100 p-3 rounded-2xl text-center flex flex-col items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-lg sm:text-xl font-black text-brand-navy">
                  02
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">
                  {language === "bn" ? "ভেরিফাইড" : "Verified"}
                </span>
              </div>

              {/* Metric 4: Current Status (Toggleable) */}
              <div
                onClick={handleToggleAvailability}
                className={`cursor-pointer p-3 rounded-2xl text-center flex flex-col items-center justify-center border transition-all col-span-1 sm:col-span-1 ${
                  user.isAvailable
                    ? "bg-emerald-50 border-emerald-200 text-emerald-800 hover:bg-emerald-100"
                    : "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100"
                }`}
                title="Click to toggle availability status"
              >
                <CheckCircle2
                  className={`w-5 h-5 mb-1 ${
                    user.isAvailable ? "text-emerald-600" : "text-amber-600"
                  }`}
                />
                <span className="text-xs font-black truncate">
                  {user.isAvailable
                    ? language === "bn"
                      ? "প্রস্তুত"
                      : "Available"
                    : language === "bn"
                    ? "বিরতিতে"
                    : "Cooldown"}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">
                  {language === "bn" ? "বর্তমান অবস্থা" : "Current Status"}
                </span>
              </div>

              {/* Metric 5: Next Eligibility Date (90 Days Cooldown) */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl text-center flex flex-col items-center justify-center col-span-2 sm:col-span-1">
                <Calendar className="w-5 h-5 text-brand-navy mb-1" />
                <span className="text-xs font-black text-brand-navy">
                  {user.nextEligibleDate}
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase">
                  {language === "bn" ? "পরবর্তী রক্তদান" : "Next Eligibility"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* MAIN BODY: SIDEBAR TABS + TAB CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Navigation Tabs (Matches Screenshot) */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-4 border border-slate-200/80 shadow-sm space-y-1">
              {[
                { id: "overview", label: t.dashboard.overview, icon: User },
                { id: "idCard", label: t.dashboard.idCard, icon: QrCode },
                { id: "badges", label: t.dashboard.badges, icon: Award },
                {
                  id: "history",
                  label: t.dashboard.donationHistory,
                  icon: History,
                },
                { id: "reviews", label: t.dashboard.reviews, icon: MessageSquare },
                {
                  id: "notifications",
                  label: t.dashboard.notifications,
                  icon: Bell,
                },
                {
                  id: "certificates",
                  label: t.dashboard.certificates,
                  icon: FileCheck2,
                },
                { id: "settings", label: t.dashboard.settings, icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all text-left ${
                      isActive
                        ? "bg-brand-red text-white shadow-md shadow-red-500/20"
                        : "text-slate-700 hover:bg-slate-50 hover:text-brand-navy"
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <div className="pt-4 border-t border-slate-100">
                <button
                  onClick={() => setIsLogModalOpen(true)}
                  className="w-full flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navyDark text-white py-3 rounded-2xl text-xs font-black shadow-md transition-all active:scale-95"
                >
                  <PlusCircle className="w-4 h-4 text-emerald-400" />
                  <span>{t.dashboard.logDonation}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* TAB: OVERVIEW */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                {/* ID Card Display */}
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
                    <div>
                      <h3 className="text-base font-extrabold text-brand-navy">
                        {language === "bn"
                          ? "আপনার ডিজিটাল ডোনার আইডি কার্ড"
                          : "Official Digital Donor ID Card"}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {language === "bn"
                          ? "এই কার্ডটি যেকোনো হাসপাতাল ও রক্তদান বুথে সত্যতা প্রমাণের জন্য ব্যবহারযোগ্য"
                          : "Authentic national digital identity valid across all hospitals and blood banks"}
                      </p>
                    </div>

                    <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Active & Verified</span>
                    </span>
                  </div>

                  <div className="flex justify-center">
                    <DigitalIdCard donor={user} showActions={true} />
                  </div>
                </div>

                {/* Recent Donation History Preview */}
                <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm">
                  <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                    <h3 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
                      <History className="w-5 h-5 text-brand-red" />
                      <span>{t.dashboard.donationHistory}</span>
                    </h3>

                    <button
                      onClick={() => setIsLogModalOpen(true)}
                      className="text-xs font-bold text-brand-red hover:underline flex items-center gap-1"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      <span>{language === "bn" ? "নতুন এন্ট্রি" : "Add Entry"}</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {donations.map((rec) => (
                      <div
                        key={rec.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 gap-3"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-red-100 text-brand-red flex items-center justify-center shrink-0 font-bold">
                            <Droplet className="w-5 h-5 fill-brand-red" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-slate-800">
                              {rec.hospitalName}
                            </h4>
                            <div className="text-xs text-slate-500 mt-0.5">
                              <span>Patient: {rec.patientName}</span>
                              <span className="mx-1">•</span>
                              <span className="text-emerald-600 font-semibold">
                                {rec.verifiedBy}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:text-right gap-3">
                          <div>
                            <span className="text-xs font-black text-brand-navy block">
                              {rec.donationDate}
                            </span>
                            <span className="text-[10px] text-slate-400 font-mono">
                              {rec.certificateNumber}
                            </span>
                          </div>

                          <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2.5 py-1 rounded-full">
                            Verified
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: ID CARD */}
            {activeTab === "idCard" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-brand-navy">
                    {t.dashboard.idCard}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === "bn"
                      ? "আপনার রক্তদানের ডিজিটাল স্মার্টকার্ড। এটি ডাউনলোড বা প্রিন্ট করে মানিব্যাগে রাখতে পারেন।"
                      : "Your digital donor smartcard with official QR authentication."}
                  </p>
                </div>

                <div className="flex justify-center py-4">
                  <DigitalIdCard donor={user} showActions={true} />
                </div>
              </div>
            )}

            {/* TAB: BADGES */}
            {activeTab === "badges" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-brand-navy">
                    {t.dashboard.badges}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === "bn"
                      ? "স্বেচ্ছায় রক্তদান করে অর্জিত জাতীয় সম্মাননা ব্যাজসমূহ"
                      : "National recognition badges unlocked by voluntary blood donations"}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {INITIAL_BADGES.map((b) => (
                    <div
                      key={b.id}
                      className="p-5 rounded-2xl bg-gradient-to-br from-amber-50/50 to-orange-50/30 border border-amber-200/70 text-center flex flex-col items-center justify-between shadow-sm"
                    >
                      <div className="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md mb-3">
                        <Award className="w-8 h-8" />
                      </div>
                      <h4 className="text-sm font-black text-slate-800">
                        {language === "bn" ? b.bengaliTitle : b.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-1 mb-3 leading-relaxed">
                        {b.description}
                      </p>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                        Unlocked on {b.unlockedAt}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: HISTORY */}
            {activeTab === "history" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <h3 className="text-lg font-black text-brand-navy">
                    {t.dashboard.donationHistory}
                  </h3>
                  <button
                    onClick={() => setIsLogModalOpen(true)}
                    className="bg-brand-red text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-sm"
                  >
                    + {t.dashboard.logDonation}
                  </button>
                </div>

                <div className="space-y-3">
                  {donations.map((rec) => (
                    <div
                      key={rec.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-extrabold text-sm text-brand-navy">
                          {rec.hospitalName}
                        </h4>
                        <div className="text-xs text-slate-600 mt-0.5">
                          Patient: {rec.patientName} | {rec.units} Unit ({rec.bloodGroup})
                        </div>
                        <span className="text-[11px] text-emerald-600 font-bold block mt-1">
                          Verified by {rec.verifiedBy}
                        </span>
                      </div>

                      <div className="sm:text-right">
                        <span className="text-xs font-black text-slate-800 block">
                          {rec.donationDate}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {rec.certificateNumber}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === "reviews" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-brand-navy">
                  {t.dashboard.reviews} ({INITIAL_REVIEWS.length})
                </h3>

                <div className="space-y-3">
                  {INITIAL_REVIEWS.map((rev) => (
                    <div
                      key={rev.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-slate-800">
                          {rev.reviewerName}
                        </span>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="w-3.5 h-3.5 fill-amber-400" />
                          <span className="text-xs font-bold text-slate-700">
                            {rev.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 italic">
                        "{rev.comment}"
                      </p>
                      <span className="text-[10px] text-slate-400 font-semibold block">
                        {rev.date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: NOTIFICATIONS */}
            {activeTab === "notifications" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-brand-navy">
                  {t.dashboard.notifications}
                </h3>

                <div className="space-y-3">
                  {INITIAL_NOTIFICATIONS.map((n) => (
                    <div
                      key={n.id}
                      className="p-4 rounded-2xl bg-red-50/50 border border-red-100 space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-brand-red flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {n.date}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700">{n.message}</p>
                      {n.link && (
                        <Link
                          href={n.link}
                          className="text-xs font-bold text-brand-red hover:underline block pt-1"
                        >
                          {language === "bn" ? "বিস্তারিত দেখুন →" : "View Details →"}
                        </Link>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: CERTIFICATES */}
            {activeTab === "certificates" && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm space-y-6">
                <div>
                  <h3 className="text-lg font-black text-brand-navy">
                    {t.dashboard.certificates}
                  </h3>
                  <p className="text-xs text-slate-500">
                    {language === "bn"
                      ? "জাতীয় রক্তদান স্বীকৃতি ও প্রশংসাপত্র"
                      : "Official National Appreciation Certificate"}
                  </p>
                </div>

                {/* Printable Certificate Frame */}
                <div
                  id="certificate-print-area"
                  className="p-8 border-8 border-double border-amber-600/60 bg-gradient-to-br from-amber-50/30 via-white to-amber-50/20 rounded-2xl shadow-xl text-center relative overflow-hidden"
                >
                  <div className="w-16 h-16 mx-auto mb-3 relative">
                    <Image
                      src="/logo.png"
                      alt="Logo"
                      fill
                      className="object-contain"
                    />
                  </div>

                  <span className="text-xs font-bold uppercase tracking-widest text-brand-red block">
                    GOVERNMENT RECOGNIZED NATIONAL BLOOD NETWORK
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-brand-navy my-2">
                    CERTIFICATE OF APPRECIATION
                  </h2>
                  <p className="text-xs text-slate-500">
                    রক্তদান সম্মাননা ও প্রশংসাপত্র
                  </p>

                  <div className="my-6">
                    <p className="text-xs text-slate-600 mb-1">
                      THIS DISTINCTION IS GRATEFULLY PRESENTED TO
                    </p>
                    <h3 className="text-xl sm:text-2xl font-black text-brand-red">
                      {user.fullName}
                    </h3>
                    <p className="text-xs font-bold text-slate-500 font-mono mt-0.5">
                      DONOR ID: {user.donorId}
                    </p>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-700 max-w-lg mx-auto leading-relaxed mb-6">
                    In recognition of voluntary, selfless blood donation and commitment to saving valuable human lives across Bangladesh.
                  </p>

                  <div className="flex items-center justify-between pt-6 border-t border-amber-200 text-xs">
                    <div className="text-left">
                      <span className="block font-bold text-slate-800">
                        {new Date().toLocaleDateString()}
                      </span>
                      <span className="text-[10px] text-slate-500">Date of Issue</span>
                    </div>

                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-full border border-amber-400 flex items-center justify-center">
                        <Award className="w-6 h-6 text-amber-600" />
                      </div>
                      <span className="text-[10px] font-bold text-slate-600 mt-1">
                        OFFICIAL SEAL
                      </span>
                    </div>

                    <div className="text-right">
                      <span className="block font-bold text-slate-800 font-signature italic text-sm">
                        Director General
                      </span>
                      <span className="text-[10px] text-slate-500">National Blood Council</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-brand-red hover:bg-brand-redDark text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95"
                  >
                    <Download className="w-4 h-4" />
                    <span>{language === "bn" ? "প্রশংসাপত্র ডাউনলোড করুন (PDF)" : "Download Certificate (PDF)"}</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: SETTINGS */}
            {activeTab === "settings" && (
              <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm space-y-4">
                <h3 className="text-lg font-black text-brand-navy">
                  {t.dashboard.settings}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === "bn"
                    ? "আপনার গোপনীয়তা ও যোগাযোগের তথ্য পরিবর্তন করুন"
                    : "Manage privacy preferences and notification contacts."}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">
                        {language === "bn" ? "ফোন নম্বর গোপন রাখুন" : "Hide Phone Number"}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {language === "bn"
                          ? "শুধুমাত্র জরুরি ভেরিফাইড রিকোয়েস্ট ছাড়া সাধারণ ব্রাউজারে নম্বর লুকানো থাকবে"
                          : "Mask phone number from general visitors unless emergency verified"}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-brand-red rounded focus:ring-brand-red"
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div>
                      <span className="font-bold text-xs text-slate-800 block">
                        {language === "bn" ? "জরুরি এসএমএস পুশ এলার্ট" : "SMS Emergency Alerts"}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        {language === "bn"
                          ? "আপনার উপজেলায় O+ রক্তের জরুরি প্রয়োজন হলে এসএমএস আসবে"
                          : "Receive SMS when O+ blood is urgently required in your upazila"}
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 text-brand-red rounded focus:ring-brand-red"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* LOG A DONATION MODAL */}
      {isLogModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white w-full max-w-md rounded-3xl p-6 shadow-2xl border border-slate-200 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-brand-navy flex items-center gap-2">
                <Droplet className="w-5 h-5 text-brand-red fill-brand-red" />
                <span>{t.dashboard.logDonation}</span>
              </h3>
              <button
                onClick={() => setIsLogModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleLogDonationSubmit} className="space-y-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "হাসপাতাল বা ব্লাড ব্যাংকের নাম" : "Hospital / Blood Bank"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dhaka Medical College Hospital"
                  value={hospitalInput}
                  onChange={(e) => setHospitalInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "রোগীর নাম বা রোগের বিবরণ" : "Patient Name / Reason"}
                </label>
                <input
                  type="text"
                  placeholder="e.g. Surgery / Accident / Thalassemia"
                  value={patientInput}
                  onChange={(e) => setPatientInput(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    {language === "bn" ? "রক্তদানের তারিখ" : "Donation Date"} *
                  </label>
                  <input
                    type="date"
                    required
                    value={dateInput}
                    onChange={(e) => setDateInput(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                    {language === "bn" ? "পরিমাণ (ব্যাগ)" : "Units (Bags)"}
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="3"
                    value={unitsInput}
                    onChange={(e) => setUnitsInput(Number(e.target.value))}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                  />
                </div>
              </div>

              <div className="p-3 bg-red-50 rounded-xl border border-red-100 text-[11px] text-red-800 font-medium">
                ⚠️ {language === "bn"
                  ? "নতুন রক্তদান এন্ট্রি করার সাথে সাথে জাতীয় স্বাস্থ্য নীতি অনুযায়ী আপনার একাউন্টে স্বয়ংক্রিয় ৩ মাসের (৯০ দিন) বিরতি চালু হবে।"
                  : "Logging this donation will automatically apply the national 90-day cooldown policy."}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsLogModalOpen(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 rounded-xl font-bold text-xs"
                >
                  {t.common.cancel}
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-brand-red hover:bg-brand-redDark text-white py-2.5 rounded-xl font-bold text-xs shadow-md"
                >
                  {language === "bn" ? "সংরক্ষণ ও নিশ্চিত করুন" : "Save & Verify"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
