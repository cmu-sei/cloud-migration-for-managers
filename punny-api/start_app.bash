#!/usr/bin/env bash

PID=$(pidof java)

if [ -z $PID ]
then
    echo Starting App...
else
    echo Restarting App...
    kill $PID
fi

java -jar /home/pi/punny-api-0.0.1-SNAPSHOT.jar
