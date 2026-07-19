package com.careerready.resume;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class SupabaseStorageService {

    @Value("${supabase.url}")
    private String supabaseUrl;

    @Value("${supabase.key}")
    private String supabaseKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private static final String BUCKET_NAME = "resumes";

    public String uploadFile(String fileName, MultipartFile file) throws IOException {
        String uploadUrl = String.format("%s/storage/v1/object/%s/%s", supabaseUrl, BUCKET_NAME, fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", supabaseKey);
        headers.setBearerAuth(supabaseKey);
        headers.setContentType(MediaType.valueOf(file.getContentType() != null ? file.getContentType() : "application/pdf"));
        
        HttpEntity<byte[]> requestEntity = new HttpEntity<>(file.getBytes(), headers);
        
        try {
            ResponseEntity<String> response = restTemplate.exchange(uploadUrl, HttpMethod.POST, requestEntity, String.class);
            if (!response.getStatusCode().is2xxSuccessful()) {
                throw new RuntimeException("Failed to upload to Supabase: " + response.getBody());
            }
            return fileName;
        } catch (Exception e) {
            throw new RuntimeException("Supabase Storage Error: " + e.getMessage(), e);
        }
    }

    public String generateSignedUrl(String fileName) {
        // Extract filename if it was stored as full URL previously
        if (fileName.contains("/")) {
            fileName = fileName.substring(fileName.lastIndexOf("/") + 1);
        }

        String signUrl = String.format("%s/storage/v1/object/sign/%s/%s", supabaseUrl, BUCKET_NAME, fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", supabaseKey);
        headers.setBearerAuth(supabaseKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestBody = "{\"expiresIn\": 3600}";
        HttpEntity<String> requestEntity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<java.util.Map> response = restTemplate.exchange(signUrl, HttpMethod.POST, requestEntity, java.util.Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                String signedPath = (String) response.getBody().get("signedURL");
                return String.format("%s/storage/v1%s", supabaseUrl, signedPath);
            }
            throw new RuntimeException("Failed to generate signed URL");
        } catch (Exception e) {
            throw new RuntimeException("Supabase Storage Sign URL Error: " + e.getMessage(), e);
        }
    }

    public void deleteFile(String fileName) {
        String deleteUrl = String.format("%s/storage/v1/object/%s/%s", supabaseUrl, BUCKET_NAME, fileName);

        HttpHeaders headers = new HttpHeaders();
        headers.set("apikey", supabaseKey);
        headers.setBearerAuth(supabaseKey);

        HttpEntity<Void> requestEntity = new HttpEntity<>(headers);

        try {
            restTemplate.exchange(deleteUrl, HttpMethod.DELETE, requestEntity, String.class);
        } catch (Exception e) {
            // Log error but don't fail the transaction, as cleanup failures shouldn't prevent new uploads
            System.err.println("Failed to delete old file from Supabase: " + e.getMessage());
        }
    }
}
