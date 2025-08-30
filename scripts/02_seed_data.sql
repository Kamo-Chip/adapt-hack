-- Seed data for Healthcare Referral System
-- Version 1.0

-- Insert medical departments
INSERT INTO departments (name, description) VALUES
('Emergency Medicine', 'Emergency and trauma care'),
('Cardiology', 'Heart and cardiovascular conditions'),
('Neurology', 'Brain and nervous system disorders'),
('Orthopedics', 'Bone, joint, and muscle conditions'),
('Pediatrics', 'Children''s healthcare'),
('Obstetrics & Gynecology', 'Women''s health and childbirth'),
('Internal Medicine', 'General adult medicine'),
('Surgery', 'Surgical procedures and operations'),
('Radiology', 'Medical imaging and diagnostics'),
('Oncology', 'Cancer treatment and care'),
('Psychiatry', 'Mental health and behavioral disorders'),
('Dermatology', 'Skin conditions and diseases'),
('Ophthalmology', 'Eye care and vision'),
('ENT', 'Ear, nose, and throat conditions'),
('Urology', 'Urinary system and male reproductive health');

-- Insert sample hospitals
INSERT INTO hospitals (name, type, address, city, state, phone, email, total_capacity, current_capacity, latitude, longitude) VALUES
('Kenyatta National Hospital', 'hospital', 'Hospital Rd, Upper Hill', 'Nairobi', 'Nairobi County', '+254-20-2726300', 'info@knh.or.ke', 2000, 1200, -1.3018, 36.8073),
('Aga Khan University Hospital', 'hospital', '3rd Parklands Ave', 'Nairobi', 'Nairobi County', '+254-20-3662000', 'info@aku.edu', 254, 180, -1.2634, 36.8155),
('Nairobi Hospital', 'hospital', 'Argwings Kodhek Rd', 'Nairobi', 'Nairobi County', '+254-20-2845000', 'info@nairobihospital.org', 350, 220, -1.2921, 36.7902),
('Mater Misericordiae Hospital', 'hospital', 'Dunga Rd, South B', 'Nairobi', 'Nairobi County', '+254-20-5514000', 'info@materkenya.com', 300, 190, -1.3176, 36.8317),
('Karen Hospital', 'hospital', 'Karen Rd', 'Nairobi', 'Nairobi County', '+254-20-6610000', 'info@karenhospital.org', 120, 85, -1.3197, 36.7025),
('Gertrudes Children''s Hospital', 'hospital', 'Muthaiga Rd', 'Nairobi', 'Nairobi County', '+254-20-2095000', 'info@gerties.org', 150, 95, -1.2505, 36.8134),
('Avenue Healthcare', 'clinic', 'Kiambu Rd', 'Nairobi', 'Nairobi County', '+254-20-4442000', 'info@avenuehealthcare.co.ke', 50, 30, -1.2297, 36.8073),
('Parklands Medical Centre', 'clinic', '3rd Parklands Ave', 'Nairobi', 'Nairobi County', '+254-20-3741000', 'info@parklandsmedical.com', 40, 25, -1.2634, 36.8155);

-- Create sample hospital-department relationships
INSERT INTO hospital_departments (hospital_id, department_id, capacity, current_load)
SELECT h.id, d.id, 
    CASE 
        WHEN h.type = 'hospital' THEN FLOOR(RANDOM() * 50 + 20)
        ELSE FLOOR(RANDOM() * 10 + 5)
    END,
    CASE 
        WHEN h.type = 'hospital' THEN FLOOR(RANDOM() * 30 + 10)
        ELSE FLOOR(RANDOM() * 5 + 2)
    END
FROM hospitals h
CROSS JOIN departments d
WHERE (h.type = 'hospital') OR (h.type = 'clinic' AND d.name IN ('Internal Medicine', 'Pediatrics', 'Emergency Medicine'));
