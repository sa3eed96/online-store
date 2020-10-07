FROM node:12-alpine as base
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY . .
EXPOSE 3000

FROM base as production
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install --production \
    && apk del .gyp
CMD ["start"]
ENTRYPOINT ["npm","run"]

FROM base as development
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
CMD ["dev"]
ENTRYPOINT ["npm","run"]