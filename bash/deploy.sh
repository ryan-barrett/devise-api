#!/bin/bash

cd terraform || exit
terraform init -input=false
terraform apply -input=false -auto-approve
cd ..
