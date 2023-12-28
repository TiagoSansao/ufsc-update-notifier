FROM node:18-alpine

RUN mkdir /app && chown node:node /app

USER node

COPY . /app/

WORKDIR /app

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]