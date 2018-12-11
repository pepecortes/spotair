#/bin/bash

find ../app_lib ../app_api ../app_client -name '*.js' -exec ../node_modules/.bin/docco -o ./source_doc/docco/ {}  \;
