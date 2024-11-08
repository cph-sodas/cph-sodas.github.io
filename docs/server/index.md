# Server

Welcome to the SODAS server documentation.

Before you start using the server, please make sure that you read _all_ the
three pages in this part of the documentation:

1. How to [access](access.md) the server
2. How to [setup](setup.md) a project and your developer environment
3. How to [use](usage.md) the computational resources through Slurm

Please also consider consulting the [official UCPH documentation](https://kunet.ku.dk/work-areas/research/Research%20Infrastructure/research-it/ucph-computing-hpc-systems/Pages/default.aspx).

We have also collected some general [tips & tricks](/server/tips) for working with the server and Linux.

!!! note

    We will have a workshop at SODAS on 08-11-2024 at 13:00, where we will go
    through the guide and try to answer your questions.

## What's new?

Compared to the old server, there are _two main differences_:

**One**: the new server uses Slurm for compute resource management. This means
that the server you have access to is just a middle layer, and that to access
the compute resources of the old server (i.e. the GPUs) one must use the Slurm
commands (see under usage).

**Two**: To better structure projects and data, all projects should be stored
in the `/projects/`. These are `compute projects` and are created through the
self service portal (see setup). When you access the compute resources through
Slurm, your code and data must be in a projects directory, since that server
does not have access to your other network drives.

This will (most likely) be new to you, so please reach out with any questions,
but this is also new for us, so please be patient.
