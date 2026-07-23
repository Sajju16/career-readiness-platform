package com.careerready.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * A single learning resource within a roadmap phase.
 * Milestone 7
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapResource {
    private String title;
    private String type;   // COURSE / VIDEO / BOOK / PRACTICE
    private String url;
}
