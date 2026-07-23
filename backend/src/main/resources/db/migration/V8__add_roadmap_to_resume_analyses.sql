-- V8: Add roadmap column to resume_analyses
-- Stores the generated week-wise learning roadmap as JSONB
-- Nullable: existing rows get NULL (handled gracefully by frontend)
-- Milestone 7

ALTER TABLE resume_analyses
    ADD COLUMN IF NOT EXISTS roadmap JSONB;
