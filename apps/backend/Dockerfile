### Builder ###
FROM golang:1.19 as builder

WORKDIR /usr/src/app

COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .

WORKDIR /usr/src/app/builds/bikestats

RUN go build main.go 

### Alpine image ###
FROM ubuntu:latest 

# RUN apk update && apk add ca-certificates && rm -rf /var/cache/apk/*

WORKDIR /usr/src/app

EXPOSE 8090

COPY --from=builder /usr/src/app/builds/bikestats/main /usr/src/app

# COPY ./builds/bikestats/pb_data ./pb_data

# CMD ["./main", "serve", "--http=0.0.0.0:8090"]
CMD ["./main", "serve", "--http=0.0.0.0:8090", "--dir=/pb_data"]

