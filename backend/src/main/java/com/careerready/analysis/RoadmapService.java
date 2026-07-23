package com.careerready.analysis;

import com.careerready.analysis.dto.RoadmapResponse;
import com.careerready.career.CareerGoal;
import com.careerready.career.CareerGoalRepository;
import com.careerready.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

/**
 * RoadmapService
 * Milestone 7: Orchestrates personalized learning roadmap generation.
 *
 * Flow:
 *   1. Load the user's existing resume_analyses record (must have run analysis first)
 *   2. Read missingSkills + requirementSource from the record
 *   3. Call FastAPI POST /api/roadmap/generate
 *   4. Persist the roadmap JSON back to resume_analyses.roadmap
 *   5. Return the RoadmapResponse to the controller
 */
@Service
@RequiredArgsConstructor
public class RoadmapService {

    private final ResumeAnalysisRepository analysisRepository;
    private final CareerGoalRepository careerGoalRepository;
    private final AIServiceClient aiServiceClient;
    private final ObjectMapper objectMapper;

    @Transactional
    public RoadmapResponse generateRoadmap(User user) {
        ResumeAnalysis analysis = analysisRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        "No analysis found. Please run the resume analysis first."));

        CareerGoal careerGoal = careerGoalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        "Career Goal not set. Please set a career goal first."));

        List<String> missingSkills = analysis.getMissingSkills();
        if (missingSkills == null) {
            missingSkills = Collections.emptyList();
        }

        String requirementSource = analysis.getRequirementSource() != null
                ? analysis.getRequirementSource()
                : "Industry – " + careerGoal.getTargetRole().replace("_", " ");

        // Call FastAPI to generate the structured roadmap
        RoadmapResponse roadmap = aiServiceClient.generateRoadmap(
                missingSkills,
                careerGoal.getTargetRole(),
                requirementSource
        );

        // Persist roadmap as JSONB — convert to Map so Hibernate serializes it properly
        analysis.setRoadmap(objectMapper.convertValue(roadmap, Object.class));
        analysisRepository.save(analysis);

        return roadmap;
    }

    @Transactional(readOnly = true)
    public RoadmapResponse getRoadmap(User user) {
        ResumeAnalysis analysis = analysisRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        "No analysis found. Please run the resume analysis first."));

        if (analysis.getRoadmap() == null) {
            throw new RuntimeException(
                    "No roadmap generated yet. Please click 'Generate Roadmap'.");
        }

        // Deserialize the stored JSONB back to RoadmapResponse
        return objectMapper.convertValue(analysis.getRoadmap(), RoadmapResponse.class);
    }
}
