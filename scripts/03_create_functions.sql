-- Utility functions for Healthcare Referral System
-- Version 1.0

-- Function to generate referral numbers
CREATE OR REPLACE FUNCTION generate_referral_number()
RETURNS TEXT AS $$
DECLARE
    ref_number TEXT;
    year_part TEXT;
    sequence_part TEXT;
BEGIN
    year_part := EXTRACT(YEAR FROM NOW())::TEXT;
    
    SELECT LPAD((COUNT(*) + 1)::TEXT, 6, '0') INTO sequence_part
    FROM referrals 
    WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
    
    ref_number := 'REF-' || year_part || '-' || sequence_part;
    
    RETURN ref_number;
END;
$$ LANGUAGE plpgsql;

-- Function to update hospital capacity
CREATE OR REPLACE FUNCTION update_hospital_capacity()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
        -- Update current capacity when referral status changes
        IF NEW.status = 'accepted' AND (OLD.status IS NULL OR OLD.status != 'accepted') THEN
            UPDATE hospitals 
            SET current_capacity = current_capacity + 1
            WHERE id = NEW.receiving_hospital_id;
        ELSIF NEW.status = 'completed' AND OLD.status = 'accepted' THEN
            UPDATE hospitals 
            SET current_capacity = current_capacity - 1
            WHERE id = NEW.receiving_hospital_id;
        END IF;
        
        RETURN NEW;
    END IF;
    
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for capacity updates
CREATE TRIGGER trigger_update_hospital_capacity
    AFTER INSERT OR UPDATE ON referrals
    FOR EACH ROW
    EXECUTE FUNCTION update_hospital_capacity();

-- Function to calculate distance between hospitals (Haversine formula)
CREATE OR REPLACE FUNCTION calculate_distance(
    lat1 DECIMAL, lon1 DECIMAL, 
    lat2 DECIMAL, lon2 DECIMAL
) RETURNS DECIMAL AS $$
DECLARE
    r DECIMAL := 6371; -- Earth's radius in kilometers
    dlat DECIMAL;
    dlon DECIMAL;
    a DECIMAL;
    c DECIMAL;
    distance DECIMAL;
BEGIN
    dlat := RADIANS(lat2 - lat1);
    dlon := RADIANS(lon2 - lon1);
    
    a := SIN(dlat/2) * SIN(dlat/2) + COS(RADIANS(lat1)) * COS(RADIANS(lat2)) * SIN(dlon/2) * SIN(dlon/2);
    c := 2 * ATAN2(SQRT(a), SQRT(1-a));
    distance := r * c;
    
    RETURN distance;
END;
$$ LANGUAGE plpgsql;
