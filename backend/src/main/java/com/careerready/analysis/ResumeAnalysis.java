package com.careerready.analysis;

import com.careerready.user.User;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "resume_analyses")
public class ResumeAnalysis {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false, unique = true)
    private User user;

    @Column(name = "readiness_score", nullable = false)
    private Integer readinessScore;

    @Type(JsonType.class)
    @Column(name = "extracted_skills", columnDefinition = "jsonb")
    private List<String> extractedSkills;

    @Type(JsonType.class)
    @Column(name = "matched_skills", columnDefinition = "jsonb")
    private List<String> matchedSkills;                 // M6

    @Type(JsonType.class)
    @Column(name = "missing_skills", columnDefinition = "jsonb")
    private List<String> missingSkills;

    @Column(name = "requirement_source")
    private String requirementSource;                   // M6

    @Type(JsonType.class)
    @Column(name = "recommendations", columnDefinition = "jsonb")
    private List<String> recommendations;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private ZonedDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private ZonedDateTime updatedAt;
}
