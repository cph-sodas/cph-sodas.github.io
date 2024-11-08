# Usage

All usage of computer resources is manged through the Slurm[^1] Workload
Manager.

In addition, the server is equipped with a number of modules that can be loaded through the `module` command.

[^1]: **S**imple **L**inux **U**tility for **R**esource **M**anagement.

## Modules

```bash
module avail
```

## Slurm

Slurm is a job scheduler and resource manager for the compute resources available.

### Status

To see the attached resources, you can run the following command:

```bash
sinfo -N -l
```

To see the jobs that are currently running, you can run the following command:

```bash
squeue
```

for a specific user:

```bash
squeue -u <username>
```

### Submitting jobs

#### Batch jobs

A typical SLURM script consists of three main sections:

1. SLURM directives (#SBATCH)
2. Environment setup
3. Execution commands

Here's a detailed example:

```bash title="script.sh"
#!/bin/bash

#----------------------------------------
# SLURM Directives
#----------------------------------------
#SBATCH --chdir=/projects/main_compute-AUDIT/    # Working directory
#SBATCH --job-name alphafoldtestjobname          # Job name
#SBATCH --mem=50G                                # Memory requirement
#SBATCH --ntasks=1                               # Number of tasks
#SBATCH --cpus-per-task=1                        # CPU cores per task
#SBATCH --nodes=1                                # Number of nodes
#SBATCH --mail-type=begin                        # Email at job start
#SBATCH --mail-type=end                          # Email at job end
#SBATCH --mail-user=abc123@ku.dk                 # Email address
#SBATCH --gres=gpu:1                             # GPU requirement

#----------------------------------------
# Environment Setup
#----------------------------------------
# Load required modules
module load miniconda/4.10.4
conda activate alphafold

#----------------------------------------
# Job Execution
#----------------------------------------
# Change to working directory
cd /projects/main_compute-AUDIT/data/alphafold

# Run the main script
bash run_alphafold.sh \
    -d /projects/testproject1/data/genetic_databases/ \
    -o /projects/testproject1/people/btj820/ \
    -m model_1 \
    -f example/query.fasta \
    -t 2020-05-14
```

Run the script with:

```bash
sbatch script.sh
```

Once the job is submitted, you can check the status of the job with:

```bash
# Detailed job information
scontrol show job <job_id>
```

#### Interactive jobs

To start a simple interactive shell with 2 CPU cores, 5GB ram, 1 v100 GPU you
can run the following command:

!!! tip

    If copy pasting doesn't work for the multi line code snippets, try
    switching between selecting the text and using the copy button in the top
    right corner

```bash
srun -w sodasgpun01fl --partition=gpuqueue \ #(1)!
    --ntasks-per-node=2 \ #(2)!
    --mem=5GB \ #(3)!
    --gres=gpu:v100:1 \ #(4)!
    --time=240 \ #(5)!
    --pty /bin/bash -i #(6)!
```

1. Standard node and partition configuration
2. Number of CPU cores
3. Amount of memory (RAM)
4. Number of GPUs
5. Maximum time to run the task in minutes
6. Run task in pseudo terminal.<br>Change to `~/bin/zsh` if you installed zsh and wish to use that instead.

This will start a new shell session with the allocated resources. This means
that exiting the shell (e.g. when logging out of the server) will release the
resources. To prevent this, you can start a persistent session with [tmux](#persistent-sessions).

Check that you have access to the GPU by running

```bash
nvidia-smi
```

You will need to reload modules and/or activate environments in the new shell.

```bash
source .venv/bin/activate
```

### Jupyter Notebook

To start a Jupyter Notebook, you need to first allocate resources on the server:

```bash
srun -w sodasgpun01fl --partition=gpuqueue \
  --ntasks-per-node=2 \
  --mem=5GB \
  --pty /bin/bash -i
```

Then, within the newly created interactive slurm session, and a folder
containing a python uv project, run:

```bash
uv add jupyter
```

Activate the virtual environment:

```bash
source .venv/bin/activate
```

Now, you can start the notebook server:

```bash
jupyter notebook --port=8880 --ip=10.84.10.216 --no-browser
```

Then copy the generated link and paste it in your local computer's browsers.

I.e: `http://10.84.10.216:8800/?token=abcd1234...`

!!! info

    To above code works when you have entered an interactive slurm session.
    Don't change the port or the url, since they are required for access to the
    server.

    To start a jupyter notebook on the `head` node instead, you have to specify
    a port when you access the server via ssh, and then also refer to that port
    in the `jupyter notebook` command.

    ```bash
    ssh -L 8000:localhost:8000 abc123@sodashead01fl.unicph.domain
    ...
    jupyter notebook --port=8000 --no-browser
    ```

### VSCode

In order to make the resources from slurm available to VSCode, follow the steps
above and start a jupyter session.

Then, in VSCode, when you open a Notebook ++ctrl+shift+p++ and search for `Notebook: Select Notebook Kernel`. If a kernel is already suggested, click `Select another kernel...` then `Existing Jupyter Server...` and copy the link with the token from above into the field.

### Jupyter Kernels and Virtual Environments

TBD: When do you need to do this?

To register a virtual environment with Jupyter, you can run the following
command, from within your environment (that is, after activating it and making
sure that `ipykernel` (`uv pip install ipykernel`) is installed).

```bash
python -m ipykernel install --user
```

## Persistent sessions

Use tmux to create and manage persistent sessions on the server.

Start a new tmux session

```bash
tmux new -s <session-name>
```

List tmux sessions

```bash
tmux ls
```

Attach tmux session

```bash
tmux a -t <session name>
```

Detach (when you are inside) the session from tmux, leaving everything running
in the background

++ctrl+b++ ++d++

## Docker

The server is equipped with [udocker](https://github.com/indigo-dc/udocker).

```bash
module load anaconda3/2020.11
module load udocker
```

## Resources

The [UCPH guide](https://kunet.ku.dk/work-areas/research/Research%20Infrastructure/research-it/ucph-computing-hpc-systems/Pages/default.aspx#collapse-50aac726-e136-4ede-81aa-29a158043dac) to HPC systems

Five part [ video series ](https://www.youtube.com/watch?v=K_JIPrcPHCg&list=PL7kL5D8ITGyUO4_x5EvVmZ6_NBV0RnDF-) introducing Slurm

The official [slurm cheatsheet](https://slurm.schedmd.com/pdfs/summary.pdf)

[TMUX cheatsheet](https://tmuxcheatsheet.com/)
