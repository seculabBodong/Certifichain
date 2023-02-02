## run docker compose

docker-compose -f ./artifacts/docker-compose.yaml up -d

sleep 10
## createChannel
./createChannel.sh

