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
    // Accept both snake_case (from FastAPI) and camelCase; serialize as camelCase to React
    @JsonAlias("readiness_score")
    private Integer readinessScore;

    @JsonAlias("extracted_skills")
    private List<String> extractedSkills;

    @JsonAlias("missing_skills")
    private List<String> missingSkills;

    private List<String> recommendations;
}
