#!/bin/bash
sudo apt-get install python3-venv
python3 -m venv env
source env/bin/activate
pip3 install -r requirements.txt
cd predly-frontend
npm install
cd ..
loc=pwd
gnome-terminal --working-direcory=$loc -e 'cd predly-fronend && npm start'
cd predly-backend
python3 app.py

