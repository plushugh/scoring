## Deployment

### 0. Prerequisites
#### Requirements
- Docker
- Docker compose

### 1. Authenticate docker with your github tokens for permission to pull from `ghcr.io/plushugh/*`
```bash
docker login ghcr.io -u <username>
# enter your personal access token as password in the prompts
```

### 2. Edit `.env` for your use case

```bash
cp .env.example .env
```

```env
PUBLIC_POCKETBASE_URL="https://domain.tld/pb"
PB_REVERSE_PROXY_URL="https://domain.tld/pb/*"
PUBLIC_BASE_URL="https://domain.tld"
PUBLIC_SENTRY_DSN="sentry_dsn_here"

CADDY_DNS_APIKEY="api_key_here"

# BUILD ONLY
SENTRY_ORG="sentry_org_here"
SENTRY_PROJECT="sentry_project_here"
```

### 3. Manually create Caddy data dir for persistent storage and networks

```bash
docker volume create caddy_data

docker network create web
docker network create caddy-net --internal
```

### 4. Build and start stack

```bash
docker compose up -d
```
