COPY stocks(ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) 
FROM '/Users/MyFolder/Desktop/finalSDC/test.csv' DELIMITER ',' CSV HEADER;

CREATE TABLE stocks (
    id SERIAL PRIMARY KEY, 
    ask_price DECIMAL NOT NULL,
    ask_size DECIMAL NOT NULL, 
    bid_price DECIMAL NOT NULL,
    bid_size DECIMAL NOT NULL, 
    last_extended_hours_trade_price DECIMAL NOT NULL ,
    last_trade_price DECIMAL NOT NULL, 
    symbol VARCHAR(5) NOT NULL, 
    quantity DECIMAL NOT NULL 
);

INSERT INTO stocks (ask_size,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity)