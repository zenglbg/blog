FROM node:10

EXPOSE 9998

COPY ./server/package.json package.json

RUN yarn

COPY ./server/. .

RUN yarn build

CMD [ "node" ,  'build/'  ]


