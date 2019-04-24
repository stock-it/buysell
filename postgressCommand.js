COPY stocks(ask_price,ask_size,bid_price,bid_size,last_extended_hours_trade_price,last_trade_price,symbol,quantity) 
FROM '/Users/MyFolder/SDC/buysell/seedPG.csv' DELIMITER ',' CSV HEADER;