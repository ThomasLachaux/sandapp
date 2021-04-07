FROM node:15-alpine

ARG VITE_API_URL

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8080

RUN yarn build

CMD yarn serve
