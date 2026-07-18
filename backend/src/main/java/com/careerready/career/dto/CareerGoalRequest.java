package com.careerready.career.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class CareerGoalRequest {

    @NotBlank(message = "Target role is required")
    private String targetRole;

    private String preferredCompany;
    
    private Boolean generalIndustryReqs;
    
    private String graduationYear;
    
    private String experienceLevel;
}
