#!/usr/bin/env bash

USER=pi
PASSWORD=IShouldBeInTheCloud
SERVER=192.168.1.6

sshpass -p $PASSWORD scp ./start_app.bash $USER@$SERVER:~/
sshpass -p $PASSWORD ssh $USER@$SERVER chmod +x ./start_app.bash
sshpass -p $PASSWORD ssh $USER@$SERVER sudo chmod +x /etc/rc.local

source ./pi_deploy.bash
