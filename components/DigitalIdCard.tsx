"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";
import { DonorProfile } from "@/lib/types";
import { useLanguage } from "@/lib/i18n";
import {
  ShieldCheck,
  Download,
  Printer,
  Share2,
  CheckCircle2,
  Copy,
  ExternalLink,
  QrCode,
  Award,
} from "lucide-react";

interface DigitalIdCardProps {
  donor: DonorProfile;
  showActions?: boolean;
}

export default function DigitalIdCard({
  donor,
  showActions = true,
}: DigitalIdCardProps) {
  const { language } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);
  const [copied, setCopied] = useState(false);

  // Verification URL encoded in the QR code
  const verificationUrl = typeof window !== "undefined"
    ? `${window.location.origin}/verify/${donor.donorId}`
    : `https://roktherrajjho.org/verify/${donor.donorId}`;

  const handleDownloadPng = async () => {
    if (!cardRef.current) return;
    setDownloading(true);
    try {
      // Trigger festive celebration
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });

      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        quality: 1,
        pixelRatio: 3,
      });

      const link = document.createElement("a");
      link.download = `Rokther-Rajjho-ID-${donor.donorId}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Failed to export card:", err);
    } finally {
      setDownloading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(verificationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="flex flex-col items-center">
      {/* Printable / Downloadable Digital ID Card Box */}
      <div
        ref={cardRef}
        id="digital-id-card-capture"
        className="w-full max-w-[440px] bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-200/90 relative text-slate-800 transition-all select-none"
        style={{
          boxShadow: "0 20px 40px -15px rgba(20, 33, 61, 0.15), 0 0 0 1px rgba(226, 232, 240, 0.8)",
        }}
      >
        {/* Subtle holographic watermark pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-red-50/40 via-transparent to-blue-50/30 pointer-events-none" />

        {/* Top Header */}
        <div className="px-5 pt-4 pb-3 flex items-center justify-between border-b border-slate-100 bg-white">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 relative flex-shrink-0">
              <Image
                src="/logo.png"
                alt="Logo"
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <div>
              <div className="text-base font-black text-brand-navy leading-tight tracking-tight">
                Rokther <span className="text-brand-red">Rajjho</span>
              </div>
              <div className="text-[11px] font-bold text-slate-600">
                রক্তের রাজ্য
              </div>
            </div>
          </div>

          {/* Verified Badge */}
          {donor.isVerified && (
            <div className="flex items-center gap-1.5 bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 fill-white text-emerald-500" />
              <span>Verified</span>
            </div>
          )}
        </div>

        {/* Card Body */}
        <div className="p-5 flex items-center gap-4">
          {/* Donor Photo & Quick Badge */}
          <div className="flex flex-col items-center shrink-0">
            <div className="w-24 h-28 rounded-xl overflow-hidden border-2 border-brand-red/30 shadow-md relative bg-slate-100">
              <Image
                src={donor.avatarUrl}
                alt={donor.fullName}
                fill
                className="object-cover"
                sizes="100px"
              />
            </div>
            <span className="mt-1 text-[10px] font-bold text-slate-500 tracking-wider uppercase">
              DONOR
            </span>
          </div>

          {/* Donor Details */}
          <div className="flex-1 min-w-0 space-y-1.5 text-xs">
            <div>
              <h3 className="text-base font-extrabold text-brand-navy truncate">
                {donor.fullName}
              </h3>
              {donor.bengaliName && (
                <p className="text-xs font-semibold text-slate-500 truncate -mt-0.5">
                  {donor.bengaliName}
                </p>
              )}
            </div>

            <div className="text-slate-600 font-medium">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">
                Donor ID
              </span>
              <span className="font-mono font-bold text-slate-800 text-xs">
                {donor.donorId}
              </span>
            </div>

            <div className="flex items-center gap-2 pt-0.5">
              <div className="bg-red-50 border border-red-200 px-2 py-0.5 rounded-md inline-flex items-center gap-1">
                <span className="text-[10px] text-slate-500 font-bold uppercase">
                  Blood Group:
                </span>
                <span className="font-black text-brand-red text-sm">
                  {donor.bloodGroup}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-1 text-[11px] pt-1 text-slate-600">
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">
                  Location:
                </span>
                <span className="font-semibold text-slate-800 capitalize truncate block">
                  {donor.districtId}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 block font-bold uppercase">
                  Valid Until:
                </span>
                <span className="font-semibold text-slate-800">
                  {donor.validUntil}
                </span>
              </div>
            </div>
          </div>

          {/* QR Code */}
          <div className="flex flex-col items-center shrink-0 pl-1 border-l border-slate-100">
            <div className="p-1.5 bg-white border border-slate-200 rounded-lg shadow-sm">
              <QRCodeSVG
                value={verificationUrl}
                size={84}
                level="M"
                includeMargin={false}
                fgColor="#14213D"
              />
            </div>
            <span className="text-[9px] font-bold text-slate-400 mt-1 uppercase tracking-tight">
              Scan to Verify
            </span>
          </div>
        </div>

        {/* Red Bottom Tagline Bar */}
        <div className="bg-brand-red text-white py-2 px-4 text-center font-bold text-xs tracking-wide">
          রক্তের বন্ধনে, জীবনের প্রয়োজনে।
        </div>
      </div>

      {/* Action Buttons Below Card */}
      {showActions && (
        <div className="w-full max-w-[440px] mt-4 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={handleDownloadPng}
            disabled={downloading}
            className="flex-1 min-w-[130px] flex items-center justify-center gap-1.5 bg-brand-red hover:bg-brand-redDark text-white py-2 px-3 rounded-xl text-xs font-bold shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{downloading ? "Saving..." : language === "bn" ? "কার্ড ডাউনলোড (PNG)" : "Download PNG"}</span>
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-bold border border-slate-200 transition-all active:scale-95"
            title="Print ID Card"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>{language === "bn" ? "প্রিন্ট" : "Print"}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 py-2 px-3 rounded-xl text-xs font-bold border border-slate-200 transition-all active:scale-95"
            title="Copy QR Verification Link"
          >
            {copied ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            ) : (
              <Copy className="w-4 h-4 text-slate-600" />
            )}
            <span>{copied ? (language === "bn" ? "কপি হয়েছে!" : "Copied!") : (language === "bn" ? "ভেরিফাই লিংক" : "Verify URL")}</span>
          </button>

          <Link
            href={`/verify/${donor.donorId}`}
            className="flex items-center justify-center gap-1 bg-brand-navy hover:bg-brand-navyDark text-white py-2 px-3 rounded-xl text-xs font-bold transition-all"
            target="_blank"
          >
            <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === "bn" ? "লাইভ ভেরিফিকেশন পেজ" : "Live Verify"}</span>
          </Link>
        </div>
      )}
    </div>
  );
}
