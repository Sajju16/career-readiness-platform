package com.careerready.auth;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;
import java.time.Instant;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/diagnostic")
public class DiagnosticController {

    @Value("${ai.service.base-url:https://career-readiness-ai.onrender.com}")
    private String aiServiceUrl;

    private static final String PAYLOAD = "{\"resume_url\":\"https://example.com/test.pdf\",\"target_role\":\"Software Engineer\",\"company\":null}";

    @GetMapping("/test-ai")
    public ResponseEntity<Map<String, Object>> testAiEndpoint() {
        String targetUrl = aiServiceUrl + "/api/analyze/resume";
        Map<String, Object> results = new LinkedHashMap<>();
        results.put("targetUrl", targetUrl);

        HttpClient client = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(10))
                .build();

        List<Map<String, String>> tests = List.of(
                Map.of("name", "Test A (Java UA)", "ua", "Java/21.0.11"),
                Map.of("name", "Test B (Custom UA)", "ua", "CareerReady-Backend/1.0"),
                Map.of("name", "Test C (Browser UA)", "ua", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36")
        );

        for (Map<String, String> test : tests) {
            Map<String, Object> testResult = new LinkedHashMap<>();
            testResult.put("userAgent", test.get("ua"));
            testResult.put("timestamp", Instant.now().toString());

            try {
                HttpRequest request = HttpRequest.newBuilder()
                        .uri(URI.create(targetUrl))
                        .timeout(Duration.ofSeconds(15))
                        .header("Content-Type", "application/json")
                        .header("User-Agent", test.get("ua"))
                        .POST(HttpRequest.BodyPublishers.ofString(PAYLOAD))
                        .build();

                HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());

                testResult.put("status", response.statusCode());

                Map<String, String> safeHeaders = new LinkedHashMap<>();
                safeHeaders.put("server", response.headers().firstValue("server").orElse(null));
                safeHeaders.put("cf-ray", response.headers().firstValue("cf-ray").orElse(null));
                safeHeaders.put("cf-cache-status", response.headers().firstValue("cf-cache-status").orElse(null));
                safeHeaders.put("x-render-origin-server", response.headers().firstValue("x-render-origin-server").orElse(null));
                safeHeaders.put("rndr-id", response.headers().firstValue("rndr-id").orElse(null));
                safeHeaders.put("retry-after", response.headers().firstValue("retry-after").orElse(null));
                testResult.put("headers", safeHeaders);

                testResult.put("body", response.body());
            } catch (Exception e) {
                testResult.put("error", e.getClass().getSimpleName() + ": " + e.getMessage());
            }

            results.put(test.get("name"), testResult);
        }

        return ResponseEntity.ok(results);
    }
}
