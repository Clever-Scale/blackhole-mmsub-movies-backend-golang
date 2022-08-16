FROM golang:1.19.0-alpine3.16 as build
WORKDIR /app
RUN apk add build-base
RUN apk add nodejs
RUN apk add yarn

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
# COPY go.mod go.sum Makefile ./blackhole-dashboard ./
COPY . ./
RUN export GIN_MODE=release
RUN go mod download && go mod verify
RUN make build-dashboard-linux
COPY . .
RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 GIN_MODE=release go build -v -o /server ./

# Run the app
FROM alpine:latest as run
COPY --from=build /server .
COPY --from=build /app/dashboard-dist/ ./dashboard-dist/
ARG DATABASE_URL
ENV GIN_MODE=release
RUN export GIN_MODE=release
ENV DATABASE_URL=${DATABASE_URL}

EXPOSE 8080

CMD ["/server"]