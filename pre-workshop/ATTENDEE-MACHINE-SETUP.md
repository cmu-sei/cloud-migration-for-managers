# Attendee Machine Requirements

## Required Software
- Windows 10
- Windows Subsystem for Linux - Ubuntu
- Docker for Desktop
- Visual Studio Code
- Chrome Browser

## WSL Ubuntu

``` bash
Enter new UNIX username: **scss-demo-user**
Enter new UNIX password: **ILoveTheCloud**

sudo apt dist-upgrade -y
sudo apt udpate
sudo apt upgrade -y
sudo apt autoremove

sudo apt install mariadb-client -q

# Azure CLI
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```


## Notes
- Azure CLI
    * [Install Azure CLI with
    apt](https://docs.microsoft.com/en-us/cli/azure/install-azure-cli-apt?view=azure-cli-latest)

    * [Docs](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)

---
- Local Kubernetes (Docker for Windows)
    https://kubernetes.io/docs/tasks/tools/install-kubectl/
    https://dev.to/zeerorg/develop-with-kubernetes-on-docker-desktop-with-wsl-21mh

- Auto complete
    https://kubernetes.io/docs/tasks/tools/install-kubectl/?source=post_page---------------------------#enabling-shell-autocompletion



- Required packages
    ``` bash
    sudo apt install mariadb-client sshpass -y
    ```
