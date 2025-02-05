# LLMs

This guide walks you through the process of starting a [vllm server](https://docs.vllm.ai/en/latest/index.html) that you can use
to host and run large language models locally.

## Installation

Install vllm:

```bash
uv tool install --with setuptools vllm
```

## Inference server

On the server, in an active Slurm session, run the following command to start
the inference server with the specified model from huggingface:

```bash
vllm serve "allenai/OLMo-7B-0724-Instruct-hf" \ #(1)!
  --host=10.84.10.216 \ #(2)!
  --port=8880 \ #(3)!
  --download-dir=/projects/<project-dir>/data/.cache/huggingface \ #(4)!
  --dtype=half #(5)!
```

1. The model name from huggingface
2. The ip address of the slurm gpu server
3. The port of the slurm gpu server
4. Local cache dir for models, remember to substitute <project-dir> with a specific project eg. `ainterviewer-AUDIT`
5. For some models, this is needed since the GPUs on the server are a bit old

!!! tip

    By default, the server is not protected by any authentication.

    To add simple authentication to the server, you can generate an api-key and use it when starting the server:
    ```bash
    uuid=$(uuidgen)
    echo $uuid
    ```
    then, when starting the server, you can use the `--api-key=$uuid`

## Call the API

Then, you can consume the api through the following endpoint, from anywhere
as long as you are connected to the VPN.

From the command line:

```bash
# Call the server using curl:
curl -X POST "http://10.84.10.216:8880/v1/chat/completions" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $uuid" \
  --data '{
    "model": "allenai/OLMo-7B-0724-Instruct-hf",
    "messages": [
      {
        "role": "user",
        "content": "What is the capital of France?"
      }
    ]
  }'
```

Or in python, using the openai client:

```python
from openai import OpenAI
client = OpenAI(
    base_url="http://10.84.10.216:8880/v1",
    api_key="token-abc123", # (1)!
)

completion = client.chat.completions.create(
  model="allenai/OLMo-7B-0724-Instruct-hf",
  messages=[
    {"role": "user", "content": "Why dont scientists trust atoms?"}
  ]
)

print(completion.choices[0].message)
```

1. this value doesn't matter, unless you specified it with --api-key, if so
   refer to the value specified when starting the server.
