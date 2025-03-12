# LLMs

This guide walks you through the process of starting a LLM server that you can
use to host and run large language models locally on the server, while
accessing them from your local machine.

## ollama

### Installation

Ollama is already installed in the shared directory
`/projects/main_compute-AUDIT/apps/` on the server.

Should you for some reason need to install it yourself, follow the manual
installation guide on their [github page](https://github.com/ollama/ollama/blob/main/docs/linux.md#manual-install).

### Inference server

To use it simple load the
module file with `module load /projects/main_compute-AUDIT/apps/modules/ollama`,
and then run `ollama serve` through slurms interactive session.

This will start a server on `10.84.10.216:8880` (which is accessible on any
machine connected to the KU-VPN) and store models in a shared cache at
`/projects/main_compute-AUDIT/data/.ollama/models`

### Call the API

See [api documentation](https://github.com/ollama/ollama/blob/main/docs/api.md#generate-a-chat-completion), use the [ollama-sdk](https://github.com/ollama/ollama-python), or the openai client.

List local models

```bash
curl http://10.84.10.216:8880/api/tags
```

Pull a models

```bash
curl http://10.84.10.216:8880/api/pull -d '{
  "model": "gemma3:27b"
}'

```

Generate a chat completion

```bash
curl http://10.84.10.216:8880/api/chat -d '{
  "model": "gemma3:27b",
  "messages": [
    {
      "role": "user",
      "content": "why is the sky blue?"
    }
  ]
}'



```

```python
from openai import OpenAI

client = OpenAI(
    base_url = 'http://10.84.10.216:8880/v1',
    api_key='ollama', # required, but unused
)

response = client.chat.completions.create(
  model="gemma3:27b",
  messages=[
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Who won the world series in 2020?"},
    {"role": "assistant", "content": "The LA Dodgers won in 2020."},
    {"role": "user", "content": "Where was it played?"}
  ]
)
print(response.choices[0].message.content)
```

## vLLM

### Installation

Install [vllm](https://docs.vllm.ai/en/latest/index.html):

```bash
uv tool install --with setuptools vllm
```

### Inference server

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

### Call the API

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
