import re

# Simple mock dictionary of required skills per target role
TARGET_ROLE_SKILLS = {
    "Backend Developer": ["Java", "Spring Boot", "SQL", "PostgreSQL", "Docker", "REST API", "Microservices", "Python"],
    "Frontend Developer": ["React", "JavaScript", "TypeScript", "HTML", "CSS", "Redux", "Tailwind", "Next.js"],
    "Software Engineer": ["Java", "Python", "JavaScript", "SQL", "Git", "Data Structures", "Algorithms"],
    "Data Scientist": ["Python", "SQL", "Machine Learning", "Data Analysis", "Pandas", "Scikit-Learn", "TensorFlow"],
    "Full Stack Developer": ["React", "JavaScript", "Node.js", "Java", "Spring Boot", "SQL", "Docker", "Git"]
}

# General tech skills master list (for general extraction)
MASTER_SKILLS = set([
    "Java", "Python", "JavaScript", "TypeScript", "C++", "C#", "Go", "Rust", "Ruby", "PHP",
    "Spring Boot", "React", "Angular", "Vue", "Node.js", "Django", "Flask", "Express", "Next.js",
    "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "Elasticsearch", "Cassandra",
    "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Terraform", "Jenkins", "Git",
    "Machine Learning", "Data Analysis", "Pandas", "Scikit-Learn", "TensorFlow", "PyTorch",
    "REST API", "Microservices", "GraphQL", "HTML", "CSS", "Redux", "Tailwind",
    "Data Structures", "Algorithms"
])

def extract_skills(text: str) -> list[str]:
    """
    Extracts skills from text based on a master dictionary using simple regex matching.
    """
    extracted = []
    text_lower = text.lower()
    for skill in MASTER_SKILLS:
        # Use regex for whole word matching to avoid partial matches (e.g. 'go' in 'good')
        # Escape skill to handle C++, C#, etc.
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        # For C++ and C# \b might not work well because + and # are non-word chars.
        if skill in ["C++", "C#"]:
            if skill.lower() in text_lower:
                extracted.append(skill)
        elif re.search(pattern, text_lower):
            extracted.append(skill)
    return extracted

def analyze_resume(text: str, target_role: str) -> dict:
    """
    Analyzes the resume text against a target role.
    """
    extracted = extract_skills(text)
    
    # Get required skills for the role, default to general Software Engineer if not found
    required = TARGET_ROLE_SKILLS.get(target_role, TARGET_ROLE_SKILLS["Software Engineer"])
    
    # Calculate matches and missing
    # We do case-insensitive comparison
    extracted_lower = {s.lower() for s in extracted}
    missing = []
    matched = []
    
    for req in required:
        if req.lower() in extracted_lower:
            matched.append(req)
        else:
            missing.append(req)
            
    # Calculate score
    score = 0
    if len(required) > 0:
        score = int((len(matched) / len(required)) * 100)
        
    # Generate recommendations
    recommendations = []
    if missing:
        recommendations.append("Consider gaining experience or completing projects using the following missing skills.")
        for m in missing:
            recommendations.append(f"Learn {m} to improve your alignment with the {target_role} role.")
    else:
        recommendations.append(f"Great job! Your resume strongly aligns with the {target_role} role.")
        
    return {
        "readiness_score": score,
        "extracted_skills": extracted,
        "missing_skills": missing,
        "recommendations": recommendations
    }
