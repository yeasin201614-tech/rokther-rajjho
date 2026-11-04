"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { INITIAL_DONORS, INITIAL_REQUESTS } from "@/lib/store";
import {
  ShieldAlert,
  Users,
  Droplet,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Hospital,
  Activity,
  Send,
  Building2,
  Calendar,
} from "lucide-react";

export default function AdminPage() {
  const { language } = useLanguage();
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const [donors, setDonors] = useState(INITIAL_DONORS);
  const [broadcastMessage, setBroadcastMessage] = useState("");
  const [broadcastSent, setBroadcastSent] = useState(false);

  const handleApproveDonor = (donorId: string) => {
    setDonors(
      donors.map((d) => (d.id === donorId ? { ...d, isVerified: true } : d))
    );
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastMessage) return;
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastMessage("");
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-red-100 text-brand-red rounded-lg">
                <ShieldAlert className="w-5 h-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-brand-navy">
                {language === "bn" ? "জাতীয় নিয়ন্ত্রণ ও তদারকি প্যানেল" : "National Supervisory Control Panel"}
              </h1>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Rokther Rajjho Admin Center — Real-time Emergency Response & Verification
            </p>
          </div>

          <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 self-start">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Operational (24/7)</span>
          </span>
        </div>

        {/* National Overview KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-brand-red flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase block">
                Total Donors
              </span>
              <span className="text-2xl font-black text-brand-navy">
                1,048,290
              </span>
              <span className="text-[10px] text-emerald-600 font-bold block">
                +1,240 this week
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Droplet className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase block">
                Active Requests
              </span>
              <span className="text-2xl font-black text-brand-navy">142</span>
              <span className="text-[10px] text-red-600 font-bold block">
                18 Critical Immediate
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase block">
                Fulfillment Rate
              </span>
              <span className="text-2xl font-black text-emerald-700">94.8%</span>
              <span className="text-[10px] text-slate-400 font-bold block">
                Avg. response 22 mins
              </span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-brand-navy flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-500 font-bold uppercase block">
                Verified Orgs
              </span>
              <span className="text-2xl font-black text-brand-navy">84</span>
              <span className="text-[10px] text-slate-400 font-bold block">
                Across 64 Districts
              </span>
            </div>
          </div>
        </div>

        {/* Emergency Broadcast Section */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-navyDark text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-black uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4" />
              <span>National Blood Shortage Emergency Alert</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black">
              {language === "bn"
                ? "জরুরি পুশ নোটিফিকেশন সম্প্রচার"
                : "Broadcast Emergency Push Notification"}
            </h2>
            <p className="text-xs text-slate-300">
              {language === "bn"
                ? "নির্দিষ্ট জেলা বা সারা দেশের নির্দিষ্ট রক্তের গ্রুপের রক্তদাতাদের মোবাইলে তাৎক্ষণিক এসএমএস ও অ্যাপ অ্যালার্ট পাঠান।"
                : "Dispatch emergency alerts to all active donors in designated districts."}
            </p>

            <form onSubmit={handleSendBroadcast} className="flex gap-2 pt-2">
              <input
                type="text"
                required
                placeholder="e.g. Critical O- negative blood needed immediately at DMCH Trauma Center..."
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
              <button
                type="submit"
                className="bg-brand-red hover:bg-brand-redDark text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 shrink-0 flex items-center gap-1.5"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{broadcastSent ? "Broadcasted!" : "Send Alert"}</span>
              </button>
            </form>
          </div>
        </div>

        {/* Pending Verifications & Active Requests */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Active Emergency Requests Table */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-brand-navy flex items-center gap-2">
                <Droplet className="w-5 h-5 text-brand-red fill-brand-red" />
                <span>Active Blood Requests</span>
              </h3>
              <span className="text-xs text-slate-400 font-bold">
                {requests.length} Requests
              </span>
            </div>

            <div className="space-y-3">
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-slate-800 text-sm">
                        {req.patientName}
                      </span>
                      <span className="bg-red-50 text-brand-red font-black px-1.5 py-0.5 rounded text-[11px]">
                        {req.bloodGroup} ({req.unitsNeeded} Bag)
                      </span>
                    </div>
                    <span className="text-slate-500 block mt-0.5">
                      {req.hospitalName} ({req.districtId})
                    </span>
                    <span className="text-amber-600 font-bold block mt-0.5">
                      Urgency: {req.urgencyLevel}
                    </span>
                  </div>

                  <Link
                    href={`/requests/${req.id}`}
                    className="bg-brand-navy hover:bg-brand-navyDark text-white px-3 py-1.5 rounded-xl font-bold text-xs shrink-0"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Donor Verifications Queue */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-black text-base text-brand-navy flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                <span>Donor Verification Queue</span>
              </h3>
              <span className="text-xs text-slate-400 font-bold">
                {donors.length} Donors
              </span>
            </div>

            <div className="space-y-3">
              {donors.slice(0, 4).map((d) => (
                <div
                  key={d.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden relative border border-slate-200 shrink-0">
                      <Image
                        src={d.avatarUrl}
                        alt={d.fullName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-800">
                          {d.fullName}
                        </span>
                        <span className="text-brand-red font-bold">
                          {d.bloodGroup}
                        </span>
                      </div>
                      <span className="text-slate-400 block font-mono text-[10px]">
                        {d.donorId}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {d.isVerified ? (
                      <span className="text-emerald-600 font-bold text-xs flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Verified
                      </span>
                    ) : (
                      <button
                        onClick={() => handleApproveDonor(d.id)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-xl font-bold text-xs transition-all"
                      >
                        Approve Badge
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
