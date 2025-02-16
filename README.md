# Tenderfuchs Dashboard

Ein Dashboard basierend auf React und PocketBase.

## Deployment

### GitHub Actions

Das Projekt verwendet GitHub Actions für automatisierte Docker-Builds. Bei jedem Push auf den master Branch wird ein All-in-One Docker Image erstellt und in die GitHub Container Registry (ghcr.io) gepusht.

### Coolify Integration

Um die Anwendung in Coolify zu deployen:

1. Fügen Sie ein neues Service in Coolify hinzu
2. Wählen Sie "Container from Registry"
3. Verwenden Sie die Image-URL: `ghcr.io/[username]/pocketbase2:latest`
4. Konfigurieren Sie die Umgebungsvariablen (siehe unten)

### Umgebungsvariablen

Der Container benötigt folgende Umgebungsvariablen:

#### PocketBase Konfiguration
- `ADMIN_EMAIL`: Admin E-Mail für PocketBase
- `ADMIN_PASSWORD`: Admin Passwort für PocketBase

#### Sprachmodell Konfiguration
- `REACT_APP_OPENAI_API_KEY`: API-Schlüssel für das Sprachmodell
- `REACT_APP_LLM_MODEL`: Zu verwendendes Modell (optional)
- `REACT_APP_LLM_API_URL`: API-URL des Sprachmodells (optional)

Der Provider wird automatisch anhand der API-URL erkannt:

**OpenAI** (Standard)
- API-URL: https://api.openai.com/v1
- Verfügbare Modelle: gpt-3.5-turbo (Standard), gpt-4

**Groq**
- API-URL: https://api.groq.com/v1
- Verfügbare Modelle: mixtral-8x7b-32768 (Standard), llama2-70b-4096

### Container starten

```bash
# Container von GitHub Container Registry ziehen
docker pull ghcr.io/[username]/pocketbase2:latest

# Container starten mit OpenAI
docker run -d \
  -p 80:80 \
  -p 8090:8090 \
  -e ADMIN_EMAIL=your-email@example.com \
  -e ADMIN_PASSWORD=your-secure-password \
  -e REACT_APP_OPENAI_API_KEY=sk-your-api-key \
  -e REACT_APP_LLM_MODEL=gpt-3.5-turbo \
  ghcr.io/[username]/pocketbase2:latest

# Oder mit Groq
docker run -d \
  -p 80:80 \
  -p 8090:8090 \
  -e ADMIN_EMAIL=your-email@example.com \
  -e ADMIN_PASSWORD=your-secure-password \
  -e REACT_APP_OPENAI_API_KEY=gsk-your-api-key \
  -e REACT_APP_LLM_API_URL=https://api.groq.com/v1 \
  -e REACT_APP_LLM_MODEL=mixtral-8x7b-32768 \
  ghcr.io/[username]/pocketbase2:latest
```

## Features

- Benutzerauthentifizierung
- Dashboard-Übersicht
- KI-Assistent
  - Automatische Provider-Erkennung (OpenAI, Groq)
  - Konfigurierbare Modelle
  - Flexibles Provider-System für zukünftige Erweiterungen

## Ports

- `80`: Frontend (Nginx)
- `8090`: PocketBase API

## Architektur

Der Container vereint alle Komponenten in einer einzigen Laufzeitumgebung:

1. **Nginx** (Port 80)
   - Serviert das statische Frontend
   - Injiziert Umgebungsvariablen via /env.js
   - Leitet API-Anfragen an PocketBase weiter

2. **PocketBase** (Port 8090)
   - Stellt die API bereit
   - Bietet das Admin-Dashboard unter `/admin`

## Entwicklung

Für die lokale Entwicklung:

1. Erstellen Sie eine `.env` Datei im `frontend` Verzeichnis:
```env
# Für OpenAI
REACT_APP_OPENAI_API_KEY=sk-your-api-key
REACT_APP_LLM_MODEL=gpt-3.5-turbo

# Oder für Groq
REACT_APP_OPENAI_API_KEY=gsk-your-api-key
REACT_APP_LLM_API_URL=https://api.groq.com/v1
REACT_APP_LLM_MODEL=mixtral-8x7b-32768
```

2. Starten Sie die Entwicklungsumgebung:
```bash
cd frontend
npm install
npm start