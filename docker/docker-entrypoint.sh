#!/bin/sh

# If node_modules doesn't exist on the host, install it inside the container and sync it out
if [ ! -d "node_modules" ]; then
  echo "Installing node_modules into host..."
  npm install
fi

exec "$@"