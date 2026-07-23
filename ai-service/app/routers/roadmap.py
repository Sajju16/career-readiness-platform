"""
roadmap.py
Milestone 7: Personalized Learning Roadmap endpoint

POST /api/roadmap/generate
  - Accepts: missing_skills, target_role, requirement_source
  - Returns: structured week-wise roadmap JSON
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
from app.services.roadmap_generator import generate_roadmap
import logging

router = APIRouter(
    prefix="/api/roadmap",
    tags=["Roadmap"]
)


class RoadmapRequest(BaseModel):
    missing_skills: list[str]
    target_role: str
    requirement_source: str


class RoadmapResourceItem(BaseModel):
    title: str
    type: str
    url: str


class RoadmapPhaseItem(BaseModel):
    phaseNumber: int
    weekRange: str
    title: str
    primarySkill: str
    skills: list[str]
    priority: str
    reason: str
    description: str
    learningObjectives: list[str]
    resources: list[RoadmapResourceItem]
    estimatedHours: int


class RoadmapResponse(BaseModel):
    targetRole: str
    requirementSource: str
    totalWeeks: int
    totalPhases: int
    estimatedTotalHours: Optional[int] = None
    phases: list[RoadmapPhaseItem]
    message: Optional[str] = None


@router.post("/generate", response_model=RoadmapResponse)
async def generate_roadmap_endpoint(request: RoadmapRequest):
    """
    Generates a personalized week-wise learning roadmap from the provided missing skills.
    Called by Spring Boot after loading the user's gap analysis results.
    """
    try:
        logging.info(
            f"Generating roadmap for role='{request.target_role}' "
            f"with {len(request.missing_skills)} missing skills"
        )

        roadmap = generate_roadmap(
            missing_skills=request.missing_skills,
            target_role=request.target_role,
            requirement_source=request.requirement_source,
        )

        logging.info(
            f"Roadmap generated: {roadmap['totalPhases']} phases, "
            f"{roadmap['totalWeeks']} weeks"
        )

        return roadmap

    except Exception as e:
        logging.error(f"Error generating roadmap: {e}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))
