#!/bin/bash
echo "Starting services as background processes..."
cd /opt/ewdjs
sudo nohup node startFederator > /var/log/tdp/federatorCPM.log 2>&1 &
sudo nohup node ewdStart-tdp > /var/log/tdp/ewdjsCPM.log 2>&1 &

