#!/bin/bash

[ -x "$(command -v tsc)" ] || npm i -g typescript; # install typescript if you don't have it
[ ! -d "./dist" ] && mkdir dist # create dist if it doesn't exist
tsc # compile typescript to JS
docker build -t ryanbarrett1/sudoku . # build docker image
