#!/bin/sh

ROOT_DIR=/usr/share/nginx/html

# Replace env vars in JavaScript files, include them even if you don't consume them in your compose file
echo "Replacing env constants in JS"
keys="APP_ENVIRONMENT_NAME
APP_VERSION_NUMBER
SENTRY_DSN
SENTRY_TRACES_SAMPLE_RATE
SENTRY_REPLAYS_SESSION_SAMPLE_RATE
SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE
" # Add new environment variables here on new lines

for file in $ROOT_DIR/assets/*.js* $ROOT_DIR/index.html $ROOT_DIR/precache-manifest*.js;
do
  echo "Processing $file ...";
  for key in $keys
  do
    value=$(eval echo \$$key)
    echo "replace $key by $value"
    # Be aware that I am looking for variables in the above files with __VARNAME__ replace the underscores with your preference
    sed -i 's#'"__$key"__'#'"$value"'#g' $file 
    done
done

echo "Starting Nginx"
nginx -g 'daemon off;'
