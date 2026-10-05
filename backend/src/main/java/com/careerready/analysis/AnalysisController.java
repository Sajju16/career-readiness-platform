package com.careerready.analysis;

import com.careerready.analysis.dto.AnalysisResponse;
import com.careerready.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.Map;

@RestController
@RequestMapping("/api/analysis")
@RequiredArgsConstructor
public class AnalysisController {

    private final AnalysisService analysisService;

    @PostMapping("/analyze")
    public ResponseEntity<?> analyzeResume(@AuthenticationPrincipal User user) {
        try {
            AnalysisResponse response = analysisService.analyzeUserResume(user);
            return ResponseEntity.ok(response);
        } catch (HttpStatusCodeException e) {
            String body = e.getResponseBodyAsString();
            String message = (body != null && !body.trim().startsWith("<")) ? body : "AI service unavailable. Please try again in a few moments.";
            return ResponseEntity.status(e.getStatusCode()).body(Map.of("error", message));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of("error", "An error occurred during analysis: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getAnalysis(@AuthenticationPrincipal User user) {
        try {
            AnalysisResponse response = analysisService.getAnalysis(user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
