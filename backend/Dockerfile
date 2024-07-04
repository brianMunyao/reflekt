FROM node:20-alpine

WORKDIR /app/backend

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5000

CMD [ "sh", "-c", "npm run migrate && npm start" ]