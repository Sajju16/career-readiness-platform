"""
requirement_fetcher.py
Milestone 6: Live Industry / Company Requirement Analysis

Resolves the required skill profile for a given target role,
optionally adjusted for a specific company context.

Logic:
  - If company is provided and found → return company-specific profile
  - If company is provided but not found → fall back to industry profile, note it
  - If no company → return general industry profile
"""

from typing import Optional

# ---------------------------------------------------------------------------
# Industry-level required skills per role
# These represent broad market expectations across companies.
# ---------------------------------------------------------------------------
INDUSTRY_REQUIREMENTS: dict[str, list[str]] = {
    "software_engineer": [
        "Data Structures", "Algorithms", "Java", "Python", "SQL",
        "Git", "REST API", "System Design", "Object-Oriented Programming",
        "Unit Testing"
    ],
    "data_scientist": [
        "Python", "SQL", "Machine Learning", "Data Analysis", "Pandas",
        "NumPy", "Scikit-Learn", "Statistics", "Data Visualization", "Git"
    ],
    "ai_engineer": [
        "Python", "Machine Learning", "Deep Learning", "TensorFlow", "PyTorch",
        "NLP", "Data Structures", "SQL", "Git", "Model Deployment"
    ],
    "product_manager": [
        "Product Roadmap", "User Research", "Data Analysis", "Agile",
        "Stakeholder Management", "SQL", "A/B Testing", "Wireframing",
        "Communication", "Market Research"
    ],
    "ux_designer": [
        "Figma", "User Research", "Wireframing", "Prototyping",
        "Usability Testing", "Information Architecture", "Interaction Design",
        "CSS", "HTML", "Design Systems"
    ],
    "cybersecurity_analyst": [
        "Network Security", "SIEM", "Penetration Testing", "Vulnerability Assessment",
        "Incident Response", "Linux", "Python", "Firewalls", "IDS/IPS",
        "Security Frameworks"
    ],
    "frontend_developer": [
        "React", "JavaScript", "TypeScript", "HTML", "CSS",
        "REST API", "Git", "Redux", "Responsive Design", "Testing"
    ],
    "backend_developer": [
        "Java", "Spring Boot", "SQL", "PostgreSQL", "REST API",
        "Microservices", "Docker", "Git", "Authentication", "System Design"
    ],
    "full_stack_developer": [
        "React", "JavaScript", "Node.js", "Java", "Spring Boot",
        "SQL", "Docker", "Git", "REST API", "TypeScript"
    ],
}

# ---------------------------------------------------------------------------
# Company-specific required skills per role
# These reflect known hiring patterns and tech stacks for each company.
# Falls back to INDUSTRY_REQUIREMENTS if the role is not listed under a company.
# ---------------------------------------------------------------------------
COMPANY_REQUIREMENTS: dict[str, dict[str, list[str]]] = {
    "google": {
        "software_engineer": [
            "Data Structures", "Algorithms", "System Design", "Python",
            "Java", "C++", "Go", "Distributed Systems", "Object-Oriented Programming",
            "Unit Testing"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Statistics",
            "TensorFlow", "Data Analysis", "BigQuery", "Pandas", "A/B Testing", "Git"
        ],
        "ai_engineer": [
            "Python", "TensorFlow", "Deep Learning", "NLP", "Machine Learning",
            "Distributed Systems", "Data Structures", "Algorithms", "Research Skills", "Git"
        ],
        "product_manager": [
            "Product Roadmap", "Data Analysis", "SQL", "A/B Testing",
            "User Research", "Agile", "Communication", "Market Research",
            "OKR Framework", "Stakeholder Management"
        ],
    },
    "microsoft": {
        "software_engineer": [
            "Data Structures", "Algorithms", "System Design", "C#", ".NET",
            "Azure", "Python", "Java", "REST API", "Git"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Azure ML", "Pandas",
            "Statistics", "Power BI", "Data Analysis", "Scikit-Learn", "Git"
        ],
        "ai_engineer": [
            "Python", "Azure", "Machine Learning", "Deep Learning", "NLP",
            "TensorFlow", "PyTorch", "Data Structures", "Model Deployment", "Git"
        ],
    },
    "amazon": {
        "software_engineer": [
            "Data Structures", "Algorithms", "System Design", "Java", "Python",
            "AWS", "Microservices", "REST API", "Distributed Systems", "Leadership Principles"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Statistics", "AWS",
            "Pandas", "Scikit-Learn", "A/B Testing", "Data Analysis", "Git"
        ],
        "backend_developer": [
            "Java", "Spring Boot", "AWS", "Microservices", "SQL",
            "REST API", "Docker", "Kubernetes", "Git", "System Design"
        ],
    },
    "meta": {
        "software_engineer": [
            "Data Structures", "Algorithms", "System Design", "Python",
            "C++", "Java", "Distributed Systems", "React", "GraphQL", "Git"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Statistics", "Pandas",
            "A/B Testing", "Causal Inference", "Data Analysis", "Hive", "Git"
        ],
        "frontend_developer": [
            "React", "JavaScript", "TypeScript", "GraphQL", "CSS",
            "HTML", "REST API", "Git", "Redux", "Performance Optimization"
        ],
    },
    "apple": {
        "software_engineer": [
            "Data Structures", "Algorithms", "Swift", "Objective-C",
            "System Design", "C++", "Python", "Xcode", "Unit Testing", "Git"
        ],
        "ai_engineer": [
            "Python", "Machine Learning", "Core ML", "TensorFlow", "NLP",
            "Data Structures", "Algorithms", "Swift", "Model Optimization", "Git"
        ],
    },
    "netflix": {
        "software_engineer": [
            "Data Structures", "Algorithms", "System Design", "Java",
            "Python", "Microservices", "AWS", "Distributed Systems", "REST API", "Git"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Statistics",
            "A/B Testing", "Causal Inference", "Pandas", "Spark", "Data Analysis", "Git"
        ],
    },
    "infosys": {
        "software_engineer": [
            "Java", "Spring Boot", "SQL", "REST API", "Git",
            "Object-Oriented Programming", "Data Structures", "Algorithms",
            "Agile", "Testing"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Pandas",
            "Data Analysis", "Scikit-Learn", "Statistics", "Git", "Power BI", "Agile"
        ],
    },
    "tcs": {
        "software_engineer": [
            "Java", "Python", "SQL", "REST API", "Git",
            "Data Structures", "Algorithms", "Object-Oriented Programming",
            "Agile", "Unit Testing"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Pandas",
            "Data Analysis", "TensorFlow", "Statistics", "Agile", "Git", "Power BI"
        ],
    },
    "wipro": {
        "software_engineer": [
            "Java", "Python", "SQL", "REST API", "Git",
            "Data Structures", "Algorithms", "Agile", "Unit Testing", "Cloud Basics"
        ],
        "data_scientist": [
            "Python", "SQL", "Machine Learning", "Pandas",
            "Scikit-Learn", "Data Analysis", "Git", "Statistics", "Agile", "Visualization"
        ],
    },
}


def get_requirements(target_role: str, company: Optional[str]) -> tuple[list[str], str]:
    """
    Returns the required skills list and a human-readable source label.

    Args:
        target_role: The role key (e.g. "software_engineer"). Always required.
        company: Optional company name (e.g. "Google"). Case-insensitive.

    Returns:
        (required_skills, source_label)
    """
    role_key = (target_role or "software_engineer").lower().strip().replace(" ", "_")
    role_display = (target_role or "software_engineer").replace("_", " ").title()

    if company:
        company_key = company.lower().strip()
        company_display = company.strip().title()

        company_profile = COMPANY_REQUIREMENTS.get(company_key, {})
        role_skills = company_profile.get(role_key)

        if role_skills:
            source = f"{company_display} – {role_display}"
            return role_skills, source
        else:
            # Company known or unknown but role not in company profile — fall back to industry
            industry_skills = INDUSTRY_REQUIREMENTS.get(
                role_key,
                INDUSTRY_REQUIREMENTS["software_engineer"]
            )
            source = f"Industry – {role_display} (no specific profile for {company_display})"
            return industry_skills, source
    else:
        # No company — use general industry requirements
        industry_skills = INDUSTRY_REQUIREMENTS.get(
            role_key,
            INDUSTRY_REQUIREMENTS["software_engineer"]
        )
        source = f"Industry – {role_display}"
        return industry_skills, source
