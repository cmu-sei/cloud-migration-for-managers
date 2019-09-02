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


