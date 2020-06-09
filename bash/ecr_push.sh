#!/bin/bash

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 846799957903.dkr.ecr.us-west-2.amazonaws.com
docker build -t devise_repo .
docker tag devise_repo:latest 846799957903.dkr.ecr.us-west-2.amazonaws.com/devise_repo:latest
docker push 846799957903.dkr.ecr.us-west-2.amazonaws.com/devise_repo:latest
