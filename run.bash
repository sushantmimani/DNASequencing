#!/bin/bash

cd service
pip install --user -r requirements.txt
./service.py &
cd ../front-end
npm start
