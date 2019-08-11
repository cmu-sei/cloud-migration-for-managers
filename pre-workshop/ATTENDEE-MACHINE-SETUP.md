# Attendee Machine Requirements

## Required Software
- Windows 10
- Windows Subsystem for Linux - Ubuntu
- Docker for Desktop

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
