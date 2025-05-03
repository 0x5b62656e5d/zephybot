#!/bin/bash

docker build --network=host -t zephybot ~/zephybot/
docker run -d --restart unless-stopped --name zephybot \
  -v ~/zephybot/logs:/app/logs \
  -v ~/zephybot/data:/app/data \
  --env-file ~/zephybot/.env \
  zephybot