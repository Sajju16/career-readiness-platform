"""
roadmap_generator.py
Milestone 7: Personalized Learning Roadmap Generator

Takes a list of missing skills and produces a week-wise, structured learning plan.
All resource data is curated and hardcoded — no external API calls.
"""

from typing import Optional

# ---------------------------------------------------------------------------
# Priority table: how important each skill is to learn first.
# HIGH → Week 1-2 | MEDIUM → Week 3-4 | LOW → Week 5+
# Keyed by skill name (case-insensitive match applied at runtime).
# ---------------------------------------------------------------------------
SKILL_PRIORITY: dict[str, str] = {
    # Fundamentals always first
    "data structures": "HIGH",
    "algorithms": "HIGH",
    "system design": "HIGH",
    "object-oriented programming": "HIGH",
    "distributed systems": "HIGH",

    # Core languages
    "java": "HIGH",
    "python": "HIGH",
    "javascript": "HIGH",
    "typescript": "MEDIUM",
    "c++": "HIGH",
    "c#": "MEDIUM",
    "go": "MEDIUM",
    "swift": "MEDIUM",

    # Frameworks
    "spring boot": "MEDIUM",
    "react": "MEDIUM",
    "node.js": "MEDIUM",
    ".net": "MEDIUM",
    "django": "LOW",
    "flask": "LOW",

    # Databases
    "sql": "HIGH",
    "postgresql": "MEDIUM",
    "mongodb": "LOW",
    "redis": "LOW",
    "nosql": "LOW",

    # Cloud & DevOps
    "docker": "MEDIUM",
    "kubernetes": "MEDIUM",
    "aws": "MEDIUM",
    "azure": "MEDIUM",
    "gcp": "LOW",
    "terraform": "LOW",
    "ci/cd": "MEDIUM",
    "git": "HIGH",
    "linux": "MEDIUM",

    # ML / AI
    "machine learning": "HIGH",
    "deep learning": "MEDIUM",
    "tensorflow": "MEDIUM",
    "pytorch": "MEDIUM",
    "nlp": "MEDIUM",
    "data analysis": "HIGH",
    "pandas": "HIGH",
    "numpy": "MEDIUM",
    "scikit-learn": "MEDIUM",
    "statistics": "HIGH",
    "a/b testing": "LOW",

    # APIs & Architecture
    "rest api": "HIGH",
    "graphql": "LOW",
    "microservices": "MEDIUM",

    # Design
    "figma": "HIGH",
    "wireframing": "HIGH",
    "prototyping": "MEDIUM",
    "usability testing": "MEDIUM",

    # Security
    "network security": "HIGH",
    "penetration testing": "HIGH",
    "siem": "MEDIUM",
    "incident response": "MEDIUM",
    "vulnerability assessment": "MEDIUM",
    "firewalls": "MEDIUM",
    "security frameworks": "LOW",

    # Testing
    "unit testing": "MEDIUM",
}

PRIORITY_ORDER = {"HIGH": 0, "MEDIUM": 1, "LOW": 2}

# ---------------------------------------------------------------------------
# Resource catalog: curated, real learning resources per skill.
# Each entry has: title, type (COURSE / VIDEO / BOOK / PRACTICE), url
# ---------------------------------------------------------------------------
SKILL_RESOURCES: dict[str, list[dict]] = {
    "Data Structures": [
        {"title": "Data Structures & Algorithms – Abdul Bari (YouTube)", "type": "VIDEO", "url": "https://www.youtube.com/playlist?list=PLDN4rrl48XKpZkf03iYFl-O29szjTrs_O"},
        {"title": "LeetCode – Data Structures Practice", "type": "PRACTICE", "url": "https://leetcode.com/explore/learn/"},
    ],
    "Algorithms": [
        {"title": "Algorithms, Part I – Princeton (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/learn/algorithms-part1"},
        {"title": "LeetCode – Algorithm Problems", "type": "PRACTICE", "url": "https://leetcode.com/problemset/algorithms/"},
    ],
    "System Design": [
        {"title": "Grokking the System Design Interview (Educative)", "type": "COURSE", "url": "https://www.educative.io/courses/grokking-the-system-design-interview"},
        {"title": "System Design Primer (GitHub)", "type": "BOOK", "url": "https://github.com/donnemartin/system-design-primer"},
    ],
    "Object-Oriented Programming": [
        {"title": "OOP Concepts – GeeksForGeeks", "type": "COURSE", "url": "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/"},
        {"title": "Head First Design Patterns (O'Reilly)", "type": "BOOK", "url": "https://www.oreilly.com/library/view/head-first-design/0596007124/"},
    ],
    "Distributed Systems": [
        {"title": "Designing Data-Intensive Applications (Martin Kleppmann)", "type": "BOOK", "url": "https://dataintensive.net/"},
        {"title": "MIT 6.824 Distributed Systems (YouTube)", "type": "VIDEO", "url": "https://www.youtube.com/playlist?list=PLrw6a1wE39_tb2fErI4-WkMbsvGQk9_UB"},
    ],
    "Java": [
        {"title": "Java Programming Masterclass – Udemy (Tim Buchalka)", "type": "COURSE", "url": "https://www.udemy.com/course/java-the-complete-java-developer-course/"},
        {"title": "Java Documentation – Oracle", "type": "BOOK", "url": "https://docs.oracle.com/en/java/"},
    ],
    "Python": [
        {"title": "Python for Everybody – University of Michigan (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/specializations/python"},
        {"title": "Automate the Boring Stuff with Python (Free Book)", "type": "BOOK", "url": "https://automatetheboringstuff.com/"},
    ],
    "JavaScript": [
        {"title": "The Complete JavaScript Course – Udemy (Jonas Schmedtmann)", "type": "COURSE", "url": "https://www.udemy.com/course/the-complete-javascript-course/"},
        {"title": "JavaScript.info (Free Reference)", "type": "BOOK", "url": "https://javascript.info/"},
    ],
    "TypeScript": [
        {"title": "TypeScript Handbook (Official)", "type": "BOOK", "url": "https://www.typescriptlang.org/docs/handbook/intro.html"},
        {"title": "Understanding TypeScript – Udemy", "type": "COURSE", "url": "https://www.udemy.com/course/understanding-typescript/"},
    ],
    "C++": [
        {"title": "C++ Tutorial for Beginners – freeCodeCamp (YouTube)", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=vLnPwxZdW4Y"},
        {"title": "LeetCode – C++ Practice", "type": "PRACTICE", "url": "https://leetcode.com/"},
    ],
    "C#": [
        {"title": "C# Full Course – freeCodeCamp (YouTube)", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=GhQdlIFylQ8"},
        {"title": "Microsoft C# Documentation", "type": "BOOK", "url": "https://learn.microsoft.com/en-us/dotnet/csharp/"},
    ],
    "Go": [
        {"title": "A Tour of Go (Official)", "type": "COURSE", "url": "https://go.dev/tour/"},
        {"title": "Go by Example", "type": "BOOK", "url": "https://gobyexample.com/"},
    ],
    "SQL": [
        {"title": "SQL for Data Science – UC Davis (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/learn/sql-for-data-science"},
        {"title": "SQLZoo – Interactive SQL Practice", "type": "PRACTICE", "url": "https://sqlzoo.net/"},
    ],
    "Docker": [
        {"title": "Docker & Kubernetes: The Practical Guide – Udemy", "type": "COURSE", "url": "https://www.udemy.com/course/docker-kubernetes-the-practical-guide/"},
        {"title": "Docker Official Documentation", "type": "BOOK", "url": "https://docs.docker.com/"},
    ],
    "Kubernetes": [
        {"title": "Kubernetes for Beginners – KodeKloud (Udemy)", "type": "COURSE", "url": "https://www.udemy.com/course/learn-kubernetes/"},
        {"title": "Kubernetes Official Documentation", "type": "BOOK", "url": "https://kubernetes.io/docs/home/"},
    ],
    "AWS": [
        {"title": "AWS Cloud Practitioner Essentials (AWS Training)", "type": "COURSE", "url": "https://aws.amazon.com/training/learn-about/cloud-practitioner/"},
        {"title": "AWS Well-Architected Framework", "type": "BOOK", "url": "https://aws.amazon.com/architecture/well-architected/"},
    ],
    "Azure": [
        {"title": "Microsoft Azure Fundamentals (AZ-900) – Microsoft Learn", "type": "COURSE", "url": "https://learn.microsoft.com/en-us/training/paths/az-900-describe-cloud-concepts/"},
        {"title": "Azure Architecture Center", "type": "BOOK", "url": "https://learn.microsoft.com/en-us/azure/architecture/"},
    ],
    "Machine Learning": [
        {"title": "Machine Learning Specialization – Andrew Ng (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/specializations/machine-learning-introduction"},
        {"title": "Hands-On Machine Learning with Scikit-Learn & TensorFlow (O'Reilly)", "type": "BOOK", "url": "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/"},
    ],
    "Deep Learning": [
        {"title": "Deep Learning Specialization – Andrew Ng (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/specializations/deep-learning"},
        {"title": "Deep Learning Book (Goodfellow et al.) – Free Online", "type": "BOOK", "url": "https://www.deeplearningbook.org/"},
    ],
    "TensorFlow": [
        {"title": "TensorFlow Developer Certificate – Google (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/professional-certificates/tensorflow-in-practice"},
        {"title": "TensorFlow Official Tutorials", "type": "COURSE", "url": "https://www.tensorflow.org/tutorials"},
    ],
    "PyTorch": [
        {"title": "Deep Learning with PyTorch – Fast.ai", "type": "COURSE", "url": "https://course.fast.ai/"},
        {"title": "PyTorch Official Documentation & Tutorials", "type": "BOOK", "url": "https://pytorch.org/tutorials/"},
    ],
    "NLP": [
        {"title": "Natural Language Processing with Classification – Coursera", "type": "COURSE", "url": "https://www.coursera.org/learn/classification-vector-spaces-in-nlp"},
        {"title": "Speech and Language Processing (Jurafsky & Martin) – Free PDF", "type": "BOOK", "url": "https://web.stanford.edu/~jurafsky/slp3/"},
    ],
    "Data Analysis": [
        {"title": "Data Analysis with Python – IBM (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/learn/data-analysis-with-python"},
        {"title": "Python for Data Analysis (Wes McKinney)", "type": "BOOK", "url": "https://wesmckinney.com/book/"},
    ],
    "Pandas": [
        {"title": "Pandas Documentation – User Guide", "type": "BOOK", "url": "https://pandas.pydata.org/docs/user_guide/"},
        {"title": "Kaggle – Pandas Course (Free)", "type": "COURSE", "url": "https://www.kaggle.com/learn/pandas"},
    ],
    "NumPy": [
        {"title": "NumPy Official Tutorial", "type": "BOOK", "url": "https://numpy.org/doc/stable/user/quickstart.html"},
        {"title": "Scientific Computing with NumPy – Real Python", "type": "COURSE", "url": "https://realpython.com/numpy-tutorial/"},
    ],
    "Scikit-Learn": [
        {"title": "Scikit-Learn Official Tutorials", "type": "BOOK", "url": "https://scikit-learn.org/stable/tutorial/index.html"},
        {"title": "Kaggle – Intro to Machine Learning (Free)", "type": "COURSE", "url": "https://www.kaggle.com/learn/intro-to-machine-learning"},
    ],
    "Statistics": [
        {"title": "Statistics with Python – University of Michigan (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/specializations/statistics-with-python"},
        {"title": "Think Stats 2e (Free Online Book)", "type": "BOOK", "url": "https://greenteapress.com/thinkstats2/html/"},
    ],
    "REST API": [
        {"title": "REST API Design Best Practices – freeCodeCamp", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=NZsUUmosp8A"},
        {"title": "Postman Learning Center – API Fundamentals", "type": "COURSE", "url": "https://learning.postman.com/docs/getting-started/introduction/"},
    ],
    "Microservices": [
        {"title": "Microservices with Spring Boot – Udemy", "type": "COURSE", "url": "https://www.udemy.com/course/microservices-with-spring-boot-and-spring-cloud/"},
        {"title": "Building Microservices (Sam Newman)", "type": "BOOK", "url": "https://www.oreilly.com/library/view/building-microservices-2nd/9781492034018/"},
    ],
    "Spring Boot": [
        {"title": "Spring Boot Full Course – Telusko (YouTube)", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=35EQXmHKZYs"},
        {"title": "Spring Boot Official Documentation", "type": "BOOK", "url": "https://spring.io/projects/spring-boot"},
    ],
    "React": [
        {"title": "React Official Documentation – Quick Start", "type": "BOOK", "url": "https://react.dev/learn"},
        {"title": "The Complete React Developer Course – Udemy (Andrew Mead)", "type": "COURSE", "url": "https://www.udemy.com/course/react-2nd-edition/"},
    ],
    "Git": [
        {"title": "Pro Git (Free Book)", "type": "BOOK", "url": "https://git-scm.com/book/en/v2"},
        {"title": "Learn Git Branching (Interactive)", "type": "PRACTICE", "url": "https://learngitbranching.js.org/"},
    ],
    "Linux": [
        {"title": "Linux Command Line Basics – Udacity (Free)", "type": "COURSE", "url": "https://www.udacity.com/course/linux-command-line-basics--ud595"},
        {"title": "The Linux Command Line (Free Book)", "type": "BOOK", "url": "https://linuxcommand.org/tlcl.php"},
    ],
    "CI/CD": [
        {"title": "CI/CD with GitHub Actions – YouTube Tutorial", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=R8_veQiYBjI"},
        {"title": "GitHub Actions Official Documentation", "type": "BOOK", "url": "https://docs.github.com/en/actions"},
    ],
    "Unit Testing": [
        {"title": "Unit Testing with JUnit 5 – YouTube", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=vZm0lHciFsQ"},
        {"title": "The Art of Unit Testing (Roy Osherove)", "type": "BOOK", "url": "https://www.manning.com/books/the-art-of-unit-testing-third-edition"},
    ],
    "Figma": [
        {"title": "Figma Tutorial for Beginners – freeCodeCamp (YouTube)", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=FTFaQWZBqQ8"},
        {"title": "Figma Official Learning Resources", "type": "COURSE", "url": "https://www.figma.com/resources/learn-design/"},
    ],
    "Wireframing": [
        {"title": "UX Design Process: Wireframing – Coursera", "type": "COURSE", "url": "https://www.coursera.org/learn/wireframe"},
        {"title": "Wireframing Guide – Nielsen Norman Group", "type": "BOOK", "url": "https://www.nngroup.com/articles/wireframing-101/"},
    ],
    "Network Security": [
        {"title": "Google Cybersecurity Certificate (Coursera)", "type": "COURSE", "url": "https://www.coursera.org/professional-certificates/google-cybersecurity"},
        {"title": "CompTIA Security+ Study Guide", "type": "BOOK", "url": "https://www.comptia.org/certifications/security"},
    ],
    "Penetration Testing": [
        {"title": "Ethical Hacking – TCM Security (YouTube)", "type": "VIDEO", "url": "https://www.youtube.com/watch?v=3Kq1MIfTWCE"},
        {"title": "Penetration Testing Execution Standard (PTES)", "type": "BOOK", "url": "http://www.pentest-standard.org/"},
    ],
}

# Default resources when skill is not in the catalog
DEFAULT_RESOURCES = [
    {"title": "Search on Coursera", "type": "COURSE", "url": "https://www.coursera.org/"},
    {"title": "Search on YouTube", "type": "VIDEO", "url": "https://www.youtube.com/"},
]

# Learning objectives per skill
SKILL_OBJECTIVES: dict[str, list[str]] = {
    "Data Structures": ["Arrays, Linked Lists, Stacks, Queues", "Trees, Graphs, Heaps", "Hash Maps and their time complexity"],
    "Algorithms": ["Sorting and searching algorithms", "Dynamic programming fundamentals", "Graph traversal (BFS, DFS)"],
    "System Design": ["Scalability and load balancing", "Database sharding and replication", "CAP theorem and trade-offs"],
    "Object-Oriented Programming": ["SOLID principles", "Design patterns (Singleton, Factory, Observer)", "Inheritance vs Composition"],
    "Distributed Systems": ["Consistency models and consensus", "Fault tolerance and replication", "Message queues and event streaming"],
    "Java": ["OOP in Java – classes, interfaces, generics", "Java Collections Framework", "Java concurrency and streams"],
    "Python": ["Python syntax and data structures", "File I/O and standard library", "Python OOP and modules"],
    "SQL": ["SELECT, JOIN, GROUP BY fundamentals", "Indexes and query optimization", "Transactions and ACID properties"],
    "Docker": ["Containers vs virtual machines", "Dockerfile authoring and image layers", "Docker Compose for multi-service apps"],
    "Kubernetes": ["Pods, Deployments, Services", "ConfigMaps, Secrets, Namespaces", "Horizontal Pod Autoscaling"],
    "AWS": ["Core services: EC2, S3, RDS, Lambda", "IAM roles and security best practices", "AWS CLI and infrastructure as code"],
    "Machine Learning": ["Supervised vs unsupervised learning", "Model evaluation: precision, recall, F1", "Feature engineering and cross-validation"],
    "REST API": ["HTTP methods, status codes, headers", "RESTful resource design principles", "Authentication: JWT and OAuth2"],
    "Git": ["Branching strategies (GitFlow)", "Merge vs rebase", "Pull requests and code review workflow"],
    "React": ["Component lifecycle and hooks", "State management with useState and useContext", "React Router and API integration"],
}

DEFAULT_OBJECTIVES = ["Study core concepts and fundamentals", "Build a hands-on project to apply the skill", "Review common interview questions on the topic"]

# Estimated hours per skill (focused study)
SKILL_HOURS: dict[str, int] = {
    "System Design": 25, "Data Structures": 20, "Algorithms": 20, "Java": 18,
    "Machine Learning": 24, "Deep Learning": 24, "AWS": 15, "Docker": 12,
    "Kubernetes": 14, "SQL": 10, "Python": 15, "React": 16,
}
DEFAULT_HOURS = 12


def _get_priority(skill: str) -> str:
    return SKILL_PRIORITY.get(skill.lower(), "MEDIUM")


def _get_resources(skill: str) -> list[dict]:
    return SKILL_RESOURCES.get(skill, DEFAULT_RESOURCES)


def _get_objectives(skill: str) -> list[str]:
    return SKILL_OBJECTIVES.get(skill, DEFAULT_OBJECTIVES)


def _get_hours(skill: str) -> int:
    return SKILL_HOURS.get(skill, DEFAULT_HOURS)


def _make_reason(skill: str, target_role: str, priority: str) -> str:
    role_display = target_role.replace("_", " ").title()
    if priority == "HIGH":
        return f"{skill} is a high-priority requirement for {role_display} and is frequently tested in interviews."
    elif priority == "MEDIUM":
        return f"{skill} is commonly required for {role_display} roles and will significantly strengthen your profile."
    else:
        return f"{skill} is an additional skill that will differentiate you as a {role_display} candidate."


def generate_roadmap(
    missing_skills: list[str],
    target_role: str,
    requirement_source: str,
) -> dict:
    """
    Generates a structured, week-wise learning roadmap from a list of missing skills.

    Args:
        missing_skills: Skills the user needs to learn (from M6 gap analysis).
        target_role: The user's target role key (e.g. "software_engineer").
        requirement_source: Human-readable source label (e.g. "Google – Software Engineer").

    Returns:
        Structured roadmap dict with phases, resources, priorities, and weekly schedule.
    """
    if not missing_skills:
        return {
            "targetRole": target_role.replace("_", " ").title(),
            "requirementSource": requirement_source,
            "totalWeeks": 0,
            "totalPhases": 0,
            "phases": [],
            "message": "No skill gaps found. Your resume already covers all required skills!",
        }

    # Sort skills by priority: HIGH → MEDIUM → LOW
    sorted_skills = sorted(
        missing_skills,
        key=lambda s: PRIORITY_ORDER.get(_get_priority(s), 1)
    )

    phases = []
    phase_number = 1

    for i in range(0, len(sorted_skills), 2):
        group = sorted_skills[i:i + 2]  # Up to 2 skills per 2-week phase

        week_start = (phase_number - 1) * 2 + 1
        week_end = week_start + 1

        if len(group) == 1:
            skill = group[0]
            phase_title = skill
            phase_description = f"Focus on mastering {skill} in this phase."
        else:
            skill = group[0]          # primary skill for this phase
            secondary = group[1]      # secondary
            phase_title = f"{skill} + {secondary}"
            phase_description = f"Master {skill} as the primary skill, then begin {secondary} alongside it."

        priority = _get_priority(skill)

        phases.append({
            "phaseNumber": phase_number,
            "weekRange": f"Week {week_start}–{week_end}",
            "title": phase_title,
            "primarySkill": skill,
            "skills": group,
            "priority": priority,
            "reason": _make_reason(skill, target_role, priority),
            "description": phase_description,
            "learningObjectives": _get_objectives(skill),
            "resources": _get_resources(skill),
            "estimatedHours": sum(_get_hours(s) for s in group),
        })

        phase_number += 1

    total_weeks = (phase_number - 1) * 2
    total_hours = sum(p["estimatedHours"] for p in phases)

    return {
        "targetRole": target_role.replace("_", " ").title(),
        "requirementSource": requirement_source,
        "totalWeeks": total_weeks,
        "totalPhases": len(phases),
        "estimatedTotalHours": total_hours,
        "phases": phases,
        "message": None,
    }
