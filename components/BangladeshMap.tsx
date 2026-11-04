"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { DISTRICTS, District } from "@/lib/bangladesh-data";
import { useLanguage } from "@/lib/i18n";
import { MapPin, Droplet, Users, ExternalLink } from "lucide-react";

interface BangladeshMapProps {
  selectedDistrict?: string;
  onSelectDistrict?: (districtId: string) => void;
}

export default function BangladeshMap({
  selectedDistrict,
  onSelectDistrict,
}: BangladeshMapProps) {
  const { language } = useLanguage();
  const [activeDistrict, setActiveDistrict] = useState<District>(DISTRICTS[0]);

  // Major hubs to display pins
  const hubDistricts = [
    { id: "dhaka", donors: 420, requests: 12, top: "45%", left: "52%" },
    { id: "chattogram", donors: 280, requests: 8, top: "68%", left: "72%" },
    { id: "sylhet", donors: 160, requests: 4, top: "32%", left: "75%" },
    { id: "rajshahi", donors: 190, requests: 5, top: "38%", left: "28%" },
    { id: "khulna", donors: 175, requests: 3, top: "65%", left: "38%" },
    { id: "barishal", donors: 130, requests: 6, top: "72%", left: "54%" },
    { id: "rangpur", donors: 140, requests: 2, top: "18%", left: "32%" },
    { id: "mymensingh", donors: 155, requests: 4, top: "32%", left: "54%" },
    { id: "gazipur", donors: 210, requests: 7, top: "42%", left: "54%" },
    { id: "cumilla", donors: 185, requests: 5, top: "54%", left: "68%" },
    { id: "bogra", donors: 125, requests: 3, top: "28%", left: "38%" },
  ];

  const handlePinClick = (districtId: string) => {
    const found = DISTRICTS.find((d) => d.id === districtId);
    if (found) {
      setActiveDistrict(found);
      if (onSelectDistrict) onSelectDistrict(districtId);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 gap-2">
        <div>
          <h3 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
            <MapPin className="w-5 h-5 text-brand-red" />
            <span>
              {language === "bn"
                ? "৬৪ জেলায় জাতীয় রক্ত সুরক্ষা মানচিত্র"
                : "National 64-District Live Blood Map"}
            </span>
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            {language === "bn"
              ? "যেকোনো জেলা নির্বাচন করে উপলব্ধ রক্তদাতা ও জরুরি রক্তের চাহিদা দেখুন"
              : "Select any district to view real-time available donors and emergency requests"}
          </p>
        </div>

        <Link
          href={`/donors?district=${activeDistrict.id}`}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-red bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors border border-red-100"
        >
          <span>{language === "bn" ? `${activeDistrict.bnName} জেলার ডোনারগণ` : `Donors in ${activeDistrict.name}`}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map Visual */}
        <div className="lg:col-span-2 relative h-80 sm:h-96 bg-gradient-to-br from-slate-900 to-brand-navy rounded-2xl overflow-hidden border border-slate-800 shadow-inner p-4 flex items-center justify-center">
          {/* Bangladesh Silhouette Canvas Background */}
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Interactive District Pulse Markers */}
          {hubDistricts.map((hub) => {
            const isSelected = activeDistrict.id === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => handlePinClick(hub.id)}
                style={{ top: hub.top, left: hub.left }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 group transition-all z-20 ${
                  isSelected ? "scale-125 z-30" : "hover:scale-115"
                }`}
                title={hub.id.toUpperCase()}
              >
                <div className="relative flex items-center justify-center">
                  <span
                    className={`animate-ping absolute inline-flex h-8 w-8 rounded-full opacity-75 ${
                      isSelected ? "bg-brand-red" : "bg-emerald-400"
                    }`}
                  />
                  <div
                    className={`relative w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-lg border-2 ${
                      isSelected
                        ? "bg-brand-red border-white ring-2 ring-brand-red"
                        : "bg-emerald-600 border-white"
                    }`}
                  >
                    <Droplet className="w-3.5 h-3.5 fill-white text-white" />
                  </div>
                </div>

                <div className="absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/80 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                  {hub.id.toUpperCase()} ({hub.donors})
                </div>
              </button>
            );
          })}

          {/* Map Compass / Info Overlay */}
          <div className="absolute bottom-3 left-3 bg-brand-navyDark/90 backdrop-blur border border-slate-700/80 px-3 py-2 rounded-xl text-xs text-white space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-[11px] text-slate-300">
                {language === "bn" ? "উপলব্ধ রক্তদাতা" : "Active Donors Available"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
              <span className="text-[11px] text-slate-300">
                {language === "bn" ? "জরুরি রক্তের চাহিদা" : "Urgent Blood Need"}
              </span>
            </div>
          </div>

          <div className="text-center text-white/40 font-mono text-xs select-none pointer-events-none">
            BANGLADESH NATIONAL BLOOD CORRIDOR
          </div>
        </div>

        {/* Selected District Info Panel */}
        <div className="flex flex-col justify-between bg-slate-50 p-5 rounded-2xl border border-slate-200">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                {language === "bn" ? "নির্বাচিত জেলা" : "Selected District"}
              </span>
              <span className="bg-red-100 text-brand-red text-xs font-bold px-2 py-0.5 rounded">
                {activeDistrict.divisionId.toUpperCase()}
              </span>
            </div>

            <h4 className="text-xl font-black text-brand-navy mt-1">
              {language === "bn" ? activeDistrict.bnName : activeDistrict.name}
            </h4>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm text-center">
                <Users className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                <span className="text-lg font-black text-slate-800 block">
                  340+
                </span>
                <span className="text-[10px] text-slate-500 font-bold">
                  {language === "bn" ? "রক্তদাতা" : "Donors"}
                </span>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200/80 shadow-sm text-center">
                <Droplet className="w-4 h-4 text-brand-red fill-brand-red mx-auto mb-1" />
                <span className="text-lg font-black text-slate-800 block">
                  05
                </span>
                <span className="text-[10px] text-slate-500 font-bold">
                  {language === "bn" ? "জরুরি আবেদন" : "Urgent Needs"}
                </span>
              </div>
            </div>

            <div className="mt-4">
              <span className="text-xs font-bold text-slate-600 block mb-2">
                {language === "bn" ? "অন্তর্ভুক্ত উপজেলাসমূহ:" : "Upazilas Covered:"}
              </span>
              <div className="flex flex-wrap gap-1 max-h-36 overflow-y-auto pr-1">
                {activeDistrict.upazilas.map((up) => (
                  <span
                    key={up.id}
                    className="text-[11px] bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-700 font-medium"
                  >
                    {language === "bn" ? up.bnName : up.name}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <Link
            href={`/donors?district=${activeDistrict.id}`}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-brand-navy hover:bg-brand-navyDark text-white py-2.5 rounded-xl font-bold text-xs transition-all shadow"
          >
            <Users className="w-3.5 h-3.5" />
            <span>
              {language === "bn"
                ? `${activeDistrict.bnName} জেলার রক্তদাতা দেখুন`
                : `View All Donors in ${activeDistrict.name}`}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
