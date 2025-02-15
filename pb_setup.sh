#!/bin/sh

# Warte bis PocketBase gestartet ist
sleep 5

# Prüfe ob Setup bereits durchgeführt wurde
if [ ! -f "/pb/pb_data/.setup_done" ]; then
    echo "Führe initiales PocketBase Setup durch..."
    
    # Erstelle Admin Account
    # Credentials werden über Umgebungsvariablen gesetzt
    curl -X POST "http://127.0.0.1:8090/api/admins" \
        -H "Content-Type: application/json" \
        -d "{\"email\":\"${ADMIN_EMAIL}\",\"password\":\"${ADMIN_PASSWORD}\",\"passwordConfirm\":\"${ADMIN_PASSWORD}\"}"

    # Markiere Setup als abgeschlossen
    touch "/pb/pb_data/.setup_done"
    echo "PocketBase Setup abgeschlossen."
else
    echo "PocketBase Setup bereits durchgeführt."
fi