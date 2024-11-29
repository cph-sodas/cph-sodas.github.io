# Documentation for the SODAS server

> [!IMPORTANT]  
> Check out the branches for documentation that is not yet finished, either
> because they need more work, or pending changes from the ucph server
> managers.

## Installation

```bash
uv venv
source .venv/bin/activate  # linux & mac
uv sync
```

## Commands

- `mkdocs serve` - Start the live-reloading docs server.

## Deployment

The documentation is automatically deployed to GitHub Pages using GitHub Actions. The deployment is triggered by pushing to the `main` branch.

## Other

- [mkdocs documentation](https://www.mkdocs.org).
- [Material for MkDocs documentation](https://squidfunk.github.io/mkdocs-material/).

