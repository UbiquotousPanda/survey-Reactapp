FROM node:22-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN node server/index.js

EXPOSE 5173

CMD [ "npm", "run", "dev" ]