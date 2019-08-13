#!/usr/bin/env bash

PID=$(pidof java)

if [ -z $PID ]
then
    echo Starting App...
else
    echo Restarting App...
    sudo kill $PID
fi

while ! mysql -h 192.168.1.4 -P 3306 --password=scss-password -u scss-user scss_punny_db -e ";" ; do
   echo "Can't connect, retrying in 1 second" 
   sleep 1
done

java -jar /home/pi/punny-api-0.0.1-SNAPSHOT.jar
