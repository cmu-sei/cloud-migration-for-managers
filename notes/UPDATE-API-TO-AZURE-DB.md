Exercise 4 create Azure Database, this is the procedure to point the punny API
to an azure DB.

1. Navigate to the Punny API folder
1. Update `src/main/src/main/resources/application.properties`
    ``` diff
    ## Spring  DATASOURCE (DataSourceAutoConfiguration & DataSourceProperties)
    - spring.datasource.url = jdbc:mariadb://192.168.1.4:3306/scss_punny_db?useSSL=false
    + spring.datasource.url = jdbc:mariadb://{Server name}/scss_punny_db?useSSL=false

    - spring.datasource.username = scss-user
    + spring.datasource.username = {Server admin login name}

    - spring.datasource.password = scss-password
    + spring.datasource.password = scsspassword!1
    ```
1. Make sure it's possible to connect to the pi
    ``` bash
    ssh pi@192.168.1.6

    # Password is IShouldBeInTheCloud

    exit
    ```
1. Build and deploy
    ```bash
    ./pi_deploy.bash
    ```
