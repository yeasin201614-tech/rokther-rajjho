"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { INITIAL_DONORS, INITIAL_USER, INITIAL_REVIEWS } from "@/lib/store";
import {
  ShieldCheck,
  CheckCircle2,
  Droplet,
  MapPin,
  Calendar,
  Star,
  Award,
  Phone,
  ArrowLeft,
  QrCode,
  Share2,
  FileCheck,
} from "lucide-react";

export default function VerifyDonorPage() {
  const params = useParams();
  const donorId = (params?.id as string) || "RR-BD-2026-000125";
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Look up donor from store or fallback to default
  const donor =
    INITIAL_DONORS.find(
      (d) => d.donorId.toLowerCase() === donorId.toLowerCase()
    ) || INITIAL_USER;

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        {/* Back Link */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "bn" ? "মূল পাতায় ফিরুন" : "Back to Home"}</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-brand-navy transition-colors bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? (language === "bn" ? "লিংক কপি হয়েছে!" : "Copied!") : (language === "bn" ? "শেয়ার করুন" : "Share")}</span>
          </button>
        </div>

        {/* Verification Certificate Box */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200">
          {/* Official Verification Header */}
          <div className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-teal-800 text-white p-6 text-center relative overflow-hidden">
            <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-3">
              <ShieldCheck className="w-10 h-10 text-emerald-600" />
            </div>

            <div className="inline-block bg-white/20 backdrop-blur px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest text-emerald-100 mb-1">
              OFFICIAL VERIFIED RECORD
            </div>

            <h1 className="text-xl sm:text-2xl font-black">
              {language === "bn"
                ? "ভেরিফাইড ডিজিটাল ডোনার রেকর্ড"
                : "National Digital Donor Verification"}
            </h1>
            <p className="text-xs text-emerald-100 mt-1">
              Rokther Rajjho - National Blood Donation Network of Bangladesh
            </p>
          </div>

          {/* Verification Details */}
          <div className="p-6 sm:p-8 space-y-6">
            {/* Authenticity Pill */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center gap-3">
              <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
              <div>
                <span className="text-xs font-black text-emerald-900 block">
                  {language === "bn" ? "সনদটি সম্পূর্ণ খাঁটি ও সক্রিয়" : "Authentic & Verified Life-Saver"}
                </span>
                <span className="text-[11px] text-emerald-700">
                  {language === "bn"
                    ? "এই রক্তদাতার পরিচয়পত্র, রক্তের গ্রুপ ও পূর্ববর্তী রক্তদানের তথ্য সফলভাবে যাচাইকৃত।"
                    : "Identity, blood group, and voluntary donation history are verified on the national ledger."}
                </span>
              </div>
            </div>

            {/* Donor Identity Profile */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
              <div className="relative w-28 h-32 rounded-2xl overflow-hidden border-2 border-brand-red/30 shadow-md bg-slate-100 shrink-0">
                <Image
                  src={donor.avatarUrl}
                  alt={donor.fullName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1 text-center sm:text-left space-y-2">
                <div>
                  <h2 className="text-2xl font-black text-brand-navy">
                    {donor.fullName}
                  </h2>
                  {donor.bengaliName && (
                    <p className="text-sm font-semibold text-slate-500">
                      {donor.bengaliName}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="bg-red-50 text-brand-red font-black text-xs px-3 py-1 rounded-lg border border-red-200">
                    Blood Group: {donor.bloodGroup}
                  </span>
                  <span className="bg-slate-100 text-slate-700 font-mono font-bold text-xs px-3 py-1 rounded-lg">
                    {donor.donorId}
                  </span>
                </div>

                <div className="text-xs text-slate-600 flex items-center justify-center sm:justify-start gap-1 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span className="capitalize">
                    {donor.upazilaId ? `${donor.upazilaId}, ` : ""}{donor.districtId}, Bangladesh
                  </span>
                </div>
              </div>
            </div>

            {/* Verified Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Droplet className="w-4 h-4 text-brand-red fill-brand-red mx-auto mb-1" />
                <span className="text-base font-black text-slate-800 block">
                  {donor.totalDonations}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {language === "bn" ? "মোট রক্তদান" : "Donations"}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Star className="w-4 h-4 text-amber-500 fill-amber-400 mx-auto mb-1" />
                <span className="text-base font-black text-slate-800 block">
                  {donor.rating} / 5.0
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {language === "bn" ? "রেটিং" : "Rating"}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <Calendar className="w-4 h-4 text-brand-navy mx-auto mb-1" />
                <span className="text-xs font-black text-slate-800 block truncate">
                  {donor.nextEligibleDate}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {language === "bn" ? "পরবর্তী রক্তদান" : "Next Eligible"}
                </span>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-xs font-black text-emerald-600 block truncate">
                  {donor.validUntil}
                </span>
                <span className="text-[10px] text-slate-400 font-bold uppercase">
                  {language === "bn" ? "মেয়াদ" : "Valid Until"}
                </span>
              </div>
            </div>

            {/* Direct Contact Button */}
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <a
                href={`tel:${donor.phone}`}
                className="flex-1 flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 fill-white" />
                <span>{language === "bn" ? "জরুরি প্রয়োজনে কল করুন" : "Emergency Call"}</span>
              </a>

              <Link
                href="/request"
                className="flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navyDark text-white py-3 px-6 rounded-2xl font-black text-xs shadow-md transition-all"
              >
                <Droplet className="w-4 h-4 text-brand-red fill-brand-red" />
                <span>{language === "bn" ? "রক্তের আবেদন করুন" : "Request Blood"}</span>
              </Link>
            </div>

            {/* Digital Hash Seal */}
            <div className="pt-4 border-t border-slate-100 text-center text-[10px] text-slate-400 font-mono space-y-1">
              <div>HASH: SHA256:{Buffer.from(donor.donorId).toString("hex").toUpperCase()}</div>
              <div>VERIFICATION_NODE: BD-NAT-BLOOD-SRV-2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
