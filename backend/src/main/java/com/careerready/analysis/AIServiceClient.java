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

    /**
     * Calls the FastAPI AI service to analyze a resume.
     *
     * @param resumeUrl   Signed URL for the private PDF in Supabase Storage
     * @param targetRole  The user's target career role (e.g. "software_engineer")
     * @param company     Optional preferred company (e.g. "Google"). May be null.
     */
    public AnalysisResponse analyzeResume(String resumeUrl, String targetRole, String company) {
        String url = aiServiceUrl + "/api/analyze/resume";

        AIAnalysisRequest request = AIAnalysisRequest.builder()
                .resume_url(resumeUrl)
                .target_role(targetRole)
                .company(company)           // M6: forward company context
                .build();

        return restTemplate.postForObject(url, request, AnalysisResponse.class);
    }
}
