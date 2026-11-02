# Multi-stage production build for Abhivyakti Frontend
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production web server
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY Nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
