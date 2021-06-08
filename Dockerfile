FROM node:14-alpine

RUN mkdir /app
COPY yarn.lock /app
COPY package.json /app
WORKDIR /app

RUN NODE_ENV=production yarn install
COPY . /app
COPY ./docker-entrypoint.sh /docker-entrypoint.sh
CMD /docker-entrypoint.sh
