FROM node:12-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
    && npm install \
    && apk del .gyp
COPY . .
EXPOSE 3000
CMD ["dev"]
ENTRYPOINT ["npm","run"]