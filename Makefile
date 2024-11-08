install:
	@uv pip install \
		-r requirements.txt
	@uv pip install -e .

# order: compile then sync
cs: compile sync

compile:
	@uv pip compile pyproject.toml -o requirements.txt

sync:
	@uv pip sync requirements*.txt
	@uv pip install -e .

deploy:
	mkdocs gh-deploy --remote-branch docs --clean
