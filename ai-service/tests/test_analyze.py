from fastapi.testclient import TestClient
from unittest.mock import patch, AsyncMock
import pytest
import httpx
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "service": "career-ready-ai"}

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "docs" in response.json()

def test_analyze_resume_missing_fields():
    response = client.post("/api/analyze/resume", json={})
    assert response.status_code == 422
    data = response.json()
    assert "detail" in data

def test_analyze_resume_success():
    resume_text = "Proficient in Python, Java, SQL, Docker, and Spring Boot. Experience with REST APIs."
    with patch("app.routers.analyze.extract_text_from_url", new=AsyncMock(return_value=resume_text)):
        payload = {
            "resume_url": "https://example.supabase.co/storage/v1/object/sign/resumes/test.pdf?token=xyz",
            "target_role": "software_engineer",
            "company": "Google"
        }
        response = client.post("/api/analyze/resume", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "readiness_score" in data
        assert isinstance(data["readiness_score"], int)
        assert "extracted_skills" in data
        assert "matched_skills" in data
        assert "missing_skills" in data
        assert "requirement_source" in data
        assert "recommendations" in data
        assert len(data["extracted_skills"]) > 0

def test_analyze_resume_storage_http_error():
    mock_response = httpx.Response(status_code=404, request=httpx.Request("GET", "https://example.com/test.pdf"))
    with patch("app.routers.analyze.extract_text_from_url", side_effect=httpx.HTTPStatusError("Not Found", request=mock_response.request, response=mock_response)):
        payload = {
            "resume_url": "https://example.supabase.co/storage/v1/object/sign/resumes/notfound.pdf",
            "target_role": "software_engineer"
        }
        response = client.post("/api/analyze/resume", json=payload)
        assert response.status_code == 400
        assert "Unable to download resume file from storage" in response.json()["detail"]

def test_analyze_resume_storage_timeout():
    with patch("app.routers.analyze.extract_text_from_url", side_effect=httpx.TimeoutException("Read timed out")):
        payload = {
            "resume_url": "https://example.supabase.co/storage/v1/object/sign/resumes/timeout.pdf",
            "target_role": "software_engineer"
        }
        response = client.post("/api/analyze/resume", json=payload)
        assert response.status_code == 504
        assert "Timeout downloading resume file from storage" in response.json()["detail"]

def test_analyze_resume_empty_or_invalid_pdf():
    with patch("app.routers.analyze.extract_text_from_url", side_effect=ValueError("No readable text could be extracted from resume PDF")):
        payload = {
            "resume_url": "https://example.supabase.co/storage/v1/object/sign/resumes/empty.pdf",
            "target_role": "software_engineer"
        }
        response = client.post("/api/analyze/resume", json=payload)
        assert response.status_code == 422
        assert "No readable text" in response.json()["detail"]

def test_roadmap_generate_success():
    payload = {
        "missing_skills": ["Kubernetes", "Kafka"],
        "target_role": "software_engineer",
        "requirement_source": "Industry — Software Engineer"
    }
    response = client.post("/api/roadmap/generate", json=payload)
    assert response.status_code == 200
    data = response.json()
    assert "phases" in data
    assert "totalWeeks" in data
