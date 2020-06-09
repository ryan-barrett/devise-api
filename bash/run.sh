#!/bin/bash

# kill the container if it is running
if [ "$(docker inspect -f '{{.State.Running}}' devise 2>/dev/null)" = "true" ]; then
    docker kill /devise;
fi

# get rid of the container if it already exists
if [[ "$(docker images -q myimage:devise 2> /dev/null)" == "" ]]; then
  docker rm /devise
fi

docker run -d --name devise -p 8080:8080 ryanbarrett1/devise # run in docker
sleep 1s
/usr/bin/open -a "/Applications/Google Chrome.app" 'http://localhost:8080/graphql'
