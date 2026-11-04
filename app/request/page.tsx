"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { useLanguage } from "@/lib/i18n";
import {
  DIVISIONS,
  DISTRICTS,
  BLOOD_GROUPS,
  BloodGroup,
} from "@/lib/bangladesh-data";
import { INITIAL_DONORS, INITIAL_REQUESTS } from "@/lib/store";
import { BloodRequest, DonorProfile } from "@/lib/types";
import {
  AlertTriangle,
  Droplet,
  Hospital,
  MapPin,
  Calendar,
  Clock,
  Phone,
  User,
  ShieldAlert,
  Send,
  CheckCircle2,
  Share2,
} from "lucide-react";

export default function RequestBloodPage() {
  const { language, t } = useLanguage();
  const router = useRouter();

  // Form states
  const [patientName, setPatientName] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [unitsNeeded, setUnitsNeeded] = useState(1);
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalAddress, setHospitalAddress] = useState("");
  const [division, setDivision] = useState("dhaka");
  const [district, setDistrict] = useState("dhaka");
  const [upazila, setUpazila] = useState("dhanmondi");
  const [contactNumber, setContactNumber] = useState("");
  const [alternateNumber, setAlternateNumber] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState<"IMMEDIATE" | "CRITICAL" | "NORMAL">("IMMEDIATE");
  const [requiredDate, setRequiredDate] = useState("Today");
  const [requiredTime, setRequiredTime] = useState("Immediately (Within 2 hours)");
  const [reason, setReason] = useState("");
  
  // Submission match state
  const [matchedDonors, setMatchedDonors] = useState<DonorProfile[]>([]);
  const [submittedRequestId, setSubmittedRequestId] = useState<string | null>(null);

  // Cascading districts
  const filteredDistricts = division
    ? DISTRICTS.filter((d) => d.divisionId === division)
    : DISTRICTS;

  const activeDistrictObj = DISTRICTS.find((d) => d.id === district);
  const upazilaList = activeDistrictObj ? activeDistrictObj.upazilas : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !hospitalName || !contactNumber) return;

    const newReqId = `req-${Date.now().toString().slice(-6)}`;

    // Instant Smart Matching
    const matched = INITIAL_DONORS.filter(
      (d) =>
        d.bloodGroup === bloodGroup &&
        (d.districtId === district || d.divisionId === division) &&
        d.isAvailable
    );

    setMatchedDonors(matched);
    setSubmittedRequestId(newReqId);

    // Trigger alert sound or confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header Alert Card */}
        <div className="bg-gradient-to-r from-brand-red to-red-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="flex items-center gap-3 mb-2">
            <span className="p-2 bg-white/20 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-white" />
            </span>
            <span className="text-xs font-black uppercase tracking-wider text-red-200">
              NATIONAL EMERGENCY BLOOD DISPATCH
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black">
            {language === "bn"
              ? "জরুরি রক্তের আবেদন করুন"
              : "Emergency Blood Request"}
          </h1>
          <p className="text-xs sm:text-sm text-red-100 max-w-xl mt-1 leading-relaxed">
            {language === "bn"
              ? "আবেদন সম্পন্ন করার সাথে সাথে সংশ্লিষ্ট জেলা ও উপজেলার সকল সক্রিয় রক্তদাতাদের কাছে নোটিফিকেশন পাঠানো হবে।"
              : "Submitting this form immediately alerts all matching, available donors in the selected district."}
          </p>
        </div>

        {/* If Submitted: Show Instant Matches & Confirmation */}
        {submittedRequestId ? (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6 animate-fade-in">
            <div className="flex items-center gap-3 text-emerald-600 bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h3 className="font-black text-base text-emerald-950">
                  {language === "bn"
                    ? "রক্তের আবেদন সফলভাবে সক্রিয় হয়েছে!"
                    : "Blood Request Dispatched Successfully!"}
                </h3>
                <p className="text-xs text-emerald-800">
                  Request ID: <span className="font-mono font-bold">{submittedRequestId}</span> | Status: SEARCHING ACTIVE DONORS
                </p>
              </div>
            </div>

            {/* Matched Donors Recommendation */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-black text-base text-brand-navy flex items-center gap-2">
                  <Droplet className="w-5 h-5 text-brand-red fill-brand-red" />
                  <span>
                    {language === "bn"
                      ? `তাৎক্ষণিক মিলে যাওয়া ${bloodGroup} রক্তদাতাগণ (${matchedDonors.length} জন)`
                      : `Instant Matching ${bloodGroup} Donors (${matchedDonors.length})`}
                  </span>
                </h4>
                <span className="text-xs text-slate-500 font-bold">
                  District: {district.toUpperCase()}
                </span>
              </div>

              {matchedDonors.length === 0 ? (
                <div className="p-6 bg-slate-50 rounded-2xl text-center text-xs text-slate-500">
                  {language === "bn"
                    ? "আপনার নির্ধারিত উপজেলায় এই মুহূর্তে প্রস্তুত ডোনার পাওয়া যায়নি, পার্শ্ববর্তী উপজেলায় অ্যালার্ট পাঠানো হয়েছে।"
                    : "Broadening search to neighboring upazilas. Hotline assistance triggered."}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {matchedDonors.map((donor) => (
                    <div
                      key={donor.id}
                      className="p-4 rounded-2xl border border-slate-200 bg-slate-50 flex items-center justify-between gap-3 shadow-sm"
                    >
                      <div>
                        <div className="flex items-center gap-1.5">
                          <h5 className="font-extrabold text-sm text-brand-navy">
                            {donor.fullName}
                          </h5>
                          <span className="bg-red-50 text-brand-red text-xs font-black px-1.5 py-0.5 rounded">
                            {donor.bloodGroup}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500 block capitalize">
                          {donor.upazilaId}, {donor.districtId}
                        </span>
                        <span className="text-[11px] text-emerald-600 font-bold block mt-0.5">
                          ⭐ {donor.rating} ({donor.totalDonations} Donations)
                        </span>
                      </div>

                      <a
                        href={`tel:${donor.phone}`}
                        className="bg-brand-red hover:bg-brand-redDark text-white px-3.5 py-2 rounded-xl text-xs font-bold shadow-sm transition-all flex items-center gap-1 shrink-0"
                      >
                        <Phone className="w-3.5 h-3.5 fill-white" />
                        <span>{language === "bn" ? "কল করুন" : "Call"}</span>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-3">
              <Link
                href={`/requests/${submittedRequestId}`}
                className="flex-1 bg-brand-navy hover:bg-brand-navyDark text-white py-3 px-4 rounded-xl font-bold text-xs text-center shadow-md"
              >
                {language === "bn" ? "লাইভ ট্র্যাকিং পেজে যান" : "Go to Live Tracking Page"}
              </Link>
              <button
                onClick={() => setSubmittedRequestId(null)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 px-4 rounded-xl font-bold text-xs"
              >
                {language === "bn" ? "আরেকটি আবেদন করুন" : "New Request"}
              </button>
            </div>
          </div>
        ) : (
          /* Form Area */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6"
          >
            {/* Urgency Selector */}
            <div>
              <label className="block text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2">
                {language === "bn" ? "জরুরিতা স্তর (Urgency Level)" : "Urgency Level"} *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: "IMMEDIATE",
                    label: language === "bn" ? "অতি জরুরি (২ ঘণ্টার মধ্যে)" : "Immediate (Within 2 Hours)",
                    color: "border-red-500 bg-red-50/70 text-red-700",
                  },
                  {
                    id: "CRITICAL",
                    label: language === "bn" ? "জরুরি (আজকের মধ্যে)" : "Critical (Within Today)",
                    color: "border-amber-500 bg-amber-50/70 text-amber-800",
                  },
                  {
                    id: "NORMAL",
                    label: language === "bn" ? "নির্ধারিত অপারেশন (কাল)" : "Normal (Scheduled)",
                    color: "border-blue-500 bg-blue-50/70 text-blue-800",
                  },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setUrgencyLevel(item.id as any)}
                    className={`py-3 px-4 rounded-2xl border-2 text-xs font-black transition-all text-left ${
                      urgencyLevel === item.id
                        ? `${item.color} shadow-sm ring-2 ring-offset-1`
                        : "border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Patient & Blood Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "রোগীর নাম" : "Patient Name"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fahim Chowdhury"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "রক্তের গ্রুপ" : "Blood Group"} *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-black text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hospital Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "হাসপাতালের নাম" : "Hospital Name"} *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dhaka Medical College Hospital"
                  value={hospitalName}
                  onChange={(e) => setHospitalName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "রক্তের পরিমাণ (ব্যাগ)" : "Units Needed"} *
                </label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={unitsNeeded}
                  onChange={(e) => setUnitsNeeded(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>
            </div>

            {/* Location (Division, District, Upazila) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "বিভাগ" : "Division"} *
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    setDivision(e.target.value);
                    setDistrict("");
                    setUpazila("");
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {language === "bn" ? d.bnName : d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "জেলা" : "District"} *
                </label>
                <select
                  value={district}
                  onChange={(e) => {
                    const val = e.target.value;
                    setDistrict(val);
                    setUpazila("");
                    if (val) {
                      const dist = DISTRICTS.find((d) => d.id === val);
                      if (dist && !division) {
                        setDivision(dist.divisionId);
                      }
                    }
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30 truncate"
                >
                  <option value="">{language === "bn" ? "জেলা নির্বাচন" : "Select District"}</option>
                  {filteredDistricts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {language === "bn" ? d.bnName : d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "উপজেলা" : "Upazila"}
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  disabled={!district || upazilaList.length === 0}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30 disabled:opacity-60 disabled:cursor-not-allowed truncate"
                >
                  <option value="">
                    {!district
                      ? (language === "bn" ? "আগে জেলা বাছুন" : "Select District First")
                      : (language === "bn" ? "উপজেলা নির্বাচন" : "Select Upazila")}
                  </option>
                  {upazilaList.map((up) => (
                    <option key={up.id} value={up.id}>
                      {language === "bn" ? up.bnName : up.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "যোগাযোগের ফোন নম্বর" : "Contact Phone Number"} *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1711-223344"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  {language === "bn" ? "বিকল্প ফোন নম্বর (যদি থাকে)" : "Alternate Phone (Optional)"}
                </label>
                <input
                  type="tel"
                  placeholder="+880 1819-000000"
                  value={alternateNumber}
                  onChange={(e) => setAlternateNumber(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>
            </div>

            {/* Medical Reason */}
            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                {language === "bn" ? "রোগীর সমস্যার কারণ / বিবরণ" : "Medical Reason / Diagnosis"}
              </label>
              <textarea
                rows={2}
                placeholder="e.g. Accident victim / C-section delivery / Thalassemia transfusion / Open heart surgery"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full urgent-pulse flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white py-3.5 px-6 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>
                  {language === "bn"
                    ? "জরুরি রক্তের আবেদন প্রকাশ করুন"
                    : "Broadcast Emergency Blood Request"}
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
