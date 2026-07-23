package com.careerready.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * One 2-week learning phase in the roadmap.
 * Milestone 7
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RoadmapPhase {
    private Integer phaseNumber;
    private String weekRange;        // e.g. "Week 1–2"
    private String title;            // e.g. "System Design + Java"
    private String primarySkill;
    private List<String> skills;     // 1 or 2 skills per phase
    private String priority;         // HIGH / MEDIUM / LOW
    private String reason;
    private String description;
    private List<String> learningObjectives;
    private List<RoadmapResource> resources;
    private Integer estimatedHours;
}
