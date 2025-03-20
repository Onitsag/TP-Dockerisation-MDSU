# backend/Dockerfile
FROM node:18-bullseye-slim
WORKDIR /app

# Installer libssl1.1 (disponible sur Bullseye)
RUN apt-get update && apt-get install -y libssl1.1

COPY package*.json ./
RUN npm install

COPY . .

# Copier le script wait-for-it.sh et le rendre exécutable
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh

# Générer le client Prisma
RUN npx prisma generate

EXPOSE 5000
CMD ["npm", "start"]
