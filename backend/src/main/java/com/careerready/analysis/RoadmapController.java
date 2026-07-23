package com.careerready.analysis;

import com.careerready.analysis.dto.RoadmapResponse;
import com.careerready.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

/**
 * RoadmapController
 * Milestone 7: REST endpoints for personalized learning roadmap.
 *
 * POST /api/roadmap/generate  → triggers fresh roadmap generation from AI service
 * GET  /api/roadmap/me        → returns the persisted roadmap for the current user
 */
@RestController
@RequestMapping("/api/roadmap")
@RequiredArgsConstructor
public class RoadmapController {

    private final RoadmapService roadmapService;

    @PostMapping("/generate")
    public ResponseEntity<?> generateRoadmap(@AuthenticationPrincipal User user) {
        try {
            RoadmapResponse response = roadmapService.generateRoadmap(user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("An error occurred while generating the roadmap: " + e.getMessage());
        }
    }

    @GetMapping("/me")
    public ResponseEntity<?> getRoadmap(@AuthenticationPrincipal User user) {
        try {
            RoadmapResponse response = roadmapService.getRoadmap(user);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
