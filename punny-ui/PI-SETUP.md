# Install NGINX

``` bash
sshpass -p IShouldBeInTheCloud ssh pi@192.168.1.5

sudo apt update
sudo apt upgrade -y
sudo apt install nginx -y
sudo /etc/init.d/nginx start
```

# Deploy

``` bash
./pi_deploy.bash
```
