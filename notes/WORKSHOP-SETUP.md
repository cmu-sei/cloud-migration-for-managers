## Reset the PI Data Center to default

1. Update the connection string in the API to use the Pi DB (this is updated as
   part of the workshop so it will need to be redone).

   ```
   # assuming you are starting from this project's root directory
   cd /punny-api
   git checkout src/main/resources/application.properties
   ./pi_deploy.bash

   # Disconnect from the pi
   <Ctrl>+C
   ```
1. Navigate to [192.168.1.5](http://192.168.1.5/) and verify proper operation

## For each Attendee Machine

### Generate a SSH key
``` bash
sh-keygen -t rsa -b 2048
```
### Delete Azure DevOps account
1. Navigate to
   [azure.microsoft.com/en-us/services/devops/repos/](https://azure.microsoft.com/en-us/services/devops/repos/)
1. Click the [Sign in to Azure DevOps] link.
1. Log in with appropriate credentials.
1. Click on the project to open it.
1. Click the [Project Settings] link in the lower left hand corner of the screen.
1. Click the [Delete] button at the bottom of the screen.
1. Type **cloud-migration-for-managers** into the *project name* text box.
1. Click the [Delete] button.

### Delete all azure resources
``` bash
az login
az group delete -n scss-demo
```

### Recreate the Punny-UI VM
1. Navigate to the Azure portal at
   [portal.azure.com/](https://portal.azure.com/)
1. Authenticate with the Azure credentials that this team is going to use.
1. Choose [+ Create a Resource] in the upper left hand corner of the screen
1. Choose *Ubuntu Server 18.04 LTS] from the list of popular resources
1. Fill out the *Create a virtual machine* form
    - *Resource group*: **scss-demo**
    - *Virtual machine name*: **scss-demo-html**
    - *Authentication Type*: **SSH public key**
    - *Username*: **scss-user**
    - *SSH public key*: Copy and paste the output of `cat ~/.ssh/id_rsa.pub`
    - *Public inbound ports*: **Allow selected ports**
    - *Select inbound ports*: **SSH, HTTP**
    - Select default values for all other options
1. Click [Review + create] button
1. Click [Create] button
1. Wait for the *Your deployment is underway* message to go away...
1. Verify connectivity
1. Connect to the server and install required libraries
    ```bash
    ssh scss-user@$PUNNY_UI_IP
    ```
