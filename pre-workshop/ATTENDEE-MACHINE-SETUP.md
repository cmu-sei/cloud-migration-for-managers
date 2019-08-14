# Attendee Machine Requirements

## Required Software
- Windows 10
- Windows Subsystem for Linux - Ubuntu
- Docker for Desktop
- Visual Studio Code
- Chrome Browser

## WSL Ubuntu

``` bash
Enter new UNIX username: scss-demo-user
Enter new UNIX password: ILoveTheCloud

sudo apt udpate
sudo apt dist-upgrade -y
sudo apt upgrade -y
sudo apt autoremove -y

sudo apt install mariadb-client default-jre sshpass -y
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt-get install -y nodejs
```

## Azure CLI
``` bash
curl -sL https://aka.ms/InstallAzureCLIDeb | sudo bash
```

## Docker
1. Docker Settings -> General
    - Ensure *Expose daemon on tcp://localhost:2375 without TLS* is selected
1. Install docker in WSL
    ``` bash
    sudo apt install apt-transport-https ca-certificates curl software-properties-common
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
    sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
    sudo apt update
    sudo apt install docker-ce -y
    echo "export DOCKER_HOST=localhost:2375" >> ~/.bashrc
    ```

## Local Kubernetes
1. Install kubectl
    ``` bash
    sudo apt install apt-transport-https -y
    curl -s https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -
    echo "deb https://apt.kubernetes.io/ kubernetes-xenial main" \
        | sudo tee -a /etc/apt/sources.list.d/kubernetes.list
    sudo apt update
    sudo apt install kubectl -y

    # Copy kube config from windows
    mkdir ~/.kube
    cp /mnt/c/Users/{username}/.kube/config ~/.kube/config
    ```
1. Install kubectl bash completion
    ``` bash
    sudo apt install bash-completion -y
    echo 'source <(kubectl completion bash)' >>~/.bashrc
    sudo -i
    kubectl completion bash >/etc/bash_completion.d/kubectl
    ```
1. Restart the shell


## Notes
- Azure CLI
    [Docs](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest)
