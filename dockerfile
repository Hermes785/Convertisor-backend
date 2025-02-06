FROM node:16-alpine

WORKDIR /app

COPY .env ./

COPY package*.json ./


RUN npm install

COPY . . 

EXPOSE 5500

CMD ["npm", "start"]
