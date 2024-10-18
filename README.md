# sodas-ku.github.io

## Docs

The documentation site is built using [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

### Development

The docs project source code is stored at the [sodas-docs](https://github.com/cph-sodas/sodas-docs) repo.

### Deployment

Deploy the docs from the `sodas-docs` repo to the `docs` branch of the this repo.

```bash
mkdocs gh-deploy --config-file ../sodas-docs/mkdocs.yml --remote-branch docs
```

