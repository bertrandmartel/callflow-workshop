FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install -g serve
RUN npm install

ENV SERVER_PORT=5000

RUN npm run build

CMD npm run serve
