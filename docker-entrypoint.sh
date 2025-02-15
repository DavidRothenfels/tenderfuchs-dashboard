#!/bin/sh

# Start nginx in background
nginx

# Start setup script in background
/pb/pb_setup.sh &

# Start PocketBase in foreground
/pb/pocketbase serve --http="0.0.0.0:8090" --dir="/pb/pb_data"