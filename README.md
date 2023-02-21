## Deployment

### 0. Prerequisites
#### Requirements
- Docker
- Docker compose

### 1. Authenticate docker with org's github tokens for permission to pull from `ghcr.io/treee-studio/*`
```bash
docker login ghcr.io -u <username>
# enter your personal access token as password in the prompts
```

### 2. Edit `.env` for your use case

```bash
cp .env.example .env
```

```env
PUBLIC_POCKETBASE_URL="https://pb.yourdomain.tld"
PUBLIC_BASE_URL="https://yourdomain.tld"
CADDY_DNS_APIKEY="your-dns-api-key"
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