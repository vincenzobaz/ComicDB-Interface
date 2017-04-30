FROM node:7-alpine

COPY . /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000

RUN npm install && npm start