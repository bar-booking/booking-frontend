#!/bin/bash

OUTPUT=$1
source .env

dtsgen --out "$OUTPUT" --url "$SCHEMA_URL"
prettier --write "$OUTPUT"
