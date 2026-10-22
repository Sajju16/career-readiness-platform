package com.careerready.analysis;

import com.careerready.analysis.dto.AIAnalysisRequest;
import com.careerready.analysis.dto.AIRoadmapRequest;
import com.careerready.analysis.dto.AnalysisResponse;
import com.careerready.analysis.dto.RoadmapResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestClientResponseException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class AIServiceClient {

    @Value("${ai.service.base-url}")
    private String aiServiceUrl;

    private final RestTemplate restTemplate = createRestTemplate();

    private static RestTemplate createRestTemplate() {
        SimpleClientHttpRequestFactory factory = new SimpleClientHttpRequestFactory();
        factory.setConnectTimeout(15000); // 15s connection timeout
        factory.setReadTimeout(60000);    // 60s read timeout for ML/NLP processing
        return new RestTemplate(factory);
    }

    /**
     * Calls the FastAPI AI service to analyze a resume.
     * M5/M6: resume skill extraction + gap analysis.
     * Includes single-retry resilience for Render cold start / transient 502 Bad Gateway routing drops.
     */
    public AnalysisResponse analyzeResume(String resumeUrl, String targetRole, String company) {
        String baseUrl = aiServiceUrl.replaceAll("/+$", "");
        String url = baseUrl + "/api/analyze/resume";

        AIAnalysisRequest request = AIAnalysisRequest.builder()
                .resume_url(resumeUrl)
                .target_role(targetRole)
                .company(company)
                .build();

        long startTime = System.currentTimeMillis();
        log.info("Sending resume analysis request to AI service | role: {} | company: {}", targetRole, company);

        try {
            AnalysisResponse response = restTemplate.postForObject(url, request, AnalysisResponse.class);
            log.info("AI service resume analysis completed successfully in {} ms", System.currentTimeMillis() - startTime);
            return response;
        } catch (HttpServerErrorException e) {
            int statusCode = e.getStatusCode().value();
            log.warn("Downstream AI gateway/server error | URL: {} | Status: {} | Duration: {} ms",
                     url, statusCode, System.currentTimeMillis() - startTime);

            // Handle Render free-instance wake-up and transient edge routing drops (502 Bad Gateway, 503, 504)
            if (statusCode == 502 || statusCode == 503 || statusCode == 504) {
                log.info("Encountered transient downstream status {}; attempting single recovery retry after pause...", statusCode);
                try {
                    Thread.sleep(2500); // Wait 2.5s for Render container/routing mesh to stabilize
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }

                long retryStart = System.currentTimeMillis();
                try {
                    AnalysisResponse retryResponse = restTemplate.postForObject(url, request, AnalysisResponse.class);
                    log.info("AI service retry succeeded in {} ms", System.currentTimeMillis() - retryStart);
                    return retryResponse;
                } catch (RestClientResponseException retryEx) {
                    log.error("AI service retry failed | Status: {} | Duration: {} ms",
                              retryEx.getStatusCode().value(), System.currentTimeMillis() - retryStart);
                    throw retryEx;
                }
            }
            throw e;
        } catch (RestClientResponseException e) {
            log.warn("Downstream API Client Error | URL: {} | Status: {} | Exception: {}",
                     url, e.getStatusCode().value(), e.getClass().getSimpleName());
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

        String baseUrl = aiServiceUrl.replaceAll("/+$", "");
        String url = baseUrl + "/api/roadmap/generate";

        AIRoadmapRequest request = AIRoadmapRequest.builder()
                .missingSkills(missingSkills)
                .targetRole(targetRole)
                .requirementSource(requirementSource)
                .build();

        long startTime = System.currentTimeMillis();
        log.info("Sending roadmap generation request to AI service | role: {} | missingSkillsCount: {}",
                 targetRole, missingSkills != null ? missingSkills.size() : 0);

        try {
            RoadmapResponse response = restTemplate.postForObject(url, request, RoadmapResponse.class);
            log.info("AI service roadmap generation completed successfully in {} ms", System.currentTimeMillis() - startTime);
            return response;
        } catch (HttpServerErrorException e) {
            int statusCode = e.getStatusCode().value();
            log.warn("Downstream AI gateway/server error during roadmap | Status: {} | Duration: {} ms",
                     statusCode, System.currentTimeMillis() - startTime);

            if (statusCode == 502 || statusCode == 503 || statusCode == 504) {
                log.info("Retrying roadmap generation after transient {} status...", statusCode);
                try {
                    Thread.sleep(2500);
                } catch (InterruptedException ie) {
                    Thread.currentThread().interrupt();
                }
                return restTemplate.postForObject(url, request, RoadmapResponse.class);
            }
            throw e;
        } catch (RestClientResponseException e) {
            log.warn("Downstream API Error during roadmap | Status: {} | Exception: {}",
                     e.getStatusCode().value(), e.getClass().getSimpleName());
            throw e;
        }
    }
}
