## Create SSH Keys
1. Create ssh keys to use when ssh-ing into Azure machines
    ``` bash
    ssh-keygen -t rsa -b 2048
    # Press enter three times to accept the default
    cat ~/.ssh/id_rsa.pub
    ```
1. Save the output of the command above to for later use.

## Punny REST API
1. Navigate to the Azure portal at
   [portal.azure.com/](https://portal.azure.com/)
1. Authenticate with your supplied credentials
1. If you see a *Welcome to Microsoft Azure* dialog box, dismiss it.
1. Choose [+ Create a Resource] in the upper left hand corner of the screen.
1. Choose *Ubuntu Server 18.04 LTS] from the list of popular resources.
1. Fill out the *Create a virtual machine* form
    - *Resource group*: **scss-demo**
    - *Virtual machine name*: **scss-demo-rest**
    - *Authentication Type*: **SSH public key**
    - *Username*: **scss-user**
    - *SSH public key*: Copy and paste the output of `cat ~/.ssh/id_rsa.pub`
    - *Public inbound ports*: **Allow selected ports**
    - *Select inbound ports*: **SSH, HTTP**
    - Select default values for all other options
    - Click [Review + create] button.
    - Click [Create] button.
1. Wait for the *Your deployment is underway* message to go away...
1. Click the [Go to resource] button.
1. Note the *Public IP address*
1. Update MariaDB to accept connections from the public IP address
    - Navigate to the Azure portal at
        [portal.azure.com/](https://portal.azure.com/)
    - Click the [All resources] link 
    - Click the [scss-demo-sql] link
    - Click the [Connection security] link on the right hand side
    - Add a new rule with the following data
        * *RULE NAME*: **scss-demo-rest**
        * *START IP ADDRESS*: **<Public IP address>**
        * *END IP ADDRESS*: **<Public IP address>**
    - Click the [Save] button near the top of the page
1. Launch the Ubuntu shell
1. Connect to the server and install required libraries
    ```bash
    ssh scss-user@<Public IP address>
    # Answer **yes** to the authenticity of host question
    sudo apt update
    sudo apt upgrade -y
    sudo apt autoremove -y

    sudo apt install default-jre -y
    sudo reboot now
    ```
1. Deploy code to the VM and start the service
    ``` bash
    cd ~/cloud-migration-for-managers/punny-api
    ssh scss-user@<Public IP address>
    # Answer **yes** to the authenticity of host question
    # build the application
    ./gradlew build
    # Copy the file to the server
    scp ./build/libs/punny-api-0.0.1-SNAPSHOT.jar scss-user@<Public IP address>:~/
    # Start the server
    ssh scss-user@<Public IP address> sudo java -jar punny-api-0.0.1-SNAPSHOT.jar --server.port=80
    ```
1. Navigate to http://<Public IP address>/api/puns to validate that the service
   is properly configured.

## Punny HTML
1. Navigate to the Azure portal at
   [portal.azure.com/](https://portal.azure.com/)
1. Authenticate with your supplied credentials
1. If you see a *Welcome to Microsoft Azure* dialog box, dismiss it.
1. Choose [+ Create a Resource] in the upper left hand corner of the screen.
1. Choose *Ubuntu Server 18.04 LTS] from the list of popular resources.
1. Fill out the *Create a virtual machine* form
    - *Resource group*: **scss-demo**
    - *Virtual machine name*: **scss-demo-html**
    - *Authentication Type*: **SSH public key**
    - *Username*: **scss-user**
    - *SSH public key*: Copy and paste the output of `cat ~/.ssh/id_rsa.pub`
    - *Public inbound ports*: **Allow selected ports**
    - *Select inbound ports*: **SSH, HTTP**
    - Select default values for all other options
    - Click [Review + create] button.
    - Click [Create] button.
1. Wait for the *Your deployment is underway* message to go away...
1. Click the [Go to resource] button.
1. Note the *Public IP address*
1. Launch the Ubuntu shell
1. Connect to the server and install required libraries
    ```bash
    ssh scss-user@<Public IP address>
    # Answer **yes** to the authenticity of host question
    sudo apt update
    sudo apt upgrade -y
    sudo apt autoremove -y

    sudo apt install nginx -y
    sudo /etc/init.d/nginx start
    sudo reboot now
    ```
1. Edit the application to point to the new REST endpoint running in Azure by
   editing
   `cloud-migration-for-managers/punny-ui/.env`
    - Change `REACT_APP_PUN_API=http://192.168.1.6:8080/api/` to
        `REACT_APP_PUN_API=http://<Public IP address>/api/`
1. Rebuild and deploy the application
    ``` bash
    npm install

    # if you get an error, run the following two statements and try again
    # sudo chown -R $(whoami) ~/.npm
    # sudo chown -R $USER:$(id -gn $USER) /home/scss-demo-user/.config

    npm run build
    scp -r ./build/* scss-user@<Public IP address>:~/
    ssh scss-user@<Public IP address> "sudo mv ~/* /var/www/html"
    ```
1. Navigate to http://<Public IP address> to view the apps running in VMs in the
   cloud
