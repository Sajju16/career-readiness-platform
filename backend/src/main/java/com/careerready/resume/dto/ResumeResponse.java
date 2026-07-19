package com.careerready.resume.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.ZonedDateTime;
import java.util.UUID;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ResumeResponse {
    private UUID id;
    private String fileName;
    private String fileUrl;
    private Long fileSize;
    private ZonedDateTime uploadedAt;
}
