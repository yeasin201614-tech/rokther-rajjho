"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { INITIAL_REQUESTS, INITIAL_DONORS } from "@/lib/store";
import BloodRequestTimeline from "@/components/BloodRequestTimeline";
import {
  Droplet,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Hospital,
  AlertTriangle,
  User,
  Share2,
  CheckCircle2,
  ArrowLeft,
} from "lucide-react";

export default function RequestDetailsPage() {
  const params = useParams();
  const reqId = (params?.id as string) || "req-001";
  const { language } = useLanguage();
  const [copied, setCopied] = useState(false);

  // Find request or fallback to first
  const request =
    INITIAL_REQUESTS.find((r) => r.id === reqId) || INITIAL_REQUESTS[0];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-brand-red transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{language === "bn" ? "হোম পেজে ফিরুন" : "Back to Home"}</span>
          </Link>

          <button
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-700 bg-white hover:bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shadow-sm transition-all"
          >
            <Share2 className="w-3.5 h-3.5 text-slate-500" />
            <span>{copied ? (language === "bn" ? "লিংক কপি হয়েছে!" : "Copied!") : (language === "bn" ? "শেয়ার করুন" : "Share")}</span>
          </button>
        </div>

        {/* Live Status Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-brand-red animate-ping" />
                <span className="text-xs font-black text-brand-red uppercase tracking-wider">
                  LIVE EMERGENCY DISPATCH #{request.id.toUpperCase()}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy mt-1">
                {request.patientName}
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-red-50 border border-red-200 px-4 py-2 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Blood Group
                </span>
                <span className="text-2xl font-black text-brand-red leading-none">
                  {request.bloodGroup}
                </span>
              </div>

              <div className="bg-slate-50 border border-slate-200 px-4 py-2 rounded-2xl text-center">
                <span className="text-[10px] text-slate-400 font-bold block uppercase">
                  Units
                </span>
                <span className="text-2xl font-black text-slate-800 leading-none">
                  {request.unitsNeeded}
                </span>
              </div>
            </div>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 py-2 text-xs">
            <div className="flex items-start gap-2.5">
              <Hospital className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-bold block">Hospital</span>
                <span className="font-extrabold text-slate-800">
                  {request.hospitalName}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-bold block">Location</span>
                <span className="font-extrabold text-slate-800 capitalize">
                  {request.districtId}, Bangladesh
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-bold block">When</span>
                <span className="font-extrabold text-amber-700">
                  {request.requiredTime}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-2.5">
              <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <span className="text-slate-400 font-bold block">Attendant</span>
                <a
                  href={`tel:${request.contactNumber}`}
                  className="font-extrabold text-emerald-700 hover:underline"
                >
                  {request.contactNumber}
                </a>
              </div>
            </div>
          </div>

          {request.reason && (
            <div className="p-3 bg-red-50/50 rounded-2xl border border-red-100 text-xs text-slate-700">
              <span className="font-bold text-brand-red">Diagnosis / Reason: </span>
              {request.reason}
            </div>
          )}
        </div>

        {/* Live Timeline Tracker */}
        <BloodRequestTimeline currentStatus={request.status} />

        {/* Action Call Bar */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-black text-brand-navy text-sm sm:text-base">
              {language === "bn" ? "আপনি কি এই রোগীকে রক্ত দিতে প্রস্তুত?" : "Are You Ready to Donate for This Patient?"}
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              {language === "bn"
                ? "সরাসরি রোগীর অভিভাবক বা চিকিৎসকের সাথে ফোনে কথা বলুন।"
                : "Call the attendant directly or register your commitment."}
            </p>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <a
              href={`tel:${request.contactNumber}`}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white py-3 px-6 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95"
            >
              <Phone className="w-4 h-4 fill-white" />
              <span>{language === "bn" ? "অভিভাবককে কল করুন" : "Call Attendant"}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
