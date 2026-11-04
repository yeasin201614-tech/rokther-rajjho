"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { CheckCircle2, Clock, Search, Droplet, UserCheck } from "lucide-react";

interface TimelineStep {
  title: string;
  bnTitle: string;
  time: string;
  status: "completed" | "current" | "upcoming";
  desc?: string;
}

interface BloodRequestTimelineProps {
  steps?: TimelineStep[];
  currentStatus?: string;
}

export default function BloodRequestTimeline({
  steps,
  currentStatus = "SEARCHING",
}: BloodRequestTimelineProps) {
  const { language } = useLanguage();

  const defaultSteps: TimelineStep[] = [
    {
      title: "Request Created",
      bnTitle: "আবেদন তৈরি হয়েছে",
      time: "10 Nov 2026, 10:00 AM",
      status: "completed",
    },
    {
      title: "Searching Donors",
      bnTitle: "রক্তদাতা অনুসন্ধান চলছে",
      time: "11 Nov 2026, 09:00 AM",
      status: "completed",
    },
    {
      title: "Donor Found",
      bnTitle: "রক্তদাতা নিশ্চিত হয়েছে",
      time: "11 Nov 2026, 11:20 AM",
      status: currentStatus === "MATCHED" || currentStatus === "COMPLETED" ? "completed" : "current",
    },
    {
      title: "Donation Complete",
      bnTitle: "রক্তদান সম্পন্ন হয়েছে",
      time: "11 Nov 2026, 01:30 PM",
      status: currentStatus === "COMPLETED" ? "completed" : "upcoming",
    },
  ];

  const timelineSteps = steps || defaultSteps;

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
      <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
          <Droplet className="w-5 h-5 text-brand-red fill-brand-red" />
          <span>{language === "bn" ? "রক্তের আবেদন ট্র্যাকিং" : "Blood Request Tracking"}</span>
        </h3>
        <span className="bg-red-50 text-brand-red text-xs font-bold px-2.5 py-1 rounded-full border border-red-200">
          Live Status
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Timeline Steps (2 columns on md) */}
        <div className="md:col-span-2 space-y-6 relative pl-2">
          {/* Vertical connecting line */}
          <div className="absolute left-[23px] top-3 bottom-5 w-0.5 bg-slate-200 -z-0" />

          {timelineSteps.map((step, idx) => {
            const isCompleted = step.status === "completed";
            const isCurrent = step.status === "current";

            return (
              <div key={idx} className="flex items-start gap-4 relative z-10">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-white font-bold text-xs shadow-sm ${
                    isCompleted
                      ? "bg-emerald-500 ring-4 ring-emerald-50"
                      : isCurrent
                      ? "bg-amber-500 ring-4 ring-amber-50 animate-pulse"
                      : "bg-slate-300 ring-4 ring-slate-50 text-slate-500"
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isCurrent ? (
                    <Clock className="w-4 h-4" />
                  ) : (
                    <span>{idx + 1}</span>
                  )}
                </div>

                <div className="flex-1 -mt-0.5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <span
                      className={`font-bold text-sm ${
                        isCompleted
                          ? "text-slate-800"
                          : isCurrent
                          ? "text-amber-600 font-extrabold"
                          : "text-slate-400"
                      }`}
                    >
                      {language === "bn" ? step.bnTitle : step.title}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500">
                      {step.time}
                    </span>
                  </div>
                  {step.desc && (
                    <p className="text-xs text-slate-500 mt-0.5">{step.desc}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Blood Bag Graphic / Illustration */}
        <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-b from-red-50 to-white rounded-2xl border border-red-100 text-center">
          <div className="relative w-28 h-36 flex items-center justify-center">
            {/* Bag Body */}
            <div className="w-24 h-32 bg-gradient-to-b from-red-600 to-brand-red rounded-3xl shadow-lg border-2 border-red-400/80 flex flex-col items-center justify-between p-3 relative overflow-hidden">
              {/* Bag top clip */}
              <div className="w-8 h-2 bg-red-800/60 rounded-full" />
              
              {/* Heart icon inside bag */}
              <div className="w-12 h-12 bg-white/95 rounded-2xl flex items-center justify-center shadow-inner my-auto">
                <Droplet className="w-7 h-7 text-brand-red fill-brand-red" />
              </div>

              {/* Liquid Wave Effect */}
              <div className="text-[10px] font-black tracking-widest text-white/90 uppercase">
                O+ POSITIVE
              </div>
            </div>

            {/* Tube coming out from bottom */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-1.5 h-6 bg-red-400 rounded-full" />
          </div>

          <div className="mt-3">
            <span className="text-xs font-bold text-slate-800 block">
              {language === "bn" ? "প্রয়োজন: ২ ব্যাগ" : "Requirement: 2 Units"}
            </span>
            <span className="text-[11px] text-emerald-600 font-bold">
              {language === "bn" ? "১ ব্যাগ সংগৃহীত" : "1 Unit Secured"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
