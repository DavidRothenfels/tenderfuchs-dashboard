# Tenderfuchs Dashboard

Ein Dashboard basierend auf React und PocketBase.

## Deployment

### GitHub Secrets einrichten

Vor dem ersten Deployment müssen folgende GitHub Secrets eingerichtet werden:

1. Gehe zu den Repository-Einstellungen
2. Navigiere zu "Secrets and variables" -> "Actions"
3. Füge folgende Secrets hinzu:
   - `ADMIN_EMAIL`: Die E-Mail-Adresse für den PocketBase Admin-Account
   - `ADMIN_PASSWORD`: Das Passwort für den PocketBase Admin-Account

### Container starten

```bash
# Container von GitHub Container Registry ziehen
docker pull ghcr.io/davidrothenfels/tenderfuchs-dashboard:latest

# Container starten
docker run -d \
  -p 80:80 \
  -p 8090:8090 \
  -e ADMIN_EMAIL=your-email@example.com \
  -e ADMIN_PASSWORD=your-secure-password \
  ghcr.io/davidrothenfels/tenderfuchs-dashboard:latest
```

## Ports

- `80`: Frontend (Nginx)
- `8090`: PocketBase API

## Erstmaliges Setup

Beim ersten Start des Containers wird automatisch:
1. Ein PocketBase Admin-Account mit den angegebenen Credentials erstellt
2. Die Basis-Konfiguration vorgenommen

Die Zugangsdaten können über Umgebungsvariablen beim Start des Containers überschrieben werden.