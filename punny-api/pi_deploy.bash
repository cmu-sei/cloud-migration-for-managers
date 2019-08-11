#!/usr/bin/env bash

USER=pi
PASSWORD=IShouldBeInTheCloud
SERVER=192.168.1.6

./gradlew build
BUILD_RESULT=$?

if [ $BUILD_RESULT -eq 0 ]
then
    echo transfering jar...
    sshpass -p $PASSWORD scp ./build/libs/punny-api-0.0.1-SNAPSHOT.jar $USER@$SERVER:~/
    echo restarting app...
    sshpass -p $PASSWORD ssh $USER@$SERVER ./start_app.bash
fi
