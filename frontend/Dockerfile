FROM node:20-alpine

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
COPY --from=0 /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]