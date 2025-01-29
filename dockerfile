FROM frolvlad/alpine-glibc:latest

WORKDIR /app

COPY .env ./
COPY package*.json ./

# Installer les dépendances sans soucis de conflit
RUN npm install

COPY . .

EXPOSE 5500

CMD ["npm", "start"]
