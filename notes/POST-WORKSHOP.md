Each account will need to be cleaned up and all resources removed.

## Git Server
1. Navigate to
   [azure.microsoft.com/en-us/services/devops/repos/](https://azure.microsoft.com/en-us/services/devops/repos/)
1. Click the [Sign in to Azure DevOps] link.
1. Log in with appropriate credentials.
1. Click on the project to open it.
1. Click the [Project Settings] link in the lower left hand corner of the screen.
1. Click the [Delete] button at the bottom of the screen.
1. Type **cloud-migration-for-managers** into the *project name* text box.
1. Click the [Delete] button.

## Delete all azure resources
``` bash
az login
az group delete -n scss-demo
```
