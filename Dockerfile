FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./

# Build-Zeit Umgebungsvariablen
ARG REACT_APP_OPENAI_API_KEY
ENV REACT_APP_OPENAI_API_KEY=$REACT_APP_OPENAI_API_KEY

RUN npm run build

FROM alpine:latest

# Install PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.19.4/pocketbase_0.19.4_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/ && \
    rm /tmp/pb.zip

# Install nginx and curl (für Setup-Script)
RUN apk add --no-cache nginx curl

# Copy frontend build
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/http.d/default.conf

# Create PocketBase data directory
RUN mkdir -p /pb/pb_data

# Copy setup and entrypoint scripts
COPY pb_setup.sh /pb/
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh /pb/pb_setup.sh

# Default Admin Credentials (sollten bei Deployment überschrieben werden)
ENV ADMIN_EMAIL=admin@example.com
ENV ADMIN_PASSWORD=changeme123

EXPOSE 80 8090

ENTRYPOINT ["/docker-entrypoint.sh"]