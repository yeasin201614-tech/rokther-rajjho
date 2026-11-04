"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { INITIAL_ORGANIZATIONS } from "@/lib/store";
import {
  Building2,
  CheckCircle2,
  Users,
  Droplet,
  Calendar,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";

export default function OrganizationsPage() {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 px-3.5 py-1 rounded-full text-xs font-bold text-brand-navy mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>
              {language === "bn"
                ? "স্বীকৃত জাতীয় রক্তদাতা সংগঠন নেটওয়ার্ক"
                : "Verified Voluntary Blood Organizations"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-brand-navy">
            {language === "bn"
              ? "স্বেচ্ছাসেবী রক্তদান সংগঠনসমূহ"
              : "Humanitarian Blood Organizations"}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mt-1 leading-relaxed">
            {language === "bn"
              ? "বাংলাদেশের বিভিন্ন বিশ্ববিদ্যালয়, মেডিকেল কলেজ ও জেলা পর্যায়ের স্বীকৃত রক্তদান ক্লাবের তালিকা।"
              : "Nationally verified university blood clubs, medical associations, and humanitarian societies."}
          </p>
        </div>

        {/* Organizations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {INITIAL_ORGANIZATIONS.map((org) => (
            <div
              key={org.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden relative border border-slate-200 bg-white shadow-inner shrink-0">
                      <Image
                        src={org.logoUrl}
                        alt={org.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-extrabold text-base sm:text-lg text-brand-navy">
                          {language === "bn" ? org.bengaliName : org.name}
                        </h3>
                        {org.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100 shrink-0" />
                        )}
                      </div>
                      <span className="text-xs text-slate-500 font-semibold block mt-0.5">
                        {org.type}
                      </span>
                    </div>
                  </div>

                  <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200 shrink-0">
                    Govt Reg
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-4">
                  {org.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-2 py-3 px-4 bg-slate-50 rounded-2xl text-center text-xs font-bold">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Members
                    </span>
                    <span className="text-slate-800 text-sm font-black">
                      {org.memberCount}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Donations
                    </span>
                    <span className="text-brand-red text-sm font-black">
                      {org.totalDonations}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">
                      Campaigns
                    </span>
                    <span className="text-slate-800 text-sm font-black">
                      {org.campaignsCount}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Footer */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3 text-xs">
                <a
                  href={`tel:${org.contactPhone}`}
                  className="flex items-center gap-1.5 font-bold text-slate-700 hover:text-brand-red transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-red" />
                  <span>{org.contactPhone}</span>
                </a>

                <Link
                  href={`/campaigns?org=${org.id}`}
                  className="flex items-center gap-1 font-bold text-brand-red hover:underline"
                >
                  <span>{language === "bn" ? "ক্যাম্পেইন দেখুন" : "View Drives"}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
