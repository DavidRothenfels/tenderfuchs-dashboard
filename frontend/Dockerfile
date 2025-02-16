FROM node:20-alpine AS builder

WORKDIR /app

# Kopiere package.json und package-lock.json
COPY package*.json ./

# Installiere Dependencies
RUN npm ci

# Kopiere den Rest der Anwendung
COPY . .

# Baue die Anwendung
RUN npm run build

# Produktions-Image
FROM nginx:alpine

# Kopiere das Build und die nginx Konfiguration
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Setze Standard-URL falls keine Umgebungsvariable gesetzt ist
ENV REACT_APP_POCKETBASE_URL=https://pocketbase.tenderfuchs.de

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]