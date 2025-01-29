FROM node:20-bullseye  

WORKDIR /app

COPY .env ./

COPY package*.json ./

RUN apt update && apt install -y \
    libc6 \
    libstdc++6 \
    libx11-6 \
    libxext6 \
    libxrender1 \
    libxfixes3 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

RUN npm install

COPY . .

EXPOSE 5500

CMD ["npm", "start"]
