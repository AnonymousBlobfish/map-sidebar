-- CREATE DATABASE wegot;

USE wegot;

DROP TABLE restaurants;

CREATE TABLE restaurants (
  id INT(200) PRIMARY KEY,
  name VARCHAR(75),
  formatted_address VARCHAR(75),
  international_phone_number VARCHAR(40),
  website VARCHAR(105),
  url VARCHAR(105),
  opening_hours VARCHAR(1000),
  geometry VARCHAR(200)
);

LOAD DATA INFILE '/Users/william/SDC/map-sidebar/seed/addressData.csv' INTO TABLE restaurants
COLUMNS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
IGNORE 1 ROWS;