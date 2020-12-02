FROM node:12-alpine

WORKDIR /usr/local/weather

RUN chmod -R 777 /usr/local/weather

COPY package.json ./

COPY . ./

RUN npm install

RUN npm run build

EXPOSE 50051

CMD ["npm", "run", "start:prod"]