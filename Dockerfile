FROM node:18-alpine as frontend-builder

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

FROM alpine:latest

# Install PocketBase
ADD https://github.com/pocketbase/pocketbase/releases/download/v0.19.4/pocketbase_0.19.4_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/ && \
    rm /tmp/pb.zip

# Install nginx
RUN apk add --no-cache nginx

# Copy frontend build
COPY --from=frontend-builder /app/frontend/build /usr/share/nginx/html
COPY frontend/nginx.conf /etc/nginx/http.d/default.conf

# Copy PocketBase data (if exists)
COPY pb_data /pb/pb_data

EXPOSE 80 8090

# Start both nginx and PocketBase
COPY docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["/docker-entrypoint.sh"]