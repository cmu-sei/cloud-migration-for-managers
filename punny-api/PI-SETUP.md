# Install Java 11

``` bash
sshpass -p IShouldBeInTheCloud ssh pi@192.168.1.6

sudo apt update
sudo apt upgrade -y
sudo apt install default-jre -y
```

# Transfer the jar

``` bash
sshpass -p IShouldBeInTheCloud scp ./build/libs/punny-api-0.0.1-SNAPSHOT.jar pi@192.168.1.6:~/
sshpass -p IShouldBeInTheCloud ssh pi@192.168.1.6 "java -jar punny-api-0.0.1-SNAPSHOT.jar"
```

# Stop the application

```bash
kill $(pidof java)
```

# Important Notes

The application is configured to run on port 8080. On linux ports below 1024 can
be opened only by root, so the port 80 is restricted by default. There are ways
around this, but most likely not worth it for this app: More info
[here](https://stackoverflow.com/questions/33703965/how-can-i-run-a-spring-boot-application-on-port-80)
