# Server

Welcome to the SODAS server documentation.

Before you start using the server, please make sure that you read _all_ the
three pages in this part of the documentation:

1. How to [access](access.md) the server
2. How to [setup](setup.md) a project and your developer environment
3. How to [use](usage.md) the computational resources through Slurm

Please also consider consulting the [official UCPH documentation](https://kunet.ku.dk/work-areas/research/Research%20Infrastructure/research-it/ucph-computing-hpc-systems/Pages/default.aspx).

We have also collected some general [tips & tricks](/server/tips) for working
with the server and Linux, and some [guides](/server/guides) for specific tasks.

## What's new?

Compared to the old server, there are _three main differences_:

**One**: the new server uses Slurm for compute resource management. This means
that the server you log in to is just a middle layer, and that to access
the compute resources of the old server (i.e. the GPUs, memory, CPU) one must
use the Slurm commands (see under usage).

**Two**: To better structure projects and data, all projects should be stored
in the `/projects/`. These are `compute projects` and are created through the
self service portal (see setup). When you access the compute resources through
Slurm, your code and data must be in a projects directory, since that server
does not have access to your other network drives.

**Three**: We strongly recommend that you use `uv` to manage your Python
projects and virtual environments, one reason being the difficulties around the
licensing of [conda default channels](https://www.anaconda.com/blog/is-conda-free), the other that `uv`
helps you enforce better reproducibility, and is most use cases also faster.

This is also new for us, so please reach out with any questions or suggestions
for improvement, but please be patient.
