## run docker compose

docker-compose -f ./artifacts/docker-compose.yaml up -d

sleep 10
## createChannel
./createChannel.sh

## Look Docker Process
docker ps -a --format "table {{.ID}}\t{{.Names}}\t{{.Ports}}" | (read -r; printf "%s\n" "$REPLY"; sort -k 3)
