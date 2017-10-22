#!/bin/bash

control_c()
# run if user hits control-c
{
  echo -en "\nStopping the Web Server and the REST Service\n"
  kill -9 $(lsof -t -i:5000)
  exit
}

trap control_c SIGINT

cd service
mkdir -p lists
pip install --user -r requirements.txt
./service.py &
cd ../front-end
npm install && npm start






