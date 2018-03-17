-- CREATE DATABASE wegot;

USE wegot;

DROP TABLE restaurants;

CREATE TABLE restaurants (
  id INT(10) PRIMARY KEY,
  name VARCHAR(50),
  formatted_address VARCHAR(75),
  international_phone_number VARCHAR(16),
  url VARCHAR(60),
  opening_hours VARCHAR(1000),
  geometry VARCHAR(200)
);

LOAD DATA INFILE '/Users/william/SDC/map-sidebar/seed/addressData.csv' INTO TABLE restaurants
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
IGNORE 1 ROWS;

--WARNING: This operation will take ~2.5 hours
UPDATE restaurants SET opening_hours=CONCAT(JSON_EXTRACT(opening_hours, "$.periods[0].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[0].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[1].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[1].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[2].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[2].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[3].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[3].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[4].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[4].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[5].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[5].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[6].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[6].close.time"));
ALTER TABLE restaurants MODIFY opening_hours VARCHAR(100);

ALTER TABLE restaurants ADD COLUMN lng DEC(11,8);
ALTER TABLE restaurants ADD COLUMN lat DEC(11,8);

UPDATE restaurants SET lat = JSON_EXTRACT(geometry, "$.location.lat");
UPDATE restaurants SET lng = JSON_EXTRACT(geometry, "$.location.lng");

ALTER TABLE restaurants DROP COLUMN geometry;