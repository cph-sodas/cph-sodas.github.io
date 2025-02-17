# UCloud guide

As recently announced, UCloud is now approved for use with personal data.
Below is a guide on how to connect remotely to a UCloud [terminal
app](https://docs.cloud.sdu.dk/Apps/terminal.html) through ssh.

## Accessing UCloud terminal app through ssh

See also [further ressources](#further-ressources) for UCloud's general guides.

### Setup ssh

See UCloud's guide
[here](https://docs.hpc-type3.sdu.dk/intro/ssh-login.html).
Note that you probably already have a public ssh key on your computer.

In my case I already have a public ssh key.
Therefore I copy my ssh key using

```bash
cat ~/.ssh/id_ed25519.pub | wl-copy
```

and upload it manually to [ssh-keys](https://cloud.sdu.dk/app/ssh-keys).

### Submit job

[Submit](https://docs.cloud.sdu.dk/guide/submitting.html) your terminal
application job
[here](https://cloud.sdu.dk/app/jobs/create?app=terminal-ubuntu).
You can specify different parameters in the application form e.g. selecting
access to a specific folder.
I select my home folder; this will be available under `/work/Home` on the
remote machine.
Also, I select the `Machine Type` equal to `u1-standard-1`.

### Access the app

After having setup the ssh access correctly, the app screen will provide you
with an ssh command to run on your local machine.
In my case, it gives me the command:

```bash
ssh ucloud@ssh.cloud.sdu.dk -p 2417
```

Note the `-p` [port](https://man.openbsd.org/ssh#p) flag.
This will be important when e.g. copying files to the server using `scp` from
you local machine, see [scp](#scp).

Running the `ssh` command yields the output:

```bash
❯ ssh ucloud@ssh.cloud.sdu.dk -p 2417
The authenticity of host '[ssh.cloud.sdu.dk]:2417' can't be established.
...
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
```

Type `yes`.
Now you should get a nice welcome message:

```bash
Welcome to Ubuntu 24.04.1 LTS (GNU/Linux 5.15.175.el8 x86_64)

 * Documentation:  https://help.ubuntu.com
 * Management:     https://landscape.canonical.com
 * Support:        https://ubuntu.com/pro

This system has been minimized by removing packages and content that are
not required on a system that users do not log into.

To restore this content, you can run the 'unminimize' command.

The programs included with the Ubuntu system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Ubuntu comes with ABSOLUTELY NO WARRANTY, to the extent permitted by
applicable law.

ucloud@j-5175036-job-0
----------------------
OS: Ubuntu 24.04.1 LTS x86_64
Host: PowerEdge C6420
Kernel: Linux 5.15.175.el8
Uptime: 27 days, 23 hours, 2 mins
Packages: 1096 (dpkg)
Shell: bash 5.2.21
CPU: 2 x Intel(R) Xeon(R) Gold 6130 (64) @ 3.70 GHz
GPU: Matrox Electronics Systems Ltd. Integrated Matrox G200eW3 Graphics Controller
Memory: 45.09 GiB / 376.53 GiB (12%)


ucloud in 🌐 j-5175036-job-0 in ~
[ 09:18:38 ] ➜ 
```

Note the remote machine's specification in the welcome message:

- OS: `Ubuntu 24.04.1`
- CPU: `CPU: 2 x Intel(R) Xeon(R) Gold 6130 (64) @ 3.70 GHz`
- Memory: `Memory: 45.09 GiB / 376.53 GiB (12%)`

We now have access to a shell in the UCloud environment.

## Work folder

If you have specified access to a specific holder, e.g. you home folder, when
requesting the job, it should be located under `/work/Home`.

```bash
ucloud in 🌐 j-5175036-job-0 in ~
[ 09:32:09 ] ➜  cd /work/Home

ucloud in 🌐 j-5175036-job-0 in /work/Home
[ 09:32:18 ] ➜  ls
Jobs  Syncthing  Trash 
```

## scp

### local to remote

I create a file locally on my machine and copy it to the remove server using
the following commands:

```bash
❯ touch msg-to-ucloud.txt
❯ echo "hello ucloud" >> msg-to-ucloud.txt
❯ scp -P 2417 msg-to-ucloud.txt ucloud@ssh.cloud.sdu.dk:/work/Home
msg-to-ucloud.txt                                    100%   13     0.6KB/s   00:00
```

As it was succesful, we expect the file to be under `/work/Home` on the remote
machine.
As shown below, this is the case:

```bash
ucloud in 🌐 j-5175036-job-0 in /work/Home
[ 09:43:18 ] ➜  ls
Jobs  Syncthing  Trash  msg-to-ucloud.txt

ucloud in 🌐 j-5175036-job-0 in /work/Home
[ 09:43:19 ] ➜  cat msg-to-ucloud.txt
hello ucloud
```

If you inspect you home folder under [drives](https://cloud.sdu.dk/app/drives)
you should also be able to see and access the file.

### remote to local

Create a file on the remote machine:

```bash
ucloud in 🌐 j-5175067-job-0 in ~
[ 10:02:52 ] ➜  echo "hello world" >> msg-to-local.txt
```

Then on your local machine, run the following command (specify the port that
you have gotten allocated):

```bash
❯ scp -P 2483 ucloud@ssh.cloud.sdu.dk:msg-to-local.txt .
msg-to-local.txt                                    100%   12     0.3KB/s   00:00
❯ cat msg-to-local.txt
hello world
```

Thus, the remote file has been succesfully copied to the local machine.

Note that the port has changed in the command above from `2417` to `2483`.
This is because, while writing this guide, my requested 1-hour session from
UCloud ran out, and therefore I requested another machine and got a new port 😀

## Further ressources

See the excellent guides at UCloud:

- <https://docs.cloud.sdu.dk/guide/login.html>
- <https://docs.cloud.sdu.dk/guide/submitting.html>
  - <https://docs.cloud.sdu.dk/guide/submitting.html#configure-ssh-access>
- <https://docs.cloud.sdu.dk/hands-on/use-cases.html>
