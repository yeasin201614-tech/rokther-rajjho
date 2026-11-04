"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "bn" | "en";

interface Translations {
  appName: string;
  tagline: string;
  subTagline: string;
  nav: {
    home: string;
    findDonor: string;
    bloodRequest: string;
    becomeDonor: string;
    organizations: string;
    events: string;
    leaderboard: string;
    blog: string;
    about: string;
    contact: string;
    login: string;
    dashboard: string;
    logout: string;
    admin: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    findDonorBtn: string;
    becomeDonorBtn: string;
    requestBloodBtn: string;
    searchTitle: string;
    selectBloodGroup: string;
    selectDivision: string;
    selectDistrict: string;
    selectUpazila: string;
    searchBtn: string;
  };
  stats: {
    registeredDonors: string;
    successfulDonations: string;
    districtsCovered: string;
    emergencySupport: string;
  };
  emergency: {
    bannerTitle: string;
    bannerSub: string;
    actionBtn: string;
    criticalAlert: string;
    urgentHelp: string;
  };
  howItWorks: {
    title: string;
    step1Title: string;
    step1Desc: string;
    step2Title: string;
    step2Desc: string;
    step3Title: string;
    step3Desc: string;
  };
  volunteer: {
    title: string;
    desc: string;
    joinBtn: string;
  };
  dashboard: {
    title: string;
    overview: string;
    profile: string;
    idCard: string;
    badges: string;
    donationHistory: string;
    reviews: string;
    notifications: string;
    certificates: string;
    settings: string;
    totalDonations: string;
    rating: string;
    verified: string;
    currentStatus: string;
    available: string;
    onCooldown: string;
    nextEligibility: string;
    logDonation: string;
  };
  idCard: {
    verifiedBadge: string;
    donorId: string;
    bloodGroup: string;
    location: string;
    validUntil: string;
    downloadPng: string;
    printPdf: string;
    scanToVerify: string;
    officialTag: string;
  };
  common: {
    all: string;
    loading: string;
    save: string;
    cancel: string;
    viewAll: string;
    contact: string;
    callNow: string;
    whatsapp: string;
    verifiedOrganization: string;
    emergencyTollFree: string;
  };
}

const translations: Record<Language, Translations> = {
  bn: {
    appName: "রক্তের রাজ্য",
    tagline: "রক্তের বন্ধনে, জীবনের প্রয়োজনে।",
    subTagline: "এক ফোঁটা রক্ত, একটি নতুন জীবনের আশা",
    nav: {
      home: "হোম",
      findDonor: "রক্তদাতা খুঁজুন",
      bloodRequest: "রক্তের আবেদন",
      becomeDonor: "রক্তদাতা হন",
      organizations: "সংগঠনসমূহ",
      events: "ক্যাম্পেইন",
      leaderboard: "সেরা রক্তদাতা",
      blog: "নির্দেশিকা",
      about: "আমাদের সম্পর্কে",
      contact: "যোগাযোগ",
      login: "লগইন",
      dashboard: "ড্যাশবোর্ড",
      logout: "লগআউট",
      admin: "অ্যাডমিন প্যানেল",
    },
    hero: {
      headline: "এক ফোঁটা রক্ত,\nএকটি নতুন জীবনের আশা",
      subheadline: "রক্তের বন্ধনে, জীবনের প্রয়োজনে।",
      findDonorBtn: "রক্তদাতা খুঁজুন",
      becomeDonorBtn: "রক্তদাতা হন",
      requestBloodBtn: "জরুরি রক্তের আবেদন",
      searchTitle: "নিকটবর্তী রক্তদাতা খুঁজুন",
      selectBloodGroup: "রক্তের গ্রুপ",
      selectDivision: "সকল বিভাগ",
      selectDistrict: "সকল জেলা",
      selectUpazila: "সকল উপজেলা",
      searchBtn: "অনুসন্ধান",
    },
    stats: {
      registeredDonors: "নিবন্ধিত রক্তদাতা",
      successfulDonations: "সফল রক্তদান",
      districtsCovered: "জেলা কাভার্ড",
      emergencySupport: "২৪/৭ জরুরি সহায়তা",
    },
    emergency: {
      bannerTitle: "জরুরি প্রয়োজনে রক্ত খুঁজছেন?",
      bannerSub: "মুহূর্তেই রক্তের আবেদন তৈরি করুন এবং নিকটস্থ রক্তদাতাদের সাথে যুক্ত হন।",
      actionBtn: "রক্তের আবেদন করুন",
      criticalAlert: "জরুরি নোটিশ",
      urgentHelp: "জরুরি হটলাইন: ৯৯৯ / ০১৯৯৯-৮৮৮৭৭৭",
    },
    howItWorks: {
      title: "রক্তদান কীভাবে কাজ করে?",
      step1Title: "১. নিবন্ধন করুন",
      step1Desc: "খুব সহজে বিনামূল্যে রক্তদাতা সদস্য হিসেবে নিবন্ধন সম্পন্ন করুন।",
      step2Title: "২. রক্তদাতা খুঁজুন",
      step2Desc: "প্রয়োজনীয় রক্তের গ্রুপ ও অবস্থান সিলেক্ট করে তৎক্ষণাৎ ডোনার খুঁজুন।",
      step3Title: "৩. রক্ত দিন ও জীবন বাঁচান",
      step3Desc: "হাসপাতালে পৌঁছে স্বেচ্ছায় রক্ত দিয়ে একটি মূল্যবান প্রাণ বাঁচিয়ে দিন।",
    },
    volunteer: {
      title: "স্বেচ্ছাসেবক হতে চান?",
      desc: "আমাদের জাতীয় রক্তদান নেটওয়ার্কের স্বেচ্ছাসেবী দলের সাথে যুক্ত হয়ে মানবসেবায় এগিয়ে আসুন।",
      joinBtn: "যুক্ত হোন",
    },
    dashboard: {
      title: "ডোনার ড্যাশবোর্ড",
      overview: "সারসংক্ষেপ",
      profile: "প্রোফাইল",
      idCard: "ডিজিটাল আইডি কার্ড",
      badges: "অর্জিত ব্যাজ",
      donationHistory: "রক্তদানের ইতিহাস",
      reviews: "প্রাপ্ত রিভিউ",
      notifications: "নোটিফিকেশন",
      certificates: "প্রশংসাপত্র",
      settings: "সেটিংস",
      totalDonations: "মোট রক্তদান",
      rating: "রেটিং",
      verified: "ভেরিফাইড ব্যাজ",
      currentStatus: "বর্তমান অবস্থা",
      available: "রক্তদানে প্রস্তুত",
      onCooldown: "৩ মাসের বিরতিতে আছেন",
      nextEligibility: "পরবর্তী রক্তদানের তারিখ",
      logDonation: "নতুন রক্তদান এন্ট্রি করুন",
    },
    idCard: {
      verifiedBadge: "ভেরিফাইড রক্তদাতা",
      donorId: "ডোনার আইডি",
      bloodGroup: "রক্তের গ্রুপ",
      location: "অবস্থান",
      validUntil: "মেয়াদ",
      downloadPng: "কার্ড ডাউনলোড করুন (PNG)",
      printPdf: "প্রিন্ট / PDF সংরক্ষণ",
      scanToVerify: "স্ক্যান করে সত্যতা যাচাই করুন",
      officialTag: "গণপ্রজাতন্ত্রী বাংলাদেশ রক্ত সুরক্ষা নেটওয়ার্ক",
    },
    common: {
      all: "সকল",
      loading: "লোড হচ্ছে...",
      save: "সংরক্ষণ করুন",
      cancel: "বাতিল",
      viewAll: "সবগুলো দেখুন",
      contact: "যোগাযোগ",
      callNow: "সরাসরি কল",
      whatsapp: "হোয়াটসঅ্যাপ",
      verifiedOrganization: "স্বীকৃত সেবামূলক সংগঠন",
      emergencyTollFree: "টোল ফ্রি কল: ১৬২৬৩",
    },
  },
  en: {
    appName: "Rokther Rajjho",
    tagline: "In the bond of blood, in the need of life.",
    subTagline: "A single drop of blood, a new hope for life.",
    nav: {
      home: "Home",
      findDonor: "Find Donor",
      bloodRequest: "Blood Request",
      becomeDonor: "Become a Donor",
      organizations: "Organizations",
      events: "Campaigns",
      leaderboard: "Leaderboard",
      blog: "Guide",
      about: "About Us",
      contact: "Contact",
      login: "Login",
      dashboard: "Dashboard",
      logout: "Logout",
      admin: "Admin Panel",
    },
    hero: {
      headline: "A Single Drop of Blood,\nA New Hope For Life",
      subheadline: "In the bond of blood, in the need of life.",
      findDonorBtn: "Find Blood Donor",
      becomeDonorBtn: "Become a Donor",
      requestBloodBtn: "Request Blood",
      searchTitle: "Find Blood Donor",
      selectBloodGroup: "Blood Group",
      selectDivision: "All Divisions",
      selectDistrict: "All Districts",
      selectUpazila: "All Upazilas",
      searchBtn: "Search",
    },
    stats: {
      registeredDonors: "Registered Donors",
      successfulDonations: "Successful Donations",
      districtsCovered: "Districts Covered",
      emergencySupport: "24/7 Emergency Support",
    },
    emergency: {
      bannerTitle: "Need Blood Urgently?",
      bannerSub: "Create an emergency blood request in seconds and notify verified donors nearby.",
      actionBtn: "Request Blood Now",
      criticalAlert: "Emergency SOS",
      urgentHelp: "Emergency Hotline: 999 / 01999-888777",
    },
    howItWorks: {
      title: "How It Works?",
      step1Title: "1. Register",
      step1Desc: "Sign up easily as a verified life-saving blood donor in under 2 minutes.",
      step2Title: "2. Find Donor",
      step2Desc: "Filter by required blood group and exact upazila to connect with active donors.",
      step3Title: "3. Donate & Save Life",
      step3Desc: "Arrive at the medical facility, donate safely, and bring a soul back to health.",
    },
    volunteer: {
      title: "Be a Volunteer",
      desc: "Join our dedicated youth volunteer squad across 64 districts to coordinate urgent blood drives.",
      joinBtn: "Join Now",
    },
    dashboard: {
      title: "Donor Dashboard",
      overview: "Overview",
      profile: "Profile",
      idCard: "My ID Card",
      badges: "Badges",
      donationHistory: "Donation History",
      reviews: "My Reviews",
      notifications: "Notifications",
      certificates: "Certificates",
      settings: "Settings",
      totalDonations: "Total Donations",
      rating: "Rating",
      verified: "Verified",
      currentStatus: "Current Status",
      available: "Available",
      onCooldown: "Cooldown (90 Days)",
      nextEligibility: "Next Eligibility",
      logDonation: "Log a Donation",
    },
    idCard: {
      verifiedBadge: "Verified Donor",
      donorId: "Donor ID",
      bloodGroup: "Blood Group",
      location: "Location",
      validUntil: "Valid Until",
      downloadPng: "Download PNG",
      printPdf: "Print / PDF Card",
      scanToVerify: "Scan to Verify Authenticity",
      officialTag: "National Blood Donation Network of Bangladesh",
    },
    common: {
      all: "All",
      loading: "Loading...",
      save: "Save Changes",
      cancel: "Cancel",
      viewAll: "View All",
      contact: "Contact",
      callNow: "Call Donor",
      whatsapp: "WhatsApp",
      verifiedOrganization: "Verified Humanitarian Organization",
      emergencyTollFree: "National Health Helpline: 16263",
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType>({
  language: "bn",
  setLanguage: () => {},
  t: translations.bn,
});

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguageState] = useState<Language>("bn");

  useEffect(() => {
    const saved = localStorage.getItem("rr_lang") as Language;
    if (saved && (saved === "bn" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("rr_lang", lang);
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: translations[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
