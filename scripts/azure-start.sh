#!/bin/sh
# Azure App Service startup: ensure we run from the app root then build and start.
# Set in Portal: Configuration → General settings → Startup Command:
#   bash /home/site/wwwroot/scripts/azure-start.sh
# Or use: cd /home/site/wwwroot && npm run build && npm start

cd /home/site/wwwroot || exit 1
export NODE_PATH=/usr/local/lib/node_modules:${NODE_PATH}
export PORT=${PORT:-8080}

npm run build && npm start
