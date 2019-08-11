#!/usr/bin/env bash

USER=pi
PASSWORD=IShouldBeInTheCloud
SERVER=192.168.1.5

npm run build
BUILD_RESULT=$?

if [ $BUILD_RESULT -eq 0 ]
then
    echo transfering static web files...
    sshpass -p $PASSWORD scp -r ./build/* $USER@$SERVER:~/
    sshpass -p $PASSWORD ssh $USER@$SERVER "sudo rm -rf /var/www/html/static"
    sshpass -p $PASSWORD ssh $USER@$SERVER "sudo mv  ~/* /var/www/html"
fi
