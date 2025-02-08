FROM node:16-alpine

WORKDIR /app

COPY .env ./

COPY package*.json ./


RUN npm install

RUN npm install @aws-sdk/client-ec2


COPY . . 

EXPOSE 5500

CMD ["npm", "start"]
