"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { INITIAL_CAMPAIGNS } from "@/lib/store";
import {
  Calendar,
  MapPin,
  Users,
  Droplet,
  Building2,
  Clock,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export default function CampaignsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div>
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 px-3.5 py-1 rounded-full text-xs font-bold text-brand-red mb-2">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {language === "bn"
                ? "স্বেচ্ছায় রক্তদান ক্যাম্প ও ড্রাইভ"
                : "Voluntary Blood Donation Drives"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy">
            {language === "bn" ? "আসন্ন রক্তদান ক্যাম্পেইন" : "Upcoming Blood Campaigns"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed">
            {language === "bn"
              ? "সরাসরি নিকটস্থ রক্তদান ক্যাম্পে উপস্থিত হয়ে রক্তদান করুন এবং ফ্রি রক্তের গ্রুপ ও স্বাস্থ্য পরীক্ষা করিয়ে নিন।"
              : "Attend open community drives, donate life-saving blood, and receive free screening."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {INITIAL_CAMPAIGNS.map((camp) => (
            <div
              key={camp.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="relative h-48 w-full bg-slate-100">
                <Image
                  src={camp.bannerUrl}
                  alt={camp.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3 bg-brand-navy/90 backdrop-blur text-white text-xs font-black px-3 py-1 rounded-full shadow">
                  Target: {camp.targetUnits} Bags
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <span className="text-xs font-bold text-brand-red flex items-center gap-1.5 mb-1">
                    <Building2 className="w-3.5 h-3.5" />
                    <span>{camp.orgName}</span>
                  </span>
                  <h3 className="text-lg sm:text-xl font-black text-brand-navy">
                    {language === "bn" ? camp.bengaliTitle : camp.title}
                  </h3>
                </div>

                <div className="space-y-2 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-semibold">{camp.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">
                      {camp.startDate} to {camp.endDate}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-slate-500">
                      {language === "bn" ? "নিবন্ধিত রক্তদাতা" : "Registered Donors"}
                    </span>
                    <span className="text-brand-red">
                      {camp.registeredCount} / {camp.targetUnits}
                    </span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-brand-red rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          100,
                          (camp.registeredCount / camp.targetUnits) * 100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() =>
                      alert(
                        language === "bn"
                          ? "ক্যাম্পেইনে অংশ নেওয়ার জন্য ধন্যবাদ! আপনার নিকটস্থ প্রতিনিধিদের সাথে যোগাযোগ করা হচ্ছে।"
                          : "Registration confirmed for this blood camp!"
                      )
                    }
                    className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{language === "bn" ? "ক্যাম্পে অংশ নিতে নাম লেখান" : "Register for Camp"}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
