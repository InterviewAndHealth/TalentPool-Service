CREATE TABLE IF NOT EXISTS talentpoolresumes (
    resume_id varchar(12) PRIMARY KEY,
    recruiter_id varchar(12) NOT NULL,
    candidate_name TEXT,
    candidate_email TEXT,
    contact_number TEXT,
    city TEXT,
    country TEXT,
    years_of_experience INT,
    expertise TEXT,
    current_company TEXT,
    location_preference TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
