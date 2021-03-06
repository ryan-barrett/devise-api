FROM node:12
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY ./dist .
EXPOSE 8080
ARG COUCHBASE_URL
ARG PORT
ARG CB_USERNAME
ARG CB_PASSWORD
ENV PORT=$PORT
ENV CB_USERNAME=$CB_USERNAME
ENV CB_PASSWORD=$CB_PASSWORD
ENV COUCHBASE_URL=$COUCHBASE_URL
CMD [ "node", "index.js" ]
