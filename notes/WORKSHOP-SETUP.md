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

