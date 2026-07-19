package com.careerready.resume;

import com.careerready.resume.dto.ResumeResponse;
import com.careerready.user.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ResumeService {

    private final ResumeRepository resumeRepository;
    private final SupabaseStorageService storageService;

    private static final long MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

    @Transactional
    public ResumeResponse uploadResume(User user, MultipartFile file) throws IOException {
        // Validate file
        if (file.isEmpty()) {
            throw new IllegalArgumentException("File is empty");
        }
        if (file.getSize() > MAX_FILE_SIZE) {
            throw new IllegalArgumentException("File exceeds maximum size of 5MB");
        }
        if (!"application/pdf".equals(file.getContentType())) {
            throw new IllegalArgumentException("Only PDF files are allowed");
        }

        // Check for existing resume
        Optional<Resume> existingResumeOpt = resumeRepository.findByUserId(user.getId());
        
        // Generate unique filename for storage
        String storageFileName = user.getId().toString() + "_" + System.currentTimeMillis() + ".pdf";
        
        // Upload to Supabase Storage
        String fileUrl = storageService.uploadFile(storageFileName, file);

        Resume resume;
        if (existingResumeOpt.isPresent()) {
            resume = existingResumeOpt.get();
            // Delete old file from storage asynchronously or safely
            String oldFileName = resume.getFileUrl().substring(resume.getFileUrl().lastIndexOf("/") + 1);
            storageService.deleteFile(oldFileName);
            
            // Update metadata
            resume.setFileName(file.getOriginalFilename());
            resume.setFileUrl(fileUrl);
            resume.setFileSize(file.getSize());
            resume.setMimeType(file.getContentType());
        } else {
            // Create new metadata
            resume = Resume.builder()
                    .user(user)
                    .fileName(file.getOriginalFilename())
                    .fileUrl(fileUrl)
                    .fileSize(file.getSize())
                    .mimeType(file.getContentType())
                    .build();
        }

        Resume savedResume = resumeRepository.save(resume);
        return mapToResponse(savedResume);
    }

    @Transactional(readOnly = true)
    public ResumeResponse getResume(User user) {
        Resume resume = resumeRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        return mapToResponse(resume);
    }

    @Transactional
    public void deleteResume(User user) {
        Resume resume = resumeRepository.findByUserId(user.getId())
                .orElseThrow(() -> new RuntimeException("Resume not found"));
        
        // Delete from storage
        String oldFileName = resume.getFileUrl().substring(resume.getFileUrl().lastIndexOf("/") + 1);
        storageService.deleteFile(oldFileName);
        
        // Delete from DB
        resumeRepository.delete(resume);
    }

    private ResumeResponse mapToResponse(Resume resume) {
        String signedUrl = storageService.generateSignedUrl(resume.getFileUrl());
        return ResumeResponse.builder()
                .id(resume.getId())
                .fileName(resume.getFileName())
                .fileUrl(signedUrl)
                .fileSize(resume.getFileSize())
                .uploadedAt(resume.getUploadedAt())
                .build();
    }
}
