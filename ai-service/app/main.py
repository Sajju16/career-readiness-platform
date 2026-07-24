"""
AI-Based Career Readiness and Skill Gap Analysis
FastAPI AI Service – Entry Point

Milestone 1: Foundation Setup
NLP logic, routers, and endpoints will be added in Milestones 3–5.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="Career Readiness AI Service",
    description="NLP-powered skill extraction, gap analysis, and roadmap generation service.",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# ---- CORS ----
app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.getenv("ALLOWED_ORIGIN", "http://localhost:8080")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ---- Health Check ----
@app.get("/health", tags=["Health"])
async def health_check():
    """Service health check endpoint."""
    return {"status": "ok", "service": "career-ready-ai"}


# ---- Root ----
@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Career Readiness AI Service is running.",
        "docs": "/docs",
        "health": "/health",
    }

# TODO (Milestone 3): Register extract router
from app.routers import analyze
app.include_router(analyze.router)

# Milestone 7: Register roadmap router
from app.routers import roadmap
app.include_router(roadmap.router)
