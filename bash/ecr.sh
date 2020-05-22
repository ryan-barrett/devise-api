#!/bin/bash

aws ecr get-login-password --region us-west-2 | docker login --username AWS --password-stdin 846799957903.dkr.ecr.us-west-2.amazonaws.com
docker build -t sudoku_repo .
docker tag sudoku_repo:latest 846799957903.dkr.ecr.us-west-2.amazonaws.com/sudoku_repo:latest
docker push 846799957903.dkr.ecr.us-west-2.amazonaws.com/sudoku_repo:latest