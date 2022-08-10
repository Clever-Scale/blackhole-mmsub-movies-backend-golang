FROM golang:1.19.0-alpine3.16 as build
WORKDIR /usr/src/app

RUN apk add build-base

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY . .
RUN go build -v -o /usr/local/bin/app ./

# Run the app
FROM golang:1.19.0-alpine3.16 as runner
WORKDIR /usr/src/app


COPY --from=build /usr/local/bin/app /usr/local/bin/app

EXPOSE 8080

CMD ["app"]