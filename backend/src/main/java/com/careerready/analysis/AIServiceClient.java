package com.careerready.analysis;

import com.careerready.analysis.dto.AIAnalysisRequest;
import com.careerready.analysis.dto.AnalysisResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class AIServiceClient {

    @Value("${ai.service.base-url}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    public AnalysisResponse analyzeResume(String resumeUrl, String targetRole) {
        String url = aiServiceUrl + "/api/analyze/resume";
        
        AIAnalysisRequest request = AIAnalysisRequest.builder()
                .resume_url(resumeUrl)
                .target_role(targetRole)
                .build();
                
        return restTemplate.postForObject(url, request, AnalysisResponse.class);
    }
}
