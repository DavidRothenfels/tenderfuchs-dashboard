#!/bin/sh

# Start nginx in background
nginx

# Start PocketBase in foreground
/pb/pocketbase serve --http="0.0.0.0:8090" --dir="/pb/pb_data"