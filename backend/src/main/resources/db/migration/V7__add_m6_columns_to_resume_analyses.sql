-- V7: Add M6 columns to resume_analyses table
-- matched_skills: JSONB array of required skills found in the resume
-- requirement_source: Human-readable label indicating which profile was used
--   e.g. "Google – Software Engineer" or "Industry – Data Scientist"

ALTER TABLE resume_analyses
    ADD COLUMN IF NOT EXISTS matched_skills       JSONB,
    ADD COLUMN IF NOT EXISTS requirement_source   VARCHAR(255);
