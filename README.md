# Tenderfuchs Dashboard

Ein Dashboard basierend auf React und PocketBase.

## Deployment

### GitHub Actions

Das Projekt verwendet GitHub Actions für automatisierte Docker-Builds. Bei jedem Push auf den main Branch wird ein All-in-One Docker Image erstellt und in die GitHub Container Registry (ghcr.io) gepusht.

### Coolify Integration

Um die Anwendung in Coolify zu deployen:

1. Fügen Sie ein neues Service in Coolify hinzu
2. Wählen Sie "Container from Registry"
3. Verwenden Sie die Image-URL: `ghcr.io/[username]/pocketbase2:latest`
4. Konfigurieren Sie die erforderlichen Umgebungsvariablen (siehe unten)

### GitHub Secrets einrichten

Vor dem ersten Deployment müssen folgende GitHub Secrets eingerichtet werden:

1. Gehe zu den Repository-Einstellungen
2. Navigiere zu "Secrets and variables" -> "Actions"
3. Füge folgende Secrets hinzu:
   - `ADMIN_EMAIL`: Die E-Mail-Adresse für den PocketBase Admin-Account
   - `ADMIN_PASSWORD`: Das Passwort für den PocketBase Admin-Account
   - `REACT_APP_OPENAI_API_KEY`: OpenAI API-Schlüssel für die KI-Funktionen

### Umgebungsvariablen

Der Container benötigt folgende Umgebungsvariablen:

- `ADMIN_EMAIL`: Admin E-Mail für PocketBase
- `ADMIN_PASSWORD`: Admin Passwort für PocketBase
- `REACT_APP_OPENAI_API_KEY`: OpenAI API-Schlüssel

### Container starten

```bash
# Container von GitHub Container Registry ziehen
docker pull ghcr.io/[username]/pocketbase2:latest

# Container starten
docker run -d \
  -p 80:80 \
  -p 8090:8090 \
  -e ADMIN_EMAIL=your-email@example.com \
  -e ADMIN_PASSWORD=your-secure-password \
  -e REACT_APP_OPENAI_API_KEY=your-openai-api-key \
  ghcr.io/[username]/pocketbase2:latest
```

## Features

- Benutzerauthentifizierung
- Dashboard-Übersicht
- KI-Assistent (powered by OpenAI)
  - Intelligente Textgenerierung
  - Kontextsensitive Antworten
  - Flexibles LLM-Provider-System für zukünftige Erweiterungen

## Ports

- `80`: Frontend (Nginx)
- `8090`: PocketBase API

## Erstmaliges Setup

Beim ersten Start des Containers wird automatisch:
1. Ein PocketBase Admin-Account mit den angegebenen Credentials erstellt
2. Die Basis-Konfiguration vorgenommen

Die Zugangsdaten können über Umgebungsvariablen beim Start des Containers überschrieben werden.