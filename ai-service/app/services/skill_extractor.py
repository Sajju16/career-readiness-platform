"""
skill_extractor.py
Milestone 5: Skill extraction from resume text
Milestone 6: analyze_resume() now accepts an explicit required_skills list
             (resolved externally by requirement_fetcher.py)
"""

import re
from typing import Optional

# ---------------------------------------------------------------------------
# Master skill vocabulary used to scan resume text.
# This is the extraction pool — NOT the requirements pool.
# Requirements are resolved by requirement_fetcher.py
# ---------------------------------------------------------------------------
MASTER_SKILLS: set[str] = {
    # Languages
    "Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Swift",
    "Objective-C", "Rust", "Ruby", "PHP", "Kotlin", "Scala",
    # Frameworks & Libraries
    "Spring Boot", "React", "Angular", "Vue", "Node.js", "Django", "Flask",
    "Express", "Next.js", ".NET", "FastAPI",
    # Databases
    "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch",
    "Cassandra", "BigQuery", "Hive", "NoSQL",
    # Cloud & DevOps
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Terraform", "Jenkins",
    "Git", "CI/CD", "Linux",
    # ML / AI
    "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch", "NLP",
    "Data Analysis", "Data Visualization", "Pandas", "NumPy", "Scikit-Learn",
    "Spark", "Statistics", "A/B Testing", "Causal Inference", "Model Deployment",
    "Core ML", "Azure ML",
    # Web / APIs
    "REST API", "GraphQL", "Microservices", "HTML", "CSS", "Redux",
    "Tailwind", "Responsive Design",
    # CS Fundamentals
    "Data Structures", "Algorithms", "System Design", "Object-Oriented Programming",
    "Distributed Systems", "Unit Testing",
    # Cloud services
    "BigQuery", "Xcode",
    # Design
    "Figma", "Wireframing", "Prototyping", "Usability Testing",
    "Information Architecture", "Interaction Design", "Design Systems",
    # PM / Soft
    "Agile", "Stakeholder Management", "Product Roadmap", "User Research",
    "Market Research", "Communication", "OKR Framework", "Power BI",
    # Security
    "Network Security", "SIEM", "Penetration Testing", "Vulnerability Assessment",
    "Incident Response", "Firewalls", "Security Frameworks",
    # Other
    "Performance Optimization", "Leadership Principles", "Cloud Basics",
    "Research Skills", "Model Optimization", "Visualization",
    "Authentication", "Testing",
}


def extract_skills(text: str) -> list[str]:
    """
    Extracts recognized skills from free-form resume text using whole-word regex matching.
    Returns all skills found — not filtered against any role requirements.
    """
    extracted = []
    text_lower = text.lower()

    for skill in MASTER_SKILLS:
        # C++ and C# have non-word chars — use plain substring match
        if skill in ("C++", "C#"):
            if skill.lower() in text_lower:
                extracted.append(skill)
        else:
            pattern = r'\b' + re.escape(skill.lower()) + r'\b'
            if re.search(pattern, text_lower):
                extracted.append(skill)

    return extracted


def analyze_resume(
    text: str,
    required_skills: list[str],
    requirement_source: str,
) -> dict:
    """
    Analyzes resume text against a provided required skills list.

    Args:
        text: Raw extracted resume text.
        required_skills: Required skills for the target role/company (from requirement_fetcher).
        requirement_source: Human-readable label for what profile was used.

    Returns:
        Analysis dict with score, matched/missing skills, source, recommendations.
    """
    extracted = extract_skills(text)
    extracted_lower = {s.lower() for s in extracted}

    matched: list[str] = []
    missing: list[str] = []

    for req in required_skills:
        if req.lower() in extracted_lower:
            matched.append(req)
        else:
            missing.append(req)

    # Readiness score: percentage of required skills present in resume
    score = 0
    if required_skills:
        score = int((len(matched) / len(required_skills)) * 100)

    # Generate recommendations
    recommendations: list[str] = []
    if missing:
        recommendations.append(
            f"Your resume was evaluated against: {requirement_source}."
        )
        recommendations.append(
            "Consider gaining experience or completing projects in the following missing areas:"
        )
        for skill in missing:
            recommendations.append(f"Learn {skill} to improve your alignment.")
    else:
        recommendations.append(
            f"Great job! Your resume strongly aligns with the {requirement_source} profile."
        )

    return {
        "readiness_score": score,
        "extracted_skills": extracted,
        "matched_skills": matched,
        "missing_skills": missing,
        "requirement_source": requirement_source,
        "recommendations": recommendations,
    }
