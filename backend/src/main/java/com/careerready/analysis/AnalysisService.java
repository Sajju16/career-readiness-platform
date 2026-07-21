package com.careerready.analysis;

import com.careerready.analysis.dto.AnalysisResponse;
import com.careerready.career.CareerGoal;
import com.careerready.career.CareerGoalRepository;
import com.careerready.resume.Resume;
import com.careerready.resume.ResumeRepository;
import com.careerready.resume.SupabaseStorageService;
import com.careerready.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AnalysisService {

    private final ResumeAnalysisRepository analysisRepository;
    private final CareerGoalRepository careerGoalRepository;
    private final ResumeRepository resumeRepository;
    private final SupabaseStorageService storageService;
    private final AIServiceClient aiServiceClient;

    @Transactional
    public AnalysisResponse analyzeUserResume(User user) {
        CareerGoal careerGoal = careerGoalRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        "Career Goal not set. Please set a career goal first."));

        Resume resume = resumeRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        "Resume not uploaded. Please upload a resume first."));

        // Generate signed URL for private Supabase Storage access
        String signedUrl = storageService.generateSignedUrl(resume.getFileUrl());

        // Call AI Service — forward targetRole AND preferredCompany (M6)
        AnalysisResponse aiResponse = aiServiceClient.analyzeResume(
                signedUrl,
                careerGoal.getTargetRole(),
                careerGoal.getPreferredCompany()   // may be null → FastAPI handles gracefully
        );

        // Persist analysis results (upsert pattern — one record per user)
        ResumeAnalysis analysis = analysisRepository.findByUserId(user.getId())
                .orElse(new ResumeAnalysis());

        analysis.setUser(user);
        analysis.setReadinessScore(aiResponse.getReadinessScore());
        analysis.setExtractedSkills(aiResponse.getExtractedSkills());
        analysis.setMatchedSkills(aiResponse.getMatchedSkills());       // M6
        analysis.setMissingSkills(aiResponse.getMissingSkills());
        analysis.setRequirementSource(aiResponse.getRequirementSource()); // M6
        analysis.setRecommendations(aiResponse.getRecommendations());

        analysisRepository.save(analysis);

        return aiResponse;
    }

    @Transactional(readOnly = true)
    public AnalysisResponse getAnalysis(User user) {
        ResumeAnalysis analysis = analysisRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException(
                        "Analysis not found. Please run the analysis first."));

        return AnalysisResponse.builder()
                .readinessScore(analysis.getReadinessScore())
                .extractedSkills(analysis.getExtractedSkills())
                .matchedSkills(analysis.getMatchedSkills())             // M6
                .missingSkills(analysis.getMissingSkills())
                .requirementSource(analysis.getRequirementSource())     // M6
                .recommendations(analysis.getRecommendations())
                .build();
    }
}
