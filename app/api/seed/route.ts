import { NextResponse } from "next/server";
import { db, isFirebaseConfigured } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import {
  INITIAL_DONORS,
  INITIAL_REQUESTS,
  INITIAL_ORGANIZATIONS,
  INITIAL_CAMPAIGNS,
  INITIAL_REVIEWS,
} from "@/lib/store";

export async function GET() {
  if (!db || !isFirebaseConfigured) {
    return NextResponse.json({
      success: false,
      message: "Firebase is not fully initialized. Check .env.local keys.",
    });
  }

  try {
    // 1. Seed Donors
    for (const donor of INITIAL_DONORS) {
      await setDoc(doc(db, "profiles", donor.id), donor, { merge: true });
    }

    // 2. Seed Blood Requests
    for (const req of INITIAL_REQUESTS) {
      await setDoc(doc(db, "blood_requests", req.id), req, { merge: true });
    }

    // 3. Seed Organizations
    for (const org of INITIAL_ORGANIZATIONS) {
      await setDoc(doc(db, "organizations", org.id), org, { merge: true });
    }

    // 4. Seed Campaigns
    for (const camp of INITIAL_CAMPAIGNS) {
      await setDoc(doc(db, "campaigns", camp.id), camp, { merge: true });
    }

    return NextResponse.json({
      success: true,
      message: "Successfully seeded initial donors, blood requests, and organizations into live Cloud Firestore!",
      counts: {
        donors: INITIAL_DONORS.length,
        requests: INITIAL_REQUESTS.length,
        organizations: INITIAL_ORGANIZATIONS.length,
        campaigns: INITIAL_CAMPAIGNS.length,
      },
    });
  } catch (error: any) {
    console.error("Firebase seeding error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
