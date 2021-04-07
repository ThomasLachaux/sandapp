FROM node:15-alpine

ENV NODE_ENV=production

ARG VITE_API_URL

WORKDIR /opt/app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

EXPOSE 8080

# We reduce the log level because the docker compose version does not support UTF-8 chars that vite displays
RUN yarn build --logLevel warn

CMD yarn serve
