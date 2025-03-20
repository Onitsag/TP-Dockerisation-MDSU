FROM node:18-bullseye-slim
WORKDIR /app

RUN apt-get update && apt-get install -y libssl1.1 dos2unix

COPY package*.json ./
RUN npm install

COPY . .

# Convertir les fins de ligne CRLF -> LF
RUN dos2unix wait-for-it.sh
RUN chmod +x wait-for-it.sh

RUN npx prisma generate

EXPOSE 5000
CMD ["npm", "start"]
