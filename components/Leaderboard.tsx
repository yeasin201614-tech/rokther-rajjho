"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { Award, Trophy, Medal, Star, Heart, Building2, UserCheck, Droplet } from "lucide-react";

export default function Leaderboard() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<"donors" | "volunteers" | "organizations">("donors");

  const topDonors = [
    {
      rank: 1,
      name: "Md. Rahim Khan",
      bnName: "মো. রহিম খান",
      donations: 25,
      bloodGroup: "O+",
      district: "Dhaka",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 2,
      name: "Ayesha Siddika",
      bnName: "আয়েশা সিদ্দিকা",
      donations: 22,
      bloodGroup: "AB+",
      district: "Chattogram",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 3,
      name: "Tanvir Hasan",
      bnName: "তানভীর হাসান",
      donations: 20,
      bloodGroup: "A+",
      district: "Dhaka",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 4,
      name: "Rafiqul Islam",
      bnName: "রফিকুল ইসলাম",
      donations: 14,
      bloodGroup: "B+",
      district: "Dhaka",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 5,
      name: "Sadia Akter",
      bnName: "সাদিয়া আক্তার",
      donations: 8,
      bloodGroup: "O+",
      district: "Gazipur",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const topVolunteers = [
    {
      rank: 1,
      name: "Kamrul Hasan",
      bnName: "কামরুল হাসান",
      coordinated: 112,
      district: "Dhaka",
      badge: "National Coordinator",
      avatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 2,
      name: "Nusrat Jahan",
      bnName: "নুসরাত জাহান",
      coordinated: 89,
      district: "Rajshahi",
      badge: "Regional Lead",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 3,
      name: "Saiful Islam",
      bnName: "সাইফুল ইসলাম",
      coordinated: 76,
      district: "Sylhet",
      badge: "Hospital Squad",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const topOrganizations = [
    {
      rank: 1,
      name: "Bangladesh Red Crescent Society",
      bnName: "বাংলাদেশ রেড ক্রিসেন্ট সোসাইটি",
      donations: 850,
      members: 125,
      verified: true,
      logo: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 2,
      name: "Sandhani Blood Club",
      bnName: "সন্ধানী জাতীয় চক্ষু ও রক্তদান সংস্থা",
      donations: 1420,
      members: 210,
      verified: true,
      logo: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=150&q=80",
    },
    {
      rank: 3,
      name: "Badhan Blood Network",
      bnName: "বাঁধন রক্তদান নেটওয়ার্ক",
      donations: 4200,
      members: 560,
      verified: true,
      logo: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=150&q=80",
    },
  ];

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <span className="w-6 h-6 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center shadow">1</span>;
    if (rank === 2) return <span className="w-6 h-6 rounded-full bg-slate-400 text-white font-black text-xs flex items-center justify-center shadow">2</span>;
    if (rank === 3) return <span className="w-6 h-6 rounded-full bg-amber-700 text-white font-black text-xs flex items-center justify-center shadow">3</span>;
    return <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200">{rank}</span>;
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-md">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
        <h3 className="text-base font-extrabold text-brand-navy flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-500" />
          <span>{language === "bn" ? "সেরা তালিকা (লিডারবোর্ড)" : "Leaderboard"}</span>
        </h3>
        <Link
          href="/leaderboard"
          className="text-xs font-bold text-brand-red hover:underline"
        >
          {language === "bn" ? "সকল রেঙ্কিং দেখুন" : "View All"}
        </Link>
      </div>

      {/* Tabs */}
      <div className="flex bg-slate-100 p-1 rounded-xl mb-4 text-xs font-bold text-slate-600">
        <button
          onClick={() => setActiveTab("donors")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === "donors"
              ? "bg-white text-brand-red shadow-sm"
              : "hover:text-slate-900"
          }`}
        >
          {language === "bn" ? "শীর্ষ রক্তদাতা" : "Top Donors"}
        </button>
        <button
          onClick={() => setActiveTab("volunteers")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === "volunteers"
              ? "bg-white text-brand-red shadow-sm"
              : "hover:text-slate-900"
          }`}
        >
          {language === "bn" ? "শীর্ষ স্বেচ্ছাসেবী" : "Top Volunteers"}
        </button>
        <button
          onClick={() => setActiveTab("organizations")}
          className={`flex-1 py-1.5 rounded-lg transition-all ${
            activeTab === "organizations"
              ? "bg-white text-brand-red shadow-sm"
              : "hover:text-slate-900"
          }`}
        >
          {language === "bn" ? "শীর্ষ সংগঠন" : "Top Organizations"}
        </button>
      </div>

      {/* List Rendering */}
      <div className="space-y-3">
        {activeTab === "donors" &&
          topDonors.map((donor) => (
            <div
              key={donor.rank}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3">
                {getRankBadge(donor.rank)}
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200">
                  <Image
                    src={donor.avatar}
                    alt={donor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {language === "bn" ? donor.bnName : donor.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-slate-500">
                    <span className="font-bold text-brand-red">{donor.bloodGroup}</span>
                    <span>•</span>
                    <span>{donor.district}</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-brand-navy">
                  {donor.donations}
                </span>
                <span className="block text-[10px] text-slate-500 font-semibold">
                  {language === "bn" ? "রক্তদান" : "Donations"}
                </span>
              </div>
            </div>
          ))}

        {activeTab === "volunteers" &&
          topVolunteers.map((vol) => (
            <div
              key={vol.rank}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3">
                {getRankBadge(vol.rank)}
                <div className="w-9 h-9 rounded-full overflow-hidden relative border border-slate-200">
                  <Image
                    src={vol.avatar}
                    alt={vol.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">
                    {language === "bn" ? vol.bnName : vol.name}
                  </h4>
                  <span className="text-[10px] text-emerald-600 font-semibold block">
                    {vol.badge}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-brand-navy">
                  {vol.coordinated}
                </span>
                <span className="block text-[10px] text-slate-500 font-semibold">
                  {language === "bn" ? "সহায়তা" : "Drives"}
                </span>
              </div>
            </div>
          ))}

        {activeTab === "organizations" &&
          topOrganizations.map((org) => (
            <div
              key={org.rank}
              className="flex items-center justify-between p-2.5 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3">
                {getRankBadge(org.rank)}
                <div className="w-9 h-9 rounded-lg overflow-hidden relative border border-slate-200 bg-white">
                  <Image
                    src={org.logo}
                    alt={org.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="max-w-[150px] truncate">
                  <h4 className="text-xs font-bold text-slate-800 truncate">
                    {language === "bn" ? org.bnName : org.name}
                  </h4>
                  <span className="text-[10px] text-slate-500 font-semibold">
                    {org.members} {language === "bn" ? "সদস্য" : "Members"}
                  </span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs font-black text-brand-navy">
                  {org.donations}
                </span>
                <span className="block text-[10px] text-slate-500 font-semibold">
                  {language === "bn" ? "রক্তদান" : "Donations"}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
