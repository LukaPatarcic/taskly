#!/bin/bash

if [ -z "$DATABASE_URL" ]; then
  echo "Error: DATABASE_URL is not set."
  exit 1
fi

DB_DOCKER_PORT=5432

if [[ $DATABASE_URL =~ postgresql:\/\/([^:]+):([^@]+)@([^:]+):([0-9]+)\/(.+) ]]; then
  DB_USER="${BASH_REMATCH[1]}"
  DB_PASSWORD="${BASH_REMATCH[2]}"
  DB_HOST="${BASH_REMATCH[3]}"
  DB_PORT="${BASH_REMATCH[4]}"
  DB_NAME="${BASH_REMATCH[5]}"
else
  echo "Error: DATABASE_URL format is invalid."
  exit 1
fi

CONTAINER_ID=$(docker ps -qf "ancestor=postgres:latest")

if [ -z "$CONTAINER_ID" ]; then
  echo "PostgreSQL container is not running."
  exit 1
fi

DB_EXISTS=$(docker exec -i $CONTAINER_ID psql -U $DB_USER -h localhost -p $DB_DOCKER_PORT -tAc "SELECT 1 FROM pg_database WHERE datname='$DB_NAME'")

if [ "$DB_EXISTS" != "1" ]; then
  echo "Database $DB_NAME does not exist. Creating..."
  docker exec -i $CONTAINER_ID psql -U $DB_USER -h $DB_HOST -p $DB_DOCKER_PORT -c "CREATE DATABASE \"$DB_NAME\""
  echo "Database $DB_NAME created successfully."
else
  echo "Database $DB_NAME already exists."
fi
