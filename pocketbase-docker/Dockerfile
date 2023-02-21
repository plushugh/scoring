FROM alpine:latest

ARG PB_VERSION=0.12.3

ENV PORT 8080

RUN apk add --no-cache \
    unzip \
    ca-certificates

ADD https://github.com/pocketbase/pocketbase/releases/download/v${PB_VERSION}/pocketbase_${PB_VERSION}_linux_amd64.zip /tmp/pb.zip
RUN unzip /tmp/pb.zip -d /pb/

EXPOSE ${PORT}

CMD ["sh", "-c", "/pb/pocketbase serve --http=0.0.0.0:${PORT}"]