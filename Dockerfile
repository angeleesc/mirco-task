FROM node:16.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npx playwright install

COPY . .

CMD [ "npm","start"]