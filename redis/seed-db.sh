#!/bin/bash

# Set the Redis container name and port
container_name="redis-demo-redis"

# Redis CLI command to set key-value pairs
redis_cmd="docker exec -i $container_name redis-cli"

# Run the commands using redis-cli inside the container
echo "SET example-key example-value" | $redis_cmd

echo "Redis seeded successfully."
