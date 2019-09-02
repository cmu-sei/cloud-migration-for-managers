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
### Delete Repo
``` bash
rm -rf ~/cloud-migration-for-managers
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

### Create the Kubernetes Cluster
1. Log into the Azure CLI
    ```bash
    az login
    # This will open a browser window, enter your supplied azure credentials
    ```
1. Each registry must have a unique name across all of Azure.
    ```bash
    CONTAINER_REG={TeamNameReg}
    KUBE_CLUSTER={TeamNameCluster}
    ```
1. Create the registry
    ``` bash
    az acr create -n $CONTAINER_REG -g scss-demo -l eastus --sku standard
    # It may appear as if the shell is hung for 2-3 minutes
    # Pressing enter sometimes un-hangs it
    # login to the registry so local docker commands can access it
    az acr login -n $CONTAINER_REG
    # ensure the registry was created
    az acr list
    # should display repository details
    az acr repository list -n $CONTAINER_REG
    # should display []
    ```
1. Create a service principal to allow Kubernetes to access the repository
    ```bash
    az ad sp create-for-rbac --skip-assignment
    # Take note of the appId and password, for the next command
    
    REG_APP_ID={appID}
    REG_PASSWORD={password}

    ACRID=`az acr show --name $CONTAINER_REG --resource-group scss-demo --query id --output tsv`

    # Assign the reader role to the service principal
    az role assignment create --assignee $REG_APP_ID --role Reader --scope $ACRID
    ```
1. Create the cluster
    ``` bash
    az aks create --name $KUBE_CLUSTER --resource-group scss-demo \
        --node-count 1 --generate-ssh-keys \
        --service-principal $REG_APP_ID \
        --client-secret $REG_PASSWORD
    # This will take 2-5 minutes to complete
    ```
1. Configure kubectl to point to the new cluster
    ``` bash
    az aks get-credentials --name $KUBE_CLUSTER --resource-group scss-demo
    ```
1. Verify proper operation
    ``` bash
    kubectl get nodes
    ```

    The output should be similar to:
    ```bash
    NAME                       STATUS   ROLES   AGE    VERSION
    aks-nodepool1-33265009-0   Ready    agent   3m5s   v1.13.10
    ```

### Don't forget
1. Place a post it note with the machine login credentials on the machine
1. Place an azure creds text file on the desktop with credentials in it
