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
PUBLIC_BASE_URL="https://domain.tld"
PUBLIC_SENTRY_DSN="sentry_dsn_here"

CADDY_DNS_APIKEY="api_key_here"
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

### 5. Create Pocketbase admin account

### 6. Import collections
go to pocketbase instance settings > import collections and import this json
```json
[
    {
        "id": "_pb_users_auth_",
        "name": "recorders",
        "type": "auth",
        "system": false,
        "schema": [
            {
                "id": "users_name",
                "name": "name",
                "type": "text",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            }
        ],
        "listRule": "id = @request.auth.id",
        "viewRule": "id = @request.auth.id",
        "createRule": null,
        "updateRule": null,
        "deleteRule": null,
        "options": {
            "allowEmailAuth": true,
            "allowOAuth2Auth": true,
            "allowUsernameAuth": true,
            "exceptEmailDomains": null,
            "manageRule": null,
            "minPasswordLength": 8,
            "onlyEmailDomains": null,
            "requireEmail": false
        }
    },
    {
        "id": "n4ppq4i2wrlcl2x",
        "name": "houses",
        "type": "base",
        "system": false,
        "schema": [
            {
                "id": "rwp3icda",
                "name": "name",
                "type": "text",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "cnuo8lu7",
                "name": "score",
                "type": "number",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null
                }
            },
            {
                "id": "r703c6si",
                "name": "color",
                "type": "text",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            }
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": "",
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "wvrk4tlcmnozz7n",
        "name": "students",
        "type": "base",
        "system": false,
        "schema": [
            {
                "id": "wnb9q3np",
                "name": "name",
                "type": "text",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "injyhvc1",
                "name": "cardNumber",
                "type": "text",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null,
                    "pattern": ""
                }
            },
            {
                "id": "9zghfn8g",
                "name": "house",
                "type": "select",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "gryffindor",
                        "slytherin",
                        "hufflepuff",
                        "ravenclaw"
                    ]
                }
            },
            {
                "id": "1mkfk6jd",
                "name": "score",
                "type": "number",
                "system": false,
                "required": false,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null
                }
            }
        ],
        "listRule": "",
        "viewRule": "",
        "createRule": null,
        "updateRule": "",
        "deleteRule": null,
        "options": {}
    },
    {
        "id": "g8b6ilyocmrxcdz",
        "name": "records",
        "type": "base",
        "system": false,
        "schema": [
            {
                "id": "c2hiuqu4",
                "name": "action",
                "type": "select",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "maxSelect": 1,
                    "values": [
                        "increase",
                        "decrease"
                    ]
                }
            },
            {
                "id": "ntcwfdq0",
                "name": "change",
                "type": "number",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "min": null,
                    "max": null
                }
            },
            {
                "id": "qh3it8nq",
                "name": "recorder",
                "type": "relation",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "collectionId": "_pb_users_auth_",
                    "cascadeDelete": false,
                    "maxSelect": 1,
                    "displayFields": []
                }
            },
            {
                "id": "e7dy1ajf",
                "name": "student",
                "type": "relation",
                "system": false,
                "required": true,
                "unique": false,
                "options": {
                    "collectionId": "wvrk4tlcmnozz7n",
                    "cascadeDelete": false,
                    "maxSelect": 1,
                    "displayFields": []
                }
            }
        ],
        "listRule": "recorder.id = @request.auth.id",
        "viewRule": "recorder.id = @request.auth.id",
        "createRule": "recorder.id = @request.auth.id",
        "updateRule": null,
        "deleteRule": null,
        "options": {}
    }
]
```

### 7. Create houses and students
You can use the convience script `./tools/scripts/seed.ts` to seed houses and students (Bun required)
And the convience script `./tools/scripts/generateSample.ts` to generate students (Bun required)

### 9. Create recorder accounts
