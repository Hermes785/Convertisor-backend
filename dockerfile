FROM node:16-alpine

WORKDIR /app

COPY .env ./

COPY package*.json ./

RUN apk add --no-cache \
    gcompat \
    libc6-compat \
    libstdc++ \
    libx11 \
    libxext \
    libxrender \
    libxfixes \
    glib \
    binutils \
    musl \
    linux-headers

RUN npm install

COPY . .

EXPOSE 5500

CMD ["npm", "start"]
