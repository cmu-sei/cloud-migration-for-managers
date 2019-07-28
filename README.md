# Hands On Cloud Migration for Managers

## Abstract
The cloud is a highly technical, constantly evolving space. To keep up, managers
try to cobble together countless cloud concepts from power point slides and
cartoons that provide incomplete abstractions. Consequently, their understanding
is rarely sufficient for meaningful decision making. This workshop aims to
remedy this situation by giving participants the opportunity to perform a real
cloud migration on an archetypal business application (no coding skills
required).

The workshop starts with a typical business application running on a local
machine. All participants will be divided into one of six groups, and each group
will be responsible for migrating the application to the cloud. A global
dashboard will track the state of each team's application and correlate
management objectives to tangible technical tasks. Expect to gain a ground truth
conception of the cloud while enjoying lighthearted fun.

## Presenter Bio
### Dale Alleshouse
Dale Alleshouse is a software engineer and researcher at Carnegie Mellon
University’s Software Engineering Institute. He is a 20+ year veteran developer
with a passion for technology and a penchant for keeping up with software
trends. In the course of his career, he has architected and developed many
different types of software including systems, robotics, and business
applications. He has a particular affinity toward DevOps enabled cloud native
business applications and has participated with cloud migrations for multiple
fortune 20 companies.

Dale’s personal goal is to increase the technical competency of as many software
professionals as possible. Therefore, in his free time, he’s involved in several
technical user groups and participates in mentorship programs. He also speaks at
conferences and actively contributes to the open source community. When not
programming, you can find him studying philosophy or lifting heavy things in the
gym and generally being a menace.

### Eric Alan Bram
<INSERT YOUR BIO HERE>


The App
- Inventory
- Data Store

Step 1:
- Gain a quick win and get people comfortable with the cloud
- Migrate git server to the cloud

Step 2:
- Lift and Shift into the cloud
- Create two VMs, one for the app and one for the DB
- Set up DNS connections

Step 3:
- Migrate Data Store to SaaS
- Migrate Data

Step 4:
- Re-architect app to be cloud native
- Refactor front end to eliminate state by dropping in a Redis instance

Step 5:
- Migrate app to hosted Kubernetes

``` bash
az acr create -n <unique name> -g <resource group> -l eastus --sku standard
az acr login -n <unique name>
az acr list -o table
az acr repository list -n <unique name>
```
- AZ Container Service
    * basic, 10 GB - ($0.167 per day) ~$5.00 a month
    * standard, 100 GB - ($0.667 per day) ~$20.00 a month
    * premium, 500 GB - ($1.667 per day) ~$50.00

---
``` bash
az account set --subscription Pay-As-You-Go
```

When creating a resource group, you need to provide a location for that resource
group. You may be wondering, "Why does a resource group need a location? And, if
the resources can have different locations than the resource group, why does the
resource group location matter at all?" The resource group stores metadata about
the resources. Therefore, when you specify a location for the resource group,
you are specifying where that metadata is stored. For compliance reasons, you
may need to ensure that your data is stored in a particular region.

``` bash
az group create -n letskube -l eastus
```

## Service Principal
``` bash
az ad sp create-for-rbac --skip-assignment
```
Take note of appId and password

``` bash
# Get the AZR resource ID and store it a variable
ACRID=`az acr show --name hhfacr --resource-group letskube --query id --output
tsv`

# Assign the reader role to the service principal
az role assignment create --assignee "96132a5c-7f2a-48d6-9b4f-0ba6d6757dd6"
--role Reader --scope $ACRID
```

## Pricing Calculator
https://azure.microsoft.com/is-is/pricing/calculator/

## Create AKS Cluster
Approximately $70 a month per node

``` bash
az aks create --name letskubeaskcluster --resource-group letkube --node-count 1
--generate-ssh-keys --service-principal 96132a5c-7f2a-48d6-9b4f-0ba6d6757dd6
--client-secret 472df2a4-92d8-4265-8b47-85a4495c083a

az aks get-credentials --name letskubeaskcluster --resource-group letskube

kubectl apply -f <file.yml>

kubectl get service --watch
```

## Scaling
Manual
``` bash
az aks scale --resource-group letskube --name letskubeaskcluster --node-count 3
```
