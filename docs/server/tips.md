# Tips

In general, reading the official documentation of all the tools you use in data
science and on the computer is underrated.
In my experience ([jsr-p](https://github.com/jsr-p)) it always pays off in the
long run to spend some time reading the documentation on the tools that I use.

Here, we list different tips and tricks for the most common tools encountered
when using the [SODAS server](cph-sodas.github.io/server/) and on establishing
a nice workflow on the server in general.

## bash

The server runs on a Linux distribution. In the following section we will provide
some simple commands which may help you work your way around the server.

### Navigation

```bash
pwd                 # Show current directory (Print Working Directory)
ls                  # List files and folders in current directory
ls -l               # List files with details (permissions, size, date)
ls -a               # List files including hidden files (i.e. starting with `.`)
cd DirectoryName    # Change to specified directory
cd ..               # Go up one directory level
cd ~                # Go to your home directory
```

### Working with Files and Folders

```bash
mkdir FolderName        # Create a new folder
touch filename.txt      # Create a new file
cp file1 file2          # Copy file1 to file2
mv file1 file2          # Move or rename file1 to file2
rm filename             # Delete a file (be careful, no recycling bin!)
rm -r foldername        # Delete a folder and its contents
grep -r "search term" . # Search for a term in all files in current directory
```

### Viewing File Contents

```bash
cat filename       # Display entire file content
less filename      # View file content page by page (use q to quit)
head filename      # Show first 10 lines of file
tail filename      # Show last 10 lines of file
```

### Common Tasks

```bash
clear              # Clear the terminal screen
history            # Show command history
man command        # Show manual for a command
```

### Extra

```bash
uuidgen           # Generate a random UUID
cal               # Show a simple calendar
btop              # Interactive process viewer
```

!!! tip

    - Use Tab key to auto-complete file/folder names
    - Use Up/Down arrow keys to navigate through previous commands

!!! note

    1. Linux commands are case-sensitive
    2. Spaces in file/folder names need quotation marks or escape characters
    3. Be extra careful with `rm` commands - deleted files cannot be recovered easily

## SSH

- Lecture note from [MIT missing semester course](https://missing.csail.mit.edu/2020/command-line/#remote-machines) on remote machines (and SSH)
  - Nice explanation of ssh, port forwarding and ssh configuration
    - Highly recommended to read the other parts of the lecture notes as well!

### ssh config file

On your local machine which you connect from, you can create a config to save
the ssh connection specification

- create your config file `~/.ssh/config`
- here you define different hosts to avoid writing the long server name each
  time

```bash
Host sodashead
  HostName sodashead01fl.unicph.domain
  User abc123
```

- then you can type

```bash
ssh sodashead
```

instead of

```bash
ssh abc123@sodashead01fl.unicph.domain
```

each time

### connecting to server without typing password

- download [sshpass](https://linux.die.net/man/1/sshpass) using your package
  manager of [choice](https://formulae.brew.sh/formula/sshpass) (e.g. `brew` on mac)
- use a password manager e.g. [pass](https://www.passwordstore.org/) to store
  your password on the command line
- now you can connect to the server by typing

```bash
SSHPASS=$(pass kup) sshpass -e ssh sodashead
```

- bonus:

  - define a script somewhere on your computer and make sure it is in your [path](https://www.digitalocean.com/community/tutorials/how-to-view-and-update-the-linux-path-environment-variable)

    - For instance, I have the script named `sodashead` (shown below) in my path

      ```bash
      #!/usr/bin/env bash
      SSHPASS=$(pass kup) sshpass -e ssh sodashead
      ```

  - now you can simply type `sodashead` (or whatever your script is named) to
    connect to the server

## tmux

- Lecture note from [MIT missing semester
  course](https://missing.csail.mit.edu/2020/command-line/#terminal-multiplexers)
  on terminal multiplexers (of which tmux is an example)
- [Getting started](https://github.com/tmux/tmux/wiki/Getting-Started)
  tmux documentation
- [The tao of tmux](https://leanpub.com/the-tao-of-tmux/read)

## finding help for different commands

### help flag

To find help for commands on a Linux server, there are several options
available. A quick way to get an overview of a command is to use the `-h` or
`--help` flags, which provide brief explanations.
E.g. for the `ls` command:

```bash
[abc123@sodashead01fl ~]$ ls --help
Usage: ls [OPTION]... [FILE]...
List information about the FILEs (the current directory by default).
Sort entries alphabetically if none of -cftuvSUX nor --sort is specified.

Mandatory arguments to long options are mandatory for short options too.
  -a, --all                  do not ignore entries starting with .
  -A, --almost-all           do not list implied . and ..
      --author               with -l, print the author of each file
  -b, --escape               print C-style escapes for nongraphic characters
      --block-size=SIZE      with -l, scale sizes by SIZE when printing them;
                               e.g., '--block-size=M'; see SIZE format below
  -B, --ignore-backups       do not list implied entries ending with ~
  -c                         with -lt: sort by, and show, ctime (time of last
                               modification of file status information);
                               with -l: show ctime and sort by name;
                               otherwise: sort by ctime, newest first
  -C                         list entries by columns
# ... Rest omitted for brievity
```

### man pages

For more detailed information, you can use the `man` command (short for
"manual"), which displays a comprehensive manual page, including command
behaviors and flags. Even third-party commands often have manpages if
developers include them.
E.g. typing `man tmux` will open the man page for tmux in your manpager of
choice ([less](https://man7.org/linux/man-pages/man1/less.1.html) pr default;
you go up and down by pressing `j` and `k`):

```txt

TMUX(1)                   BSD General Commands Manual                  TMUX(1)

NAME
     tmux — terminal multiplexer

SYNOPSIS
     tmux [-2CluvV] [-c shell-command] [-f file] [-L socket-name]
          [-S socket-path] [command [flags]]

DESCRIPTION
     tmux is a terminal multiplexer: it enables a number of terminals to be
     created, accessed, and controlled from a single screen.  tmux may be
     detached from a screen and continue running in the background, then later
     reattached.

# ... Rest omitted for brievity
```

Try for instance navigating to the
[DEFAULT KEY BINDINGS](https://man7.org/linux/man-pages/man1/tmux.1.html#DEFAULT_KEY_BINDINGS)
section of the tmux man page.

### tldr

If manpages are too detailed, TLDR pages offer simplified examples and common
use cases, making them a great complementary resource.
See the [tldr](https://tldr.inbrowser.app/pages/common/tar) docs.

## Makefiles

TBD

## git

TBD

## Management utilities

Display unicph ID information

```bash
kuid <username>
```

Check server access for specific user

```bash
id <username> | tr "," "\n" | grep srv-sodas
```

Check users logged on the server

```bash
users
w
```

Custom function to lookup multiple KUIDs (can be added to `.bashrc`):

```bash
function kuids() {
  while read -r username; do
    if [[ $username =~ ^[a-zA-Z]{3}[0-9]{3}$ ]]; then
      kuid "$username"
      echo "============================"
    fi
  done
}
```

Usage:

```bash
ls /home/ | kuids
users | tr " " "\n" | kuids
```
