## Create SSH Keys
1. Create ssh keys for to use when ssh-ing machines
    ``` bash
    ssh-keygen -t rsa -b 2048
    # Press enter three times to accept the default
    cat ~/.ssh/id_rsa.pub
    ```
1. Save the output of the command above to for later use.

## Create SQL VM
1. Navigate to the Azure portal at
   [portal.azure.com/](https://portal.azure.com/)
1. Authenticate with your supplied credentials
1. If you see a *Welcome to Microsoft Azure* dialog box, dismiss it.
1. Choose [+ Create a Resource] in the upper left hand corner of the screen.
1. Choose *Ubuntu Server 18.04 LTS] from the list of popular resources.
1. Fill out the *Create a virtual machine* form
    - *Resource group*: Choose the [Create new] link and name the new resource
        group **scss-demo**
    - *Virtual machine name*: **scss-demo-sql**
    - *Authentication Type*: **SSH public key**
    - *Username*: **scss-user**
    - *SSH public key*: Copy and paste the output of `cat ~/.ssh/id_rsa.pub`
    - *Public inbound ports*: **Allow selected ports**
    - *Select inbound ports*: **SSH**
    - Select default values for all other options
    - Click [Review + create] button.
    - Click [Create] button.
1. Wait for the *Your deployment is underway* message to go away...
1. Click the [Go to resource] button.

## Install and configure MariaDB
1. Click the [Connect] icon near the top of the screen
1. Copy the *Login using VM local account* information
1. Paste that information into your Ubuntu shell
1. Answer **yes** to the authenticity of host question
1. Install the latest updates
    ``` bash
    sudo apt update
    sudo apt upgrade -y
    audo apt autoremove
    ```

