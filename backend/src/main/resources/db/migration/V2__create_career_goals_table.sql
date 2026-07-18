CREATE TABLE career_goals (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL,
    target_role VARCHAR(255) NOT NULL,
    preferred_company VARCHAR(255),
    general_industry_reqs BOOLEAN DEFAULT FALSE,
    graduation_year VARCHAR(50),
    experience_level VARCHAR(50),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_career_goal_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
    CONSTRAINT uq_career_goal_user UNIQUE (user_id)
);
