FROM node:18-alpine

ENV PUBLIC_POCKETBASE_URL "http://localhost:8090"
ENV PUBLIC_SENTRY_DSN ""
ENV SENTRY_ORG=""
ENV SENTRY_PROJECT=""
ENV SENTRY_AUTH_TOKEN=""
# Runs behind reverse proxy
ENV PROTOCOL_HEADER=x-forwarded-proto
ENV HOST_HEADER=x-forwarded-host
ENV PORT 3000

RUN npm install -g pnpm

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build

EXPOSE ${PORT}
# By default @sveltekit/adapter-node will serve on port 3000 (or PORT envvar) and output dist to /build
CMD ["node", "build"]