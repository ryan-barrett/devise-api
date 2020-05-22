#!/bin/bash

if (! docker stats --no-stream ); then
  echo "Docker must be running"
  exit 1
fi

npm i # install packages to give access to types
[ -x "$(command -v tsc)" ] || npm i -g typescript; # install typescript if you don't have it
[ ! -d "./dist" ] && mkdir dist # create dist if it doesn't exist
tsc # compile typescript to JS
docker build -t ryanbarrett1/sudoku . # build docker image
