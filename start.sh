#!/bin/bash

docker build --network=host -t zephybot ./
docker compose up -d