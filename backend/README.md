# Career Ready – Spring Boot Backend

## Requirements
- Java 21 (JDK)
- No Maven installation needed — uses Maven Wrapper

## Maven Wrapper

This project uses the **Maven Wrapper** (`mvnw` / `mvnw.cmd`), which automatically downloads
Apache Maven 3.9.6 on first run. You do **not** need Maven installed globally.

### First Run (downloads Maven + all dependencies ~150MB)

**Windows:**
```powershell
.\mvnw.cmd clean install -DskipTests
```

**Unix / macOS:**
```bash
chmod +x mvnw
./mvnw clean install -DskipTests
```

### Run the Application

**Windows:**
```powershell
.\mvnw.cmd spring-boot:run
```

**Unix / macOS:**
```bash
./mvnw spring-boot:run
```

Runs at: `http://localhost:8080`  
Swagger UI: `http://localhost:8080/swagger-ui.html`

## Environment Variables

Copy `.env.example` to `.env` and fill in all values before running.

| Variable | Description |
|----------|-------------|
| `DB_URL` | Supabase PostgreSQL JDBC URL |
| `DB_USERNAME` | Database username |
| `DB_PASSWORD` | Database password |
| `JWT_SECRET` | 256-bit secret for JWT signing |
| `JWT_ACCESS_EXPIRY_MS` | Access token expiry (default: 900000 = 15 min) |
| `JWT_REFRESH_EXPIRY_MS` | Refresh token expiry (default: 604800000 = 7 days) |
| `AI_SERVICE_URL` | FastAPI AI service URL (default: http://localhost:8000) |

## Maven Wrapper Files

| File | Purpose |
|------|---------|
| `mvnw` | Unix shell script |
| `mvnw.cmd` | Windows batch script |
| `.mvn/wrapper/maven-wrapper.jar` | Wrapper JAR (committed to source control) |
| `.mvn/wrapper/maven-wrapper.properties` | Maven version config (3.9.6) |

## Common Commands

```powershell
# Build (skip tests)
.\mvnw.cmd clean install -DskipTests

# Run tests
.\mvnw.cmd test

# Run application
.\mvnw.cmd spring-boot:run

# Package as JAR
.\mvnw.cmd package -DskipTests
```
