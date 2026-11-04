"use client";

import React, { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import {
  DIVISIONS,
  DISTRICTS,
  BLOOD_GROUPS,
} from "@/lib/bangladesh-data";
import { INITIAL_DONORS } from "@/lib/store";
import DonorCard from "@/components/DonorCard";
import BangladeshMap from "@/components/BangladeshMap";
import {
  Search,
  Droplet,
  Grid,
  Map,
  CheckCircle2,
  RefreshCcw,
} from "lucide-react";

function DonorsContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();

  // Filters state from URL or defaults
  const [bloodGroup, setBloodGroup] = useState<string>(
    searchParams?.get("bloodGroup") || ""
  );
  const [division, setDivision] = useState<string>(
    searchParams?.get("division") || ""
  );
  const [district, setDistrict] = useState<string>(
    searchParams?.get("district") || ""
  );
  const [upazila, setUpazila] = useState<string>(
    searchParams?.get("upazila") || ""
  );
  const [onlyAvailable, setOnlyAvailable] = useState<boolean>(false);
  const [onlyVerified, setOnlyVerified] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");

  // Cascading districts
  const filteredDistricts = division
    ? DISTRICTS.filter((d) => d.divisionId === division)
    : DISTRICTS;

  // Cascading upazilas
  const activeDistrictObj = DISTRICTS.find((d) => d.id === district);
  const upazilaList = activeDistrictObj ? activeDistrictObj.upazilas : [];

  // Filtered Donors calculation
  const displayedDonors = useMemo(() => {
    return INITIAL_DONORS.filter((donor) => {
      if (bloodGroup && donor.bloodGroup !== bloodGroup) return false;
      if (division && donor.divisionId !== division) return false;
      if (district && donor.districtId !== district) return false;
      if (upazila && donor.upazilaId !== upazila) return false;
      if (onlyAvailable && !donor.isAvailable) return false;
      if (onlyVerified && !donor.isVerified) return false;
      return true;
    });
  }, [bloodGroup, division, district, upazila, onlyAvailable, onlyVerified]);

  const handleResetFilters = () => {
    setBloodGroup("");
    setDivision("");
    setDistrict("");
    setUpazila("");
    setOnlyAvailable(false);
    setOnlyVerified(false);
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy flex items-center gap-2">
            <Droplet className="w-7 h-7 text-brand-red fill-brand-red" />
            <span>{language === "bn" ? "রক্তদাতা অনুসন্ধান ও তালিকা" : "Find Blood Donors"}</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {language === "bn"
              ? "৬৪টি জেলা ও ৪৯৫টি উপজেলার ভেরিফাইড রক্তদাতাদের সাথে তাৎক্ষণিক যোগাযোগ করুন"
              : "Browse and connect with verified life-savers across 64 districts"}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-2xl border border-slate-200 self-start sm:self-auto shadow-sm">
          <button
            onClick={() => setViewMode("grid")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === "grid"
                ? "bg-brand-red text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "গ্রিড ভিউ" : "Grid"}</span>
          </button>
          <button
            onClick={() => setViewMode("map")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === "map"
                ? "bg-brand-red text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>{language === "bn" ? "মানচিত্র ভিউ" : "Map"}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar Box */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Blood Group */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"}
            </label>
            <select
              value={bloodGroup}
              onChange={(e) => setBloodGroup(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              <option value="">{language === "bn" ? "সকল গ্রুপ" : "All Groups"}</option>
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
              value={division}
              onChange={(e) => {
                setDivision(e.target.value);
                setDistrict("");
                setUpazila("");
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              <option value="">{language === "bn" ? "সকল বিভাগ" : "All Divisions"}</option>
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
              value={district}
              onChange={(e) => {
                setDistrict(e.target.value);
                setUpazila("");
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
            >
              <option value="">{language === "bn" ? "সকল জেলা" : "All Districts"}</option>
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
              value={upazila}
              onChange={(e) => setUpazila(e.target.value)}
              disabled={!district || upazilaList.length === 0}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30 disabled:opacity-50"
            >
              <option value="">{language === "bn" ? "সকল উপজেলা" : "All Upazilas"}</option>
              {upazilaList.map((up) => (
                <option key={up.id} value={up.id}>
                  {language === "bn" ? up.bnName : up.name}
                </option>
              ))}
            </select>
          </div>

          {/* Reset Button */}
          <div className="flex items-end">
            <button
              onClick={handleResetFilters}
              className="w-full flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2.5 px-3 rounded-xl text-xs font-bold transition-all border border-slate-200"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
              <span>{language === "bn" ? "ফিল্টার মুছুন" : "Reset Filters"}</span>
            </button>
          </div>
        </div>

        {/* Additional Checkbox Toggles */}
        <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-100 text-xs font-semibold text-slate-700">
          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyAvailable}
              onChange={(e) => setOnlyAvailable(e.target.checked)}
              className="w-4 h-4 text-brand-red rounded focus:ring-brand-red"
            />
            <span>
              {language === "bn" ? "শুধুমাত্র প্রস্তুত রক্তদাতা (Available)" : "Available to Donate Now"}
            </span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={onlyVerified}
              onChange={(e) => setOnlyVerified(e.target.checked)}
              className="w-4 h-4 text-brand-red rounded focus:ring-brand-red"
            />
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{language === "bn" ? "ভেরিফাইড ডোনার" : "Verified Donors Only"}</span>
            </span>
          </label>

          <div className="ml-auto text-xs font-bold text-slate-500">
            {language === "bn"
              ? `মোট ${displayedDonors.length} জন রক্তদাতা পাওয়া গেছে`
              : `Showing ${displayedDonors.length} Donors`}
          </div>
        </div>
      </div>

      {/* View Mode: Map or Grid */}
      {viewMode === "map" ? (
        <div className="space-y-6">
          <BangladeshMap
            selectedDistrict={district}
            onSelectDistrict={(id) => setDistrict(id)}
          />

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-base font-extrabold text-brand-navy mb-4">
              {language === "bn"
                ? `${district ? district.toUpperCase() : "বাংলাদেশ"}-এর রক্তদাতাগণ`
                : `Donors in ${district ? district.toUpperCase() : "Bangladesh"}`}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {displayedDonors.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div>
          {displayedDonors.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
              <div className="w-16 h-16 bg-red-50 text-brand-red rounded-full flex items-center justify-center mx-auto">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                {language === "bn"
                  ? "কোনো রক্তদাতা পাওয়া যায়নি"
                  : "No Donors Found"}
              </h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                {language === "bn"
                  ? "আপনার নির্বাচিত ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন অথবা জরুরি রক্তের আবেদন তৈরি করুন।"
                  : "Try broadening your filter criteria or post an emergency blood request."}
              </p>
              <div className="pt-2">
                <Link
                  href="/request"
                  className="inline-flex items-center gap-2 bg-brand-red text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-md"
                >
                  <Droplet className="w-3.5 h-3.5 fill-white" />
                  <span>{t.emergency.actionBtn}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {displayedDonors.map((donor) => (
                <DonorCard key={donor.id} donor={donor} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DonorsPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <Suspense fallback={<div className="max-w-7xl mx-auto py-12 text-center text-slate-400 font-bold">Loading Donors Directory...</div>}>
        <DonorsContent />
      </Suspense>
    </div>
  );
}
