# Deploy to Kubernets on Azure

1. Log into the Azure CLI
  ```bash
  az login
  ```
  This will open a browser window, supply your az credentials
1. Create secure container registry on Azure 
  ``` bash
  az acr create -n scsspunnyreg -g scss-demo -l eastus --sku standard
  # It may appear as if the shell is hung for 2-3 minutes
  # login to the registry so local docker commands can access it
  az acr login -n scsspunnyreg
  # ensure the registry was created correctly
  az acr list -o table
  # should display repository details
  az acr repository list -n scsspunnyreg
  # should display []
  ```
1. Create a service principal to allow Kubernets to access the repository
  ```bash
  az ad sp create-for-rbac --skip-assignment
  # Take note of the appId and password, for remaining commands, replace <appId> with your appId and <password> with your password

  ACRID=`az acr show --name scsspunnyreg --resource-group scss-demo --query id --output tsv`
  echo $ACRID

  # Assign the reader role to the service principal
  az role assignment create --assignee "<appId>" --role Reader --scope $ACRID
  ```
1. Create the Kubernetes cluster
  ``` bash
  az aks create --name scsspunnycluster --resource-group scss-demo \
  --node-count 1 --generate-ssh-keys \
  --service-principal <appId> \
  --client-secret <password>
  # This will take 2-5 minutes to complete
  ```
1. Configure kubectl to point to Azure
  ``` bash
  az aks get-credentials --name scsspunnycluster --resource-group scss-demo
  ```
1. Create external IP addresses
  ``` bash
  cd ~/cloud-migration-for-managers/kube
  kubectl apply -f services.yml
  kubect get service --watch
  # Wait for EXTERNAL-IP address to change from <pending> to addresses
  # make note of IP addresses
  <Ctrl>+C
  ```
1. Update MariaDB to accept connections from the kubernets API
    - Navigate to the Azure portal at
        [portal.azure.com/](https://portal.azure.com/)
    - Click the [All resources] link 
    - Click the [scss-demo-sql] link
    - Click the [Connection security] link on the right hand side
    - Add a new rule with the following data
        * *RULE NAME*: **kube**
        * *START IP ADDRESS*: **<puuny-api Public IP address>**
        * *END IP ADDRESS*: **<punny-api Public IP address>**
    - Click the [Save] button near the top of the page
1. Edit the UI to point to the new REST endpoint running in Azure by editing
   `cloud-migration-for-managers/punny-ui/.env`
    - Change `REACT_APP_PUN_API=http://192.168.1.6:8080/api/` to
        `REACT_APP_PUN_API=http://<punny-api-service external-ip>/api/`
   Rebuild the app
   ```bash
   cd ~/cloud-migration-for-managers/punny-api
   npm run build
   ```
1. Deploy punny-ui container to Azure
  ``` bash
  docker build -t  scsspunnyreg.azurecr.io/punny-ui:1.0 .
  docker push scsspunnyreg.azurecr.io/punny-ui:1.0
  ```
1. Deploy punny-api container to Azure
  ``` bash
  cd ~/cloud-migration-for-managers/punny-api
  docker build -t scsspunnyreg.azurecr.io/punny-api:1.0 .
  docker push scsspunnyreg.azurecr.io/punny-api:1.0
  ```

Navigate to http://<punny-ui external ip> to see the application
