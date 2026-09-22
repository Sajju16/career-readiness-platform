package com.careerready.analysis;

import com.careerready.analysis.dto.AIAnalysisRequest;
import com.careerready.analysis.dto.AIRoadmapRequest;
import com.careerready.analysis.dto.AnalysisResponse;
import com.careerready.analysis.dto.RoadmapResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIServiceClient {

    @Value("${ai.service.base-url}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    /**
     * Calls the FastAPI AI service to analyze a resume.
     * M5/M6: resume skill extraction + gap analysis.
     */
    public AnalysisResponse analyzeResume(String resumeUrl, String targetRole, String company) {
        String url = aiServiceUrl + "/api/analyze/resume";

        AIAnalysisRequest request = AIAnalysisRequest.builder()
                .resume_url(resumeUrl)
                .target_role(targetRole)
                .company(company)
                .build();

        try {
            return restTemplate.postForObject(url, request, AnalysisResponse.class);
        } catch (org.springframework.web.client.RestClientResponseException e) {
            log.warn("Downstream API Error | URL: {} | Status: {} | Exception: {} | Body: {}", 
                     url, e.getStatusCode().value(), e.getClass().getSimpleName(), e.getResponseBodyAsString());
            
            if (e.getStatusCode().value() == 429) {
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
                // Retry at most once, allowing exception to propagate if it fails again
                return restTemplate.postForObject(url, request, AnalysisResponse.class);
            }
            throw e;
        }
    }

    /**
     * Calls the FastAPI AI service to generate a personalized learning roadmap.
     * M7: week-wise plan from missing skills.
     */
    public RoadmapResponse generateRoadmap(
            List<String> missingSkills,
            String targetRole,
            String requirementSource) {

        String url = aiServiceUrl + "/api/roadmap/generate";

        AIRoadmapRequest request = AIRoadmapRequest.builder()
                .missingSkills(missingSkills)
                .targetRole(targetRole)
                .requirementSource(requirementSource)
                .build();

        return restTemplate.postForObject(url, request, RoadmapResponse.class);
    }
}
