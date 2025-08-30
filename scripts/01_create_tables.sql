-- Healthcare Referral System Database Schema
-- Version 1.0

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Departments table (medical specialties)
CREATE TABLE departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hospitals table
CREATE TABLE hospitals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('hospital', 'clinic')),
    address TEXT NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20),
    country VARCHAR(100) DEFAULT 'Kenya',
    phone VARCHAR(20),
    email VARCHAR(100),
    website VARCHAR(200),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    total_capacity INTEGER DEFAULT 0,
    current_capacity INTEGER DEFAULT 0,
    emergency_contact VARCHAR(20),
    license_number VARCHAR(100),
    accreditation VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for hospital departments
CREATE TABLE hospital_departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
    capacity INTEGER DEFAULT 0,
    current_load INTEGER DEFAULT 0,
    head_of_department VARCHAR(200),
    contact_phone VARCHAR(20),
    contact_email VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(hospital_id, department_id)
);

-- Users table (hospital staff)
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL CHECK (role IN ('admin', 'doctor', 'nurse', 'coordinator')),
    hospital_id UUID NOT NULL REFERENCES hospitals(id) ON DELETE CASCADE,
    department_id UUID REFERENCES departments(id),
    phone VARCHAR(20),
    license_number VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    last_login TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Patients table
CREATE TABLE patients (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    patient_id VARCHAR(50) NOT NULL UNIQUE, -- Hospital-specific patient ID
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    date_of_birth DATE,
    gender VARCHAR(20) CHECK (gender IN ('male', 'female', 'other')),
    phone VARCHAR(20) NOT NULL,
    whatsapp_phone VARCHAR(20),
    email VARCHAR(100),
    address TEXT,
    emergency_contact_name VARCHAR(200),
    emergency_contact_phone VARCHAR(20),
    blood_type VARCHAR(5),
    allergies TEXT,
    medical_history TEXT,
    insurance_provider VARCHAR(100),
    insurance_number VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Referrals table
CREATE TABLE referrals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_number VARCHAR(50) NOT NULL UNIQUE,
    patient_id UUID NOT NULL REFERENCES patients(id) ON DELETE CASCADE,
    referring_hospital_id UUID NOT NULL REFERENCES hospitals(id),
    referring_user_id UUID NOT NULL REFERENCES users(id),
    receiving_hospital_id UUID REFERENCES hospitals(id),
    department_id UUID NOT NULL REFERENCES departments(id),
    medical_condition TEXT NOT NULL,
    urgency VARCHAR(20) NOT NULL CHECK (urgency IN ('high', 'medium', 'low')),
    preferred_date DATE,
    status VARCHAR(30) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected', 'completed', 'cancelled')),
    referral_type VARCHAR(20) NOT NULL CHECK (referral_type IN ('specific', 'general')),
    reason_for_referral TEXT NOT NULL,
    clinical_summary TEXT,
    current_treatment TEXT,
    patient_consent BOOLEAN NOT NULL DEFAULT false,
    whatsapp_consent BOOLEAN NOT NULL DEFAULT false,
    notes TEXT,
    accepted_by UUID REFERENCES users(id),
    accepted_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    rejection_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Documents table for file uploads
CREATE TABLE documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    filename VARCHAR(255) NOT NULL,
    original_filename VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    file_size INTEGER,
    mime_type VARCHAR(100),
    document_type VARCHAR(50) CHECK (document_type IN ('medical_report', 'xray', 'lab_result', 'image', 'other')),
    uploaded_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Junction table for referral documents
CREATE TABLE referral_documents (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    referral_id UUID NOT NULL REFERENCES referrals(id) ON DELETE CASCADE,
    document_id UUID NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(referral_id, document_id)
);

-- Create indexes for better performance
CREATE INDEX idx_hospitals_location ON hospitals(latitude, longitude);
CREATE INDEX idx_hospitals_type ON hospitals(type);
CREATE INDEX idx_hospitals_capacity ON hospitals(current_capacity);
CREATE INDEX idx_referrals_status ON referrals(status);
CREATE INDEX idx_referrals_urgency ON referrals(urgency);
CREATE INDEX idx_referrals_date ON referrals(created_at);
CREATE INDEX idx_referrals_receiving_hospital ON referrals(receiving_hospital_id);
CREATE INDEX idx_referrals_department ON referrals(department_id);
CREATE INDEX idx_users_hospital ON users(hospital_id);
CREATE INDEX idx_patients_phone ON patients(phone);
