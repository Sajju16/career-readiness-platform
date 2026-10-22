package com.careerready.analysis;

import com.careerready.analysis.dto.AnalysisResponse;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpServerErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AIServiceClientTest {

    @Mock
    private RestTemplate restTemplate;

    @InjectMocks
    private AIServiceClient aiServiceClient;

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(aiServiceClient, "aiServiceUrl", "https://career-readiness-ai.onrender.com");
        ReflectionTestUtils.setField(aiServiceClient, "restTemplate", restTemplate);
    }

    @Test
    void testAnalyzeResume_Success() {
        AnalysisResponse mockResponse = AnalysisResponse.builder()
                .readinessScore(85)
                .extractedSkills(List.of("Java", "Python"))
                .matchedSkills(List.of("Java"))
                .missingSkills(List.of("Go"))
                .requirementSource("Google — Software Engineer")
                .recommendations(List.of("Learn Go"))
                .build();

        when(restTemplate.postForObject(anyString(), any(), eq(AnalysisResponse.class)))
                .thenReturn(mockResponse);

        AnalysisResponse result = aiServiceClient.analyzeResume("https://supabase.co/resume.pdf", "software_engineer", "Google");

        assertNotNull(result);
        assertEquals(85, result.getReadinessScore());
        verify(restTemplate, times(1)).postForObject(anyString(), any(), eq(AnalysisResponse.class));
    }

    @Test
    void testAnalyzeResume_502Retry_Success() {
        AnalysisResponse mockResponse = AnalysisResponse.builder()
                .readinessScore(90)
                .build();

        when(restTemplate.postForObject(anyString(), any(), eq(AnalysisResponse.class)))
                .thenThrow(new HttpServerErrorException(HttpStatus.BAD_GATEWAY, "Bad Gateway"))
                .thenReturn(mockResponse);

        AnalysisResponse result = aiServiceClient.analyzeResume("https://supabase.co/resume.pdf", "software_engineer", null);

        assertNotNull(result);
        assertEquals(90, result.getReadinessScore());
        verify(restTemplate, times(2)).postForObject(anyString(), any(), eq(AnalysisResponse.class));
    }

    @Test
    void testAnalyzeResume_502Retry_FailsAgain() {
        when(restTemplate.postForObject(anyString(), any(), eq(AnalysisResponse.class)))
                .thenThrow(new HttpServerErrorException(HttpStatus.BAD_GATEWAY, "Bad Gateway"));

        assertThrows(HttpServerErrorException.class, () ->
                aiServiceClient.analyzeResume("https://supabase.co/resume.pdf", "software_engineer", null)
        );

        verify(restTemplate, times(2)).postForObject(anyString(), any(), eq(AnalysisResponse.class));
    }

    @Test
    void testAnalyzeResume_400BadRequest_NoRetry() {
        when(restTemplate.postForObject(anyString(), any(), eq(AnalysisResponse.class)))
                .thenThrow(new HttpClientErrorException(HttpStatus.BAD_REQUEST, "Bad Request"));

        assertThrows(HttpClientErrorException.class, () ->
                aiServiceClient.analyzeResume("https://supabase.co/resume.pdf", "software_engineer", null)
        );

        verify(restTemplate, times(1)).postForObject(anyString(), any(), eq(AnalysisResponse.class));
    }
}
