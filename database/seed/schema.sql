DROP DATABASE IF EXISTS sdc;
CREATE DATABASE sdc;
DROP TABLE IF EXISTS stock_info;
DROP TABLE IF EXISTS account_info;

\connect test;

 CREATE TABLE IF NOT EXISTS account_info (
     account_number VARCHAR, 
     buying_power DECIMAL, 
     option_level INT, 
     watchlist VARCHAR,
 );

 CREATE TABLE IF NOT EXISTS stock_info (
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

INSERT INTO account_info VALUES ('2QW30682','486422.2050', 3,'FB,TSLA,SQ,AAPL,MSFT,BABA,V,JPM,BAC');
COPY stock_info FROM '/Users/MyFolder/SDC/buysell/test.csv' DELIMITER ',' CSV HEADER;
