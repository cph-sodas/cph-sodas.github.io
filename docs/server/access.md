# Access

In order to access the server, you need to [contact](mailto:datalab@samf.ku.dk) the [datalab](https://datalab.socialsciences.ku.dk/) with your basic
information and SODAS affiliation, and they will help setup up an account for
you. The process currently takes a bit of time, so please be patient while we
look into ways of optimizing this.

## Connecting to the server

First of all, you need to be connected to UCPH's network through a VPN. See the
[guides](https://kunet.ku.dk/medarbejderguide/Sider/It/Fjernadgang-vpn.aspx) on the intranet. Our friends at DIKU also have a [guide](https://github.com/diku-dk/howto/blob/main/vpn.md#accessing-the-ku-vpn-on-linux-and-macos-with-openconnect)
for using a VPN with UCPH's network for linux and mac users.

You connect to the server using SSH. See tips on SSH [here](tips.md#ssh).
An SSH connection to the server can be established either through your
[terminal](#terminal) of choice or e.g. [VSCode](#vscode).

!!! note

    Windows users can use the build in command prompt, or download [Windows Terminal](https://learn.microsoft.com/en-us/windows/terminal/tutorials/ssh) for a better experience.

### Terminal

#### SSH

```bash
ssh <username>@sodashead01fl.unicph.domain
```

To connect locally to the server with the user abc123, do:

```bash
ssh abc123@sodashead01fl.unicph.domain
```

!!! note

    You can specify a specific address and port to connect to, eg:

    ```bash
    ssh -L 8000:localhost:8000 abc123@sodashead01fl.unicph.domain
    ```

#### Transferring files

##### Transfer from local to server

```bash
scp /path/to/file <username>@sodashead01fl.unicph.domain:/path/to/destination
```

To move a text file in documents to your H-drive which is mounted on the
server by default, do:

```bash
scp /documents/test.txt abc123@sodashead01fl.unicph.doman:/ucph/hdir
```

##### Transfer file from server to local

```bash
scp <username>@sodashead01fl.unicph.domain:/path/to/file /path/to/destination
```

To move a text file from the H-drive on the server to your local documents
folder, do:

```bash
scp abc123@sodashead01fl.unicph.doman:/ucph/hdir/test.txt /documents
```

### VSCode

You can access the server through VSCode by installing the [Remote - SSH](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh) extension.
Follow the instructions in the [documentation](https://code.visualstudio.com/docs/remote/ssh) to connect to the server.

Then, when connected, install the [python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [juyter](https://marketplace.visualstudio.com/items?itemName=ms-toolsai.jupyter) extensions on the remote.

To make the compute resources from slurm available in vscode, see under [usage](/server/usage#vscode).
