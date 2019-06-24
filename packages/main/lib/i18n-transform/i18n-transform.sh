#!/bin/bash
# arguments is a glob expanded by bash
# example
# ./i18n-transform.sh ../../../../node_modules/@openui5/sap.m/src/sap/m/messagebundle*
# adjust the translations needed in USED_KEYS.txt
# output is in the target JSON format
FILES=$@
for f in $FILES
do
  echo "Processing $f file..."
  filename=$(basename -- "$f")
  grep -B 1 -f USED_KEYS.txt $f | grep -v "\-\-" > $filename
  jsonFileName=${filename%%.*}.json
  node -e "fs=require('fs');output = {'_': fs.readFileSync('$filename').toString()}; fs.writeFileSync('$jsonFileName', JSON.stringify(output));"

  rm *.properties
  mv *.json ../../src/i18n/
done