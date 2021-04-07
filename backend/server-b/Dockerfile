FROM node:15-alpine

ENV NODE_ENV=production

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

CMD yarn start
