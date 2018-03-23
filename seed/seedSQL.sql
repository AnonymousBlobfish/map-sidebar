-- CREATE DATABASE wegot;

USE wegot;

DROP TABLE restaurants;

SELECT 
    id, name, formatted_address, international_phone_number, url, opening_hours, lat, lng
FROM
    restaurants
INTO LOCAL OUTFILE 'C:/Users/zhart/code/sdc/map-sidebar/db.csv' 
FIELDS ENCLOSED BY '"' 
TERMINATED BY ';' 
ESCAPED BY '"' 
LINES TERMINATED BY '\r\n';


CREATE TABLE restaurants (
  id INT(10) PRIMARY KEY,
  name VARCHAR(50),
  formatted_address VARCHAR(75),
  international_phone_number VARCHAR(16),
  url VARCHAR(60),
  opening_hours json,
  lat DEC(11,8),
  lng DEC(11,8)
);

CREATE TABLE objects (
  id INT NOT NULL AUTO_INCREMENT,
  opening_hours VARCHAR(100),
  lat DEC(11,8),
  lng DEC(11,8),
  PRIMARY KEY (id)
);

UPDATE restaurants
INNER JOIN objects ON objects.id = restaurants.id
SET restaurants.opening_hours = objects.opening_hours,
restaurants.lat = objects.lat,
restaurants.lng = objects.lng;


LOAD DATA LOCAL INFILE '/Users/zhart/code/sdc/map-sidebar/addressGeometry.csv' INTO TABLE objects
COLUMNS TERMINATED BY ','
LINES TERMINATED BY '/n'
(opening_hours, lat, lng);

--WARNING: This operation will take ~2.5 hours
UPDATE restaurants SET opening_hours=CONCAT(JSON_EXTRACT(opening_hours, "$.periods[0].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[0].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[1].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[1].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[2].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[2].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[3].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[3].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[4].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[4].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[5].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[5].close.time"), "~", JSON_EXTRACT(opening_hours, "$.periods[6].open.time"), "^", JSON_EXTRACT(opening_hours, "$.periods[6].close.time"));
ALTER TABLE restaurants MODIFY opening_hours VARCHAR(100);

ALTER TABLE restaurants ADD COLUMN lng DEC(11,8);
ALTER TABLE restaurants ADD COLUMN lat DEC(11,8);

UPDATE restaurants SET lat = JSON_EXTRACT(geometry, "$.location.lat");
UPDATE restaurants SET lng = JSON_EXTRACT(geometry, "$.location.lng");

ALTER TABLE restaurants DROP COLUMN geometry;