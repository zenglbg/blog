FROM node:10

EXPOSE 9998
ENV NODE_ENV='production'




RUN mkdir -p /server
WORKDIR /server


COPY ./server/. .

RUN rm -rf yarn*

RUN yarn

RUN yarn global add typescript

RUN tsc
# CMD yarn loc
# CMD [ "yarn", "server" ]
CMD  node build/index.js


