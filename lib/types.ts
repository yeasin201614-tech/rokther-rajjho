import { BloodGroup } from "./bangladesh-data";

export interface DonorProfile {
  id: string;
  donorId: string; // e.g. RR-BD-2026-000125
  fullName: string;
  bengaliName?: string;
  email: string;
  phone: string;
  bloodGroup: BloodGroup;
  gender: "Male" | "Female" | "Other";
  divisionId: string;
  districtId: string;
  upazilaId: string;
  address: string;
  isAvailable: boolean;
  lastDonationDate: string | null;
  nextEligibleDate: string;
  totalDonations: number;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  avatarUrl: string;
  validUntil: string;
  bio?: string;
  role: "DONOR" | "RECIPIENT" | "VOLUNTEER" | "ORGANIZATION" | "ADMIN";
}

export interface BloodRequest {
  id: string;
  patientName: string;
  bloodGroup: BloodGroup;
  unitsNeeded: number;
  hospitalName: string;
  hospitalAddress: string;
  divisionId: string;
  districtId: string;
  upazilaId: string;
  contactNumber: string;
  alternateNumber?: string;
  urgencyLevel: "IMMEDIATE" | "CRITICAL" | "NORMAL";
  requiredDate: string;
  requiredTime: string;
  reason: string;
  status: "PENDING" | "SEARCHING" | "MATCHED" | "COMPLETED" | "CANCELLED";
  matchedDonorName?: string;
  matchedDonorPhone?: string;
  matchedDonorId?: string;
  createdAt: string;
}

export interface DonationRecord {
  id: string;
  donorId: string;
  patientName: string;
  hospitalName: string;
  donationDate: string;
  bloodGroup: BloodGroup;
  units: number;
  certificateNumber: string;
  isVerified: boolean;
  verifiedBy?: string;
}

export interface Organization {
  id: string;
  name: string;
  bengaliName: string;
  type: string;
  registrationNumber: string;
  divisionId: string;
  districtId: string;
  contactPhone: string;
  contactEmail: string;
  isVerified: boolean;
  memberCount: number;
  totalDonations: number;
  campaignsCount: number;
  logoUrl: string;
  description: string;
}

export interface Campaign {
  id: string;
  orgId: string;
  orgName: string;
  title: string;
  bengaliTitle: string;
  venue: string;
  districtId: string;
  startDate: string;
  endDate: string;
  targetUnits: number;
  registeredCount: number;
  bannerUrl: string;
}

export interface Review {
  id: string;
  donorId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Badge {
  id: string;
  key: string;
  title: string;
  bengaliTitle: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: "EMERGENCY" | "SUCCESS" | "INFO";
  date: string;
  isRead: boolean;
  link?: string;
}
