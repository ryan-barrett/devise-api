#!/bin/bash

cd terraform
terraform init -input=false
terraform apply -input=false -auto-approve
cd ..
