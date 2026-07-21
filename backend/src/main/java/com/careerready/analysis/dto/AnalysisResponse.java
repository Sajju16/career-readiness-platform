package com.careerready.analysis.dto;

import com.fasterxml.jackson.annotation.JsonAlias;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisResponse {
    // @JsonAlias accepts snake_case from FastAPI; serializes as camelCase to React

    @JsonAlias("readiness_score")
    private Integer readinessScore;

    @JsonAlias("extracted_skills")
    private List<String> extractedSkills;

    @JsonAlias("matched_skills")
    private List<String> matchedSkills;         // M6: skills from resume that match required

    @JsonAlias("missing_skills")
    private List<String> missingSkills;

    @JsonAlias("requirement_source")
    private String requirementSource;           // M6: e.g. "Google – Software Engineer"

    private List<String> recommendations;
}
