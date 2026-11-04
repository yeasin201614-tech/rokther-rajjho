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
import {
  UserPlus,
  Droplet,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Mail,
  Phone,
  User,
  MapPin,
  Calendar,
} from "lucide-react";

export default function RegisterPage() {
  const { language, t } = useLanguage();
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [bengaliName, setBengaliName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>("O+");
  const [gender, setGender] = useState("Male");
  const [division, setDivision] = useState("dhaka");
  const [district, setDistrict] = useState("dhaka");
  const [upazila, setUpazila] = useState("dhanmondi");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredDistricts = division
    ? DISTRICTS.filter((d) => d.divisionId === division)
    : DISTRICTS;

  const activeDistrictObj = DISTRICTS.find((d) => d.id === district);
  const upazilaList = activeDistrictObj ? activeDistrictObj.upazilas : [];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    confetti({
      particleCount: 70,
      spread: 70,
      origin: { y: 0.6 },
    });

    setIsSuccess(true);
    setTimeout(() => {
      router.push("/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center mx-auto">
            <Droplet className="w-6 h-6 fill-brand-red" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
            {language === "bn" ? "রক্তদাতা হিসেবে নিবন্ধন করুন" : "Register as a Life Saver"}
          </h1>
          <p className="text-xs text-slate-500">
            {language === "bn"
              ? "জাতীয় রক্ত সুরক্ষা নেটওয়ার্কে যুক্ত হয়ে মানুষের জীবন বাঁচান"
              : "Join the national voluntary blood donation network"}
          </p>
        </div>

        {isSuccess ? (
          <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl text-center space-y-3 animate-fade-in">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="text-lg font-black text-slate-800">
              {language === "bn" ? "নিবন্ধন সফল হয়েছে!" : "Registration Successful!"}
            </h3>
            <p className="text-xs text-slate-500">
              {language === "bn"
                ? "আপনার ডিজিটাল আইডি কার্ড প্রস্তুত করা হচ্ছে... ড্যাশবোর্ডে রিডাইরেক্ট করা হচ্ছে।"
                : "Preparing your official Digital ID card. Redirecting to dashboard..."}
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleRegister}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Full Name (English) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Md. Rahim Khan"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  পূর্ণ নাম (বাংলা)
                </label>
                <input
                  type="text"
                  placeholder="মো. রহিম খান"
                  value={bengaliName}
                  onChange={(e) => setBengaliName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="+880 1711-000000"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="rahim@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Blood Group *
                </label>
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-black text-brand-red focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>
                      {bg}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Gender *
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  <option value="Male">Male (পুরুষ)</option>
                  <option value="Female">Female (মহিলা)</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Division *
                </label>
                <select
                  value={division}
                  onChange={(e) => {
                    setDivision(e.target.value);
                    setDistrict("");
                    setUpazila("");
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  {DIVISIONS.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.bnName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  District *
                </label>
                <select
                  value={district}
                  onChange={(e) => {
                    setDistrict(e.target.value);
                    setUpazila("");
                  }}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
                >
                  {filteredDistricts.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.bnName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                  Upazila
                </label>
                <select
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  disabled={!district || upazilaList.length === 0}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-brand-red/30 disabled:opacity-50"
                >
                  {upazilaList.map((up) => (
                    <option key={up.id} value={up.id}>
                      {up.bnName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
                Password *
              </label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-brand-red/30"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-brand-red hover:bg-brand-redDark text-white py-3 rounded-2xl font-black text-xs shadow-md transition-all active:scale-95"
              >
                <UserPlus className="w-4 h-4" />
                <span>{language === "bn" ? "রক্তদাতা হিসেবে যোগ দিন" : "Complete Registration"}</span>
              </button>
            </div>

            <div className="text-center pt-2 text-xs text-slate-500">
              {language === "bn" ? "পূর্বেই একাউন্ট আছে?" : "Already registered?"}{" "}
              <Link href="/login" className="font-bold text-brand-red hover:underline">
                {language === "bn" ? "লগইন করুন" : "Login"}
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
