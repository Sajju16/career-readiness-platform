package com.careerready.career.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CareerGoalResponse {
    private UUID id;
    private String targetRole;
    private String preferredCompany;
    private Boolean generalIndustryReqs;
    private String graduationYear;
    private String experienceLevel;
    private ZonedDateTime createdAt;
    private ZonedDateTime updatedAt;
}
