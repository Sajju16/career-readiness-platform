# AI-Based Career Readiness & Skill Gap Analysis using NLP

> **Final Year Project** · Full-Stack AI Application  
> Stack: React + Vite · Spring Boot · FastAPI · Supabase PostgreSQL

---

## Project Structure

```
Final year project/
├── frontend/          React + Vite + Tailwind + shadcn/ui
├── backend/           Spring Boot + Spring Security + JPA
├── ai-service/        Python FastAPI + spaCy + SentenceTransformers
└── README.md
```

---

## Running Locally

### Prerequisites

| Tool | Version |
|------|---------|
| Node.js | v18+ |
| Java | 21 |
| Python | 3.12+ |
| Maven | 3.9+ |

---

### 1. Frontend

```bash
cd frontend
cp .env.example .env          # Fill in VITE_API_BASE_URL
npm install
npm run dev                   # Runs at http://localhost:5173
```

---

### 2. Backend

```bash
cd backend
cp .env.example .env          # Fill in DB credentials and JWT secret
```

**Windows (PowerShell):**
```powershell
.\mvnw.cmd clean install -DskipTests   # First run: downloads Maven 3.9.6 automatically
.\mvnw.cmd spring-boot:run             # Runs at http://localhost:8080
```

**Unix / macOS:**
```bash
chmod +x mvnw
./mvnw clean install -DskipTests
./mvnw spring-boot:run                 # Runs at http://localhost:8080
```

> **First run note**: Maven Wrapper downloads Apache Maven 3.9.6 (~10MB) and all Spring Boot
> dependencies (~150MB) to `~/.m2/`. Subsequent runs are instant.

API Docs: http://localhost:8080/swagger-ui.html

---

### 3. AI Service

```bash
cd ai-service
cp .env.example .env
python -m venv venv
venv\Scripts\activate         # Windows
pip install -r requirements.txt
python -m spacy download en_core_web_md
uvicorn app.main:app --reload --port 8000
```

AI Docs: http://localhost:8000/docs

---

## Development Milestones

| # | Milestone | Status |
|---|-----------|--------|
| M1 | Project Setup & Auth Foundation | ✅ In Progress |
| M2 | Core User Flows | ⬜ Pending |
| M3 | AI Service Foundation (NLP) | ⬜ Pending |
| M4 | Skill Gap Analysis Engine | ⬜ Pending |
| M5 | Roadmap Generation | ⬜ Pending |
| M6 | Frontend Integration & UI | ⬜ Pending |
| M7 | Testing & Security | ⬜ Pending |
| M8 | Deployment & Documentation | ⬜ Pending |

---

## Pages

| Page | Route | Status |
|------|-------|--------|
| Landing | `/` | ✅ Placeholder |
| Login | `/login` | ✅ Placeholder |
| Register | `/register` | ✅ Placeholder |
| Dashboard | `/dashboard` | ✅ Placeholder |
| Career Goal | `/career-goal` | ✅ Placeholder |
| Resume Upload | `/resume-upload` | ✅ Placeholder |
| Analysis Report | `/analysis-report` | ✅ Placeholder |
| Learning Roadmap | `/roadmap` | ✅ Placeholder |
| Profile | `/profile` | ✅ Placeholder |
