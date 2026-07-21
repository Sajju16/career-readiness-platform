package com.careerready.analysis.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AIAnalysisRequest {
    private String resume_url;
    private String target_role;
    private String company;          // M6: optional company context, may be null
}
