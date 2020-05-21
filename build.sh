#!/bin/bash

[ -x "$(command -v tsc)" ] || npm i -g typescript; # install typescript if you don't have it
[ ! -d "./dist" ] && mkdir dist # create dist if it doesn't exist
tsc # compile typescript to JS
docker build -t ryanbarrett1/sudoku . # build docker image

# kill the container if it is running
if [ "$(docker inspect -f '{{.State.Running}}' sudoku 2>/dev/null)" = "true" ]; then
    docker kill /sudoku;
fi

# get rid of the container if it already exists
if [[ "$(docker images -q myimage:sudoku 2> /dev/null)" == "" ]]; then
  docker rm /sudoku
fi

docker run -d --name sudoku -p 8080:8080 ryanbarrett1/sudoku # run in docker
