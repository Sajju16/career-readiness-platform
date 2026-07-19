from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.resume_parser import extract_text_from_url
from app.services.skill_extractor import analyze_resume
import logging

router = APIRouter(
    prefix="/api/analyze",
    tags=["Analysis"]
)

class AnalyzeRequest(BaseModel):
    resume_url: str
    target_role: str

class AnalyzeResponse(BaseModel):
    readiness_score: int
    extracted_skills: list[str]
    missing_skills: list[str]
    recommendations: list[str]

@router.post("/resume", response_model=AnalyzeResponse)
async def analyze_resume_endpoint(request: AnalyzeRequest):
    try:
        logging.info(f"Analyzing resume from {request.resume_url} for role {request.target_role}")
        # Extract text from the signed URL
        text = await extract_text_from_url(request.resume_url)
        
        # Analyze text
        analysis_result = analyze_resume(text, request.target_role)
        return analysis_result
    except Exception as e:
        logging.error(f"Error analyzing resume: {e}")
        raise HTTPException(status_code=500, detail=str(e))
