# Setup

The setup guide walks you through the process of setting up your developer
environment on the SODAS server.

## Projects

All [compute projects](https://kunet.ku.dk/work-areas/research/Research%20Infrastructure/research-it/ucph-computing-hpc-systems/Pages/default.aspx#collapse-6e12687c-613f-4ac4-9d30-696f72764925) are stored in the `/projects/ `folder.

```bash
abc123@sodashead01fl /projects/main_compute-AUDIT $ tree -L 1
.
├── apps
├── data
├── people
└── scratch
```

!!! warning

    Since the compute server (which is accessed via [Slurm](/server/usage#slurm)) does not
    have access to other network drives (i.e. h-drive and s-drives), you must
    store your project data and code in a compute project directory.

You can make a request for a new project at the [UCPH service portal](https://serviceportal.ku.dk/HEAT/Modules/SelfService/#serviceCatalog). Select `FS-sodas` under FS system.

After the project has been created, you probably also need to give access to yourself in [identity management](https://identity.ku.dk/).

## Configuration

!!! tip

    Remeber to source your `.bashrc` after modifying it. You can do this by
    ```bash
    source ~/.bashrc
    ```

### Shared cache

TBD

### Install custom software

#### uv

[Install](https://docs.astral.sh/uv/getting-started/installation/) `uv`:

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

There are two different strategies for managing your virtual environments.

You can either do it by creating <ins>named environments</ins> in the `~/.virtualenvs/`
folder, or by creating them <ins>locally</ins> in a `.venv` folder in your project.

TBD: Test what is fastest

##### Python projects

To make uv work on the network drives properly, you have to change the following setting first.

```bash
echo "export UV_LINK_MODE=symlink" >> ~/.bashrc
```

To get the full benefit of `uv`, you should initialize your python projects in the desired folder. This could be `/projects/my_project/people/abc123/python/` or `/projects/my_project/apps/python/`.

When you have navigated to the desired folder, you can run

```bash
uv init
```

This will create some boiler plate, which will allow you to take advantage of
uv's dependency management.

!!! tip

    Specify the python version with

    ```bash
    uv init --python 3.9
    ```

Then, to add a project dependency, you can run:

```bash
uv add matplotlib
```

This will add the dependency to the `uv.lock` and `pyproject.toml` files, and install it into the `venv`.

!!! tip

    uv stores venvs in .venv folder in the project directory, and initializes
    them automatically with the above steps. You can also create a venv
    manually by running `uv venv`

If you later found it it isn't needed for your project, you can remove it with:

```bash
uv remove matplotlib
```

To run your scripts, you can use the `uv run` command:

```bash
uv run my_script.py
```

##### Using your environments

First you must activate your environment.

```bash
source .venv/bin/activate
```

!!! tip

    Add a function to your to easily activate virtual environments either named or local from anywhere on the server:

    ```bash
    echo 'function activate() { if [ -n "$1" ]; then source ~/.virtualenvs/"$1"/bin/activate; else source ./.venv/bin/activate; fi; }' >> ~/.bashrc
    ```

    This function will activate the virtual environment in the current directory, or from the name of the virtual environment.

    You can then activate the environment by running `activate` or `activate my-project`.

##### Named environments

If you prefer named virtual environments, you can store them in `~/.virtualenvs/`.

```bash
mkdir ~/.virtualenvs
```

Here you can create new named virtual environments

```bash
cd ~/.virtualenvs
uv venv my-project
```

##### JupyterLab

!!! warning

    The following steps [do not fully work](https://github.com/astral-sh/uv/issues/6314), since
    `uv` havn't added --include-deps flag yet

To install jupyterlab system-wide, we can run:

```bash
uv tool install jupyterlab
```

```bash
echo "alias jlab=\"jupyter-lab --port=8880 --ip=10.84.10.216 --no-browser\"" >> ~/.bashrc
echo "alias jadd=\"python -m ipykernel install --user --display-name \${PWD} --name \${PWD##*/}\"" >> ~/.bashrc
```

#### zsh

In this step of the guide, we will take you throw setting up zsh
as your default shell, and installing oh-my-zsh

##### Building from source

Make directories for local installations and downloads

```bash
mkdir local
mkdir downloads
```

Download the latest version of zsh

```bash
cd downloads
wget -O zsh.tar.xz https://sourceforge.net/projects/zsh/files/latest/download
```

Unpack the tarball

```bash
mkdir zsh && unxz zsh.tar.xz && tar -xvf zsh.tar -C zsh --strip-components 1
```

Build zsh from source

```bash
cd zsh
./configure --prefix=$HOME/local
make
make install
```

Remove the downloaded files

```bash
rm -rf ~/downloads/zsh*
```

Find [configuration examples](https://thevaluable.dev/zsh-install-configure-mouseless/) online.

##### Starship

To get a better prompt, you can install [starship](https://starship.rs/):

```bash
curl -sS https://starship.rs/install.sh | sh -s -- --bin-dir ~/bin/
```

And add the following to your `~/.zshrc`:

```bash title=".zshrc"
eval "$(starship init zsh)"
```

??? example

    Here is an example of a `starship.toml` configuration file, it can be saved
    in `~/.config/starship.toml`

    ```toml title="starship.toml"
    format = """
    [](#9A348E)\
    $username\
    $hostname\
    [](bg:#DA627D fg:#9A348E)\
    $directory\
    [](fg:#DA627D bg:#FCA17D)\
    $git_branch\
    $git_status\
    [](fg:#FCA17D bg:#86BBD8)\
    $nodejs\
    $python\
    [](fg:#86BBD8 bg:#06969A)\
    $docker_context\
    [](fg:#06969A bg:blue)\
    $custom\
    [](fg:blue) \
    """

    right_format="""
    $status $cmd_duration $time
    """

    # Disable the blank line at the start of the prompt
    add_newline = false

    # You can also replace your username with a neat symbol like   or disable this
    # and use the os module below
    [username]
    show_always = true
    style_user = "bg:#9A348E"
    style_root = "bg:#9A348E"
    format = "[$user]($style fg:black)"
    disabled = false

    [hostname]
    ssh_symbol="@"
    style="bg:#9A348E"
    format="[$ssh_symbol$hostname]($style fg:black)"

    [directory]
    style = "bg:#DA627D fg:black"
    format = "[ $path ]($style)"
    truncation_length = 3
    truncation_symbol = "…/"

    # Here is how you can shorten some long paths by text replacement
    # similar to mapped_locations in Oh My Posh:
    [directory.substitutions]
    "Documents" = "󰈙 "
    "Downloads" = " "
    "Music" = " "
    "Pictures" = " "
    # Keep in mind that the order matters. For example:
    # "Important Documents" = " 󰈙 "
    # will not be replaced, because "Documents" was already substituted before.
    # So either put "Important Documents" before "Documents" or use the substituted version:
    # "Important 󰈙 " = " 󰈙 "

    [docker_context]
    symbol = " "
    style = "bg:#06969A"
    format = '[ $symbol $context ]($style)'

    [git_branch]
    symbol = ""
    style = "bg:#FCA17D black"
    format = '[ $symbol $branch ]($style)'

    [git_status]
    style = "bg:#FCA17D black"
    format = '[$all_status$ahead_behind ]($style)'

    [nodejs]
    symbol = ""
    style = "bg:#86BBD8"
    format = '[ $symbol ($version) ]($style)'

    [python]
    style = "bg:#86BBD8 black"
    symbol = "  "
    format = '[${symbol}($virtualenv) ]($style)'

    [status]
    format = '[$symbol$common_meaning$signal_name$maybe_int]($style) '
    map_symbol = true
    disabled = false

    [cmd_duration]
    min_time = 500
    format = '[$duration](bold yellow)'

    [time]
    disabled = false
    time_format = "%R" # Hour:Minute Format
    style = ""
    format = '[  $time]($style)'

    [custom.slurm]
    command = """
    if [ ! -z "${SLURM_JOB_ID}" ]; then
        echo "󱥒 ${SLURM_JOB_ID}"
    fi
    """
    when = "[ ! -z \"${SLURM_JOB_ID}\" ]"
    description = "Display current Slurm job ID"
    style = "bg:blue black"
    format = "[ $output ]($style)"
    ```

### Environment Variables

TBD

## Github

### Generate SSH key

Follow the guide at [GitHub](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent?platform=linux).

### SSH Config

Create a config file at `~/.ssh/config` and add the following lines:

```config
Host github.com
    HostName ssh.github.com
    PreferredAuthentications publickey
    IdentityFile ~/.ssh/id_ed25519
    Port 443
```
