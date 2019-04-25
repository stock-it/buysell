DROP SCHEMA IF EXISTS public CASCADE;

  CREATE TABLE account_number (
     account_number: INT NOT NULL 
     buying_power FLOAT
     option_level INTEGER 
     watchlist VARCHAR
  );

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
