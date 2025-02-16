FROM node:20-alpine AS builder

WORKDIR /app

# Build-Argumente für Umgebungsvariablen
ARG REACT_APP_POCKETBASE_URL
ARG REACT_APP_OPENAI_API_KEY
ARG REACT_APP_LLM_MODEL
ARG REACT_APP_LLM_API_URL

ENV REACT_APP_POCKETBASE_URL=$REACT_APP_POCKETBASE_URL
ENV REACT_APP_OPENAI_API_KEY=$REACT_APP_OPENAI_API_KEY
ENV REACT_APP_LLM_MODEL=$REACT_APP_LLM_MODEL
ENV REACT_APP_LLM_API_URL=$REACT_APP_LLM_API_URL

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Produktions-Image
FROM nginx:alpine

# Kopiere das Build und die nginx Konfiguration
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Setze Umgebungsvariable für nginx
ENV REACT_APP_POCKETBASE_URL=$REACT_APP_POCKETBASE_URL

# Ersetze Umgebungsvariablen in der nginx Konfiguration und starte nginx
CMD ["/bin/sh", "-c", "envsubst '${REACT_APP_POCKETBASE_URL}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]