#!/bin/bash

mongoexport --db wegot-sidebar --collection restaurants --type=csv --fields id,name,formatted_address,international_phone_number,website,url,opening_hours,geometry --out addressData.csv
