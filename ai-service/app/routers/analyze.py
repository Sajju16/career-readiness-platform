"""
analyze.py
Milestone 5: Resume analysis endpoint
Milestone 6: Added optional company field and requirement_source in response
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.resume_parser import extract_text_from_url
from app.services.skill_extractor import analyze_resume
from app.services.requirement_fetcher import get_requirements
import logging

router = APIRouter(
    prefix="/api/analyze",
    tags=["Analysis"]
)


class AnalyzeRequest(BaseModel):
    resume_url: str
    target_role: str
    company: Optional[str] = None   # M6: optional company context


class AnalyzeResponse(BaseModel):
    readiness_score: int
    extracted_skills: list[str]
    matched_skills: list[str]       # M6: skills found in resume that match required
    missing_skills: list[str]
    requirement_source: str         # M6: e.g. "Google – Software Engineer"
    recommendations: list[str]


@router.post("/resume", response_model=AnalyzeResponse)
async def analyze_resume_endpoint(request: AnalyzeRequest):
    try:
        logging.info(
            f"Analyzing resume for role='{request.target_role}', "
            f"company='{request.company or 'None'}'"
        )

        # Step 1: Resolve required skills based on role + optional company
        required_skills, requirement_source = get_requirements(
            target_role=request.target_role,
            company=request.company,
        )
        logging.info(f"Requirement source: {requirement_source} ({len(required_skills)} skills)")

        # Step 2: Extract text from the resume PDF via signed URL
        text = await extract_text_from_url(request.resume_url)
        logging.info(f"Extracted {len(text)} characters from resume")

        # Step 3: Analyze resume text against resolved requirements
        result = analyze_resume(
            text=text,
            required_skills=required_skills,
            requirement_source=requirement_source,
        )

        return result

    except Exception as e:
        logging.error(f"Error during resume analysis: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
