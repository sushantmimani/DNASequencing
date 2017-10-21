#!/bin/bash

cd service
mkdir lists
pip install --user -r requirements.txt
./service.py &
cd ../front-end
npm install && npm start
