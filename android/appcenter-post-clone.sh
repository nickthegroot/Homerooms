#!/usr/bin/env bash

cat > ./android/app/src/main/assets/appcenter-config.json << EOL
{
    "app_secret": "${APPCENTER_ANDROID_SECRET}"
}
EOL
