FROM node:10

COPY ./server/. /app

WORKDIR "/app"

RUN yarn

EXPOSE 9998

CMD [ "npm" ,  'dev'  ]


