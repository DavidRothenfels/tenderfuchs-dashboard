# Build-Phase
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Produktions-Phase
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
# Nginx-Konfiguration für React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 3000
CMD ["nginx", "-g", "daemon off;"]