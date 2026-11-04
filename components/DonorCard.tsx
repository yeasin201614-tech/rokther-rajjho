"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { DonorProfile } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import {
  Phone,
  MessageCircle,
  MapPin,
  Star,
  CheckCircle2,
  Clock,
  Heart,
  Droplet,
} from "lucide-react";

interface DonorCardProps {
  donor: DonorProfile;
}

export default function DonorCard({ donor }: DonorCardProps) {
  const { language } = useLanguage();

  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
      <div>
        {/* Top Header with Avatar & Status */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl overflow-hidden relative border-2 border-slate-100 shadow-inner shrink-0">
              <Image
                src={donor.avatarUrl}
                alt={donor.fullName}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="60px"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-brand-navy text-sm sm:text-base group-hover:text-brand-red transition-colors">
                  {donor.fullName}
                </h3>
                {donor.isVerified && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 fill-emerald-100 shrink-0" />
                )}
              </div>

              <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="capitalize">
                  {donor.upazilaId ? `${donor.upazilaId}, ` : ""}{donor.districtId}
                </span>
              </div>
            </div>
          </div>

          {/* Blood Group Badge */}
          <div className="w-11 h-11 rounded-xl bg-red-50 border border-red-200 flex flex-col items-center justify-center shrink-0">
            <span className="text-sm font-black text-brand-red leading-none">
              {donor.bloodGroup}
            </span>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-2 py-2.5 px-3 bg-slate-50 rounded-xl text-center mb-4">
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">
              {language === "bn" ? "রক্তদান" : "Donations"}
            </span>
            <span className="text-xs font-black text-brand-navy">
              {donor.totalDonations}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">
              {language === "bn" ? "রেটিং" : "Rating"}
            </span>
            <span className="text-xs font-black text-amber-600 flex items-center justify-center gap-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              {donor.rating}
            </span>
          </div>
          <div>
            <span className="block text-[10px] text-slate-400 font-bold uppercase">
              {language === "bn" ? "অবস্থা" : "Status"}
            </span>
            <span
              className={`text-[11px] font-bold ${
                donor.isAvailable ? "text-emerald-600" : "text-amber-600"
              }`}
            >
              {donor.isAvailable
                ? language === "bn"
                  ? "প্রস্তুত"
                  : "Available"
                : language === "bn"
                ? "বিরতি"
                : "Cooldown"}
            </span>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-2 pt-1 border-t border-slate-100">
        <a
          href={`tel:${donor.phone}`}
          className="flex-1 flex items-center justify-center gap-1.5 bg-brand-red hover:bg-brand-redDark text-white py-2 px-3 rounded-xl text-xs font-bold transition-all shadow-sm active:scale-95"
        >
          <Phone className="w-3.5 h-3.5 fill-white" />
          <span>{language === "bn" ? "সরাসরি কল" : "Call Now"}</span>
        </a>

        <a
          href={`https://wa.me/${donor.phone.replace(/[^0-9]/g, "")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 transition-all"
          title="WhatsApp"
        >
          <MessageCircle className="w-4 h-4 fill-emerald-500 text-emerald-50" />
        </a>

        <Link
          href={`/verify/${donor.donorId}`}
          className="flex items-center justify-center p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 transition-all"
          title="View Digital ID & Verification"
        >
          <Droplet className="w-4 h-4 text-brand-red" />
        </Link>
      </div>
    </div>
  );
}
