#!/bin/bash

if (! docker stats --no-stream); then
  echo "Docker must be running"
  exit 1
fi

source .env
export $(cut -d= -f1 .env)

# install packages to give access to types
npm i
# install typescript if you don't have it
[ -x "$(command -v tsc)" ] || npm i -g typescript
# create dist if it doesn't exist
[ ! -d "./dist" ] && mkdir dist
# compile typescript to JS
tsc
# build docker image
docker build -t ryanbarrett1/devise --build-arg COUCHBASE_URL=${COUCHBASE_URL} --build-arg PORT=${PORT} --build-arg CB_USERNAME=${CB_USERNAME} --build-arg CB_PASSWORD=${CB_PASSWORD} .
