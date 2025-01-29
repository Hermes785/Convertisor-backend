FROM node:16-alpine

WORKDIR /app

COPY .env ./

COPY package*.json ./

#  étape pour supprimer le fichier en conflit
RUN rm -f /etc/nsswitch.conf

RUN wget -q -O /etc/apk/keys/sgerrand.rsa.pub https://alpine-pkgs.sgerrand.com/sgerrand.rsa.pub \
    && wget https://github.com/sgerrand/alpine-pkg-glibc/releases/download/2.35-r0/glibc-2.35-r0.apk \
    && apk add glibc-2.35-r0.apk

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
