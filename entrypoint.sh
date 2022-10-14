#!/bin/sh
JSON_STRING='window.configs = '$(jq -n 'env |to_entries | map(select(.key | test("^VUE_APP_*"))) | map({key: .key, value: .value }) |from_entries')
echo $JSON_STRING 
echo $JSON_STRING > /usr/share/nginx/html/config.js

exec "$@"