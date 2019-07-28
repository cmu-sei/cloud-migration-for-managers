 ## Create a GIT repo on the pi

 Create the git project on the pi server
 ``` bash
 ssh pi@192.168.1.3

 mkdir <repo name>.git
 cd <repo name>.git

 git init --bare
 ```

 Create the project locally
 ``` bash
 git clone pi@192.168.1.3:/home/pi/<repo name>
 ```
