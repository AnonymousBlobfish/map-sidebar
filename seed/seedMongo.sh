#!/bin/bash

mongoimport --db wegot-sidebar --collection restaurants --type json --file ./seed/addressData1.json --jsonArray
for i in {1..9}
do
  mongoimport --db wegot-sidebar --collection restaurants --type json --file ./seed/addressData${i}000001.json --jsonArray
done