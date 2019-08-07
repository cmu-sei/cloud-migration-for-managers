#!/usr/bin/env bash

USER=pi
PASSWORD=IShouldBeInTheCloud
DB_USER=root
DB_PASSWORD=IShouldBeInTheCloud
DB_SERVER=192.168.1.4

sshpass -p $PASSWORD ssh $USER@$DB_SERVER mkdir -p scripts
sshpass -p $PASSWORD scp ./*.sql $USER@$DB_SERVER:~/scripts/
sshpass -p $PASSWORD scp ./data.txt $USER@$DB_SERVER:~/scripts/
sshpass -p $PASSWORD ssh $USER@$DB_SERVER "mysql -u $DB_USER --password=$DB_PASSWORD < scripts/initial_setup.sql"
