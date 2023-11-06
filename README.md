# Triton Inference Server Web UI

Manage and monitor your Triton Inference Server with a web browser.

![](resources/screenshot_repo.jpeg)

## Features
- List all models from the model repository.
- Easily load/unload models from the model repository.
- Edit model configuration on the fly.
- Monitor models metrics.

## Installation
### Build from source

Prerequisites:
- Node.js >= 18

Clone the repository and install dependencies:
```bash
git clone https://github.com/duydvu/triton-inference-server-web-ui
cd triton-inference-server-web-ui
npm install
```

Prepare the `.env` file at the root of the project:
```bash
# The URL of the HTTP server, usually on port 8000
API_URL=<api-url>
# Optional, if your Triton Inference Server is protected by an authentication header
API_AUTH_HEADER=<api-auth-header>
```

For local Triton Inference Server, you can use the following `.env` file:
```bash
API_URL=http://localhost:8000
```

Build:
```bash
npm run build
```

Run the server:
```bash
npm start
```
