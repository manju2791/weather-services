FROM node:12-alpine

WORKDIR /usr/local/gateway

RUN chmod -Rc 777 /usr/local/gateway

COPY package.json ./

COPY . ./

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start:prod"]