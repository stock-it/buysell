
DROP DATABASE IF EXISTS test;
DROP TABLE IF EXISTS stock_info;

CREATE DATABASE test;

 CREATE TABLE stock_info (
    id SERIAL PRIMARY KEY, 
    ask_price DECIMAL NOT NULL,
    ask_size DECIMAL NOT NULL, 
    bid_price DECIMAL NOT NULL,
    bid_size FLOAT NOT NULL, 
    last_extended_hours_trade_price DECIMAL NOT NULL ,
    last_trade_price DECIMAL NOT NULL, 
    symbol VARCHAR(5) NOT NULL, 
    quantity DECIMAL NOT NULL 
);

COPY stock_info(id, ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) FROM './data.csv' DELIMITER ',' CSV HEADER;