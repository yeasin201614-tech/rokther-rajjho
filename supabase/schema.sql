-- ====================================================================
-- ROKTHER RAJJHO (রক্তের রাজ্য) - COMPLETE PRODUCTION SUPABASE DATABASE SCHEMA
-- National Blood Donation Network of Bangladesh
-- ====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. CUSTOM ENUMS
DO $$ BEGIN
    CREATE TYPE blood_group_type AS ENUM ('A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE urgency_level_type AS ENUM ('NORMAL', 'CRITICAL', 'IMMEDIATE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE request_status_type AS ENUM ('PENDING', 'SEARCHING', 'MATCHED', 'COMPLETED', 'CANCELLED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE user_role_type AS ENUM ('DONOR', 'RECIPIENT', 'VOLUNTEER', 'ORGANIZATION_ADMIN', 'SYSTEM_ADMIN');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE gender_type AS ENUM ('MALE', 'FEMALE', 'OTHER');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 3. PROFILES TABLE (Extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    donor_id VARCHAR(32) UNIQUE NOT NULL, -- e.g. RR-BD-2026-000125
    full_name VARCHAR(150) NOT NULL,
    bengali_name VARCHAR(150),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    blood_group blood_group_type NOT NULL,
    gender gender_type DEFAULT 'MALE',
    date_of_birth DATE,
    division_id VARCHAR(50) NOT NULL,
    district_id VARCHAR(50) NOT NULL,
    upazila_id VARCHAR(50) NOT NULL,
    present_address TEXT,
    role user_role_type DEFAULT 'DONOR',
    avatar_url TEXT,
    
    -- Eligibility & Tracking (90-Day Policy)
    is_available BOOLEAN DEFAULT TRUE,
    last_donation_date DATE,
    next_eligible_date DATE,
    total_donations INTEGER DEFAULT 0,
    rating NUMERIC(3, 2) DEFAULT 5.00,
    review_count INTEGER DEFAULT 0,
    
    -- Verification
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMPTZ,
    nid_number VARCHAR(30),
    is_phone_hidden BOOLEAN DEFAULT FALSE,
    
    bio TEXT,
    emergency_contact VARCHAR(20),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexing for fast search across 64 districts
CREATE INDEX IF NOT EXISTS idx_profiles_blood_district ON public.profiles(blood_group, district_id, is_available);
CREATE INDEX IF NOT EXISTS idx_profiles_district_upazila ON public.profiles(district_id, upazila_id);
CREATE INDEX IF NOT EXISTS idx_profiles_donor_id ON public.profiles(donor_id);

-- 4. ORGANIZATIONS TABLE
CREATE TABLE IF NOT EXISTS public.organizations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    bengali_name VARCHAR(200),
    registration_number VARCHAR(100),
    org_type VARCHAR(50) DEFAULT 'Voluntary Blood Club', -- e.g., NGO, Red Crescent, Club
    division_id VARCHAR(50) NOT NULL,
    district_id VARCHAR(50) NOT NULL,
    upazila_id VARCHAR(50),
    contact_phone VARCHAR(20) NOT NULL,
    contact_email VARCHAR(255),
    website VARCHAR(255),
    address TEXT,
    logo_url TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    member_count INTEGER DEFAULT 1,
    total_donations_facilitated INTEGER DEFAULT 0,
    campaigns_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BLOOD REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.blood_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    requester_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    patient_name VARCHAR(150) NOT NULL,
    blood_group blood_group_type NOT NULL,
    units_needed INTEGER DEFAULT 1,
    hospital_name VARCHAR(255) NOT NULL,
    hospital_address TEXT,
    division_id VARCHAR(50) NOT NULL,
    district_id VARCHAR(50) NOT NULL,
    upazila_id VARCHAR(50) NOT NULL,
    contact_phone VARCHAR(20) NOT NULL,
    alternate_phone VARCHAR(20),
    urgency_level urgency_level_type DEFAULT 'NORMAL',
    required_datetime TIMESTAMPTZ NOT NULL,
    reason TEXT, -- e.g. Thalassemia, Surgery, Accident, Maternity
    medical_documents_url TEXT,
    status request_status_type DEFAULT 'PENDING',
    matched_donor_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    matched_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_requests_status_district ON public.blood_requests(status, district_id, blood_group);

-- 6. DONATION HISTORY & VERIFIED LOGS
CREATE TABLE IF NOT EXISTS public.donations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    request_id UUID REFERENCES public.blood_requests(id) ON DELETE SET NULL,
    patient_name VARCHAR(150),
    hospital_name VARCHAR(255) NOT NULL,
    donation_date DATE NOT NULL,
    blood_group blood_group_type NOT NULL,
    units INTEGER DEFAULT 1,
    certificate_code VARCHAR(50) UNIQUE, -- e.g., RR-CERT-2026-90412
    verified_by_org_id UUID REFERENCES public.organizations(id) ON DELETE SET NULL,
    proof_document_url TEXT,
    is_verified BOOLEAN DEFAULT TRUE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_donations_donor_date ON public.donations(donor_id, donation_date DESC);

-- 7. REVIEWS & RATINGS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    donor_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
    reviewer_name VARCHAR(150) NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. GAMIFICATION BADGES
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_key VARCHAR(50) NOT NULL, -- 'FIRST_DROP', 'LIFE_SAVER', 'CENTURY_HERO', 'VERIFIED_WARRIOR'
    badge_title VARCHAR(100) NOT NULL,
    badge_bengali_title VARCHAR(100) NOT NULL,
    icon_name VARCHAR(50) NOT NULL,
    awarded_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. NOTIFICATIONS TABLE (Real-time SOS & Status)
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    title VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    type VARCHAR(50) DEFAULT 'INFO', -- 'EMERGENCY_SOS', 'STATUS_CHANGE', 'BADGE_AWARD'
    link TEXT,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. CAMPAIGNS & DRIVES
CREATE TABLE IF NOT EXISTS public.campaigns (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    org_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    bengali_title VARCHAR(255),
    description TEXT,
    venue_name VARCHAR(255) NOT NULL,
    district_id VARCHAR(50) NOT NULL,
    upazila_id VARCHAR(50) NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    target_donors INTEGER DEFAULT 50,
    registered_donors INTEGER DEFAULT 0,
    banner_url TEXT,
    status VARCHAR(30) DEFAULT 'UPCOMING', -- UPCOMING, ONGOING, COMPLETED
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ====================================================================
-- AUTOMATION TRIGGERS & PROCEDURES (90-DAY ELIGIBILITY & COUNTERS)
-- ====================================================================

-- Function: Auto Calculate Eligibility on Donation Entry
CREATE OR REPLACE FUNCTION public.fn_handle_new_donation()
RETURNS TRIGGER AS $$
BEGIN
    -- Update Donor's Last Donation Date and 90-Day Next Eligible Date
    UPDATE public.profiles
    SET 
        last_donation_date = NEW.donation_date,
        next_eligible_date = NEW.donation_date + INTERVAL '90 days',
        is_available = CASE 
            WHEN CURRENT_DATE >= (NEW.donation_date + INTERVAL '90 days') THEN TRUE 
            ELSE FALSE 
        END,
        total_donations = total_donations + NEW.units,
        updated_at = NOW()
    WHERE id = NEW.donor_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_on_new_donation ON public.donations;
CREATE TRIGGER tr_on_new_donation
AFTER INSERT ON public.donations
FOR EACH ROW EXECUTE FUNCTION public.fn_handle_new_donation();

-- Function: Recalculate Rating on New Review
CREATE OR REPLACE FUNCTION public.fn_update_donor_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE public.profiles
    SET 
        rating = (SELECT ROUND(AVG(rating)::numeric, 2) FROM public.reviews WHERE donor_id = NEW.donor_id),
        review_count = (SELECT COUNT(*) FROM public.reviews WHERE donor_id = NEW.donor_id),
        updated_at = NOW()
    WHERE id = NEW.donor_id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS tr_on_new_review ON public.reviews;
CREATE TRIGGER tr_on_new_review
AFTER INSERT ON public.reviews
FOR EACH ROW EXECUTE FUNCTION public.fn_update_donor_rating();

-- ====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blood_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: Anyone can view donors (public directory)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" 
ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Blood Requests: Anyone can view active requests
CREATE POLICY "Blood requests viewable by all" 
ON public.blood_requests FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create blood requests" 
ON public.blood_requests FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Requesters can update their requests" 
ON public.blood_requests FOR UPDATE USING (auth.uid() = requester_id);

-- Donations: Public can view verified counts, donor can view details
CREATE POLICY "Donations viewable by everyone" 
ON public.donations FOR SELECT USING (true);

CREATE POLICY "Donors can log donations" 
ON public.donations FOR INSERT WITH CHECK (auth.uid() = donor_id);

-- Enable Realtime for Blood Requests & Notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.blood_requests;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- ====================================================================
-- STORAGE BUCKETS
-- ====================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('medical-docs', 'medical-docs', false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('certificates', 'certificates', true)
ON CONFLICT (id) DO NOTHING;
