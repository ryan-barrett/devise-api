#!/bin/bash

# get rid of the container if it already exists
if [[ "$(docker images -q myimage:sudoku 2> /dev/null)" == "" ]]; then
  docker kill /sudoku
  docker rm /sudoku
fi

docker run -d --name sudoku -p 8080:8080 ryanbarrett1/sudoku
