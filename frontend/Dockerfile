# frontend/Dockerfile

# --- Étape 1 : Build de l'application ---
FROM node:18-alpine AS builder
WORKDIR /app

# Installer les dépendances
COPY package*.json ./
RUN npm install

# Copier tout le code et builder l'application
COPY . .
RUN npm run build

# --- Étape 2 : Serveur Nginx pour le frontend ---
FROM nginx:alpine
# Copier le build dans le dossier de Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copier la configuration Nginx pour un Single Page Application (SPA)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
