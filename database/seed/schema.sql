CREATE DATABASE test;
DROP DATABASE IF EXISTS test;
DROP TABLE IF EXISTS stock_info;

\connect test;

 CREATE TABLE IF NOT EXISTS stock_info (
    id INT, 
    ask_price DECIMAL NOT NULL,
    ask_size DECIMAL NOT NULL, 
    bid_price DECIMAL NOT NULL,
    bid_size FLOAT NOT NULL, 
    last_extended_hours_trade_price DECIMAL NOT NULL ,
    last_trade_price DECIMAL NOT NULL, 
    symbol VARCHAR(5) NOT NULL, 
    quantity DECIMAL NOT NULL 
);

COPY stock_info FROM '/var/lib/pgsql92/fakeData.csv' DELIMITER ',' CSV HEADER;
