DROP SCHEMA IF EXISTS public CASCADE;

  CREATE TABLE account_info(
     account_number VARCHAR, 
     buying_power DECIMAL,
     option_level INT, 
     watchlist VARCHAR,
  );
  
CREATE TABLE account_info(account_number VARCHAR, buying_power DECIMAL, option_level INT, watchlist VARCHAR) VALUES ('2QW30682','486422.2050', 3,'FB,TSLA,SQ,AAPL,MSFT,BABA,V,JPM,BAC');
INSERT INTO account_info VALUES ('2QW30682','486422.2050', 3,'FB,TSLA,SQ,AAPL,MSFT,BABA,V,JPM,BAC');

  CREATE TABLE stocks (
      id SERIAL PRIMARY KEY 
      ask_size INT NOT NULL 
      bid_price INT NOT NULL
      bid_size INT NOT NULL 
      last_extended_hours_trade_price INT NOT NULL 
      last_trade_price INT NOT NULL 
      symbol VARCHAR(5) NOT NULL 
      quantity INT NOT NULL 
      createdAt DATE 
      updatedAt DATE
  );
