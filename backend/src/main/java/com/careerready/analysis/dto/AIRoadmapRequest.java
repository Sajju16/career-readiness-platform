package com.careerready.analysis.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Request body sent to FastAPI POST /api/roadmap/generate
 * Milestone 7
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIRoadmapRequest {

    @JsonProperty("missing_skills")
    private List<String> missingSkills;

    @JsonProperty("target_role")
    private String targetRole;

    @JsonProperty("requirement_source")
    private String requirementSource;
}
