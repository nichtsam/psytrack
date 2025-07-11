# LLM Architecture Design Document

## Core Requirements

The project involves personal psychological states and event records, with high requirements for data privacy.

## Options Considered

- **Third-party platforms with privacy solutions**: Higher costs, not suitable for side projects.
- **Self-hosted private models**: More cost-flexible and allows effective control of data privacy; suitable for lightweight deployment.

## Current Considerations

The project is in its early stages, prioritizing cost and resource efficiency by choosing an extremely lightweight model, with plans for gradual optimization as the project develops.

## Current Design

- Adopt **Ollama** as the LLM service specification to unify model call interfaces.
- Use the lightweight **phi4-mini** model to reduce resource consumption; applicable for both local and cloud deployments.
- Plan to deploy on **RunPod serverless** for production usage, enabling containerized LLM services with flexible resource scaling.

## Backend Module Architecture

- **Environment Variable**: `OLLAMA_URL` specifies the Ollama service endpoint (local or cloud).
- **LLM Module**: Encapsulates LLM API calls, handling requests, structured output validation, and error retries.
- **Psyche Module**: Implements business logic, uses the LLM Module to generate structured content and analysis.

## Development Guide

### Spin Up Local LLM Server

1. Install [Ollama](https://ollama.com) on your machine.
2. Pull the desired model (`phi4-mini`) using:

   ```bash
   ollama pull phi4-mini
   ```

3. Start the Ollama server (usually auto-starts when you run a model):

   ```bash
   ollama run phi4-mini
   ```

4. The default API server runs at [http://localhost:11434](http://localhost:11434).

### (Optional) Interactive Testing with Open WebUI

1. Make sure your local ollama server is running
2. Run the WebUI with docker:

   ```bash
   docker run -d -p 3000:8080 \
     -e WEBUI_AUTH=false \
     --add-host=host.docker.internal:host-gateway \
     -v open-webui:/app/backend/data \
     --name open-webui \
     --restart always \
     ghcr.io/open-webui/open-webui:main
   ```

3. Access the WebUI at [http://localhost:3000](http://localhost:3000) (it might take a second to spin up)

### LLM Usage in Backend Codebase

1. Make sure your local Ollama server is running.
2. Set `OLLAMA_URL=http://localhost:11434` in your `.env` file.
3. Use the LLM Module to send prompts and receive structured responses in your application logic.

> The LLM Module's interaction with the LLM API follows the [Ollama REST API specification](https://github.com/ollama/ollama/blob/main/docs/api.md).

With the server running and environment configured, your backend can now interact with the LLM endpoint through the LLM Module.
