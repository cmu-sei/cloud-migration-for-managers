# Deploy to Kubernetes on Azure

This section uses the Azure CLI tool. Everything is possible via portal, but it
becomes cumbersome for more involved projects.

## Log into the Azure CLI
```bash
az login
# This will open a browser window, enter your supplied azure credentials
```

## Create secure container registry on Azure 
1. Each registry must have a unique name across all of Azure. Choose any name
   you wish and place it in an environment variable. The name must not contain
   any special characters, use letters only.
    ```bash
    CONTAINER_REG={YOUR UNIQUE NAME}
    ```
1. Create the registry
    ``` bash
    az acr create -n $CONTAINER_REG -g scss-demo -l eastus --sku standard
    # It may appear as if the shell is hung for 2-3 minutes
    # login to the registry so local docker commands can access it
    az acr login -n $CONTAINER_REG
    # ensure the registry was created correctly
    az acr list -o table
    # should display repository details
    az acr repository list -n $CONTAINER_REG
    # should display []
    ```
1. Create a service principal to allow Kubernets to access the repository
    ```bash
    az ad sp create-for-rbac --skip-assignment
    # Take note of the appId and password, for the next command
    
    REG_APP_ID={appID}
    REG_PASSWORD={password}

    ACRID=`az acr show --name $CONTAINER_REG --resource-group scss-demo --query id --output tsv`

    # Assign the reader role to the service principal
    az role assignment create --assignee $REG_APP_ID --role Reader --scope $ACRID
    ```

## Create the Kubernetes cluster
1. Create the cluster
    ``` bash
    az aks create --name scsspunnycluster --resource-group scss-demo \
    --node-count 1 --generate-ssh-keys \
    --service-principal $REG_APP_ID \
    --client-secret $REG_PASSWORD
    # This will take 2-5 minutes to complete
    ```
1. Configure kubectl to point to the new cluster
      ``` bash
      az aks get-credentials --name scsspunnycluster --resource-group scss-demo
      ```
## Deploy Kubernetes services to create public IP addresses
1. Create external IP addresses
    ``` bash
    cd ~/cloud-migration-for-managers/kube
    kubectl apply -f services.yml
    kubectl get service --watch
    # Wait for EXTERNAL-IP address to change from <pending> to addresses
    # make note of IP addresses
    <Ctrl>+C
    ```
1. Create environment variables for the new public IP addresses
    ```bash
    KUBE_API_IP={punny-api-service external ip}
    KUBE_UI_IP={punny-ui-servide external ip}
    ```
1. Update MariaDB to accept connections from the kubernets API
    ``` bash
    az mariadb server firewall-rule create -g scss-demo \
        -s scss-demo-sql -n kube \
        --start-ip-address $KUBE_API_IP --end-ip-address $KUBE_API_IP
    ```

## Build containers and deploy then to the container registry
1. Update the api connection information in the Punny UI Application
    ``` bash
    cd ~/cloud-migration-for-managers/punny-ui
    sed -i "s/$PUNNY_API_IP/$KUBE_API_IP:8080/g" .env
    
    # rebuild the app
    npm run build
    ```
1. Deploy punny-ui container to Azure
    ``` bash
    docker build -t $CONTAINER_REG.azurecr.io/punny-ui:1.0 .
    docker push $CONTAINER_REG.azurecr.io/punny-ui:1.0
    ```
1. Deploy punny-api container to Azure
    ``` bash
    cd ~/cloud-migration-for-managers/punny-api
    docker build -t $CONTAINER_REG.azurecr.io/punny-api:1.0 .
    docker push $CONTAINER_REG.azurecr.io/punny-api:1.0
    ```

## Deploy the containers to Kubernetes
1. Update the image names in the service definitions
    ``` bash
    cd ~/cloud-migration-for-managers/kube
    sed -i "s/<REGISTRY>/$CONTAINER_REG/g" deployments.yml
    ```
1. Deploy to Kubernetes
    ``` bash
    kubectl apply -f deployments.yml
    ```
1. Navigate to http://**{PUNNY-UI EXTERNAL IP}** to see the application

Congratulate yourself! You have successfully migrated to a cloud native
application running in kubernetes.
