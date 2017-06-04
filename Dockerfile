FROM node:7-alpine

COPY . /usr/src/app
WORKDIR /usr/src/app
EXPOSE 3000
ENV NODE_ENV production

RUN npm install && npm run bundle:prod

CMD node server/src/index.js

