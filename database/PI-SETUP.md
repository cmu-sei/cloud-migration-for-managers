# Install MySQL

``` bash
ssh pi@192.168.1.4
// When prompted for password, type IShouldBeInTheCloud
sudo apt update
sudo apt install mariadb-server -y
```

# Security Configuration

Fix a bug that prevents mysql login from linux machines
``` bash
sudo mysql -u root

UPDATE mysql.user SET plugin='mysql_native_password' WHERE User='root';
FLUSH PRIVILEGES;
exit
```

Set Up security
``` bash
sudo mysql_secure_installation
// When prompted for password, type IShouldBeInTheCloud
// Answer Y to all other queries
```

root password: IShouldBeInTheCloud

Configure remote login
``` bash
// edit this file
sudo vi /etc/mysql/mariadb.conf.d/50-server.cnf

// change the following line
// bind-address                              = 127.0.0.1
// to
// bind-address                               = 0.0.0.0

sudo systemctl restart mysql.service
sudo systemctl restart mariadb.service
```

# Create database and user
Terminate any ssh sessions if they are currently open

Transfer the sql script to the pi by running the following command from this git
repos root directory
```bash
scp database/create_database.sql pi@192.168.1.4:~/create_database.sql
// When prompted for password, type IShouldBeInTheCloud
```

Execute the create database script
``` bash
ssh pi@192.168.1.4
// When prompted for password, type IShouldBeInTheCloud

mysql -u root -p < create_database.sql
// When prompted for password, type IShouldBeInTheCloud
```

DB Name: scss_punny_db  
User: scss-user  
Password: scss-password

# Connect remotely
Make sure the "Configure remote login" step in Security Configuration is
complete

``` bash
// install package
sudo apt install mariadb-client -y

// log in
mysql -h 192.168.1.4 -P 3306 -u scss-user -p scss_punny_db
// When prompted for password, type scss-password
```

