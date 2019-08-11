# Install Java 11 and configure auto startup

``` bash
sshpass -p IShouldBeInTheCloud ssh pi@192.168.1.6

sudo apt update
sudo apt upgrade -y
sudo apt install default-jre -y

// MANUAL STEP requiring sudo
// Add /home/pi/start_app.bash before exit 0 in /etc/rc.local

sudo chmod +x /etc/rc.local

./pi_deploy.bash
```

# Deploy

``` bash
./pi_deploy.bash
```

# Notes
The application is configured to run on port 8080. On linux ports below 1024 can
be opened only by root, so the port 80 is restricted by default. There are ways
around this, but most likely not worth it for this app: More info
[here](https://stackoverflow.com/questions/33703965/how-can-i-run-a-spring-boot-application-on-port-80)
