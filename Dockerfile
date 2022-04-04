FROM node:14-alpine

WORKDIR /root

COPY package.json package.json

RUN yarn cache clean --force    

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 4000

ARG NODE_ENV=$NODE_ENV
ENV NODE_ENV ${NODE_ENV}

CMD ["yarn", "start:prod"]
