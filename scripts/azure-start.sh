#!/bin/sh
# Azure App Service startup for Next.js standalone deployment.
# The deployed package is the .next/standalone directory itself,
# so server.js is at /home/site/wwwroot/server.js

cd /home/site/wwwroot || exit 1
export HOSTNAME=0.0.0.0
export PORT=${PORT:-8080}
node server.js
