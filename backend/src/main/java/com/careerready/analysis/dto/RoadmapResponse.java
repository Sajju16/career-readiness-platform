package com.careerready.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * Top-level roadmap response — returned by FastAPI and passed through to React.
 * Milestone 7
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapResponse {
    private String targetRole;
    private String requirementSource;
    private Integer totalWeeks;
    private Integer totalPhases;
    private Integer estimatedTotalHours;
    private List<RoadmapPhase> phases;
    private String message;          // non-null only when there are no missing skills
}
