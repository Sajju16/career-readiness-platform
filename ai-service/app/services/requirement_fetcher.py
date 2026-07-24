"""
requirement_fetcher.py
Milestone 8: NLP-Based Job Description Extraction

Resolves the required skill profile for a given target role,
by reading a Job Description .txt file and extracting skills via NLP.

Logic:
  - If company is provided and found → load company-specific JD
  - If company JD is missing → fall back to industry JD
  - Extract required skills from the loaded JD text using existing NLP pipeline
"""

import os
import logging
from typing import Optional
from app.services.skill_extractor import extract_skills

# The directory where Job Description text files are stored
JD_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__)))), "job_descriptions")

def get_requirements(target_role: str, company: Optional[str]) -> tuple[list[str], str]:
    """
    Returns the required skills list extracted from a JD file, and a source label.

    Args:
        target_role: The role key (e.g. "software_engineer" or "Software Engineer").
        company: Optional company name (e.g. "Google"). Case-insensitive.

    Returns:
        (required_skills, source_label)
    """
    role_file_name = (target_role or "software_engineer").lower().strip().replace(" ", "_") + ".txt"
    role_display = (target_role or "software_engineer").replace("_", " ").title()

    file_path_to_read = None
    source_label = ""
    
    if company:
        company_folder = company.strip().title()
        company_jd_path = os.path.join(JD_DIR, company_folder, role_file_name)
        
        if os.path.exists(company_jd_path):
            file_path_to_read = company_jd_path
            source_label = f"{company_folder} – {role_display}"
        else:
            # Fallback to Industry
            industry_jd_path = os.path.join(JD_DIR, "Industry", role_file_name)
            if os.path.exists(industry_jd_path):
                file_path_to_read = industry_jd_path
                source_label = f"Industry – {role_display} (no specific profile for {company_folder})"
    else:
        # No company provided, use Industry
        industry_jd_path = os.path.join(JD_DIR, "Industry", role_file_name)
        if os.path.exists(industry_jd_path):
            file_path_to_read = industry_jd_path
            source_label = f"Industry – {role_display}"

    # If even the Industry fallback is missing, fallback to a default Software Engineer profile
    if not file_path_to_read or not os.path.exists(file_path_to_read):
        logging.warning(f"JD file not found for role '{target_role}' and company '{company}'. Falling back to Industry Software Engineer.")
        file_path_to_read = os.path.join(JD_DIR, "Industry", "software_engineer.txt")
        source_label = f"Industry – Software Engineer (Fallback)"

    # Read the JD file and extract skills
    required_skills = []
    if os.path.exists(file_path_to_read):
        with open(file_path_to_read, "r", encoding="utf-8") as f:
            jd_text = f.read()
        
        # NLP Extraction: Use the exact same pipeline used for resumes
        required_skills = extract_skills(jd_text)
        
        # Deduplicate while preserving order
        seen = set()
        required_skills = [x for x in required_skills if not (x.lower() in seen or seen.add(x.lower()))]
    else:
        logging.error(f"Critical error: Fallback JD file not found at {file_path_to_read}")

    return required_skills, source_label
