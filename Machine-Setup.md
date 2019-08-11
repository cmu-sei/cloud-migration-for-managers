# Attendee Machine Requirements

## Required Software
- Windows 10
- Windows Subsystem for Linux - Ubuntu


## WSL Setup Instructions
- Local Kubernetes (Docker for Windows)
    https://kubernetes.io/docs/tasks/tools/install-kubectl/
    https://dev.to/zeerorg/develop-with-kubernetes-on-docker-desktop-with-wsl-21mh

- Auto complete
    https://kubernetes.io/docs/tasks/tools/install-kubectl/?source=post_page---------------------------#enabling-shell-autocompletion

- Azure CLI
    [Install Azure CLI with
    apt](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest)

    ``` bash
    curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
    ```

    [Docs](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)

- Required packages
    ``` bash
    sudo apt install mariadb-client sshpass -y
    ```

## Pi Configuration
- Router
    Router Admin: 192.168.1.1
    User: admin
    Password: <redacted>

    Wireless
    SSID: SCSS-DEMO or SCSS-DEMO-5G
    Key: ILoveTheCloud

- Git Server
    192.168.1.3
    Hostname: scss-demo-git
    User: pi
    Password: IShouldBeInTheCloud

- SQL Server
    192.168.1.4
    Hostname: scss-demo-sql
    User: pi
    Password: IShouldBeInTheCloud

- Web Server
    192.168.1.5
    Hostname: scss-demo-html
    User: pi
    Password: IShouldBeInTheCloud

- REST Server
    192.168.1.6
    Hostname: scss-demo-rest
    User: pi
    Password: IShouldBeInTheCloud
