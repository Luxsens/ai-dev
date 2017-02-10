#!/usr/bin/env bash

set -x

DEPLOY_LOGIN=ubuntu@rikai-bots.com
DEPLOY_DIR=/opt/rikai/bot-env/lux

chmod -R 755 static

echo "------- run sync-remote at `date` -------"

# exit
# --exclude node_modules \
# --exclude /runner/logs \
# --exclude /author/logs \
    # --delete \

rsync -v ./static -avz  \
    --exclude .git \
    --exclude '*.ts' \
    --exclude '*.js.map' \
    --exclude *.tsx \
    --exclude .DS_Store \
    --exclude logs/* \
    --progress \
    -L \
    ${DEPLOY_LOGIN}:$DEPLOY_DIR

echo 'sync done'
